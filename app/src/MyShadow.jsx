import * as THREE from 'three'
import { useHelper } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber"
import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useEffect, useRef } from 'react'


function MyDirectionalLightShadow() {
	const { visible, color, intensity, target } = useControls({
		DirectionalLight: folder({
			visible: true,
			color: "#FFFFFF",
			intensity: { value: 1, min: 0, max: 1, step: 0.001 },
			target: false,
		}),
	})
	const { top, right, left, bottom, size, bias, radius, far, blurSamples } = useControls({
		shadow: folder({
			far: { value: 20, min: 0, max: 30, step: 0.1 },
			left: { value: 3, min: -10, max: 10, step: 0.001 },
			right: { value: -3, min: -10, max: 10, step: 0.001 },
			top: { value: 3, min: -10, max: 10, step: 0.001 },
			bottom: { value: -3, min: -10, max: 10, step: 0.001 },
			size: { value: 1, min: 1, max: 10, step: 1 },
			bias: { value: -0.0001, min: -0.001, max: 0.001, step: 0.0001 },
			radius: { value: 1, min: 0, max: 16, step: 0.01 },
			// blurSamples: { value: 1, min: 0.001, max: 1, step: 0.0001 },
		}),
	})



	const light = useRef()
	const shadow = useRef()
	const { scene } = useThree()
	const helper = useHelper(light, THREE.DirectionalLightHelper)

	useFrame((state) => {
		const myBall = state.scene.getObjectByName("myBall")
		shadow.radius = radius
		if (target)
			myBall.children[0].getWorldPosition(light.current.target.position)
		if (helper)
			helper.current.visible = visible ? true : false
	}, [])

	useEffect(() => {
		shadow.current = new THREE.CameraHelper(light.current.shadow.camera)
		scene.add(shadow.current)
		return (
			() => {
				scene.remove(shadow.current)
			}
		)
	}, [light.current, shadow.current])

	return (
		<>
			<directionalLight
				ref={light}
				shadow-camera-visible={visible}
				shadow-camera-top={top}
				shadow-camera-left={left}
				shadow-camera-bottom={bottom}
				shadow-camera-right={right}
				shadow-mapsize={[512 * size, 512 * size]}
				shadow-bias={bias}
				shadow-radius={radius}
				shadow-camera-far={far}
				// shadow-blurSamples={blurSamples}
				castShadow
				visible={visible}
				color={color}
				intensity={intensity}
				position={[0, 3, 0]}
			/>
		</>
	)
}


function MyPointLightShadow() {
	const { visible, color, intensity, distance, target, p_x, p_y, p_z } = useControls({
		PointLight: folder({
			visible: true,
			color: "#FFFFFF",
			intensity: { value: 10, min: 0, max: 100, step: 0.001 },
			distance: { value: 0, min: 0, max: 50, step: 0.001 },
			target: false,
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 2, min: -10, max: 10, step: 0.001 },
				p_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
		})
	})

	const { size, bias, radius, far, blurSamples } = useControls({
		shadow: folder({
			far: { value: 0, min: 0, max: 100, step: 0.1 },
			size: { value: 1, min: 1, max: 10, step: 1 },
			bias: { value: -0.0001, min: -0.001, max: 0.001, step: 0.0001 },
			radius: { value: 4, min: 0, max: 64, step: 0.01 },
			// blurSamples: { value: 1, min: 0.001, max: 1, step: 0.0001 },
		}),
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
				castShadow
				ref={light}
				shadow-camera-visible={visible}
				shadow-mapsize={[512 * size, 512 * size]}
				shadow-bias={bias}
				shadow-radius={radius}
				shadow-camera-far={far}
				// shadow-blurSamples={blurSamples}
				visible={visible}
				color={color}
				intensity={intensity}
				position={[p_x, p_y, p_z]}
			/>
		</>
	)
}

function MySpotLightShadow() {
	const { visible, color, intensity, distance, angle, penumbra, decay, target, p_x, p_y, p_z } = useControls({
		SpotLight: folder({
			visible: false,
			color: "#FFFFFF",
			intensity: { value: 100, min: 0, max: 100, step: 0.001 },
			distance: { value: 20, min: 0, max: 50, step: 0.001 },
			angle: { value: Math.PI / 4, min: 0, max: Math.PI / 2, step: 0.001 },
			penumbra: { value: 0, min: 0, max: 1, step: 0.001 },
			decay: { value: 2, min: 0, max: 10, step: 0.001 },
			target: false,
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 6, min: -10, max: 10, step: 0.001 },
				p_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
		})
	})

	const { size, bias, radius, far, blurSamples } = useControls({
		shadow: folder({
			far: { value: 0, min: 0, max: 100, step: 0.1 },
			size: { value: 1, min: 1, max: 10, step: 1 },
			bias: { value: -0.0001, min: -0.001, max: 0.001, step: 0.0001 },
			radius: { value: 4, min: 0, max: 64, step: 0.01 },
			// blurSamples: { value: 1, min: 0.001, max: 1, step: 0.0001 },
		}),
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
				castShadow
				shadow-camera-visible={visible}
				shadow-mapsize={[512 * size, 512 * size]}
				shadow-bias={bias}
				shadow-radius={radius}
				shadow-camera-far={far}
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


function MyshadowBox() {
	return (
		<>
			{/* <MySpotLightShadow /> */}
			<mesh
				position={[0, 0, 0]}
				receiveShadow
				castShadow
				scale={15}
			>
				<boxGeometry />
				<meshStandardMaterial
					color={0xffffff} 
					shadowSide={THREE.BackSide}
					side={THREE.BackSide}
					/>

			</mesh>
		</>
	)
}