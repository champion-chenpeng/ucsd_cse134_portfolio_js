var form_errors = [];
// Listener
document.addEventListener('DOMContentLoaded', async function () {
    await fetchAndInject('pages/header.html', 'header');
    await fetchAndInject('pages/technical_skills.html', 'technical_skills');
    await fetchAndInject('pages/projects_list.html', 'projects_list');
    await fetchAndInject('pages/footer.html', 'footer');

    setupThemeToggle();
});
// Fetch and inject HTML
async function fetchAndInject(url, targetId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(targetId).outerHTML = html;
    } catch (error) {
        console.error(`Error fetching or injecting ${url}:`, error);
    }
}
// Theme toggle
function setupThemeToggle() {
    const themeSwitcher = document.getElementById('themeSwitch');
    themeSwitch.classList.remove('js-hidden');

    const themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('change', function () {
        if (themeToggle.checked) {
            setDarkMode();
            localStorage.setItem('theme', 'dark');
        } else {
            setLightMode();
            localStorage.setItem('theme', 'light');
        }
    });

    // Check the user's preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkMode();
        themeToggle.checked = true;
    } else {
        setLightMode();
    }
}

function setDarkMode() {
    document.documentElement.style.setProperty('--background-color', 'var(--background-color-dark)');
    document.documentElement.style.setProperty('--font-color', 'var(--font-color-dark)');
    document.documentElement.style.setProperty('--decorate-color', 'var(--decorate-color-dark)');
}

function setLightMode() {
    document.documentElement.style.setProperty('--background-color', 'var(--background-color-light)');
    document.documentElement.style.setProperty('--font-color', 'var(--font-color-light)');
    document.documentElement.style.setProperty('--decorate-color', 'var(--decorate-color-light)');
}


// Validate form

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
