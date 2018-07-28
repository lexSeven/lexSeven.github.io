/* bscroll 使用 */
(function(){
	let wrap = document.querySelector('.wrap');
	let list = document.querySelector('.list');
	let navs = document.querySelectorAll('.nav a');
	let silde = new BScroll(wrap,{
		scrollX: true,
		scrollY: false,
		momentum: false,
		snap: {
			loop: true,
			threshold: .2
		}
	});
	list.style.width = list.children.length + "00vw";
	silde.refresh();//修改了dom之后，重新计算一下
	/* BScroll 移动的是 wrap 下第0个子元素 */
	silde.on("scrollEnd",function(){
		navs.forEach((nav)=>{
			nav.classList.remove("active");
		});
		navs[silde.getCurrentPage().pageX].classList.add("active");
	});
	setInterval(function(){
		silde.next();
	},3000);
})();