document.querySelector("#CyclingType").addEventListener("keyup", validateForm);
document.querySelector("#LikedBrands").addEventListener("click", validateForm);

let CyclingType = document.querySelector("#CyclingType");
let YearsUsingBicycle = document.querySelector("#YearsUsingBicycle");
let HoursPerWeek = document.querySelector("#HoursPerWeek");
let LikedBrands = document.querySelector("#LikedBrands");

function validateForm() {
    if ((CyclingType.value != null && CyclingType.value != "") && (LikedBrands.value != null && LikedBrands.value != "")) {
        element = document.querySelector(".submit-button");
        element.classList.add("valid-submit");
        return true;
    } else {
        element = document.querySelector(".submit-button");
        element.classList.remove("valid-submit");
        return false;
    }
}

function verifyForm() {
    if (validateForm()) {
        makeCall();
    } else {
        let message = "Por favor rellena los datos correctamente.";
        showMessageBox(message);
    }
}

function resetInputs() {
    CyclingType.value = "";
    YearsUsingBicycle.value = 0;
    HoursPerWeek.value = 0;
    LikedBrands.value = "";
    clearInputTags();
    validateForm();
}

function clearInputTags() {
    $('#CyclingType').importTags('');
    $('#LikedBrands').importTags('');
}

function showMessageBox(message) {
    let messageElement = document.querySelector(".message-box");
    messageElement.querySelector("p").innerHTML = message;
    messageElement.classList.add("showmessage");
    setTimeout(function () {
        messageElement.classList.remove("showmessage");
    }, 4000);
}

function makeCall() {
    let loaderElement = document.querySelector(".loader");
    loaderElement.classList.add("loading");

    const data = {
        CyclingType: CyclingType.value,
        YearsUsingBicycle: YearsUsingBicycle.value,
        HoursPerWeek: HoursPerWeek.value,
        LikedBrands: LikedBrands.value
    }

    console.log(data);

    axios.post('https://bicyclestoretest.firebaseio.com/orders.json', data)
        .then(response => {
            console.log(response);
            loaderElement.classList.remove("loading");
            let message = "Tus datos fueron enviados exitosamente.";
            showMessageBox(message);
            resetInputs();
        })
        .catch(function (error) {
            console.log(error);
        });
}

// JQuery Functions for the input tags to work

$(function () {
    $('#LikedBrands').tagsInput({
        'width': 'auto',
        'onAddTag': validateForm,
        'onRemoveTag': validateForm,
        'onChange': validateForm
    });
});

$(function () {
    $('#CyclingType').tagsInput({
        'width': 'auto',
        'onAddTag': validateForm,
        'onRemoveTag': validateForm,
        'onChange': validateForm
    });
});

