// DOM Query
const chatList = document.querySelector('ul.chat-list');
const newChatForm = document.querySelector('form.new-chat');
const updateNameForm = document.querySelector('form.new-name');
const roomButtons = document.querySelector('div.chat-rooms');

// add a new chat
newChatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = newChatForm.message.value.trim();

  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

// update username
updateNameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = updateNameForm.name.value.trim();

  localStorage.setItem('name', updateNameForm.name.value.trim());
  chatroom.updateName(name);
  updateNameForm.reset();
});

// change rooms
roomButtons.addEventListener('click', (event) => {
  console.log(event.target.nodeName);
  if (event.target.nodeName === 'BUTTON') {
    chatroom.updateRoom(event.target.id);
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

///////////////////////////This was to delete all docs with username Blake.
// db.collection('chats')
//   .where('username', '==', 'Blake')
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       //   console.log(doc.ref);
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
