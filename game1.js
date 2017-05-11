//Contains all the global variables and intro functions to the game

const SPACEBAR = 32;
//Indices for Supplies
const MONEY = 0;
const FOOD = 1;
const PARTS = 2;
const WHEEL = 0;
const AXLE = 1;
const TONGUE = 2;
const BAIT = 3;
const OXEN = 4;
const CLOTHING = 5;
//Indices for Status
const WEATHER = 0;
//Weather Options
const COOL = 0;
const RAINY = 1;
const COLD = 2;
const WARM = 3;
const HOT = 4;
const VERYRAINY = 5;
const HEALTH = 1;
//Health Options
const GOOD = 0;
const FAIR = 1;
const POOR = 2;
const VERYPOOR = 3;
const PACE = 2;
//Pace Options
const STEADY = 0;
const STRENUOUS = 1;
const GRUELING = 2;
const RATIONS = 3;
//Rations Options
const FILLING = 0;
const MEAGER = 1;
const BAREBONES = 2;
var spaceTxt = "<div><p>Press SPACE BAR to Continue</p></div>";
var locations = ["Kansas River crossing", "Big Blue River crossing", "Fort Kearney", "Chimney Rock", "Fort Laramie", "Independence Rock", "South Pass"];
var distance = [102, 82, 118, 250, 86, 190, 102];
const TOWN = 1;
const RIVER = 2;
const DIVIDE1 = 3;
const DIVIDE2 = 4
const END = 5;
var locType = [RIVER, RIVER, TOWN, 0, TOWN, 0, DIVIDE1];
var months = ["January", "Februrary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var price = [.2, 10, 20, .1, 10]
//Indicies for price
const FOOD_COST = 0;
const CLOTHING_COST = 1;
const OXEN_COST = 2;
const BAIT_COST = 3;
const WAGON_COST = 4;
var characters;
var numCharacters = 5;
var hp = [100, 100, 100, 100, 100];
var supplies = [0, 0, 0, 0, 0, 0];
//Holder for supplies you want to buy
var tempSupplies = [0, 0, 0, 0, 0, 0];
var parts = [0, 0, 0];
//Holder for parts you want to buy
var tempParts = [0, 0, 0];
var gameStatus = [0, 0, 0, 0];
var riverWidth = 0;
var riverDepth = 0;
var riverChange = 2;
var job;
var score = 0;
var month = 2;
var day = 1;
var year = 1848;
var totalTraveled = 0;
var tempTraveled = 0;
var currWeather = "Cool";
var currHealth = "Good";
var currPace = "Steady";
var currRations = "Filling";
var currLocation = "Independence";
var currType = TOWN;
var randMsg = "";
var ferryWait = 0;
var brokenPart = 3;
var oxenInjured = 0;
var soundOn = 1;
var gameDone = 0;

welcome();

function welcome() {
    var t = "<div class='container'>\
				<h1>The Oregon Trail!</h1>\
				<div id='innerPage'>\
				<button class='button button2' onclick='getOccupation()'><span>Travel the Trail</span></button><br>\
				<button class='button button2' onclick ='getInfo()'><span>Learn About the Trail</span></button><br>\
				<button class='button button2' onclick=''><span>Top 10 Players</span></button><br>\
				<button id='sound' class='button button2' onclick='toggleSound()'><span>Turn Off Sound</span></button><br>\
				<button class='button button2' onclick='quit()'><span>Quit</span></button><br>\
				</div>\
			</div>";
    document.getElementById("main").innerHTML = t;
}

function toggleSound(){
	if(soundOn) {soundOn = 0; document.getElementById("sound").innerHTML = "Turn On Sound"}
	else {soundOn = 1; document.getElementById("sound").innerHTML = "Turn Off Sound"}
}

function getOccupation() {
    var t = "<form><div class='container'><ul>\
				<li><input type='radio' id='f-option' name='occupation' value='Banker' onclick = 'displayOcc(this.value)'> <label for='f-option'>Banker</label> <div class='check'></div></li> <div id='info1' ></div>\
				<li><input type='radio' id='s-option' name='occupation' value='Carpenter' onclick = 'displayOcc(this.value)'> <label for='s-option'>Carpenter</label> <div class='check'><div class='inside'></div></div></li> <div id='info2' ></div>\
				<li><input type='radio' id='t-option' name='occupation' value='Farmer' onclick = 'displayOcc(this.value)' > <label for='t-option'>Farmer</label> <div class='check'><div class='inside'></div></div> </li> <div id='info3' ></div>\
				<li><input type='radio' id='u-option' name='occupation' value='Fisher' onclick = 'displayOcc(this.value)' > <label for='u-option'>Fisher</label> <div class='check'><div class='inside'></div></div> </li> <div id='info4' ></div>\
				<li><input type='radio' id='v-option' name='occupation' value='Cowboy' onclick = 'displayOcc(this.value)' > <label for='v-option'>Cowboy</label> <div class='check'><div class='inside'></div></div> </li> <div id='info5' ></div>\
				<li><input type='radio' id='w-option' name='occupation' value='Merchant' onclick = 'displayOcc(this.value)' > <label for='w-option'>Merchant</label> <div class='check'><div class='inside'></div></div> </li> <div id='info6' ></div>\
				<li><input type='radio' id='x-option' name='occupation' value='Batman' onclick = 'displayOcc(this.value)' > <label for='x-option'>Batman</label> <div class='check'><div class='inside'></div></div> </li> <div id='info7' ></div>\
			</ul></div></form>\
				<button class='button button1' id='CharNames' onclick = ''><span>Next</span></button>";
    document.getElementById("innerPage").innerHTML = t;
}

function displayOcc(occupation) {
    if (occupation == "Banker") {
        document.getElementById("info1").innerHTML = "<p>Banker has the most starting money in the game but you get least amount of points playing him.</p>";
        supplies[MONEY] = 1600.00;
		
		document.getElementById("info2").innerHTML ="";
		document.getElementById("info3").innerHTML ="";
		document.getElementById("info4").innerHTML ="";
		document.getElementById("info5").innerHTML ="";
		document.getElementById("info6").innerHTML ="";
		document.getElementById("info7").innerHTML ="";
    }
    else if (occupation == "Carpenter") {
        document.getElementById("info2").innerHTML = "<p>The Carpenter starts with an average amount of money, but get more points than the banker.</p>";
        supplies[MONEY] = 800.00;
		
		document.getElementById("info1").innerHTML ="";
		document.getElementById("info3").innerHTML ="";
		document.getElementById("info4").innerHTML ="";
		document.getElementById("info5").innerHTML ="";
		document.getElementById("info6").innerHTML ="";
		document.getElementById("info7").innerHTML ="";
    }
    else if (occupation == "Farmer") {
        document.getElementById("info3").innerHTML = "<p>You get little starting money, but 3 times as many points has the farmer.</p>";
        supplies[MONEY] = 400.00;
		
		document.getElementById("info1").innerHTML ="";
		document.getElementById("info2").innerHTML ="";
		document.getElementById("info4").innerHTML ="";
		document.getElementById("info5").innerHTML ="";
		document.getElementById("info6").innerHTML ="";
		document.getElementById("info7").innerHTML ="";
    }
    else if (occupation == "Fisher") {
        document.getElementById("info4").innerHTML = "<p>You start with an average amount of money but get a better reward when fishing.</p>";
        supplies[MONEY] = 600.00;
		
		document.getElementById("info1").innerHTML ="";
		document.getElementById("info2").innerHTML ="";
		document.getElementById("info3").innerHTML ="";
		document.getElementById("info5").innerHTML ="";
		document.getElementById("info6").innerHTML ="";
		document.getElementById("info7").innerHTML ="";
    }
    else if (occupation == "Cowboy") {
        document.getElementById("info5").innerHTML = "<p>The cowboy starts with a below average amount of money, but knows how to take care of it's cattle.</p>";
        supplies[MONEY] = 600.00;
		
		document.getElementById("info1").innerHTML ="";
		document.getElementById("info2").innerHTML ="";
		document.getElementById("info3").innerHTML ="";
		document.getElementById("info4").innerHTML ="";
		document.getElementById("info6").innerHTML ="";
		document.getElementById("info7").innerHTML ="";
    }
    else if (occupation == "Merchant") {
        document.getElementById("info6").innerHTML = "<p>The Merchant starts with a below average amount of money, but gets better deals when trading.</p>";
        supplies[MONEY] = 600.00;
		
		document.getElementById("info1").innerHTML ="";
		document.getElementById("info2").innerHTML ="";
		document.getElementById("info3").innerHTML ="";
		document.getElementById("info4").innerHTML ="";
		document.getElementById("info5").innerHTML ="";
		document.getElementById("info7").innerHTML ="";
    }
    else if (occupation == "Batman") {
        document.getElementById("info7").innerHTML = "<p>You're Batman!</p>";
        supplies[MONEY] = 99999.00;
		
		document.getElementById("info1").innerHTML ="";
		document.getElementById("info2").innerHTML ="";
		document.getElementById("info3").innerHTML ="";
		document.getElementById("info4").innerHTML ="";
		document.getElementById("info5").innerHTML ="";
		document.getElementById("info6").innerHTML ="";
    }
    job = occupation;
    document.getElementById("CharNames").setAttribute("onclick", "getLeaderName()");
}

function getInfo(num = 0) {
    var gameInfo = ["Try taking a journey by covered wagon across 2000 miles of plains, rivers, and mountains.<br>Try! On the plains, will you slosh your oxen through mud and water-filled ruts<br>or will you plod through dust six inches deep?", 
	"How will you cross the rivers? If you have money, you might take a ferry.<br>Or, you can ford the river and hope you and your wagon aren't swallowed alive!", 
	"What about supplies? Well, if you're low on food you can fish.<br>There are various different fish to catch that can satisfy your crew.", 
	"At the Dalles, you can try navigating the Columbia River, but if running<br>the rapids with a makeshift raft makes you queasy, better take the Barlow Road.",
	"If for some reason you don't survive -- thieves steal your oxen, you run out of food, or die of diesease --<br>don't give up! Try again... and again... until your name is up with the others on The Oregon Top Ten."];
    var count = 1;
    document.getElementById("innerPage").innerHTML = "<p id='info'>" + gameInfo[0] + "</p>" + spaceTxt;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            if (count < 5) {
				document.getElementById("info").innerHTML = gameInfo[count];
                count++;
            }
            else {
                $(this).unbind();
                welcome();
            }
        }
    });
}

