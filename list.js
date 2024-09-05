document.addEventListener('DOMContentLoaded', function() {
    const addItemForm = document.getElementById('add-item-form');
    const shoppingList = document.getElementById('shopping-list');
    const logoutButton = document.getElementById('logout-button');

    addItemForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const itemInput = document.getElementById('item-input');
        const itemText = itemInput.value;

        const li = document.createElement('li');
        li.textContent = itemText;
        shoppingList.appendChild(li);

        itemInput.value = '';
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    });

    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'index.html';
    }

    document.getElementById('start-scanner').addEventListener('click', () => {
        if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
            // Ativar o scanner
            startScanner();
        } else {
            alert('Câmera não suportada neste dispositivo.');
        }
    });
    
    function startScanner() {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner') // Elemento onde a câmera será exibida
            },
            decoder: {
                readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"] // Tipos de códigos suportados
            }
        }, function(err) {
            if (err) {
                console.log(err);
                alert('Erro ao iniciar o scanner.');
                return;
            }
            console.log("Inicializando scanner...");
            Quagga.start();
        });
    
        Quagga.onDetected(function(result) {
            alert("Código de barras detectado: " + result.codeResult.code);
            // Pare o scanner após a leitura
            Quagga.stop();
        });
    }
    
});
