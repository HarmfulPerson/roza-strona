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

const Object = ({
  url,
  position,
  menuName,
  setMenuItem,
  menuItem,
  key,
  pickItem,
  ...props
}) => {
  const { scene } = useLoader(GLTFLoader, url);
  const ref = React.useRef();
  const [isHighlighted, setIsHighlighted] = React.useState(false);
  const [positions, setPositions] = React.useState(null);
  const copiedScene = React.useMemo(() => scene.clone(), [scene]);
  useFrame((state, delta, clock) => {
    if (!menuItem) ref.current.children[0].rotation.y -= 0.05;
  });

  const returnScale = (renderedItem) => {
    switch (renderedItem) {
      case 'Kontakt':
        return 5;
      case 'Onas':
        return 1;
      case 'Portfolio':
        return 2;
      case 'Rezerwacje':
        return 3;
      default:
        return 0.1;
    }
  };

  return (
    <group
      onClick={(e) => pickItem(menuName)}
      onPointerMissed={(e) => setMenuItem(null)}
      ref={ref}
    >
      <primitive
        scale={returnScale(menuName)}
        object={copiedScene}
        position={position}
      />
    </group>
  );
};

const urlPicker = (menuItem) => {
  switch (menuItem) {
    case 'Kontakt':
      return './cell_phone/scene.gltf';
    case 'Onas':
      return './information/scene.gltf';
    case 'Portfolio':
      return './portfolio/scene.gltf';
    case 'Rezerwacje':
      return './rezerwacje/scene.gltf';
    default:
      return './drone_low_poly/scene.gltf';
  }
};

const Objects = (props) => {
  const { setMenuItem, menuItem } = props;
  const ref = React.useRef();
  const [start] = React.useState(() => Math.random() * 5000);
  const clockPositions = [0, 300, 600, 900];
  const pickItem = (menuName) => {
    console.log(ref.current.children[0].rotation._y);
    console.log(ref.current.children[1].rotation._y);
    console.log(ref.current.children[2].rotation._y);
    console.log(ref.current.children[3].rotation._y);
    setMenuItem(menuName);
  };
  useFrame((state, delta, clock) => {
    ref.current?.children.forEach((letter, index) => {
      if (!menuItem)
        letter.rotation.y =
          state.clock.getElapsedTime() + clockPositions[index];
    });
  });
  return (
    <group ref={ref}>
      {['Onas', 'Kontakt', 'Portfolio', 'Rezerwacje'].map((lol) => (
        <Object
          key={lol}
          setMenuItem={setMenuItem}
          menuItem={menuItem}
          menuName={lol}
          position={[20, 1, 0]}
          url={urlPicker(lol)}
          pickItem={pickItem}
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

function ItemMenu(props) {
  const { menuItem } = props;
  const ref = React.useRef();
  console.log(menuItem);
  useFrame(
    // eslint-disable-next-line no-return-assign
    ({ clock }) =>
      (ref.current.rotation.x = Math.sin(clock.getElapsedTime()) * 0.3)
  );
  const positioning = {
    Rezerwacje: -24,
    Onas: -12,
    Portfolio: -24,
    Kontakt: -20,
  };
  return (
    <group ref={ref}>
      <Text
        hAlign="right"
        scale={[100, 100, 100]}
        position={[positioning[menuItem], 20, 0]}
        children={menuItem.toUpperCase()}
      />
    </group>
  );
}

function App() {
  const startingPosition = React.useRef([-1, 0, 0]);
  const [menuItem, setMenuItem] = React.useState(null);
  return (
    <div className="App">
      <div id="canvas-container">
        <Canvas
          dpr={window.devicePixelRatio}
          camera={{ position: new THREE.Vector3(10, 15, 35) }}
          style={{ height: '100vh' }}
        >
          <color attach="background" args={['#06092c']} />
          <directionalLight position={[10, 0, 25]} />
          <Suspense fallback={null}>
            {menuItem ? <ItemMenu menuItem={menuItem} /> : <Jumbo />}

            <Objects setMenuItem={setMenuItem} menuItem={menuItem} />
          </Suspense>
          {/* <gridHelper
            args={[100, 20, '#4D089A', '#4D089A']}
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
          /> */}
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
