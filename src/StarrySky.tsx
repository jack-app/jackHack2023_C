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
    const theta =  Math.PI * Math.random();
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
    size: 50,
    // 色
    color: "#FFFFFF",
  });
  
  // 物体を作成
  const mesh = new Points(geometry, material);
  return mesh
}

// 形状データを作成
const SIZE = 9000;
// 配置する個数
const LENGTH = 3000;
let mesh = makeFireworks(SIZE, LENGTH)



export const StarrySky: React.FC = ({
}) => {
  return(
    <primitive object={mesh} position={new Vector3(0,1000,0)}/>
  )
}