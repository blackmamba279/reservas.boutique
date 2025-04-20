document.addEventListener('DOMContentLoaded', () => {
    setupTabs();
    loadSettings();
});

function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showTabContent(tab.dataset.tab);
        });
    });
}

function showTabContent(tabName) {
    const content = {
        'general': `<h2>Configuración General</h2>
                   <form id="generalForm">
                       <div class="form-group">
                           <label>Nombre de la Tienda</label>
                           <input type="text" id="storeName" required>
                       </div>
                       <button type="submit" class="btn-save">Guardar</button>
                   </form>`,
        'notifications': `<h2>Configuración de Notificaciones</h2>...`,
        'appearance': `<h2>Personalización de Apariencia</h2>...`
    };
    
    document.getElementById('settingsContent').innerHTML = content[tabName] || '<p>Sección no disponible</p>';
}

function loadSettings() {
    const settings = AdminDB.getSettings();
    document.getElementById('storeName').value = settings.storeName || '';
}
