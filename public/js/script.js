console.log('are we connected?');
const form = document.querySelector('#form form');
const nextButtons = document.querySelectorAll('.btn-next');
const nextBtn = document.querySelector('.btn-next');
const submitBtn = document.querySelector('#form-submit');
const fieldset = document.querySelectorAll('#form fieldset')
const progress = document.querySelector('#form .progressBar');
const training = document.querySelector('.training')
const trainingBtns = document.querySelector('.buttons')
const addTrainingBtn = document.querySelector('#add-training-btn')
let i = 1



// adds class to element
function addClass(element, className) {
    element.classList.add(className);
};

//removes class from element
function deleteClass(element, className) {
    element.classList.remove(className);
}
console.log(fieldset.length)


// FORM
// when JS is enabled
if (form) {
    addClass(submitBtn, 'hide');
    addClass(fieldset[1], 'hide');
    addClass(fieldset[2], 'hide');
    addClass(fieldset[3], 'hide');
    addClass(fieldset[4], 'hide');
    addClass(fieldset[5], 'hide');
    deleteClass(nextBtn, 'hide');

    nextButtons.forEach(e => e.addEventListener('click', () => {
        updateFormSteps()
        updateProgressBar()

    }));

    function updateFormSteps() {

        document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('hide');
        document.querySelector(`fieldset:nth-of-type(${i})`).classList.remove('show');
        i++;
        console.log('i =', i);
        document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('show');

        showSubmitBtn();

    }

    function showSubmitBtn() {
        if (i >= fieldset.length) {
            submitBtn.classList.remove('hide');
            nextBtn.classList.add('hide');
        }
    }


    function updateProgressBar() {
        const totalFieldsets = fieldset.length;
        const width = i / totalFieldsets
        progress.style.width = width * 100 + '%';

    }
}
// END FORM

if (training) {
    addClass(trainingBtns, 'hide')
    addTrainingBtn.addEventListener('click', () => {
        deleteClass(trainingBtns, 'hide')
    })
}
// add training
// function addValues(a,b){


// }

// let a = 12

// localStorage.setItem('data', a);
// document.querySelector('.krachtValue').innerHTML = a + ':00'


// console.log(localStorage.getItem('data'))

// localStorage.setItem('data', localStorage.getItem('data') + a);
// console.log(typeof (localStorage.getItem('data')))