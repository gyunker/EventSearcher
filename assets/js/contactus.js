
//1. Initiate Firebase
var config = {
	apiKey: "AIzaSyCzsHPtV_RVxAtvcM5TvZhNwzzGthz2cKI",
	authDomain: "eventsearcherproject.firebaseapp.com",
	databaseURL: "https://eventsearcherproject.firebaseio.com",
	projectId: "eventsearcherproject",
	storageBucket: "eventsearcherproject.appspot.com",
	messagingSenderId: "81964030160"
  };

firebase.initializeApp(config);
var database = firebase.database();

// code for submit button click on the contact us page
$("#submit").on("click", function(){
	event.preventDefault();
	//Grap user input
    var name = $("#name").val().trim();
    var email = $("#email").val().trim();
	var message = $("#message").val().trim();
	
	//Create local temporary object to hold data
    var messageInfo = {
        name: name,
        email: email,
        message: message
	}
	
	//Upload data to the database
	database.ref().push(messageInfo);
	
	//Log everything to console
    console.log(messageInfo.name);
    console.log(messageInfo.email);
	console.log(messageInfo.message);
	
	//Clear all info from the form
    $("#name").val("");
    $("#email").val("");
    $("#message").val("");
})