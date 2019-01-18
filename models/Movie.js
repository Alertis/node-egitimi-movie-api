const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({  
    director_id: Schema.Types.ObjectId,
    title:{
        type: String,
        required: [true,'{PATH} is required' ],
        maxlength:[15, '{PATH} must be less then {MAXLENGTH} characters'],
        minlength:[1, '{PATH} must be long then {MINLENGTH} characters'],
    },
    category: {
        type: String,
        maxlength:[30, '{PATH} must be less then {MAXLENGTH} characters'],
        minlength:[1, '{PATH} must be long then {MINLENGTH} characters'],
    },
    country: String,
    year: Number,
    imdb_score: Number,
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports=mongoose.model('movie',MovieSchema);
