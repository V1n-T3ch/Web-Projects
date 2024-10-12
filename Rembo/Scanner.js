const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const webcamBtn = document.getElementById('webcam-btn');
const webcamContainer = document.getElementById('webcam-container');
const video = document.getElementById('video');
const captureBtn = document.getElementById('capture-btn');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragover');
  handleFiles(event.dataTransfer.files);
});

dropZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
  handleFiles(fileInput.files);
});

webcamBtn.addEventListener('click', async () => {
  webcamBtn.style.display = 'none';
  webcamContainer.style.display = 'flex';
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (error) {
    console.error('Error accessing webcam:', error);
  }
});

captureBtn.addEventListener('click', () => {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  canvas.toBlob((blob) => {
    handleFiles([new File([blob], 'webcam-photo.png', { type: 'image/png' })]);
  });
});

function handleFiles(files) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files[]', file);
  }

  // Example of sending the files to a server
  // fetch('/upload', {
  //   method: 'POST',
  //   body: formData,
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error(error));

  console.log('Files uploaded:', files);
}