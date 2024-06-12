const Quiz = require('./api/quiz.js')

function isAdmin() {
  return localStorage.getItem('sanctum_auth_role') === 'admin'
}

const quiz = new Quiz(ui_slide_container, window.questions)

const socket = new WebSocket('wss://sanctumapi.francisrub.io/quiz')
socket.onmessage = function (event) {
  const data = JSON.parse(event.data)
  console.log(data)
  quiz.start()

  switch (data.command) {
    case 'show_correct':
      quiz.correctAnswer = data.params.choice
      break
    case 'show_answer':
      const { choice, isCorrect } = data.params
      const btnChoice = quiz.element.querySelector(`[data-choice=${choice}]`)
      if (isCorrect) {
        btnChoice.classList.add('correct')
      } else {
        btnChoice.classList.add('wrong')
        setTimeout(() => btnChoice.classList.remove('wrong'), 2000)
      }
      break
    case 'change_slide':
      const { slideIndex } = data.params
      quiz.showSlide(slideIndex)
      break
  }
}

if (isAdmin()) {
  document.querySelectorAll('button[data-choice]').forEach(button => {
    button.addEventListener('click', e => {
      const choice = button.dataset.choice
      socket.send(JSON.stringify({
        command: 'show_answer',
        params: {
          choice,
          isCorrect: button.classList.contains('correct-for-admin')
        }
      }))
    })
  })

  ui_show_answer.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'show_correct',
      params: { choice: quiz.correctAnswer }
    }))
  })

  ui_prev_question.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'change_slide',
      params: {
        slideIndex: quiz.previous
      }
    }))
  })

  ui_next_question.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'change_slide',
      params: {
        slideIndex: quiz.next
      }
    }))
  })

  ui_start_quiz.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'start'
    }))
  })
}