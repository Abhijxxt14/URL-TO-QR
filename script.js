
        function generateQR() {
            const urlInput = document.getElementById('urlInput');
            const errorMessage = document.getElementById('errorMessage');
            const qrcodeContainer = document.getElementById('qrcode');
            
            // Get customization values
            const size = parseInt(document.getElementById('qr-size').value);
            const foreground = document.getElementById('qr-foreground').value;
            const background = document.getElementById('qr-background').value;
            const errorLevel = document.getElementById('qr-level').value;
            const dotStyle = document.getElementById('qr-dots').value;

            const url = urlInput.value.trim();
            if (!url) {
                errorMessage.textContent = 'Please enter a valid URL';
                return;
            }

            // Clear previous QR code and error
            qrcodeContainer.innerHTML = '';
            errorMessage.textContent = '';

            try {
                new URL(url);
            } catch (e) {
                errorMessage.textContent = 'Please enter a valid URL (including http:// or https://)';
                return;
            }

            // Remove any existing dot style classes
            qrcodeContainer.className = '';
            
            // Add new dot style class
            if (dotStyle !== 'square') {
                qrcodeContainer.classList.add(`qr-${dotStyle}`);
            }

            // Generate new QR code with custom options
            new QRCode(qrcodeContainer, {
                text: url,
                width: size,
                height: size,
                colorDark: foreground,
                colorLight: background,
                correctLevel: QRCode.CorrectLevel[errorLevel]
            });
        }

        // Add event listeners for real-time updates
        document.querySelectorAll('.option-group input, .option-group select').forEach(input => {
            input.addEventListener('change', () => {
                const urlInput = document.getElementById('urlInput');
                if (urlInput.value.trim()) {
                    generateQR();
                }
            });
        });

       
        document.addEventListener('DOMContentLoaded', function() {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = `
                #qrcode img {
                    transition: all 0.3s ease;
                }
                .qr-dots img {
                    border-radius: 50%;
                }
                .qr-rounded img {
                    border-radius: 4px;
                }
                .qr-extra-rounded img {
                    border-radius: 8px;
                }
                .qr-classy img {
                    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
                }
                .qr-classy-rounded img {
                    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
                }
            `;
            document.head.appendChild(styleSheet);
        });

       
        document.getElementById('urlInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateQR();
            }
        });
 