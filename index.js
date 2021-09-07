let centi = 0;
let seconds = 0;
let minutes = 0;

let hasStopped = true;
let interval = true;

let lapsCount = 0;

const getPaddedString = (str) => {
	return str.toFixed(2).substring(2).length === 1
		? "0" + str.toFixed(2).substring(2)
		: str.toFixed(2).substring(2);
};

const getPaddedNumber = (num) => {
	return Math.trunc(num) < 10 ? "0" + Math.trunc(num) : Math.trunc(num);
};

const stopwatch = () => {
	centi++;
	if (centi >= 100) {
		centi = 0;
		seconds++;

		if (seconds >= 60) {
			seconds = 0;
			minutes++;
		}
	}
	document.getElementById("milliseconds").innerHTML = getPaddedNumber(centi);
	document.getElementById("seconds").innerHTML = getPaddedNumber(seconds);
	document.getElementById("minutes").innerHTML = getPaddedNumber(minutes);
};

const convertToMilliSeconds = (time) => {
	let minutesToMilli;
	let secondsToMilli;
	let cutMilli;

	minutesToMilli = parseInt(time.slice(0, 2)) * 60 * 1000;
	secondsToMilli = parseInt(time.slice(3, 5)) * 1000;
	cutMilli = parseInt(time.slice(6, 8)) * 10;

	return minutesToMilli + secondsToMilli + cutMilli;
};

let lapsArray = [];
let displayTime;
let catchTime;

const catchLap = (array) => {
	let lastTimeInArray;
	let secondLastTimeInArray;
	let calculateTimeInSeconds;
	let rest;

	if (array.length === 1) {
		displayTime = array[0];
	} else {
		lastTimeInArray = convertToMilliSeconds(array[array.length - 1]);
		secondLastTimeInArray = convertToMilliSeconds(array[array.length - 2]);
		calculateTimeInSeconds = (lastTimeInArray - secondLastTimeInArray) / 1000;

		rest = Math.trunc(calculateTimeInSeconds) % 60;
		displayTime =
			getPaddedNumber(calculateTimeInSeconds / 60) +
			":" +
			getPaddedNumber(rest) +
			"." +
			getPaddedString(calculateTimeInSeconds % 1);
	}
	return displayTime;
};

const printLap = () => {
	let lapCounter = document.createElement("li");
	let lapCounterContent = document.createTextNode(`${lapsCount}`);
	lapCounter.appendChild(lapCounterContent);
	document.getElementById("laps-count").appendChild(lapCounter);

	let lapTotalTime = document.createElement("li");
	let lapTotalTimeContent = document.createTextNode(catchTime);
	lapTotalTime.appendChild(lapTotalTimeContent);
	document.getElementById("laps-total-time").appendChild(lapTotalTime);

	let lapTime = document.createElement("li");
	let lapTimeContent = document.createTextNode(`${catchLap(lapsArray)}`);
	lapTime.appendChild(lapTimeContent);
	document.getElementById("laps-time").append(lapTime);
};

const startStopwatch = () => {
	if (hasStopped) {
		interval = setInterval(stopwatch, 10);
		document.getElementById("start-stop").innerHTML = "stop";
		document.getElementById("lap").disabled = false;
		document.getElementById("lap").style.backgroundColor = "#22031f";
		document.getElementById("reset").disabled = false;
		document.getElementById("reset").style.backgroundColor = "#22031f";
		hasStopped = false;
	} else {
		clearInterval(interval);
		document.getElementById("start-stop").innerHTML = "start";

		lapsCount++;
		catchTime = `${getPaddedNumber(minutes)}:${getPaddedNumber(
			seconds
		)}.${getPaddedNumber(centi)}`;
		lapsArray.push(catchTime);
		printLap(catchTime);

		document.getElementById("lap").disabled = true;
		document.getElementById("lap").style.backgroundColor = "#4E354B";
		document.getElementById("reset").disabled = false;
		document.getElementById("reset").style.backgroundColor = "#22031f";
		hasStopped = true;
	}
};

const setLap = () => {
	lapsCount++;
	catchTime = `${getPaddedNumber(minutes)}:${getPaddedNumber(
		seconds
	)}.${getPaddedNumber(centi)}`;
	lapsArray.push(catchTime);
	printLap(catchTime);
};

const setReset = () => {
	clearInterval(interval);
	centi = 0;
	seconds = 0;
	minutes = 0;
	lapsCount = 0;
	lapsArray = [];
	hasStopped = true;

	document.getElementById("milliseconds").innerHTML = "00";
	document.getElementById("seconds").innerHTML = "00";
	document.getElementById("minutes").innerHTML = "00";
	document.getElementById("start-stop").innerHTML = "start";
	document.getElementById("laps-count").innerHTML = " ";
	document.getElementById("laps-total-time").innerHTML = " ";
	document.getElementById("laps-time").innerHTML = " ";
	document.getElementById("lap").disabled = true;
	document.getElementById("lap").style.backgroundColor = "#4E354B";
	document.getElementById("reset").disabled = true;
	document.getElementById("reset").style.backgroundColor = "#4E354B";
};
