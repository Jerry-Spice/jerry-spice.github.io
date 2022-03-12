var deck = [];
var hand = [];
var oppHand = [];
var handObjects = [];
var opphandObjects = [];

var playerScore = 0;
var opponentScore = 0;
var wager = 100;

var warButton = document.getElementById("warButton");
var handEL = document.getElementById("hand");
var opponentHandEl = document.getElementById("opponenet");
var playerScoreEl = document.getElementById("playerscore");
var opponenetScoreEl = document.getElementById("opponentscore");
var popup = document.getElementById("result-pop-up");
var popupresult = document.getElementById("result");
var popuppoints = document.getElementById("points-awarded");


function createDeck() {
    for (var i = 1; i <= 4; i++) {
        for (var g = 1; g <= 13; g++) {
            var tempCard = new Card(g, i);
            deck.push(tempCard)
        }
    }
}

function shuffleDeck(timesToShuffle) {
    var deckLength = deck.length;
    for (var x = 0; x < timesToShuffle; x++) {
        for (var i = 0; i < deckLength; i++) {
            var randomCardIndex = Math.floor(Math.random() * deck.length);
            //console.log(randomCardIndex);  
            deck.push(deck.splice(randomCardIndex, 1)[0]);
        }
    }
}

function dealHand(cardsToDeal) {
    for (var i = 0; i < cardsToDeal; i++) {
        var tempArray = deck.splice(0,1)
        // console.log(tempArray);
        hand.push(tempArray[0]);
    }
}

function dealOppHand(cardsToDeal) {
    for (var i = 0; i < cardsToDeal; i++) {
        var tempArray = deck.splice(0,1)
        // console.log(tempArray);
        oppHand.push(tempArray[0]);
    }
}

function clearHand() {
    if (hand.length > 0) {
        for (var i = 0; i < hand.length; i++) {
            deck.push(hand.pop());
        }
    }
}

function clearoppHand() {
    if (oppHand.length > 0) {
        for (var i = 0; i < oppHand.length; i++) {
            deck.push(oppHand.pop());
        }
    }
}

function createCardObjects() {
    
    var cardIndex = 0;
    for (var i = 0; i < hand.length; i++) {
        //creating the elements
        var tableData = document.createElement("td");
        var cardDiv = document.createElement("div");
        var cardValue = document.createElement("h1");
        var flippedcardValue = document.createElement("h1");
        var suitValue = document.createElement("h1");
        var flippedsuitValue = document.createElement("h1");
        //setting thier classes
        cardDiv.className = "card";
        cardDiv.id = "card"+cardIndex;
        cardValue.className = "value";
        flippedcardValue.className = "flipvalue";
        suitValue.className = "suit";
        flippedsuitValue.className = "flipsuit";
        //card div style properties
        // cardDiv.style = "position: absolute; left:"+i*210+"px;top:0px;";
        //making the card details children of the main card
        cardDiv.appendChild(cardValue);
        cardDiv.appendChild(flippedcardValue);
        cardDiv.appendChild(suitValue);
        cardDiv.appendChild(flippedsuitValue);
        //setting the card child info 
        cardValue.innerHTML = hand[i].ValueToString();
        flippedcardValue.innerHTML = hand[i].ValueToString();
        suitValue.innerHTML = hand[i].SuitToString();
        flippedsuitValue.innerHTML = hand[i].SuitToString();
        // adding it to the card objects so i can remove it later
        tableData.appendChild(cardDiv);
        handObjects.push(tableData);
        //adding the elements to the DOM
        
        handEL.appendChild(tableData);
        cardIndex++;
    }
    //opponent hand
    for (var i = 0; i < oppHand.length; i++) {
        //creating the elements
        var tableData = document.createElement("td");
        var cardDiv = document.createElement("div");
        var cardValue = document.createElement("h1");
        var flippedcardValue = document.createElement("h1");
        var suitValue = document.createElement("h1");
        var flippedsuitValue = document.createElement("h1");
        //setting thier classes
        cardDiv.className = "card";
        cardDiv.id = "card"+cardIndex;
        cardValue.className = "value";
        flippedcardValue.className = "flipvalue";
        suitValue.className = "suit";
        flippedsuitValue.className = "flipsuit";
        //card div style properties
        // cardDiv.style = "position: relative; left:"+i*210+"px;top:"+i*-280+"px;";
        //making the card details children of the main card
        cardDiv.appendChild(cardValue);
        cardDiv.appendChild(flippedcardValue);
        cardDiv.appendChild(suitValue);
        cardDiv.appendChild(flippedsuitValue);
        //setting the card child info 
        cardValue.innerHTML = oppHand[i].ValueToString();
        flippedcardValue.innerHTML = oppHand[i].ValueToString();
        suitValue.innerHTML = oppHand[i].SuitToString();
        flippedsuitValue.innerHTML = oppHand[i].SuitToString();
        //adding it to the objects list to remove it later
        tableData.appendChild(cardDiv);
        opphandObjects.push(tableData);
        //adding the elements to the DOM
        
        opponentHandEl.appendChild(tableData);
        cardIndex++;
    }
}
function destroyCardObjects() {
    for (var i = handObjects.length - 1; i >= 0 ; i--) {
        handEL.removeChild(handObjects[i]);
        handObjects.pop();
    }
    for (var i = opphandObjects.length - 1; i >= 0 ; i--) {
        opponentHandEl.removeChild(opphandObjects[i]);
        opphandObjects.pop();
    }
}

function runGame() {
    popupHide();
    console.log("running game")
    if (handObjects.length > 0) {
        console.log("destroying cards")
        destroyCardObjects();
    }
    
    clearHand();
    clearoppHand();
    shuffleDeck(1);
    dealHand(1);
    dealOppHand(1);
    createCardObjects();
    var levelOfWar = 0;
    var result = 0;
    wager = 100;
    while (result == 0) {
        result = evaluateResult(levelOfWar);
        if (result == -1) {
            //opponent wins
            popupresult.innerHTML = "You lose...";
            opponentScore += wager;
            opponenetScoreEl.innerHTML = opponentScore;
            popupDisplay();
            setTimeout(popupHide, 1000);
            // alert("You Lose...");
            clearHand();
            clearoppHand();
        }else if (result == 1) {
            //player wins
            popupresult.innerHTML = "You Win!";
            playerScore += wager;
            playerScoreEl.innerHTML = playerScore;
            popupDisplay();
            setTimeout(popupHide, 1000);
            // alert("You Win!");
            clearHand();
            clearoppHand();
        } else if (result == 0) {
            console.log("WAR!");
            //draw war
            levelOfWar++;
            wager+=100;
            dealHand(1);
            dealOppHand(1);
            destroyCardObjects();
            createCardObjects();
        }
    }
}

function popupDisplay() {
    popup.hidden = false;
    popuppoints.innerHTML = "+"+wager+" points awarded";
    
}

function popupHide() {
    popup.hidden = true;
}

function evaluateResult(levelOfWar) {
    /*
    if returns 1 then the player wins
    if returns -1 then the opponent wins
    */
    var handValue = hand[levelOfWar].value;
    var oppValue = oppHand[levelOfWar].value;
    //aces are high
    if (handValue == 1) {
        handValue = 14;
    }
    if (oppValue == 1) {
        oppValue = 14;
    }
    if (handValue > oppValue) {
        return 1;
    } else if (handValue < oppValue) {
        return -1;
    } else if (handValue == oppValue) {
        return 0;
    }
}

warButton.addEventListener("click", runGame);
createDeck();