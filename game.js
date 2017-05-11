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
//var route1 = ["Green River crossing", "Soda Springs", "Fort Hall", "Snake River crossing", "Fort Boise", "Blue Mountains"];
//var altroute1 = ["Fort Bridger", "Soda Springs"];
//var distance1 = [57, 143, 57, 182, 113, 160];
//var altdistance1 = [125, 162];
//var locType1 = [RIVER, 0, TOWN, RIVER, TOWN, DIVIDE];
//var altlocType1 = [TOWN, 0];
//var route2 = ["Fort Walla Walla", "The Dalles", "Willamette Valley"];
//var altroute2 = ["The Dalles"]; (distance = 125)
//var distance2 = [55, 120, 100];
//var locType2 = [TOWN, DIVIDE, END];
//Last decision is Barlow Toll Road (cost $8.50) or Columbia River (Finishes Game)
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
            <img src='image/p2.png' alt='HTML5 Icon' style='position: relative; left: 100px; width: 15%;'></img>\
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
            <img src='image/p2.png' alt='HTML5 Icon' style='position: fixed; left: 200px; width: 15%;'></img>\
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

function checkSupplies() {
    var t = "<p>Your Supplies:<br>\
			Oxen: " + supplies[OXEN] + "<br>\
			Sets of Clothing: " + supplies[CLOTHING] + "<br>\
			Bait: " + supplies[BAIT] + "<br>\
			Wagon Wheels: " + parts[WHEEL] + "<br>\
			Wagon Axles: " + parts[AXLE] + "<br>\
			Wagon Tongues: " + parts[TONGUE] + "<br>\
			Pounds of Food: " + supplies[FOOD] + "<br>\
			Money Left: $" + supplies[MONEY] + "</p>\
			" + spaceTxt;
    document.getElementsByClassName("container")[0].innerHTML = t;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            $(this).unbind();
            locationInfo();
        }
    });
}

function paceInfo() {
    var t = "<p>Pace Info Here</p>" + spaceTxt;
    document.getElementsByClassName("container")[0].innerHTML = t;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
            $(this).unbind();
            changePace();
        }
    });
}

function setPace(pace) {
    currPace = pace;
    if (pace == "Steady") gameStatus[PACE] = STEADY;
    else if (pace == "Strenuous") gameStatus[PACE] = STRENUOUS;
    else if (pace == "Grueling") gameStatus[PACE] = GRUELING;
    locationInfo();
}

function changePace() {
    var t = "<div id='paceOptions'><p>Change pace<br>\
			(currently: " + currPace + ")<br><br>\
			The pace at which you travel can change.<br>\
			Your choices are:</p><br>\
			<button class='button' value='Steady' onclick='setPace(this.value)'><span>Steady</span></button><br>\
			<button class='button' value='Strenuous' onclick='setPace(this.value)'><span>Strenuous</span></button><br>\
			<button class='button' value='Grueling' onclick='setPace(this.value)'><span>Grueling</span></button><br>\
			<button class='button' onclick='paceInfo()'><span>Pace Information</span></button></div>"
    document.getElementsByClassName("container")[0].innerHTML = t;
}

function setRations(rations) {
    currRations = rations;
    if (rations == "Filling") gameStatus[RATIONS] = FILLING;
    else if (rations == "Meager") gameStatus[RATIONS] = MEAGER;
    else if (rations == "Bare Bones") gameStatus[RATIONS] = BAREBONES;
    locationInfo();
}

function changeRations() {
    var t = "<div id='foodOptions'><p>Change food rations<br>\
			(currently: " + currRations + ")<br><br>\
			The amount of food the people in your party eat each day can change.</p><br>\
			<button class='button' value='Filling' onclick='setRations(this.value)'><span>Filling</span></button> <p>- Meals are large and generous.</p><br>\
			<button class='button' value='Meager' onclick='setRations(this.value)'><span>Meager</span></button> <p>- Meals are small, but adequate.</p><br>\
			<button class='button' value='Bare Bones' onclick='setRations(this.value)'><span>Bare Bones</span></button> <p>- Meals are very small; everyone stays hungry.</p><br>\</div>";
    document.getElementsByClassName("container")[0].innerHTML = t;
}

function getIndex(str){
	if(str == "OXEN") return OXEN;
	if(str == "CLOTHING") return CLOTHING;
	if(str == "BAIT") return BAIT;
	if(str == "FOOD") return FOOD;
	if(str == "WHEEL") return WHEEL;
	if(str == "AXLE") return AXLE;
	if(str == "TONGUE") return TONGUE;
	if(str == "PARTS") return OXEN;
}

function buyItem(item){
	var index = getIndex(item);
	var amount = document.getElementById("buy").value;
	var patt = /^\d+$/;
	if(!(patt.test(amount)))
		document.getElementById("errMsg").innerHTML = "Please enter a number!";
	else if(item == "WHEEL" || item == "AXLE" || item == "TONGUE"){
		amount = parseInt(amount);
		if((price[WAGON_COST]*amount) <= supplies[MONEY]){
			supplies[PARTS] += amount;
			parts[index] += amount;
			supplies[MONEY] -= (price[WAGON_COST]*amount);
			if(brokenPart == index){supplies[PARTS]--; parts[index]--; brokenPart = 3;}
			buySupplies();
		}
		else
			document.getElementById("errMsg").innerHTML = "You do not have enough money to do that!";
	}
	else{
		amount = parseInt(amount);
		var priceIndex;
		if(item == "OXEN")
			priceIndex = OXEN_COST;
		else if(item == "CLOTHING")
			priceIndex = CLOTHING_COST;
		else if(item == "BAIT"){
			priceIndex = BAIT_COST;
			amount *= 20;
		}
		else if(item == "FOOD")
			priceIndex = FOOD_COST;
		if((price[priceIndex]*amount) <= supplies[MONEY]){
			supplies[index] += amount;
			supplies[MONEY] -= (price[priceIndex]*amount);
			buySupplies();
		}
		else
			document.getElementById("errMsg").innerHTML = "You do not have enough money to do that!";
	}
}

function setItem(item){
	if(item == "OXEN") 
		document.getElementById("selectItem").innerHTML = "<label>How many oxen?</label> <input id='buy' value=''></input> <button class='button' value='OXEN' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
	else if(item == "CLOTHING") 
		document.getElementById("selectItem").innerHTML = "<label>How many sets?</label> <input id='buy' value=''></input> <button class='button' value='CLOTHING' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
	else if(item == "BAIT") 
		document.getElementById("selectItem").innerHTML = "<label>How many buckets?</label> <input id='buy' value=''></input> <button class='button' value='BAIT' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
	else if(item == "WHEEL") 
		document.getElementById("selectItem").innerHTML = "<label>How many wheels?</label> <input id='buy' value=''></input> <button class='button' value='WHEEL' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
	else if(item == "AXLE") 
		document.getElementById("selectItem").innerHTML = "<label>How many axles?</label> <input id='buy' value=''></input> <button class='button' value='AXLE' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
	else if(item == "TONGUE") 
		document.getElementById("selectItem").innerHTML = "<label>How many tongues?</label> <input id='buy' value=''></input> <button class='button' value='TONGUE' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
	else if(item == "FOOD") 
		document.getElementById("selectItem").innerHTML = "<label>How many pounds?</label> <input id='buy' value=''></input> <button class='button' value='FOOD' onclick='buyItem(this.value)'><span>Buy It!</span></button>";
}

