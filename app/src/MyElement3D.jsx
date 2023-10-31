import * as THREE from 'three'
import { MeshReflectorMaterial, OrbitControls, OrthographicCamera, PerspectiveCamera, useHelper } from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber"
import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useEffect, useRef } from 'react'

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


function MyLightControls() {
	const { L_x, L_y, L_z, LR_x, LR_y, LR_z, LB_x, LB_y, LB_z, LG_x, LG_y, LG_z } = useControls({
		lightCntr: folder({
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
			<directionalLight color="red" position={[L_x + LR_x, L_y + LR_y, L_z + LR_z]} intensity={1.0} />
			<directionalLight color="green" position={[L_x + LG_x, L_y + LG_y, L_z + LG_z]} intensity={1.0} />
			<directionalLight color="blue" position={[L_x + LB_x, L_y + LB_y, L_z + LB_z]} intensity={1.0} />

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

function MyPerspectiveCamera() {
	const helper = useRef()
	useHelper(helper, THREE.CameraHelper)

	const { aspect, far, filmGauge, filmOffset, focus, fov, near, zoom, target, p_x, p_y, p_z, r_x, r_y, r_z } = useControls({
		PerspectiveCamera: folder({
			aspect: { value: 0, min: 0, max: 1, step: 0.001 },
			far: { value: 10, min: 0.001, max: 100, step: 0.001 },
			filmGauge: { value: 35, min: 0, max: 50, step: 0.001 },
			filmOffset: { value: 0, min: 0, max: 1, step: 0.001 },
			focus: { value: 10, min: 0, max: 10, step: 0.001 },
			fov: { value: 50, min: 0, max: 179, step: 0.001 },
			near: { value: 0.1, min: 0.001, max: 20, step: 0.001 },
			zoom: { value: 0, min: -10, max: 10, step: 0.001 },
			target: { options: { camera: 0, helper: 1, ball: 2 } },
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 4, min: -10, max: 10, step: 0.001 },
				p_z: { value: 6, min: -10, max: 10, step: 0.001 },
			}),
			rotation: folder({
				r_x: { value: 0, min: - Math.PI, max: Math.PI, step: 0.001 },
				r_y: { value: 0, min: - Math.PI, max: Math.PI, step: 0.001 },
				r_z: { value: 0, min: - Math.PI, max: Math.PI, step: 0.001 },
			})
		})
	})

	useFrame((state) => {
		const myBall = state.scene.getObjectByName("myBall")

		if (target == 1) {
			state.camera.position.copy(helper.current.position)
			state.camera.setRotationFromEuler(helper.current.rotation)
		}
		else if (target == 2) {
			const position = new THREE.Vector3()
			state.camera.position.copy(myBall.children[0].getWorldPosition(position))
			state.camera.rotateY(THREE.MathUtils.degToRad(-50))
		}
	}, [])


	if (helper.current) {
		helper.current.aspect = aspect
		helper.current.far = far
		helper.current.filmGauge = filmGauge
		helper.current.filmOffset = filmOffset
		helper.current.focus = focus
		helper.current.fov = fov
		helper.current.near = near
		// helper.current.zoom = zoom
	}
	return (
		<>
			<PerspectiveCamera
				ref={helper}
				position={[p_x, p_y, p_z]}
				rotation={[r_x, r_y, r_z]} />
		</>
	)
}

function MyOrthographicCamera() {
	const helper = useRef()
	const aa = useHelper(helper, THREE.CameraHelper)

	console.log(helper)
	const { left, right, top, bottom, far, near, zoom, target, p_x, p_y, p_z, r_x, r_y, r_z } = useControls({
		OrthographicCamera: folder({
			left: { value: 10, min: -20, max: 20, step: 0.001 },
			right: { value: -10, min: -20, max: 20, step: 0.001 },
			top: { value: 10, min: -20, max: 20, step: 0.001 },
			bottom: { value: -10, min: -20, max: 20, step: 0.001 },
			far: { value: 50, min: 0.001, max: 100, step: 0.001 },
			near: { value: 1, min: 0.001, max: 20, step: 0.001 },
			zoom: { value: 0, min: -10, max: 10, step: 0.001 },
			target: { options: { camera: 0, helper: 1 } },
			position: folder({
				p_x: { value: 0, min: -10, max: 10, step: 0.001 },
				p_y: { value: 4, min: -10, max: 10, step: 0.001 },
				p_z: { value: 6, min: -10, max: 10, step: 0.001 },
			}),
			rotation: folder({
				r_x: { value: 0, min: - Math.PI, max: Math.PI, step: 0.001 },
				r_y: { value: 0, min: - Math.PI, max: Math.PI, step: 0.001 },
				r_z: { value: 0, min: - Math.PI, max: Math.PI, step: 0.001 },
			})
		})
	})

	return (
		<>

			{target == 0 &&
				<OrthographicCamera
					makeDefault={true}
					ref={helper}
					zoom={1}
					top={top}
					bottom={bottom}
					left={left}
					right={right}
					near={1}
					far={far}
					position={[p_x, p_y, p_z]}
					rotation={[r_x, r_y, r_z]}
				/>
			}
			{target == 1 &&
				<OrthographicCamera
					ref={helper}
					makeDefault={false}
					zoom={1}
					top={top}
					bottom={bottom}
					left={left}
					right={right}
					near={1}
					far={far}
					position={[p_x, p_y, p_z]}
					rotation={[r_x, r_y, r_z]}
				/>
			}
		</>
	)
}


function MyElement3D() {
	const { cam } = useControls({
		cam: { options: { MyPerspectiveCamera: 0, MyOrthographicCamera: 1 } },
	})
	return (
		<>
			<OrbitControls />
			{cam == 0 && <MyPerspectiveCamera />}
			{cam == 1 && <MyOrthographicCamera />}
			<MyLightControls />
			<MyRoom>
				<MyObject />
			</MyRoom>
		</>
	)
}

export default MyElement3D