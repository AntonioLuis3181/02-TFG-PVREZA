// 1. Hemos quitado el useEffect de aquí porque aún no estamos haciendo fetch al backend
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('resumen');
    
    // 2. Aquí está tu setProductos
    const [productos, setProductos] = useState([
        { id_producto: 1, nombre: 'CLASSIC TEE', precio: 28.00, stock_total: 145 },
        { id_producto: 2, nombre: 'GENESIS HOODIE', precio: 55.00, stock_total: 12 },
        { id_producto: 3, nombre: 'GXS CAP', precio: 20.00, stock_total: 0 }
    ]);

    // 💥 3. NUEVO: Creamos una función real para borrar un producto (Esto soluciona el error)
    const eliminarProducto = (id) => {
        // Filtramos la lista para quedarnos con todos menos el que queremos borrar
        const nuevaLista = productos.filter(producto => producto.id_producto !== id);
        // Usamos setProductos por fin
        setProductos(nuevaLista);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'resumen':
                return (
                    <div className="dash-section">
                        <h2>RESUMEN GENERAL</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <h3>VENTAS DEL MES</h3>
                                <p className="stat-number">1,284 €</p>
                            </div>
                            <div className="stat-card">
                                <h3>PEDIDOS ACTIVOS</h3>
                                <p className="stat-number">14</p>
                            </div>
                            <div className="stat-card alert">
                                <h3>STOCK CRÍTICO</h3>
                                <p className="stat-number">1</p>
                                <span className="stat-label">Artículos agotados</span>
                            </div>
                        </div>
                    </div>
                );
            case 'productos':
                return (
                    <div className="dash-section">
                        <div className="section-header">
                            <h2>GESTIÓN DE PRODUCTOS</h2>
                            <button className="btn-primary">+ NUEVO PRODUCTO</button>
                        </div>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>PRECIO</th>
                                    <th>STOCK</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map(p => (
                                    <tr key={p.id_producto}>
                                        <td>#{p.id_producto}</td>
                                        <td><strong>{p.nombre}</strong></td>
                                        <td>{p.precio} €</td>
                                        <td>
                                            <span className={`status-badge ${p.stock_total === 0 ? 'out' : 'ok'}`}>
                                                {p.stock_total === 0 ? 'AGOTADO' : p.stock_total}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            <button className="btn-text">EDITAR</button>
                                            {/* 💥 4. NUEVO: Conectamos el botón con la función */}
                                            <button 
                                                className="btn-text danger"
                                                onClick={() => eliminarProducto(p.id_producto)}
                                            >
                                                BORRAR
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case 'pedidos':
                return (
                    <div className="dash-section">
                        <h2>ÚLTIMOS PEDIDOS</h2>
                        <p>Módulo de pedidos en construcción para la fase 2 del TFG.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-layout">
            <aside className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>PVREZA ADMIN</h2>
                    <p>Hola, {user?.nombre}</p>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={activeTab === 'resumen' ? 'active' : ''} 
                        onClick={() => setActiveTab('resumen')}
                    >
                        RESUMEN
                    </button>
                    <button 
                        className={activeTab === 'productos' ? 'active' : ''} 
                        onClick={() => setActiveTab('productos')}
                    >
                        PRODUCTOS
                    </button>
                    <button 
                        className={activeTab === 'pedidos' ? 'active' : ''} 
                        onClick={() => setActiveTab('pedidos')}
                    >
                        PEDIDOS
                    </button>
                </nav>
            </aside>

            <main className="dashboard-content">
                {renderContent()}
            </main>
        </div>
    );
};

export default Dashboard;