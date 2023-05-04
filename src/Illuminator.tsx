import { Sphere } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import { ColorRepresentation, Group, Plane, Raycaster, Vector3 } from 'three'

export const Illuminator: React.FC<{
  elevation?: number
  color?: ColorRepresentation
}> = ({
  elevation = 300,
  color = '#fd7e00'
}) => {
  const ref = useRef<Group>(null)
  const lookat = useRef<Sphere>(null)
  const [raycaster] = useState(() => new Raycaster())
  const [plane] = useState(() => new Plane(new Vector3(0, 1, 0)))
  plane.constant = -elevation
  
  const [update,setUpdata]=useState<boolean>(false)

  let isFix = false
  const fixIlluminator = () => {
    isFix = !isFix
  }

  useFrame(({ camera, mouse }) => {
    if (ref.current == null || lookat.current == null) {
      return
    }
    if(!isFix){
      raycaster.setFromCamera(mouse, camera)
      raycaster.ray.intersectPlane(plane, ref.current.position)
      lookat.current.position.copy(ref.current.position)
      lookat.current.position.y = 0
      setUpdata(update?false:true)
    }
  })

  return (
    <>
      <Sphere ref={lookat} args={[1, 32]}/>
      <group ref={ref} onClick={fixIlluminator}>
        {lookat.current && <spotLight
          target={lookat.current}
          angle={Math.PI / 4}
          distance={1000}
          intensity={2}
          color={color}
          castShadow
          shadow-radius={20}
          shadow-mapSize={[2048, 2048]}
          />}
        <Sphere args={[5, 32]}>
          <meshStandardMaterial emissive={color} emissiveIntensity={10} />
        </Sphere>
      </group>
    </>
  )
}