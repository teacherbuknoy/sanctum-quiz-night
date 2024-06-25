const Quiz = require('./api/quiz.js')

function isAdmin() {
  return localStorage.getItem('sanctum_auth_role') === 'admin'
}

const quiz = new Quiz(ui_slide_container, window.questions)

const socket = new WebSocket('wss://sanctumapi.francisrub.io/quiz')
socket.onmessage = function (event) {
  const data = JSON.parse(event.data)
  console.log(data)

  if (data.command !== 'heartbeat') {
    quiz.start()
  }

  switch (data.command) {
    case 'show_correct':
      quiz.correctAnswer = data.params.choice
      showAnswer()
      break
    case 'show_answer':
      const { choice, isCorrect } = data.params
      const btnChoice = quiz.element.querySelector(`[data-choice=${choice}]`)
      if (isCorrect) {
        btnChoice.classList.add('correct')
        showAnswer()
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

function showAnswer() {
  const item = quiz.data[quiz.current]
  console.log('[ANSWER]', item)

  if (item.answerText) {
    quiz.ui.answer.showPopover()
  }
}

if (isAdmin()) {
  document.querySelectorAll('button[data-choice]').forEach(button => {
    button.removeAttribute('popovertarget')
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

  ui_refresh.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'change_slide',
      params: {
        slideIndex: quiz.current
      }
    }))
  })

  ui_show_answer.addEventListener('click', e => {
    socket.send(JSON.stringify({
      command: 'show_correct',
      params: { choice: quiz.correctAnswer, isCorrect: true }
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
} else {
  document.querySelectorAll('button[data-choice]').forEach(button => {
    const warning = document.getElementById('dont-answer-here')
    let popoverTimeout = null
    button.addEventListener('click', e => {
      clearTimeout(popoverTimeout)
      popoverTimeout = setTimeout(() => warning.hidePopover(), 3000)
    })
  })
}