import * as THREE from "three";
import { TilesRenderer } from '3d-tiles-renderer';
import { GLTFLoader } from 'three-stdlib'
import GLTFFILE from "../../gltf/53394525_bldg_6677.glb";

import { CesiumRTCPlugin } from './CesiumRTCPlugin'

let mouseX = 0,
    mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let needsRerender = true;
// シーンを追加
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// ライトを追加
// 環境光
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
scene.add(ambientLight);
// 太陽光
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
// ポイントライト
const pointLight = new THREE.PointLight(0xffffff, 0.8);
scene.add(pointLight);

// 1km四方の地面を追加
const geometry = new THREE.PlaneGeometry(1000, 1000);
const material = new THREE.MeshBasicMaterial({ color: 0x666666, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);
plane.rotation.x = (90 * Math.PI) / 180;
scene.add(plane);

// カメラの追加
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 500;

// レンダラーを追加
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const tilesRenderer = await new TilesRenderer('https://plateau.geospatial.jp/main/data/3d-tiles/bldg/01100_sapporo/notexture/tileset.json');
console.log(tilesRenderer)
const gltfLoader = new GLTFLoader()
gltfLoader.register(parser => new CesiumRTCPlugin(parser))

tilesRenderer.manager.addHandler(/\.gltf$/, gltfLoader);
tilesRenderer.setCamera(camera);
tilesRenderer.setResolutionFromRenderer(camera, renderer);
tilesRenderer.onLoadTileSet = () => needsRerender = true;
tilesRenderer.onLoadModel = () => needsRerender = true;

scene.add(tilesRenderer.group);

console.log(scene.children)
// 描画開始
animate();

// GLTFファイルを読み込む
// const gltfLoader = new GLTFLoader();
// gltfLoader.load(
//     GLTFFILE,
//     (gltf) => {
//         scene.add(gltf.scene);
//     },
//     undefined,
//     (error) => {
//         console.error(error);
//     }
// );

// マウスイベントなどを設定
document.addEventListener("mousemove", onDocumentMouseMove);
window.addEventListener("resize", onWindowResize);


// 描画処理
function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(new THREE.Vector3(0, 10, 0));
    if (needsRerender) {
        needsRerender = false;
        camera.updateMatrixWorld();
        tilesRenderer.update();
        renderer.render(scene, camera);
    }
    renderer.render(scene, camera);
}

// リサイズ時のカメラ調整
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// マウスが動いたときの座標記録
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;
}
// // initialize threee scene
// const scene = new THREE.Scene();
// // initialize three camera
// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// );
// // initialize three renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// // initialize three controls
// const controls = new THREE.OrbitControls(camera, renderer.domElement);
// // initialize three lights
// const light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// scene.add(directionalLight);
// // initialize three tiles renderer
// const tilesRenderer = new TilesRenderer('https://assets.cms.plateau.reearth.io/assets/11/6d05db-ed47-4f88-b565-9eb385b1ebb0/13100_tokyo23-ku_2022_3dtiles%20_1_1_op_bldg_13101_chiyoda-ku_lod1/tileset.json');
// tilesRenderer.setCamera(camera);
// tilesRenderer.setResolutionFromRenderer(camera, renderer);
// scene.add(tilesRenderer.group);

// renderLoop();

// function renderLoop() {

//     requestAnimationFrame(renderLoop);

//     // The camera matrix is expected to be up to date
//     // before calling tilesRenderer.update
//     camera.updateMatrixWorld();
//     tilesRenderer.update();
//     renderer.render(scene, camera);

// }