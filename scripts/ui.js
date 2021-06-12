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
    const html = `
        <li class="list-group-item">
            <span class="username">${data.username}:</span>
            <span class="message">${data.message}</span>
            <div class="time">${data.created_at.toDate()}</div>
        </li>
        `;

    this.list.innerHTML += html;
  }
}
