let resultsDiv = document.getElementById('results-div');
//results section designing
var a = 0
let div1;
let div2;
let link;
let image;
let div3;
let heading;
let time;
let place;
let price;
let message;

let recieverId = "";

//**********************showing all ads*******************************

function showAdsByCategory(categorie) {
  db.collection('advertise').where('ad_categorie', '==', categorie).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {


      div1 = document.createElement('div');
      div2 = document.createElement('div');
      link = document.createElement('a');
      image = document.createElement('img');
      div3 = document.createElement('div');
      heading = document.createElement('p');
      time = document.createElement('p');
      place = document.createElement('p');
      price = document.createElement('span');
      message = document.createElement('button');

      // console.log(change.doc.id)
      div1.setAttribute('id', 'div1');
      div1.setAttribute('class', 'w3-third');
      div1.addEventListener('click', event => {
        showAdDetails(event, change.doc.id)
      })

      div2.setAttribute('id', 'div2');
      div2.setAttribute('class', 'w3-card-2');

      link.setAttribute('id', 'link');
      // link.setAttribute('href', "ad-details.html");

      image.setAttribute('id', 'image' + a++);

      div3.setAttribute('id', 'div' + a++);
      div3.setAttribute('class', 'w3-container w3-white ');

      message.setAttribute('class', 'msgBtn w3-button w3-border w3-margin-bottom w3-border-lime-green w3-round-large w3-lime w3-right w3-hover-opacity w3-text-white w3-hover-text-white')
      message.setAttribute('onclick', 'initChat("Message Box")')

      heading.setAttribute('id', 'heading-content');
      time.setAttribute('id', 'time-content');
      price.setAttribute('id', 'priceId');
      place.setAttribute('id', 'placeId');

      // console.log(change.doc.data());

      div1.style.cursor = 'pointer';
      // div1.style.maxHeight = '500px';

      div3.style.maxheight = '70px';
      div3.style.marginBottom = '50px';

      image.style.width = '100%';
      image.style.height = '250px';

      heading.style.overflowx = 'hidden';
      resultsDiv.style.padding = "20px";

      heading.style.fontSize = "20px";
      heading.style.fontWeight = "bold";

      time.style.fontSize = "10px";
      time.style.color = "grey";
      time.style.fontWeight = "bold";

      price.style.fontSize = "20px";
      price.style.color = 'orange';
      price.style.cssFloat = 'right';
      price.style.marginTop = '20px';


      place.style.fontSize = "10px";
      place.style.color = "grey";
      place.style.fontWeight = "bold";

      message.style.marginTop = '-30px';
      // message.style.width = '30%';

      image.src = change.doc.data().ad_photos[0];
      heading.textContent = change.doc.data().ad_title;
      time.textContent = change.doc.data().ad_time;
      price.textContent = 'Rs : ' + change.doc.data().ad_owner_amnt;
      place.textContent = change.doc.data().ad_owner_city;
      message.textContent = 'Send Message';

      link.appendChild(image);

      div3.appendChild(heading);
      div3.appendChild(price);
      div3.appendChild(place);
      div3.appendChild(time);
      // div3.appendChild(message);

      div2.appendChild(link);
      div2.appendChild(div3);
      div1.appendChild(div2);

      resultsDiv.appendChild(div1);
    });
  });
}

// ************************************fetching results by query********************************

