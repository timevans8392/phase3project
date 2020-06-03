const dbConfig = require('../knexfile').development
const knex = require('knex')(dbConfig)



const getListsQuery = `SELECT * FROM todolists`

function getLists () {
    return knex.raw(getListsQuery)
        .then ((results) => {
            return results.rows
        })
}

// const getListQuery = `
// SELECT *
// FROM todolists
// WHERE uuid = ?
// `

// function getList (uuid) {
//     return new Promise (function (resolve, reject) {
//         knex.raw(getListQuery, [uuid])
//             .then((theList) => {
                
//             })
//     })

// }

const createListQuery = `
INSERT INTO todolists (uuid, name)
VALUES (?, ?)
RETURNING *;
`

function createList (name, uuid) {
    return knex.raw(createListQuery, [uuid, name])
        .then ((results) => {
            return results
        })
}

const deleteListQuery = `
DELETE FROM todolists
WHERE uuid = ?
RETURNING *;
`
function deleteList (uuid) {
    return knex.raw(deleteListQuery, [uuid])
        .then ((results) => {
            return results.rows[0]
        })
}

const itemTitleQuery = `
SELECT name
FROM todolists
WHERE uuid = ?;
`
// SELECT *
// FROM todoitems
// INNER JOIN todolists
// ON todoitems.todolist_id = todolists.id;

function itemTitle (uuid) {
    return knex.raw(itemTitleQuery, [uuid])
        .then((results) => {
            // console.log(results.rows)
            // console.log('zzzzzzzzz')
            return results
        })
}


// API

module.exports = {
    getLists: getLists,
    // getList: getList
    createList: createList,
    deleteList: deleteList,
    itemTitle: itemTitle
}
