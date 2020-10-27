const express = require('express');
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const {PORT,} = require('./configs/env.config')


app.use(require('./routes/api/index.route'))
app.listen(PORT,()=>{
    console.log(`server started ${PORT} http://localhost:${PORT}/api/v1`)
})