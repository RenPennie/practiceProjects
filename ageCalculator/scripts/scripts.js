"use strict";

const btn = document.querySelector(".btn-submit");
const displayD = document.getElementById("displayD");
const displayM = document.getElementById("displayM");
const displayY = document.getElementById("displayY");
const dayError = document.querySelector(".form-item__day");
const monthError = document.querySelector(".form-item__month");
const yearError = document.querySelector(".form-item__year");

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

function isLeapYear(currentYear) {
	return year % 400 === 0 || year % 4 === 0;
}

function validateForm() {
	dayError.classList.remove("error-empty", "error-invalid");
	monthError.classList.remove("error-empty", "error-invalid");
	yearError.classList.remove("error-empty", "error-invalid");

	const usrDay = document.getElementById("day").value;
	const usrMonth = document.getElementById("month").value;
	const usrYear = document.getElementById("year").value;

	let dayErrorFound = false;
	let monthErrorFound = false;
	let yearErrorFound = false;

	if (!usrDay) {
		dayError.classList.add("error-empty");
		dayErrorFound = true;
	}
	if (!usrMonth && !monthErrorFound) {
		monthError.classList.add("error-empty");
		monthErrorFound = true;
	}
	if (!usrYear && !yearErrorFound) {
		yearError.classList.add("error-empty");
		yearErrorFound = true;
	}

	if (usrYear > currentYear && !yearErrorFound) {
		yearError.classList.add("error-invalid");
		yearErrorFound = true;
	}
	if ((usrMonth < 1 || usrMonth > 12) && !monthErrorFound) {
		monthError.classList.add("error-invalid");
		monthErrorFound = true;
	}
	if (
		(!dayErrorFound && usrDay < 1) ||
		usrDay > 31 ||
		(usrMonth == 2 && usrDay > (isLeapYear(usrYear) ? 29 : 28)) ||
		((usrMonth == 4 || usrMonth == 6 || usrMonth == 9 || usrMonth == 11) && usrDay > 30)
	) {
		dayError.classList.add("error-invalid");
		dayErrorFound = true;
	}

	if (!dayErrorFound && !monthErrorFound && !yearErrorFound) {
		calculateAge(usrDay, usrMonth, usrYear);
	}
}

function calculateAge(usrDay, usrMonth, usrYear) {
	let yearAge = currentYear - usrYear;
	let monthAge = currentMonth >= usrMonth ? currentMonth - usrMonth : 12 + currentMonth - usrMonth - 1;
	let dayAge = currentDay >= usrDay ? currentDay - usrDay : 31 + currentDay - usrDay - (monthAge > 0 ? 0 : 1);

	if (monthAge < 0) {
		yearAge--;
		monthAge += 12;
	}

	displayAge(yearAge, monthAge, dayAge);
}

function displayAge(yearAge, monthAge, dayAge) {
	displayY.innerHTML = yearAge;
	displayM.innerHTML = monthAge;
	displayD.innerHTML = dayAge;
}

btn.addEventListener("click", validateForm);
