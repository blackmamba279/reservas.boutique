// Generador de códigos automáticos
class ProductCodeGenerator {
  static generate(category = 'GEN') {
    const date = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const lastNumber = localStorage.getItem(`last_code_${category}`) || 0;
    const newNumber = parseInt(lastNumber) + 1;
    
    localStorage.setItem(`last_code_${category}`, newNumber);
    return `${category}-${date}-${newNumber.toString().padStart(3, '0')}`;
  }
}

// Gestión de productos
class ProductManager {
  static saveProduct(product) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  static removeReservation(productId) {
    localStorage.removeItem(`reserved_${productId}`);
  }
}

// Inicialización del panel admin
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar código al cambiar categoría
  document.getElementById('productCategory').addEventListener('change', function() {
    document.getElementById('productCode').value = 
      ProductCodeGenerator.generate(this.value);
  });

  // Manejo de imágenes
  const imageUpload = document.getElementById('imageUpload');
  if(imageUpload) {
    imageUpload.addEventListener('change', handleImageUpload);
  }
});

function handleImageUpload(e) {
  // Lógica para previsualizar imágenes (máx. 4)
}
// Función para liberar reserva
async function liberarReserva(productId) {
  if (!confirm("¿Liberar esta reserva?")) return;

  try {
    const response = await fetch(`/api/reservations/${productId}/liberar`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
      }
    });

    if (response.ok) {
      // Actualizar UI sin recargar
      const productElement = document.getElementById(`product-${productId}`);
      if (productElement) {
        productElement.querySelector('.reserva-status').textContent = 'Disponible';
        productElement.querySelector('.btn-liberar').remove();
      }
      showNotification('Reserva liberada', 'success');
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    showNotification('Error: ' + error.message, 'error');
  }
}

// Escuchar eventos de actualización (WebSocket)
const socket = io();
socket.on('product-updated', (product) => {
  if (window.location.pathname.includes('/admin/products')) {
    updateProductUI(product); // Actualizar tabla de productos
  } else if (window.location.pathname === '/catalog.html') {
    updateCatalogProduct(product); // Actualizar catálogo principal
  }
});
