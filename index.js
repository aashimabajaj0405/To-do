//Buttons
const addButton = document.getElementById("add");
const clearButton = document.getElementById("clear-completed");
const emptyButton = document.getElementById("empty");
const saveButton = document.getElementById("save");

var textBox = document.getElementById("text-box");
var list = document.getElementById("myList");

//get file
function getFile() {
  for (let i = 0; i < itemArray.length; i++) {
    var text = itemArray[i].task;
    var listItem = document.createElement("li"); 
    var textNode = document.createTextNode(text); 
    listItem.setAttribute(
      "ondblclick",
      "this.style.textDecoration = 'line-through'"
    );
    listItem.appendChild(textNode); 
    list.appendChild(listItem); 
    textBox.value = "";
  }
}

//To add new file
function addFile() {
  var text = textBox.value;
    var listItem = document.createElement("li"); 
    var textNode = document.createTextNode(text); 
    listItem.setAttribute(
      "ondblclick",
      "this.style.textDecoration = 'line-through'"
    );
    listItem.appendChild(textNode); 
    list.appendChild(listItem); 
    textBox.value = "";
}

//To clear file
function clearFile() {
  var clearText = document.querySelectorAll("li");
  clearText.forEach((a) => {
    if (a.style.textDecoration == "line-through") {
      for (let i = 0; i < itemArray.length; i++) {
        if (a.innerHTML == itemArray[i].task) {
          itemArray.splice(i, 1);
        }
      }
      list.removeChild(a);
    }
  });
  localStorage.setItem("file", JSON.stringify(itemArray));
}

//To delete all files
function emptyFile() {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  localStorage.removeItem("file");
}

//To save all files
var itemArray = JSON.parse(localStorage.getItem("file"));
if (itemArray == null) {
  itemArray = [];
}
function saveFile() {
  itemArray=[];
  for (let i = 0; i < list.childNodes.length; i++) {
    var file = {
      task: list.childNodes[i].textContent,
    };
    itemArray.push(file);
  }
  if(itemArray.length>0)
   localStorage.setItem("file", JSON.stringify(itemArray));
}

//Event Listeners
document.onload = getFile();
textBox.addEventListener("keypress",function(event){
   if(textBox.value!==''&&event.which=='13') 
      addFile();
});
addButton.addEventListener("click", function(){
   if(textBox.value!=='') 
      addFile();
});
clearButton.addEventListener("click", clearFile);
emptyButton.addEventListener("click", emptyFile);
saveButton.addEventListener("click", saveFile);
