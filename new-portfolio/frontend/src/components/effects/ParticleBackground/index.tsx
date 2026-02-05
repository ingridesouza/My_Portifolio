import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '@/context/ThemeContext'

function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const { theme } = useTheme()

  const count = 3000

  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const color = theme === 'dark' ? '#C0006A' : '#A0005A'

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

function FloatingRings() {
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ring1.current) {
      ring1.current.rotation.x = state.clock.elapsedTime * 0.2
      ring1.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (ring2.current) {
      ring2.current.rotation.x = -state.clock.elapsedTime * 0.15
      ring2.current.rotation.z = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color="#C0006A" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#C0006A" transparent opacity={0.2} />
      </mesh>
    </>
  )
}

export function ParticleBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingRings />
      </Canvas>
    </div>
  )
}
