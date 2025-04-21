// Liberar reserva (nuevo método)
exports.liberarReserva = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Guardar en historial antes de liberar
    if (product.reserved) {
      await Reservation.create({
        product: product._id,
        action: "Liberación manual",
        admin: req.admin._id,
        previousClient: product.reservedBy
      });
    }

    // Liberar reserva
    product.reserved = false;
    product.reservedBy = null;
    product.reservationDate = null;
    await product.save();

    // Emitir evento de actualización (WebSocket o SSE)
    req.app.get('io').emit('product-updated', product);

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al liberar reserva" });
  }
};
