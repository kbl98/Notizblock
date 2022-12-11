"use strict";

let names = [];
let messages = [];
let trashMessages = [];
let trashNames = [];
/*let styles=["rotate20","rotate-30","scale0","scale1"];*/

function removedNone() {
  let trashbag = document.getElementById("h2");
  let createcontainer = document.getElementById("createMessage-container");
  if (createcontainer.className == "d-none") {
    createcontainer.classList.remove("d-none");
  }
  trashbag.className = "d-none";
}


function dNone() {
  let trashbag = document.getElementById("h2");
  let createcontainer = document.getElementById("createMessage-container");
  createcontainer.className = "d-none";
  if (trashbag.className == "d-none") {
    trashbag.classList.remove("d-none");
  }
}


function render() {
  removedNone();
  let content = document.getElementById("content");
  content.innerHTML = "";
  if (names && messages) {
    for (let i = 0; i < names.length; i++) {
      /*let style=styles[Math.floor(Math.random()*3)];*/
      content.innerHTML += `<div class="pickedmessage">
                <div class="text"><b><u>${names[i]}</u></b><br><br>
                ${messages[i]}<br></div>
                <a href="#"id="delete-bt" title="In den Papierkorb" onclick="deletemess(${i})"><img src="img/trash.svg"></a>
            </div>`;
    }
  }
}


function renderTrash() {
  dNone();
  let content = document.getElementById("content");
  content.innerHTML = "";
  if (trashNames && trashMessages) {
    for (let i = 0; i < trashNames.length; i++) {
      /*let style=styles[Math.floor(Math.random()*3)];*/
      content.innerHTML += `<div class="pickedmessage">
                <div class="text"><b><u>${trashNames[i]}</u></b><br><br>
                ${trashMessages[i]}<br></div>
                <div class="trash-bt"
                <a href="#"id="delete-bt" title="Endgültig löschen" onclick="deleteforever(${i})"><img src="img/trash.svg"></a>
                <a href="#"id="delete-bt"  title="Reaktivieren" onclick="reload(${i})"><img src="img/write.svg"></a>
                </div>
            </div>`;
    }
  }
}


function addMessage() {
  let name = document.getElementById("name").value;
  let message = document.getElementById("message").value;
  if (name && message) {
    names.push(name);
    messages.push(message);
  }
  render();
  save();
  document.getElementById("name").value = "";
  document.getElementById("message").value = "";
}


function deletemess(i) {
  trashNames.push(names[i]);
  trashMessages.push(messages[i]);
  names.splice(i, 1);
  messages.splice(i, 1);
  render();
  save();
}


function deleteforever(i) {
  trashNames.splice(i, 1);
  trashMessages.splice(i, 1);
  renderTrash();
  save();
}


function save() {
  if(names){
  let namesAsText = JSON.stringify(names);
  let messAsText = JSON.stringify(messages);
  localStorage.setItem("names", namesAsText);
  localStorage.setItem("messages", messAsText);
}
  if(trashMessages){
  let trashNamesAsText = JSON.stringify(trashNames);
  let trashMessagesAsText = JSON.stringify(trashMessages);
  localStorage.setItem("trashNames", trashNamesAsText);
  localStorage.setItem("trashMessages", trashMessagesAsText);
  }
}


function load() {
  
  let namesAsText = localStorage.getItem("names");
  let messAsText = localStorage.getItem("messages");
  
  if(namesAsText){
  names = JSON.parse(namesAsText);
  messages = JSON.parse(messAsText);
  }
  render();
}


function loadTrash() {
  let trashNamesAsText = localStorage.getItem("trashNames");
  let trashMessagesAsText = localStorage.getItem("trashMessages");
  
  if(trashNamesAsText){
  trashNames = JSON.parse(trashNamesAsText);
  trashMessages = JSON.parse(trashMessagesAsText);
  }
  renderTrash();
}

function reload(i){
  messages.push(trashMessages[i]);
  names.push(trashNames[i]);
  trashNames.splice(i, 1);
  trashMessages.splice(i, 1);
  renderTrash();
  save();
  
}
