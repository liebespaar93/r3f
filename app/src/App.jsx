import React from 'react'
import './App.css'
import { Canvas } from '@react-three/fiber'
import MyElement3D from './MyElement3D'
import { Color } from 'three'

function App() {
  const camera = { near: 0.5, far: 100}
  const bgColor = new Color(0x222222);
  return (
    <>
      <Canvas camera={camera} >
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
