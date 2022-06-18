console.log('are we connected?');

const form = document.querySelector('#form form');
const nextButtons = document.querySelectorAll('.btn-next');
const nextBtn = document.querySelector('.btn-next');
const submitBtn = document.querySelector('#form-submit');
const fieldsetTwo = document.querySelector(`fieldset:nth-of-type(2)`);
const fieldsetThree = document.querySelector(`fieldset:nth-of-type(3)`);
const progress = document.querySelector('#form .progressBar');
let i = 1

// FORM
// when JS is enabled
if (form) {
    addClass(submitBtn, 'hide');
    addClass(fieldsetTwo, 'hide');
    addClass(fieldsetThree, 'hide');
    deleteClass(nextBtn, 'hide');

    nextButtons.forEach(e => e.addEventListener('click', () => {
        updateFormSteps()
        updateProgressBar()

    }));

    // adds class to element
    function addClass(element, className) {
        element.classList.add(className);
    };

    //removes class from element
    function deleteClass(element, className) {
        element.classList.remove(className);
    }

    function updateFormSteps() {
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


    function updateProgressBar() {
        const width = i / 3
        progress.style.width = width * 100 + '%';

    }
}

// END FORM





