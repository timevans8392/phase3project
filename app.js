const express = require('express')


const app = express;
const port = 7890


app.listen(port, () => {
    console.log('Port is listening on: ' + port)
});