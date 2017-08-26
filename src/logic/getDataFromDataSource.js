const fs = require('fs')
const _ = require("lodash")

async function readUserDataSourcesJson() {
	try { 
		return await fs.readFile("userDataSources.json", "utf8", data => { return data }) 
	}
	catch (err) { 
		console.error(err) 
	}
}

function getActiveDataSource(activeDataSourceId, userDataSources) {
	return _.find(userDataSources, dataSource => {
		return activeDataSourceId === dataSource.id
	})
}

async function getDataFromDataSource() {
	const activeDataSourceId = process.env.ACTIVE_DATA_SOURCE_ID
	return await readUserDataSourcesJson().then(data => {
		console.log(data)
		const userDataSources = JSON.parse(data)
		let pendingDataSource = getActiveDataSource(activeDataSourceId, userDataSources)
		let activeDataSource = pendingDataSource
	})
}

module.exports = getDataFromDataSource


/*   this works...
const fs = require("fs")
const { promisify } = require("util")

const fetchData = async () => {
	try {
		const data = await promisify(fs.readFile)("data.json", "utf8")
		console.log(data)
	}
	catch (err) {
		console.log(err)
	}
}

fetchData()
*/