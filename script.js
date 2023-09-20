const billAmountElement = document.querySelector('.js-bill-input');
const tipButtons = document.querySelectorAll('.tip-button');
const customTipElement = document.querySelector('.js-custom-tip-input');
const numPeopleElement = document.querySelector('.js-num-people-input');
const tipAmountPersonElement = document.querySelector('.js-tip-amount-person');
const totalAmountPersonElement = document.querySelector('.js-total-amount-person')
const resetButton = document.querySelector('.reset-button')
const zeroMessage = document.querySelector('.num-zero')

let billAmount = null;
let tipValue = null;
let numPeople = null;

billAmountElement.addEventListener('input', ()=>{
    billAmount = parseFloat(billAmountElement.value)
    calculateTip()
});

function unclickButton(){
    tipButtons.forEach((btn)=>{
        btn.classList.remove('clicked');
    })
}

function reset(){
    resetButton.addEventListener('click' , ()=>{
        tipAmountPersonElement.textContent = `$0.00`
        totalAmountPersonElement.textContent = `$0.00`
        resetButton.disabled = true;
        billAmountElement.value = '';
        customTipElement.value = '';
        numPeopleElement.value = '';
        numPeople = null
        tipValue = null
        billAmount = null
    })
}

function calculateTip(){
    if (billAmount && tipValue && numPeople && numPeople > 0){
        const tipAmountPerson = (billAmount * tipValue/100) / numPeople
        const toatalAmountPerson = (billAmount/numPeople)+tipAmountPerson
        tipAmountPersonElement.textContent = `$${tipAmountPerson.toFixed(2)}`
        totalAmountPersonElement.textContent = `$${toatalAmountPerson.toFixed(2)}`
        resetButton.disabled = false;
        reset()
        zeroMessage.style.display = 'none'
    }else if (numPeople == 0){
        zeroMessage.style.display = 'inline-block'
    }
}

tipButtons.forEach((button)=>{
    button.addEventListener('click', ()=>{
        unclickButton()
        tipValue = parseFloat(button.getAttribute('data-value'));
        button.classList.add('clicked');
        customTipElement.value = '';
        calculateTip()
    })
})

customTipElement.addEventListener('input', ()=>{
    tipValue = parseFloat(customTipElement.value)
    unclickButton()
    calculateTip()
})

numPeopleElement.addEventListener('input', ()=>{
        numPeople = numPeopleElement.value
        calculateTip()
})