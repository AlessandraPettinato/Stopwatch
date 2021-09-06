let milli = 0;
let seconds = 0;
let minutes = 0;

let hasStopped = true;
let interval = true;

let lapsCount = 0;

const stopwatch = () => {
	milli++;
	if (milli >= 100) {
		milli = 0;
		seconds++;

		if (seconds >= 60) {
			seconds = 0;
			minutes++;
		}
	}
	document.getElementById("milliseconds").innerHTML =
		milli < 10 ? "0" + milli : milli;
	document.getElementById("seconds").innerHTML =
		seconds < 10 ? "0" + seconds : seconds;
	document.getElementById("minutes").innerHTML =
		minutes < 10 ? "0" + minutes : minutes;
};

const startStopwatch = () => {
	if (hasStopped) {
		interval = setInterval(stopwatch, 1);
		document.getElementById("start-stop").innerHTML = "stop";
		document.getElementById("lap").disabled = false;
		document.getElementById("lap").style.backgroundColor = "#0090dd";
		hasStopped = false;
	} else {
		clearInterval(interval);
		document.getElementById("start-stop").innerHTML = "start";
		hasStopped = true;
	}
};

// let lapsArray = [];
// let toMilli;
// const toMilliSeconds = (time) => {
//     let splitTime = (time.split(":").join("").split(".").join(""));
//     console.log(splitTime)
//     return toMilli = splitTime / 1000;
// }

// let timeToDisplay;
// let timeToMilli;
// let addMinutes = "0";

// const calculateLap = (array, time, funcToMilli) => {
//     if (array.length === 1) {
//         timeToDisplay = time;
//     } else {
//         timeToMilli = funcToMilli(array[array.length - 1]);
//         timeToDisplay = ((timeToMilli - funcToMilli(array[array.length - 2])) * 1000).toFixed(0);
//     }
//     console.log(timeToMilli, funcToMilli(array[array.length - 2]), timeToDisplay);
//     if (timeToDisplay.toString().length <= 2) {
//         timeToDisplay = "00:00" + "." + timeToDisplay.toString()
//     } else if (timeToDisplay.toString().length <= 3) {
//         timeToDisplay = "00:0" + timeToDisplay.toString().slice(0, 1) + "." + timeToDisplay.toString().slice(1);
//     } else if (timeToDisplay.toString().length <= 4 && timeToDisplay.toString().slice(0, 1) > 59) {
//         addMinutes++;
//         timeToDisplay = `${addMinutes}` + ":" + timeToDisplay.toString().slice(2, 3) + "." + (timeToDisplay.toString().slice(4) < 10 ? "0" + timeToDisplay.toString().slice(4) : timeToDisplay.toString().slice(4))
//     } else if (timeToDisplay.toString().length <= 4) {
//         timeToDisplay = "00:" + timeToDisplay.toString().slice(0, 2) + "." + timeToDisplay.toString().slice(2);
//     } else {
//         timeToDisplay = (timeToDisplay.toString().slice(0, 1) < 10 ? "0" + timeToDisplay.toString().slice(0, 1) : timeToDisplay.toString().slice(0, 1)) + ":" + timeToDisplay.toString().slice(1, 3) + "." + (timeToDisplay.toString().slice(3) < 10 ? "0" + timeToDisplay.toString().slice(3) : timeToDisplay.toString().slice(3))
//     }
//     if (array[array.length - 1] === array[array.length - 2]) {
//         document.getElementById("lap").disabled = true;
//         document.getElementById("lap").style.backgroundColor = "#a9a9a9"
//     }
//     return timeToDisplay
// }

let minutesToMilli;
let secondsToMilli;
let cutMilli;
let resultTime;
let convertToMilliSeconds = (time) => {
	minutesToMilli = parseInt(time.slice(0, 2) * 60000);
	secondsToMilli = parseInt(time.slice(3, 5) * 1000);
	cutMilli = parseInt(time.slice(6, 8));

	resultTime = minutesToMilli + secondsToMilli + cutMilli;
	return resultTime;
};

let lapsArray = [];
let displayTime;
let lapMinutes = 0;

const catchLap = (array) => {
	let calculateTime;
	if (array.length === 1) {
		displayTime = array[0];
	} else {
		lastTimeToMilli = convertToMilliSeconds(array[array.length - 1]);
		secondLastToMilli = convertToMilliSeconds(array[array.length - 2]);
		displayTime = (lastTimeToMilli - secondLastToMilli) / 1000;
		//displayTime = Math.floor(calculateTime * 100) / 100;
		console.log(lastTimeToMilli, secondLastToMilli, calculateTime, displayTime);
		if (Math.trunc(displayTime) >= 60) {
			lapMinutes++;
			displayTime =
				`${
					lapMinutes.toString().length === 1 ? "0" + lapMinutes : lapMinutes
				}` +
				":" +
				(Math.abs(60 - Math.trunc(displayTime)) < 10
					? "0" + Math.abs(60 - Math.trunc(displayTime))
					: Math.abs(60 - Math.trunc(displayTime))) +
				"." +
				(displayTime % 1).toFixed(2).substring(2);
		} else {
			displayTime =
				"00:" +
				(Math.trunc(displayTime) < 10
					? "0" + Math.trunc(displayTime)
					: Math.trunc(displayTime)) +
				"." +
				((displayTime % 1).toFixed(2).substring(2) < 10
					? (displayTime % 1).toFixed(2).substring(2)
					: (displayTime % 1).toFixed(2).substring(2));
		}
	}
	return displayTime;
};

const setLap = () => {
	lapsCount++;

	let lapCounter = document.createElement("li");
	let lapCounterContent = document.createTextNode(`${lapsCount}`);
	lapCounter.appendChild(lapCounterContent);
	document.getElementById("laps-count").appendChild(lapCounter);

	let catchTime = `${minutes < 10 ? "0" + minutes : minutes}:${
		seconds < 10 ? "0" + seconds : seconds
	}.${milli < 10 ? "0" + milli : milli}`;

	lapsArray.push(catchTime);
	console.log(lapsArray);

	let lapTotalTime = document.createElement("li");
	let lapTotalTimeContent = document.createTextNode(catchTime);
	lapTotalTime.appendChild(lapTotalTimeContent);
	document.getElementById("laps-total-time").appendChild(lapTotalTime);

	let lapTime = document.createElement("li");
	let lapTimeContent = document.createTextNode(`${catchLap(lapsArray)}`);
	lapTime.appendChild(lapTimeContent);
	document.getElementById("laps-time").append(lapTime);
};

const setReset = () => {
	clearInterval(interval);
	milli = 0;
	seconds = 0;
	minutes = 0;
	lapsCount = 0;
	lapsArray = [];

	document.getElementById("milliseconds").innerHTML = "00";
	document.getElementById("seconds").innerHTML = "00";
	document.getElementById("minutes").innerHTML = "00";
	document.getElementById("start-stop").innerHTML = "start";
	document.getElementById("laps-count").innerHTML = " ";
	document.getElementById("laps-total-time").innerHTML = " ";
	document.getElementById("laps-time").innerHTML = " ";
	document.getElementById("lap").disabled = false;
	document.getElementById("lap").style.backgroundColor = "#0090dd";
};