document.getElementById('search-Btn').addEventListener('click', (event) => {
  event.preventDefault();
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }

  let adInput = document.getElementById('ad-input').value;
  let cityInput = document.getElementById('city-input').value;

  db.collection('advertise').where('ad_title', '==', adInput).where('ad_owner_city', '==', cityInput).onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {

      div1 = document.createElement('div');
      div2 = document.createElement('div');
      link = document.createElement('a');
      image = document.createElement('img');
      div3 = document.createElement('div');
      heading = document.createElement('p');
      time = document.createElement('p');
      place = document.createElement('p');
      price = document.createElement('span');
      message = document.createElement('button');

      // console.log(change.doc.id)
      div1.setAttribute('id', 'div1');
      div1.setAttribute('class', 'w3-third');
      div1.addEventListener('click', event => {
        showAdDetails(event, change.doc.id)
      })

      div2.setAttribute('id', 'div2');
      div2.setAttribute('class', 'w3-card-2');

      link.setAttribute('id', 'link');
      // link.setAttribute('href', "ad-details.html");

      image.setAttribute('id', 'image' + a++);

      div3.setAttribute('id', 'div' + a++);
      div3.setAttribute('class', 'w3-container w3-white ');

      message.setAttribute('class', 'msgBtn w3-button w3-border w3-margin-bottom w3-border-lime-green w3-round-large w3-lime w3-right w3-hover-opacity w3-text-white w3-hover-text-white')
      // message.setAttribute('onclick', 'initChat("Message Box")')

      heading.setAttribute('id', 'heading-content');
      time.setAttribute('id', 'time-content');
      price.setAttribute('id', 'priceId');
      place.setAttribute('id', 'placeId');

      // console.log(change.doc.data());

      div1.style.cursor = 'pointer';
      // div1.style.maxHeight = '500px';

      div3.style.maxheight = '70px';
      div3.style.marginBottom = '50px';

      image.style.width = '100%';
      image.style.height = '250px';

      heading.style.overflowx = 'hidden';
      resultsDiv.style.padding = "20px";

      heading.style.fontSize = "20px";
      heading.style.fontWeight = "bold";

      time.style.fontSize = "10px";
      time.style.color = "grey";
      time.style.fontWeight = "bold";

      price.style.fontSize = "20px";
      price.style.color = 'orange';
      price.style.cssFloat = 'right';
      price.style.marginTop = '20px';


      place.style.fontSize = "10px";
      place.style.color = "grey";
      place.style.fontWeight = "bold";

      message.style.marginTop = '-30px';
      // message.style.width = '30%';

      image.src = change.doc.data().ad_photos[0];
      heading.textContent = change.doc.data().ad_title;
      time.textContent = change.doc.data().ad_time;
      price.textContent = 'Rs : ' + change.doc.data().ad_owner_amnt;
      place.textContent = change.doc.data().ad_owner_city;
      message.textContent = 'Send Message';

      link.appendChild(image);

      div3.appendChild(heading);
      div3.appendChild(price);
      div3.appendChild(place);
      div3.appendChild(time);
      // div3.appendChild(message);

      div2.appendChild(link);
      div2.appendChild(div3);
      div1.appendChild(div2);

      resultsDiv.appendChild(div1);

    });
  });
})


let adExists = false;

