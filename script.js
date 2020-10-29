//_______________ LOCAL STORAGE _____________________________
//___________________________________________________________

// The function stores data in LocalStorage
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
    list2: [],
  }
  };

  function dataProcessing (a, b) {
    for (let i=0; i < a.children.length; i++) {
      let li = a.children[i];
      b.push(li.innerText);
    }
  }
  function dataProcessingStep1 (a, b) {
    for (let i=0; i < a.children.length; i++) {
      let li = a.children[i];
      b.push(li.lastChild.innerText);
    }
  }
  dataProcessingStep1(document.getElementById("myUL"), itemsArray.step1);
  dataProcessing(document.querySelector(".ul2yes"), itemsArray.step2.yes);
  dataProcessing(document.querySelector(".ul2no"), itemsArray.step2.no);
  dataProcessing(document.querySelector(".yes2min"), itemsArray.question2.yes);
  dataProcessing(document.querySelector(".no2min"), itemsArray.question2.no);
  dataProcessing(document.querySelector(".opt3yes"), itemsArray.question3.yes);
  dataProcessing(document.querySelector(".opt3no"), itemsArray.question3.no);
  dataProcessing(document.querySelector(".calendar"), itemsArray.step3.calendar);
  dataProcessing(document.querySelector(".list2"), itemsArray.step3.list2);
  dataProcessing(document.querySelector(".list1"), itemsArray.step3.list1);
  
  localStorage.setItem("myKey", JSON.stringify(itemsArray));
}
window.addEventListener("click", getData);

//  The function that takes data from LocalStorage and builds a web page.
function setData() {
  // Restore the contents of lists
  const raw = localStorage.getItem("myKey");
  function restoreData (myKey, path) {  
    for (let i=0; i < myKey.length; i++) {
      let li = document.createElement("li");
      let div = document.createElement("div");
      li.prepend(div);
      div.innerText = myKey[i];
      path.append(li);
    }
  }
  restoreData(JSON.parse(raw).step1, document.getElementById("myUL"));
  restoreData(JSON.parse(raw).step2.yes, document.querySelector(".ul2yes"));
  restoreData(JSON.parse(raw).step2.no, document.querySelector(".ul2no"));
  restoreData(JSON.parse(raw).question2.yes, document.querySelector(".yes2min"));
  restoreData(JSON.parse(raw).question2.no, document.querySelector(".no2min"));
  restoreData(JSON.parse(raw).question3.yes, document.querySelector(".opt3yes"));
  restoreData(JSON.parse(raw).question3.no, document.querySelector(".opt3no"));
  restoreData(JSON.parse(raw).step3.calendar, document.querySelector(".calendar"));
  restoreData(JSON.parse(raw).step3.list2, document.querySelector(".list2"));
  restoreData(JSON.parse(raw).step3.list1, document.querySelector(".list1"));

  // Create a "close" button and append it to each list item
  function closeBtn() {
    let myNodelist = document.querySelectorAll(".close_btn li");
    let i;
    for (i = 0; i < myNodelist.length; i++) {
      let div = document.createElement("div");
      let txt = document.createTextNode("\u00D7");
      div.className = "close";
      div.append(txt);
      myNodelist[i].prepend(div);
  // Click on a close button to hide the current list item
      let close = document.getElementsByClassName("close");
      let l;
      for (l = 0; l < close.length; l++) {
        close[l].onclick = function() {
          let div = this.parentElement;
          div.remove();
        }
      }
    }
  }
  closeBtn();

  // Restore the questions
  lastElem(document.querySelector(".question1"), document.getElementById("myUL"));   // last element for question1
  lastElem(document.querySelector(".question2"), document.querySelector(".ul2yes"));  // last element for question2
  lastElem(document.querySelector(".question3"), document.querySelector(".no2min"));  // last element for question3
  lastElem(document.querySelector(".step3"), document.querySelector(".opt3no"));  // last element for question4
}
document.addEventListener("DOMContentLoaded", setData);

//_______________ Creating interactive list ________________
//__________________________________________________________

