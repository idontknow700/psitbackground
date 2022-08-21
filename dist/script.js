import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
/*
// Mouse
document.addEventListener("mousemove", animateParticles);

let mouseX = 0;
let mouseY = 0;

function animateParticles(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

*/

// Texture Loader
const textureLoader = new THREE.TextureLoader();

const circleTexture = textureLoader.load("./assets/circle.png");

// // Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects

const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 5000;

const posArr = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
  posArr[i] = (Math.random() - 0.5) * 12;
}
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArr, 3)
);
// Materials

const material = new THREE.PointsMaterial(
    {
        size: 0.007
    }
)

const particleMaterial = new THREE.PointsMaterial({
  size: 0.005,
  map: circleTexture,
  transparent: true,
});

// Mesh
const sphere = new THREE.Points(geometry, material);
const particleMesh = new THREE.Points(particlesGeometry, particleMaterial);
scene.add(sphere, particleMesh);
// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0, 0, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.autoRotate = true;
// controls.autoRotateSpeed = 10;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#21202a"), 1);

/**
 * Animate
 */

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update object

  controls.update();
  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
