const dbConfig = require('../knexfile').development
const knex = require('knex')(dbConfig)



const getListsQuery = `SELECT * FROM todolists`

function getLists () {
    return knex.raw(getListsQuery)
        .then ((results) => {
            return results.rows
        })
}


// API

module.exports = {
    getLists: getLists
}