let fileInput = document.getElementById('file-input');
let fileList = document.getElementById('files-list');
let numOfFiles = document.getElementById('num-of-files');
const convert_btn = document.getElementById('convert_btn');
const myTextArea = document.getElementById('myTextArea');
const lngSelector=document.querySelector('#languageSelect');
const rdBtns= document.querySelectorAll('.rdBtn');

rdBtns.forEach((el)=> el.addEventListener('click',(e)=>{
  rdBtns.forEach((ele)=> {ele.checked=false

  });
  if(e.target== el){
    e.target.checked=true;
  }
}))


fileInput.addEventListener('change', (e) => {
  e.preventDefault();
  fileList.innerHTML = '';
  numOfFiles.textContent = `${fileInput.files.length} Files Selected`;

  for (i of fileInput.files) {
    let reader = new FileReader();
    let listItem = document.createElement('li');
    let fileName = i.name;
    let fileSize = (i.size / 1024).toFixed(1);
    listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}KB</p>`;
    if (fileSize >= 1024) {
      fileSize = (fileSize / 1024).toFixed(1);
      listItem.innerHTML = `<p>${fileName}</p><p>${fileSize}MB</p>`;
    }
    fileList.appendChild(listItem);
  }
});
convert_btn.addEventListener('click', async (e) => {
  e.preventDefault();
  summarize = document.querySelector(
    'input[type="checkbox"][name="summarize"]:checked'
  )?.value;
  keywords = document.querySelector(
    'input[type="checkbox"][name="keywords"]:checked'
  )?.value;
  console.log(summarize, keywords);
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('audioFile', file);
    formData.append(
      'jsonData',
      JSON.stringify({
        Summarize: summarize ? 1 : 0,
        Keywords: keywords ? 1 : 0,
      })
    );

    document.querySelector('body').classList.add('loading');
    convert_btn.textContent = 'Converting....';
    try {
      const res = await fetch('http://localhost:5501/save_audio', {
        method: 'POST',
        body: formData,
        // headers: {
        //   'Content-Type': 'application/json',
        // },
      });

      const data = await res.json();
      console.log('testing:',lngSelector.value);
      console.log('after fetch', data);
      

      if(languageSelect.value=="en"){
      myTextArea.textContent = data.text;}
        else{
          console.log('callingfora api');
          console.log(data.text,lngSelector.value)
          const url = 'https://google-translator9.p.rapidapi.com/v2';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': 'de599b0feamsh343b5cc5d9e4ab7p15a996jsn8b5b208d7889',
		'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		q: data.text,
		source: 'en',
		target: lngSelector.value,
		format: 'text'
	})
};
const response = await fetch(url, options);
	const result = await response.json();
	console.log(result.data.translations[0].translatedText);
  myTextArea.textContent=result.data.translations[0].translatedText;
        }
    } catch (error) {
      document.querySelector('body').classList.remove('loading');
      convert_btn.textContent = 'Convert';
    } finally {
      document.querySelector('body').classList.remove('loading');
      convert_btn.textContent = 'Convert';
    }
  }
});

const test = async () => {
  console.log('fetching');
  const res = await fetch('http://localhost:5501/api/send-message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: 'Hello from JavaScript!' }),
  });
  const data = await res.json();
  console.log(data);
};

// test();
