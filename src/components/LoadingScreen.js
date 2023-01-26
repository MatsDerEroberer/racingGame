import { Html, useProgress } from "@react-three/drei";

export const LoadingScreen = () => {
    const { progress } = useProgress()
    return (
        <Html center>
        <progress id="file" value={progress} max="100"></progress>
        {progress} % loaded
        </Html>
    )
}