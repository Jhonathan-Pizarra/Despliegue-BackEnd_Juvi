const OrdersController = require('../controllers/ordersController');
const passport = require('passport');

module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    app.get('/api/orders/findByStatus/:status',  passport.authenticate('jwt', { session: false }), OrdersController.findByStatus);
    app.get('/api/orders/findByDeliveryAndStatus/:id_delivery/:status',  passport.authenticate('jwt', { session: false }), OrdersController.findByDeliveryAndStatus);
    app.get('/api/orders/findByClientAndStatus/:id_client/:status',  passport.authenticate('jwt', { session: false }), OrdersController.findByClientAndStatus);

    app.post('/api/orders/create',  passport.authenticate('jwt', { session: false }), OrdersController.create);
    //app.post('/api/orders/create',  passport.authenticate('jwt', { session: false }), upload.single('image'), OrdersController.create);
    app.post('/api/orders/createWithImage', upload.array('image', 1), OrdersController.createWithImage);

    
    app.put('/api/orders/updateToDispatched',  passport.authenticate('jwt', { session: false }), OrdersController.updateToDispatched);
    app.put('/api/orders/updateToOnTheWay',  passport.authenticate('jwt', { session: false }), OrdersController.updateToOnTheWay);
    app.put('/api/orders/updateToDelivered',  passport.authenticate('jwt', { session: false }), OrdersController.updateToDelivered);
    app.put('/api/orders/updateLatLng',  passport.authenticate('jwt', { session: false }), OrdersController.updateLatLng);


}