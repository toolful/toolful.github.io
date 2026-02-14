let cvData=JSON.parse(localStorage.getItem('cv_data'))||{fullName:'',jobTitle:'',email:'',phone:'',location:'',website:'',summary:'',experience:[],education:[],skills:[]};

document.addEventListener('DOMContentLoaded',()=>{
    loadDataIntoForm();
    renderComplexSections();
    updatePreview();
    setupEventListeners();
});

function setupEventListeners(){
    document.getElementById('cv-form').addEventListener('input',e=>{
        const{name,value}=e.target;if(!name)return;
        cvData[name]=value;updatePreview();saveData();
    });

    document.getElementById('theme-toggle').addEventListener('click',()=>{document.body.classList.toggle('dark-mode')});
    document.getElementById('export-pdf').addEventListener('click',()=>{window.print()});
    document.querySelectorAll('.tab-btn').forEach(btn=>{
        btn.addEventListener('click',()=>{
            document.querySelectorAll('.tab-btn,.tab-content').forEach(el=>el.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        })
    });

    document.getElementById('job-description').addEventListener('input',analyzeATS);
    document.getElementById('font-select').addEventListener('change',e=>{document.getElementById('resume-preview').style.fontFamily=e.target.value});
    document.getElementById('accent-color').addEventListener('input',e=>{
        document.documentElement.style.setProperty('--primary',e.target.value);
    });

    document.getElementById('sample-data-btn').addEventListener('click',()=>{
        cvData={
            fullName:"John Doe",jobTitle:"Senior Developer",email:"john@example.com",phone:"+1234567890",
            location:"New York, USA",website:"https://portfolio.example.com",summary:"Experienced developer with expertise in web apps.",
            experience:[{id:1,title:"Software Engineer at XYZ",desc:"Built React & Node apps."}],
            education:[{id:2,title:"BSc Computer Science",desc:"University of Example"}],
            skills:[{id:3,title:"JavaScript",desc:""},{id:4,title:"React",desc:""}]
        };
        loadDataIntoForm();renderComplexSections();updatePreview();saveData();
    });
}

function addItem(type){
    const container=document.getElementById(`${type}-list`);
    const id=Date.now();
    const itemHtml=`<div class="list-item" id="item-${id}">
        <input type="text" placeholder="Entry Title" oninput="updateItem('${type}',${id},'title',this.value)">
        <textarea placeholder="Description" oninput="updateItem('${type}',${id},'desc',this.value)"></textarea>
        <button type="button" onclick="removeItem('${type}',${id})">Delete</button>
    </div>`;
    container.insertAdjacentHTML('beforeend',itemHtml);
    cvData[type].push({id,title:'',desc:''});
}

function updateItem(type,id,field,value){
    const item=cvData[type].find(i=>i.id===id);
    if(item){item[field]=value;renderComplexSections();saveData();}
}

function removeItem(type,id){
    cvData[type]=cvData[type].filter(i=>i.id!==id);
    document.getElementById(`${type}-list`).querySelector(`#item-${id}`).remove();
    renderComplexSections();saveData();
}

function renderComplexSections(){
    document.getElementById('p-experience').innerHTML=cvData.experience.map(exp=>`<div class="preview-item"><strong>${exp.title}</strong><p>${exp.desc}</p></div>`).join('');
    document.getElementById('p-education').innerHTML=cvData.education.map(edu=>`<div class="preview-item"><strong>${edu.title}</strong><p>${edu.desc}</p></div>`).join('');
    document.getElementById('p-skills').innerHTML=cvData.skills.map(skill=>`<span class="skill-badge">${skill.title}</span>`).join('');
}

function updatePreview(){
    document.getElementById('p-name').textContent=cvData.fullName||'Your Name';
    document.getElementById('p-title').textContent=cvData.jobTitle||'Professional Title';
    document.getElementById('p-email').textContent=cvData.email;
    document.getElementById('p-phone').textContent=cvData.phone;
    document.getElementById('p-location').textContent=cvData.location;
    document.getElementById('p-summary').textContent=cvData.summary;
    document.querySelector('.char-count').textContent=`${cvData.summary.length}/500`;

    let filled=0;['fullName','email','summary'].forEach(f=>{if(cvData[f])filled++;});
    document.getElementById('profile-progress').style.width=`${Math.round(filled/3*100)}%`;
}

function analyzeATS(){
    const jd=document.getElementById('job-description').value.toLowerCase();
    const resumeText=JSON.stringify(cvData).toLowerCase();
    const keywords=jd.split(/\W+/).filter(w=>w.length>4);
    let matches=0;keywords.forEach(word=>{if(resumeText.includes(word))matches++});
    const score=keywords.length>0?Math.round(matches/keywords.length*100):0;
    document.querySelector('.score-circle').textContent=`${score}%`;
    document.getElementById('ats-feedback').textContent=score>70?"High Match!":"Add more keywords from the job description.";
}

function saveData(){localStorage.setItem('cv_data',JSON.stringify(cvData));}
function loadDataIntoForm(){Object.keys(cvData).forEach(k=>{const input=document.querySelector(`[name="${k}"]`);if(input)input.value=cvData[k]})}

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================
     WELCOME POPUP (ONLY WORKS IF EXISTS)
  ========================================== */

  const popup = document.getElementById("welcomePopup");
  const startBtn = document.getElementById("startBtn");
  const nameInput = document.getElementById("userNameInput");

  const savedName = localStorage.getItem("toolfulUserName");

  // Hide popup if name already saved
  if (popup && savedName) {
    popup.style.display = "none";
  }

  // Save name when button clicked
  if (popup && startBtn && nameInput) {
    startBtn.addEventListener("click", function () {
      const name = nameInput.value.trim();

      if (!name) {
        alert("Please enter your name.");
        return;
      }

      localStorage.setItem("toolfulUserName", name);
      popup.style.display = "none";
    });
  }


  /* =========================================
     LIVE NOTIFICATION SYSTEM (ALL PAGES)
  ========================================== */

  const randomNames = [
    "Ali", "John", "Emma", "Sophia", "Daniel",
    "Arslan", "Olivia", "Noah", "James", "Ava",
    "Lucas", "Isabella", "Ethan", "Mia", "Henry",
    "Zain", "Amelia", "Benjamin", "Hassan", "David"
  ];

  const countries = [
    "United States", "United Kingdom", "Canada",
    "Germany", "France", "India", "Australia",
    "Pakistan", "Brazil", "UAE", "Turkey", "Italy"
  ];

  function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 🔊 Soft Notification Sound
  function playNotificationSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {}
  }

  function createNotification() {

    // Prevent multiple at same time
    if (document.querySelector(".live-notification")) return;

    const currentUser = localStorage.getItem("toolfulUserName");
    const name = currentUser || getRandom(randomNames);
    const country = getRandom(countries);

    const notification = document.createElement("div");
    notification.className = "live-notification";

    notification.innerHTML = `
      <div class="live-dot"></div>
      <div class="live-text">
        <strong>${name}</strong> from <strong>${country}</strong><br>
        is using this tool right now
      </div>
      <span class="close-btn">&times;</span>
    `;

    document.body.appendChild(notification);

    playNotificationSound();

    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    const autoRemove = setTimeout(() => {
      removeNotification(notification);
    }, 6000);

    notification.querySelector(".close-btn").addEventListener("click", () => {
      clearTimeout(autoRemove);
      removeNotification(notification);
    });
  }

  function removeNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 400);
  }

  // First notification after 10 seconds
  setTimeout(() => {
    createNotification();
    startRandomInterval();
  }, 10000);

  // Random interval between 1 – 1.5 minutes
  function startRandomInterval() {
    const randomDelay = Math.floor(Math.random() * 30000) + 60000;

    setTimeout(() => {
      createNotification();
      startRandomInterval();
    }, randomDelay);
  }

});

