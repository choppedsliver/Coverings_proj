const socket = io();
let word = document.querySelector(".drag");
let allwords = document.getElementsByClassName("drag");
let proof = document.querySelector(".proof");

console.log(allwords);



for( i = 0; i <allwords.length; i ++) {
console.log(allwords[i]);


// put them in a random position...

allwords[i].style.top = Math.random() * 500 + "px";
allwords[i].style.left = Math.random() * 500 + "px";
allwords[i].style.position = "absolute";


allwords[i].onmousedown = function(event) {
  // console.log(event);

  let shiftX = event.clientX - event.target.getBoundingClientRect().left;
  let shiftY = event.clientY - event.target.getBoundingClientRect().top;

  // console.log(shiftX, shiftY)

  event.target.style.position = 'absolute';
  event.target.style.zIndex = 1000;
  document.body.append(event.target);

  moveAt(event.pageX, event.pageY);

  // moves the ball at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    event.target.style.left = pageX - shiftX + 'px';
    event.target.style.top = pageY - shiftY + 'px';
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the ball on mousemove
  document.addEventListener('mousemove', onMouseMove);

  // drop the ball, remove unneeded handlers
  event.target.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    event.target.onmouseup = null;
  };

};

allwords[i].ondragstart = function() {
  return false;
};

allwords[i].addEventListener('mouseup', (event) => {;


  // console.log(event);
  //get the x/y and the specific word that you are moving
  // console.log(event.pageX, event.pageY);


  let shiftX = event.clientX - event.target.getBoundingClientRect().left;
  let shiftY = event.clientY - event.target.getBoundingClientRect().top;

  let identifier = event.target.id 

  // console.log(event.target.id)


  //The proof begins here
  // proof.style.position = 'absolute';
  // proof.style.left = event.pageX - shiftX + 'px';
  // proof.style.top = event.pageY - shiftY + 'px';
  
  // console.log(allwords[i].screenX);
  
  //package that up into a JSON object

  var data = {
    "magId": identifier,
    "pageX": event.pageX,
    "pageY": event.pageY,
    "shiftX": shiftX,
    "shiftY": shiftY

  };

  // console.log(data)

  socket.emit("magUpdate", data);


});


}; // end of the loop

//update the client side
socket.on("clientUpdate",(incomingData)=>{
  // console.log("got some data")
  // console.log(incomingData)

  //update the client
  //get the id out of the incoming data
  //selecting that id using javascript https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    const wordSelect = document.getElementById(incomingData.magId);
    // console.log(wordSelect);
  //changing the top and left pos of the selected id to match the incoming data pageX pageY

    // let shiftX = wordSelect.clientX - wordSelect.getBoundingClientRect().left;
    // let shiftY = wordSelect.clientY - wordSelect.getBoundingClientRect().top;

    // console.log(wordSelect.clientX, wordSelect.clientY);
    // console.log(shiftX, shiftY);

    wordSelect.style.left = incomingData.pageX - incomingData.shiftX + 'px';
    wordSelect.style.top = incomingData.pageY - incomingData.shiftY + 'px';
    // console.log(incomingData.clientX,incomingData.clientY);
    // console.log(incomingData.shiftX,incomingData.shiftY);
    // console.log(wordSelect.style.left);
    wordSelect.style.position = 'absolute';
    wordSelect.style.zIndex = 1000;

   


})