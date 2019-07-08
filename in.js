https://www.instagram.com/explore/people/suggested/

var buttons = document.getElementsByTagName('button')
	stack = [];

for (var i in buttons) {
	stack.push(buttons[i]);
}



function lazyClick() {
	var button = stack.shift();
	
	if (typeof button === 'object') {
		console.log('подписка');
		button.click();
	} else {
		console.log('финиш');
		return false;
	}
	
	setTimeout(function () {
		lazyClick();
	}, getRandomInt(3000, 5000));
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
