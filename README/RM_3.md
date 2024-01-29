---
title: R3F의 Canvas
description: 간단한 Canvas 실습입니다
date: 2023-10-16T00:48:35.213Z
preview: https://i.ytimg.com/vi/SM97eEPXZ5U/maxresdefault.jpg
draft: false
tags:
    - R3F
categories:
    - R3F
---

## 🎓 강의를 기반으로 학습하는 과정입니다

> R3F 에대한 강의로 3D 웹 개발에 대하여 입문과정을 알려준다

[![image](https://i.ytimg.com/vi/SM97eEPXZ5U/maxresdefault.jpg)](https://www.youtube.com/watch?v=Sg6OcVxe64k&list=PLe6NQuuFBu7HUeJkowKRkLWwkdOlhwrje&index=3)

## 📌 체크 리스트

- [ ] ⚡️ Canvas 만들기

    <details>
    <summary>상세 보기</summary>
    <!-- summary 아래 한칸 공백 두어야함 -->

    >🗃️ 폴더 구조

    ```bash
    app
    ├── README.md
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── MyElement3D.jsx
    │   ├── assets
    │   ├── index.css
    │   └── main.jsx
    └── vite.config.js
    ```

    1. `MyElement3D` 파일 만들기

        ```jsx
        import { useFrame } from '@react-three/fiber';
        import React, { useRef } from 'react'

        function MyElement3D() {
            const refMesh = useRef();
            useFrame((state, delta) => {
                refMesh.current.rotation.y += delta;
            })
            return (
                <>
                    <directionalLight position={[1, 1, 1]} />
                    <mesh ref={refMesh} rotation={[0, 45 * Math.PI / 180, 0]}>
                        <boxGeometry />
                        <meshStandardMaterial color="#e67e22"></meshStandardMaterial>
                    </mesh>
                </>
            )
        }

        export default MyElement3D
        ```

    2. `App.jsx` 파일에 `MyElement3D` 추가하기

        ```jsx
        import React from 'react'
        import './App.css'
        import { Canvas } from '@react-three/fiber'
        import MyElement3D from './MyElement3D'

        function App() {

            return (
                <>
                <Canvas>
                    <MyElement3D />
                </Canvas>
                </>
            )
        }

        export default App
        ```

    3. `App.css` 수정 화면 비율 맞추기

        ```css
        body {
            margin: 0;
            padding: 0;
        }

        #root {
            width: 100%;
            height: 100vh;
        }
        ```

    </details>

◀️ 이전 글 : [🎓 강의 리뷰 프로젝트](./RM_2.md)
---
▶️ 다음 글 : [🎓 강의 리뷰 Canvas](./RM_3.md)
---
