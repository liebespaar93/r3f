import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber';

function MyElement3D() {
	const refMesh = useRef();
	useFrame((state, delta ) => {
		refMesh.current.rotation.z += delta;
	});
	
	return (
		<>
			<directionalLight position={[1, 1, 1]} />

			<axesHelper scale={10} />

			<OrbitControls />

			<mesh ref={refMesh}
				position={[0, 1, 1]}
				rotation={[0, 30 * Math.PI / 180, THREE.MathUtils.degToRad(10)]}
				scale={[2, 1, 1]}
			>
				<boxGeometry />
				<meshStandardMaterial
					color="#e67e22"
					transparent={true}
					opacity={0.5}
				/>

				<axesHelper scale={2} />
				<mesh
					position={[0.25, 0, 0]}
					scale={[0.25, 0.25, 0.25]}
				>
					<sphereGeometry />
					<meshStandardMaterial color="red" />
				<axesHelper scale={3} />
				</mesh>
			</mesh>
		</>
	)
}

export default MyElement3D