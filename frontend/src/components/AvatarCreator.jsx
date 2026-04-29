import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import '../styles/avatar-creator.css';

// ==========================================
// 1. EL MODELO PROCEDIMENTAL (El Maniquí)
// ==========================================
const ModeloBase = ({ altura, peso, colorPrenda }) => {
    // SALVAVIDAS: Si por algún motivo no llegan datos, usamos 170cm y 70kg por defecto
    const h = altura || 170;
    const p = peso || 70;

    // MATEMÁTICAS DE ESCALA
    const escalaAltura = h / 170; 
    
    // IMC del usuario vs IMC estándar (24.2)
    const imcUsuario = p / Math.pow(h / 100, 2);
    const imcBase = 70 / Math.pow(1.70, 2); 
    
    // Esto engrosará o adelgazará el modelo en los ejes X y Z
    const escalaGrosor = imcUsuario / imcBase; 

    return (
        // Aplicamos la deformación calculada al grupo entero
        <group position={[0, -1, 0]} scale={[escalaGrosor, escalaAltura, escalaGrosor]}>
            
            {/* CABEZA */}
            {/* Invertimos la escala en la cabeza para que siga siendo redonda y no se deforme como un melón */}
            <mesh position={[0, 1.8, 0]} scale={[1/escalaGrosor, 1/escalaAltura, 1/escalaGrosor]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#e0ac69" roughness={0.4} />
            </mesh>
            
            {/* CUERPO (Prenda) */}
            {/* Este cilindro SÍ hereda la deformación del grupo, ajustándose al peso y altura reales */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 1.2, 32]} />
                <meshStandardMaterial color={colorPrenda} roughness={0.8} />
            </mesh>
            
        </group>
    );
};

// ==========================================
// 2. EL CREADOR PRINCIPAL (Interfaz)
// ==========================================
const AvatarCreator = ({ onAvatarGuardado, altura, peso }) => {
    
    // Estado para las elecciones visuales del usuario
    const [config, setConfig] = useState({
        colorCamiseta: '#000000', // Negro PVREZA por defecto
    });

    // Colores disponibles en la tienda
    const coloresDisponibles = ['#000000', '#ffffff', '#8b0000', '#4a4a4a'];

    const finalizarAvatar = () => {
        // Devolvemos la configuración estética como un string JSON
        onAvatarGuardado(JSON.stringify(config)); 
    };

    return (
        <div className="avatar-creator-wrapper">
            <div className="avatar-header">
                <h2>FORJA TU IDENTIDAD</h2>
                <p>Tu avatar se ha escalado a {altura}cm y {peso}kg de forma procedimental.</p>
            </div>
            
            {/* VISOR 3D NATIVO */}
            <div className="canvas-container">
                <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
                    <Suspense fallback={null}>
                        {/* Iluminación premium */}
                        <Environment preset="city" />
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                        
                        {/* 💥 Aquí inyectamos el maniquí con las props que vienen del formulario */}
                        <ModeloBase 
                            altura={altura} 
                            peso={peso} 
                            colorPrenda={config.colorCamiseta} 
                        />
                        
                        {/* Sombras bajo los pies */}
                        <ContactShadows position={[0, -1, 0]} opacity={0.5} scale={10} blur={2} far={4} />
                        
                        {/* Controles táctiles/ratón */}
                        <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
                    </Suspense>
                </Canvas>
            </div>

            {/* CONTROLES DE LA INTERFAZ (UI) */}
            <div className="avatar-controls">
                <h3>COLOR PRENDA BASE</h3>
                <div className="color-picker">
                    {coloresDisponibles.map(color => (
                        <button 
                            key={color}
                            className={`color-btn ${config.colorCamiseta === color ? 'active' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => setConfig({ ...config, colorCamiseta: color })}
                            aria-label={`Seleccionar color ${color}`}
                        />
                    ))}
                </div>
                
                <button className="btn-guardar-avatar" onClick={finalizarAvatar}>
                    CONFIRMAR Y TERMINAR REGISTRO
                </button>
            </div>
        </div>
    );
};

export default AvatarCreator;