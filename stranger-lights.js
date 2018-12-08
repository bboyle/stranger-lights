const input = document.querySelector('input[name="message"]');
const p = document.querySelector('p');
const alphabet = document.querySelectorAll('input[type="checkbox"]');
const offset = 'A'.charCodeAt(0);
const timeout = [];


function turnEverythingOff() {
	alphabet.forEach(checkbox => checkbox.checked = false);
}


function turnLetterOn(letter) {
	turnEverythingOff();
	const index = letter.charCodeAt('0') - offset;

	if (index >= 0 && index < alphabet.length) {
		alphabet[index].checked = true;
	}
}


function turnLettersOn(letters) {
	let totalDelay = 0;
	letters.forEach(letter => {
		const delay = totalDelay + Math.round(Math.random() * 1500);
		timeout.push(setTimeout(() => turnLetterOn(letter), delay));
		timeout.push(setTimeout(() => turnEverythingOff(), delay + 750));
		totalDelay = delay + 750;
	});
}


function sayMessage(message) {
	const letters = message.toUpperCase().split('');
	turnLettersOn(letters);
}


input.addEventListener('input', () => {
	timeout.forEach(timeout => clearTimeout(timeout));
	timeout.length = 0;
	turnEverythingOff();
	sayMessage(input.value);
	location.hash = input.value;
});


// get message from url
const message = location.hash;
if (message.length) {
	sayMessage(message);
}
