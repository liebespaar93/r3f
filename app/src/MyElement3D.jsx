import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'

function MyElement3D() {
	const refMesh = useRef();
	useFrame((state, delta) => {
		refMesh.current.rotation.y += delta;
	})
	return (
		<>
			<directionalLight position={[1, 1, 1]} />
			<mesh ref={refMesh} rotation={[0, 45 * Math.PI / 180, 0]}>
				<boxGeometry />
				<meshStandardMaterial color="#e67e22"></meshStandardMaterial>
			</mesh>
		</>
	)
}

export default MyElement3D