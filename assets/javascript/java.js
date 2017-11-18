 $(document).ready(function(){
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC18VyMRO7nlPot3iz3rmZ0J4k_0zMS3no",
    authDomain: "train-time-2bf72.firebaseapp.com",
    databaseURL: "https://train-time-2bf72.firebaseio.com",
    projectId: "train-time-2bf72",
    storageBucket: "",
    messagingSenderId: "664072783607"
  };
  firebase.initializeApp(config);
//--variables--//
var database = firebase.database();

//--button click--//
$("#submit").on("click", function() {

//--variable values--//
  var name = $('#nameInput').val().trim();
    var dest = $('#destInput').val().trim();
    var time = $('#timeInput').val().trim();
    var freq = $('#freqInput').val().trim();

//--Firebase--//
  database.ref().push({
    name: name,
    dest: dest,
      time: time,
      freq: freq,
      timeAdded: firebase.database.ServerValue.TIMESTAMP
  });
  //--NO REFRESH!!!--//
  $("input").val('');
    return false;
});

//--child fuction--//
database.ref().on("child_added", function(childSnapshot){
  var name = childSnapshot.val().name;
  var dest = childSnapshot.val().dest;
  var time = childSnapshot.val().time;
  var freq = childSnapshot.val().freq;

  console.log("Name: " + name);
  console.log("Destination: " + dest);
  console.log("Time: " + time);
  console.log("Frequency: " + freq);

  //--convert train time--//
  var freq = parseInt(freq);
  //--current time--//
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment().format('HH:mm'));
  var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
  console.log("DATE CONVERTED: " + dConverted);
  var trainTime = moment(dConverted).format('HH:mm');
  console.log("TRAIN TIME : " + trainTime);
  
  var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
  var tDifference = moment().diff(moment(tConverted), 'minutes');
  console.log("DIFFERENCE IN TIME: " + tDifference);
  //--time left--//
  var tRemainder = tDifference % freq;
  console.log("TIME REMAINING: " + tRemainder);
  //--time in minutes until next train--//
  var minsAway = freq - tRemainder;
  console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
  //--next train--//
  var nextTrain = moment().add(minsAway, 'minutes');
  console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
  //--console.log(ish)--//

 //--table data--//
$('#currentTime').text(currentTime);
$('#trainTable').append(
    "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
    "</td><td id='destDisplay'>" + childSnapshot.val().dest +
    "</td><td id='freqDisplay'>" + childSnapshot.val().freq +
    "</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
    "</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
 },

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});

});