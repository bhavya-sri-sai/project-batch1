// Initialize SpeechSynthesisUtterance object
const msg = new SpeechSynthesisUtterance();

// Set text to be synthesized
msg.text = 'Hello, world! This is a test.';

// Choose the voice for speech synthesis
// Optionally, you can customize other properties of SpeechSynthesisUtterance like rate, pitch, etc.
msg.voice = speechSynthesis
  .getVoices()
  .find((voice) => voice.name === 'Google US English');

// Set up media recorder
let mediaRecorder;
let chunks = [];

// Start speech synthesis and recording
function startSynthesisAndRecording() {
  // Synthesize speech
  speechSynthesis.speak(msg);

  // Start recording synthesized speech
  mediaRecorder.start();
}

// Stop recording and save the audio file
function stopRecordingAndSave() {
  mediaRecorder.stop();
}

// Initialize media recorder
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then((stream) => {
    mediaRecorder = new MediaRecorder(stream);

    // Event handler when data is available
    mediaRecorder.ondataavailable = function (event) {
      chunks.push(event.data);
    };

    // Event handler when recording stops
    mediaRecorder.onstop = function () {
      // Convert recorded chunks into a single Blob
      const blob = new Blob(chunks, { type: 'audio/wav' });

      // Create a download link for the recording
      const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'speech.wav'; // Adjust the filename as needed
      // document.body.appendChild(a);
      // a.click();

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
    };
  })
  .catch((err) => {
    console.error('Error accessing media devices:', err);
  });

// Start synthesis and recording when button is clicked
document
  .getElementById('recordButton')
  .addEventListener('click', startSynthesisAndRecording);

// Stop recording and save audio file when button is clicked
document
  .getElementById('stopButton')
  .addEventListener('click', stopRecordingAndSave);
