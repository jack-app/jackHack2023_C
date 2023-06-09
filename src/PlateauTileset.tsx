import { TilesRenderer } from '3d-tiles-renderer'
import { useFrame, useThree } from '@react-three/fiber'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Box3, Matrix4, Mesh, MeshLambertMaterial, Vector3 } from 'three'
import { GLTFLoader } from 'three-stdlib'
import { CesiumRTCPlugin } from "./CesiumRTCPlugin";
import { PlateauTilesetTransformContext } from "./PlateauTilesetTransform";

const gltfLoader = new GLTFLoader();
gltfLoader.register((parser) => new CesiumRTCPlugin(parser));

const material = new MeshLambertMaterial({
  opacity: 0.1,
  transparent: true,
  depthTest: false
})

export interface PlateauTilesetProps {
  path: string;
  center?: boolean;
}

export const PlateauTileset: React.FC<PlateauTilesetProps> = ({ path, center = false }) => {
  const { setCenter } = useContext(PlateauTilesetTransformContext);
  const centerRef = useRef(center);
  centerRef.current = center;
  let centerForDiff = new Vector3();

  const createTiles = useCallback(
    (path: string) => {
      const tiles = new TilesRenderer(path);
      tiles.manager.addHandler(/\.gltf$/, gltfLoader);
      console.log(path);

      // `center` が指定されているとき、タイルの境界ボックスの底面の中央を
      // PlateauTilesetTransform の位置として指定する。
      tiles.onLoadTileSet = () => {
        if (centerRef.current) {
          const box = new Box3();
          const matrix = new Matrix4();
          tiles.getOrientedBounds(box, matrix);
          box.min.z = box.max.z = Math.min(box.min.z, box.max.z);
          box.applyMatrix4(matrix);
          const center = new Vector3();
          box.getCenter(center);
          setCenter(center);
        }
      };

      // タイル内のすべてのオブジェクトに影とマテリアルを適用する。
      tiles.onLoadModel = (scene) => {
        scene.traverse((object) => {
          object.castShadow = true;
          object.receiveShadow = true;
          if (object instanceof Mesh) {
            object.material = material;
          }
        });
      };
      return tiles;
    },
    [setCenter]
  );

  // TilesRenderer のライフサイクル
  const [tiles, setTiles] = useState(() => createTiles(path));

  const pathRef = useRef(path);
  useEffect(() => {
    if (path !== pathRef.current) {
      pathRef.current = path;
      setTiles(createTiles(path));
    }
  }, [path, createTiles]);

  useEffect(() => {
    return () => {
      tiles.dispose();
    };
  }, [tiles]);

  const camera = useThree(({ camera }) => camera);
  const gl = useThree(({ gl }) => gl);

  // TilesRenderer と React の状態を同期する。
  useEffect(() => {
    tiles.setCamera(camera);
  }, [tiles, camera]);

  useEffect(() => {
    tiles.setResolutionFromRenderer(camera, gl);
  }, [tiles, camera, gl]);

  useFrame(() => {
    tiles.update();
  });

  return <primitive object={tiles.group} />;
};
