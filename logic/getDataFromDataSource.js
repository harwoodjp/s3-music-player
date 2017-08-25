const fs = require('await-fs')
const _ = require("lodash")

async function readUserDataSourcesJson() {
	try { 
		return await fs.readFile("userDataSources.json", "utf8") 
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
		const userDataSources = JSON.parse(data),
		pendingDataSource = getActiveDataSource(activeDataSourceId, userDataSources)
		activeDataSource = pendingDataSource
	})
}

module.exports = getDataFromDataSource