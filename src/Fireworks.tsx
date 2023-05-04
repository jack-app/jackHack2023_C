import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import {
  Vector3,
  BufferGeometry, 
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  Matrix4
} from 'three'

import type { Mesh } from 'three';

// 形状データを作成
const SIZE = 100;
// 配置する個数
const LENGTH = 1000;
// 頂点情報を格納する配列
const vertices = [];
for (let i = 0; i < LENGTH; i++) {
  const r = SIZE;
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

// マテリアルを作成
const material = new PointsMaterial({
  // 一つ一つのサイズ
  size: 10,
  // 色
  color: "#CB4829"
});

// 物体を作成
const mesh = new Points(geometry, material);


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
    mesh.applyMatrix4(new Matrix4().set(
      1.01, 0, 0, 0,
      0, 1.01, 0, 0,
      0, 0, 1.01, 0,
      0, 0, 0, 1
    ))
  })
  return(
    <primitive ref={ref} object={mesh}/>
  )
}