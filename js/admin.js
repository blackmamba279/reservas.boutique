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
