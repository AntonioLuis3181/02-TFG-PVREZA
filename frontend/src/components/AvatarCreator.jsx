import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import '../styles/avatar-creator.css';

const CuerpoHumano = ({ altura, peso }) => {
    const { scene } = useGLTF('/models/cuerpo_base.glb');
    const modelScene = scene.clone();

    // 1. DEFINIMOS EL ESTÁNDAR (Punto de equilibrio)
    const hBase = 170;
    const pBase = 70;

    // 2. MATEMÁTICAS AGRESIVAS
    // Altura: Cambio lineal (Si mide 200cm, será un 17% más alto)
    const escalaAltura = altura / hBase; 

    // Peso: Calculamos cuánto se aleja del peso base (70kg)
    // Aplicamos un multiplicador de 0.8 para que la anchura reaccione FUERTE
    // Ejemplo: Si pesa 100kg (+30kg), el ancho aumentará un ~35%
    const ratioPeso = (peso - pBase) / pBase;
    const escalaGrosor = 1 + (ratioPeso * 0.8); 

    // Ponemos límites de seguridad para que el modelo no se rompa o desaparezca
    const grosorFinal = Math.max(0.6, Math.min(1.8, escalaGrosor));

    return (
        <primitive 
            object={modelScene} 
            position={[0, -2, 0]} 
            // 💥 Aquí está el secreto: Aplicamos el grosor a X (ancho) y Z (profundo)
            // mientras que la altura (Y) va por libre.
            scale={[grosorFinal, escalaAltura, grosorFinal]} 
        />
    );
};

useGLTF.preload('/models/cuerpo_base.glb');

const AvatarCreator = ({ onAvatarGuardado, altura, peso }) => {
    const config = { colorCamiseta: '#000000' };

    return (
        <div className="avatar-creator-wrapper">
            <div className="avatar-header">
                <h2>FORJA TU IDENTIDAD</h2>
                <p>Configuración actual: <strong>{altura}cm</strong> y <strong>{peso}kg</strong></p>
            </div>
            
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 1.5, 4.5], fov: 40 }}>
                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <CuerpoHumano altura={altura} peso={peso} />
                        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={15} blur={2.5} far={4} />
                        <OrbitControls 
                            enableZoom={true} 
                            target={[0, 1, 0]} 
                        />
                    </Suspense>
                </Canvas>
            </div>

            <div className="avatar-controls">
                <button className="btn-guardar-avatar" onClick={() => onAvatarGuardado(JSON.stringify(config))}>
                    CONFIRMAR IDENTIDAD Y TERMINAR
                </button>
            </div>
        </div>
    );
};

export default AvatarCreator;