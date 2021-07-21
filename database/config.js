const mongoose = require('mongoose');

const dbconnection = async() =>{


    try {

        await mongoose.connect(process.env.MONGODBCNN, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true, useFindAndModify : false});
        console.log('Database Connect Mongo Atlas')
    } catch (error) {
        console.log(error)
        throw new Error('NO DATABASE CONNECT APP NO WORKING')
    }


}



module.exports = {
    dbconnection
}