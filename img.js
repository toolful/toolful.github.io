    const fileInput = document.getElementById('file-input');
    const previewBox = document.getElementById('preview-box');
    const mainOutput = document.getElementById('main-output');
    const ocrContainer = document.getElementById('ocr-container');
    const ocrTextArea = document.getElementById('ocr-text-area');
    const statusBar = document.getElementById('status-bar');
    
    let loadedFiles = [];

    fileInput.onchange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        
        loadedFiles = [...loadedFiles, ...files];
        mainOutput.style.display = 'block';
        updatePreviews();
        statusBar.innerText = `${loadedFiles.length} file(s) ready for conversion.`;
    };

    function updatePreviews() {
        previewBox.innerHTML = '';
        loadedFiles.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'img-thumb';
                previewBox.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    async function convert(type) {
        if (loadedFiles.length === 0) return alert('Select images first!');
        
        statusBar.innerText = "Processing... Please wait.";
        ocrContainer.style.display = 'none';

        if (type === 'jpg' || type === 'png') {
            loadedFiles.forEach(file => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const format = type === 'jpg' ? 'image/jpeg' : 'image/png';
                    const dataUrl = canvas.toDataURL(format, 0.9);
                    const link = document.createElement('a');
                    link.download = `toolful-${Date.now()}.${type}`;
                    link.href = dataUrl;
                    link.click();
                };
                img.src = URL.createObjectURL(file);
            });
        } 
        
        else if (type === 'pdf') {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();
            for (let i = 0; i < loadedFiles.length; i++) {
                const dataUrl = await toBase64(loadedFiles[i]);
                const img = new Image();
                img.src = dataUrl;
                await new Promise(res => img.onload = res);
                
                const width = pdf.internal.pageSize.getWidth();
                const height = (img.height * width) / img.width;
                if (i > 0) pdf.addPage();
                pdf.addImage(dataUrl, 'JPEG', 0, 0, width, height);
            }
            pdf.save('images-converted.pdf');
        }

        else if (type === 'ocr') {
            ocrContainer.style.display = 'block';
            ocrTextArea.value = "Scanning images for text...";
            let fullText = "";
            for (const file of loadedFiles) {
                const result = await Tesseract.recognize(file, 'eng');
                fullText += `--- File: ${file.name} ---\n${result.data.text}\n\n`;
            }
            ocrTextArea.value = fullText.trim();
        }

        else if (type === 'docx') {
            if (!ocrTextArea.value || ocrTextArea.value.startsWith("Scanning")) {
                alert("Please run OCR first to extract text for Word conversion!");
            } else {
                const doc = new docx.Document({
                    sections: [{ children: [new docx.Paragraph(ocrTextArea.value)] }]
                });
                const blob = await docx.Packer.toBlob(doc);
                saveAs(blob, "converted-text.docx");
            }
        }
        
        statusBar.innerText = "Done!";
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    function copyText() {
        ocrTextArea.select();
        document.execCommand('copy');
        alert('Image to text copy successful!');
    }

    function downloadTxt() {
        const blob = new Blob([ocrTextArea.value], {type: "text/plain"});
        saveAs(blob, "extracted-text.txt");
    }

    // Drag & Drop
    const dz = document.getElementById('drop-zone');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eName => {
        dz.addEventListener(eName, (e) => { e.preventDefault(); e.stopPropagation(); });
    });
    dz.addEventListener('drop', (e) => {
        fileInput.onchange({ target: { files: e.dataTransfer.files } });
    });