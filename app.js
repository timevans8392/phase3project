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


app.get('/', (req, res) => {
    db.getLists()
        .then((lists) => {
            res.render('index', {lists: lists})
        })

});

app.get('/list/newlist', (req, res) => {
    // const theName = req.params.name

    db.getLists()
        .then((theLists) => {
            console.log(theLists)
            console.log('End of the lists')
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
    // console.log(req.body)
    
    db.createList(theName, theUUID)
        .then((dataBaseQueryResult) => {
            // console.log(newList.rows)
            // res.render('editList', {
            //     listUUID: theUUID,
            //     listName: theName
            // })
            // res.redirect(302,`/list/${dataBaseQueryResult.rows[0].uuid}`)
            res.redirect(302,`/list/newlist`)
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
            // res.render('lists_deleted', {
            //     todolists: deleteRequest
            // })
            console.log(listDeleted.name)
            console.log('====================')
            // res.redirect(302,`/list/deletelist`)
            res.send(200)
        })
        .catch((err) => {
            res.status(500).send('What just happend!!')
        })
})

// app.get('/list/newlist/:item', (req, res) => {
//     const itemRequest = req.params.item

//     console.log(itemRequest)
//     function itemList (itemRequest) {
//         .then()
//     }
    

// })

app.listen(port, () => {
    console.log('Port is listening on: ' + port)
});
