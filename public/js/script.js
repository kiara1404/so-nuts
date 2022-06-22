console.log('are we connected?');
const form = document.querySelector('#form form');
const nextButtons = document.querySelectorAll('.btn-next');
const nextBtn = document.querySelector('.btn-next');
const submitBtn = document.querySelector('.form-submit');
let fieldset = document.querySelectorAll('#form fieldset')
const formProgress = document.querySelector('#form .progressBar');
const trainingPage = document.querySelector('.training');
const buttons = document.querySelector('.buttons');
const addBtn = document.querySelector('.add-btn');
const dashboardPage = document.querySelector('.dashboard');
const voedingPage = document.querySelector('.voeding');
const resultsPage = document.querySelector('.results')
let i = 1


// adds class to element
function addClass(element, className) {
    element.classList.add(className);
};

//removes class from element
function deleteClass(element, className) {
    element.classList.remove(className);
}


function showSubmitBtn() {
    if (i >= fieldset.length) {
        submitBtn.classList.remove('hide');
        nextBtn.classList.add('hide');
    }
}

function updateFormSteps() {
    document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('hide');
    document.querySelector(`fieldset:nth-of-type(${i})`).classList.remove('show');
    i++;
    console.log('i =', i);
    document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('show');

    showSubmitBtn();

}
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






    function updateProgressBar() {
        const totalFieldsets = fieldset.length;
        const width = i / totalFieldsets
        formProgress.style.width = width * 100 + '%';

    }
}
// END FORM

// if this page is visible
if (trainingPage) {
    const currTrainingGoal = document.querySelector('#total_goal').innerHTML;
    const currTrainingVal = document.querySelector('#total_min').innerHTML;
    goalAchieved(2, 'container', currTrainingVal);


    addClass(buttons, 'hide')
    addBtn.addEventListener('click', () => {
        deleteClass(buttons, 'hide')
    })
}

// if this page is visible
if (voedingPage) {
    const kcalValue = document.querySelector('.kcal_value').innerHTML;
    const eiwitValue = document.querySelector('.eiwit_value').innerHTML;
    const groenteValue = document.querySelector('.groente_value').innerHTML;
    const kcalGoal = document.querySelector('.kcal_goal').innerHTML;
    const eiwitGoal = document.querySelector('.eiwit_goal').innerHTML;
    const groenteGoal = document.querySelector('.groente_goal').innerHTML;
    const currKcalGoal = kcalValue / kcalGoal;
    const currEiwitGoal = eiwitValue / eiwitGoal;
    const currGroenteGoal = groenteValue / groenteGoal;
    const voedselAverage = (currKcalGoal + currEiwitGoal + currGroenteGoal) / 3 * 100;


    addClass(buttons, 'hide')
    addBtn.addEventListener('click', () => {
        deleteClass(buttons, 'hide')
    })
    goalAchieved(1, 'container-s', currGroenteGoal * 100)
    goalAchieved(2, 'container-s', currEiwitGoal * 100)
    goalAchieved(3, 'container-s', currKcalGoal * 100)



}

if (dashboardPage) {
    let progress;
    const kcalValue = document.querySelector('.kcal_value').innerHTML;
    const eiwitValue = document.querySelector('.eiwit_value').innerHTML;
    const groenteValue = document.querySelector('.groente_value').innerHTML;
    const kcalGoal = document.querySelector('.kcal_goal').innerHTML;
    const eiwitGoal = document.querySelector('.eiwit_goal').innerHTML;
    const groenteGoal = document.querySelector('.groente_goal').innerHTML;
    const currKcalGoal = kcalValue / kcalGoal;
    const currEiwitGoal = eiwitValue / eiwitGoal;
    const currGroenteGoal = groenteValue / groenteGoal;
    const voedselAverage = (currKcalGoal + currEiwitGoal + currGroenteGoal) / 3 * 100;

    voedingProgressBar();
    bewegingProgressBar();
    goalAchieved(1, 'container', document.querySelector('#beweging_value').innerHTML);
    goalAchieved(2, 'container', (voedselAverage))

    function voedingProgressBar() {
        progress = document.querySelector('.dashboard .container:nth-of-type(2) .progressBar');
        progress.style.width = voedselAverage + '%';
    }
}


function bewegingProgressBar() {
    let progress = document.querySelector('.dashboard .container:nth-of-type(1) .progressBar')
    const value = document.querySelector('#beweging_value').innerHTML;
    const goal = document.querySelector('#beweging_goal').innerHTML;
    const currGoal = value / goal;
    const width = currGoal * 100 + '%';
    progress.style.width = width;
}

function goalAchieved(x, el, value) {
    const checkmark = document.querySelector(`.${el}:nth-of-type(${x}) .checkmark i`);
    console.log(value)
    if (value >= 100) {
        addClass(checkmark, 'goal_achieved');
    }
}

if (resultsPage) {
    const checkmarks = document.querySelectorAll('.results .checkmark i')
    fieldset = document.querySelectorAll('.results fieldset');
    addClass(fieldset[1], 'hide');
    addClass(submitBtn, 'hide');
    deleteClass(nextBtn, 'hide');
    console.log(fieldset.length, i)

    nextBtn.addEventListener('click', () => {
        document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('hide');
        i++;
        console.log('i =', i);
        document.querySelector(`fieldset:nth-of-type(${i})`).classList.remove('hide');
        document.querySelector(`fieldset:nth-of-type(${i})`).classList.add('show');

        showSubmitBtn()
    })
    addClass(checkmarks[2], 'goal_achieved');
    addClass(checkmarks[4], 'goal_achieved');
    maxCheckboxes();



}

function maxCheckboxes() {
    const checkboxes = document.querySelectorAll('input[type="checkbox]');
    let arr = []
    checkboxes.forEach(element => {
        arr.push(element.value)
    })
    console.log(arr)


}