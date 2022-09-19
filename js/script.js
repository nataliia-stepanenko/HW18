"use strict"

const ul = document.getElementById('list');
const form = document.forms['task-form'];
const { input} = form;
const errorMessage = document.createElement('div');

form.addEventListener('submit', handleSubmit);
input.addEventListener('focus', removeError);
ul.addEventListener('click', removeToDo);
ul.addEventListener('change', fulfillToDo);

function addToDo (){
    const li = document.createElement('li');
    li.innerHTML = input.value;
    li.classList.add('task');
    ul.append(li);
    input.value = '';
    input.focus();

    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'del-button');
    li.append(delBtn);

    const doneBox = document.createElement('input');
    doneBox.setAttribute('type', 'checkbox');
    doneBox.classList.add('box');
    li.prepend(doneBox);
}

function handleSubmit(event) {
    event.preventDefault();
    if (input.value.trim() === "") {
        input.classList.add('error');
        errorMessage.classList.add('error-message');
        errorMessage.innerHTML = 'Please, enter a valid task';
        form.after(errorMessage);
        return;
    }
    addToDo();
}

function removeError() {
     if (input.classList.contains('error')) {
         input.classList.remove('error');
         errorMessage.innerHTML = '';
    }
}

function removeToDo (event) {
    let isRemoveButton = event.target.classList.contains('del-button');
    if (isRemoveButton){
        let li = event.target.closest('.task');
        li.remove();
    }
}

function fulfillToDo(event) {
    let isCheckedBox = event.target.className === "box";
    if (isCheckedBox) {
        let li = event.target.closest('.task');
        li.classList.add('fulfilled');

        let checked = li.firstChild;
        checked.setAttribute('disabled', 'true');
        let pressed = li.lastChild;
        pressed.setAttribute('disabled', 'true');
    }
}
