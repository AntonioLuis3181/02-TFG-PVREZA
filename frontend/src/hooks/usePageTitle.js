import { useEffect } from 'react';

const usePageTitle = (title, faviconUrl = '/favicon.png') => {
    useEffect(() => {
        // 1. Cambiamos el texto de la pestaña
        // Si le pasas un título, lo pone. Si no, pone el nombre por defecto.
        document.title = title ? `${title} | PVREZA` : 'PVREZA | Official Store';

        // 2. Buscamos el favicon actual en el HTML
        let link = document.querySelector("link[rel~='icon']");
        
        // Si por algún motivo no existe la etiqueta link, la creamos
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        
        // 3. Cambiamos la imagen del favicon
        link.href = faviconUrl;

    }, [title, faviconUrl]); // Se vuelve a ejecutar si el título o el icono cambian
};

export default usePageTitle;