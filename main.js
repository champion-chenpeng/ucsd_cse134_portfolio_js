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
});
