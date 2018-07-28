/* bscroll 使用 */
(function(){
	let wrap = document.querySelector('.wrap');
	let silde = new BScroll(wrap,{
		bounce: false,
		wheel: {
			selectedIndex: 0,
			adjustTime: 400,
			rotate: 36,
			wheelWrapperClass: 'list',
  			wheelItemClass: 'list-item'
		}
	});
})();