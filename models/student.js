'use strict'

//- import the 'mongoose' 
const mongoose = require('mongoose');
/* The new schema, here
    - Create new Schema called 'studentSchema'
    * firstName - (String, required)
    * lastName - (String, required)
    * grade - (Number, required)
    * age - (Number, Greater than or equal 18)
    * city - (String)
*/

const studentSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    grade : {
        type: Number,
        required: true
    },
    age : {
        type: Number,
        min: 18
    },
    city : {
        type:String
    }
},
{
    timestamps:true,
    toObject:{
        virtuals: true
    },
    toJSON:{
        virtuals: true
    }
}
)
// we used a virtual if we have some action e.g. if we want to merge the name together as full name 
// The model of the schema 
const studentModel = mongoose.model('studentModel', studentSchema)

// Export the model 
module.exports = studentModel