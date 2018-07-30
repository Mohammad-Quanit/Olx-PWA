//Real time listener / changing authentication state
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		document.getElementById('account-Btn').innerHTML = user.email;
		document.getElementById('account-Btn').style.fontSize = '13px';
	} else {
		document.getElementById('account-Btn').innerHTML = '&nbsp;My Account';
		document.getElementById('log-out-link').style.display = "none";
	}
});

//logout click
document.getElementById('log-out').addEventListener('click', e => {
    firebase.auth().signOut().then(function(ress) {
        window.location.reload();
      }).catch(function(error) {
        alert(error);
      });
});