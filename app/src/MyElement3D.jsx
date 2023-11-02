import * as THREE from 'three'
import { Environment, MeshReflectorMaterial, OrbitControls, useAnimations, useGLTF } from '@react-three/drei'

import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useEffect, useState } from 'react'

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

function MyModel() {
	const model = useGLTF("./models/model.glb")
	const [height, setHeight] = useState(0);

	const animation = useAnimations(model.animations, model.scene)

	const { actionName } = useControls({
		actionName: {
			value: animation.names[0],
			options: animation.names
		}
	})

	useEffect(() => {
		const action = animation.actions[actionName]
		action.reset().fadeIn(0.5).play()

		return (() => {
			action.fadeOut(0.5)
		})
	}, [actionName])

	useEffect(() => {
		let minY = Infinity
		let maxY = -Infinity

		model.scene.traverse((item) => {
			if (item.isMesh) {
				const geomBbox = item.geometry.boundingBox
				console.log(geomBbox.min.y, minY)
				if (minY > geomBbox.min.y) minY = geomBbox.min.y
				if (maxY < geomBbox.max.y) maxY = geomBbox.max.y
			}
		})
		setHeight(maxY - minY)
	}, [model.scene])

	// const h = maxY - minY

	return (
		<>
			<primitive
				scale={3}
				object={model.scene}
				position-y={-(height / 2) * 3}
			/>
		</>
	)
}

function MyObject({ ...props }) {

	return (
		<>
			<Environment preset='sunset' />
			<MyModel />
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