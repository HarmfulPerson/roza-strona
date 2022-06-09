/* eslint-disable react/no-children-prop */
/* eslint-disable no-multi-assign */
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
import Text from './components/Text3D/Text3D';
import logo from './logo.svg';
import './App.css';

const Object = ({ url, position, key, ...props }) => {
  const { scene } = useLoader(GLTFLoader, url);
  const ref = React.useRef();

  const copiedScene = React.useMemo(() => scene.clone(), [scene]);
  useFrame((state, delta, clock) => {
    ref.current.children[0].rotation.y -= 0.1;
    // ref.current.children[0].rotation.z = start + state.clock.elapsedTime;
  });
  return (
    <group ref={ref}>
      <primitive scale={0.05} object={copiedScene} position={position} />
    </group>
  );
};

const Objects = () => {
  const ref = React.useRef();
  const [start] = React.useState(() => Math.random() * 5000);
  const clockPositions = [0, 300, 600, 900];
  useFrame((state, delta, clock) => {
    ref.current?.children.forEach((letter, index) => {
      letter.rotation.y = state.clock.getElapsedTime() + clockPositions[index];
    });
    // ref.current.rotation.z = Math.sin(state.clock.getElapsedTime());
  });
  return (
    <group ref={ref}>
      {[6, 7, 8, 9].map((lol, index) => (
        <Object
          key={lol}
          position={[50, 1, 0]}
          url="./drone_low_poly/scene.gltf"
        />
      ))}
    </group>
  );
};

function Jumbo() {
  const ref = React.useRef();
  useFrame(
    // eslint-disable-next-line no-return-assign
    ({ clock }) =>
      (ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3)
  );
  return (
    <group ref={ref}>
      <Text
        hAlign="right"
        color="white"
        scale={[100, 100, 100]}
        position={[-12, 6.5, 0]}
        children="RUZIA"
      />
      <Text
        hAlign="right"
        scale={[100, 100, 100]}
        position={[-12, 0, 0]}
        children="TO"
      />
      <Text
        hAlign="right"
        scale={[100, 100, 100]}
        position={[-12, -6.5, 0]}
        children="GEJ"
      />
    </group>
  );
}

function App() {
  const startingPosition = React.useRef([-1, 0, 0]);
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
          <pointLight position={[-100, 0, -160]} />
          <pointLight position={[0, 0, -170]} />
          <pointLight position={[100, 0, -160]} />
          <Suspense fallback={null}>
            <Jumbo />

            <Objects />
          </Suspense>
          {/* <gridHelper
            args={[100, 20, '#4D089A', '#4D089A']}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          /> */}
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
