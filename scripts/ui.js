// render chat templates to the DOM
// clear the list of chats when the room changes

// roomButtons.addEventListener('click', (event) => {
//   console.log(event.target.getAttribute('class'));
//   if (event.target.getAttribute('class') == 'btn') {
//     chats.innerHTML = '';
//     chatroom.getChats(event.target.id, (message) => {
//       chats.innerHTML += `<li class="list-group-item">${message}</li>`;
//     });
//   }
// });

class ChatUI {
  constructor(list) {
    this.list = list;
  }
  render(data) {
    // convert created_at from
    const when = dateFns.distanceInWordsToNow(data.created_at.seconds * 1000, {
      addSuffix: true,
    });

    // if name is stored in local storage, use that name, else use name 'anon'
    if (localStorage.name) {
      chatroom.updateName(localStorage.name);
    } else {
      chatroom.updateName('anon');
    }

    const html = `
        <li class="list-group-item">
            <span class="username">${data.username}:</span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
        </li>
        `;

    this.list.innerHTML += html;
  }
}
