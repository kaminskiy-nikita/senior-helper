const synth = window.speechSynthesis;

const registerForm = document.querySelector('#register_form');
const btns = document.querySelectorAll('.linkMain');

btns.forEach((btn) => {
  btn.onmouseover = function handler(event) {
    const strFromBtn = event.target.childNodes[0].data;

    const message = new SpeechSynthesisUtterance(strFromBtn);
    message.onstart = function () {
      console.log('start');
    };
    message.onerror = function (event) {
      console.error('SpeechSynthesisUtterance.onerror');
    };
    message.onend = function () {
      console.log('end');
    };
    message.text = strFromBtn;
    synth.speak(message);
  };
});

if (registerForm) {
  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      password, email, username, action, method, confirmPassword,
    } = event.target;

    if (password.value !== confirmPassword.value) {
      alert('Пароли не совпадают!');
      window.location.href = action;
    }

    let grandmotherEmail;

    if (event.target.grandmotherEmail) {
      grandmotherEmail = event.target.grandmotherEmail.value;
    }

    const response = await fetch(action, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        email: email.value,
        grandmotherEmail,
      }),
    });

    const jsonData = await response.json();

    if (jsonData.registrated) {
      window.location.href = '/profile';
    } else if (!jsonData.grandmotherEmail) {
      const answer = prompt('Такой бабушки нет! Хотите зарегистрировать свою бабушку?');
      if (answer.toLowerCase().trim() === 'да') {
        window.location.href = '/grandmother/registration';
      } else {
        alert('Ответ неправильный...');
        window.location.href = '/grandmother/registration';
      }
    }
  });
}

const loginForm = document.querySelector('#login_form');

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const {
      password, email, action, method,
    } = event.target;

    const response = await fetch(action, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        password: password.value,
        email: email.value,
      }),
    });

    const jsonData = await response.json();

    if (jsonData.login) {
      window.location.href = '/profile';
    }
  });
}

const recognizeBtns = document.querySelectorAll('.recognize');
const loader = document.querySelector('.loader');
if (recognizeBtns) {
  recognizeBtns.forEach((recognizeBtn) => {
    recognizeBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      loader.style.display = 'block';
      const { imagePath } = event.target.dataset;

      const response = await fetch('/recognize', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          imagePath,
        }),
      });
      const textData = await response.json();
      loader.style.display = 'none';

      const { text } = textData;
      console.log(text);
      // let playThis =  new SpeechSynthesisUtterance(text);
      // synth.speak(playThis);
      const message = new SpeechSynthesisUtterance(text);
      console.log(message);
      message.onstart = function () {
        console.log('start');
      };
      message.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      };
      message.onend = function () {
        console.log('end');
      };
      message.text = text;
      synth.speak(message);
    });
  });
}

const deleteImgs = document.querySelectorAll('.delete-img');

if (deleteImgs) {
  deleteImgs.forEach((deleteImg) => {
    deleteImg.addEventListener('click', async (event) => {
      event.preventDefault();
      const imgId = event.target.dataset.imageId;
      const imgPath = event.target.dataset.imagePath;

      const response = await fetch('/profile', {
        method: 'DELETE',

        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          imgId,
          imgPath,
        }),
      });

      const jsonData = await response.json();
      if (jsonData.isDeleted) {
        window.location.href = '/profile';
      }
    });
  });
}
