import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React, { useState } from "react";
import { css } from "@emotion/react";

import { Illuminator } from "../src/Illuminator";
import { PlateauTileset } from "../src/PlateauTileset";
import { PlateauTilesetTransform } from "../src/PlateauTilesetTransform";
import { Title } from "./Title";
import { Description } from "./Description";
import { Footer } from "./Footer";
import { LocationSelect } from "./LocationSelect";
import { FireWorks } from "./constants";
import { sp, pc, vw } from "./media";

export const App: React.FC = () => {
  const [locationPath, setLocationPath] = useState(FireWorks[0].tilesetUrl);
  const [fireworkLocation, setFireworkLocation] = useState(FireWorks[0].location);
  const onChangeLocationPath = (locationUrl: string, location: { x: number; y: number; z: number }) => {
    setLocationPath(locationUrl);
    setFireworkLocation({ x: Number(location.x), y: Number(location.y), z: Number(location.z) });
  };

  return (
    <>
      <Title />
      <Description />
      <div
        css={css`
          ${pc`
          display: flex;
          flex-direction: row;
          `}
        `}
      >
        <LocationSelect onChangeLocation={onChangeLocationPath} />
        <div
          css={css`
            width: 100%;
          `}
        >
          <Canvas shadows>
            <ambientLight intensity={0.1} />
            <fog attach="fog" color="#d7ecff" near={2000} far={10000} />
            {/* @ts-ignore */}
            <PerspectiveCamera makeDefault position={[-1600, 450, -1400]} near={10} far={1e5} />
            <OrbitControls target={[-1200, 0, -800]} />
            {/* @ts-ignore */}
            <Plane args={[1e5, 1e5]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <meshStandardMaterial color="gray" />
            </Plane>
            <PlateauTilesetTransform>
              <PlateauTileset path={locationPath} center />
            </PlateauTilesetTransform>
            <Illuminator fireworkLocation={fireworkLocation} />
            <EffectComposer>
              <SSAO intensity={3000} blendFunction={BlendFunction.OVERLAY} />
              <Bloom intensity={2} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>
      <Footer />
    </>
  );
};