function buySupplies(){
	var t = "<h2>"+currLocation+"<br>"+months[month]+" "+day+", "+year+"</h2>\
			<p>You may buy:</p><br>\
			<button class='button' value='OXEN' onclick='setItem(this.value)'><span>Oxen</span></button><label>- $20 per ox</label><br>\
			<button class='button' value='CLOTHING' onclick='setItem(this.value)'><span>Clothing</span></button><label>- $10 per set</label><br>\
			<button class='button' value='BAIT' onclick='setItem(this.value)'><span>Bait</span></button><label>- $2 per bucket</label><br>\
			<button class='button' value='WHEEL' onclick='setItem(this.value)'><span>Wagon Wheels</span></button><label>- $10 per wheel</label><br>\
			<button class='button' value='AXLE' onclick='setItem(this.value)'><span>Wagon Axles</span></button><label>- $10 per axle</label><br>\
			<button class='button' value='TONGUE' onclick='setItem(this.value)'><span>Wagon Tongues</span></button><label>- $10 per tongue</label><br>\
			<button class='button' value='FOOD' onclick='setItem(this.value)'><span>Food</span></button><label>- $0.20 per pound</label><br>\
			<button class='button' onclick='locationInfo()'><span>Leave</span></button> <br>\
			<div><label>You have $"+supplies[MONEY]+" to spend.</label></div><br>\
			<div id='selectItem'><label>What would you like to buy?</label></div>\
			<label id='errMsg'></label>";
	document.getElementsByClassName("container")[0].innerHTML = t;
}

function riverLoss(){
	var msg = "You were unable to cross the river! What you lost:";
	if(gameStatus[HEALTH] == POOR || gameStatus[HEALTH] == POOR || Math.floor(Math.random() * 2) == 0){
		var tempIndicies = [];
		var i;
		for(i = 0; i < hp.length; i++){if(hp[i] > 0) tempIndicies.push(i);}
		var charIndex = tempIndicies[Math.floor(Math.random() * (tempIndicies.length))];
		hp[charIndex] = 0;
		numCharacters--;
		msg += "\n" + characters[charIndex] + " (drowned)";
	}
	if(supplies[OXEN] > 0){supplies[OXEN]--; msg += "\n1 ox";}
	var lostPart = Math.floor(Math.random() * 3);
	var partStr
	if(lostPart == WHEEL) partStr = "wheel";
	else if(lostPart == AXLE) partStr = "axle";
	else if(lostPart == TONGUE) partStr = "tongue";
	if(parts[lostPart] > 0){parts[lostPart]--; supplies[PARTS]--; msg += "\n1 wagon " + partStr;}
	if(Math.floor(Math.random() * 2) == 0 && supplies[FOOD] > 0){
		var foodLoss = Math.floor(Math.random() * 100) + 101;
		if(foodLoss > supplies[FOOD]) foodLoss = supplies[FOOD];
		supplies[FOOD] -= foodLoss;
		msg += "\n" + foodLoss + " pounds of food";
	}
	else if(Math.floor(Math.random() * 2) == 0 && supplies[BAIT] > 0){
		var baitLoss = Math.floor(Math.random() * 100) + 51;
		if(baitLoss > supplies[BAIT]) baitLoss = supplies[BAIT];
		supplies[BAIT] -= baitLoss;
		msg += "\n" + baitLoss + " bait";
	}
	else if(Math.floor(Math.random() * 2) == 0 && supplies[CLOTHING] > 0){
		var clothingLoss = Math.floor(Math.random() * 4) + 2;
		if(clothingLoss > supplies[CLOTHING]) clothingLoss = supplies[CLOTHING];
		supplies[CLOTHING] -= clothingLoss;
		msg += "\n" + clothingLoss + " sets of clothing";
	}
	return msg;
}

function ford(){
		currLocation = "";
        var t = "<img src='image/Ford.JPG' id='bkg' style = 'position:absolute; width:100%; height:100%;' alt='Mountain View'>\
        <img src='image/Cross.png' id='ok' style = 'position:absolute; width: 180px; length: 300px; bottom:20px; right: 85%;' alt='Mountain View'>";
        document.getElementsByClassName("container")[0].innerHTML = t;
        var death = 10;
		var cross;
		if(riverDepth < 4) cross = 10;
		else if(riverDepth < 5) cross = 8;
		else if(riverDepth < 6) cross = 5;
		else if(riverDepth < 7) cross = 3;
		else cross = 0;
		var msg;
        $(document).ready(function(){
			death = (Math.floor(Math.random()*10));
            if(death < cross){
				if(Math.floor(Math.random()*2) == 0) msg = "You made it across perfectly fine!";
				else {msg = "Your supplies got wet. Lose 1 day."; day++; changeWeather(); eatFood();}
                $("#ok").animate({right: '10%'},10000,function(){alert(msg); tempTraveled++; totalTraveled++; mainGame();});
            }
			else{
				msg = riverLoss();
                $("#ok").animate({right: '600px'},5000,function(){$("#ok").attr("src", "image/Capsize.png"); tempTraveled++; totalTraveled++; alert(msg);});//add who dies and what supplies are lost here
                $("#ok").delay(3000).animate({right: '10%'},10000,function(){mainGame();});
            }
        });
		riverDepth = 0; riverWidth = 0; ferryWait = 0; riverChange = 2;
}

function floatWagon(){
	currLocation = "";
        var t = "<img src='image/Ford.JPG' id='bkg' style = 'position:absolute; width:100%; height:100%;' alt='Mountain View'>\
        <img src='image/Cross.png' id='ok' style = 'position:absolute; width: 180px; length: 300px; bottom:20px; right: 85%;' alt='Mountain View'>";
        document.getElementsByClassName("container")[0].innerHTML = t;
        var death = 10;
		var msg;
        $(document).ready(function(){
			death = (Math.floor(Math.random()*10));
            if(death < 6){
				msg = "You made it across perfectly fine!";
                $("#ok").animate({right: '10%'},10000,function(){alert(msg); tempTraveled++; totalTraveled++; mainGame();});
            }
			else{
				msg = riverLoss();
                $("#ok").animate({right: '600px'},5000,function(){$("#ok").attr("src", "image/Capsize.png"); tempTraveled++; totalTraveled++; alert(msg);});//add who dies and what supplies are lost here
                $("#ok").delay(3000).animate({right: '10%'},10000,function(){mainGame();});
            }
        });
		riverDepth = 0; riverWidth = 0; ferryWait = 0; riverChange = 2;
}

