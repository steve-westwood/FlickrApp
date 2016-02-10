var express = require('express'),
    app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app/index.html');
});
app.use('/app', express.static(__dirname + '/app'));
app.listen(3000, function () {
    console.log('FlickrApp running...');
});
