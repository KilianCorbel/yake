// ---- Dependencies
let express = require('express'),
    app = express();
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
app.use('/api/albums', require('./routes/Album'));
app.use('/api/artistes', require('./routes/Artiste'));
app.use('/api/genres', require('./routes/Genre'));
app.use('/api/musiques', require('./routes/Musique'));
app.use('/api/notes', require('./routes/Note'));
app.use('/api/playlists', require('./routes/Playlist'));
app.use('/api/users', require('./routes/Utilisateur'));

// ---- Start server
app.listen(7990, function(){
    console.info('HTTP server started on port 7990 \nConnect to http://localhost:7990/');
});