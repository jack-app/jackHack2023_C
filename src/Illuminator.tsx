
import { Sphere } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { ColorRepresentation, Group, Plane, Raycaster, Vector3 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import type { Mesh } from 'three';

import { Fireworks } from './Fireworks'


export const Illuminator: React.FC<{
  fireworkLocation: { x: number; y: number; z: number };
  elevation?: number;
  color?: ColorRepresentation;
}> = ({ elevation = 300, fireworkLocation = { x: 0, y: 0, z: 0 }, color = "#fd7e00" }) => {
  const ref = useRef<Group>(null)
  const lookat = useRef<Mesh>(null)
  const [raycaster] = useState(() => new Raycaster())
  const [plane] = useState(() => new Plane(new Vector3(0, 1, 0)))
  plane.constant = -elevation
  
  const [update,setUpdata]=useState<boolean>(false)

  const texture = useLoader(TextureLoader, 'circle_6.png')


  let location = new Vector3(fireworkLocation.x, fireworkLocation.y+300, fireworkLocation.z)
  useFrame(() => {
    if (ref.current == null || lookat.current == null) {
      return;
    }
    // @ts-ignore
    ref.current.position.copy(location)
    lookat.current.position.copy(ref.current.position)
    lookat.current.position.y = 2
    setUpdata(update?false:true)
  });


  return (
    <>
      <mesh ref={lookat} receiveShadow rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[700, 80]} />
        <meshLambertMaterial map={texture}/>
      </mesh>
      <group ref={ref}>
        {/* @ts-ignore */}
        {lookat.current && <spotLight
          target={lookat.current}
          intensity={1}
          angle={Math.atan(700/300)}
          color="white"
          castShadow
          shadow-radius={20}
          shadow-mapSize={[2048, 2048]}
          />}
        {/* @ts-ignore */}
      </group>
      <Fireworks position={ref.current ? ref.current.position : new Vector3 (0,0,0)} />
    </>
  );
};
