let chatDiv = document.getElementById('chats-div');
let i = 0;
let recieverId;

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    db.collection('room').where('users.' + firebase.auth().currentUser.uid, '==', true).get().then(snapshot => {
      snapshot.forEach(change => {
        console.log(change.id);
        console.log(change.data());

        let room = document.createElement('div');
        room.setAttribute('class', "w3-panel w3-pale-green");
        room.setAttribute('id', `roomsDiv${i++}`);
        room.style.cursor = 'pointer';

        let p = document.createElement('p');
        p.setAttribute('id', 'roomID');
        p.textContent = "Click here to read this Message.";

        room.appendChild(p);
        chatDiv.appendChild(room);

        room.addEventListener('click', () => {
          showRoomMessages(change.id, change.data().ad_id)
        });

      });
    });





    function showRoomMessages(roomID, ad_id) {

      // styling the chat
      var mainDiv = document.createElement('div');
      mainDiv.setAttribute('class', 'w3-modal');
      mainDiv.setAttribute('id', 'main-div');
      mainDiv.style.display = 'block';

      //creating result popup/modal
      var modal = document.createElement('div');
      modal.setAttribute('class', 'w3-modal-content w3-animate-zoom w3-pale-green w3-card-4 w3-white w3-padding-16');
      modal.setAttribute('id', 'result-modal');
      modal.style.width = '70%';
      // modal.style.height = '85%';

      //creating close button
      var close = document.createElement('span');
      close.setAttribute('class', 'w3-button w3-display-topright w3-hover-red');
      close.addEventListener('click', () => {
        document.getElementById('main-div').remove();
      });
      close.innerHTML = '&times;'

      //msg 
      var msg = document.createElement('p');
      msg.setAttribute('class', 'w3-large w3-center');
      msg.textContent = "Chat Messages";

      var msgsDiv = document.createElement('div');
      msgsDiv.setAttribute('class', 'w3-pale-red');
      msgsDiv.setAttribute('id', 'msgs-div');
      msgsDiv.style.height = '400px';
      msgsDiv.style.overflowY = "scroll";
      msgsDiv.style.display = 'block';

      //send button
      var btnSend = document.createElement('span');
      btnSend.setAttribute('class', 'w3-button w3-display-bottomright');
      btnSend.style.marginBottom = '-2px';
      btnSend.setAttribute('id', 'sendBtn');
      btnSend.textContent = 'Send';

      //input text box
      var input = document.createElement('input');
      input.setAttribute('placeholder', 'Type Your Message');
      input.setAttribute('id', 'textMsg');
      input.setAttribute('type', 'text');
      input.setAttribute('class', 'w3-input');
      input.style.marginBottom = '-20px';
      input.style.width = '100%';


      // db.collection("room").doc(roomID).get()
      //   .then(doc => {
      //     if(doc.data().ad_id == ad_id){
      //       console.log('same hi ha bhai......');
      //       if (user.uid == doc.data().currentU) {
      //         recieverId = doc.data().otherU
      //       } else if (user.uid == doc.data().otherU) {
      //         recieverId = doc.data().currentU
      //       }
      //     }
      // })


      //********************fetching messages on runtime****************************

      db.collection('room').doc(roomID).collection('messages').orderBy('timestamp').onSnapshot(res => {
        let changes = res.docChanges();
        changes.forEach(changess => {

          console.log(changess.doc.data().current_User_Email);

          var msgsDivi = document.createElement('div');
          var senderName = document.createElement('p');
          msgsDivi.style.paddingLeft = '10px';
          msgsDivi.style.fontFamily = 'Roboto, sans-serif';
          msgsDivi.textContent = changess.doc.data().message;

          senderName.style.marginLeft = '10px';
          senderName.style.fontFamily = 'Roboto, sans-serif';
          senderName.style.fontSize = '10px';
          senderName.textContent = changess.doc.data().current_User_Email + ' at ' + changess.doc.data().msg_Time;

          msgsDiv.appendChild(msgsDivi);
          msgsDiv.appendChild(senderName);
          
        })
      })
      

      modal.appendChild(msg);
      modal.appendChild(close);
      modal.appendChild(msgsDiv);
      modal.appendChild(input);
      modal.appendChild(btnSend);
      mainDiv.appendChild(modal);
      chatDiv.appendChild(mainDiv);


      //**********************enter button send messages***************************


      document.getElementById('sendBtn').addEventListener("click", function (event) {
        event.preventDefault();
        // Sending message!
        db.collection('room').doc(roomID).collection('messages').add(
          {
            message: document.getElementById('textMsg').value,
            current_User: firebase.auth().currentUser.uid,
            current_User_Email: firebase.auth().currentUser.email,
            other_user: recieverId,
            msg_Time: formatAMPM(new Date()),
            timestamp: Date.now()
          })
      });
      document.getElementById('textMsg').value = "";

      //********** recever id swapping according to replies  *******************************/
      db.collection("room").doc(roomID).get()
        .then(doc => {

          if(doc.data().ad_id == ad_id){
            console.log('same hi ha bhai......');
            if (user.uid == doc.data().currentU) {
              recieverId = doc.data().otherU
            } else if (user.uid == doc.data().otherU) {
              recieverId = doc.data().currentU
            }
          }
          
      })


    }

  } else {
    let signoutmsg = document.createElement('h1');
    signoutmsg.setAttribute('class', 'w3-text-grey w3-center');
    signoutmsg.innerHTML = "Sign In To see Chats!";
    chatDiv.appendChild(document.createElement('br'));
    chatDiv.appendChild(signoutmsg);
  }
})
