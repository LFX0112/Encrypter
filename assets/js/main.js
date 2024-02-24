// Variables
const encryptButton = document.querySelector('.encryptButton');
const decryptButton = document.querySelector('.decryptButton');
const copyButton = document.querySelector('.copyButton');
const encryptImage = document.querySelector('.result img');
const titleResult = document.querySelector('.result h1');
const textResult = document.querySelector('.result p');
const title = {
    titleStart: "Ningún mensaje fue encontrado",
    titleEncrypt: "El texto encriptado es:",
    titleDecrypt: "El texto desencriptado es:",
}
const messages = {
    start: "Ingresa el texto que desees encriptar o desencriptar.",
    errorEncrypt: "No hay texto para encriptar.",
    errorDecrypt: "No hay texto encriptado para desencriptar.",
};
// Events
encryptButton.addEventListener('click', encryptText);
decryptButton.addEventListener('click', decryptText);
copyButton.addEventListener('click', copyTextResult);
// Functions
function encryptText() {
    const textToEncrypt = validateAndNormalizeText(document.getElementById('texto').value);
    if (textToEncrypt !== null && textToEncrypt !== '') {
        // Perform encryption only if there is text
        const encryptedText = encrypt(textToEncrypt);
        encryptImage.classList.add('hidden');
        titleResult.textContent = title.titleEncrypt;
        textResult.textContent = encryptedText;
    } else {
        // Show image and default text if there is no text
        encryptImage.classList.remove('hidden');
        textResult.textContent = messages.errorEncrypt;
    }
}
function decryptText() {
    const textToDecrypt = validateAndNormalizeText(document.getElementById('texto').value);

    if (textToDecrypt !== null && textToDecrypt !== '') {
        // Perform decryption only if there is text and it is not the default message
        const decryptedText = decrypt(textToDecrypt);
        encryptImage.classList.add('hidden');
        titleResult.textContent = title.titleDecrypt;
        textResult.textContent = decryptedText;
    } else {
        // Show image and default text if there is no text
        encryptImage.classList.remove('hidden');
        textResult.textContent = messages.errorDecrypt;
    }
}
// Switch to encrypt specific characters
function encrypt(text) {
    return text.replace(/e/g, 'enter')
    .replace(/i/g, 'imes')
    .replace(/a/g, 'ai')
    .replace(/o/g, 'ober')
    .replace(/u/g, 'ufat');
}
// Switch to decrypt specific characters
function decrypt(text) {
    return text.replace(/enter/g, 'e')
    .replace(/imes/g, 'i')
    .replace(/ai/g, 'a')
    .replace(/ober/g, 'o')
    .replace(/ufat/g, 'u');
}
function validateAndNormalizeText(text) {
    // Check if the text input contains at least one uppercase character
    if (/[A-Z]/.test(text)) {
        // Display a message to the user or perform an action
        alert('Por favor, introduce el texto en minúsculas.');
        return null; // Returns null to indicate that the text is invalid
    }
    if (/[áéíóúüñÁÉÍÓÚÜÑ@#$%^&*()_+{}\[\]:;<>~\\\/\-]/.test(text)) {
        // Display a message to the user or perform an action
        alert('Por favor, evita usar letras con acentos o caracteres especiales.');
        return null; // Returns null to indicate that the text is invalid
    } else {
        // If there are no uppercase characters, normalize and return lowercase text
        return text.trim().toLowerCase();
    }
}
function copyTextResult() {
    // Get text area value
    const textToCopy = textResult.textContent.trim();
    // Check if text area is not empty
    if (textToCopy !== '' && textToCopy !== messages.start && textToCopy !== messages.errorEncrypt && textToCopy !== messages.errorDecrypt) {
        // Create a temp text element
        const tempElement = document.createElement('textarea');
        tempElement.value = textToCopy;
        // Add temp element to the document
        document.body.appendChild(tempElement);
        // Select and copy the contents of the temp element
        tempElement.select();
        document.execCommand('copy');
        // Delete temp element
        document.body.removeChild(tempElement);
        // Display visual confirmation
        alert('Texto copiado correctamente.');
    } else {
        // Show alert message if text area is empty
        alert('No hay texto por copiar.');
    }
}