//_______________ Local Storage ____

// let itemsArray = localStorage.getItem('myKey') ? JSON.parse(localStorage.getItem('myKey')) : {};

function getData() {
  const itemsArray = {
  step1: [],
  step2: {
    yes: [], 
    no: [],
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
  };

  const step1 = document.getElementById("myUL");
  for (let i=0; i < step1.childNodes.length; i++) {
    let li = step1.childNodes[i];
    itemsArray.step1.unshift(li.childNodes[0].innerText);
  }
  const step2yes = document.getElementsByClassName("ul2Yes")[0];
  for (let i=0; i < step2yes.childNodes.length; i++) {
    let li = step2yes.childNodes[i];
    itemsArray.step2.yes.unshift(li.innerText);
  }

  localStorage.setItem("myKey", JSON.stringify(itemsArray));
}
window.addEventListener("click", getData);

// 1. функція яка бере об'єкт з масивами і по ньому будує веб сторінку з відповідними пунктами "setData(obj)"

function setData() {
  const raw = localStorage.getItem("myKey");
  const myKey1 = JSON.parse(raw).step1;

  for (let i=0; i < myKey1.length; i++) {
    let li = document.createElement("li");
    li.innerText = myKey1[i];
    document.getElementById("myUL").appendChild(li);
  }
  const myKey2yes = JSON.parse(raw).step2.yes;
  for (let i=0; i < myKey2yes.length; i++) {
    let li = document.createElement("li");
    li.innerText = myKey2yes[i];
    document.getElementsByClassName("ul2Yes")[0].prepend(li);
  }
  const myKey2no = JSON.parse(raw).step2.no;
  for (let i=0; i < myKey2no.length; i++) {
    let li = document.createElement("li");
    li.innerText = myKey2no[i];
    document.getElementsByClassName("ul2No")[0].prepend(li);
  }
}
document.addEventListener("DOMContentLoaded", setData);




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
  getData();
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
}

//__________________________________ 2_Step ________________ 
//_______________ Creating interactive list ________________
// сортування задач 

// Копіювання вмісту останнього пункту в поле для запитання

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
