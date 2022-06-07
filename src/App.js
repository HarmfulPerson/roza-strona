import { Canvas, useFrame } from '@react-three/fiber';
import React from 'react';
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
        <Canvas>
          <MyRotatingBox />
          <ambientLight intensity={0.1} />
          <directionalLight />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
