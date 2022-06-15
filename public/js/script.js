console.log('are we connected?');

const form = document.querySelector('form');
const nextButtons = document.querySelectorAll('.btn-next');
const nextBtn = document.querySelector('.btn-next')
const submitBtn = document.querySelector('#form-submit')
let i = 1

nextButtons.forEach(e => e.addEventListener('click', () => {
    nextQuestions()

}));

function nextQuestions() {
    document.querySelector(`fieldset:nth-of-type(${i})`).classList.remove('show');
    i++;
    console.log('i =', i);
    document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('show');
    showSubmitBtn();

}

function showSubmitBtn() {
    if (i >= 3) {
        submitBtn.classList.remove('hide');
        nextBtn.classList.add('hide');
    }
}


