const speechBtn = document.querySelector('#convert_btn');
const text = document.querySelector('#text');

const voiceList = document.querySelector('select');
const isLoading = false;

const voices = [
  { name: 'Gregory', voiceGender: 'Male' },
  { name: 'Ivy', voiceGender: 'Female' },
  { name: 'Joanna', voiceGender: 'Female' },
  { name: 'Joey', voiceGender: 'Male' },
  { name: 'Justin', voiceGender: 'Male' },
  { name: 'Kendra', voiceGender: 'Female' },
  { name: 'Kevin', voiceGender: 'Male' },
  { name: 'Kimberly', voiceGender: 'Female' },
  { name: 'Matthew', voiceGender: 'Male' },
  { name: 'Ruth', voiceGender: 'Female' },
  { name: 'Salli', voiceGender: 'Female' },
];

function getVoices() {
  for (let voice of voices) {
    let option = `<option value="${voice.name}" data-gender="${voice.voiceGender}">${voice.name}</option>`;
    voiceList.insertAdjacentHTML('beforeend', option);
  }
}
getVoices();

const func = async () => {
  if (document.querySelector('#download')) {
    document.querySelector('#download').remove();
  }
  console.log(voiceList.value);
  const url =
    'https://ai-powered-text-to-speech1.p.rapidapi.com/synthesize-speech';
  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': 'de599b0feamsh343b5cc5d9e4ab7p15a996jsn8b5b208d7889',
      'x-rapidapi-host': 'ai-powered-text-to-speech1.p.rapidapi.com',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sentence: text.value,
      language: 'en-US',
      voice: voiceList.value,
      engine: 'neural',
      withSpeechMarks: false,
      voiceGender:
        voiceList.options[voiceList.selectedIndex].getAttribute('data-gender'),
    }),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    speechBtn.textContent = 'Convert to Speech';
    const aud = new Audio();
    aud.src = result.fileDownloadUrl;
    aud.play();
    speechBtn.insertAdjacentHTML(
      'afterend',
      `<button id="download"><a style="text-decoration:none;color:#fff"  href="${result.fileDownloadUrl}">Download Audio</a></button>`
    );
  } catch (error) {
    console.error(error);
  }
};

speechBtn.addEventListener('click', (e) => {
  speechBtn.textContent = 'Loading...';
  e.preventDefault();
  console.log(
    voiceList.options[voiceList.selectedIndex].getAttribute('data-gender')
  );
  func();
});