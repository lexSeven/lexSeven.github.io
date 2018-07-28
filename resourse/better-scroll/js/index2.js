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
	let bscroll = new BScroll(wrap,{
		scrollX: false,
		scrollY: true,
		momentum: false
	});
	bscroll.on("beforeScrollStart",function(){
		console.log(1);
	});
	/* BScroll 移动的是 wrap 下第0个子元素 */
})();