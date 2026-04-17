import '../styles/banner.css';

const Banner = () => {
    // Puedes cambiar este mensaje por el que quieras
    const mensaje = "PVREZA CLUB • CRETED TO CREATE • ";
    
    return (
        <div className="pvreza-banner-container">
            <div className="pvreza-banner-track">
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
                <span>{mensaje}</span>
            </div>
        </div>
    );
};

export default Banner;