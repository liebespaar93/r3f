import * as THREE from 'three'
import { CubeCamera, MeshDistortMaterial, MeshReflectorMaterial, MeshTransmissionMaterial, MeshWobbleMaterial, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from "@react-three/fiber"
import { RGBELoader } from "three-stdlib"
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
function MyCubeCamera() {
	const texture = useLoader(RGBELoader, './images/hdr/cayley_interior_4k.hdr')
	// const texture = useLoader(RGBELoader, './images/hdr/studio_small_09_4k.hdr')

	const config = useControls({
		CubeCamera: folder({
			visible: false,
			transparent: true,
			roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
			metalness: { value: 1.0, min: 0, max: 1, step: 0.01 },
			opacity: { value: 0.8, min: 0, max: 1, step: 0.01 },
			toneMapped: true
		})
	})
	return (
		<>
			<directionalLight position={[0, 1, 0]} />
			<CubeCamera resolution={1024} frames={1} envMap={texture}>
				{(texture) => (
					<mesh>
						<dodecahedronGeometry />
						<MeshReflectorMaterial {...config}
							envMap={texture}
						/>
					</mesh>
				)}
			</CubeCamera>
		</>
	)
}

function MyGlass() {
	const config = useControls({
		Glass: folder({
			visible: false,
			transmissionSampler: false,
			backside: false,
			resolution: { value: 2048, min: 256, max: 2048, step: 256 },
			transmission: { value: 1, min: 0, max: 1 },
			roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
			thickness: { value: 3.5, min: 0, max: 10, step: 0.01 },
			ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
			chromaticAberration: { value: 0.06, min: 0, max: 1 },
			anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
			distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
			distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
			temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
			clearcoat: { value: 1, min: 0, max: 1 },
			attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
			attenuationcolor: '#ffffff',
			bg: '#839681'
		})
	})
	return (
		<>
			<mesh>
				<sphereGeometry />
				<MeshTransmissionMaterial {...config} background={new THREE.Color(config.bg)} />
			</mesh>

		</>
	)
}

function MyWobble() {
	const config = useControls({
		Wobble: folder({
			visible: true,
			factor: { value: 1, min: 0, max: 10, step: 1 },
			speed: { value: 1, min: 0, max: 100, step: 1 },
			color: "#F8D628",
			foo: { options: { none: '', notting: '', test: '' } }
		})
	})
	return (
		<>
			<mesh scale={0.3}>
				<torusGeometry args={[0.5, 0.2, 32]} />
				<MeshWobbleMaterial
					{...config}
				/>
			</mesh>
		</>
	)
}

function MyDistort() {

	const config = useControls({
		Distort: folder({
			visible: true,
			distort: { value: 1, min: 0, max: 10, step: 1 },
			speed: { value: 1, min: 0, max: 100, step: 1 },
			color: "#F8D628"
		})
	})
	return (
		<>
			<mesh scale={0.7}>
				<torusGeometry args={[0.5, 0.2, 32]} />
				<MeshDistortMaterial
					{...config}
				/>
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
				<MyCubeCamera />
				<MyGlass />
				<MyWobble />
				<MyDistort />
				{/* <MyObject /> */}
			</MyRoom>
		</>
	)
}

export default MyElement3D