function quit() {
    document.getElementById("main").innerHTML = "<h1>THANKS FOR PLAYING FUCKER!!!</h1>";
}

//validate input for alpha for leader
function alphaValLeader(input){
	var key;
	document.getElementById ? key = input.keyCode: key = input.which;
	if(event.keyCode == 13){
		getNames();
	}
	return ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 39 || key == 16 || key == 13);
}

//validate input for alpha for members
function alphaValMembers(input){
	var key;
	document.getElementById ? key = input.keyCode: key = input.which;
	if(event.keyCode == 13){
		finalizeNames();
	}
	return ((key > 64 && key < 91) || (key > 96 && key < 123) || key == 8 || key == 39 || key == 16 || key == 13);
}

function getLeaderName() {
    characters = ["Andrew", "Kathy", "LeBron", "Barbara", "Frank"];
    var t = "<img src='image/p1.png' alt='HTML5 Icon' style='display: block; margin-left: 300px; width: 50%;'></img>\
            <p>What is the first name of your leader?</p>\
			<input id='leader' type='text' value='' placeholder='First Name' onkeypress='return alphaValLeader(event)'></input><br><button class='button' onclick='getNames()'><span>Next</span></button>"
    document.getElementById("innerPage").innerHTML = t;
}

function getNames() {
    var leaderName = document.getElementById("leader").value;
	var firstLetter = leaderName.charAt(0).toUpperCase();
	var nameSlice = leaderName.slice(1).toLowerCase();
	leaderName = firstLetter + nameSlice;
	
    if (leaderName.replace(/\s/g, "") != "") characters[0] = leaderName;
    var t = "<img src='image/p1.png' alt='HTML5 Icon' style='display: block; margin-left: 300px; width: 50%;'></img>\
            <p>What are the first names of the other members in your party?<br>\
			The leader's name is " + characters[0] + ".</p>\
			<input class='names' type='text1' value='' placeholder='First Member' onkeypress='return alphaValMembers(event)'></input>\
			<input class='names' type='text1' value='' placeholder='Second Member' onkeypress='return alphaValMembers(event)'></input>\
			<input class='names' type='text1' value='' placeholder='Third Member' onkeypress='return alphaValMembers(event)'></input>\
			<input class='names' type='text1' value='' placeholder='Fourth Member' onkeypress='return alphaValMembers(event)'></input><br><br>\
			<button class='button' onclick='getLeaderName()'><span>Back</span></button><br>\
			<button class='button' onclick='finalizeNames()'><span>Next</span></button>";
    document.getElementById("innerPage").innerHTML = t;
}

