const mysql = require('mysql2')

const db = require('knex')({
	client: 'mysql2',
	connection: {
		host : process.env.DB_HOST,
		user : process.env.DB_USER,
		password : process.env.DB_PASS,
		database : process.env.DB_DATABASE
	}
})

module.exports = db

/*	Examples 
	
async function selectAllUsers() {
    const res = await db.select('*').from('user')
    console.log(res)
}
selectAllUsers();

async function delUsersGt99999() {
    const res = await db('user').where('id', '>', 99999).del()
    console.log(res)
}
del();

async function insertDataSource() {
    const res = await db('user').insert({
		
    })
}

const DataSource = require("../../app/models/DataSource")
const newDataSource = new DataSource;
newDataSource.user_id = 2
newDataSource.provider_id = 1
newDataSource.config = {
	bucket: "foo",
	prefix: "bar",
	accessKeyId: "fooId",
	secretAccessKey: "barSecret"
}
newDataSource.serializeConfig()

async function insertDataSource() {
    const res = await db('data_source').insert({
		user_id: newDataSource.user_id,
		provider_id: newDataSource.provider_id,
		config: newDataSource.config
    })
    console.log(res)
}
insertDataSource()

*/
