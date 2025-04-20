document.addEventListener('DOMContentLoaded', () => {
    loadClients();
    document.getElementById('searchClient').addEventListener('input', loadClients);
    document.getElementById('addClientBtn').addEventListener('click', showClientForm);
});

function loadClients() {
    const searchTerm = document.getElementById('searchClient').value.toLowerCase();
    const clients = AdminDB.getClients().filter(client => 
        client.name.toLowerCase().includes(searchTerm) || 
        client.phone.includes(searchTerm)
    );
    
    renderClients(clients);
}

function renderClients(clients) {
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = clients.map(client => `
        <tr>
            <td>${client.name}</td>
            <td>${client.phone}</td>
            <td>${client.reservationsCount || 0}</td>
            <td>
                <button class="btn-edit" onclick="editClient('${client.id}')">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="4">No se encontraron clientes</td></tr>';
}

function showClientForm() {
    // Implementar modal de formulario
}
