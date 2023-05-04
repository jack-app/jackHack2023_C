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
import { FireWorks } from "./constants";

export const App: React.FC = () => {
  const [locationPath, setLocationPath] = useState(FireWorks[0].tilesetUrl);
  const [fireworkLocation, setFireworkLocation] = useState(FireWorks[0].location);
  const onChangeLocationPath = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [locationUrl, x, y, z] = event.target.value.split(",");
    setLocationPath(locationUrl);
    setFireworkLocation({ x: Number(x), y: Number(y), z: Number(z) });
  };

  return(
  <>
    <Title />
    <Description />
    <LocationSelect onChangeLocation={onChangeLocationPath} />
    <Canvas shadows>
      <ambientLight intensity={0.1} />  
      <fog attach='fog' color='#d7ecff' near={2000} far={10000} />
      {/* @ts-ignore */}
      <PerspectiveCamera
        makeDefault
        position={[-1600, 450, -1400]}
        near={10}
        far={1e5}
      />
      <OrbitControls target={[-1200, 0, -800]} />
      {/* @ts-ignore */}
      <Plane
        args={[1e5, 1e5]}
        position={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color='gray' />
      </Plane>
      <PlateauTilesetTransform>
        <PlateauTileset path="bldg/13100_tokyo/13101_chiyoda-ku/notexture" center />
        <PlateauTileset path="bldg/13100_tokyo/13102_chuo-ku/notexture" />
      </PlateauTilesetTransform>
      <Illuminator />
      <EffectComposer>
        <SSAO intensity={3000} blendFunction={BlendFunction.OVERLAY} />
        <Bloom intensity={2} />
      </EffectComposer>
    </Canvas>
    <Footer />
  </>
)};

