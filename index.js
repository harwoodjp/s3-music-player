const http = require('http')  
const port = 3000

const player = require("./player")

const requestHandler = (request, response) => {  
  console.log(request.url)
  	let keys = [];
	player.listBucketObjects.then( data => {
		console.log(player.getUrlArray(data))
	});

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
