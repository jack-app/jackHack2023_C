import { useFrame } from '@react-three/fiber'
import React, { useRef, useState, useEffect } from 'react'
import {
  Vector3,
  BufferGeometry, 
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  Matrix4
} from 'three'

import type { Mesh } from 'three';



function makeFireworks(radious, length){
  // 頂点情報を格納する配列
  const vertices = [];
  for (let i = 0; i < length; i++) {
    const r = radious;
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.PI * Math.random();
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y =  r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);
    
    vertices.push(x, y, z);
  }
  
  // 形状データを作成
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
  geometry.computeBoundingBox ()
  geometry.center()
  
  // マテリアルを作成
  const material = new PointsMaterial({
    // 一つ一つのサイズ
    size: 10,
    // 色
    color: "#f49100",
    transparent : true
  });
  
  // 物体を作成
  const mesh = new Points(geometry, material);
  return mesh
}

// 形状データを作成
const SIZE = 10;
// 配置する個数
const LENGTH = 1000;
let mesh = makeFireworks(SIZE, LENGTH)

let flame = 0
function fireworksRadious(t:number){
  return Math.sqrt(SIZE + t)*30
}

export interface FireworksProps {
  position: Vector3
}


export const Fireworks: React.FC<FireworksProps> = ({
  position
}) => {
  const ref = useRef<Mesh>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      mesh = makeFireworks(SIZE, LENGTH)
      flame = 0
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  useFrame(() => {
    if (ref.current == null) {
      return
    }
    
    flame += 1
    const dr = fireworksRadious(flame+1)/fireworksRadious(flame)
    mesh.applyMatrix4(new Matrix4().set(
      dr, 0, 0, 0,
      0, dr, 0, 0,
      0, 0, dr, 0,
      0, 0, 0, 1
    ))
    mesh.material.opacity = Math.max(0, mesh.material.opacity-0.01)
    ref.current.position.copy(position)
  })
  return(
    <primitive ref={ref} object={mesh}/>
  )
}