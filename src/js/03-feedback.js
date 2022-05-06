import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const textareaEl = document.querySelector('.feedback-form  textarea');
const inputEl = document.querySelector('input');

const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();
let formData = {};
/* - Останавливаем поведение по умолчанию
 * - Убираем сообщение из хранилища
 * - Очищаем форму*/
function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}
/* - Получаем значение поля
 * - Сохраняем его в хранилище
 * - Можно добавить throttle*/
function onTextareaInput(evt) {
  formData[evt.target.name] = evt.target.value;
  const saveDataEl = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, saveDataEl);
  //console.log(saveDataEl)
}
/* - Получаем значение из хранилища
 * - Если там что-то было, обновляем DOM*/
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    const pasrsedSav = JSON.parse(savedMessage);
    let formData = {};
    formData = pasrsedSav;
    textareaEl.value = pasrsedSav.message;
    inputEl.value = pasrsedSav.email;
    console.log(pasrsedSav);
  }
}
