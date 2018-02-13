'use strict'

let imgs = [{extension: '01.jpg', title: 'Hay Bales', description: 'I love hay bales. Took this snap on a drive through the countryside past some straw fields.'},{extension: '02.jpg', title: 'Lake', description: 'The lake was so calm today. We had a great view of the snow on the mountains from here.'},{extension: '03.jpg', title: 'Canyon', description: 'I hiked to the top of the mountain and got this picture of the canyon and trees below.'},{extension: '04.jpg', title: 'Iceberg', description: 'It was amazing to see an iceberg up close, it was so cold but didn\’t snow today.'},{extension: '05.jpg', title: 'Desert', description: 'The red cliffs were beautiful. It was really hot in the desert but we did a lot of walking through the canyons.'},{extension: '06.jpg', title: 'Fall', description: 'Fall is coming, I love when the leaves on the trees start to change color.'},{extension: '07.jpg', title: 'Plantation', description: 'I drove past this plantation yesterday, everything is so green!'},{extension: '08.jpg', title: 'Dunes', description: 'My summer vacation to the Oregon Coast. I love the sandy dunes!'},{extension: '09.jpg', title: 'Countryside Lane', description: 'We enjoyed a quiet stroll down this countryside lane.'},{extension: '10.jpg', title: 'Sunset', description: 'Sunset at the coast! The sky turned a lovely shade of orange.'},{extension: '11.jpg', title: 'Cave', description: 'I did a tour of a cave today and the view of the landscape below was breathtaking.'},{extension: '12.jpg', title: 'Bluebells', description: 'I walked through this meadow of bluebells and got a good view of the snow on the mountain before the fog came in.'}];

document.addEventListener("DOMContentLoaded", function (event) {
//SELECTORS
	const body = document.getElementById('body');
	const lightbox = document.getElementById('lightbox');
	const content = document.getElementById('content');
	const textbox = document.getElementById('textbox');
	const leftArrow = document.getElementById('left');
	const rightArrow = document.getElementById('right');
	const lightboxImg = document.getElementById('lightboxImg');
	const search = document.getElementsByClassName('search-box')[0];
	let currentImages = null;

//FUNCTIONS
	//setup DOM [dynamic]
	function constructDOM (images = imgs) {
		while (content.firstChild) {
    	content.removeChild(content.firstChild);
		}
		images.forEach(function (img) {
			let div = document.createElement('div');
			div.className = 'img';
			div.style.backgroundImage = `url(photos/thumbnails/${img.extension})`;
			content.append(div);
		});
	}

	function manipulateLightbox (imgExtension) {
		lightbox.style.display = 'flex';
		lightboxImg.style.backgroundImage = `url(photos/${imgExtension})`;
		console.log(imgExtension);
		textbox.innerHTML = `${imgs[parseInt(imgExtension)-1].description}`;
	}

	function closeLightbox () {
		lightbox.style.display = 'none';
	}

	function getImgExtension (target = lightboxImg) {
		return target.style.backgroundImage.slice(-8, -2);
	}

	//returns an array of current images on the DOM, formatted to just the extension
	function getCurrentImages () {
		return Array.from(document.getElementsByClassName('img')).map(function(target){
			return getImgExtension(target);
		});
	}

	function changeLightbox (direction) {
		//which image is currently displayed, so we can relatively adjust based on whichever direction
		let current = getImgExtension();
		let currentIndex = currentImages ? currentImages.indexOf(current) : 0;

		if (!currentImages) {
			currentImages = getCurrentImages();
			currentIndex = currentImages.indexOf(current);
		}

		if (direction === 'left') {
			let previous = currentIndex == 0 ? currentImages.length-1 : currentIndex-1;
			manipulateLightbox(currentImages[previous]);
		} else if (direction === 'right') {
			let next = currentIndex == currentImages.length-1 ? 0 : currentIndex+1;
			manipulateLightbox(currentImages[next]);
		}
	}

//EVENT LISTENERS
	content.addEventListener("click", function (event) {
		let targetClass = event.target.className;
		let img = getImgExtension(event.target) || null;
		if(targetClass === 'img'){
			manipulateLightbox(img);
		}
	}, false);

	lightbox.addEventListener("click", function (event) {
		let arrow = event.target.parentElement.className;

		if (event.target.localName !== 'img') {
			closeLightbox();
		} else if (arrow.includes('leftArrow')) {
			changeLightbox('left');
		} else if (arrow.includes('rightArrow')) {
			changeLightbox('right');
		}
	});

	search.addEventListener("keyup", function(event) {
		console.log('here');
		let filtered = Array.from(imgs.filter(function(imgObj){
			return imgObj.description.includes(event.target.value);
		}));
		console.log(typeof filtered);
		constructDOM(filtered);
	});

	constructDOM();
});
