const Quiz = require('./api/quiz.js')

console.log("Hello")
const quiz = new Quiz(ui_slide_container, window.questions)
quiz.start()