/*
function fishResults(){
	document.getElementsByClassName("container")[0].innerHTML = "<p>You were able to get "+(supplies[FOOD]-tempSupplies[FOOD])+" pounds of food from fishing." + spaceTxt + "</p>";
	$(document).keypress(function(e){
		if(e.keyCode == SPACEBAR){
			$(this).unbind();
			locationInfo();
		}
	});
}

function castLine(){
	if(supplies[BAIT] == 0) {document.getElementById("fishMsg").innerHTML = "You have no more bait left."; return;}
	document.getElementById("contFish").setAttribute("onclick", ""); document.getElementById("stopFish").setAttribute("onclick", "");
	var i;
	document.getElementById("fishMsg").innerHTML = "You cast your line";
	setTimeout(function(){document.getElementById("fishMsg").innerHTML += ".";}, 1000); setTimeout(function(){document.getElementById("fishMsg").innerHTML += ".";}, 2000);
	setTimeout(function(){document.getElementById("fishMsg").innerHTML += ".";}, 3000); 
	
	setTimeout(function(){
		var randNum = 2;
		if(job == "Fisher") randNum++;
		var randFish = Math.floor(Math.random() * (randNum));
		if(randFish == 1 || randFish == 2){
			var typeFish = Math.floor(Math.random() * (3));
			if(typeFish == 0){document.getElementById("fishMsg").innerHTML = "You caught a fish! It is small, but at least it's something."; supplies[BAIT] -= 5; supplies[FOOD] += 3;}
			else if(typeFish == 1){document.getElementById("fishMsg").innerHTML = "You caught a fish! It is average-sized."; supplies[BAIT] -= 5; supplies[FOOD] += 5;}
			else if(typeFish == 2){document.getElementById("fishMsg").innerHTML = "You caught a huge fish! You are filled with determination."; supplies[BAIT] -= 5; supplies[FOOD] += 10;}
		}
		else{document.getElementById("fishMsg").innerHTML = "You were unable to catch anything. You fucking suck!"; supplies[BAIT] -= 5;}
		if(supplies[BAIT] < 0) supplies[BAIT] = 0;
		document.getElementById("baitAmt").innerHTML = supplies[BAIT];
		document.getElementById("contFish").setAttribute("onclick", "castLine()"); document.getElementById("stopFish").setAttribute("onclick", "fishResults()");
	}, 4000);
}
*/
function fishResults(){
	$('body').css('cursor', 'default');
	document.getElementsByClassName("container")[0].innerHTML = "<p>You were able to get "+(supplies[FOOD]-tempSupplies[FOOD])+" pounds of food from fishing." + spaceTxt + "</p>";
	$(document).keypress(function(e){
		if(e.keyCode == SPACEBAR){
			$(this).unbind();
			locationInfo();
		}
	});
}

function fish(){
	if(supplies[BAIT] <= 0) {document.getElementsByClassName("container")[0].innerHTML = "<p>You have no bait to fish. You must buy some first.</p> <button onclick='locationInfo()' class='button'><span>Back</span></button>"; return;}
	tempSupplies[FOOD] = supplies[FOOD];
	var t = "<p>Amount of bait left: <span id='baitAmt'>"+supplies[BAIT]+"</span><br>\
			<label id='fishMsg'></label></p>\
			<button onclick='catchfish()' id='contFish' class='button'><span>Attempt to Fish</span></button><br>\
			<button onclick='fishResults()' id='stopFish' class='button'><span>Stop Fishing</span></button>"
	document.getElementsByClassName("container")[0].innerHTML = t;
}

function catchfish(){
	var animate, fish = 0, left=0, imgObj=null;
	var right=1819, imbObj1=null;
	var right2=150, imbObj2=null;

	var fishcount = 0;
	var smallfish = 0, mediumfish = 0, largefish = 0;
	var fishtime;
	
	var t ="<style>\
			.droptarget {\
				float: left; \
				width: 97%; \
				height: 650px;\
				margin: 15px;\
				padding: 10px;\
			   // border: 1px solid #aaaaaa;\
				background: url(image/fishbackground.png);\
				background-repeat: no-repeat;\
				background-size: 100%;\
			}\
			#basket{\
				margin:0% 50%;\
				height:120px;\
				width:120px;\
				//border: 1px solid #aaaaaa;\
			}\
			#clicktarget{\
				height: 90px;\
				width: 90px;\
			}\
			#clicktarget1{\
				height: 90px;\
				width: 90px;\
			}	\
			#clicktarget2{\
				height: 90px;\
				width: 90px;\
			}	\
			#fishbasket{\
				height: 100%;\
				width: 100%;\
			}	\
			p{\
				color: yellow;\
			}\
			</style>\
			<p id='fishcount'></p>\
			<p id='fishsort'></p>\
			<p id='fishsupply'></p>\
			<p id='timer'></p>\
				<div class='droptarget'>\
				<div id='basket' >\
					<img id='fishbasket' src='image/fishbasket.png'>\
				</div>\
				  <img id='clicktarget' src='image/fish1.gif'>\
				  <img id='clicktarget1' src='image/fish2.gif'>\
				  <img id='clicktarget2' src='image/fish3.gif'>\
			</div>\
			<button onclick='fishResults()' id='stopFish2' class='button'><span>Stop Fishing</span></button>";
	document.getElementsByClassName("container")[0].innerHTML = t;
				
				
	document.getElementsByTagName("body")[0].style.cursor = "url('http://userpages.umbc.edu/~mmilbo1/cursor.cur'), auto";

	var timeLeft = 15;
	var elem = document.getElementById('timer');

	var timerId = setInterval(countdown, 1000);

	function countdown() {
		if (timeLeft == 0) {
			clearTimeout(timerId);
			fishResults();
		} 
		else {
			document.getElementById('timer').innerHTML ="Time Remaining: " + timeLeft + " seconds";
			timeLeft--;
		}
	}
	
	initfish();
	
	function initfish(){
		
		if(supplies[BAIT] == 0){
			alert("You do not have any bait to fish");
			fishResults();
		}
		
	   $("#clicktarget").show();
	   imgObj = document.getElementById('clicktarget');
	   imgObj.style.position= 'absolute';
	   imgObj.style.top = (Math.floor(Math.random()*(650-250+1)+250) +'px');
	   imgObj.style.left = '0px';
	   imgObj.style.visibility='hidden';

	   $("#clicktarget1").show();
	   imgObj1 = document.getElementById('clicktarget1');
	   imgObj1.style.position= 'absolute';
	   imgObj1.style.top = (Math.floor(Math.random()*(650-250+1)+250) +'px');
	   imgObj1.style.left = '1819px';
	   imgObj1.style.visibility='hidden';
	   
	   $("#clicktarget2").show();
	   imgObj2 = document.getElementById('clicktarget2');
	   imgObj2.style.position= 'absolute';
	   imgObj2.style.top = (Math.floor(Math.random()*(650-250+1)+250) +'px');
	   imgObj2.style.left = '1819px';
	   imgObj2.style.visibility='hidden';
	   
	   movefish();
	}
	
	function movefish(){
		left = parseInt(imgObj.style.left, 10);
		right = parseInt(imgObj1.style.left, 10);
		right2 = parseInt(imgObj2.style.left, 10);
		//console.log(right);
		if (1819>= left) {

			imgObj.style.left = (left + 5) + 'px';
			imgObj.style.visibility='visible';
			
			imgObj1.style.left = (right - 5) + 'px';
			imgObj1.style.visibility='visible';
			
			imgObj2.style.left = (right2 - 10) + 'px';
			imgObj2.style.visibility='visible';
			
			animate = setTimeout(function(){movefish();},10); // call movefish  in 20msec
			
		}
		else {
				if(fish < 9999){
					console.log("1");
					left=0, imgObj=null;
					right=1819, imgObj1=null;
					right2=1819, imgObj2=null;
					fish = fish +1;
					$("#clicktarget").hide();
					$("#clicktarget1").hide();
					$("#clicktarget2").hide();
					initfish();
				}	
				else{
				
					imgObj.style.visibility='hidden';
					imgObj1.style.visibility='hidden';
					imgObj2.style.visibility='hidden';
					stopfish();
				}
		}

	}

	function stopfish(){
	   clearTimeout(animate);
	}

	document.getElementById('fishcount').innerHTML ="Number of fish caught: " + fishcount;
	document.getElementById('fishsort').innerHTML ="Small fish: " + smallfish +"  | Medium fish: " + mediumfish +"  | Large fish: " + largefish;
	document.getElementById('fishsupply').innerHTML ="Amount of bait left: " + supplies[BAIT];
	document.getElementById('timer').innerHTML ="Time Remaining: " + timeLeft + " seconds";
	
	$(function() {
		$( "#clicktarget" ).draggable();
		$( "#clicktarget1" ).draggable();
		$( "#clicktarget2" ).draggable();
		
		$( "#basket" ).droppable({
		
			drop: function( event, ui ) {
			
				var id = ui.draggable.attr("id");
				
				if(id == "clicktarget"){
					$("#clicktarget").hide();
					smallfish++;
					if(job == "Fisher") supplies[FOOD] += 5;
					else supplies[FOOD] += 3;
				}	
				else if(id == "clicktarget1"){
					$("#clicktarget1").hide();
					mediumfish++;
					if(job == "Fisher") supplies[FOOD] += 8;
					else supplies[FOOD] += 5;
				}
				else{
					$("#clicktarget2").hide();
					largefish++;
					if(job == "Fisher") supplies[FOOD] += 15;
					else supplies[FOOD] += 10;
				}
			
				fishcount++;
				supplies[BAIT]--;
				

				document.getElementById('fishcount').innerHTML ="Number of fish caught: " + fishcount;
				document.getElementById('fishsort').innerHTML ="Small fish: " + smallfish +" Medium fish: " + mediumfish +" Large fish: " + largefish;
				document.getElementById('fishsupply').innerHTML ="Amount of bait left: " + supplies[BAIT];
				document.getElementById('timer').innerHTML ="Time Remaining: " + timeLeft + " seconds";
				
				if(supplies[BAIT] == 0){
					fishResults();
				}
			}	

		
		});

	});
	
}


