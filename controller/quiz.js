const quiz= require('../models/quiz')

const createQuiz=async (req,res)=>{
    try {
        const {
            email,
            quizName,
            quizType,
            questionNo,
            question,
            option,
            option1,
            optionNo,
            optionType,
            timer,
            impression,
            correctOption,
            correctAns,
            wrongAns,
            anaylsis
        }=req.body
        if(
            !email ||
            !quizName ||
            !quizType ||
            !questionNo ||
            !question ||
            !option ||
            !optionType 
        ){
            return res.status(400).json({errorMessage:"Bad reqeust"})
        }

        const createQuiz=new quiz({
            email,
            quizName,
            quizType,
            questionNo,
            question,
            option,
            option1,
            optionNo,
            optionType,
            timer,
            impression,
            correctOption,
            correctAns,
            wrongAns,
            anaylsis
        })
        await createQuiz.save()
        const data=await quiz.findOne().sort({ _id: -1 });
        res.json({message:"quiz create succesfulls",id:data._id})

    } catch (error) {
        console.log(error)
    }
}
 
const getQuiz=async (req,res)=>{
    try {
        const email= req.params.loginEmail
        if(!email){
            return res.status(400).json({errorMessage:"Bad rteqeust"})
        }
        const data=await quiz.find({email:email})
        res.json({data:data})
    } catch (error) {
        console.log(error)
    }
}

const getQuizById= async (req,res)=>{
    try {
        const id= req.params.quizId
        if(!id){
            return res.status(400).json({errorMessage:"Bad rteqeust"})
        }
        const data=await quiz.findOne({_id:id})
        res.json({data:data})
    } catch (error) {
        console.log(error)
    }
}

const editQuiz=async (req,res)=>{
    try {
        const id= req.params.quizId
        if(!id){
            return res.status(400).json({errorMessage:"Bad rteqeust"})
        }
        const {
            email,
            quizName,
            quizType,
            questionNo,
            question,
            option,
            option1,
            optionType,
            timer,
            impression,
            correctOption,
            correctAns,
            wrongAns,
            anaylsis
        }=req.body
        if(
            !email ||
            !quizName ||
            !quizType ||
            !questionNo ||
            !question ||
            !option ||
            !optionType 
        ){
            return res.status(400).json({errorMessage:"Bad reqeust"})
        }
        await quiz.updateOne(
            {_id:id},
            {
                $set:{
                    email,
                    quizName,
                    quizType,
                    questionNo,
                    question,
                    option,
                    option1,
                    optionType,
                    timer,
                    impression,
                    correctOption,
                    correctAns,
                    wrongAns,
                    anaylsis
                }
           }
        )
        res.json({message:"Quiz is update successfull"})
    } catch (error) {
        console.log(error)
    }
}

const deleteQuiz=async (req,res)=>{
    try {
        const id= req.params.quizId
        if(!id){
            return res.status(400).json({errorMessage:"Bad rteqeust"})
        }
        await quiz.deleteOne({_id:id})
        res.json({message:"Quiz deleted  successfull"})
    } catch (error) {
        console.log(error)
    }
} 

const trendingQuiz= async (req,res)=>{
    try {
        const email= req.params.loginEmail
        if(!email){
            return res.status(400).json({errorMessage:"Bad rteqeust"})
        }
        const data=await quiz.find({email:email})
        const totalQuiz=data.length
        let totalQuestion =data.map((obj)=>obj.questionNo.map(()=>1))
        totalQuestion =totalQuestion.flat().reduce((acc, val) => acc + val, 0);
        let totalImpression = data.map((obj)=>obj.impression)
        totalImpression=totalImpression.flat().reduce((acc, val) => acc + val, 0);
        const trendingQuiz=data.filter((obj)=>obj.impression>10)
        trendingQuiz.sort((a, b) => b.impression - a.impression);
        res.json({totalQuiz:totalQuiz,totalQuestion:totalQuestion,totalImpression:totalImpression,trendingQuiz:trendingQuiz})
    } catch (error) {
        console.log(error)
    }
}

module.exports={createQuiz,getQuiz,getQuizById,editQuiz,deleteQuiz,trendingQuiz}