console.log('are we connected?');
const form = document.querySelector('#form form');
const nextButtons = document.querySelectorAll('.btn-next');
const nextBtn = document.querySelector('.btn-next');
const submitBtn = document.querySelector('#form-submit');
const fieldset = document.querySelectorAll('#form fieldset')
const formProgress = document.querySelector('#form .progressBar');
const training = document.querySelector('.training')
const buttons = document.querySelector('.buttons')
const addBtn = document.querySelector('.add-btn')
const voeding = document.querySelector('.voeding')
const dashboard = document.querySelector('.dashboard')
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
        formProgress.style.width = width * 100 + '%';

    }
}
// END FORM

if (training) {
    addClass(buttons, 'hide')
    addBtn.addEventListener('click', () => {
        deleteClass(buttons, 'hide')
    })
}

if (voeding) {
    addClass(buttons, 'hide')
    addBtn.addEventListener('click', () => {
        deleteClass(buttons, 'hide')
    })

}

if (dashboard) {
    voedingProgressBar();
    bewegingProgressBar();


}

function bewegingProgressBar() {
    let progress = document.querySelector('.dashboard .container:nth-of-type(1) .progressBar')
    const value = document.querySelector('#beweging_value').innerHTML;
    const goal = document.querySelector('#beweging_goal').innerHTML;
    const currGoal = value / goal;
    const width = currGoal * 100 + '%';
    progress.style.width = width;



}

function voedingProgressBar() {
    let progress = document.querySelector('.dashboard .container:nth-of-type(2) .progressBar')
    const kcalValue = document.querySelector('.kcal_value').innerHTML;
    const eiwitValue = document.querySelector('.eiwit_value').innerHTML;
    const groenteValue = document.querySelector('.groente_value').innerHTML;
    const kcalGoal = document.querySelector('.kcal_goal').innerHTML;
    const eiwitGoal = document.querySelector('.eiwit_goal').innerHTML;
    const groenteGoal = document.querySelector('.groente_goal').innerHTML;
    const currKcalGoal = kcalValue / kcalGoal;
    const currEiwitGoal = eiwitValue / eiwitGoal;
    const currGroeteGoal = groenteValue / groenteGoal;

    const width = (currKcalGoal + currEiwitGoal + currGroeteGoal) / 3;
    progress.style.width = width * 100 + '%';
}

