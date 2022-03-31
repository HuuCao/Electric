const MongoClient = require("mongodb").MongoClient;
const uri =
	"mongodb://electric:electric123@103.7.43.44:27017/admin?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("DB connect Done !");
	}
});

module.exports = client;
