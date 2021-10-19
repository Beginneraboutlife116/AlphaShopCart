let currentStep = 0
const btn = document.querySelector('.btns')
const btnNext = document.querySelector('.btns__next')
const btnPrev = document.querySelector('.btns__prev')

function goToNextStep() {
  const target = event.target.closest('.btn')
  let pastStep = currentStep
  if (target.classList.contains('btns__next')) {
    currentStep++
    toggleBtnDisabledStyle()
  } else if (target.classList.contains('btns__prev')) {
    currentStep--
    toggleBtnDisabledStyle()
  }
}

function toggleBtnDisabledStyle() {
  if (currentStep) {
    btnPrev.classList.remove('disabled')
  } else {
    btnPrev.classList.add('disabled')
  }
}

btn.addEventListener('click', goToNextStep)