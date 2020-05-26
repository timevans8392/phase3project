const express = require('express');
const db = require('./lib/db');
const validate = require('./lib/validate');


const app = express();
const port = 7000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'hbs');



dummyList = [{
    uuid: 'awrgagwfg',
    name: 'Do some code'
}]

function generateUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

// app.param('list', function (req, res, nextFn, list) {
//     db.getList(list)
//         .then((theList) => {
//             req.lists = req.lists || {}
//             req.lists.todolists = theList
//             nextFn()
//         })
//         .then(console.log(dummyList))
//         .catch(() => {
//             res.status(404).send('list not found')
//         })
// })

// Homepage showing the main lists
app.get('/', (req, res) => {
    db.getLists()
        .then((lists) => {
            res.render('index', {lists: lists})
        })

});

app.get('/list', (req, res) => {
    // const theName = req.params.name

    db.getLists()
        .then((theLists) => {
            console.log(theLists)
            console.log('=================')
            res.render('lists', {
    todolists: theLists
    })
})
})

app.post('/list', function (req, res) {
    //New code
    // This route is creating a new list
    // Input is the name
    const theName = req.body.name
    // This app needs to generate an UUID for the list
    const theUUID = generateUUID()
    console.log(req.body)
    
    db.createList(theName, theUUID)
        .then((newList) => {
            res.render('lists', {
                listUUID: theUUID,
                listName: theName
            })
        })
        .catch((err) => {
            // console.log(err)
            res.status(500).send('oh man, we totally messed up')
        })
})

app.delete('/list/:uuid', (req, res) => {
    const deleteRequest = req.params.uuid
    console.log(deleteRequest)
    console.log('zzzzzzzzzz')

    db.deleteList(deleteRequest)
        .then((listDeleted) => {
            res.render('lists_deleted', {
                todolists: deleteRequest
            })
        })
})

app.delete('/list/:uuid', (req, res) => {
    let query = {_uuid:req.params.uuid}

    
})

app.listen(port, () => {
    console.log('Port is listening on: ' + port)
});