function finalizeNames() {
    var tempNames = document.getElementsByClassName("names");
    var i
    for (i = 1; i < 5; i++) {
        if ((tempNames[i - 1].value).replace(/\s/g, "") != "") {
			var tname = tempNames[i - 1].value;
			var tfirstLetter = tname.charAt(0).toUpperCase();
			var tnameSlice = tname.slice(1).toLowerCase();
			characters[i] = tfirstLetter + tnameSlice;
		}	
    }	
    var t = "<p>The name of your leader is " + characters[0] + ".<br>\
			The names of your party members are " + characters[1] + ", " + characters[2] + ", " + characters[3] + ", and " + characters[4] + ".</p>\
			<button class='button' onclick='pickMonth()'><span>Next</span></button><br> <button class='button' onclick='getLeaderName()'><span>Change Names</span></button>";
    document.getElementById("innerPage").innerHTML = t;
}

function pickMonth() {
    var t = "<p>It is 1848. Your jump off place for Oregon is Independence, Missouri. You must decide which month to leave Independence.</p>\
			<form><div class='container'><ul>\
			<li><input name='months' id='f-option' type='radio' value='March' onclick='assignMonth(this.value)' checked><label for='f-option'>March</label> <div class='check'></div></li></input><br>\
			<li><input name='months' id='s-option' type='radio' value='April' onclick='assignMonth(this.value)'><label for='s-option'>April</label><div class='check'><div class='inside'></div></div></li> </input><br>\
			<li><input name='months' id='t-option' type='radio' value='May' onclick='assignMonth(this.value)'><label for='t-option'>May</label><div class='check'><div class='inside'></div></div></li> </input><br>\
			<li><input name='months' id='u-option' type='radio' value='June' onclick='assignMonth(this.value)'><label for='u-option'>June</label><div class='check'><div class='inside'></div></div></li> </input><br>\
			<li><input name='months' id='v-option' type='radio' value='July' onclick='assignMonth(this.value)'><label for='v-option'>July</label><div class='check'><div class='inside'></div></div></li> </input><br>\
			</ul></div></form>\
			<button class='button button1' onclick='getAdvice()'><span>Ask for Advice</span></button> <button class='button button1' id='play' onclick='finishIntro()'>\<span>Play Game</span></button>"
    document.getElementById("innerPage").innerHTML = t;
}

