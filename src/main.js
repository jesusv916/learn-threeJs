import './style.css';

import * as THREE from 'three';

import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const material = new THREE.MeshStandardMaterial( { color:	0xFF00FF } );
const torusKnot = new THREE.Mesh( geometry, material );

scene.add( torusKnot );


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0.3,0.3,0.3);


const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const size = 10;
const divisions = 10;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

scene.add( lightHelper );

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const geometryb = new THREE.BoxGeometry( 3, 3, 3 );
const materialb = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometryb, materialb );
scene.add( cube );


function animate() {
  requestAnimationFrame( animate );

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.002;
  torusKnot.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera);
}

animate();