/* eslint-disable react/prop-types */
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { Suspense } from 'react';
import {
  Extrude,
  OrbitControls,
  Center,
  Plane,
  Sphere,
  Stars,
  useAnimations,
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import logo from './logo.svg';
import './App.css';

const Object = ({ url, position, ...props }) => {
  const { scene } = useLoader(GLTFLoader, url);
  const { ref } = props;
  const copiedScene = React.useMemo(() => scene.clone(), [scene]);

  return (
    <group>
      <primitive scale={0.01} object={copiedScene} position={position} />
    </group>
  );
};

const Objects = () => {
  const ref = React.useRef();
  useFrame((state, delta, clock) => {
    ref.current.position.z = state.clock.getElapsedTime();
  });
  return (
    <group ref={ref}>
      {[1, 2, 3, 4, 5, 6].map((lol) => (
        <Object
          key={lol}
          position={[4 * lol, 1, 1]}
          url="./drone_low_poly/scene.gltf"
        />
      ))}
    </group>
  );
};

function App() {
  const startingPosition = React.useRef([-1, 0, 0]);
  const clockPositions = [0, 300, 600, 900];
  return (
    <div className="App">
      <div id="canvas-container">
        <Canvas
          dpr={window.devicePixelRatio}
          camera={{ position: new THREE.Vector3(10, 25, 100) }}
          style={{ height: '100vh' }}
        >
          <color attach="background" args={['#06092c']} />
          <pointLight position={[-20, 10, 25]} />
          <Suspense fallback={null}>
            <Objects />
          </Suspense>
          <gridHelper
            args={[100, 20, '#4D089A', '#4D089A']}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          />
          <Center />
          <OrbitControls />
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
