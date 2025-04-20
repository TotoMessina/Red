document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const mensajeDiv = document.getElementById('mensaje');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

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

            const data = await response.json();
            
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
            mensajeDiv.textContent = 'Error de conexión';
            console.error('Error:', error);
        }
    });
}); 