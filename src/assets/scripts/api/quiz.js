function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isAdmin() {
  return localStorage.getItem('sanctum_auth_role') === 'admin'
}

class Quiz {
  constructor(element, data) {
    this.element = element
    this.data = data
    this.current = 0

    this.ui = {
      question: this.element.querySelector('[data-quiz=question]'),
      answer: this.element.querySelector('[data-quiz=answer]'),
      choices: [
        this.element.querySelector('[data-choice=a]'),
        this.element.querySelector('[data-choice=b]'),
        this.element.querySelector('[data-choice=c]'),
        this.element.querySelector('[data-choice=d]')
      ]
    }
  }

  start() {
    this.element.classList.add('start')
    document.body.classList.remove('cover')
    this.showCurrentQuestion()
  }

  end() {
    this.element.classList.remove('start')
  }

  next() {
    if (this.current < this.data.length) {
      this.current++;
      this.showCurrentQuestion()
    }
  }

  previous() {
    if (this.current > 0) {
      this.current--;
      this.showCurrentQuestion()
    }
  }

  showSlide(idx) {
    console.log('[CHANGE SLIDE]', idx)
    if (idx >= 0 && idx < this.data.length) {
      this.current = idx
      this.showCurrentQuestion()
    } else {
      console.error('Given slide index is greater than the total number of questions, or it is -1.')
    }
  }

  get previous() {
    if (this.current > 0) {
      return this.current - 1
    } else {
      return 0
    }
  }

  get next() {
    if (this.current < this.data.length) {
      return this.current + 1
    } else {
      return this.data.length - 1
    }
  }

  showCurrentQuestion() {
    const item = this.data[this.current]
    console.log(item)
    this.ui.question.innerHTML = `<p>Question #${this.current + 1}</p><p>${item.question}</p>`

    this.ui.answer.hidePopover()
    this.ui.answer.innerHTML = `<p>${item.answerText}</p><div class="choices for-display"><button class="correct">${item.choices.find(c => c.isCorrect).text}</button></div>`

    console.log("ADMIN?", isAdmin())
    item.choices.forEach((option, idx) => {
      this.ui.choices[idx].innerText = option.text
      this.ui.choices[idx].classList.remove('correct-for-admin')
      this.ui.choices[idx].classList.remove('correct')
      this.ui.choices[idx].classList.remove('wrong')
      
      if (isAdmin() && option.isCorrect) {
        this.ui.choices[idx].classList.add('correct-for-admin')
      }
    })
  }

  showCorrectAnswer() {
    if (isAdmin()) {
      const btnCorrect = this.element.querySelector('[data-choice].correct-for-admin')
      btnCorrect.classList.add('correct')      
    }
  }

  get correctAnswer() {
    if (isAdmin()) {
      const btnCorrect = this.element.querySelector('[data-choice].correct-for-admin')
      return btnCorrect.dataset.choice
    } else {
      return null
    }
  }

  set correctAnswer(value) {
    this.element.querySelector(`[data-choice=${value}]`)
      .classList.add('correct', 'correct-for-admin')
  }
}

module.exports = Quiz