import { OrbitControls, PerspectiveCamera, Plane } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import React, { useState, useEffect } from "react";
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
import FullScreen from "react-request-fullscreen";

export const App: React.FC = () => {
  const [locationPath, setLocationPath] = useState(FireWorks[0].tilesetUrl);
  const [fireworkLocation, setFireworkLocation] = useState(FireWorks[0].location);
  const onChangeLocationPath = (locationUrl: string, location: { x: number; y: number; z: number }) => {
    setLocationPath(locationUrl);
    setFireworkLocation({ x: Number(location.x), y: Number(location.y), z: Number(location.z) });
  };
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenRef = React.useRef(null);
  const onFullScreenChange = (isFullScreen) => {
    setIsFullScreen(isFullScreen);
  };
  const onClickFullScreen = () => {
    console.log(fullScreenRef.current);
    if (fullScreenRef.current) {
      fullScreenRef.current.fullScreen();
    }
  };
  return (
    <>
      <Title />
      <Description />
      <div
        onClick={onClickFullScreen}
        css={css`
          margin: 5em 5em 0 5em;
          background-color: #233B6C;
          padding: 0.5em;
          border-radius: 0.5em;
          text-align: center;
          font-weight: bold;
          cursor: pointer;
          martin: 0;
          color: white;
          &::hover {
            background-color: rgba(113, 83, 173, 0.9);
          }
        `}
      >
        全画面表示
      </div>
      <div
        css={css`
          margin-top: 1em;
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
            height: 80svh;
          `}
        >
          <FullScreen ref={fullScreenRef} onFullScreenChange={onFullScreenChange}>
            <Canvas shadows>
              <ambientLight intensity={0.1} />
              <fog attach="fog" color="#d7ecff" near={2000} far={10000} />
              {/* @ts-ignore */}
              <PerspectiveCamera makeDefault position={[-1600, 1500, -1400]} near={10} far={1e5} />
              <OrbitControls target={[-1200, 300, -800]} />
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
          </FullScreen>
        </div>
      </div>
      <Footer />
    </>
  );
};