//showing ad details
function showAdDetails(event, ad_id) {
  event.preventDefault();
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }

  db.collection('advertise').doc(ad_id).get().then(docs => {
    if (docs.exists) {

      console.log("Ad ki id:", ad_id);
      // console.log("ad user id data:", docs.data().ad_uid);

      let divMain = document.createElement('div');
      let anotherDiv = document.createElement('div');
      let ad_categorie = document.createElement('p');
      // let ad_image = document.createElement('img');
      let ad_title = document.createElement('h1');
      let ad_desc = document.createElement('p');
      let ad_price = document.createElement('h2');
      let ad_owner_name = document.createElement('p');
      let ad_owner_number = document.createElement('span');
      let ad_time = document.createElement('p');
      let message = document.createElement('button');
      let favouritesIcon = document.createElement('span');

      divMain.setAttribute('class', 'container row');
      divMain.setAttribute('id', 'detail-div');

      anotherDiv.setAttribute('class', 'col-sm-6');
      anotherDiv.setAttribute('id', 'sub-div');

      let myCarousel = document.createElement('div');
      myCarousel.id = 'myCarousel';
      myCarousel.setAttribute('class', 'carousel slide col-sm-6');
      myCarousel.style.width = '50%';
      myCarousel.setAttribute('data-ride', 'carousel');
      let fullSlide =
        `
          <div class="carousel-inner">
          <div class="item active">
            <img src="${docs.data().ad_photos[0]}" style="width: 100%;" class="col-sm-6 w3-hover-opacity w3-image w3-card-4">
          </div>

          <div class="item">
            <img src="${docs.data().ad_photos[1]}" style="width: 100%;" class="col-sm-6 w3-hover-opacity w3-image w3-card-4">
          </div>
        
          <div class="item">
            <img src="${docs.data().ad_photos[2]}" style="width: 100%;" class="col-sm-6 w3-hover-opacity w3-image w3-card-4">
          </div>
        

        <a class="left carousel-control" href="#myCarousel" data-slide="prev">
          <span class="glyphicon glyphicon-chevron-left"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="right carousel-control" href="#myCarousel" data-slide="next">
          <span class="glyphicon glyphicon-chevron-right"></span>
          <span class="sr-only">Next</span>
        </a>

        </div>
      `
      myCarousel.innerHTML = fullSlide


      // ad_image.setAttribute('class', 'col-sm-6 w3-hover-opacity w3-image w3-card-4');
      // ad_image.setAttribute('id', 'ad-photo');
      // ad_image.src = docs.data().ad_photos;
      // ad_image.style.width = '550px';
      // ad_image.style.height = "400px ";
      // ad_image.style.marginRight = '20%';


      ad_title.setAttribute('id', 'title');
      ad_title.setAttribute('class', 'w3-text-black');
      ad_title.textContent = docs.data().ad_title.toUpperCase();
      ad_title.style.textDecoration = 'underline';
      ad_title.style.fontSize = '30px';
      ad_title.style.padding = '5px';
      ad_title.style.fontStyle = 'bold';
      ad_title.style.fontFamily = 'Roboto, sans-serif;';


      ad_categorie.setAttribute('id', 'categorie');
      ad_categorie.setAttribute('class', 'w3-text-grey');
      ad_categorie.textContent = 'Categorie: ' + docs.data().ad_categorie;
      ad_categorie.style.fontSize = '20px';
      ad_categorie.style.padding = '10px';
      ad_categorie.style.fontFamily = '"Roboto", sans-serif;';

      ad_desc.setAttribute('id', 'description');
      ad_desc.setAttribute('class', 'w3-text-grey');
      ad_desc.textContent = 'Description: ' + docs.data().ad_description;
      ad_desc.style.fontSize = '20px';
      ad_desc.style.padding = '5px';
      ad_desc.style.fontFamily = '"Roboto", sans-serif;';

      ad_owner_name.setAttribute('id', 'owner');
      ad_owner_name.setAttribute('class', 'w3-text-grey');
      ad_owner_name.textContent = 'Seller: ' + docs.data().ad_owner_name;
      ad_owner_name.style.fontSize = '20px';
      ad_owner_name.style.padding = '5px';
      ad_owner_name.style.fontFamily = '"Roboto", sans-serif;';

      ad_price.setAttribute('id', 'price');
      ad_price.setAttribute('class', 'w3-text-orange w3-border w3-border-orange');
      ad_price.textContent = 'Price: ' + docs.data().ad_owner_amnt + ' Rs.';
      ad_price.style.fontSize = '20px';
      ad_price.style.width = '200px';
      ad_price.style.padding = '10px';
      ad_price.style.fontFamily = 'Roboto, sans-serif';

      ad_time.setAttribute('id', 'time');
      ad_time.setAttribute('class', '');
      ad_time.textContent = docs.data().ad_time;
      ad_time.style.fontSize = '12px';
      ad_time.style.padding = '5px';
      ad_time.style.fontFamily = 'Roboto, sans-serif';

      message.setAttribute('class', 'msgBtn w3-button w3-border w3-border-lime-green w3-round-large w3-lime w3-hover-opacity w3-text-white w3-hover-text-white')
      message.setAttribute('id', 'messageBtn');
      message.textContent = 'Send Message';


      ad_owner_number.setAttribute('id', 'number');
      ad_owner_number.setAttribute('class', 'w3-margin-left w3-text-black w3-border w3-border-lime w3-round-large');
      ad_owner_number.textContent = docs.data().ad_owner_num;
      ad_owner_number.style.fontSize = '20px';
      ad_owner_number.style.padding = '7px';
      ad_owner_number.style.fontFamily = 'Roboto, sans-serif';


      favouritesIcon.style = 'font-size:40px; color:grey; float:left; cursor: pointer';
      favouritesIcon.id = 'favIcon';
      favouritesIcon.setAttribute('class', 'fa fa-heart');


      //************checking this ad is fav or not on page load *********/
      db.collection('favourites')
        .where(firebase.auth().currentUser.uid, '==', true)
        .where(ad_id, "==", true)
        .get().then(respo => {
          respo.forEach(docsi => {
            adExists = true;
            console.log('exists krta ha', docsi.data());
            favouritesIcon.style = 'font-size:40px; color:orange; cursor: pointer';
          });
        })


      //************checking this ad is fav or not and make fav icon orange *********/
      favouritesIcon.addEventListener('click', () => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            db.collection('favourites')
              .where(firebase.auth().currentUser.uid, '==', true)
              .where(ad_id, "==", true)
              .get().then(respo => {
                respo.forEach(docsi => {
                  adExists = true;
                  console.log('exists krta ha', docsi.id)

                  //deleting existing fav ad from clicking
                  db.collection("favourites").doc(docsi.id).delete().then(function () {
                    popup("Successfully Removed from favouties");
                    favouritesIcon.style = 'font-size:40px; color:grey; cursor: pointer';
                  }).catch(function (error) {
                    console.error("Error removing document: ", error);
                  });
                  
                });
                if (adExists == false) {
                  db.collection('favourites').add({
                    [ad_id]: true,
                    [firebase.auth().currentUser.uid]: true,
                    favAds: docs.data()
                  }).then(reso => {
                    favouritesIcon.style = 'font-size:40px; color:orange; cursor: pointer';
                    popup('Succesfully Added to your favourites');
                  }).catch(err => console.error(err));
                }
              })
              .catch(err => console.error(err))
          } else {
            popup('Please Sign in first!')
          }
        })
      });


      anotherDiv.appendChild(ad_title);
      anotherDiv.appendChild(ad_categorie);
      anotherDiv.appendChild(ad_desc);
      anotherDiv.appendChild(ad_owner_name);
      anotherDiv.appendChild(ad_time);
      anotherDiv.appendChild(ad_price);
      anotherDiv.appendChild(document.createElement('br'));
      anotherDiv.appendChild(message);
      anotherDiv.appendChild(ad_owner_number);
      anotherDiv.appendChild(document.createElement('br'));
      anotherDiv.appendChild(document.createElement('br'));
      anotherDiv.appendChild(favouritesIcon);


      divMain.appendChild(myCarousel);
      divMain.appendChild(anotherDiv);

      resultsDiv.appendChild(divMain);

      //*********************  Initialize chat room ***********************/
      document.getElementById('messageBtn').addEventListener('click', () => {
        console.log('other user id ' + docs.data().ad_uid)
        initChat(docs.data().ad_uid, ad_id);
      })
    } else {
      console.log("No such document!");
    }
  })
}

