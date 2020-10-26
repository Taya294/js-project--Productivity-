//_______________ Local Storage ____

// let itemsArray = localStorage.getItem('myKey') ? JSON.parse(localStorage.getItem('myKey')) : {};

// функція "getData()" зберігає дані в localStorage
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
    list1: [],
  }
  };

  const step1 = document.getElementById("myUL");
  for (let i=0; i < step1.childNodes.length; i++) {
    let li = step1.childNodes[i];
    itemsArray.step1.push(li.innerText);
  }
  const step2yes = document.querySelector(".ul2yes");
  for (let i=0; i < step2yes.childNodes.length; i++) {
    let li = step2yes.childNodes[i];
    itemsArray.step2.yes.push(li.innerText);
  }
  const step2no = document.querySelector(".ul2no");
  for (let i=0; i < step2no.childNodes.length; i++) {
    let li = step2no.childNodes[i];
    itemsArray.step2.no.push(li.innerText);
  }

  localStorage.setItem("myKey", JSON.stringify(itemsArray));
}
window.addEventListener("click", getData);

//  Функція "setData()" яка бере дані з localStorage і будує по цих даних сторінку.

function setData() {
  const raw = localStorage.getItem("myKey");
  const myKey1 = JSON.parse(raw).step1;
  for (let i=0; i < myKey1.length; i++) {
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.prepend(div);
    div.innerText = myKey1[i];
    document.getElementById("myUL").appendChild(li);
  }

  const myKey2yes = JSON.parse(raw).step2.yes;
  for (let i=0; i < myKey2yes.length; i++) {
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.prepend(div);
    div.innerText = myKey2yes[i];
    document.getElementsByClassName("ul2yes")[0].appendChild(li);
  }

  const myKey2no = JSON.parse(raw).step2.no;
  for (let i=0; i < myKey2no.length; i++) {
    let li = document.createElement("li");
    let div = document.createElement("div");
    li.prepend(div);
    div.innerText = myKey2no[i];
    document.getElementsByClassName("ul2no")[0].prepend(li);
  }
}
document.addEventListener("DOMContentLoaded", setData);



// 3. Після кожної зміни на сторінці необхідно буде викликати функцію getData і зберегти результат в LocalStorage

// 4. Після завантаження сторінки необхідно зчитати об'єкт з LocalStorage і передати його функції setData(obj)

//__________________________________ 1_Step ________________ 
//_______________ Creating interactive list ________________

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let div = document.createElement("div");
  li.prepend(div);
  let t = document.createTextNode(inputValue);
  div.appendChild(t);
  
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").prepend(li);
    lastElement();
    elemRemove();
  }
  document.getElementById("myInput").value = "";
  
  // let span = document.createElement("SPAN");
  // let txt = document.createTextNode("\u00D7");
  // span.className = "close";
  // span.appendChild(txt);
  // li.appendChild(span);

  // for (i = 0; i < close.length; i++) {
  //   close[i].onclick = function() {
  //     let div = this.parentElement;
  //     div.style.display = "none";
  //   }
  // }
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
  let copy = document.getElementById("myUL").lastChild.cloneNode(true);
  document.querySelector(".question1").append(copy);
}
document.addEventListener("DOMContentLoaded", lastElement);

function lastElement2() {
  let copy = document.querySelector(".ul2yes").lastChild.cloneNode(true);
  document.querySelector(".question2").append(copy);
}
document.addEventListener("DOMContentLoaded", lastElement2);

function lastElement3() {
  let copy = document.querySelector(".no2min").lastChild.cloneNode(true);
  document.querySelector(".question3").append(copy);
}
document.addEventListener("DOMContentLoaded", lastElement3);

function lastElement4() {
  let copy = document.querySelector(".opt3no").lastChild.cloneNode(true);
  document.querySelector(".step3").append(copy);
}
document.addEventListener("DOMContentLoaded", lastElement4);


// Functionality of buttons when you click on them.Redistribute the last list item to a new list.

function optYes() {
  const elem = document.getElementById("myUL").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".ul2yes").prepend(elem);
  }
  lastElement();
  elemRemove();
}
function optNo() {
  const elem = document.getElementById("myUL").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".ul2no").prepend(elem);
  }
  lastElement();
  elemRemove();
}
function elemRemove() {
  document.querySelector(".question1").children[0].remove();
} 

function trash() {
  const elem = document.querySelector(".step2question").lastChild;
  if (elem === null) { 
    alert("Empty");
  } else {
    elem.remove();
  }
}
function incubate() {
  const elem = document.querySelector(".step2question").lastChild;
    if (elem === null) {
    alert("Empty!");
    } else {
    document.querySelector(".incubateList").prepend(elem);
  }
}
function yes2min() {
  const elem = document.querySelector(".ul2yes").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".yes2min").prepend(elem);
  }
}
function no2min() {
  const elem = document.querySelector(".ul2yes").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".no2min").prepend(elem);
  }
}
function opt3yes() {
  const elem = document.querySelector(".no2min").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".opt3yes").prepend(elem);
  } 
}
function opt3no() {
  const elem = document.querySelector(".no2min").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".opt3no").prepend(elem);
  } 
}
function calendar() {
  const elem = document.querySelector(".opt3no").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".calendar").prepend(elem);
  } 
}
function list() {
  const elem = document.querySelector(".opt3no").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".list").prepend(elem);
  } 
}