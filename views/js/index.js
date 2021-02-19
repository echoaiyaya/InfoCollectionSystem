window.onload = function() {
	$('.carousel').carousel();
	let navBtn = document.getElementById('navBtn');
	let navList = document.getElementById('navList');
	navBtn.onclick = function() {
		let key = navList.style.display;
		if (key == '' || key == 'none') {
			navList.style.display = 'block';
		} else {
			navList.style.display = 'none';
		}
	}
}