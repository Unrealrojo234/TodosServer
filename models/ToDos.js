const mongoose = require("mongoose")

const TodosSchema = mongoose.Schema(
    {
        startDate:{
            type:"String",
            required:true
        },
        dueDate:{
            type:"String",
            required:true
        },
        task:{
            type:"String",
            required:true
        },
        complete:{
            type:Boolean,
            default:false
        }
        
    },
    {
        timestamps:true
    }
)

const todos = mongoose.model("Todos",TodosSchema);
module.exports = todos;