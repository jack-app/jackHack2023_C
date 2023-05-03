import { OrbitControls, PerspectiveCamera, Plane } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, SSAO } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import React from 'react'

import { Illuminator } from '../src/Illuminator'
import { PlateauTileset } from '../src/PlateauTileset'
import { PlateauTilesetTransform } from '../src/PlateauTilesetTransform'

export const App: React.FC = () => (
  <Canvas shadows>
    <fogExp2 attach='fog' color='#d7ecff' density={0.0002} />
    <PerspectiveCamera
      makeDefault
      position={[-1600, 450, -1400]}
      near={10}
      far={1e5}
    />
    <OrbitControls target={[-1200, 0, -800]} />
    <Plane
      args={[1e5, 1e5]}
      position={[0, 12, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial color='white' />
    </Plane>
    <PlateauTilesetTransform>
      <PlateauTileset
        path='bldg/13100_tokyo/13101_chiyoda-ku/notexture'
        center
      />
      <PlateauTileset path='bldg/13100_tokyo/13102_chuo-ku/notexture' />
    </PlateauTilesetTransform>
    <Illuminator />
    <EffectComposer>
      <SSAO intensity={3000} blendFunction={BlendFunction.OVERLAY} />
      <Bloom intensity={2} />
    </EffectComposer>
  </Canvas>
)