import React from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import MyElement3D from './MyElement3D'
import { Color } from 'three'

function App() {
  const camera = { orthographic: false, near: 0.5, far: 100, position: [0, 4, 8] }
  const bgColor = new Color(0x222222);
  return (
    <>
      <Canvas>
        <color
          attach="background"
          args={[bgColor.r, bgColor.g, bgColor.b]}
        />

        <MyElement3D />
      </Canvas>
    </>
  )
}

export default App