function ferryAnimation(){
	var t = "<img src='image/Ford.JPG' id='bkg' style = 'position:absolute; width:100%; height:100%;' alt='Mountain View'>\
	<img src='image/Cross.png' id='ok' style = 'position:absolute; width: 180px; length: 300px; bottom:20px; right: 85%;' alt='Mountain View'>";
	document.getElementsByClassName("container")[0].innerHTML = t;
    $(document).ready(function(){$("#ok").animate({right: '10%'},10000,function(){alert("The ferry takes you across the river safely."); mainGame();});});
}

function ferryFinish(){
	if(supplies[MONEY] < 5) document.getElementsByClassName("container")[0].innerHTML = "<p>You do not have enough money to ride the ferry!"+spaceTxt+"</p>";
	else{
		document.getElementsByClassName("container")[0].innerHTML = "<p>You wait "+ferryWait+" days and take the ferry across the river."+spaceTxt+"</p>";
		changeWeather();
		var i;
		for(i = 0; i < ferryWait; i++) eatFood();
		ferryWait = 0; riverDepth = 0; riverWidth = 0; riverChange = 2;
	}
	$(document).keypress(function(e){
		if(e.keyCode == SPACEBAR){
			$(this).unbind();
			if(supplies[MONEY] < 5) riverOptions();
			else if(numCharacters == 0) lostGame();
			else {supplies[MONEY] -= 5; currLocation=""; tempTraveled++; totalTraveled++; ferryAnimation();}
		}
	});
}

function ferry(){
	if(ferryWait == 0) ferryWait = Math.floor(Math.random() * (5)) + 1;
	document.getElementsByClassName("container")[0].innerHTML = "<p>The ferry can take you across the river safely. It will cost $5, and you will have to wait for "+ferryWait+" days.<br>\
																Do you want to take the ferry?</p> <button onclick='ferryFinish()' class='button'><span>Yes</span></button><br><button onclick='riverOptions()' class='button'><span>No</span></button>";
}

function riverWait(){
	document.getElementsByClassName("container")[0].innerHTML = "<p>You camp near the river for a day.</p>" + spaceTxt;
	eatFood(); changeWeather();
	if(numCharacters == 0){lostGame(); return;}
	if(gameStatus[WEATHER] == RAINY || gameStatus[WEATHER] == VERYRAINY){if(riverChange < 4) {Math.round((riverDepth += .2) * 10) / 10; Math.round((riverChange += .2) * 10) / 10;}}
	else{if(riverChange > 0){Math.round((riverDepth -= .2) * 10) / 10; Math.round((riverChange -= .2) * 10) / 10;}}
	$(document).keypress(function(e){
		if(e.keyCode == SPACEBAR){$(this).unbind(); riverOptions();}
	});
}

function setRiver(){
	if(currLocation == "Kansas River crossing") {riverWidth = 628; riverDepth = 4.8;}
	else if(currLocation == "Big Blue River crossing") {riverWidth = 235; riverDepth = 3.0;}
	else if(currLocation == "Green River crossing") {riverWidth = 400; riverDepth = 20.0;}
	else if(currLocation == "Snake River crossing") {riverWidth = 1000; riverDepth = 6.0;}
}

function riverOptions(){
	randMsg = "";
	if(riverDepth == 0) setRiver();
	document.getElementsByClassName("container")[0].innerHTML = "<h2>" + currLocation + "<br>" + months[month] + " " + day + ", " + year + "</h2>\
																<p id='river'>You must cross the river in order to continue.<br>\
																The river at this point is currently "+riverWidth+" feet across, and "+riverDepth+" feet deep in the middle.<br><br>Press SPACE BAR to Continue</p>";
	var t = "<p>Weather: "+currWeather+"<br>\
			River width: "+riverWidth+" feet <br>River depth: "+riverDepth+" feet<br>\
			You may: <br><br>\
			<button class='button' onclick='ford()'><span>Ford the River</span></button><br>\
			<button class='button' onclick='floatWagon()'><span>Float the Wagon</span></button><br>\
			<button class='button' onclick='ferry()'><span>Take a Ferry</span></button><br>\
			<button class='button' onclick='riverWait()'><span>Wait</span></button><br>\
			<button class='button' onclick=''><span>Get Information</span></button></p>";
			
	$(document).keypress(function(e){
		if(e.keyCode == SPACEBAR){
			$(this).unbind();
			document.getElementById("river").innerHTML = t;
		}
	});
}

function rest(){
	var daysInput;
	var t = "<p>How many days would you like to rest?</p>\
			<input class='names' type='text' id='restDays' value='' maxlength='1' size='4' placeholder='Number of Days' onkeypress='return restInput(event)'><br>\
			<button id='rest' class='button'>Submit</button>";
			
	document.getElementsByClassName("container")[0].innerHTML = t;
		
		$("#rest").click(function(){
			daysInput = $("#restDays").val();
			if(daysInput == "") daysInput = 0;
			day += parseInt(daysInput);
			setDate();
			changeWeather();
			var i;
			for(i = 0; i < daysInput; i++) {eatFood(); addTeamHP(5); if(oxenInjured && Math.floor(Math.random() * (2)) == 0) oxenInjured = 0;}
			locationInfo();
		});	
}

//validate input for rest input
function restInput(input){
	var key;
	document.getElementById ? key = input.keyCode: key = input.which;
	return ((key > 47 && key < 58) || key == 8 || key == 13);
}

