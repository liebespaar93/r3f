---
title: 환경 설정 & 프로젝트 구성
description: |-
    R3F 환경설정에 대한 내용입니다.
date: 2023-10-16T00:08:04.370Z
preview: https://i.ytimg.com/vi/CsBXYX022Pk/maxresdefault.jpg
draft: false
tags:
    - R3F
categories:
    - R3F
---

## 🎓 강의를 기반으로 학습하는 과정입니다

> R3F 에대한 강의로 3D 웹 개발에 대하여 입문과정을 알려준다

[![image](https://i.ytimg.com/vi/CsBXYX022Pk/maxresdefault.jpg)](https://www.youtube.com/watch?v=Sg6OcVxe64k&list=PLe6NQuuFBu7HUeJkowKRkLWwkdOlhwrje&index=2)

## 🌏 개발 환경 설정

### 🌏 VSCode

> VScode 소스 코드 에디터

[![image](https://code.visualstudio.com/opengraphimg/opengraph-home.png)](https://code.visualstudio.com/)

🔗 홈페이지 링크 : <https://code.visualstudio.com/>

### 🌏 Node.js

> Node.js `JavaScript` 엔진

[![image](https://nodejs.org/static/images/logo-hexagon-card.png)](https://nodejs.org/en)

🔗 홈페이지 링크 : <https://nodejs.org/en>

## 📌 체크 리스트

- [ ] 🌏 `VSCode` 설치
- [ ] 🌏 `Node.js` 설치
- [ ] 🌑 `react app` 프로젝트 생성
    <details>
    <summary>상세 보기</summary>
    <!-- summary 아래 한칸 공백 두어야함 -->

    1. 프로젝트 만들기

        ```bash
        r3f % npm create vite@latest
        ```

    2. 프로젝트 이름 정하기

        ```bash
        ? Project name: › app
        ```

    3. 프로젝트 설정 `React` 선택

        ```bash
        ✔ Project name: … app
        ? Select a framework: › - Use arrow-keys. Return to submit.
            Vanilla
            Vue
        ❯   React
            Preact
            Lit
            Svelte
            Solid
            Qwik
            Others
        ```

    4. 프로젝트 스크립 타입 설정

        ```bash
        ✔ Project name: … app
        ✔ Select a framework: › React
        ? Select a variant: › - Use arrow-keys. Return to submit.
            TypeScript
            TypeScript + SWC
        ❯   JavaScript
            JavaScript + SWC
        ```

    5. 설치 완료

        ```bash
        ✔ Project name: … app
        ✔ Select a framework: › React
        ✔ Select a variant: › JavaScript

        Scaffolding project in /Users/kyoulee/goingfree/r3f/app...

        Done. Now run:

        cd app
        npm install
        npm run dev
        ```

    </details>

- [ ] 🌑 패키지 설치
    <details>
    <summary>상세 보기</summary>
    <!-- summary 아래 한칸 공백 두어야함 -->

    1. 프로젝트 이동

        ```bash
        r3f % cd app
        ```

    2. 패키지 설치

        ```bash
        app % npm install 
        ```

    3. 서버 실행

        ```bash
        npm run dev
        ```

    </details>

- [ ] 🌑 빈 프로젝트 만들기
    <details>
    <summary>상세 보기</summary>
    <!-- summary 아래 한칸 공백 두어야함 -->

    1. public, assets 폴더 비우기

    2. `App.css`, `index.css` 파일 비우기

    3. `App.jsx` 파일 변경

        ```jsx
        import './App.css'

        function App() {

        return (
                <>
                </>
            )
        }

        export default App
        ```

    4. `index.html` 파일 변경

        ```html
        <!doctype html>

        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>R3F</title>
        </head>
        <body>
            <div id="root"></div>
            <script type="module" src="/src/main.jsx"></script>
        </body>
        </html>
        ```

    </details>

- [ ] 🌑 R3F 라이브러리 설치
    <details>
    <summary>상세 보기</summary>
    <!-- summary 아래 한칸 공백 두어야함 -->

    1. npm 업데이트

        ```bash
        app % npm update
        ```

    2. R3F 페키지 설치

        ```bash
        app % npm i three @types/three @react-three/fiber
        ```

    </details>
