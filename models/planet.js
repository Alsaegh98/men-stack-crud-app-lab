const mongoose = require('mongoose')  



const planetSchema = new mongoose.Schema({
    name: String,  
    isReadyToSee: Boolean,  
})



const planet = mongoose.model('planet', planetSchema)



module.exports = planet