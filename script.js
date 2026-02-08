
document.addEventListener("DOMContentLoaded", () => {

    // Tools added via JS (NON-CRITICAL for SEO)
    const dynamicTools = [
      {
            name: "Free Qr Code Generator",
            description: "Free Qr Code For business.",
            link: "qrcode.html",
            status: "Live"
        },
    const toolGrid = document.getElementById("toolGrid");

    dynamicTools.forEach(tool => {
        const card = document.createElement("article");
        card.className = "card";

        card.innerHTML = `
            <span class="status">${tool.status}</span>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.link}" class="btn-link">Launch Tool</a>
        `;

        toolGrid.appendChild(card);
    });

});


// qr js

    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        data: "https://google.com",
        margin: 10,
        dotsOptions: { color: "#6366f1", type: "square" },
        cornersSquareOptions: { color: "#4f46e5", type: "square" },
        backgroundOptions: { color: "#ffffff" },
        imageOptions: { crossOrigin: "anonymous", margin: 10, imageSize: 0.4 },
        qrOptions: { errorCorrectionLevel: 'Q' }
    });

    qrCode.append(document.getElementById("canvas"));

    // Event Listeners for all controls
    const update = () => {
        qrCode.update({
            data: document.getElementById("qr-data").value,
            dotsOptions: { 
                color: document.getElementById("dots-color").value, 
                type: document.getElementById("dots-style").value 
            },
            cornersSquareOptions: { 
                color: document.getElementById("corner-color").value,
                type: document.getElementById("corner-style").value 
            },
            backgroundOptions: { color: document.getElementById("bg-color").value },
            qrOptions: { errorCorrectionLevel: document.getElementById("error-level").value }
        });
    };

    ["qr-data", "dots-style", "dots-color", "corner-style", "corner-color", "bg-color", "error-level"].forEach(id => {
        document.getElementById(id).addEventListener("input", update);
    });

    document.getElementById("logo-file").addEventListener("change", (e) => {
        const reader = new FileReader();
        reader.onload = () => qrCode.update({ image: reader.result });
        reader.readAsDataURL(e.target.files[0]);
    });

    function downloadQR() {
        const extension = document.getElementById("ext").value;
        qrCode.download({ name: "pro-designer-qr", extension: extension });
    }

    function toggleGuide() {
        const g = document.getElementById("guide");
        g.style.display = g.style.display === "none" ? "block" : "none";
    }


// end qr js


// cv js

// State Management
let cvData = JSON.parse(localStorage.getItem('cv_data')) || {
    fullName: '', jobTitle: '', email: '', phone: '', location: '', website: '',
    summary: '', experience: [], education: [], skills: []
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadDataIntoForm();
    updatePreview();
    setupEventListeners();
});

function setupEventListeners() {
    // Real-time Sync
    document.getElementById('cv-form').addEventListener('input', (e) => {
        const { name, value } = e.target;
        if (!name) return;
        
        cvData[name] = value;
        updatePreview();
        saveData();
    });

    // Theme Toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Export PDF
    document.getElementById('export-pdf').addEventListener('click', () => {
        window.print();
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn, .tab-content').forEach(el => el.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });

    // ATS Matcher Logic
    document.getElementById('job-description').addEventListener('input', analyzeATS);
}

function updatePreview() {
    document.getElementById('p-name').textContent = cvData.fullName || 'Your Name';
    document.getElementById('p-title').textContent = cvData.jobTitle || 'Professional Title';
    document.getElementById('p-email').textContent = cvData.email;
    document.getElementById('p-summary').textContent = cvData.summary;
    
    // Character Counter
    const count = cvData.summary.length;
    document.querySelector('.char-count').textContent = `${count}/500`;
    
    updateProgress();
}

function addItem(type) {
    const container = document.getElementById(`${type}-list`);
    const id = Date.now();
    const itemHtml = `
        <div class="list-item" id="item-${id}">
            <input type="text" placeholder="Entry Title" oninput="updateItem('${type}', ${id}, 'title', this.value)">
            <textarea placeholder="Description" oninput="updateItem('${type}', ${id}, 'desc', this.value)"></textarea>
            <button type="button" onclick="removeItem('${type}', ${id})">Delete</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', itemHtml);
    cvData[type].push({ id, title: '', desc: '' });
}

function updateItem(type, id, field, value) {
    const item = cvData[type].find(i => i.id === id);
    if (item) {
        item[field] = value;
        renderComplexSections();
        saveData();
    }
}

function renderComplexSections() {
    const expPreview = document.getElementById('p-experience');
    expPreview.innerHTML = cvData.experience.map(exp => `
        <div class="preview-item">
            <strong>${exp.title}</strong>
            <p>${exp.desc}</p>
        </div>
    `).join('');
}

function analyzeATS() {
    const jd = document.getElementById('job-description').value.toLowerCase();
    const resumeText = JSON.stringify(cvData).toLowerCase();
    const keywords = jd.split(/\W+/).filter(word => word.length > 4);
    
    let matches = 0;
    keywords.forEach(word => {
        if (resumeText.includes(word)) matches++;
    });

    const score = keywords.length > 0 ? Math.round((matches / keywords.length) * 100) : 0;
    document.querySelector('.score-circle').textContent = `${score}%`;
    document.getElementById('ats-feedback').textContent = score > 70 ? "High Match!" : "Add more keywords from the job description.";
}

function updateProgress() {
    let filled = 0;
    const fields = ['fullName', 'email', 'summary'];
    fields.forEach(f => { if(cvData[f]) filled++; });
    const percent = Math.round((filled / fields.length) * 100);
    document.getElementById('profile-progress').style.width = `${percent}%`;
}

function saveData() {
    localStorage.setItem('cv_data', JSON.stringify(cvData));
}

function loadDataIntoForm() {
    Object.keys(cvData).forEach(key => {
        const input = document.querySelector(`[name="${key}"]`);
        if (input) input.value = cvData[key];
    });
}

//END JS
