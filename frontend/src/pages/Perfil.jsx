import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/perfil.css';

const Perfil = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    if (!user) return null; // Protegido por ProtectedRoute, pero por seguridad

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <main className="perfil-page">
            <div className="perfil-container">
                <header className="perfil-header">
                    <h1>MI CUENTA</h1>
                    <button onClick={handleLogout} className="logout-btn">CERRAR SESIÓN</button>
                </header>

                <section className="user-info-card">
                    <div className="info-group">
                        <label>NOMBRE</label>
                        <p>{user.nombre}</p>
                    </div>
                    <div className="info-group">
                        <label>EMAIL</label>
                        <p>{user.email}</p>
                    </div>
                    <div className="info-group">
                        <label>ROL</label>
                        <p className="role-tag">{user.rol.toUpperCase()}</p>
                    </div>
                </section>

                <div className="perfil-actions">
                    {/* VISTA PARA ADMINISTRADORES */}
                    {user.rol === 'admin' ? (
                        <div className="admin-zone">
                            <h2>PANEL DE CONTROL</h2>
                            <p>Tienes privilegios de administrador para gestionar la tienda.</p>
                            <button 
                                className="action-btn admin"
                                onClick={() => navigate('/admin')}
                            >
                                IR AL DASHBOARD
                            </button>
                        </div>
                    ) : (
                        /* VISTA PARA USUARIOS NORMALES */
                        <div className="user-zone">
                            <h2>MIS PEDIDOS</h2>
                            <div className="empty-orders">
                                <p>Aún no has realizado ningún pedido en PVREZA.</p>
                                <button 
                                    className="action-btn"
                                    onClick={() => navigate('/catalogo')}
                                >
                                    EXPLORAR CATÁLOGO
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Perfil;