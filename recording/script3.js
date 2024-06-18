// THIS IS WORKING FOR MICROPHONE AS RECORDEE

// Initialize variables
let mediaRecorder;
let chunks = [];

// Constraints for the media stream (audio only)
const constraints = {
  audio: true,
  video: false,
};

// Start recording function
function startRecording() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      // Create a new MediaRecorder instance
      mediaRecorder = new MediaRecorder(stream);

      // Event handler when data is available
      mediaRecorder.ondataavailable = function (event) {
        console.log(event);
        chunks.push(event.data);
        saveRecording();
      };

      // Start recording
      mediaRecorder.start();
      console.log('Recording started');
    })
    .catch(function (err) {
      console.error('Error accessing media devices:', err);
    });
}

// Stop recording function
function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    console.log('Recording stopped');
  }
}

// Save recording function
async function saveRecording() {
  console.log(chunks);
  console.log('length', chunks.length);
  if (chunks.length === 0) {
    console.error('No data to save');
    return;
  }

  // Convert recorded chunks into a single Blob
  const blob = new Blob(chunks, { type: chunks[0].type });

  // Create a download link for the recording
  const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'recording.wav';
  //   document.body.appendChild(a);
  //   a.click();
  const au = document.createElement('audio');
  var li = document.createElement('li');
  var link = document.createElement('a');
  const list = document.querySelector('#recordingsList');

  au.controls = true;
  au.src = URL.createObjectURL(blob);
  link.href = url;
  link.download = new Date().toISOString() + '.wav';
  link.innerHTML = link.download;
  li.appendChild(au);
  li.appendChild(link);
  list.appendChild(li);
  // Clear chunks for next recording
  chunks = [];
}

// Start/Stop recording buttons
const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
// const saveButton = document.getElementById('saveButton');

recordButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);
// saveButton.addEventListener('click', saveRecording);