var chatExist = false;
// chat function
function initChat(reciverId, ad_ID) {
  //******************************Creating room info***********************************************
  firebase.auth().onAuthStateChanged(user => {
    if (user) {

      //********checking whether same users ad room exist******* */
      db.collection('room').where('users.' + firebase.auth().currentUser.uid, '==', true).where('users.' + reciverId, '==', true).get().then(resp => {
        // debugger
        resp.forEach(room => {

          // ***************if ad exist then fetch their msgs*******
          if (ad_ID == room.data().ad_id) {
            // console.log(room.data().message);
            chatExist = true;
            console.log('Ye ha phle se');
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

            //send button
            var btnSend = document.createElement('span');
            btnSend.setAttribute('class', 'w3-button w3-display-bottomright');
            btnSend.style.marginBottom = '-2px';
            btnSend.setAttribute('id', 'sendBtn');
            btnSend.textContent = 'Send';


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


            var input = document.createElement('input');
            input.setAttribute('placeholder', 'Type Your Message');
            input.setAttribute('id', 'textMsg');
            input.setAttribute('type', 'text');
            input.setAttribute('class', 'w3-input');
            input.style.marginBottom = '-20px';
            input.style.width = '100%';



            //********************fetching messages on runtime****************************
            console.log('Room id ', room.id);

            db.collection('room').doc(room.id).collection('messages').orderBy('timestamp').onSnapshot(res => {
              let changes = res.docChanges();
              changes.forEach(changess => {
                // console.log(changess.doc.data().message);

                var msgsDivi = document.createElement('div');
                var senderName = document.createElement('p');
                msgsDivi.style.paddingLeft = '10px';
                msgsDivi.style.fontFamily = 'Roboto, sans-serif'
                msgsDivi.textContent = changess.doc.data().message;

                senderName.style.marginLeft = '10px';
                senderName.style.fontFamily = 'Roboto, sans-serif';
                senderName.style.fontSize = '10px';
                senderName.textContent = changess.doc.data().current_User_Email + ' at ' + changess.doc.data().msg_Time;

                msgsDiv.appendChild(msgsDivi);
                msgsDiv.appendChild(senderName);
                document.getElementById('textMsg').value = ""
              })
            })

            //*******************appending html**********************
            modal.appendChild(msg);
            modal.appendChild(close);
            modal.appendChild(msgsDiv);
            modal.appendChild(input);
            modal.appendChild(btnSend);
            mainDiv.appendChild(modal);
            resultsDiv.appendChild(mainDiv);


            //********** recever id swapping according to replies  *******************************/
            db.collection("room").doc(room.id).get()
              .then(doc => {

                if (doc.data().ad_id == ad_ID) {
                  console.log('same hi ha bhai......');
                  if (user.uid == doc.data().currentU) {
                    recieverId = doc.data().otherU
                  } else if (user.uid == doc.data().otherU) {
                    recieverId = doc.data().currentU
                  }
                }

              })
            //**********************enter button send messages***************************


            document.getElementById('sendBtn').addEventListener("click", function (event) {
              console.log(recieverId)
              event.preventDefault();
              // Sending message!
              db.collection('room').doc(room.id).collection('messages').add(
                {
                  message: document.getElementById('textMsg').value,
                  current_User: firebase.auth().currentUser.uid,
                  current_User_Email: firebase.auth().currentUser.email,
                  other_user: recieverId,
                  msg_Time: formatAMPM(new Date()),
                  timestamp: Date.now()
                })

            });
          }
        })


        // ***************if room of ad not exist then creting new one*******
        if (chatExist == false) {
          console.log('created new room')
          db.collection('room').add(
            {
              currentU: firebase.auth().currentUser.uid,
              otherU: reciverId,
              createdAt: formatAMPM(new Date()),
              users: {
                [firebase.auth().currentUser.uid]: true,
                [reciverId]: true
              },
              ad_id: ad_ID
            }).then(room => {
              console.log('ad ki id:', ad_ID);
              console.log('room id***', room.id);
              console.log('user ad id***', reciverId);
              console.log('currwnt user id***', firebase.auth().currentUser.uid);
              currentRoomId = room.id;

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
                // window.location.reload();
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


              var input = document.createElement('input');
              input.setAttribute('placeholder', 'Type Your Message');
              input.setAttribute('id', 'textMsg');
              input.setAttribute('type', 'text');
              input.setAttribute('class', 'w3-input');
              input.style.marginBottom = '-20px';
              input.style.width = '100%';



              //********************fetching messages on runtime****************************

              db.collection('room').doc(currentRoomId).collection('messages').onSnapshot(res => {
                let changes = res.docChanges();
                changes.forEach(changess => {
                  var msgsDivi = document.createElement('div');
                  var senderName = document.createElement('div');
                  msgsDivi.setAttribute('class', 'msgs');
                  // msgsDivi.style.width = '20%';
                  msgsDivi.style.paddingLeft = '10px';
                  msgsDivi.style.fontFamily = 'Roboto, sans-serif';
                  msgsDivi.textContent = changess.doc.data().message;

                  senderName.style.marginLeft = '10px';
                  senderName.style.fontFamily = 'Roboto, sans-serif';
                  senderName.style.fontSize = '10px';
                  senderName.textContent = changess.doc.data().current_User_Email + ' at ' + changess.doc.data().msg_Time;
                  console.log(changess.doc.data());
                  msgsDiv.appendChild(msgsDivi);
                  msgsDiv.appendChild(senderName);
                  document.getElementById('textMsg').value = ""
                })
              })
              modal.appendChild(msg);
              modal.appendChild(close);
              modal.appendChild(msgsDiv);
              modal.appendChild(input);
              modal.appendChild(btnSend);
              mainDiv.appendChild(modal);
              resultsDiv.appendChild(mainDiv);


              //**********************enter button send messages***************************


              document.getElementById('sendBtn').addEventListener("click", function (event) {
                event.preventDefault();
                // Sending message!
                db.collection('room').doc(currentRoomId).collection('messages').add(
                  {
                    message: document.getElementById('textMsg').value,
                    current_User: firebase.auth().currentUser.uid,
                    current_User_Email: firebase.auth().currentUser.email,
                    other_user: reciverId,
                    msg_Time: formatAMPM(new Date()),
                    timestamp: Date.now()
                  })
              });

            })
        }


      }).catch(e => {
        console.error(e);
      })




    } else {
      popup('please Sign in First!')
    }
  });




}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (strTime);
}

function popup(paraMsg) {


  var mainDiv = document.createElement('div');
  mainDiv.setAttribute('class', 'w3-modal');
  mainDiv.setAttribute('id', 'main-div');
  mainDiv.style.display = 'block';

  //creating result popup/modal
  var modal = document.createElement('div');
  modal.setAttribute('class', 'w3-modal-content w3-animate-zoom w3-card-4 w3-pale-green w3-padding-16');
  modal.setAttribute('id', 'result-modal');
  modal.style.width = '60%';

  //creating close button
  var close = document.createElement('span');
  close.setAttribute('class', 'w3-button w3-display-topright w3-hover-red');
  close.addEventListener('click', () => {
    document.getElementById('main-div').remove();
    // window.location.reload();
  });
  close.innerHTML = '&times;'

  //msg 
  var msg = document.createElement('p');
  msg.setAttribute('class', 'w3-large w3-center');
  msg.textContent = paraMsg;
  // msg.textContent = "Please Provide Some task!";

  modal.appendChild(msg);
  modal.appendChild(close);
  mainDiv.appendChild(modal);
  resultsDiv.appendChild(mainDiv);
}