// Create a new task when press "enter"
document.getElementById("myInput").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    let li = document.createElement("li");
    let input = document.getElementById("myInput").value;
    let div = document.createElement("div");
    li.prepend(div);
    let t = document.createTextNode(input);
    div.appendChild(t);
    if (input === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").prepend(li); 
      lastElem(document.querySelector(".question1"), document.getElementById("myUL"));   
    }
    document.getElementById("myInput").value = "";
    // Create a "close" button and append it to list item
    let elem = document.createElement("div");
    let txt = document.createTextNode("\u00D7");
    elem.className = "close";
    elem.append(txt);
    li.prepend(elem);
    let close = document.getElementsByClassName("close");
    let l;
    for (l = 0; l < close.length; l++) {
      close[l].onclick = function() {
        let elem = this.parentElement;
        elem.remove();
      }
    }
  }
});
// Add a "checked" symbol when clicking on a list task
const checkList = document.querySelectorAll(".check");
for (let i of checkList) {
  i.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  } else if (ev.target.tagName === 'DIV' && ev.target.parentElement.tagName === 'LI') {
    ev.target.parentElement.classList.toggle('checked');
  }
}, false);
}
// Button that removes the checked tasks
function clearItems() {
  const items = document.querySelectorAll(".checked");
  if(items === null) {
    return;
  }
  for (let item of items) {
    item.remove();
  }
}

//_______________ Functionality of buttons _________________
//__________________________________________________________

// Copy the contents of the last list task to the question box
function lastElem(q, w) {
  if (q.children.length !== 0 || w.lastChild === null) {
    return;
  }
  let copy = w.lastChild.cloneNode(true);
  q.append(copy);
}
// Delete an task in the question box
function elemRemove(e) {
  if(e.children[0] === undefined) {
    return;
  }
  e.children[0].remove();
} 
// Functionality of buttons when you click on them. Redistribute the last list task to a new list.
function optYes() {
  if (document.getElementById("myUL").lastChild === null) {
    alert("Empty!");
    return;
  }
  const text = document.getElementById("myUL").lastChild.lastChild.innerText;
  const newElem = document.createElement("li");
  newElem.append(text);

  document.querySelector(".ul2yes").prepend(newElem);
  document.getElementById("myUL").lastChild.remove();
  
  elemRemove(document.querySelector(".question1"));
  lastElem(document.querySelector(".question1"), document.getElementById("myUL"));     // last element for question1 
  if (document.querySelector(".question1").lastChild == null) {
    return;
  }
  document.querySelector(".question1").lastChild.firstChild.remove();
  lastElem(document.querySelector(".question2"), document.querySelector(".ul2yes"));  // last element for question2
}
function optNo() {
  if (document.getElementById("myUL").lastChild === null) {
    alert("Empty!");
    return;
  } 
  const text = document.getElementById("myUL").lastChild.lastChild.innerText;
  const newElem = document.createElement("li");
  newElem.append(text);
 
  document.querySelector(".ul2no").prepend(newElem);
  document.getElementById("myUL").lastChild.remove();
  
  elemRemove(document.querySelector(".question1"));
  lastElem(document.querySelector(".question1"), document.getElementById("myUL"));  // last element for question2
  if (document.querySelector(".question1").lastChild == null) {
    return;
  }
  document.querySelector(".question1").lastChild.firstChild.remove();
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
    document.querySelector(".list1").prepend(elem);
  }
}
function yes2min() {
  const elem = document.querySelector(".ul2yes").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".yes2min").prepend(elem);
  }
  elemRemove(document.querySelector(".question2"));
  lastElem(document.querySelector(".question2"), document.querySelector(".ul2yes"));  // last element for question2
}
function no2min() {
  const elem = document.querySelector(".ul2yes").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".no2min").prepend(elem);
  }
  elemRemove(document.querySelector(".question2"));
  lastElem(document.querySelector(".question2"), document.querySelector(".ul2yes"));  // last element for question2
  lastElem(document.querySelector(".question3"), document.querySelector(".no2min"));  // last element for question3
}
function opt3yes() {
  const elem = document.querySelector(".no2min").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".opt3yes").prepend(elem);
  }
  elemRemove(document.querySelector(".question3"));
  lastElem(document.querySelector(".question3"), document.querySelector(".no2min"));  // last element for question3
}
function opt3no() {
  const elem = document.querySelector(".no2min").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".opt3no").prepend(elem);
  }
  elemRemove(document.querySelector(".question3")); 
  lastElem(document.querySelector(".question3"), document.querySelector(".no2min"));  // last element for question3
  lastElem(document.querySelector(".step3"), document.querySelector(".opt3no"));     // last element for question4
}
function calendar() {
  const elem = document.querySelector(".opt3no").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".calendar").prepend(elem);
  }
  elemRemove(document.querySelector(".step3"));
  lastElem(document.querySelector(".step3"), document.querySelector(".opt3no"));    // last element for question4
}
function list() {
  const elem = document.querySelector(".opt3no").lastChild;
  if (elem === null) {
    alert("Empty!");
  } else {
    document.querySelector(".list2").prepend(elem);
  } 
  elemRemove(document.querySelector(".step3"));
  lastElem(document.querySelector(".step3"), document.querySelector(".opt3no"));    // last element for question4
}