function tradeAccept(type, amt, typePart){
	supplies[type[0]] += amt[0];
	supplies[type[1]] -= amt[1];
	if(type[0] == PARTS) {if(brokenPart == typePart[0]){brokenPart = 3; supplies[PARTS]--;} else parts[typePart[0]]++;}
	if(type[1] == PARTS) parts[typePart[1]]--;
	locationInfo();
}

function trade(){
	day++;
	eatFood();
	changeWeather();
	var canTrade = 1;
	var tradeAmt = [0,0];
	var tradeItem = ["",""];
	var rand = [0,0];
	var randPart = [0,0];
	//If 1 then someone wants to trade
	if(Math.floor(Math.random() * (2))){
		var i;
		for(i = 0; i < 2; i++){
			rand[i] = Math.floor(Math.random() * (5)) + 1;
			if(i == 1){
				if(rand[1] == rand[0]){if(rand[1] == 5) rand[1]--; else rand[1]++;}
			}
			if(rand[i] == FOOD) {tradeAmt[i] = 100; tradeItem[i] = "pounds of food";}
			else if(rand[i] == BAIT) {tradeAmt[i] = 200; tradeItem[i] = "bait";}
			else if(rand[i] == OXEN) {tradeAmt[i] = 1; tradeItem[i] = "ox";}
			else if(rand[i] == CLOTHING) {tradeAmt[i] = 2; tradeItem[i] = "sets of clothing";}
			else if(rand[i] == PARTS){
				randPart[i] = Math.floor(Math.random() * (3))
				if(randPart[i] == WHEEL) {tradeAmt[i] = 1; tradeItem[i] = "wagon wheel";}
				else if(randPart[i] == AXLE) {tradeAmt[i] = 1; tradeItem[i] = "wagon axle";}
				else if(randPart[i] == TONGUE) {tradeAmt[i] = 1; tradeItem[i] = "wagon tongue";}
			}
		}
		//Make sure you have enough to trade
		if(rand[1] == PARTS){if(parts[randPart[1]] < 1) canTrade = 0;}
		else if(supplies[rand[1]] < tradeAmt[1]) canTrade = 0;
		var t = "<p>A fellow traveler would like to offer you " + tradeAmt[0] + " " + tradeItem[0] + " for " + tradeAmt[1] + " " + tradeItem[1];
		if(canTrade) t += ".<br>Do you accept the offer?</p> <button id='acceptTrade' class='button'>Yes</button><br><button id='back' class='button'>No</button>";
		else t += ",<br>but you do not have the supplies to trade.</p> <button id='back' class='button'>Back</button>";
		document.getElementsByClassName("container")[0].innerHTML = t;
	}
	//No one wants to trade
	else{
		document.getElementsByClassName("container")[0].innerHTML = "<p>There is no trade offer today.</p><button id='back' class='button'>Back</button>"
	}
	$("#acceptTrade").click(function() {$(this).unbind(); $("#back").unbind(); tradeAccept(rand, tradeAmt, randPart);});
	$("#back").click(function(){$(this).unbind(); $("#acceptTrade").unbind(); locationInfo();});
}

function firstDRoute1(){
	locations.push.apply(locations, ["Green River crossing", "Soda Springs", "Fort Hall", "Snake River crossing", "Fort Boise", "Blue Mountains"]);
	distance.push.apply(distance, [57, 143, 57, 182, 113, 160]);
	locType.push.apply(locType, [RIVER, 0, TOWN, RIVER, TOWN, DIVIDE2]);
	mainGame();
}
function firstDRoute2(){
	locations.push.apply(locations, ["Fort Bridger", "Soda Springs", "Fort Hall", "Snake River crossing", "Fort Boise", "Blue Mountains"]);
	distance.push.apply(distance, [125, 162, 57, 182, 113, 160]);
	locType.push.apply(locType, [TOWN, 0, TOWN, RIVER, TOWN, DIVIDE2]);
	mainGame();
}
function secondDRoute1(){
	locations.push.apply(locations, ["Fort Walla Walla", "The Dalles", "Willamette Valley"]);
	distance.push.apply(distance, [55, 120, 100]);
	locType.push.apply(locType, [TOWN, 0, END]);
	mainGame();
}
function secondDRoute2(){
	locations.push.apply(locations, ["The Dalles", "Willamette Valley"]);
	distance.push.apply(distance, [125, 100]);
	locType.push.apply(locType, [0, END]);
	mainGame();
}

function talk(){
	var t;
	if(currLocation == "Independence") t = "<p>A town resident tells you:<br>\"Some folks seem to think that two oxen are enough to get them to Oregon!<br>\
	Two oxen can barely move a fully loaded wagon, and if one of them gets sick or dies,<br>you won't be going anywhere. I wouldn't go overland with less than six.\"";
	else if(currLocation == "Kansas River crossing") t = "<p>Aunt Rebecca Sims tells you:<br>\"With the crowds of people waiting to get on the ferry,<br>\
	we could be stranded here for days! Hope there's enough graze for all those animals --<br>not many people carry feed! I'd rather wait, though, than cross in a rickety wagon boat!\"";
	else if(currLocation == "Big Blue River crossing") t = "<p>A lady, Marnie Stewart, tells you:<br>\"This prairie is mighty pretty with all the wild flowers and tall grasses.<br>\
	But there's too much of it! I miss not having a town nearby. I wonder how many days until I see a town --<br>a town with real shops, a church, people...\"";
	else if(currLocation == "Fort Kearney") t = "<p>A fort soldier tells you:<br>\"The trails from the jumping off places -- Independence, St. Joseph, Council Bluffs --<br>\
	come together at Fort Kearney. This new fort was built by the U.S. Army<br>to protect those bound for California and Oregon.\"";
	else if(currLocation == "Chimney Rock") t = "<p>Celinda Hines tells you:<br>\"Chimney Rock by moonlight is awfully sublime. Many Indians came<br>\
	to our wagon with fish to exchange for clothing. We bought a number.<br>They understand \'swap\' and \'no swap.\' Seem most anxious to get shirts and socks.\"";
	else if(currLocation == "Fort Laramie") t = "<p>A woman traveler tells you:<br>\"Be warned, stranger. Don't dig a water hole! Drink only river water.<br>\
	Salty as the Platte River is -- it's better than the cholera. We buried my husband last week.<br>Could use some help with this harness, if you can spare the time.\"";
	else if(currLocation == "Independence Rock") t = "<p>Aunt Rebecca Sims tells you:<br>\"No butter or cheese or fresh fruit since Fort Laramie! Bless me,<br>\
	but I'd rather have my larder full of food back East then have our names carved on that rock!<br>Well, tis a sight more cheery than all the graves we passed.\"";
	else if(currLocation == "South Pass") t = "<p>An Arapho Indian tells you:<br>\"When the white man first crossed our lands their wagons were few.<br>\
	Now they crowd the trail in great numbers. The land is overgrazed with their many animals.<br>Do any white men still live in the East? My people talk of moving.\"";
	else if(currLocation == "Green River crossing") t = "<p>A young boy tells you:<br>\"My family didn't buy enough food in Independence. We have been eating very small rations since Fort Laramie.<br>\
	Because of that our health is poor. My sister has mountain fever, so we're stopped here for a while.\"";
	else if(currLocation == "Fort Bridger") t = "<p>A trader tells you:<br>\"This fort was built by Jim Bridger. Jim was a mountain man before<br>\
	he put in this blacksmith shop and small store to supply the overlanders.<br>Does a big trade in horses, Jim and his partner, Vasquez.\"";
	else if(currLocation == "Soda Springs") t = "<p>Celinda Hines tells you:<br>\"My, the Soda Springs are so pretty! Seem to spout at regular intervals.<br>\
	Felt good to just rest and not be jostled in the wagon all day. When I get to Oregon,<br>I'll have a soft feather bed and never sleep in a wagon again!\"";
	else if(currLocation == "Fort Hall") t = "<p>Aunt Rebecca tells you:<br>\"Hear there's mountain sheep around here. Enough water too, but hardly a stick of wood.<br>\
	Thank heaven for Fort Hall! But I'm real sorry to be saying goodbye to cousin Miles and all the folks heading for California.\"";
	else if(currLocation == "Snake River crossing") t = "<p>Big Louie tells you:<br>\"See that wild river? That's the Snake. Many a raft's been swamped in her foaming rapids.<br>\
	Her waters travel all the way to Oregon! We'll be crossing her soon,<br>and then again after Fort Boise. Take care at the crossing!\"";
	else if(currLocation == "Fort Boise") t = "<p>A trader with 6 mules tells you:<br>\"You'll not get yer wagon over them Blue Mountains, mister. Leave it!<br>\
	Cross yer goods over with pack animals. Get yerself a couple of good mules.<br>Pieces of wagons litter the trail -- left by them folks who don't heed good advice!\"";
	else if(currLocation == "Blue Mountains") t = "<p>Jacob Hofsteader tells you:<br>\"This valley of the Grande Ronde is the most beautiful sight in months.<br>\
	Water and graze in abundance! And if this valley is so fine,<br>the Willamette must be twice as fine! We'll be sittin' pretty in our new homestead!\"";
	else if(currLocation == "Fort Walla Walla") t = "<p>A Cayuse Indian tells you:<br>\"You ask about the Whitman massacre. I ask you why Doctor Whitman's<br>\
	medicine did not cure my people's children? Many caught measles from the strangers.<br>Why did the medicine poison our children and cure the children of white people?\"";
	else if(currLocation == "The Dalles") t = "<p>A mountain man tells you:<br>\"These last hundred miles to Willamette are the roughest -- either rafting down<br>\
	the swift and turbulent Columbia River or driving your wagon over<br>the steep Cascade Mountains. Hire an Indian guide if you take the river.\"";
	t += "</p>" + spaceTxt;
	document.getElementsByClassName("container")[0].innerHTML = t;
	$(document).keypress(function(e){
		if(e.keyCode == SPACEBAR){
			$(this).unbind();
			locationInfo();
		}
	});
}

