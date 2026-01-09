'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Card({ position, image, label }: { position: [number, number, number], image: string, label: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHover] = useState(false);
    const texture = useTexture(image);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Gentle floating animation
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
        }
    });

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                    scale={hovered ? 1.1 : 1}
                >
                    <boxGeometry args={[2, 2, 0.2]} />
                    {/* Sides and Back - Dark material */}
                    <meshStandardMaterial attach="material-0" color="#111" />
                    <meshStandardMaterial attach="material-1" color="#111" />
                    <meshStandardMaterial attach="material-2" color="#111" />
                    <meshStandardMaterial attach="material-3" color="#111" />
                    {/* Front - Texture */}
                    <meshStandardMaterial attach="material-4" map={texture} transparent />
                    {/* Back - Texture (reused) */}
                    <meshStandardMaterial attach="material-5" map={texture} transparent />
                </mesh>
                <Text
                    position={[0, -1.5, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            </Float>
        </group>
    );
}

export default function Carousel() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotate the entire carousel slowly
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    const items = [
        { label: "Denim Jacket", image: "/images/carousel/jacket.png" },
        { label: "Minimalist Sneakers", image: "/images/carousel/sneakers.png" },
        { label: "Classic Watch", image: "/images/carousel/watch.png" },
        { label: "Leather Tote", image: "/images/carousel/bag.png" },
    ];

    const radius = 3.5;

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {items.map((item, i) => {
                const angle = (i / items.length) * Math.PI * 2;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;
                return (
                    <Card
                        key={i}
                        position={[x, 0, z]}
                        image={item.image}
                        label={item.label}
                    />
                );
            })}
        </group>
    );
}
