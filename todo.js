// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

//* Tüm event listenerlar
function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodo);
    clearButton.addEventListener("click", clearAllTodos)
}
function clearAllTodos(e) {
    // Uyarı ile sorma
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
    // Arayüzden todoları temizleme
    //* todoList.innerHTML= ""; // 1.yöntem biraz yavaş kalıyor

    // while(todoList.childNodes != null)
        while(todoList.firstElementChild != null){ //* çok daha hızlı
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}


//* Todo Filter
function filterTodo(e){
    const filtervalue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filtervalue) === -1){
            // Bulamadı
            listItem.setAttribute("style","display : none !important"); //- !imortant d-flex özelliğini bastırmak için
        }
        else{
            listItem.setAttribute("style", "display : block");
        }
    });
}
//* Todo silme
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi");
    }
}
function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1); // İndexten itibaren 1 tane obje silme (Degeri silme)
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


//* Store kısmındaki todoları UI kısmına ekleme
function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

//* Todo ekleme function
function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        // <div class="alert alert-danger" role="alert">
        // This is a danger alert—check it out!
        // </div>

        showAlert("danger", "Lütfen bir todo girin...");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Başarılı bir şekilde eklendi...")
    }
    e.preventDefault();
}

//* Alert Function
function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    // console.log(alert);

    // setTimeout belli bir süre sonra alert gidebilir
    window.setTimeout(function () {
        alert.remove();
    }, 1000);// 1000 = 1 saniye
}
//* UI ' a todoları ekleme
function addTodoToUI(newTodo) { //* Aldığı strin değerini list item olarak UI'ya ekleyecek.
    //     <li class="list-group-item d-flex justify-content-between">
    //     Todo 1
    //     <a href = "#" class ="delete-item">
    //         <i class = "fa fa-remove"></i>
    //     </a>
    // </li>
    // List item oluşturma
    const listItem = document.createElement("li");
    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // Text Node ekleme
    listItem.appendChild(document.createTextNode(newTodo));

    // List item'a Link'i ekleme
    listItem.appendChild(link);

    /// /Todo List'e List itemi'ı ekleme
    todoList.appendChild(listItem);

    // console.log(listItem);
    // İnputu boşaltma
    todoInput.value = "";
}
//* Storage'dan todoları alma
function getTodosFromStorage() { // Storagedan Todoları Alma
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    return todos;

}
// * Todoları Storage'a ekleme 
function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}