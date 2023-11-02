import * as THREE from 'three'
import { MeshReflectorMaterial, OrbitControls, OrthographicCamera, PerspectiveCamera, useHelper } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber"
import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useEffect, useRef } from 'react'

function MyRoom({ children }) {
	return (
		<mesh rotation={[THREE.MathUtils.degToRad(10), THREE.MathUtils.degToRad(45), 0]}>
			<mesh position={[0, -10, 0]}
				rotation={[THREE.MathUtils.degToRad(-90), 0, 0]}
				receiveShadow
				castShadow
			>
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


function MyLightControls() {
	const { visible, L_x, L_y, L_z, LR_x, LR_y, LR_z, LB_x, LB_y, LB_z, LG_x, LG_y, LG_z } = useControls({
		lightCntr: folder({
			visible: true,
			lightTotal: folder({
				L_x: { value: 0, min: -10, max: 10, step: 0.001 },
				L_y: { value: 0, min: -10, max: 10, step: 0.001 },
				L_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
			lightRed: folder({
				LR_x: { value: 1, min: -10, max: 10, step: 0.001 },
				LR_y: { value: 0, min: -10, max: 10, step: 0.001 },
				LR_z: { value: 0, min: -10, max: 10, step: 0.001 },
			}),
			lightGreen: folder({
				LG_x: { value: 0, min: -10, max: 10, step: 0.001 },
				LG_y: { value: 1, min: -10, max: 10, step: 0.001 },
				LG_z: { value: 0, min: -10, max: 10, step: 0.001 }
			}),
			lightBlue: folder({
				LB_x: { value: -1, min: -10, max: 10, step: 0.001 },
				LB_y: { value: 0, min: -10, max: 10, step: 0.001 },
				LB_z: { value: 0, min: -10, max: 10, step: 0.001 },
			})
		})
	})

	return (
		<>
			<directionalLight visible={visible} color="red" position={[L_x + LR_x, L_y + LR_y, L_z + LR_z]} intensity={1.0} />
			<directionalLight visible={visible} color="green" position={[L_x + LG_x, L_y + LG_y, L_z + LG_z]} intensity={1.0} />
			<directionalLight visible={visible} color="blue" position={[L_x + LB_x, L_y + LB_y, L_z + LB_z]} intensity={1.0} />

		</>
	)
}


function MyEgg() {
	return (
		<mesh
			receiveShadow 
			>
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
								castShadow
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
				<mesh position={[3, 0.5, 0]}
					castShadow
				>
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
			<MySpotLightShadow />
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
function MyObject({ ...props }) {

	return (
		<>
			<MyshadowBox />
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
			<MyRoom>
				<MyObject />
			</MyRoom>
			<MyLightControls />
		</>
	)
}

export default MyElement3D