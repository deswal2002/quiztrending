const express= require('express')
const router=express.Router()
const quiz = require('../controller/quiz')
const verfiyToken = require('../middleware/authMidleware')

router.post('/createQuiz',verfiyToken,quiz.createQuiz)
router.get('/getQuiz/:quizId',quiz.getQuizById)
router.get('/allQuiz/:loginEmail',verfiyToken,quiz.getQuiz)
router.put('/editQuiz/:quizId',quiz.editQuiz)
router.delete('/deleteQuiz/:quizId',verfiyToken,quiz.deleteQuiz)
router.get('/trendingQuiz/:loginEmail',verfiyToken,quiz.trendingQuiz)

module.exports=router