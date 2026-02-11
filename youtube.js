// ================= BANNER TOOL =================

const dropZone = document.getElementById('dropZone');
const upload = document.getElementById('upload');
const convertBanner = document.getElementById('convertBanner');

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
  dropZone.style.background = "#eee";
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.background = "";
});

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  upload.files = e.dataTransfer.files;
});

convertBanner.addEventListener('click', processImage);

function processImage() {
  const format = document.getElementById('format').value;
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const file = upload.files[0];

  if (!file) {
    alert("Upload an image first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {

      canvas.width = 2048;
      canvas.height = 1152;

      const scale = Math.max(2048 / img.width, 1152 / img.height);
      const x = (2048 - img.width * scale) / 2;
      const y = (1152 - img.height * scale) / 2;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, 2048, 1152);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      let quality = 0.9;
      let dataUrl = canvas.toDataURL(format, quality);

      while (dataUrl.length / 1024 / 1024 > 6 && quality > 0.1) {
        quality -= 0.05;
        dataUrl = canvas.toDataURL(format, quality);
      }

      document.getElementById('downloadLink').href = dataUrl;
      document.getElementById('downloadLink').style.display = "inline";
      document.getElementById('fileSize').innerText =
        "Final File Size: " + (dataUrl.length / 1024 / 1024).toFixed(2) + " MB";
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}

// ================= PROFILE TOOL =================

const profileDrop = document.getElementById('profileDrop');
const profileUpload = document.getElementById('profileUpload');
const convertProfile = document.getElementById('convertProfile');

profileDrop.addEventListener('dragover', e => {
  e.preventDefault();
  profileDrop.style.background = "#eee";
});

profileDrop.addEventListener('dragleave', () => {
  profileDrop.style.background = "";
});

profileDrop.addEventListener('drop', e => {
  e.preventDefault();
  profileUpload.files = e.dataTransfer.files;
});

convertProfile.addEventListener('click', processProfile);

function processProfile() {
  const format = document.getElementById('profileFormat').value;
  const canvas = document.getElementById('profileCanvas');
  const ctx = canvas.getContext('2d');
  const file = profileUpload.files[0];

  if (!file) {
    alert("Upload a profile image first.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {

      canvas.width = 98;
      canvas.height = 98;

      const scale = Math.max(98 / img.width, 98 / img.height);
      const x = (98 - img.width * scale) / 2;
      const y = (98 - img.height * scale) / 2;

      ctx.clearRect(0, 0, 98, 98);
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      let quality = 0.9;
      let dataUrl = canvas.toDataURL(format, quality);

      while (dataUrl.length / 1024 / 1024 > 4 && quality > 0.1) {
        quality -= 0.05;
        dataUrl = canvas.toDataURL(format, quality);
      }

      document.getElementById('profileDownload').href = dataUrl;
      document.getElementById('profileDownload').style.display = "inline";
      document.getElementById('profileSize').innerText =
        "Final File Size: " + (dataUrl.length / 1024 / 1024).toFixed(2) + " MB";
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
}