function leaveTown(){
	if(supplies[OXEN] <= 0){alert("You need oxen to continue on the trail!"); return;}
	else if(brokenPart == WHEEL){alert("You need to replace your broken wheel to continue on the trail!"); return;}
	else if(brokenPart == AXLE){alert("You need to replace your broken axle to continue on the trail!"); return;}
	else if(brokenPart == TONGUE){alert("You need to replace your broken tongue to continue on the trail!"); return;}
	

	if(currType == DIVIDE1) document.getElementsByClassName("container")[0].innerHTML = "<p>There are two different routes to take.<br>Where would you like to go to next?<br><br>\
																						<button onclick='firstDRoute1()' class='button'><span>Green River crossing</span></button><br>\
																						<button onclick='firstDRoute2()' class='button'><span>Fort Bridger</span></button></p>";
	else if(currType == DIVIDE2) document.getElementsByClassName("container")[0].innerHTML = "<p>There are two different routes to take.<br>Where would you like to go to next?<br><br>\
																						<button onclick='secondDRoute1()' class='button'><span>Fort Walla Walla</span></button><br>\
																						<button onclick='secondDRoute2()' class='button'><span>The Dalles</span></button></p>";
	else if(currLocation == "The Dalles") document.getElementsByClassName("container")[0].innerHTML = "<p>There are two different routes to take.<br>Where would you like to go to next?<br><br>\
																						<button onclick='columRiver()' class='button'><span>The Columbia River</span></button><br>\
																						<button onclick='mainGame()' class='button'><span>The Barlow Road</span></button></p>";
	else{mainGame();}
	randMsg = "";
	currLocation = "";
}

function locationInfo() {
	if(numCharacters == 0){lostGame(); return;}
	setHealth();
	setDate();
    var t = "";
    //Checking if in town or on the trail
    if (currLocation != "") t += "<h2>" + currLocation + "<br>" + months[month] + " " + day + ", " + year + "</h2>";
    else t += "<h2>" + months[month] + " " + day + ", " + year + "</h2>"
    t += "<p>Weather: " + currWeather + "<br>\
			Health: " + currHealth + "<br>\
			Pace: " + currPace + "<br>\
			Rations: " + currRations + "<br>\</p>\
			<div id='townOptions'><p>You may:</p><br><br>\
			<button class='button' onclick=''><span>Continue on trail</span></button><br>\
			<button class='button' onclick='checkSupplies()'><span>Check supplies</span></button><br>\
			<button class='button' onclick=''><span>Look at map</span></button><br>\
			<button class='button' onclick='changePace()'><span>Change pace</span></button><br>\
			<button class='button' onclick='changeRations()'><span>Change food rations</span></button><br>\
			<button class='button' onclick='rest()'><span>Stop to rest</span></button><br>\
			<button class='button' onclick='trade()'><span>Attempt to trade</span></button><br>";
    if (currLocation != "") {
		t += "<button class='button' onclick='talk()'><span>Talk to people</span></button><br>";
		if(currType == TOWN) t += "<button class='button' onclick='buySupplies()'><span>Buy Supplies</span></button><br>";
		else if(currType == RIVER)t += "<button class='button' onclick='fish()'><span>Go Fishing</span></button><br>"
	}
    t += "</div>";
    document.getElementsByClassName("container")[0].innerHTML = t;
	if(currType == RIVER && tempTraveled == 0) document.getElementsByClassName("button")[0].setAttribute("onclick", "riverOptions()");
	else document.getElementsByClassName("button")[0].setAttribute("onclick", "leaveTown()");
}

function displayLocation(){
	var locImg;
	if(currLocation == "Kansas River crossing") locImg = "image/locations/Kansas_River.JPG";
	else if(currLocation == "Big Blue River crossing") locImg = "image/locations/Big_Blue_River.PNG";
	else if(currLocation == "Fort Kearney") locImg = "image/locations/Fort_Kearney.PNG"
	else if(currLocation == "Chimney Rock") locImg = "image/locations/Chimney_Rock.JPG"
	else if(currLocation == "Fort Laramie") locImg = "";
	else if(currLocation == "Independence Rock") locImg = "";
	else if(currLocation == "South Pass") locImg = "image/locations/South_Pass.JPG";
	var t = "<h2>" + currLocation + "<br>" + months[month] + " " + day + ", " + year + "</h2>\
			<img src='"+locImg+"' style='width:700px; height:400px; left:50%; margin-left: -350; position:absolute; background-color: black'></img>";
	document.getElementsByClassName("container")[0].innerHTML = t;
}

