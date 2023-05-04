import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React, { useState } from "react";

import { Illuminator } from "../src/Illuminator";
import { PlateauTileset } from "../src/PlateauTileset";
import { PlateauTilesetTransform } from "../src/PlateauTilesetTransform";
import { Title } from "./Title";
import { Description } from "./Description";
import { Footer } from "./Footer";
import { LocationSelect } from "./LocationSelect";
import { LocationPaths } from "./constants";

export const App: React.FC = () => {
  const [locationPath, setLocationPath] = useState(LocationPaths[0].URL);
  const onChangeLocationPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocationPath(event.target.value);
  };
  // 最低標高
  const [minHeight, setMinHeight] = useState(12);
  const onChangeMinHeight = (value: number) => {
    setMinHeight(Math.max(value, 12));
  };
  return (
    <>
      <Title />
      <Description />
      <LocationSelect onChangeLocation={onChangeLocationPath} />
      <Canvas shadows>
        <axesHelper args={[1000]} />
        <fogExp2 attach='fog' color='#d7ecff' density={0.0002} />
        <PerspectiveCamera
          makeDefault
          position={[-1600, minHeight + 400, -1400]}
          near={10}
          far={1e5}
        />
        <OrbitControls target={[-1200, 0, -800]} />
        {/* <Plane
          args={[1e5, 1e5]}
          position={[0, minHeight, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial color='white' />
        </Plane> */}
        <PlateauTilesetTransform>
          <PlateauTileset path={locationPath} center/>
        </PlateauTilesetTransform>
        <Illuminator />
        <EffectComposer>
          <SSAO intensity={3000} blendFunction={BlendFunction.OVERLAY} />
          <Bloom intensity={2} />
        </EffectComposer>
      </Canvas>
      <Footer />
    </>
  );
};
