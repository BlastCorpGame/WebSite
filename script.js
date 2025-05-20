const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

function sendEmail() {
  let params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  }
  emailjs.send('service_y7tur37', 'template_qfnxcbs', params)
}


// Clique abre o seletor de arquivos
dropArea.addEventListener('click', () => fileInput.click());

// Drag over
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#666';
});

// Drag leave
dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#ccc';
});

// Drop
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#ccc';
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
});

// Input via seletor
fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
});

function handleFiles(files) {
    files.forEach(file => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '150px';
            img.style.maxHeight = '150px';
            img.style.borderRadius = '8px';
            img.style.objectFit = 'cover';
            imagePreviewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}
