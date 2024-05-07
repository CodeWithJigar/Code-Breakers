var rows = 4;
var columns = 4;

var currTile;
var otherTile;

var turns = 0;

// Set the countdown time in seconds
const countdownTimeInSeconds = 300;


window.onload = function() {
    //initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "../images/blank2.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "../images/" + pieces[i] + ".jpg";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }


    // Start the countdown when the page loads
    countdown();

    // audio
    playbackgroundAudio();

}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}

// Function to update the timer display
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('timer').innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to handle the countdown
function countdown() {
    let seconds = countdownTimeInSeconds;
    const timerInterval = setInterval(() => {
        seconds--;
        updateTimerDisplay(seconds);
        if (seconds <= 0) {
            clearInterval(timerInterval);
            // Redirect to a new page when time is over
            window.location.href = 'lost.html'; // Change 'newpage.html' to your desired URL
        }
    }, 1000); // Update every second

    document.getElementById('hint-btn').addEventListener('click', function() {
        // Decrease the timer count by 20 seconds
        seconds -= 20;
        // Ensure the timer doesn't go below zero
        seconds = Math.max(0, seconds);
        updateTimerDisplay(seconds);
        // Display a pop-up notification
        alert("You lost 20 seconds!");

        var hintlostaudio = document.getElementById('hintlostaudio');
        hintlostaudio.volume = 1;
        hintlostaudio.play();
    });
}

function playbackgroundAudio(){
    var backgroundaudio = document.getElementById("backgroundaudio");
    backgroundaudio.volume = 0.7; // Set the volume to 50% (0.5) of its maximum (0 to 1)
    backgroundaudio.play();
}


document.getElementById("pwd").addEventListener("keypress", function(event) {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
        // Get the value entered into the password input field
        var password = document.getElementById("pwd").value;

        // Check if the password is equal to "28196"
        if (password === "28196") {
            if(16 <= turns && turns <=20){
                window.location.href = "win.html";
            }else{
                alert("Complete in Minimum number of turns")
            }
            

        } else if(password === "467973"){
            if(turns === 16){
                window.location.href = "win.html";
            }else{
                alert("Complete in Minimum number of turns")
            }
        }else {
            // Display an error message or perform other actions if needed
            alert("Incorrect password!");
        }
    }
});


// pop up 

// JavaScript to handle the pop-up functionality
// JavaScript to handle the pop-up functionality
const popupButton = document.getElementById('hint-btn');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');

popupButton.addEventListener('click', function() {
    // Show the pop-up
    popup.style.display = 'block';
    overlay.style.display = 'block';
});

closeButton.addEventListener('click', function() {
    // Close the pop-up when close button is clicked
    popup.style.display = 'none';
    overlay.style.display = 'none';
});

popup.addEventListener('click', function(event) {
    // Close the pop-up if user clicks outside of it
    if (event.target === popup) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
});






