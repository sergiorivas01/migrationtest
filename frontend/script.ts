// URLs de la API local
const API_URLS = {
    users: '/api/users',
    posts: '/api/posts',
    todos: '/api/todos'
} as const;

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp(): void {
    // Referencias a elementos del DOM
    const fetchUsersBtn = document.getElementById('fetchUsers') as HTMLButtonElement | null;
    const fetchPostsBtn = document.getElementById('fetchPosts') as HTMLButtonElement | null;
    const fetchTodosBtn = document.getElementById('fetchTodos') as HTMLButtonElement | null;
    const resultsDiv = document.getElementById('results') as HTMLDivElement | null;
    const loadingDiv = document.getElementById('loading') as HTMLDivElement | null;
    const errorDiv = document.getElementById('error') as HTMLDivElement | null;

    // Verificar que todos los elementos existen
    if (!fetchUsersBtn || !fetchPostsBtn || !fetchTodosBtn || !resultsDiv || !loadingDiv || !errorDiv) {
        console.error('Error: No se encontraron todos los elementos del DOM necesarios');
        return;
    }

    // Función para mostrar/ocultar loading
    function showLoading(show: boolean): void {
        if (show) {
            loadingDiv.classList.remove('hidden');
            resultsDiv.innerHTML = '';
            errorDiv.classList.add('hidden');
            errorDiv.textContent = '';
        } else {
            loadingDiv.classList.add('hidden');
        }
    }

    // Función para mostrar errores
    function showError(message: string): void {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }

    // Función para obtener datos de la API
    async function fetchData(url: string, type: 'users' | 'posts' | 'todos'): Promise<void> {
        showLoading(true);
        
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            showLoading(false);
            displayResults(data, type);
        } catch (error) {
            showLoading(false);
            const message = error instanceof Error ? error.message : String(error);
            showError(`Error al obtener datos: ${message}`);
            console.error('Error en fetchData:', error);
        }
    }

    // Función para mostrar los resultados
    function displayResults(data: unknown, type: 'users' | 'posts' | 'todos'): void {
        resultsDiv.innerHTML = '';
        
        // Limitar a 10 resultados para mejor visualización
        const arrayData = Array.isArray(data) ? data : [data];
        
        arrayData.slice(0, 10).forEach((item: any) => {
            const card = createCard(item, type);
            resultsDiv.appendChild(card);
        });
        
        if (arrayData.length === 0) {
            const noData = document.createElement('p');
            noData.style.textAlign = 'center';
            noData.style.color = '#666';
            noData.textContent = 'No hay datos disponibles';
            resultsDiv.appendChild(noData);
        }
    }

    // Función para crear tarjetas según el tipo de datos
    function createCard(item: any, type: 'users' | 'posts' | 'todos'): HTMLDivElement {
        const card = document.createElement('div');
        card.className = 'card';
        
        switch(type) {
            case 'users':
                card.innerHTML = `
                    <h3>${item.name}</h3>
                    <p><strong>Email:</strong> ${item.email}</p>
                    <p><strong>Teléfono:</strong> ${item.phone || 'N/A'}</p>
                    <p><strong>Ciudad:</strong> ${item.city || 'N/A'}</p>
                    <p><strong>Compañía:</strong> ${item.company || 'N/A'}</p>
                    <p><strong>Join at:</strong> ${item.created_at}</p>
                `;
                break;
                
            case 'posts':
                card.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.body || 'Sin contenido'}</p>
                    <p><strong>ID de Usuario:</strong> ${item.user_id}</p>
                `;
                break;
                
            case 'todos':
                {
                    const badgeClass = item.completed ? 'badge-complete' : 'badge-incomplete';
                    const statusText = item.completed ? 'Completada' : 'Pendiente';
                    card.innerHTML = `
                        <h3>${item.title}</h3>
                        <span class="badge ${badgeClass}">${statusText}</span>
                    `;
                }
                break;
        }
        
        return card;
    }

    // Event Listeners
    fetchUsersBtn.addEventListener('click', () => fetchData(API_URLS.users, 'users'));
    fetchPostsBtn.addEventListener('click', () => fetchData(API_URLS.posts, 'posts'));
    fetchTodosBtn.addEventListener('click', () => fetchData(API_URLS.todos, 'todos'));
    
    console.log('✅ Aplicación inicializada correctamente');
}


