import * as THREE from "./vendor/three.module.js";
import { GLTFLoader } from "./vendor/GLTFLoader.js";
import { OrbitControls } from "./vendor/OrbitControls.js";

const root = document.querySelector("#sculpt-viewer");
const canvasWrap = document.querySelector("#sculpt-canvas-wrap");
const status = document.querySelector("#sculpt-status");
const statusTitle = document.querySelector("#sculpt-status-title");
const statusCopy = document.querySelector("#sculpt-status-copy");
const hint = document.querySelector("#sculpt-viewer-hint");
const resetButton = document.querySelector("#sculpt-reset");

let renderer;
let camera;
let controls;
let scene;
let model;
let frameId;
let defaultCameraPosition;
let defaultTarget;

function setStatus(title, copy, state = "") {
  statusTitle.textContent = title;
  statusCopy.textContent = copy;
  status.dataset.state = state;
}

function fitModel(object) {
  const bounds = new THREE.Box3().setFromObject(object);
  const size = bounds.getSize(new THREE.Vector3());
  const center = bounds.getCenter(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z) || 1;
  const scale = 2.5 / maxSize;
  object.scale.setScalar(scale);
  object.position.sub(center.multiplyScalar(scale));

  const fittedBounds = new THREE.Box3().setFromObject(object);
  const fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
  const fittedSize = fittedBounds.getSize(new THREE.Vector3());
  const floorY = fittedBounds.min.y;
  object.position.y -= floorY;
  const radius = Math.max(fittedSize.x, fittedSize.y, fittedSize.z) * 0.5;
  camera.position.set(radius * 2.6, radius * 1.45, radius * 2.6);
  controls.target.set(fittedCenter.x, fittedCenter.y - floorY, fittedCenter.z);
  defaultCameraPosition = camera.position.clone();
  defaultTarget = controls.target.clone();
  controls.minDistance = Math.max(1.6, radius * 1.25);
  controls.maxDistance = Math.max(5, radius * 7);
  controls.update();
}

function disposeObject(object) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value?.isTexture) value.dispose();
      });
      material.dispose();
    });
  });
}

function resetView() {
  if (!camera || !controls || !defaultCameraPosition) return;
  camera.position.copy(defaultCameraPosition);
  controls.target.copy(defaultTarget);
  controls.update();
}

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color("#e8ebe7");

  camera = new THREE.PerspectiveCamera(34, 1, 0.01, 100);
  camera.position.set(3, 2, 3);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setSize(canvasWrap.clientWidth, canvasWrap.clientHeight, false);
  canvasWrap.appendChild(renderer.domElement);

  const ambient = new THREE.HemisphereLight("#ffffff", "#aeb8b0", 2.2);
  scene.add(ambient);
  const key = new THREE.DirectionalLight("#ffffff", 3.4);
  key.position.set(3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight("#d2e0dc", 1.2);
  fill.position.set(-4, 2, -3);
  scene.add(fill);

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.62, 0.12, 64),
    new THREE.MeshStandardMaterial({ color: "#d3d9d4", roughness: 0.82, metalness: 0.02 })
  );
  platform.position.y = -0.06;
  scene.add(platform);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.screenSpacePanning = false;
  controls.minPolarAngle = 0.25;
  controls.maxPolarAngle = Math.PI * 0.52;
  controls.rotateSpeed = 0.7;
  controls.zoomSpeed = 0.65;
  resetButton?.addEventListener("click", resetView);
  window.addEventListener("resize", resize);
  frameId = requestAnimationFrame(render);
}

function resize() {
  if (!renderer || !camera) return;
  const width = canvasWrap.clientWidth;
  const height = canvasWrap.clientHeight;
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
}

function render() {
  controls?.update();
  renderer?.render(scene, camera);
  frameId = requestAnimationFrame(render);
}

async function loadModel() {
  const modelPath = root.dataset.model;
  try {
    const response = await fetch(modelPath, { cache: "no-store" });
    if (response.status === 404) {
      setStatus("Model not added yet", "Upload your compressed GLB to assets/models/sculpt.glb to activate this viewer.", "missing");
      hint.hidden = true;
      return;
    }
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    setStatus("Loading sculpture", "Preparing the model for this device.", "loading");
    const loader = new GLTFLoader();
    loader.parse(buffer, new URL("./", window.location.href).href, (gltf) => {
      model = gltf.scene;
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
      scene.add(model);
      fitModel(model);
      status.hidden = true;
      hint.hidden = false;
    }, (error) => {
      console.error("3D viewer could not parse the model", error);
      setStatus("Could not load model", "Check that sculpt.glb is a valid file and that the site is opened through a local server.", "error");
      hint.hidden = true;
    });
  } catch (error) {
    console.error("3D viewer could not load the model", error);
    setStatus("Could not load model", "Check that sculpt.glb is a valid file and that the site is opened through a local server.", "error");
    hint.hidden = true;
  }
}

function cleanup() {
  cancelAnimationFrame(frameId);
  window.removeEventListener("resize", resize);
  if (model) disposeObject(model);
  renderer?.dispose();
}

if (root && canvasWrap) {
  initScene();
  loadModel();
  window.addEventListener("pagehide", cleanup, { once: true });
}