function assignMonth(userMonth) {
    month = months.indexOf(userMonth);
    document.getElementById("play").setAttribute("onclick", "finishIntro()");
}

function getAdvice() {
    document.getElementById("innerPage").innerHTML = "<p>You attend a public meeting held for \"folks with the California - Oregon fever.\" You're told:<br>\
	If you leave too early, there won't be any grass for your oxen to eat. If you leave too late, you may not get to Oregon before winter comes.<br>If you leave at just the right time, there will be green grass and the weather will still be cool.</p>" + spaceTxt;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            $(this).unbind();
            pickMonth();
        }
    });
}

function finishIntro() {
    console.log(month);
    var info = ["Before leaving Independence you should buy equipment and supplies. You have $" + supplies[MONEY] + " in cash, but you don't have to spend it all now"
				, "You can buy whatever you need at Krunal's General Store."];
    var t = "<p id='info'>" + info[0] + "</p>" + spaceTxt;
    document.getElementsByClassName("container")[0].innerHTML = t;
 
    var count = 0;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            if (!count) {
                $("#info").text(info[1]);
                count++;
            }
            else {
                $(this).unbind();
                storeGreeting();
            }
        }
    });
}

function storeGreeting() {
    console.log("test");
    var t = "<p>Hi, I'm Krunal! I see you're going to Oregon, and it just so happens that I have some very useful supplies you may need </p>\
            <img src='image/P2.png' alt='HTML5 Icon' style='position: relative; left: 100px; width: 15%;'></img>\
			<ol class='a'>\
                <li1>1. A team of oxen to pull your wagon</li1><br><br>\
                <li1>2. Clothing for both summer and winter</li1><br><br>\
                <li1>3. Plenty of food for your trip</li1><br><br>\
                <li1>4. Bait so you can fish</li1><br><br>\
                <li1>5. Spare parts for your wagon</li1></ol><br>" + spaceTxt;
    document.getElementsByClassName("container")[0].innerHTML = t;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            $(this).unbind();
            initStore();
        }
    });
}

