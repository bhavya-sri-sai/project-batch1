// Initialize SpeechSynthesisUtterance object

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

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
    mediaRecorder.onstop = async function () {
      // Convert recorded chunks into a single Blob

      // const blob = new Blob(chunks, { type: 'audio/mp3' });
      const blob = new Blob(chunks, { type: 'audio/webm;codecs=opus' });

      // Create a download link for the recording
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `speech.webm`; // Adjust the filename as needed
      document.body.appendChild(a);
      a.click();

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

      convert(url);
      // Clear chunks for next recording
      chunks = [];
    };
  })
  .catch((err) => {
    console.error('Error accessing media devices:', err);
  });

async function convert(url2) {
  await ffmpeg.run('-i', url2, 'output.mp3');
  const data = ffmpeg.FS('readFile', 'output.mp3');
  const blob = new Blob([data.buffer], { type: 'audio/mp3' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'output.mp3';
  document.body.appendChild(a);
  a.click();
}

// Start synthesis and recording when button is clicked
document
  .getElementById('recordButton')
  .addEventListener('click', startSynthesisAndRecording);

// Stop recording and save audio file when button is clicked
document
  .getElementById('stopButton')
  .addEventListener('click', stopRecordingAndSave);
