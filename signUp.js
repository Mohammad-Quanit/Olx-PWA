firebase.auth().onAuthStateChanged(user => {
	if (user) {
		document.getElementById('account-Btn').innerHTML = user.email;
		document.getElementById('account-Btn').style.fontSize = '13px';
	} else {
		document.getElementById('account-Btn').innerHTML = '&nbsp;My Account';
	}
});

//create account function

let signUp = document.getElementById('signUp-Btn')
signUp.addEventListener('click', e => {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var pwd = document.getElementById('pwd').value;

    console.log(name, email, pwd);
    if (name == "" || email == "" || pwd == "") {
        popup('Please Provide All Details!');
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, pwd)
            .then(function (res) {

                console.log('res =>', res.user.uid);

                db.collection('users').doc(res.user.uid).set({ name, pwd, email })
                    .then(() => {
                        popup('Registered Successfully!');
                        console.log('Added in db');
                        //Real time listener / changing authentication state
                        firebase.auth().onAuthStateChanged(user => {
                            if (user) {
                                popup("Successfully Signed-In.");
                                window.location.reload();
                            }
                        });
                    })
                    .catch((e) => {
                        console.log('error Adding in db');
                    });
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error(errorCode + '&' + errorMessage);
                popup(errorMessage);
            });
    }
});



// popup for validation
function popup(paraMsg) {

    var mainDiv = document.createElement('div');
    mainDiv.setAttribute('class', 'w3-modal');
    mainDiv.setAttribute('id', 'main-div');
    mainDiv.style.display = 'block';

    //creating result popup/modal
    var modal = document.createElement('div');
    modal.setAttribute('class', 'w3-modal-content w3-animate-zoom w3-card-4 w3-pale-red w3-padding-16');
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
    document.querySelector('body').appendChild(mainDiv);
}

