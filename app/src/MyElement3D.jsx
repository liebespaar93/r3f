import * as THREE from 'three'
import { MeshReflectorMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useRef } from 'react'

function MyRoom({ children }) {
	return (
		<mesh rotation={[THREE.MathUtils.degToRad(10), THREE.MathUtils.degToRad(45), 0]}>
			<mesh position={[0, -10, 0]} rotation={[THREE.MathUtils.degToRad(-90), 0, 0]}>
				<planeGeometry args={[20, 20]} />
				<MeshReflectorMaterial
					side={THREE.DoubleSide}
					color="#ffffff"
					roughness={0.25}
					metalness={1.0}
				/>
			</mesh>
			<mesh
				castShadow
				receiveShadow
				position={[10, 0, 0]}
				rotation={[0, THREE.MathUtils.degToRad(-90), 0]}
			>
				<planeGeometry args={[20, 20]} />
				<meshPhongMaterial
					side={THREE.DoubleSide}
					color={0xFFF5E0}
					specular={0xFFFFFF}
					shininess={50.0}
				/>
			</mesh>

			<mesh
				castShadow
				receiveShadow
				position={[0, 0, -10]}
				rotation={[0, 0, THREE.MathUtils.degToRad(-90)]}>
				<planeGeometry args={[20, 20]} />
				<meshPhongMaterial
					side={THREE.DoubleSide}
					color={0xFFF5E0}
					specular={0xFFFFFF}
					shininess={50.0}
				/>
			</mesh>
			{children}
		</mesh>
	)
}

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


function MyLightControls() {
	// const { L_x, L_y, L_z, LR_x, LR_y, LR_z, LB_x, LB_y, LB_z, LG_x, LG_y, LG_z } = useControls({
	// 	lightCntr: folder({
	// 		lightTotal: folder({
	// 			L_x: { value: 0, min: -10, max: 10, step: 0.001 },
	// 			L_y: { value: 0, min: -10, max: 10, step: 0.001 },
	// 			L_z: { value: 0, min: -10, max: 10, step: 0.001 },
	// 		}),
	// 		lightRed: folder({
	// 			LR_x: { value: 1, min: -10, max: 10, step: 0.001 },
	// 			LR_y: { value: 0, min: -10, max: 10, step: 0.001 },
	// 			LR_z: { value: 0, min: -10, max: 10, step: 0.001 },
	// 		}),
	// 		lightGreen: folder({
	// 			LG_x: { value: 0, min: -10, max: 10, step: 0.001 },
	// 			LG_y: { value: 1, min: -10, max: 10, step: 0.001 },
	// 			LG_z: { value: 0, min: -10, max: 10, step: 0.001 }
	// 		}),
	// 		lightBlue: folder({
	// 			LB_x: { value: -1, min: -10, max: 10, step: 0.001 },
	// 			LB_y: { value: 0, min: -10, max: 10, step: 0.001 },
	// 			LB_z: { value: 0, min: -10, max: 10, step: 0.001 },
	// 		})
	// 	})
	// })

	return (
		<>
			<MyAmbientLight />
			<MyHemisphereLight />
			<MyDirectionalLight />
			<MyPointLight />
			<MySpotLight />
			<MyRectAreaLight />
			{/* 
			<directionalLight color="red" position={[L_x + LR_x, L_y + LR_y, L_z + LR_z]} intensity={1.0} />
			<directionalLight color="green" position={[L_x + LG_x, L_y + LG_y, L_z + LG_z]} intensity={1.0} />
			<directionalLight color="blue" position={[L_x + LB_x, L_y + LB_y, L_z + LB_z]} intensity={1.0} /> 
			*/}
		</>
	)
}


function MyEgg() {
	return (
		<mesh>
			<sphereGeometry />

			<meshStandardMaterial
				roughness={0.2}
				metalness={0.5}
			/>
		</mesh>
	)
}

function MyRing() {
	const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32)

	const torusMaterial = new THREE.MeshStandardMaterial({
		color: 0x9b59b6,
		roughness: 0.5,
		metalness: 0.9
	})

	return (
		<>
			{
				new Array(8).fill().map((item, index) => {
					return (
						<group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
							<mesh
								geometry={torusGeometry}
								material={torusMaterial}
								position={[3, 0.5, 0]}
							/>

						</group>
					)
				})}
		</>
	)
}

function MyBall() {

	useFrame((state) => {
		const time = state.clock.elapsedTime
		const myBall = state.scene.getObjectByName("myBall")
		myBall.rotation.y = THREE.MathUtils.degToRad(time * 50)
	}, [])

	return (
		<>
			<group name='myBall'>
				<mesh position={[3, 0.5, 0]}>
					<sphereGeometry args={[0.3, 32, 32]} />
					<meshStandardMaterial
						color={0xe74c3c}
						roughness={0.2}
						metalness={0.5}
					/>
				</mesh>
			</group>
		</>
	)
}
function MyObject({ ...props }) {

	return (
		<>
			<MyEgg />
			<MyRing />
			<MyBall />
		</>
	)
}

function MyElement3D() {

	return (
		<>
			<OrbitControls />
			<MyLightControls />
			<MyRoom>
				<MyObject />
			</MyRoom>
		</>
	)
}

export default MyElement3D