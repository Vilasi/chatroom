// DOM Query
const chatList = document.querySelector('ul.chat-list');
// const roomButtons = document.querySelector('div.chat-rooms');

// class instances
const chatroom = new Chatroom('general', 'anonymous');
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
