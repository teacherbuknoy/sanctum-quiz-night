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

  showCurrentQuestion() {
    const item = this.data[this.current]
    console.log(item)
    this.ui.question.innerHTML = item.question

    console.log("ADMIN?", isAdmin())
    item.choices.forEach((option, idx) => {
      this.ui.choices[idx].innerText = option.text
      
      if (isAdmin() && option.isCorrect) {
        this.ui.choices[idx].classList.add('correct')
      }
    })
  }
}

module.exports = Quiz