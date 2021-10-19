let deliveryFee = 0
let currentStep = 0
const btn = document.querySelector('.btns')
const btnNext = document.querySelector('.btns__next')
const btnPrev = document.querySelector('.btns__prev')
const forms = document.querySelectorAll('.form__part')
const steps = document.querySelectorAll('.stepper__info')
const cart = document.querySelector('.cart')
const secondForm = document.querySelector('.form__second')
const secondFormRadios = document.querySelectorAll('.form__second-delivery--radio')
const items = [
  {
    id: 1,
    image: './src/images/pants-1.png',
    name: '破壞補丁修身牛仔褲',
    price: 3999,
    numbers: 1
  },
  {
    id: 2,
    image: './src/images/pants-2.png',
    name: '刷色直筒牛仔褲',
    price: 1299,
    numbers: 1
  }
]
const price = document.querySelector('cart__price')
let total = 0

const cartInnerHTML = function () {
  let cartItemsContentHead = `
    <p class="cart__title">購物籃</p>
  `
  let cartItemsContentMiddle = ''
  items.forEach((item) => {
    cartItemsContentMiddle += `
      <div class="cart__item">
        <img
          src="${item.image}"
          alt="${item.name}"
          class="cart__item-picture"
        />
        <div class="cart__item-content">
          <p class="cart__item-content-name">${item.name}</p>
          <div class="cart__item-content-amout">
            <div class="cart__item-content-amout--minus" data-id="${item.id}"></div>
            <span class="cart__item-content-amout--number">${item.numbers}</span>
            <div class="cart__item-content-amout--plus" data-id="${item.id}"></div>
          </div>
          <p class="cart__item-content-price">$${new Intl.NumberFormat().format(item.price)}</p>
        </div>
      </div>
    `
    cartItemsContentEnd = `
      <div class="cart__deliveryFee">
        <span class="cart__deliveryFee--fee">運費</span>
        <span class="cart__deliveryFee--price">免費</span>
      </div>
      <div class="cart__price">
        <span class="cart__price--total">小計</span>
        <span class="cart__price--price">$${total}</span>
      </div>
    `
  })
  cart.innerHTML = cartItemsContentHead + cartItemsContentMiddle + cartItemsContentEnd
}()

// 按鈕相關函式
function goToNextStep(e) {
  const target = e.target.closest('.btn')
  if (!target) { return }
  if (target.firstElementChild.textContent === "確認下單") {
    confirm(`總金額為 ${new Intl.NumberFormat().format(total)} 元`)
    return
  }
  let pastStep = currentStep
  if (target.classList.contains('btns__next')) {
    currentStep++
  } else if (target.classList.contains('btns__prev')) {
    currentStep--
  }
  toggleBtnDisabledStyle()
  toggleStepperAndForm(currentStep, pastStep)
}

function toggleBtnDisabledStyle() {
  if (currentStep) {
    btnPrev.classList.remove('disabled')
    if (currentStep === 2) {
      btnNext.innerHTML = '<span class="btns__next-text">確認下單</span>'
    } else {
      btnNext.innerHTML = `
        <span class="btns__next-text">下一步</span>
        <div class="btns__next-icon"></div>
      `
    }
  } else {
    btnPrev.classList.add('disabled')
  }
}

function toggleStepperAndForm(stepA, stepB) {
  forms[stepA].classList.toggle('d-none')
  forms[stepB].classList.toggle('d-none')
  if (stepA > stepB) {
    steps[stepA].classList.add('active')
    steps[stepB].classList.remove('active')
    steps[stepB].classList.add('finish')
  } else {
    steps[stepB].classList.remove('finish')
    steps[stepB].classList.add('active')
    steps[stepA].classList.remove('active')
  }
}

// radio表單函式
function confirmBorderColor() {
  secondFormRadios.forEach((radio) => {
    if (radio.checked) {
      radio.parentElement.classList.add('checked')
      if (radio.id === 'std') {
        return deliveryFee = 0
      }
      if (radio.id === 'dhl') {
        return deliveryFee = 500
      }
    } else {
      radio.parentElement.classList.remove('checked')
    }
  })
}

btn.addEventListener('click', goToNextStep)
secondForm.addEventListener('change', confirmBorderColor)