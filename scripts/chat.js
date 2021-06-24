class Chatroom {
  constructor(room, username) {
    this.username = username;
    this.room = room;
    this.chats = db.collection('chats');
    this.unsubscribe;
  }
  async addChat(message) {
    //Format the chat object
    const now = new Date();

    const chat = {
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now),
      message: message,
    };

    //save the chat document
    //Because this function is contained within an async function, and is itself async, we use await
    const response = await this.chats.add(chat);

    return response;
  }
  getChats(callback) {
    //This returns a function (The unsubscribe from realtime listener function).
    //To unsubscribe, store it in a variable and then call the variable
    //This will be stored in the constructor function of the object
    this.unsubscribe = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at', 'desc')
      .onSnapshot((querySnapshot) => {
        // console.log(querySnapshot.docChanges());
        querySnapshot.docChanges().forEach((change) => {
          // console.log(change);
          if (change.type === 'added') {
            // console.log(change.doc.data().created_at);

            callback(change.doc.data());
          }
        });
      });
  }

  updateName(username) {
    this.username = username;
  }

  updateRoom(room) {
    this.room = room;
    console.log('room updated');

    //This will only fire if the realtime listener has already been set as the this.unsubscribe property.
    //Therefore we must use an if check to see if it has already been setup (true/false)
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
