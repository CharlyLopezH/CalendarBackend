const mongoose = require('mongoose');

const dbConnection = async() => {

    try {
        await mongoose.connect (process.env.DB_CNN);

        console.log('DB OnLine!!');
        
    } catch (error) {

        console.log(error);
        throw  Error('Error al inicializar la BD '+error);
        
    }
}

module.exports={
    dbConnection
}