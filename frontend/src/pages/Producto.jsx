import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/producto.css'; // Asegúrate de que la ruta a tu CSS es correcta

const Producto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [stock, setStock] = useState([]); // Para guardar las tallas y cantidades
    const [loading, setLoading] = useState(true);
    const [tallaSeleccionada, setTallaSeleccionada] = useState(null);
    
    const BACKEND_URL = 'http://localhost:3000';

    useEffect(() => {
        // Llamada al backend
        // Nota: Tu backend debería devolver el producto y su array de stock
        fetch(`${BACKEND_URL}/api/camisetas/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.ok) {
                    setProducto(data.producto);
                    setStock(data.stock); // Esperamos un array con id_stock, talla, cantidad
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error obteniendo el producto:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading">Cargando PVREZA CLUB...</div>;
    if (!producto) return <div className="loading">Producto no encontrado</div>;

    return (
        <main>
            <section className="banner">
                <div className="banner-content">
                    <h2>PVREZA CLUB®</h2>
                    <p>CREATED TO CREATE</p>
                </div>
            </section>

            <section className="product">
                <div className="carousel">
                    <div className="carousel-track">
                        <img 
                            src={`${BACKEND_URL}${producto.imagen_url}`} 
                            alt={producto.nombre} 
                        />
                        {/* Si en el futuro añades más fotos, aquí iría el mapeo */}
                    </div>
                </div>

                <div className="product-details">
                    <h1>{producto.nombre}</h1>
                    <p className="price">{producto.precio} €</p>

                    <div className="color-options">
                        <button className="boton-camis">
                            <img src={`${BACKEND_URL}${producto.imagen_url}`} alt="Color Único" />
                        </button>
                    </div>

                    <div className="size-container">
                        <div className="size-options">
                            {stock.map((item) => (
                                <button 
                                    key={item.id_stock}
                                    disabled={item.cantidad <= 0}
                                    className={tallaSeleccionada?.id_stock === item.id_stock ? 'selected' : ''}
                                    onClick={() => setTallaSeleccionada(item)}
                                    title={item.cantidad <= 0 ? "Sin stock" : ""}
                                >
                                    {item.talla}
                                </button>
                            ))}
                        </div>
                        {tallaSeleccionada && (
                            <p style={{fontSize: '11px', marginTop: '10px', color: '#888'}}>
                                {tallaSeleccionada.cantidad} unidades disponibles
                            </p>
                        )}
                    </div>

                    <button id="btn-open-tryon" className="tryon-trigger-btn" type="button">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
                            <path d="M12 3v19"></path><path d="M5 10h14"></path><path d="M5 15h14"></path>
                        </svg>
                        Probar en mi Avatar 3D
                    </button>

                    <button 
                        className="add-to-cart"
                        disabled={!tallaSeleccionada}
                        style={{ opacity: tallaSeleccionada ? 1 : 0.5 }}
                    >
                        {tallaSeleccionada ? 'Añadir al carrito' : 'Selecciona una talla'}
                    </button>

                    <details className="product-details-section">
                        <summary><strong>Detalles del Producto</strong></summary>
                        <p>{producto.descripcion}</p>
                    </details>

                    <details className="size-guide-section">
                        <summary><strong>Guia de Tallas</strong></summary>
                        <p>Medidas aproximadas para el corte de PVREZA CLUB:</p>
                        <ul>
                            <li>S: Pecho 88-92 cm</li>
                            <li>M: Pecho 92-96 cm</li>
                            <li>L: Pecho 96-100 cm</li>
                            <li>XL: Pecho 100-104 cm</li>
                        </ul>
                    </details>
                </div>
            </section>
        </main>
    );
};

export default Producto;