function initStore() {
    var tempBalance = supplies[MONEY] - ((price[OXEN_COST] * tempSupplies[OXEN]) + (price[CLOTHING_COST] * tempSupplies[CLOTHING]) + (price[FOOD_COST] * tempSupplies[FOOD]) + (price[BAIT_COST] * tempSupplies[BAIT]) + (price[WAGON_COST] * tempSupplies[PARTS]));
    var t = "<h3>Krunal's General Store</h3><h4>Independence, Missouri<br>" + months[month] + " 1, 1848</h4>\
            <img src='image/P2.png' alt='HTML5 Icon' style='position: fixed; left: 200px; width: 15%;'></img>\
			<ol class='b'><li1>1. Oxen = $" + (price[OXEN_COST] * tempSupplies[OXEN]) + "&nbsp&nbsp&nbsp <button class='button button1' value='Oxen' onclick='initBuy(this.value)'><span>Buy!</span></button> </li1><br>\
            <li1>2. Clothes = $" + (price[CLOTHING_COST] * tempSupplies[CLOTHING]) + " <button class='button button1' value='Clothes' onclick='initBuy(this.value)'><span>Buy!</span></button> </li1><br>\
            <li1>3. Food = $" + Number(Math.round((price[FOOD_COST] * tempSupplies[FOOD]) + 'e2') + 'e-2') + "&nbsp&nbsp&nbsp <button class='button button1' value='Food' onclick='initBuy(this.value)'><span>Buy!</span></button> </li1><br>\
            <li1>4. Bait = $" + (price[BAIT_COST] * tempSupplies[BAIT]) + "&nbsp&nbsp&nbsp <button class='button button1' value='Bait' onclick='initBuy(this.value)'><span>Buy!</span></button> </li1><br>\
            <li1>5. Parts = $" + (price[WAGON_COST] * tempSupplies[PARTS]) + "&nbsp&nbsp <button class='button button1' value='Wagon' onclick='initBuy(this.value)'><span>Buy!</span></button> </li1></ol>\
			<p>Balance After Purchase: $" + tempBalance + "</p>\
			<button class='button' id='startTrail' onclick='OxenValidation()'><span>Start the Trail</span></button>";
    document.getElementsByClassName("container")[0].innerHTML = t;
   //if (tempSupplies[OXEN] > 0) document.getElementById("startTrail").setAttribute("onclick", "initOpening()");
}

