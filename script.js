document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        
        localStorage.setItem('user', JSON.stringify({ username, email, password }));

       
        window.location.href = 'list.html';
    });

    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = 'list.html';
    }
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js')
            .then(function(registration) {
              console.log('Service Worker registrado com sucesso:', registration);
            })
            .catch(function(error) {
              console.log('Falha ao registrar o Service Worker:', error);
            });
        });
      }
      
});