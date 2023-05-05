
import { Sphere } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { ColorRepresentation, Group, Plane, Raycaster, Vector3 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import type { Mesh } from 'three';

import { Fireworks } from './Fireworks'

export const Illuminator: React.FC<{
  elevation?: number;
  color?: ColorRepresentation;
}> = ({
  elevation = 300,

  color = '#fd7e00'
}) => {
  const ref = useRef<Group>(null)
  const lookat = useRef<Mesh>(null)
  const [raycaster] = useState(() => new Raycaster())
  const [plane] = useState(() => new Plane(new Vector3(0, 1, 0)))
  plane.constant = -elevation
  
  const [update,setUpdata]=useState<boolean>(false)

  let isFix = false;
  const fixIlluminator = () => {

    isFix = !isFix
  }
  const texture = useLoader(TextureLoader, 'circle.png')


  useFrame(({ camera, mouse }) => {
    if (ref.current == null || lookat.current == null) {
      return;
    }
    if(!isFix){
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, ref.current.position)
      // @ts-ignore
      lookat.current.position.copy(ref.current.position)
      // @ts-ignore
      lookat.current.position.y = 2
      setUpdata(update?false:true)
    }
  });


  return (
    <>
      <mesh ref={lookat} receiveShadow rotation={[-Math.PI/2,0,0]}>
        <circleGeometry args={[700, 80]} />
        <meshLambertMaterial map={texture}/>
      </mesh>
      <group ref={ref} onClick={fixIlluminator}>
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
        <Sphere args={[5, 32]}>
          <meshStandardMaterial emissive={color} emissiveIntensity={10} />
        </Sphere>
      </group>
      <Fireworks position={ref.current ? ref.current.position : new Vector3 (0,0,0)} />
    </>
  );
};
