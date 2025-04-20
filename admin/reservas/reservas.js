document.addEventListener('DOMContentLoaded', () => {
    loadReservations();
    
    document.getElementById('statusFilter').addEventListener('change', loadReservations);
    document.getElementById('dateFilter').addEventListener('change', loadReservations);
});

function loadReservations() {
    const reservations = AdminDB.getReservations();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    let filtered = reservations;
    
    if(statusFilter !== 'all') {
        filtered = filtered.filter(r => r.status === statusFilter);
    }
    
    if(dateFilter) {
        filtered = filtered.filter(r => r.date.startsWith(dateFilter));
    }
    
    renderReservations(filtered);
}

function renderReservations(reservations) {
    const container = document.getElementById('reservationsGrid');
    container.innerHTML = reservations.map(res => `
        <div class="reservation-card" data-id="${res.id}">
            <div class="reservation-header">
                <span class="badge ${res.status}">${res.status}</span>
                <span class="date">${formatDate(res.date)}</span>
            </div>
            <h3>${res.productName}</h3>
            <p><i class="fas fa-user"></i> ${res.clientName}</p>
            <p><i class="fas fa-phone"></i> ${res.clientPhone}</p>
            <div class="actions">
                ${res.status === 'active' ? `
                <button class="btn-complete" onclick="completeReservation('${res.id}')">
                    <i class="fas fa-check"></i> Completar
                </button>` : ''}
            </div>
        </div>
    `).join('') || '<p>No hay reservas encontradas</p>';
}

function completeReservation(id) {
    AdminDB.updateReservationStatus(id, 'completed');
    loadReservations();
}
