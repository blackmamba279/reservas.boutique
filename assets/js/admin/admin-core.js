const AdminDB = {
    // Reservas
    getReservations: () => JSON.parse(localStorage.getItem('boutiquemg_reservations')) || [],
    updateReservationStatus: (id, status) => {
        const reservations = AdminDB.getReservations();
        const updated = reservations.map(r => 
            r.id === id ? {...r, status} : r
        );
        localStorage.setItem('boutiquemg_reservations', JSON.stringify(updated));
    },
    
    // Clientes
    getClients: () => JSON.parse(localStorage.getItem('boutiquemg_clients')) || [],
    
    // Configuración
    getSettings: () => JSON.parse(localStorage.getItem('boutiquemg_settings')) || {},
    saveSettings: (settings) => {
        localStorage.setItem('boutiquemg_settings', JSON.stringify(settings));
    }
};

// Utilidades
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}
