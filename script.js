//_______________ Local Storage ____
const obj = {
  step1: ['Hit the gym', 'Pay bills'],
  step2: {
    yes: ['Meet George','Set timer'], 
    no: ['Read a book'],
  },
  step3: [],
  step4: [],
}
localStorage.setItem("myKey", JSON.stringify(obj));
// const raw = localStorage.getItem("myKey");
// const myKey = JSON.parse(raw);
// let key = "jsj";
// myKey.step2.push(key);
// console.log(myKey);

// function addValues() {
//   let step1 = [];
//   for (i=0; i<localStorage.length; i++) {
//     let key = localStorage.key[i];
//     step1.push(key);
//   }
// }
//     let p = document.createElement("p");
// p.innerHTML = "First paragraph";
// main.appendChild(p);
function setData() {
  const raw = localStorage.getItem("myKey");
  const myKey1 = JSON.parse(raw).step1;

  console.log(myKey1);
  for(let i=0; i < myKey1.length; i++) {
    console.log(myKey1[i]);
    let li = document.createElement("li");
    li.innerText = myKey1[i];
    document.getElementById("myUL").appendChild(li);
  }
  const myKey2yes = JSON.parse(raw).step2.yes;
  for(let i=0; i < myKey2yes.length; i++) {
    console.log(myKey2yes[i]);
    let li = document.createElement("li");
    li.innerText = myKey2yes[i];
    document.getElementsByClassName("ul2Yes")[0].appendChild(li);
  }
  const myKey2no = JSON.parse(raw).step2.no;
  for(let i=0; i < myKey2no.length; i++) {
    console.log(myKey2no[i]);
    let li = document.createElement("li");
    li.innerText = myKey2no[i];
    document.getElementsByClassName("ul2No")[0].appendChild(li);
  }
}
document.addEventListener("DOMContentLoaded", setData);

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
} 
// Create a "close" button and append it to each list item
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

//__________________________________ 2_Step ________________ 
//_______________ Creating interactive list ________________
// сортування задач 

// Копіювання вмісту останього пункту в поле для запитання

document.addEventListener("DOMContentLoaded", lastElement);
function lastElement() {
  let elem = document.getElementById("myUL").lastElementChild;
  // змінити стилізацію
  elem.style.backgroundColor = "rgba(242, 79, 19, 0.2)";
  let copy = elem.cloneNode(true);
  document.getElementsByClassName("question1")[0].append(copy);
}
// Перерозподілення останнього елементу в новий список.
function optYes() {
  let elemQuestion = document.getElementById("myUL").lastElementChild;
  if (elemQuestion === null) {
    alert("Empty!");
  } else {
    let elem = document.getElementsByClassName("ul2Yes")[0].prepend(elemQuestion)
  }
  lastElement();
  elemRemove();
}
function optNo() {
  let elemQuestion = document.getElementById("myUL").lastElementChild;
  if (elemQuestion === null) {
    alert("Empty!");
  } else {
    document.getElementsByClassName("ul2No")[0].prepend(elemQuestion);
  }
  lastElement();
  elemRemove();
}
function elemRemove() {
  document.getElementsByClassName("question1")[0].children[0].remove();
} 
