/*
    Ethan Penrose
    ITC 370
    11/24/2021
    Final Project - The Great Race
*/

const redLight = "images/traffic-light-red.png";
const greenLight = "images/traffic-light-green.png";

/*
    Number of pixels to the finish line.
*/
var finishLine = (window.innerWidth - (window.innerWidth * .35));
var winnerDeclared = false;

/*
    Cycle through a traffic light and either start or reset the race.
*/
function ChangeTrafficLightColor() {
    var trafficLight = document.getElementById("trafficLight");
    var trafficLightSrc = trafficLight.getAttribute("src");
    if (trafficLightSrc === redLight) {
        trafficLight.src = greenLight;
        StartRace();
    } else if (trafficLightSrc === greenLight) {
        trafficLight.src = redLight;
        ResetRace();
    }
}

/*
    Start the race.
*/
function StartRace() {
    winnerDeclared = false;
    MoveParticipant("participant1");
    MoveParticipant("participant2");
    MoveParticipant("participant3");
}

/*
    Reset the race participants back to the start.
*/
function ResetRace() {
    ResetParticipant("participant1");
    ResetParticipant("participant2");
    ResetParticipant("participant3");
}

/*
    Reset a participant back to the start.
    @param {string} participantId - The id of the participant.
*/
function ResetParticipant(participantId) {
    var participant = document.getElementById(participantId);
    participant.style.left = 0 + "px";
    participant.removeEventListener("click",  ChangeTrafficLightColor);

    var participantText = document.getElementById(participantId + "Text");
    participantText.innerHTML = "";
}

/*
    Move a race participant through the race until they cross the finish line.
    @param {string} participantId - The id of the participant.
*/
function MoveParticipant(participantId) {
    var participant = document.getElementById(participantId);
    var position = parseInt(participant.style.left, 10);
    if (isNaN(position)) {
        position = 0;
    }

    if (position < finishLine) {
        position += randomNumber(1, 5);
        participant.style.left = position + "px";
        setTimeout('MoveParticipant("' + participantId + '")', randomNumber(1, 5));
    } else {
        if (position >= finishLine && !winnerDeclared) {
            winnerDeclared = true;
            var winnerImg = document.getElementById(participantId);
            winnerImg.addEventListener("click", ChangeTrafficLightColor);

            var winnerText = document.getElementById(participantId + "Text");
            winnerText.innerHTML = "<strong>WINNER!</strong>";
            winnerText.style.textAlign = "right";
        }
    }
}

/*
    Generate a random number between two numbers.
    @param {number} min - The min (included) range number.
    @param {number} max - The max (excluded) range number.
    @returns {number} - The random number generated between min and max.
*/
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}