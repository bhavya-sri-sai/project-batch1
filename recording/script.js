// Create an AudioContext
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Generate or manipulate audio using the Web Audio API
const oscillator = audioContext.createOscillator();
oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
oscillator.type = 'sine'; // sine wave
oscillator.start();

// Connect the audio output to a MediaStreamDestination
const mediaStreamDestination = audioContext.createMediaStreamDestination();
oscillator.connect(mediaStreamDestination);

// Start recording the audio from the MediaStreamDestination
const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
const chunks = [];
mediaRecorder.ondataavailable = function (event) {
  chunks.push(event.data);
};
const ch = document.querySelector('#recordingsList');
const recordButton = document.querySelector('#recordButton');
const stopButton = document.querySelector('#stopButton');

mediaRecorder.onstop = function () {
  const blob = new Blob(chunks, { type: 'audio/wav' });
  const audioURL = URL.createObjectURL(blob);
  const audioElement = new Audio(audioURL);
  audioElement.controls = true;
  ch.appendChild(audioElement);
};
mediaRecorder.start();

// Stop recording after 5 seconds
setTimeout(function () {
  mediaRecorder.stop();
}, 5000);
