const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');

console.log('ch1');
if (document.cookie != '' && document.cookie?.split('=')[1] != 'null') {
  console.log('ch');
  location.assign('/home1.html');
}

function swapPos() {
  loginForm.classList.toggle('above');
  loginForm.classList.toggle('below');
  signupForm.classList.toggle('above');
  signupForm.classList.toggle('below');
}

const login = document.querySelector('#login_form');
const signup = document.querySelector('#signup_form');

// login_btn.addEventListener('click', function () {
//   console.log('btn clicked');
// });
login.addEventListener('submit', async function (e) {
  e.preventDefault();
  console.log('event generated');
  const email = document.getElementById('email-address').value;
  const password = document.getElementById('create-pass').value;
  console.log(email, password);
  const res = await fetch('http://127.0.0.1:8800/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  // console.
  if (data.status === 'success') {
    document.cookie = `jwt=${data.token}`;
    // window.location('/home1.html');
    location.assign('/home1.html');
  }
});

signup.addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('user-email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-pass').value;
  console.log(email, password, name, confirmPassword);
  const res = await fetch('http://127.0.0.1:8800/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });
  const data = await res.json();
  console.log(data);
  if (data.status === 'success') {
    document.cookie = `jwt=${data.token}`;
    location.assign('/home1.html');
  }
});
