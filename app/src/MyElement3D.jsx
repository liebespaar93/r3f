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