const mongoose= require('mongoose')

const quizSchema=new mongoose.Schema(
    {
        email:{
            type : String,
            required : true 
        },
        quizName:{
            type:String,
            required:true
        },
        quizType:{
            type:String,
            required:true 
        },
        questionNo:{
            type:[Number],
            required:true 
        },
        question:{
            type:[String],
            required:true 
        },
        option:{
            type:[[String]],
            required:true 
        },
        option1:{
            type:[[String]]
        },
        optionNo:{
            type:[[Number]],
            require:true
        },
        optionType:{
            type:String,
            required:true 
        },
        timer:{
            type:Number,
            
        },
        impression:{
            type:Number,
        },
        correctOption:{
            type:[Number],
        },
        correctAns:{
            type:[Number]
        },
        wrongAns:{
            type:[Number]
        },
        anaylsis:{
            type:[[Number]]
        }
    },
    { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
)

module.exports = mongoose.model("quiz",quizSchema)