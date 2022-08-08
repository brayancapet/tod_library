const hero_button = document.querySelector('.hero-button');
const overlay = document.querySelector('.overlay');
const form = document.querySelector('#form');
const yes = document.querySelector('#yes');
const no = document.querySelector('#no');
const submit_button = document.querySelector('.submit-button');
const title_input =  document.querySelector('#title');
const author_input = document.querySelector('#author');
const pages_input = document.querySelector('#pages');
const read = document.getElementsByName('read');
const cross = document.querySelector('.fa-solid');
const books_content = document.querySelector('.books-content');
const books_header = document.querySelector('.books-header');
const delete_button = document.querySelector('.delete-button');
 
function Book(title, author, pages, read){
   this.title = title,
   this.author = author,
   this.pages = pages,
   this.read = read || 'yes',
   this.id = counter + 1
}
 
let books = [];
let counter = - 1;
refreshCard();
 
function on() {
   overlay.style.display = "block";
}
 function off() {
   overlay.style.display = "none";
}
 
hero_button.addEventListener('click', on);
 
function noButton(){
  if(no.classList == "selected-radio" && yes.classList !== "selected-radio"){
   console.log('no button already in use');
  } else if(no.classList !== "selected-radio" && yes.classList == "selected-radio"){
   yes.classList.remove('selected-radio');
   no.classList.add('selected-radio');
   read.value = "no";
   console.log(read.value);
  }
}
 
function yesButton(){
   if(yes.classList == "selected-radio" && no.classList !== "selected-radio"){
       console.log('yes button already in use');
   } else if(yes.classList !== "selected-radio" && no.classList == "selected-radio"){
       no.classList.remove('selected-radio');
       yes.classList.add("selected-radio");
       read.value = "yes";
       console.log(read.value);
   }
}
 
function onSubmit(){
   if(title.value !== "" && author.value !== "" && pages.value !== ""){
       books.push(new Book(title_input.value, author_input.value, pages_input.value, read.value));
       title_input.value = "";
       author_input.value = "";
       pages_input.value = "";
       counter ++;
       refreshCard();
       overlay.style.display = "none";
   }
   console.log(books)
}
 
function refreshCard(){
   if(books.length > 0){
       books_content.innerHTML = '';
       for(let book of books){
           let temp = document.querySelector('#no-books');
           if(temp){temp.parentNode.removeChild(temp);}
           let div =  document.createElement('div');
           div.classList.add('card-container');
           div.innerHTML = `
           <div class="card-content">
               <p class="card-title">${book.title}</p>
               <p class="card-author">by <span> ${book.author}</span></p>
               <p class="card-pages">${book.pages} pages</p>
               <p class="card-read">${book.read == "yes" ? "has been read, and enjoyed." : "hasn't been read, yet."}</p>
               <div class="card-button"><button type="button" class="delete-button" onclick="deleteBook(${book.id})">delete this book</button></div>
           </div>
           `;
           books_content.appendChild(div);
       }
   } else {
       books_content.innerHTML = '';
       let div = document.createElement('div');
       div.classList.add('no-books');
       div.innerHTML = `
           <p id="no-books">No books here, start storing them now.
       `;
       books_header.appendChild(div);
   }
}
 
function deleteBook(id){
   for(let i = 0; i < books.length; i++){
       if(id === books[i].id){
           books.splice(i, 1);
       }
   }
   refreshCard();
}
 
 
submit_button.addEventListener('click', onSubmit);
yes.addEventListener('click', yesButton);
no.addEventListener('click', noButton);
cross.addEventListener('click', function() {
   overlay.style.display = "none";
})
