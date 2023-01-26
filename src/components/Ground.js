import { MeshReflectorMaterial } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { BufferAttribute } from "three"
import { TextureLoader } from "three/src/loaders/TextureLoader"

import gridTexture from "../textures/grid.png" 
import groundaoTexture from "../textures/ground-ao.png"
import alphaMapping from "../textures/alpha-map.png"
import { usePlane } from "@react-three/cannon"

export const Ground = () => {

    const [ref] = usePlane(() => ({
        type: "Static",
        rotation: [-Math.PI / 2, 0, 0]
    }),
    useRef(null)
    )


    const gridMap = useLoader(
        TextureLoader,
        gridTexture
    )  
    const aoMap = useLoader(
        TextureLoader,
        groundaoTexture
    )
    const alphaMap = useLoader(
        TextureLoader,
        alphaMapping   
    )
    useEffect(() => {
        gridMap.anisotropy = 16
    }, [gridMap])

    const meshRef = useRef(null)
    const meshRef2 = useRef(null)
    useEffect(() => {
        let uvs = meshRef.current.geometry.attributes.uv.array
        meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2))

        let uvs2 = meshRef2.current.geometry.attributes.uv.array
        meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2))
    }, [meshRef.current])

    return(
        <>
            <mesh
                ref={meshRef2}
                position={[-2.285, -0.015, -1.325]}
                rotation-x={-Math.PI * 0.5}
            >
                <planeGeometry args={[12, 12]} />
                <meshBasicMaterial
                    opacity={0.325}
                    alphaMap={gridMap}
                    transparent={true}
                    color={"white"}
                />
            </mesh>

            <mesh
                ref={meshRef}
                position={[-2.285, -0.015, -1.325]}
                rotation-x={-Math.PI * 0.5}
                rotation-z={-0.079}
            >
                <circleGeometry args={[6.12, 50]} />
                <MeshReflectorMaterial
                    aoMap={aoMap}
                    aoMapIntensity={0.45}
                    alphaMap={alphaMap}
                    color={"grey"}
                    blur={[1024, 512]}
                    mixBlur={3}
                    mixStrength={30}
                    mixContrast={1}
                    resolution={256}
                    mirror={0}
                    depthScale={0}
                    minDepthThreshold={0.9}
                    maxDepthThreshold={1}
                    depthToBlurRatioBias={0.25}
                    debug={0}
                    reflectorOffset={0.02}
                    distortion={1}
                />
            </mesh>
        </>
    )
}

/*

*/