import * as THREE from 'three'
import { CubeCamera, MeshDistortMaterial, MeshReflectorMaterial, MeshTransmissionMaterial, MeshWobbleMaterial, OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useLoader } from "@react-three/fiber"
import { RGBELoader } from "three-stdlib"
import { folder, useControls } from 'leva'
import { useEffect, useRef } from 'react'
import { DEG2RAD } from 'three/src/math/MathUtils'

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
	const textures = useTexture({
		basecolor: "./images/glass_window/basecolor.jpg",
		roughness: "./images/glass_window/roughness.jpg",
		metallic: "./images/glass_window/metallic.jpg",
		normal: "./images/glass_window/normal.jpg",
		height: "./images/glass_window/height.png",
		ao: "./images/glass_window/ambientOcclusion.jpg",
		opacity: "./images/glass_window/opacity.jpg",
	});

	const glass_window = useRef()

	useEffect(() => {
		textures.basecolor.repeat.x = textures.height.repeat.x = 
		textures.ao.repeat.x = textures.roughness.repeat.x =
		textures.metallic.repeat.x = textures.normal.repeat.x = 
		textures.opacity.repeat.x = 4

		textures.basecolor.wrapS = textures.height.wrapS = 
		textures.ao.wrapS = textures.roughness.wrapS =
		textures.metallic.wrapS = textures.normal.wrapS = 
		textures.opacity.wrapS = THREE.MirroredRepeatWrapping
		
		textures.basecolor.needsUpdate = textures.height.needsUpdate = 
		textures.ao.needsUpdate = textures.roughness.needsUpdate =
		textures.metallic.needsUpdate = textures.normal.needsUpdate = 
		textures.opacity.needsUpdate = true

		glass_window.current.geometry.setAttribute("uv2", 
			new THREE.BufferAttribute(glass_window.current.geometry.attributes.uv.array, 2)
		)

	}, [])
	return (
		<>
			<mesh ref={glass_window} rotation={[0,DEG2RAD * -90, 0]}>
				<cylinderGeometry args={[2, 2, 3, 256, 256, true]} />
				<meshStandardMaterial
					side={THREE.DoubleSide}

					map={textures.basecolor}

					roughnessMap={textures.roughness}
					roughnessMap-colorSpace={THREE.NoColorSpace}
					metalnessMap={textures.metallic}

					metalness={0.5}
					metalnessMap-colorSpace={THREE.NoColorSpace}
		
					normalMap={textures.normal}
					normalMap-colorSpace={THREE.NoColorSpace}
					normalScale={5}

					displacementMap={textures.height}
					displacementMap-colorSpace={THREE.NoColorSpace}
					displacementScale={0.2}
					displacementBias={-0.2}

					aoMap={textures.ao}

					alphaMap={textures.opacity}
					
					transparent
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
				<MyObject />
			</MyRoom>
		</>
	)
}

export default MyElement3D