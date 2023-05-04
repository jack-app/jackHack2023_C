import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import THREE, { Vector3 } from 'three'

import type { Mesh } from 'three';


export interface FireworksProps {
  position: Vector3
}

export const Fireworks: React.FC<FireworksProps> = ({
  position
}) => {
  const ref = useRef<Mesh>(null)

  useFrame(() => {
    if (ref.current == null) {
      return
    }
    ref.current.position.copy(position)
  })
  
  // Stars = new THREE.Group();
  // return <primitive object={Stars.group} />

  return(
    <mesh ref={ref}>
      <sphereGeometry args={[100, 100, 100]} />
      <meshLambertMaterial color={'#fd7e00'} />
    </mesh>
  )
}