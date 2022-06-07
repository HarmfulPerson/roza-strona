import { Canvas, useFrame } from '@react-three/fiber';
import React from 'react';
import {
  Extrude,
  OrbitControls,
  Center,
  Plane,
  Sphere,
  Stars,
} from '@react-three/drei';
import * as THREE from 'three';

import logo from './logo.svg';
import './App.css';

function MyRotatingBox() {
  const myMesh = React.useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <mesh ref={myMesh}>
      <boxBufferGeometry />
      <meshPhongMaterial color="royalblue" />
    </mesh>
  );
}

function App() {
  const startingPosition = React.useRef([-1, 0, 0]);

  return (
    <div className="App">
      <div id="canvas-container">
        <Canvas
          dpr={window.devicePixelRatio}
          camera={{ position: new THREE.Vector3(0, 0, 100) }}
          style={{ height: '100vh' }}
        >
          <color attach="background" args={['#06092c']} />
          {/* <pointLight position={[-20, 10, 25]} /> */}
          <Sphere position={[0, 10, 10]}>
            <meshBasicMaterial color="hotpink" />
          </Sphere>
          <gridHelper
            args={[100, 20, '#4D089A', '#4D089A']}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
          <Center />
          {/* <OrbitControls /> */}
          <Stars
            radius={100} // Radius of the inner sphere (default=100)
            depth={50} // Depth of area where stars should fit (default=50)
            count={5000} // Amount of stars (default=5000)
            factor={4} // Size factor (default=4)
            saturation={0} // Saturation 0-1 (default=0)
            fade // Faded dots (default=false)
          />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
