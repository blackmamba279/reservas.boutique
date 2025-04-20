// Manejo de reservas
const initializeReservations = () => {
  document.querySelectorAll('.reserve-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = this.closest('.item').id;
      const productData = JSON.parse(this.dataset.product);
      
      // Generar fecha/hora de reserva
      const now = new Date();
      const reserveDate = now.toLocaleDateString('es-ES');
      const reserveTime = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

      // Mensaje para WhatsApp
      const message = `¡Hola BoutiqueMG! Quiero reservar:
      
🛍 *${productData.name}*
🆔 *${productData.code}*
💰 *Precio:* ${productData.price}
📅 *Fecha:* ${reserveDate}
⏰ *Hora:* ${reserveTime}

${productData.description}`;

      window.open(`https://wa.me/51987654321?text=${encodeURIComponent(message)}`, '_blank');
      
      // Marcar como reservado
      localStorage.setItem(`reserved_${itemId}`, 'true');
      this.disabled = true;
    });
  });
};

// Cargar estado de reservas al iniciar
document.addEventListener('DOMContentLoaded', () => {
  initializeReservations();
  
  // Actualizar fecha en header
  const dateElement = document.getElementById('currentDate');
  if(dateElement) {
    dateElement.textContent = new Date().toLocaleDateString('es-ES', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
});