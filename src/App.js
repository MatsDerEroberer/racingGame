import "./App.css"
import { Canvas } from "@react-three/fiber";
import { Game } from "./components/Game";
import { Physics } from "@react-three/cannon";

function App() {
  return (
    <Canvas>
      <Physics
        broadphase="SAP"
        gravity={[0, -2.6, 0]}
      >
        <Game />
      </Physics>
    </Canvas>
  );
}

export default App;
