// DOM Query
const chatList = document.querySelector('ul.chat-list');
const newChatForm = document.querySelector('form.new-chat');
const updateNameForm = document.querySelector('form.new-name');
const updateMessage = document.querySelector('.update-mssg');
const roomButtons = document.querySelector('div.chat-rooms');
const refreshButton = document.querySelector('div.refresh');

// refresh the page
refreshButton.addEventListener('click', (event) => {
  console.log(event.target.nodeName);
  if (event.target.nodeName === 'BUTTON') {
    if (localStorage.room) {
      chatroom.updateRoom(localStorage.room);
    } else {
      chatroom.updateRoom('general');
    }
    // location.reload();

    // Allows the Firebase Desc order to render properly
    chatUI.list.innerHTML = '';
    chatroom.getChats((data) => {
      chatUI.render(data);
    });
  }
});

// add a new chat
newChatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = newChatForm.message.value.trim();

  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
      chatUI.list.innerHTML = '';
      chatroom.getChats((data) => {
        chatUI.render(data);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// update username
updateNameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // update name via chatroom. Store in local storage
  const name = updateNameForm.name.value.trim();
  localStorage.setItem('name', updateNameForm.name.value.trim());
  chatroom.updateName(name);

  // reset form
  updateNameForm.reset();

  // temporarily show the update message
  updateMessage.innerText = `Your name was updated to ${name}`;
  setTimeout(() => {
    updateMessage.innerText = '';
  }, 4000);
});

// change rooms
roomButtons.addEventListener('click', (event) => {
  console.log(event.target.nodeName);
  if (event.target.nodeName === 'BUTTON') {
    chatroom.updateRoom(event.target.id);

    localStorage.setItem('room', event.target.id);
    chatList.innerHTML = '';

    chatroom.getChats((data) => {
      chatUI.render(data);
    });
  }
});

// class instances
const chatroom = new Chatroom('general', 'anon');
const chatUI = new ChatUI(chatList);

// get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});

///////////////////////////This is to delete all docs as specified with where
// db.collection('chats')
//   .where('username', '==', 'anon')
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       // console.log(doc.ref);
//       doc.ref
//         .delete()
//         .then(() => {
//           console.log('Blake has been purged from existence');
//         })
//         .catch((error) => {
//           console.log('I swear to fuck', error);
//         });
//     });
//   })
//   .catch((error) => {
//     console.log('FUCK', error);
//   });
