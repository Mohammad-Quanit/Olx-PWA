var currentRoomId;

//tooltip code
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

//Real time listener / changing authentication state
firebase.auth().onAuthStateChanged(user => {
	if (user) {
		document.getElementById('account-Btn').innerHTML = user.email;
		document.getElementById('account-Btn').style.fontSize = '15px';
	} else {
		document.getElementById('account-Btn').innerHTML = '&nbsp;My Account';
		document.getElementById('log-out').style.display = "none";
	}
});

//***********new ad submitting form************* */
function bla(event) {
	event.preventDefault();
	firebase.auth().onAuthStateChanged(user => {

		// if user is signed in
		if (user) {
			//adding categories with pic in database
			let adTitle = document.getElementById('ad-title').value;

			let e = document.getElementById("categories");
			let adCategories = e.options[e.selectedIndex].value;

			let adDesc = document.getElementById('ad-desc').value;

			let adOwnerName = document.getElementById('ad-owner-name').value;

			let adOwnerNumber = document.getElementById('ad-owner-phone').value;

			let ct = document.getElementById("ad-owner-city");
			let adOwnerCity = ct.options[ct.selectedIndex].value;

			let adOwnerAmount = document.getElementById('ad-owner-amnt').value;

			const d = new Date();
			const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			let day = months[d.getMonth()];
			// console.log(file);

			if (adTitle == "" || adCategories == "" || adDesc == "" || adOwnerName == "" || adOwnerNumber == "" || adOwnerCity == "" || adOwnerAmount == "") {
				popup("Please provide all Details!!!");
			} else {

				uploadImage().then((urls) => {
					for(var x=0; x<urls.length; x++){
						console.log('Ye Ri urls' + urls);
					}
					if (urls === undefined || urls.length == 0) {
						urls.push('https://webiconspng.com/wp-content/uploads/2016/12/Placeholder-Icon-File.png');
					}
					console.log(urls)
					var docData = {
						ad_uid: firebase.auth().currentUser.uid,
						ad_owner: firebase.auth().currentUser.email,
						ad_categorie: adCategories,
						ad_title: adTitle,
						ad_description: adDesc,
						// ad_photo: url,
						ad_owner_name: adOwnerName,
						ad_owner_num: adOwnerNumber,
						ad_owner_city: adOwnerCity,
						ad_owner_amnt: adOwnerAmount,
						ad_time: d.getDate() + '/' + day + '/' + d.getFullYear() + ' ' + formatAMPM(d),
						ad_photos: urls
					};

					db.collection('advertise').add(docData)

						.then(docRef => {

							popup('Successfully Submited.');
							console.log('Added new data with ID', docRef.id);
							currentRoomId = docRef.id;

							// emptying fields after submitting ad

							adTitle = document.getElementById('ad-title').value = "";
							adDesc = document.getElementById('ad-desc').value = "";
							adOwnerName = document.getElementById('ad-owner-name').value = "";
							adOwnerNumber = document.getElementById('ad-owner-phone').value = "";
							adOwnerAmount = document.getElementById('ad-owner-amnt').value = "";


						}).catch(err => {
							popup(err);
							console.log(err)
						})
				});

			}
		}
		// if not signed in
		else {
			popup('Please Sign In First');
		}
	});
}


function uploadImage() {
	var storageRef = firebase.storage().ref();
	let imgfiles = document.getElementById("photos").files; // use the Blob or File API
	console.log(typeof (imgfiles))
	var promises = [];

	for (var i = 0; i < imgfiles.length; i++) {
		var file = imgfiles[i];
		var imagesRef = storageRef.child('images/ads_' + Math.random().toString().substring(2, 6));
		var promise = new Promise((resolve, reject) => {
			imagesRef.put(file)
				.then(function (snapshot) {
					console.log('Uploaded a blob or file!', snapshot);
					imagesRef.getDownloadURL().then(function (url) {
						// console.log('URL *****', url)
						resolve(url);
					}).catch(function (error) {
						popup(error)
					});
				}).catch((e) => {
					popup(e)
				});
		})
		promises.push(promise);
	}

	return Promise.all(promises)

}



//time with format

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



// popup for validation
function popup(paraMsg) {

	var mainDiv = document.createElement('div');
	mainDiv.setAttribute('class', 'w3-modal');
	mainDiv.setAttribute('id', 'main-div');
	mainDiv.style.display = 'block';

	//creating result popup/modal
	var modal = document.createElement('div');
	modal.setAttribute('class', 'w3-modal-content w3-animate-zoom w3-card-4 w3-light-green w3-padding-16');
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


