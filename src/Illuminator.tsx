import { Sphere } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { ColorRepresentation, Group, Plane, Raycaster, Vector3 } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import type { Mesh } from "three";

import { Fireworks } from './Fireworks'

export const Illuminator: React.FC<{
  fireworkLocation: { x: number; y: number; z: number };
  elevation?: number;
  color?: ColorRepresentation;
}> = ({ elevation = 300, fireworkLocation = { x: 0, y: 0, z: 0 }, color = "#fd7e00" }) => {
  const ref = useRef<Group>(null);
  const lookat = useRef<Mesh>(null);
  const [plane] = useState(() => new Plane(new Vector3(0, 1, 0)));
  plane.constant = -elevation;
  const location = new Vector3(fireworkLocation.x, fireworkLocation.y, fireworkLocation.z);

  let isFix = false;
  const fixIlluminator = () => {
    isFix = !isFix;
  };
  const texture = useLoader(TextureLoader, "circle.png");

  useFrame(() => {
    if (ref.current == null || lookat.current == null) {
      return;
    }
    ref.current.position.set(location.x, location.y + 300, location.z);
  });

  return (
    <>
      <mesh ref={lookat} position={location} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[700, 80]} />
        <meshLambertMaterial map={texture} />
      </mesh>
      <group ref={ref} onClick={fixIlluminator}>
        {/* @ts-ignore */}
        {lookat.current && <spotLight target={lookat.current} intensity={1} angle={Math.atan(700 / 300)} color="white" castShadow shadow-radius={20} shadow-mapSize={[2048, 2048]} />}
        {/* @ts-ignore */}
        <Sphere args={[5, 32]}>
          <meshStandardMaterial emissive={color} emissiveIntensity={10} />
        </Sphere>
      </group>
      <Fireworks position={ref.current ? ref.current.position : new Vector3 (0,0,0)} />
    </>
  );
};
