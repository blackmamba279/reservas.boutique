const { liberarReserva } = require('../controllers/reservationController');
const auth = require('../middlewares/auth');

// Nueva ruta para liberar reservas (solo admin)
router.delete('/:productId/liberar', auth, liberarReserva);
