const db = require("../../config/db")

class DataSource {

	async fetchById(id) {
	    const res = await db('data_source').where('id', '=', process.env.DATA_SOURCE_ID).first()
	    this.id = res.id
	    this.provider_id = res.provider_id
	    this.config = JSON.parse(res.config)
	}

	serializeConfig() {
		this.config = JSON.stringify(this.config)
	}

}

module.exports = DataSource