const container = document.querySelector("#images");
const result = document.querySelector("#result");
const images = document.querySelectorAll("#images img");
const userImage = document.querySelector("#result img:first-child");
const cmpImage = document.querySelector("#result img:last-child");
const conditions = [
	[0, 2],
	[1, 0],
	[2, 1],
];
let indexes = [];
let check = undefined;
let score = 0;
const message = document.querySelector("#choice h2");
const button = document.querySelector("#playAgain");
const showScore = document.querySelector("#showScore");
let start, previousTimeStamp, myRequest;
window.onload = () => {
	images.forEach((image, index) => {
		image.addEventListener("click", (el) => {
			container.style.display = "none";
			result.style.display = "flex";
			userImage.src = el.target.src;
			myRequest = window.requestAnimationFrame(step);

			indexes.push(index);
		});
	});
	button.addEventListener("click", () => {
		userImage.src = "";
		cmpImage.src = "";
		indexes = [];
		container.style.display = "flex";
		result.style.display = "none";
		window.cancelAnimationFrame(myRequest);
		myRequest = undefined;
		start = undefined;
		previousTimeStamp = undefined;
		message.innerText = "";
	});
};
const step = (timestamp) => {
	if (start === undefined) start = timestamp;
	const elapsed = timestamp - start;
	let id;

	if (previousTimeStamp !== timestamp) {
		// Math.min() is used here to make sure the element stops at exactly 200px
		id = Math.floor(Math.random() * images.length);
		cmpImage.src = images[id].src;
	}

	if (elapsed < 3000) {
		// Stop the animation after 2 seconds
		window.setTimeout(() => {
			previousTimeStamp = timestamp;
			console.log(id);
			myRequest = requestAnimationFrame(step);
		}, 100);
	} else {
		indexes.push(id);
		if (indexes[0] === indexes[1]) {
			check = "Draw";
		} else {
			const cond = conditions.filter(
				(cnd) => JSON.stringify(cnd) === JSON.stringify(indexes)
			);
			check = cond.length > 0 ? "WIN" : "LOSE";
			if (check === "WIN") score += 1;
			if (check === "LOSE") score -= 1;
		}

		showScore.innerText = score;
		message.innerText = check;
	}
};
