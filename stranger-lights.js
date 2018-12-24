const OFFSET = 11;
const MIN = 'A'.charCodeAt(0);
const MAX = 'Z'.charCodeAt(0);
const FILL = '.';

const input = document.querySelector('input[name="message"]');
const p = document.querySelector('p');
const alphabet = document.querySelectorAll('input[type="checkbox"]');
const offset = 'A'.charCodeAt(0);
const timeout = [];


function encodeChar(char, offset = OFFSET, fill = FILL) {
	let code = char.charCodeAt(0);
	if (code >= MIN && code <= MAX) {
		code += offset;
		if (code > MAX) {
			code = MIN + code - MAX;
		}
		return String.fromCharCode(code);
	}
	return fill;
}


function encode(text) {
	return [...text.toUpperCase()].map(c => encodeChar(c)).join('');
}


function decode(text) {
	return [...text.toUpperCase()].map(c => encodeChar(c, -OFFSET, ' ')).join('');
}


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
	location.hash = encode(input.value);
});


// get message from url
const message = decode(location.hash.replace(/^#/, ''));
if (message.length) {
	sayMessage(message);
}
