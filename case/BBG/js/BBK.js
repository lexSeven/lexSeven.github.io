// JavaScript Document
function Search( input , Text ){//搜索框
	
	input.onfocus = function(){
		Text.style.color = '#ccc';
	};
	input.onkeydown = function(){
		if(input.value.length>0){
			Text.style.display = 'none';
		};
	};
	input.onblur = function(){
		if(input.value.length==0){
			Text.style.display = 'block';
			Text.style.color = '#666';
		};
	};
};


function quickMenuShow( quick , menu , show){//下拉菜单
	
	quick.onmouseover = function(){
		addClass(menu,'hover')
		if(show)show[0].style.display = 'block';
		if(show)show[1].style.display = 'block';
	};
	
	quick.onmouseout = function(){
		removeClass(menu,'hover');
		if(show)show[0].style.display = 'none';
		if(show)show[1].style.display = 'none';
	};
	
};


function nav(){//导航菜单
	var nav = document.getElementById('nav');
	var oLi = nav.getElementsByTagName('li');
	for(var i=1;i<oLi.length;i++){
		oLi[i].index = i;
		oLi[i].onmouseover = function(){
			addClass(this,'hover')
		};
		oLi[i].onmouseout = function(){
			removeClass(this,'hover');
		};
	};
};


function allMenu(){//详细菜单
	var allMenu = document.getElementById('allMenu');
	var arrClass = ['','color'];
	var list = allMenu.getElementsByTagName('li');
	var listM = document.getElementById('listM');
	var Class = listM.getElementsByTagName('div');
	var timer = null;
	var n = 0;
	
	for(var i=0;i<list.length;i++){
		list[i].index = i;
		list[i].className = arrClass[i%arrClass.length];
		list[i].onmouseover = function(){
			clearTimeout(timer);
			listM.style.display = 'block';
			for(var i=0;i<Class.length;i++)Class[i].style.display = 'none';
			Class[this.index].style.display = 'block';
			addClass(this,'hover');
			n = this.index;
			doMove(listM, {
				opacity:100,
				top:this.offsetTop - 1
			}, 500);
		};
		
		list[i].onmouseout = function(){	
			removeClass(this,'hover');
			clearTimeout(timer);
			timer = setTimeout(function(){
				doMove(listM, {
					opacity:0
				}, 500,'', function(){listM.style.display = 'none';});
			},50);
		};
	};
	
	listM.onmouseover = function(){
		clearTimeout(timer);
		addClass(list[n],'hover');
	};
	
	listM.onmouseout = function(){
		timer = setTimeout(function(){
			doMove(listM, {
				opacity:0
			}, 500 ,'', function(){listM.style.display = 'none';});
		},50 );
		removeClass(list[n],'hover');
	};
};



function Kvisual(){//banner
clearInterval(timer);
	var banner = document.getElementById('banner');
	var oDl = banner.getElementsByTagName('dl')[0];
	var btn = banner.getElementsByTagName('dd');
	var oLi = banner.getElementsByTagName('li');
	oDl.style.marginLeft = -(oDl.offsetWidth/2) + 'px';
	var n = 0;
	var off = true;
	var timer = null;
	//alert(document.documentElement.clientWidth);
	for(var i=0;i<oLi.length;i++){
		oLi[i].style.opacity = 0;
		oLi[i].style.zIndex = 1;
		oLi[i].style.filter = 'alpha(opacity=0)';
	};
	oLi[0].style.opacity = 1;
	oLi[0].style.zIndex = 5;
	oLi[0].style.filter = 'alpha(opacity=100)';
				
	for(var i=0;i<btn.length;i++){
		btn[i].index = i;
		btn[i].onclick = function(){
			doMove(oLi[n], {opacity:0}, 500);
			oLi[n].style.zIndex = 1;
			removeClass(btn[n],'hover');
			addClass(this,'hover')
			doMove(oLi[this.index], {opacity:100}, 500);
			oLi[this.index].style.zIndex = 5;
			n = this.index
		};
	};
	
	banner.onmouseover = function(){
		clearInterval(timer);
	};
	
	banner.onmouseout = function(){
		timer = setInterval( function(){
			show();
		},3000);
	};
	
	timer = setInterval( function(){
		show();
	},3000);
	
	function show(){
		doMove(oLi[n], {opacity:0}, 500);
		oLi[n].style.zIndex = 1;
		removeClass(btn[n],'hover');
		n++;
		n%=oLi.length;
		addClass(btn[n],'hover')
		doMove(oLi[n], {opacity:100}, 500);
		oLi[n].style.zIndex = 5;
	};
};

function Tabs( obj , line , cont){//选项卡菜单
	//alert(typeof main[0]);
	var n = 0;
	for( var i=0;i<obj.length;i++){
		obj[i].index = i;
		obj[i].onmouseover = function(){
			//alert(typeof c[n]);
			doMove(line, {left:this.offsetLeft}, 500 )
			cont[n].style.display = 'none';	
			obj[n].className = '';
			n = this.index;
			obj[n].className = 'hover';
			cont[n].style.display = 'block';
		};
	};
};


function Timeout(){//倒计时
	var time = document.getElementById('time');
	var show = time.getElementsByTagName('i');
	
	
	timer(  'November 27,2015 22:3:0'  );
	function timer(T) {
		var iNow = null;
		var iNew = null;
		var t = 0;
		var str = '';
		var timer = null;
		
		iNew = new Date(T);
		clearInterval( timer );
		timer = setInterval (function (){
			iNow = new Date();
			t = Math.floor( ( iNew - iNow ) / 1000 );
			if ( t >= 0 ) {
				show[0].innerHTML = Math.floor(t/86400)+'天'+Math.floor(t%86400/3600);
				show[1].innerHTML = Math.floor(t%86400%3600/60);
				show[2].innerHTML = t%60;
			} else {
				clearInterval( timer );
			}
		}, 1000);
	};
}
