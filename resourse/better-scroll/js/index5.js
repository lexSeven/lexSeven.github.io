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
	let list = document.querySelector('.list');
	let bScroll = new BScroll(wrap,{
		pullUpLoad: {
			threshold: 50
		},
		pullDownRefresh: {
			threshold: -50,
			stop: 50
		} 
	});
	/* 下拉刷新 */
	bScroll.on("pullingDown",function(){
		list.classList.add("pullDown");
		setTimeout(function(){
			let inner = "";
			for (var i = 0; i < 10; i++) {
				inner += '<li>这是新加的第'+i+'个li</li>'
			}
			list.innerHTML = inner + list.innerHTML;
			bScroll.finishPullDown();
			bScroll.refresh();
			list.classList.remove("pullDown");
		},1000);
	});
	/* BScroll 移动的是 wrap 下第0个子元素 */
	bScroll.on("pullingUp",function(){
		console.log(1);
		list.classList.add("pullUp");
		setTimeout(function(){
			let inner = "";
			for (var i = 0; i < 10; i++) {
				inner += '<li>这是新加的第'+i+'个li</li>'
			}
			list.innerHTML += inner;
			list.classList.remove("pullUp");
			bScroll.finishPullUp();
			bScroll.refresh();
		},1000);
	});

})();