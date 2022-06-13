const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const familyname = document.getElementById('familyname');
const email = document.getElementById('email');
const member = document.getElementById('member');
const updates = document.getElementById('updates');
const agree = document.getElementById('agree');


// ---------- USER FRIENDLY DESIGN ---------- //

// SUCCESS
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// ERROR
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
            isRequired = true;
        } else {
            showSuccess(input);
        }
    });

    return isRequired;
}


// FIELDNAME
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


// ---------- VALIDATION ---------- //

// EMAIL VALIDATION
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}


// CHARACTER LENGTH VALIDATION
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}


// CHECKBOX & DROPDOWN & RADIOBUTTON VALIDATION
function checkMember() {
    const bangchan = document.getElementById('bangchan');
    const leeknow = document.getElementById('leeknow');
    const changbin = document.getElementById('changbin');
    const hyunjin = document.getElementById('hyunjin');
    const han = document.getElementById('han');
    const felix = document.getElementById('felix');
    const seungmin = document.getElementById('seungmin');
    const jeongin = document.getElementById('jeongin');
    const disp = document.getElementById('disp');

    if (bangchan.checked || leeknow.checked || changbin.checked || hyunjin.checked || han.checked || felix.checked || seungmin.checked || jeongin.checked) {
        disp.innerHTML
            = "<span class='disp02'>Members selected</span>";
    } else {
        disp.innerHTML
            = "<span class='disp'>Please select an option</span>";
    }

}



function checkUpdates() {
    const daily = document.getElementById('daily');
    const weekly = document.getElementById('weekly');
    const monthly = document.getElementById('monthly');
    const disp2 = document.getElementById("disp2");

    if (daily.selected || weekly.selected || monthly.selected) {
        disp2.innerHTML
            = "<span class='disp22'>Update version selected</span>";
    } else {
        disp2.innerHTML
            = "<span class='disp2'>Please select an option</span>";
    }

}


function checkAgreement() {
    const yes = document.getElementById('yes');
    const no = document.getElementById('no');
    const disp3 = document.getElementById('disp3');

     if (yes.checked) {
        disp3.innerHTML
            = "<span class='disp32'>Agreed to the terms</span>";
    } else if (no.checked) {
        disp3.innerHTML
            = "<span class='disp3'>You need to agree to this term</span>";
    } else {
        disp3.innerHTML
            = "<span class='disp3'>Please select an option</span>";
    }

}



function validateForm() {
    if (!checkRequired([firstname, familyname, email])) {
        checkMember();
        checkUpdates();
        checkAgreement();
        checkLength(firstname, 3, 15);
        checkLength(familyname, 3, 30);
        checkEmail(email);
    }
}



// EXTERN CODES
form.addEventListener('submit', function (e) {
    //https://www.w3schools.com/jsref/event_preventdefault.asp
    e.preventDefault();
    //First validate form
    validateForm();
})

