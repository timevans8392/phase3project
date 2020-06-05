const dbConfig = require('../knexfile').development
const knex = require('knex')(dbConfig)



const getListsQuery = `SELECT * FROM todolists`

function getLists () {
    return knex.raw(getListsQuery)
        .then ((results) => {

            return results.rows
        })
}

const createListQuery = `
INSERT INTO todolists (uuid, name)
VALUES (?, ?)
RETURNING *;
`

function createList (name, uuid) {
    return knex.raw(createListQuery, [uuid, name])
        .then ((results) => {
            // console.log(results)
            // console.log('Here are the results')
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

const createItemQuery = `
INSERT INTO todoitems (uuid, name)
VALUES (?, ?)
RETURNING *;
`

function createItem (name, uuid) {
    return knex.raw(createItemQuery, [uuid, name])
        .then ((results) => {
            // console.log(results)
            // console.log('======================')
            return results
        })
}

const getItemsQuery = `
SELECT * FROM todoitems
`

function getItems () {
    return knex.raw(getItemsQuery)
        .then((results) => {
            console.log(results.rows)
            return results.rows
        })
}

// API

module.exports = {
    getLists: getLists,
    createList: createList,
    deleteList: deleteList,
    createItem: createItem,
    getItems: getItems
}
