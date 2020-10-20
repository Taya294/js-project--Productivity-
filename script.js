//_______________ Local Storage ____
const obj = {
  step1: ['Hit the gym', 'Pay bills'],
  step2: {
    yes: ['Meet George','Set timer'], 
    no: ['Read a book'],
  },
  question2: {
    yes: [],
    no: [],
  },
  question3: {    
    yes: [],
    no: [],
  },
  step3: {
    calendar: [],
    list: [],
  }
}
localStorage.setItem("myKey", JSON.stringify(obj));
// const raw = localStorage.getItem("myKey");
// const myKey = JSON.parse(raw);
// let key = "jsj";
// myKey.step2.push(key);
// console.log(myKey);

function setData() {
  const raw = localStorage.getItem("myKey");
  const myKey1 = JSON.parse(raw).step1;

  for(let i=0; i < myKey1.length; i++) {
    let li = document.createElement("li");
    li.innerText = myKey1[i];
    document.getElementById("myUL").appendChild(li);
    closeBtn();
  }
  const myKey2yes = JSON.parse(raw).step2.yes;
  for(let i=0; i < myKey2yes.length; i++) {
    let li = document.createElement("li");
    li.innerText = myKey2yes[i];
    document.getElementsByClassName("ul2Yes")[0].prepend(li);
    closeBtn();
  }
  const myKey2no = JSON.parse(raw).step2.no;
  for(let i=0; i < myKey2no.length; i++) {
    let li = document.createElement("li");
    li.innerText = myKey2no[i];
    document.getElementsByClassName("ul2No")[0].prepend(li);
    closeBtn();
  }
}
document.addEventListener("DOMContentLoaded", setData);

// function getData() {
//   let myKey = {
//     step1: [],
//     step2: {
//       yes: [], 
//       no: [],
//     }
//   };
//   for {
//     // let li ...
//     // myKey.step1.push(li.innerText);
//   }
//   // myKey.step1.push(input.value);
//   // localStorage.setItem("myKey", JSON.stringify(myKey));
//   // newElement(input.value);
//   // input.value = "";

//   // const newItem = localStorage.getItem("myKey");
//   // const data1 = JSON.parse(newItem).step1;
//   // myKey.step1.push(data1[i]);
//   console.log(myKey);
//   // localStorage.setItem("myKey", JSON.stringify(myKey));
// }

// 1. написати функцію яка бере об'єкт з масивами і по ньому будує веб сторінку з відповідними пунктами "setData(obj)"
// 2. написати функцію яка будує об'єкт "getData()" по тим даним які в тебе є на сторінці

// 3. Після кожної зміни на сторінці необхідно буде викликати функцію getData і зберегти результат в LocalStorage

// 4. Після завантаження сторінки необхідно зчитати об'єкт з LocalStorage і передати його функції setData(obj)

//__________________________________ 1_Step ________________ 
//_______________ Creating interactive list ________________

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  // myKey.step1.push(inputValue);
  // console.log(inputValue);
  
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").prepend(li);
    lastElement();
    elemRemove();
  }
  document.getElementById("myInput").value = "";

  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      let div = this.parentElement;
      div.style.display = "none";
    }
  }
  closeBtn();
} 

// Create a "close" button and append it to each list item
function closeBtn() {
  let myNodelist = document.getElementsByTagName("li");
  let i;
  for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
  }
// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
let l;
for (l = 0; l < close.length; l++) {
  close[l].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
  }
}
}

//__________________________________ 2_Step ________________ 
//_______________ Creating interactive list ________________
// сортування задач 

// Копіювання вмісту останього пункту в поле для запитання

function lastElement() {
  let elem = document.getElementById("myUL").lastElementChild;
  elem.style.backgroundColor = "rgba(242, 79, 19, 0.2)";
  let copy = elem.cloneNode(true);
  document.getElementsByClassName("question1")[0].append(copy);
}
document.addEventListener("DOMContentLoaded", lastElement);
// Перерозподілення останнього елементу в новий список.
function optYes() {
  let elemQuestion = document.getElementById("myUL").lastElementChild;
  elemQuestion.removeAttribute("style");
  if (elemQuestion === null) {
    alert("Empty!");
  } else {
    let elem = document.getElementsByClassName("ul2Yes")[0].prepend(elemQuestion);
  }
  lastElement();
  elemRemove();
}
function optNo() {
  let elemQuestion = document.getElementById("myUL").lastElementChild;
  elemQuestion.removeAttribute("style");
  if (elemQuestion === null) {
    alert("Empty!");
  } else {
    let elem = document.getElementsByClassName("ul2No")[0].prepend(elemQuestion);
  }
  lastElement();
  elemRemove();
}
function elemRemove() {
  document.getElementsByClassName("question1")[0].children[0].remove();
} 
