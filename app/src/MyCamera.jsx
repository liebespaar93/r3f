import * as THREE from 'three'
import { OrthographicCamera, PerspectiveCamera, useHelper } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { } from "@react-three/drei"
import { folder, useControls } from 'leva'
import { useRef } from 'react'


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