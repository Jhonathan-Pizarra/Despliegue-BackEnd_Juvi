const express = require('express');
const app = express();
const http = require('http');
const morgan = require('morgan');
const server = http.createServer(app);

const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const io = require('socket.io')(server);

/*
* IMPORTAR SOCKETS
*/
const ordersSocket = require('./sockets/ordersSocket');

//Importar rutas
const userRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');



const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port',port);

/*
* LLAMADO A LOS SOCKETS
*/
ordersSocket(io);

const upload = multer({
    storage: multer.memoryStorage()

});

//Llamado a las rutas
userRoutes(app, upload);
categoriesRoutes(app);
productRoutes(app, upload);
addressRoutes(app);
ordersRoutes(app, upload);


server.listen(3000,'192.168.100.19' || 'localhost', function(){
    console.log('Aplicación JuviExpress Backend '+process.pid+' iniciada...')
});

app.get('/',(req,res)=>{
    res.send('JuviExpress');
});

app.get('/test',(req,res)=>{
    res.send('JuviExpress-Test');
});


//Errores
app.use((err, req, res,next)=>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/',  (req, res) => {
    res.send('Ruta raiz del backend');
});


module.exports = {
    app: app,
    server: server
}
//192.168.200.9
//192.168.1.7