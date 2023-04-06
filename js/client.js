
// const socket = io('http://localhost:8000');

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container")

// const append = (message, position)=>{
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement);
// }


// const myname = prompt("Enter your Name to Join: ");
// socket.emit('new-user-joined', myname);

// socket.on('user-joined', myname=>{
//     append(`${myname} joined the chat`,'right')
// })
// socket.on('recieve', data =>{
//     append(`${data.myname}: ${data.message}`,'left')
// })

// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`,'right'); 
//     socket.emit('send', message)
//     messageInput.value= ' '
// })
const socket = io('http://localhost:8000');

// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will play on receiving messages
// var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){ 
        audio.play();
    }
}



const myname = prompt("Enter your name to join");
socket.emit('new-user-joined', myname);


socket.on('user-joined', myname =>{
    append(`${myname} joined the chat`, 'right')
})

// If server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.myname}: ${data.message}`, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', myname =>{
    append(`${myname} left the chat`, 'right')
})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})