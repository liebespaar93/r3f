import { useEffect, useRef } from 'react';
import { Box, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
function MyBox(prop) {
	const geom = new THREE.BoxGeometry();
	return (
		<mesh {...prop} geometry={geom}>
		</mesh>)
}

function MyElement3D() {
	const refMash = useRef();
	const refWireMash = useRef();

	const { xSize, ySize, zSize, xSegements, ySegements, zSegements, xRotation, yRotation, zRotation } = useControls({
		xSize: { value: 1, min: 0.1, max: 10, step: 0.1 },
		ySize: { value: 1, min: 0.1, max: 10, step: 0.1 },
		zSize: { value: 1, min: 0.1, max: 10, step: 0.1 },
		xSegements: { value: 1, min: 1, max: 10, step: 1 },
		ySegements: { value: 1, min: 1, max: 10, step: 1 },
		zSegements: { value: 1, min: 1, max: 10, step: 1 },
		xRotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
		yRotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
		zRotation: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 }
	});
	useEffect(() => {
		refWireMash.current.geometry = refMash.current.geometry;
	}, [xSize, ySize, zSize, xSegements, ySegements, zSegements, xRotation, yRotation, zRotation])
	return (
		<>
			<OrbitControls />

			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 2, 3]} intensity={0.9} />

			<mesh ref={refMash} rotation={[xRotation, yRotation, zRotation]}>
				<boxGeometry args={[xSize, ySize, zSize, xSegements, ySegements, zSegements]} />
				<meshStandardMaterial color="#1abc9c" />	
			</mesh>

			<mesh ref={refWireMash} rotation={[xRotation, yRotation, zRotation]}>
				<meshStandardMaterial emissive="#ffbe0b" wireframe={true} />
			</mesh>
			
			<Box position={[2, 0, 0]}>
				<meshStandardMaterial color="#a9613a" />
			</Box>

			<MyBox position={[-2, 0, 0]}>
				<meshStandardMaterial color="#79393a" />
			</MyBox>
		</>
	)
}

export default MyElement3D