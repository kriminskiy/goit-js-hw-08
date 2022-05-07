import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const emailEl = document.querySelector('[name="email"]');
const messageEl = document.querySelector('[name="message"]');

const KEY = 'feedback-form-state';

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

let formData = {
  email: '',
  message: '',
};

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(KEY, JSON.stringify(formData));
}

function onPageReload() {
  const savedData = JSON.parse(localStorage.getItem(KEY));

  if (savedData) {
    emailEl.value = savedData.email;
    messageEl.value = savedData.message;

    formData.email = savedData.email;
    formData.message = savedData.message;
  }
}
onPageReload();

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.removeItem(KEY);
  evt.currentTarget.reset();
  console.log(formData);

  formData.email = '';
  formData.message = '';
}
