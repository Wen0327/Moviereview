const mongoose = require('mongoose');


const actorSchema =  mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required: true,
    },
    about:{
        type: String,
        trim:true,
        required: true,
    },
    gender:{
        type: String,
        trim:true,
        required: true,
    },
    // profile
    avatar:{
        type:Object,
        url:String,
        public_id:String
    }
    // timestamps record the time
},{timestamps:true})

// search
actorSchema.index({name:'text'})

module.exports = mongoose.model("Actor",actorSchema);

