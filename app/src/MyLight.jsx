import * as THREE from 'three'
import { MeshReflectorMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useRef } from 'react'

function MyAmbientLight() {
	const { visible, color, intensity } = useControls({
		AmbientLight: folder({
			visible: false,
			color: "#FFFFFF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
		})
	})
	return (
		<>
			<ambientLight
				visible={visible}
				color={color}
				intensity={intensity} />
		</>
	)
}

function MyHemisphereLight() {
	const { visible, color, groundColor, intensity } = useControls({
		HemisphereLight: folder({
			visible: false,
			color: "#FF0000",
			groundColor: "#0000FF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
		})
	})
	return (
		<>
			<hemisphereLight
				visible={visible}
				color={color}
				groundColor={groundColor}
				intensity={intensity} />
		</>
	)
}

function MyDirectionalLight() {
	const { visible, color, intensity, target, p_x, p_y, p_z } = useControls({
		DirectionalLight: folder({
			visible: false,
			color: "#FFFFFF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
			target: false,
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 2, min: -10, max: 10, step: 0.001 },
				p_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
		})
	})

	const light = useRef()

	const helper = useHelper(light, THREE.DirectionalLightHelper)

	useFrame((state) => {
		const myBall = state.scene.getObjectByName("myBall")
		if (target)
			myBall.children[0].getWorldPosition(light.current.target.position)
		if (helper)
			helper.current.visible = visible ? true : false
	}, [])

	return (
		<>
			<directionalLight
				visible={visible}
				ref={light}
				color={color}
				intensity={intensity}
				position={[p_x, p_y, p_z]}
			/>
		</>
	)
}


function MyPointLight() {
	const { visible, color, intensity, distance, target, p_x, p_y, p_z } = useControls({
		PointLight: folder({
			visible: false,
			color: "#FFFFFF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
			distance: { value: 0, min: 0, max: 50, step: 0.001 },
			target: false,
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 2, min: -10, max: 10, step: 0.001 },
				p_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
		})
	})

	const light = useRef()
	const helper = useHelper(light, THREE.PointLightHelper, 0.5)

	useFrame((state) => {
		const myBall = state.scene.getObjectByName("myBall")
		if (target)
			myBall.children[0].getWorldPosition(light.current.position)
		if (helper)
			helper.current.visible = visible ? true : false
	}, [])

	return (
		<>
			<pointLight
				visible={visible}
				ref={light}
				color={color}
				intensity={intensity}
				distance={distance}
				position={[p_x, p_y, p_z]}
			/>
		</>
	)
}

function MySpotLight() {
	const { visible, color, intensity, distance, angle, penumbra, decay, target, p_x, p_y, p_z } = useControls({
		SpotLight: folder({
			visible: false,
			color: "#FFFFFF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
			distance: { value: 0, min: 0, max: 50, step: 0.001 },
			angle: { value: Math.PI / 3, min: 0, max: Math.PI / 2, step: 0.001 },
			penumbra: { value: 0, min: 0, max: 1, step: 0.001 },
			decay: { value: 2, min: 0, max: 10, step: 0.001 },
			target: false,
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 2, min: -10, max: 10, step: 0.001 },
				p_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
		})
	})

	const light = useRef()
	const helper = useHelper(light, THREE.SpotLightHelper)

	useFrame((state) => {
		const myBall = state.scene.getObjectByName("myBall")
		if (target)
			myBall.children[0].getWorldPosition(light.current.target.position)
		if (helper)
			helper.current.visible = visible ? true : false
	}, [])

	return (
		<>
			<spotLight
				visible={visible}
				ref={light}
				color={color}
				intensity={intensity}
				distance={distance}
				angle={angle}
				penumbra={penumbra}
				decay={decay}
				position={[p_x, p_y, p_z]}
			/>
		</>
	)
}

function MyRectAreaLight() {
	const { visible, color, intensity, distance, width, height, p_x, p_y, p_z } = useControls({
		RectAreaLight: folder({
			visible: false,
			color: "#FFFFFF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
			distance: { value: 0, min: 0, max: 50, step: 0.001 },
			width: { value: 10, min: 0, max: 50, step: 0.001 },
			height: { value: 10, min: 0, max: 50, step: 0.001 },
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 2, min: -10, max: 10, step: 0.001 },
				p_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
		})
	})

	const light = useRef()
	return (
		<>
			<rectAreaLight
				visible={visible}
				ref={light}
				color={color}
				intensity={intensity}
				distance={distance}
				width={width}
				height={height}
				position={[p_x, p_y, p_z]}
			/>
		</>
	)
}
