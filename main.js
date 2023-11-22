var form_errors = [];

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and inject header
    fetch('pages/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').outerHTML = html;
        });
    
    // Fetch and inject technical skills
    fetch('pages/technical_skills.html')
        .then(response => response.text())
        .then(html => {
            document.getElementsByClassName('technical_skills')[0].outerHTML = html;
        });

    // Fetch and inject projects list
    fetch('pages/projects_list.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('projects_list').outerHTML = html;
        });
    

    // Fetch and inject footer
    fetch('pages/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer').outerHTML = html;
        });
})

function validateForm() {
    // Your validation logic here
    // Use Constraint Validation API, setCustomValidity, etc.
    
    // For illustration purposes, always return true for the form to be submitted
    return true;
}

function masking(element) {
    // Masking mechanism using RegExp pattern
    const pattern = new RegExp(element.getAttribute("pattern"));
    console.log(pattern);
    const errorOutput = document.getElementById(element.id + "Error");
    // if appended entered character is illegal, display error message
    if (!pattern.test(element.value)) {
        element.setCustomValidity("Illegal character entered");
        errorOutput.textContent = "Illegal character entered";
        errorOutput.classList = "error";
        captureError(element.id, "Illegal character entered");     
    } else {
        element.setCustomValidity("");
        errorOutput.textContent = "";
        errorOutput.classList = "";
    }
}    

function lengthMonitor(element) {
    // Length reporting
    const maxLength = element.getAttribute("maxlength");
    const remainingChars = maxLength - element.value.length;
    const infoOutput = document.getElementById(element.id + "Info");   
    console.log(remainingChars);
    if (remainingChars <= 0) {
        infoOutput.textContent = `Error: exceeded maximum length of ${maxLength} characters`;
        infoOutput.classList = "error";
        captureError(element.id, `Exceeded maximum length of ${maxLength} characters`);
    }
    else if (remainingChars <= 100) {
        infoOutput.textContent = `Warning: ${remainingChars} characters remaining`;
        infoOutput.classList = "info";
    } else {
        infoOutput.textContent = "";
        infoOutput.classList = "";
    }
}

function captureError(elementId, errorMessage) {
    const errorObject = { field: elementId, message: errorMessage };
    form_errors.push(errorObject);
    updateFormErrorsInput();
}

function removeError(elementId) {
    form_errors = form_errors.filter(error => error.field !== elementId);
    updateFormErrorsInput();
}

function updateFormErrorsInput() {
    const formErrorsInput = document.getElementById("formErrorsInput");
    formErrorsInput.value = JSON.stringify(form_errors);
}
