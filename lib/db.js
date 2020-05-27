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
WHERE uuid = ?;
`
function deleteList (uuid) {
    return knex.raw(deleteListQuery, [uuid])
        .then ((results) => {
            return results.rows[0]
        })
}

// API

module.exports = {
    getLists: getLists,
    // getList: getList
    createList: createList,
    deleteList: deleteList
}
