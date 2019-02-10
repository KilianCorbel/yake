// ---- Dependencies
let express = require('express'),
    app = express(),
    router = express.Router();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

// ---- Body parser
let urlencodedParser = bodyParser.urlencoded({
    extended: true,
});
app.use(urlencodedParser);
app.use(bodyParser.json());

// ---- Connect to database
let database = mongoose.connect("mongodb://localhost:27017/yake",{
    useNewUrlParser: true
}).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while connecting to database');
    console.log(e);
});

// ---- Define CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// ---- Define routes
app.use('/albums', require('./routes/Album'));
app.use('/artistes', require('./routes/Artiste'));
app.use('/genres', require('./routes/Genre'));
app.use('/musiques', require('./routes/Musique'));
app.use('/notes', require('./routes/Note'));
app.use('/playlists', require('./routes/Playlist'));
app.use('/users', require('./routes/Utilisateur'));

// ---- Start server
app.listen(7990, function(){
    console.info('HTTP server started on port 7990 \n Connect to http://localhost:7990/');
});