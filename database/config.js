const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const uploader = cloudinary.uploader;

const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs')
    }

}


/**
 * Conexión a cloudinary
 */

const cloudinaryConfig = (req, res, next) => {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
    next();
}

module.exports = {
    dbConnection,
    cloudinaryConfig,
    uploader
}