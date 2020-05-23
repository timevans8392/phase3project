const express = require('express');
const db = require('./lib/db');
const validate = require('./lib/validate');


const app = express();
const port = 7000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'hbs');



// Homepage showing the main lists
app.get('/', (req, res) => {
    db.getLists()
        .then((lists) => {
            res.render('index', {lists: lists})
        })
        .catch((err) => {
            res.status(400).send('Could not find the lists')
        })
});



app.listen(port, () => {
    console.log('Port is listening on: ' + port)
});
