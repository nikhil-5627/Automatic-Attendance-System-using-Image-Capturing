const mongoose = require('mongoose');
const studentschema =new mongoose.Schema(
    {
        student_id: {
            type: String,
            required: true,
            unique:true,
        },
        password: {
            type:String,
            required:true,
            unique:true,
        }
    },
    {
        timestamps: true
    }
);

const student = mongoose.model('student', studentschema);
model.exports = student;