// JavaScript Document

//box定位
function BoxPosition(){
	box.style.marginLeft = (Width-box.clientWidth)/2+'px';
	box.style.marginTop = (Height-box.clientHeight)/2+'px';
};

//出场动画
function out(){
	doMove(arr[5], {left :403,top :275}, 1000, 'elasticOut', function(){
		doMove(arr[0], {left :46,top :299}, 3000, 'elasticOut');
		doMove(arr[1], {left :150,top :371}, 2000, 'elasticOut');
		doMove(arr[2], {left :273,top :275}, 1000, 'elasticOut');
		doMove(arr[3], {left :333,top :341}, 3000, 'elasticOut');
		doMove(arr[4], {left :407,top :441}, 2000, 'elasticOut');
		doMove(arr[6], {left :944,top :299}, 1000, 'elasticOut');
		doMove(arr[7], {left :1041,top :312}, 3000, 'elasticOut');
		doMove(arr[8], {left :1103,top :242}, 800, 'elasticOut');
		doMove(arr[9], {left :1186,top :405}, 1000, 'elasticOut', 
		function(){
			off = true;
			doMove(arrlogo[0], {opacity :100,height :105}, 1000, 'bounceOut');
			doMove(arrlogo[1], {opacity :100,height :115}, 1000, 'bounceOut');
			doMove(arrlogo[2], {opacity :100,height :104}, 1000, 'bounceOut');
			doMove(arrlogo[3], {opacity :100,height :115}, 1000, 'bounceOut');
		});
		
	});	
	
};

//导航拖拽
function menuDrag( obj , Mclose){
	var mLeft = obj.offsetLeft;
	var mTop = obj.offsetTop;
	obj.onmousedown = function( ev ){
		var ev = ev || event;
		if(ev.clientX<obj.offsetLeft+60){
			drug( ev , obj , 'menu_bg' , function(){
				Mclose.style.display = 'block';
				Mclose.onclick = function(){
					doMove(obj, {left :mLeft,top :mTop}, 1000, 'easeBoth');
					this.style.display = 'none';
				};
			})
		};	
	};	
};