function OxenValidation(){

    	if (tempSupplies[OXEN] > 0){
			initOpening();
			//document.getElementById("startTrail").setAttribute("target", "initOpening()");
		} 
		else{
			alert("Don't forget, you'll need oxen to pull your wagon");
		}
}

function initBuy(item) {
    var t;
    if (item == "Oxen") {
        t = "<p>Advice on Oxen. How many yoke would you like to buy?</p>\
			<input type='text' value='' placeholder='Number of Yoke' onkeypress='return itemValidation(event)'></input><br><button class='button' id='oxenOption' onclick='checkValid(OXEN)'><span>Buy It!</span></button><div id='errMsg'></div>";
    }
    else if (item == "Clothes") {
        t = "<p>Advice on Clothes. How many pairs of clothes would you like to buy?</p>\
			<input type='text' value='' placeholder='Number of Clothes' onkeypress='return itemValidation(event)'></input><br><button class='button' id='clothingOption' onclick='checkValid(CLOTHING)'><span>Buy It!</span></button><div id='errMsg'></div>";
    }
    else if (item == "Food") {
        t = "<p>Advice on Food. How much food in pounds would you like to buy?</p>\
			<input type='text' value='' placeholder='Number of Food' onkeypress='return itemValidation(event)'></input><br><button class='button' id='foodOption' onclick='checkValid(FOOD)'><span>Buy It!</span></button><div id='errMsg'></div>";
    }
    else if (item == "Bait") {
        t = "<p>Advice on Bait. How many buckets of bait would you like to buy?</p>\
			<input type='text' value='' placeholder='Number of Buckets' onkeypress='return itemValidation(event)'></input><br><button class='button' id='baitOption' onclick='checkValid(BAIT)'><span>Buy It!</span></button><div id='errMsg'></div>";
    }
    else if (item == "Wagon") {
        t = "<p>Advice on Wagon.<br><br>\
		How many wheels would you like to buy? <input type='text' id='wheel' value='' placeholder='Number of Wheels' onkeypress='return itemValidation(event)'></input><br>\
		How many axles would you like to buy? <input  type='text' id='axle' value='' placeholder='Number of Axles' onkeypress='return itemValidation(event)'></input><br>\
		How many tongues would you like to buy? <input type='text' id='tongue' value='' placeholder='Number of Tongues' onkeypress='return itemValidation(event)'></input><br></p>\
		<button class='button' id='partsOption' onclick='checkValid(PARTS)'><span>Buy It!</span></button><div id='errMsg'></div>";
    }
    document.getElementsByClassName("container")[0].innerHTML = t;
}

//validate input for buying items
//user can enter a value and press enter button = buy it button
function itemValidation(input){
	var key;
	document.getElementById ? key = input.keyCode: key = input.which;
	
	var id = document.getElementsByClassName("button")[0].id;
	console.log(id);
	if(event.keyCode == 13){
		if(id == "oxenOption")
			checkValid(OXEN);
		
		else if(id == "clothingOption")
			checkValid(CLOTHING);
		
		else if(id == "foodOption")
			checkValid(FOOD);
			
		
		else if(id == "baitOption")
			checkValid(BAIT);
			
		else if(id == "partsOption")
			checkValid(PARTS);
			
	}

	return ((key > 47 && key < 58) || key == 8 || key == 13);
}

