document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const mensajeDiv = document.getElementById('mensaje');

    // Verificar la conexión con Google Apps Script al cargar
    fetch(CONFIG.API_URL, {
        method: 'GET',
        mode: 'cors'
    }).catch(error => {
        console.warn('Advertencia de conexión inicial:', error);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        mensajeDiv.className = '';
        mensajeDiv.textContent = 'Enviando...';

        try {
            const response = await fetch(CONFIG.API_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'registrar',
                    nombre: nombre,
                    email: email,
                    password: password
                })
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }

            let data;
            try {
                data = await response.json();
            } catch (e) {
                throw new Error('Error al procesar la respuesta del servidor');
            }
            
            if (data.success) {
                mensajeDiv.className = 'success';
                mensajeDiv.textContent = '¡Registro exitoso!';
                form.reset();
            } else {
                mensajeDiv.className = 'error';
                mensajeDiv.textContent = data.error || 'Error en el registro';
            }
        } catch (error) {
            mensajeDiv.className = 'error';
            mensajeDiv.textContent = 'Error de conexión: ' + error.message;
            console.error('Error detallado:', error);
        }
    });
}); 