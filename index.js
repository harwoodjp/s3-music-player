const http = require('http')  
const port = 3000

const requestHandler = (request, response) => {  
  console.log(request.url)
  response.end('Hello!')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('Error: ', err)
  }

  console.log(`Server is listening on ${port}`)
})

/* test */
const player = require("./player")
player.listBucketObjects();