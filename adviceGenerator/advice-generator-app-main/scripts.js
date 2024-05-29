"use strict";
//get DOM elements
const btn = document.querySelector(".advice--btn");
const adviceID = document.querySelector(".id-number");
const adviceElement = document.querySelector(".advice--replace");

// Define the API URL
const apiUrl = "https://api.adviceslip.com/advice";

function getAdvice() {
	// Make a GET request
	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		})
		.then((data) => {
			console.log(data.slip.id);
			adviceID.innerHTML = data.slip.id;
			console.log(data.slip.advice);
			adviceElement.innerHTML = data.slip.advice;
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
getAdvice();
btn.addEventListener("click", getAdvice);
