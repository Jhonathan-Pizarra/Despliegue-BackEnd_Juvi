const userController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {

    //Nueva funcionalidad
    // Nueva ruta privada para actualizar el usuario con roles
    app.put('/api/users/updateWithRoles', passport.authenticate('jwt', { session: false }), userController.updateWithRoles);

 
    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', { session: false }), userController.findDeliveryMen);
    // Nueva ruta para obtener todos los usuarios
    app.get('/api/users', passport.authenticate('jwt', { session: false }), userController.getAllUsers);  // Este es el nuevo endpoint
    
    //Public
    app.post('/api/users/create', userController.register);
    app.post('/api/users/createWithImage', upload.array('image', 1), userController.registerWithImage);
    app.post('/api/users/login', userController.login);
    
    //Private
    app.put('/api/users/updateWithImage', passport.authenticate('jwt', {session:false}), upload.array('image', 1), userController.UpdateWithImage);
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session:false}), userController.UpdateWithoutImage);

    app.put('/api/users/updateNotificationToken', passport.authenticate('jwt', {session:false}), userController.updateNotificationToken);

}