import * as THREE from "three";
import { Box3, Matrix4, Mesh, Vector3 } from 'three'
import { TilesRenderer } from '3d-tiles-renderer';
import { GLTFLoader } from 'three-stdlib'
import { CesiumRTCPlugin } from './CesiumRTCPlugin'

let mouseX = 0,
    mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let tilesRenderer = null;
// シーンを追加
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x333333);

// // ライトを追加
// // 環境光
const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
scene.add(ambientLight);
// // 太陽光
// const light = new THREE.DirectionalLight(0xffffff, 1);
// scene.add(light);
// // ポイントライト
// const pointLight = new THREE.PointLight(0xffffff, 0.8);
// scene.add(pointLight);

// // 1km四方の地面を追加
// const geometry = new THREE.PlaneGeometry(1000, 1000);
// const material = new THREE.MeshBasicMaterial({ color: 0x666666, side: THREE.DoubleSide });
// const plane = new THREE.Mesh(geometry, material);
// plane.rotation.x = (90 * Math.PI) / 180;
// scene.add(plane);

// カメラの追加
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.z = 500;

// レンダラーを追加
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const url = 'https://plateau.geospatial.jp/main/data/3d-tiles/bldg/01100_sapporo/notexture/tileset.json'
// const url = 'https://assets.cms.plateau.reearth.io/assets/11/6d05db-ed47-4f88-b565-9eb385b1ebb0/13100_tokyo23-ku_2022_3dtiles%20_1_1_op_bldg_13101_chiyoda-ku_lod1/tileset.json'
const url = 'https://plateau.geospatial.jp/main/data/3d-tiles/bldg/13100_tokyo/13101_chiyoda-ku/notexture/tileset.json'
const createTiles = () => {
    const tilesRenderer = new TilesRenderer(url);
    console.log(tilesRenderer)
    const gltfLoader = new GLTFLoader()
    gltfLoader.register(parser => new CesiumRTCPlugin(parser))

    tilesRenderer.manager.addHandler(/\.gltf$/, gltfLoader);
    tilesRenderer.setCamera(camera);
    tilesRenderer.setResolutionFromRenderer(camera, renderer);
    // tilesRenderer.onLoadTileSet = () => {
    //     // if (centerRef.current) {
    //     const box = new Box3()
    //     const matrix = new Matrix4()
    //     tilesRenderer.getOrientedBounds(box, matrix)
    //     box.min.z = box.max.z = Math.min(box.min.z, box.max.z)
    //     box.applyMatrix4(matrix)
    //     const center = new Vector3()
    //     box.getCenter(center)
    //     // setCenter(center)
    //     // }
    // }


    // タイル内のすべてのオブジェクトに影とマテリアルを適用する。
    tilesRenderer.onLoadModel = scene => {
        console.log(scene)
        scene.traverse(object => {
            object.castShadow = true
            object.receiveShadow = true
            if (object instanceof Mesh) {
                object.material = material
            }
        })
    }
    return tilesRenderer
}


console.log(scene.children)
// 描画開始

tilesRenderer = createTiles()
scene.add(tilesRenderer.group);
animate();

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
    if (tilesRenderer) {
        tilesRenderer.update();
    }
    // console.log(tilesRenderer)
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
