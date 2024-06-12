const Quiz = require('./api/quiz.js')

function isAdmin() {
  return localStorage.getItem('sanctum_auth_role') === 'admin'
}

const quiz = new Quiz(ui_slide_container, window.questions)
quiz.start()

const socket = new WebSocket('wss://sanctumapi.francisrub.io/quiz')
socket.onmessage = function (event) {
  const data = JSON.parse(event.data)
  console.log(data)
}

if (isAdmin()) {
  document.querySelectorAll('button[data-choice]').forEach(button => {
    button.addEventListener('click', e => {
      const choice = button.dataset.choice
      socket.send(JSON.stringify({
        command: 'show_answer',
        params: { choice }
      }))
    })
  })

  ui_show_answer.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'show_correct'
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
}