function stopLocation() {
	if(numCharacters == 0){lostGame(); return;}
    var t = "<p><label>"+randMsg+"</label><br>You have reached " + currLocation + ".<br> Do you want to look around?</p>\
			<button class='button' onclick='locationInfo()'><span>Yes</span></button>&nbsp<button class='button' onclick=''><span>No</span></button>";
    document.getElementsByClassName("container")[0].innerHTML = t;
	if(currType == RIVER) document.getElementsByClassName("button")[1].setAttribute("onclick", "riverOptions()");
	else document.getElementsByClassName("button")[1].setAttribute("onclick", "leaveTown()");
	//if(randMsg != ""){alert(randMsg); randMsg = "";}
	randMsg = "";
}

function addTeamHP(num){
	var i;
	for(i = 0; i < hp.length; i++){
		if(hp[i] > 0 && hp[i] < 100){
			hp[i] += num;
			if(hp[i] > 100) hp[i] = 100;
		}
	}
}

function reduceTeamHP(num){
	var i;
	for(i = 0; i < hp.length; i++){
		if(hp[i] > 0){
			hp[i] -= num;
			if(hp[i] <= 0) {numCharacters--; alert(characters[i]+" has died!");}
		}
	}
}

function reduceCharHP(index, num){ 
	hp[index] -= num;
	if(hp[index] <= 0) {numCharacters--; alert(characters[index]+" has died!");}
}

//Adjusting the date
function setDate(){
    if (day > monthDays[month]) {
        day = day % monthDays[month];
        if (month == 11) {
            month = 0;
            year++;
        }
        else month++;
    }
}
	
function setHealth(){
	var totalHP = 0;
	var i;
	for(i = 0; i < hp.length; i++) {if(hp[i] > 0) totalHP += hp[i];}
	if(totalHP >= 350) {gameStatus[HEALTH] = GOOD; currHealth = "Good";}
	else if(totalHP >= 250) {gameStatus[HEALTH] = FAIR; currHealth = "Fair";}
	else if(totalHP >= 150) {gameStatus[HEALTH] = POOR; currHealth = "Poor";}
	else {gameStatus[HEALTH] = VERYPOOR; currHealth = "Very Poor";}
}

function eatFood(){
	if(supplies[FOOD] == 0) reduceTeamHP(10);
	else{
		var num;
		if(gameStatus[RATIONS] == FILLING) num = 3;
		else if(gameStatus[RATIONS] == MEAGER) {num = 2; reduceTeamHP(2);}
		else if(gameStatus[RATIONS] == BAREBONES) {num = 1; reduceTeamHP(5);}
		var pounds = num * numCharacters;
		if(pounds > supplies[FOOD]) supplies[FOOD] = 0;
		else supplies[FOOD] -= pounds;
	}
}

function changeWeather(){
	var num = Math.floor(Math.random() * (10));
	//Weather patterns based on months
	//Mostly Cold
	if(month >= 9 || month <= 1){
		if(num >= 4 && num <= 6) {currWeather = "Cold"; gameStatus[WEATHER] = COLD;}
		else if(num >= 7 && num <= 9) {currWeather = "Cool"; gameStatus[WEATHER] = COOL;}
		else if(num == 2) {currWeather = "Rainy"; gameStatus[WEATHER] = RAINY;}
		else if(num == 0) {currWeather = "Warm"; gameStatus[WEATHER] = WARM;}
		else if(num == 1) {currWeather = "Hot"; gameStatus[WEATHER] = HOT;}
		else if(num == 3) {currWeather = "Very Rainy"; gameStatus[WEATHER] = VERYRAINY;}
	}
	//Mostly Hot
	else if(month >= 4 && month <= 7){
		if(num == 0) {currWeather = "Cold"; gameStatus[WEATHER] = COLD;}
		else if(num == 1) {currWeather = "Cool"; gameStatus[WEATHER] = COOL;}
		else if(num == 2) {currWeather = "Rainy"; gameStatus[WEATHER] = RAINY;}
		else if(num >= 4 && num <= 6) {currWeather = "Warm"; gameStatus[WEATHER] = WARM;}
		else if(num >= 7 && num <= 9) {currWeather = "Hot"; gameStatus[WEATHER] = HOT;}
		else if(num == 3) {currWeather = "Very Rainy"; gameStatus[WEATHER] = VERYRAINY;}
	}
	//In Between
	else{
		if(num == 0) {currWeather = "Cold"; gameStatus[WEATHER] = COLD;}
		else if(num == 1 || num == 6 || num == 9) {currWeather = "Cool"; gameStatus[WEATHER] = COOL;}
		else if(num == 2 || num == 7) {currWeather = "Rainy"; gameStatus[WEATHER] = RAINY;}
		else if(num == 3 || num == 8) {currWeather = "Warm"; gameStatus[WEATHER] = WARM;}
		else if(num == 4) {currWeather = "Hot"; gameStatus[WEATHER] = HOT;}
		else if(num == 5) {currWeather = "Very Rainy"; gameStatus[WEATHER] = VERYRAINY;}
	}
}

function randomEvent(){
	var rand = 6;
	if(gameStatus[WEATHER] == RAINY) rand += 3;
	else if(gameStatus[WEATHER] == VERYRAINY) rand += 6;
	var num = Math.floor(Math.random() * (rand));
	console.log("num: " + num);
	if(num == 0){
		randMsg = "You get lost on the trail! Lose 1 day.";
		eatFood();
		day++;
	}
	else if(num == 1 || gameStatus[HEALTH] == VERYPOOR){
		var tempMsg = "";
		var diseases = ["Typhoid Fever", "Cholera", "Dysentery", "Measles", "Diphtheria", "exhaustion", "a fever", "a broken arm", "a broken leg"];
		var tempIndicies = [];
		for(i = 0; i < hp.length; i++) {if(hp[i] > 0) tempIndicies.push(i);}
		var randIndex = Math.floor(Math.random() * (tempIndicies.length));
		if(hp[tempIndicies[randIndex]] < 40 || Math.floor(Math.random() * (2)) == 1){
			tempMsg += characters[tempIndicies[randIndex]] + " has " + diseases[Math.floor(Math.random() * (9))] + ".";
			reduceCharHP(tempIndicies[randIndex], 25);
		}

		randMsg = tempMsg;
	}
	else if(num == 2){
		brokenPart = Math.floor(Math.random() * (3));
		var tempMsg;
		if(brokenPart == WHEEL) tempMsg = "The wagon's wheel broke!";
		else if(brokenPart == AXLE) tempMsg = "The wagon's axle broke!";
		else if(brokenPart == TONGUE) tempMsg = "The wagon's tongue broke!";
		randMsg = tempMsg;
	}
	else if(num == 3){
		var randThief = Math.floor(Math.random() * (4));
		if(randThief == 0 && supplies[OXEN] > 0){
			var sOxen = Math.floor(Math.random() * (3)) + 1;
			if(sOxen > supplies[OXEN]) sOxen = supplies[OXEN];
			supplies[OXEN] -= sOxen;
			randMsg = "A thief stole " + sOxen + " oxen while you were sleeping!";
		}
		else if(randThief == 1 && supplies[CLOTHING] > 0){
			var sClothing = Math.floor(Math.random() * (5)) + 2;
			if(sClothing > supplies[CLOTHING]) sClothing = supplies[CLOTHING];
			supplies[CLOTHING] -= sClothing;
			randMsg = "A thief stole " + sClothing + " sets of clothes while you were sleeping!";
		}
		else if(randThief == 2 && supplies[FOOD] > 0){
			var sFood = Math.floor(Math.random() * (151)) + 50;
			if(sFood > supplies[FOOD]) sFood = supplies[FOOD];
			supplies[FOOD] -= sFood;
			randMsg = "A thief stole " + sFood + " pounds of food while you were sleeping!";
		}
	}
	else if(num == 4){
		randMsg = "You spot an abandoned wagon";
		var randPart = Math.floor(Math.random() * (6))
		if(randPart == WHEEL){parts[WHEEL]++; supplies[PARTS]++; randMsg += ". It has a spare wheel.";}
		else if(randPart == AXLE){parts[AXLE]++; supplies[PARTS]++; randMsg += ". It has a spare axle.";}
		else if(randPart == TONGUE){parts[TONGUE]++; supplies[PARTS]++; randMsg += ". It has a spare tongue.";}
		else randMsg += ", but it is empty.";
	}
	else if(num == 5){randMsg = "You find wild fruit."; supplies[FOOD] += 50;}
	//Storms only happen if it is raining.
	else{
		randDay = Math.floor(Math.random() * (3)) + 1;
		randMsg = "There is a severe storm! Lose "+randDay+" days";
		var i;
		for(i = 0; i < randDay; i++) eatFood();
		changeWeather();
		day += randDay;
	}
}

