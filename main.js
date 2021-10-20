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
let total = 5298

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
            <div class="cart__item-content-amout--btn minus" data-id="${item.id}"></div>
            <span class="cart__item-content-amout--number">${item.numbers}</span>
            <div class="cart__item-content-amout--btn plus" data-id="${item.id}"></div>
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
        <span class="cart__price--price">$${new Intl.NumberFormat().format(total)}</span>
      </div>
    `
  })
  cart.innerHTML = cartItemsContentHead + cartItemsContentMiddle + cartItemsContentEnd
}()

let deliveryFee = 0
let currentStep = 0
let deliveryWay = '標準運送'
const btn = document.querySelector('.btns')
const btnNext = document.querySelector('.btns__next')
const btnPrev = document.querySelector('.btns__prev')
const forms = document.querySelectorAll('.form__part')
const steps = document.querySelectorAll('.stepper__info')
const price = document.querySelector('.cart__price')
const itemsPlusAndMinusControl = document.querySelectorAll('.cart__item-content-amout')

// 按鈕相關函式
function controlStep(e) {
  const target = e.target.closest('.btn')
  if (!target) { return }
  if (target.firstElementChild.textContent === "確認下單") {
    confirm(`
      總金額為 ${new Intl.NumberFormat().format(total)} 元
      運送方式為：${deliveryWay}，運費為 ${deliveryFee}
    `)
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
  if (currentStep === 2) {
    return btnNext.innerHTML = '<span class="btns__next-text">確認下單</span>'
  }
  if (currentStep) {
    btnPrev.classList.remove('disabled')
    btnNext.innerHTML = `
      <span class="btns__next-text">下一步</span>
      <div class="btns__next-icon"></div>
    `
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
        deliveryFee = 0
        deliveryWay = "標準運送"
        countPrice()
      }
      if (radio.id === 'dhl') {
        deliveryFee = 500
        countPrice()
        deliveryWay = "DHL貨運"
      }
    } else {
      radio.parentElement.classList.remove('checked')
    }
  })
}

// 購物車加減按鈕控制
function plusOrMinusNumbersOfItem(e) {
  const target = e.target.closest('.cart__item-content-amout--btn')
  const itemId = e.target.closest('.cart__item-content-amout--btn').dataset.id
  const itemShowNumbers = document.querySelectorAll('.cart__item-content-amout--number')
  if (target.classList.contains('minus')) {
    if (items[itemId - 1].numbers === 0) { return }
    items[itemId - 1].numbers--
    itemShowNumbers[itemId - 1].innerHTML = items[itemId - 1].numbers
  }
  if (target.classList.contains('plus')) {
    items[itemId - 1].numbers++
    itemShowNumbers[itemId - 1].innerHTML = items[itemId - 1].numbers
  }
  countPrice()
}

// 算金額
function countPrice() {
  total = 0
  items.forEach((item) => {
    total += item.numbers * item.price
  })
  total += deliveryFee
  price.lastElementChild.innerHTML = `$${new Intl.NumberFormat().format(total)}`
}

btn.addEventListener('click', controlStep)
secondForm.addEventListener('change', confirmBorderColor)
itemsPlusAndMinusControl.forEach((controller) => {
  controller.addEventListener('click', plusOrMinusNumbersOfItem)
})