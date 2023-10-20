import * as THREE from 'three'
import { MeshReflectorMaterial, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
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
function MyObject({ ...props }) {
	const raidus = 3;
	const matcap = useTexture("./images/matcap/matcap.jpg");

	return (
		<>
			<mesh position={[0, 0, 0]} rotation={[0, 0, THREE.MathUtils.degToRad(-90)]}>
				<sphereGeometry
					args={[raidus]}
				/>
				<meshPhysicalMaterial
					side={THREE.FrontSide}
					color="#FFFFFF"

					emissive={0x000000}
					roughness={1.0}
					metalness={0.0}
					clearcoat={1.0}
					clearcoatRoughness={0.1}
				/>
			</mesh>
			<mesh position={[0, 4, 0]}>
				<sphereGeometry />
				<meshMatcapMaterial matcap={matcap}
				flatShading={true} />
			</mesh>
		</>
	)
}

function MyElement3D() {
	useEffect(() => {

	}, [])

	return (
		<>
			<OrbitControls />

			<ambientLight intensity={0.2} />
			<MyLightControls />

			<MyRoom>
				<MyObject />
			</MyRoom>
		</>
	)
}

export default MyElement3D