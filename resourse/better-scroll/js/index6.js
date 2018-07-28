/* bscroll 使用 */
(function(){
	let listWrapper = document.querySelector('.list-wrapper');
	let indexListNav = document.querySelector('.index-list-nav');
	let indexListNavs = indexListNav.querySelectorAll('li');
	let indexListFixed = document.querySelector('.index-list-fixed');
	let indexList = new BScroll(listWrapper,{
		probeType: 3
	});	
	let indexListContent = document.querySelector('.index-list-content');
	let indexLists = indexListContent.children[1].children;
	indexListNav.addEventListener('touchstart', function(e) {
		setIndex(e.changedTouches[0].clientY);
	});
	indexListNav.addEventListener('touchmove', function(e) {
		setIndex(e.changedTouches[0].clientY);
	});
	indexList.on("scroll",function(e){
		let y = -e.y;
		if(y < indexLists[0].offsetTop){
			setNav(0);
			indexListFixed.style.display = "none";
			return ;
		} 
		indexListFixed.style.display = "block";
		for(var i = 0; i < indexLists.length - 1; i++){
			if(y >= indexLists[i].offsetTop
			&& y < indexLists[i+1].offsetTop){
				setNav(i);
				indexListFixed.innerHTML = indexLists[i].children[0].innerHTML;
				return; 
			}
		}
		setNav(indexLists.length - 1);
		indexListFixed.innerHTML = indexLists[indexLists.length - 1].children[0].innerHTML;
	});
	function setIndex(y){
		let index = getIndex(y);
		if(index < 0 
		|| index > 9){
			return ;
		}
		indexList.scrollToElement(indexLists[index],100);
	}
	function getIndex(y){
		let navT = indexListNav.getBoundingClientRect().top;
		let h = 18;
		let index = parseInt((y-navT)/18);
		return index;
	}
	function setNav(index){
		indexListNavs.forEach((li)=>{
			li.classList.remove("active");
		});
		indexListNavs[index].classList.add("active");
	}
})();