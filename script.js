// script.js
document.addEventListener("DOMContentLoaded", function() {
    fetch('menue.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("nav-placeholder").innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading the menu:', error);
        });
});