const express = require('express');
const reqDate = require('./middleware/date')
const router = require('./router')
const app = express()
const port = 3000

app.use('/', router);
app.use(reqDate.date)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