function checkMove(){
	if(supplies[OXEN] <= 0) {alert("You have no oxen to pull your wagon!"); return 0;}
	else if(brokenPart == WHEEL) {alert("Your wagon cannot move with a broken wheel!"); return 0;}
	else if(brokenPart == AXLE) {alert("Your wagon cannot move with a broken axle!"); return 0;}
	else if(brokenPart == TONGUE) {alert("Your wagon cannot move with a broken tongue!"); return 0;}
	return 1;
}

function travelTrail() {
	//if(!checkMove()){ mainGame(); return;}
	randMsg = "";
    day++;
	eatFood();
	//No clothing and bad weather
	if(gameStatus[WEATHER] == COLD || gameStatus[WEATHER] == VERYRAINY){
		if(supplies[CLOTHING] < 5) reduceTeamHP(2*(5-supplies[CLOTHING]));
	}
    if (gameStatus[PACE] == STEADY) {
        totalTraveled += 20;
        tempTraveled += 20;
        addTeamHP(1);
    }
    else if (gameStatus[PACE] == STRENUOUS) {
        totalTraveled += 30;
        tempTraveled += 30;
		reduceTeamHP(2);
    }
    else if (gameStatus[PACE] == GRUELING) {
        totalTraveled += 40;
        tempTraveled += 40;
		reduceTeamHP(5);
    }
	//Random event 20% chance
	if(Math.floor(Math.random() * (5)) == 0){
		randomEvent();
		if(brokenPart < 3){
			if(parts[brokenPart] > 0) {parts[brokenPart]--; supplies[PARTS]--; brokenPart = 3; randMsg += "<br>You replace it with a spare part.";}
			else randMsg+= "<br>You have no spare parts to replace it!";
		}
	}
	//For injured and dying oxen
	else{
		var rand = 8;
		var heal = 5;
		if(job == "Cowboy") {rand+=2; heal-=2;}
		if(Math.floor(Math.random() * (heal)) == 0) oxenInjured = 0;
		if(Math.floor(Math.random() * (rand)) == 0){
			if(oxenInjured) {randMsg = "One of your oxen has died!"; supplies[OXEN]--; oxenInjured = 0;}
			else {oxenInjured = 1; randMsg = "One of your oxen is injured!"}
		}
	}
	changeWeather();
	//Check if they lost
	if(numCharacters == 0) lostGame();
    else if (tempTraveled >= distance[0]) {
		//Check if they won
		if(locType[0] == END){gameDone = 1; endGame();}
		else{
			//Ask if they wish to stop here
			totalTraveled = totalTraveled - (tempTraveled - distance[0]);
			tempTraveled = 0;
			currLocation = locations.shift();
			currType = locType.shift();
			distance.shift();
			stopLocation();
			console.log(distance.length);
		}
	}
    else if (!gameDone) mainGame();
}

function walk(){
	$(document).ready(function(){
	if(!checkMove()){ mainGame(); return;}
	document.getElementById("msg").innerHTML = "";
	var f = 0;
	var pace = .5;
	if(gameStatus[PACE] == STEADY)
		pace == 2;
	else if (gameStatus[PACE] == STRENUOUS)
		pace == 1;
	else if (gameStatus[PACE] == GRUELING)
		pace == .5;
	var id = setInterval(frame, 5);
    function frame() {
		if (f == 0 || f == 200* pace){
			$("#ok").attr("src", "image/Frame1.png");
		}
		else if (f == (50 * pace) || f == (250 * pace)){
			$("#ok").attr("src", "image/Frame2.png");
		}
		else if (f == (100 * pace)|| f == (300 * pace)){
			$("#ok").attr("src", "image/Frame1.png");
		}
		else if (f == (150 * pace)|| f == (350 * pace)){
			$("#ok").attr("src", "image/Frame4.png");
		}
        if (f == 400) {
			$("#ok").attr("src", "image/Frame1.png");
            clearInterval(id);
			travelTrail();
        } 
		else {
			f ++;
        }
    }
	});
}

function mainGame() {
	if(numCharacters == 0){lostGame(); return;}
	setDate();
	setHealth();
    var t = "<p id='msg'>"+randMsg+"</p>\
			<button class='button' id='checkOptions'><span>Check Options</span></button>\
			<p id='info' style='text-align: center;'>Date: " + months[month] + " " + day + ", " + year + "<br>\
			Weather: " + currWeather + "<br>\
			Health: " + currHealth + "<br>\
			Food: " + supplies[FOOD] + " pounds<br>\
			Next Landmark: " + (distance[0] - tempTraveled) + "<br>\
			Miles Traveled: " + totalTraveled + "</p>\
			" + spaceTxt + "\
			<div id='walking'><img src='image/mountain.JPG' id = 'col' alt='Mountain View' style='width:900px; height:350px; left:45%; margin-left: -350; position:absolute; background-color: black;'>\
			<img src='image/Frame1.png' id='ok' style = 'position:absolute; width: 180px; length: 180px; left: 50%; margin-left:-50px; margin-top:200px' alt='Mountain View'><div>";
    document.getElementsByClassName("container")[0].innerHTML = t;
    $(document).keypress(function (e) {
        if (e.keyCode == SPACEBAR) {
			$("#checkOptions").unbind();
            $(this).unbind();
            //travelTrail();
			walk();
        }
    });
    $("#checkOptions").click(function () {
        $(this).unbind();
        $(document).unbind();
        locationInfo();
    });
}

function lostGame(){
	//Store totalTraveled in the database with the player's name and his tombstone msg that comes from user input, the leaders name is at characters[0]
	document.getElementsByClassName("container")[0].innerHTML = "<h1>YOU LOSE FUCKER!!!</h1> <input type='text' val=''></input><br><button class='button'>Submit</button>";
}

function endGame() {
	var i;
	for(i = 0; i < supplies.length; i++) score += supplies[i];
    document.getElementsByClassName("container")[0].innerHTML = "<h1>YOU WIN FUCKER!!!</h1> <p>Your score: "+score+"</p> <input type='text' val=''></input><br><button class='button'>Submit</button>";
}