const express = require('express');
const db = require('./lib/db');
const validate = require('./lib/validate');


const app = express();
const port = 7001;

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
            console.log(dataBaseQueryResult.rows)
            res.redirect(302,`/lists`)
        })
        .catch((err) => {
            // console.log(err)
            res.status(500).send('oh man, we totally messed up')
        })
})

app.get('/lists', (req, res) => {
    // const theName = req.params.name

    db.getLists()
        .then((theLists) => {
            // console.log(theLists)
            // console.log('End of the lists')
            res.render('lists', {
    todolists: theLists
    })
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
            res.status(200)
        })
        .catch((err) => {
            res.status(500).send('What just happend!!')
        })
})

// app.get('/list/:uuid', (req, res) => {
//     const itemRequest = req.params.uuid

//     console.log(itemRequest)
//     function itemList (itemRequest) {
//         res.send(200)
//     }

// })

app.get('/list/:uuid', (req, res) => {
    const itemRequest = req.params.uuid

    // console.log(itemRequest)
    db.getItems()
        .then((itemData) => {

            console.log('================')
            // console.log(itemData)
            res.render('items', {todoitems: itemData})
        })
        .catch((err) => {
            res.status(500).send("Couldn't get the page")
        })
})

app.post('/list/item', function (req, res) {
    //New code
    // This route is creating a new item
    // Input is the name
    const theName = req.body.name
        // console.log(theName)
        // console.log('zzzzzzzzzzzz')
    // This app needs to generate an UUID for the list
    const theUUID = generateUUID()
    // console.log(req.body)

    // const returnData = returnData.rows

    db.createItem(theName, theUUID)
        .then((itemData) => {
            // console.log(itemData)
            // res.render('items', {
            //     // itemUUID: theUUID,
            //     // itemName: theName,
            //     todoitems: itemData.rows
            // })
            res.redirect(302,`/list/items`)
        })
        .catch((err) => {
            // console.log(err)
            res.status(500).send('oh man, we totally messed up')
        })
})

app.get('/list/items', (req, res) => {
    const itemRequest = req.params.uuid

    // console.log(itemRequest)
    db.getItems()
        .then((itemData) => {

            console.log('================')
            // console.log(itemData)
            res.status(200).render('items', {todoitems: itemData})
        })
        .catch((err) => {
            res.status(500).send("Couldn't get the page")
        })
})


app.listen(port, () => {
    console.log('Port is listening on: ' + port)
});
