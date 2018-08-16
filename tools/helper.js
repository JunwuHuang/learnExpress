const MongoClient = require('mongodb').MongoClient

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'managerDB'

module.exports = {
    find(collectionName, obj, callback) {
        // Use connect method to connect to the server
        MongoClient.connect(url, { useNewUrlParser:true }, function (err, client) {
            if (err) throw err
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            db.collection(collectionName).find(obj).toArray((err, result) => {
                if (err) throw err
                client.close()
                callback(result)
            })
        })
    },
    insertOne(collectionName, obj, callback) {
        // Use connect method to connect to the server
        MongoClient.connect(url, { useNewUrlParser:true }, function (err, client) {
            if (err) throw err
            console.log("Connected successfully to server");

            const db = client.db(dbName);

            db.collection(collectionName).insertOne(obj, (err, result) => {
                if (err) throw err
                client.close()
                callback(result)
            });
        })
    },
    tips(response, message, url) {
        response.send(`<script>window.alert('${ message }');window.location='${ url }'</script>`)
    }
}