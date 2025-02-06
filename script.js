
function generateQR() {
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById('errorMessage');
    const qrcodeContainer = document.getElementById('qrcode');
    

    const size = parseInt(document.getElementById('qr-size').value);
    const foreground = document.getElementById('qr-foreground').value;
    const errorLevel = document.getElementById('qr-level').value;
    const dotStyle = document.getElementById('qr-dots').value;

    const url = urlInput.value.trim();
    if (!url) {
        errorMessage.textContent = 'Please enter a valid URL';
        return;
    }

  
    qrcodeContainer.innerHTML = '';
    errorMessage.textContent = '';

    try {
        new URL(url);
    } catch (e) {
        errorMessage.textContent = 'Please enter a valid URL (including http:// or https://)';
        return;
    }

  
    qrcodeContainer.className = '';
 
    if (dotStyle !== 'square') {
        qrcodeContainer.classList.add(`qr-${dotStyle}`);
    }

    
    new QRCode(qrcodeContainer, {
        text: url,
        width: size,
        height: size,
        colorDark: foreground,
        colorLight: "#ffffff",  
        correctLevel: QRCode.CorrectLevel[errorLevel]
    });
}
