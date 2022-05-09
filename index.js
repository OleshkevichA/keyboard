import {keyboardEng} from '../modules/letterEng.js'
import {keyboardRus} from '../modules/letterRus.js'

let div = document.createElement('div');
let textarea = document.createElement('textarea');
let legend = document.createElement('div');
div.classList.add('keyboard');
textarea.classList.add('textarea');
legend.classList.add('legend');
document.body.append(textarea);
document.body.append(div);
document.body.append(legend);
//textarea.setAttribute('readonly', true);



let language = '';
window.addEventListener('load', getLocalStorage);
let caps = false;
legend.textContent = 'Переключение языка LeftShift + LeftAlt';
window.addEventListener('beforeunload', setLocalStorage);


function init(lang){
  let out = "";
  if (lang == 'eng'){
    for (let i = 0; i < keyboardEng.length; i++){
     if (i < 13 || i == 27){
     out += `<div class="btn ${keyboardEng[i].code}"><span>${keyboardEng[i].key[1]}</span>${keyboardEng[i].key[0]}</div>`; 
     }
     else if (i > 13 && i < 25 || i > 27 && i < 39 || i > 43 && i < 51){
      out += `<div class="btn ${keyboardEng[i].code}">${keyboardEng[i].key[1]}</div>`;   
      }
      else
      out += `<div class="btn ${keyboardEng[i].code}">${keyboardEng[i].key[0]}</div>`;
    }
  }
  else if (lang == 'rus'){
    for (let i = 0; i < keyboardRus.length; i++){
      if (i == 0){
        out += `<div class="btn ${keyboardRus[i].code}"><span>${keyboardRus[i].key[0]}</span>${keyboardRus[i].key[1]}</div>`;
      }
      else if (i < 13 || i == 27 || i == 53){
      out += `<div class="btn ${keyboardRus[i].code}"><span>${keyboardRus[i].key[1]}</span>${keyboardRus[i].key[0]}</div>`; 
      }
      else if (i > 13 && i < 27 || i > 27 && i < 41 || i > 43 && i < 53){
       out += `<div class="btn ${keyboardRus[i].code}">${keyboardRus[i].key[1]}</div>`;   
       }
       else
       out += `<div class="btn ${keyboardRus[i].code}">${keyboardRus[i].key[0]}</div>`;
     }
  }
  document.querySelector('.keyboard').innerHTML = out; 
}


function getLocalStorage() {
    let lang = localStorage.getItem('language');
    if (lang == '' || lang == 'eng'){
      init('eng');
      language = 'eng'
    }
    else {
      init(lang);
      language = 'rus';
    }
}

function setLocalStorage(){
  localStorage.setItem('language', language);
}

document.onkeydown = function(event) {
  for (let i = 0; i < keyboardEng.length; i++){
    if (keyboardEng[i].code == event.code){
      document.querySelectorAll('.btn').forEach(elem => {
      elem.classList.remove('active');
      });
      document.querySelector(`.${event.code}`).classList.add('active');
      event.preventDefault();
      addText(event.code);

      if (event.code == 'CapsLock'){
        caps = (!caps);
      }
      setTimeout(() => {
        document.querySelector(`.${event.code}`).classList.remove('active')
      }, 500)
    }
  }
        
}

function addText(code){
  if (language == 'eng' && code != 'Tab' && code != 'Delete' && code != 'ControlLeft' && code != 'ControlRight' && code != 'AltRight' && code != 'AltLeft' && code != 'Win' && code != 'Backspace' && code != 'Enter'){
    
    if (!caps){
      let result = keyboardEng.filter(elem => elem.code == code)[0].key[0];
      result.length <= 4? textarea.value += result : '';
    }
    else {
      let result = keyboardEng.filter(elem => elem.code == code)[0].key[1];
      result.length <= 4? textarea.value += result : '';
    }
    
  }
  else if (language == 'rus' && code != 'Tab' && code != 'Delete' && code != 'ControlLeft' && code != 'ControlRight' && code != 'AltRight' && code != 'AltLeft' && code != 'Win' && code != 'Backspace' && code != 'Enter'){
    if (!caps){
      let result = keyboardRus.filter(elem => elem.code == code)[0].key[0];
      result.length <= 4? textarea.value += result : '';
    }
    else {
      let result = keyboardRus.filter(elem => elem.code == code)[0].key[1];
      result.length <= 4? textarea.value += result : '';
    }
  }
  else if (code == 'Tab'){
    textarea.value += '    ';
    console.log(language);
  }
  else if (code == 'Backspace'){
    textarea.value = textarea.value.slice(0, -1);
  }
  else if (code == 'Enter'){
    textarea.value = `${textarea.value}
`;
  }
}

div.addEventListener('click', function(event){
  
  if (event.target.classList.value !== 'keyboard'){
    document.querySelectorAll('.btn').forEach(elem => {
    elem.classList.remove('active');
    })
    document.querySelector(`.${event.target.classList[1]}`).classList.add('active');
    
    addText(event.target.classList[1]);

    if (event.target.classList[1] == 'CapsLock'){
      caps = (!caps);
    }
    
    setTimeout(() => {
      document.querySelector(`.${event.target.classList[1]}`).classList.remove('active')
    }, 500)
  }
});


function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);

    for (let code of codes) { 
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    func();
  });
  
  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });
}

runOnKeys( () => {
  if (language == 'eng'){
    language = 'rus';
    init(language);
    document.querySelector('.ShiftLeft').classList.add('active')
    document.querySelector('.AltLeft').classList.add('active')
  }
  else {
    language = 'eng';
    init(language);
    document.querySelector('.ShiftLeft').classList.add('active')
    document.querySelector('.AltLeft').classList.add('active')
  }
},
  "ShiftLeft",
  "AltLeft"
);


console.log(div);
let LeftShift = document.querySelector('.ShiftLeft');
console.log(LeftShift);