//********* Firebase Script **********  
// Our Firebase config
var config = {
    apiKey: "AIzaSyAKSW8i3jQpqQomzVF73AVDIOY44H_0Jgs",
    authDomain: "myinsta-e6609.firebaseapp.com",
    databaseURL: "https://myinsta-e6609.firebaseio.com",
    projectId: "myinsta-e6609",
    storageBucket: "myinsta-e6609.appspot.com",
    messagingSenderId: "904929560739"
};

// Initialize Firebase app using the above config
firebase.initializeApp(config);


var db = firebase.firestore();


// User Chack

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('body').addClass('logged-in');
    $('#currentUser p').html('Logged-in as : '+firebase.auth().currentUser.email);
    $('#loginModal').modal('hide');   
  } else {
    $('body').removeClass('logged-in');
    $('#loginModal').modal('hide');
  }
});





function getPromos() {
    // Retrieved items will be stored here, then displayed in #offers div
    items = "";

    // Query db and get data 
    db.collection("promos").orderBy('dateAdded','desc').get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            // this variable contains single row/document/record from promos firebase db
            allData = doc;
            data = doc.data();
            // console.log(doc);
            // Injecting db fields into html
            items += '<div class="row offer-item" data-ID=' + doc.id + ' data-percentage='+data.percentage+'>'

            // edit/delete icons : onlu shown to logged in user
            items += '<a  class="edit"><img src="img/edit.svg" alt="" /></a>';
            items += '<a  class="delete"><img src="img/delete.svg" alt="" /></a>';

            items += '<a class="coupon" href="#">'
            items += '<img src="img/coupon.png" alt="">';
            items += '<p>' + data.text + '</p> <span>'+data.percentage+'%</span>';
            items += '</a>';
            items += '</div>';
        });

        // inserting retrived data with html into #offers div
        $('#offers .container').html(items);


    });
}

//********* #Firebase Script **********  


//*************************** CRUD ****************************  

$(function() {

    $('#addNewOffer').on('click', function() {
        $('#addNewOfferModal').modal('show');
    });


    // Add new Offer
    $('#saveOffer').on('click', function() {

        offerText = $('#offerText').val();
        offerPercentage = $('#offerText').val();
        addItem(offerText, offerPercentage);
    });


    // Delete Item
    $(document).on('click', '.offer-item .delete', function() {
        itemID = $(this).parent().attr('data-id');
        if(confirm('Delete this item! Are you sure?')){
        	$(this).parent().addClass('transparent');
        deleteItem(itemID);
    }
    });

    // Update item (Show Modal)
    $(document).on('click', '.offer-item .edit', function() {
    	parent=$(this).parent();
    	itemID=parent.attr('data-id');
		currentText = parent.find('p').text();
		currentPercentage = parent.attr('data-percentage');

		$('#currentOfferText').val(currentText);
		$('#currentPercentage').val(currentPercentage);
		$('#editOfferModal').attr('data-id',itemID);
		$('#editOfferModal').modal('show');
  
    });

    // Update Offer, excute the update function
    $('#updateOffer').on('click',function(){
    	itemID=$('#editOfferModal').attr('data-id');
    	updateItem(itemID);
    });




// End function
});


// Delete Item
function deleteItem(itemID) {

    db.collection("promos").doc(itemID).delete().then(function() {
        alert("Document successfully deleted!");
        $('[data-id='+itemID+']').slideUp('slow');
        // Everytime we update, delete or add item we reload the list from firestore db
        getPromos();

    }).catch(function(error) {
        alert("Error removing document: ", error);
    });
}


// Add Item
function addItem(text, percentage) {
	$('#addNewOfferModal input, #addNewOfferModal button').attr('disabled','disabled');
    db.collection("promos").add({
        text: text,
        percentage: percentage,
        dateAdded: new Date().getTime()
    }).then(function(docRef) {
    	alert('Promo added successfully!');
        $('#addNewOfferModal').modal('hide');

        // Everytime we update, delete or add item we reload the list from firestore db
        getPromos();

    }).catch(function(error) {

        $('#addNewOfferModal').modal('hide');
        $('#addNewOfferModal input, #addNewOfferModal button').removeAttr('disabled');
        console.log("Error adding item: ", error);
    });
}

// Update Item
function updateItem(itemID){
	
	$('#editOfferModal input,  #editOfferModal button').attr('disabled','disabled');
db.collection("promos").doc(itemID).set({
	
	text:$('#currentOfferText').val(),
	percentage:$('#currentPercentage').val(),
	dateAdded:new Date().getTime()

}).then(function(docRef) {

        $('#editOfferModal').modal('hide');
        $('#editOfferModal input, #editOfferModal button').removeAttr('disabled');
        	alert('Offer updated successfully');

        // Everytime we update, delete or add item we reload the list from firestore db
        getPromos();

    }).catch(function(error) {

        $('#editOfferModal').modal('hide');
        console.log("Error adding item: ", error);
    });;
}
//********* #CRUD **********


// Logn/Logout
// Firebase Login

$(function() {
    // Login
    $('#login a').on('click', function() {
        $('#loginModal').modal('show');
    });

    $('#loginButton').on('click', function(){
    	$('#loginrModal input,  #loginModal button').attr('disabled','disabled');
    	// Get login Data
    	email=$('#email').val();
    	password=$('#password').val();

    	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
            $('#loginrModal input,  #loginModal button').removeAttr('disabled');
            $('#loginrModal').modal('hide');
          } else {
            alert(errorMessage);
              $('#loginrModal input,  #loginModal button').removeAttr('disabled');
                $('#loginrModal').modal('hide');
          }
           $('#loginrModal input,  #loginModal button').removeAttr('disabled');
               $('#loginrModal').modal('hide');
          console.log(error);

       $('#loginModal').modal('hide');   
          
          // [END_EXCLUDE]
        });
        // [END authwithemail]
    });

     // Logout
        $('#logout').on('click', function(){
        	
        	firebase.auth().signOut();

        });







});




// firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
//           // Handle Errors here.
//           var errorCode = error.code;
//           var errorMessage = error.message;
//           // [START_EXCLUDE]
//           if (errorCode === 'auth/wrong-password') {
//             alert('Wrong password.');
//           } else {
//             alert(errorMessage);
//           }
//           console.log(error);
//           document.getElementById('quickstart-sign-in').disabled = false;
//           // [END_EXCLUDE]
//         });
//         // [END authwithemail]
      
      

