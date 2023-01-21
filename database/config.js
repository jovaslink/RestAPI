const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const dbConnection= async ()=> {
        
    try {
        
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false
        });

        console.log('--BASE DE DATOS ONLINE--');

    } catch(error) {
        console.log(error);
        throw new Error('Error en la conexión a la base de datos');
    }

    
}

module.exports= {
    dbConnection
}

