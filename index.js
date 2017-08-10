const http = require('http')
require('dotenv').config()

const { port } = require('./util')

const server = http.createServer(require('./handlers').router)

server.listen(port, (err) => {  
    if (err) {
        return console.log('Error: ', err)
    }
    console.log(`Server is listening on ${port}`)
})
