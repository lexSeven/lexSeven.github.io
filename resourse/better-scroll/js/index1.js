(function(){
	let list = document.querySelector('.list');
	let inner = "";
	for (var i = 0; i < 50; i++) {
		inner += '<li>这是第'+i+'个li</li>';
	}
	list.innerHTML = inner;
})();

/* bscroll 使用 */
(function(){
	let wrap = document.querySelector('.wrap');
	new BScroll(wrap);
	/* BScroll 移动的是 wrap 下第0个子元素 */
})();