function checkValid(index) {
    var tempBalance, tempValue;
    var tempInputs = document.getElementsByTagName("input");
    var patt = /^\d+$/;
    if (index == PARTS) {
        var total = 0;
        var i;
        for (i = 0; i < tempInputs.length; i++) {
            if (!(patt.test(tempInputs[i].value))) {
                document.getElementById("errMsg").innerHTML = "<p>Please enter a number for each part!</p>";
                return;
            }
            total += parseInt(tempInputs[i].value);
        }
        console.log(total);
        tempValue = tempSupplies[index];
        tempSupplies[index] = total;
        tempBalance = supplies[MONEY] - ((price[OXEN_COST] * tempSupplies[OXEN]) + (price[CLOTHING_COST] * tempSupplies[CLOTHING]) + (price[FOOD_COST] * tempSupplies[FOOD]) + (price[BAIT_COST] * tempSupplies[BAIT]) + (price[WAGON_COST] * tempSupplies[PARTS]));
        if (tempBalance < 0) {
            tempSupplies[index] = tempValue;
            document.getElementById("errMsg").innerHTML = "<label>You do not have enough money to do that!</label>";
        }
        else {
            tempParts[WHEEL] = parseInt(tempInputs[0].value);
            tempParts[AXLE] = parseInt(tempInputs[1].value);
            tempParts[TONGUE] = parseInt(tempInputs[2].value);
            initStore();
        }
    }
    else {
        if (patt.test(tempInputs[0].value)) {
            tempValue = tempSupplies[index];
            if (index == OXEN) tempSupplies[index] = parseInt(tempInputs[0].value) * 2;
            else if (index == BAIT) tempSupplies[index] = parseInt(tempInputs[0].value) * 20;
            else tempSupplies[index] = parseInt(tempInputs[0].value);
            tempBalance = supplies[MONEY] - ((price[OXEN_COST] * tempSupplies[OXEN]) + (price[CLOTHING_COST] * tempSupplies[CLOTHING]) + (price[FOOD_COST] * tempSupplies[FOOD]) + (price[BAIT_COST] * tempSupplies[BAIT]) + (price[WAGON_COST] * tempSupplies[PARTS]));
            if (tempBalance < 0) {
                tempSupplies[index] = tempValue;
                document.getElementById("errMsg").innerHTML = "<label>You do not have enough money to do that!</label>";
            }
            else initStore();
        }
        else document.getElementById("errMsg").innerHTML = "<label>Please enter a number!</label>";
    }
}


function tempTransfer() {
    supplies[MONEY] = supplies[MONEY] - ((price[OXEN_COST] * tempSupplies[OXEN]) + (price[CLOTHING_COST] * tempSupplies[CLOTHING]) + (price[FOOD_COST] * tempSupplies[FOOD]) + (price[BAIT_COST] * tempSupplies[BAIT]) + (price[WAGON_COST] * tempSupplies[PARTS]));
    var i;
    for (i = 0; i < supplies.length; i++) supplies[i] += tempSupplies[i];
    for (i = 0; i < parts.length; i++) parts[i] += tempParts[i];
    tempSupplies = [0, 0, 0, 0, 0, 0];
    tempParts = [0, 0, 0];
}

function initOpening() {
    tempTransfer();
    var IndepDay = months[month];
    var t = "<div id='op' style= 'background-color: black;'>\
			<img src='image/opening.JPG' alt='Mountain View' style='width:98%; height:97%;position: absolute;background-color: black;'>\
			<div id='opScene' style= 'position: absolute ;\
									left: 30%;\
									top: 77%;\
									width: 30%;\
									height: 20%;\
									text-align: center;\
									font-size: 30px;\
									background-color:#FFFDDD;\
									color:black;\
									border:4px double #e6e600;'>\
									Independence: " + IndepDay + " 1, 1848 <br> Click Space to begin your journey</div>\
			</div> ";
    document.getElementsByClassName("container")[0].innerHTML = t;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            $(this).unbind();
            locationInfo();
        }
    });
}