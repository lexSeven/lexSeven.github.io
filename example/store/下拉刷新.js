function zeptoLoaded() {
    var wrapper = document.querySelector('.wrapper');
    var shopInf = document.querySelector('.shop-inf');
    var loadDom = document.querySelector('.loadBox');
//        wrapper.style.height = window.innerHeight - shopInf.offsetHeight + 'px';
    var isReload = true;
    var isBack = false;
    var scroll = new BScroll('.wrapper',{
        zoom:true,
//            bounce:false,
        momentumLimitTime:500,
        swipeTime:1000,
        pullDownRefresh: {
            threshold: 50,
            stop: 40
        }
    });
    scroll.on('pullingDown',function(){
        console.log('下拉了');
//            loadDom.style.top = 0;
        loadDom.classList.add('active');
        setTimeout(function(){
            scroll.finishPullDown();
        },1000);
    });
    scroll.on('touchEnd',function(){
        if(this.y>0){
            isBack = true;
        }
        if(this.y>50){
            loadDom.style.transition = '1s';
            loadDom.style.top = 10 + 'px';
        }
        isReload = false;
    });
    scroll.on('scrollEnd',function(){
        if(this.y==0){
            isReload = true;
            isBack = false;
            loadDom.style.top = 0;
            loadDom.style.transition = '0s';
            loadDom.classList.remove('active');
        }
    });
    scroll.on('scroll',function(){
        if(this.y > 0 && isReload){
            loadDom.style.top = this.y/2 + 'px';
            loadDom.style.transform = 'rotate('+ (this.y-45) +'deg)';
        }else if(isBack){
            loadDom.style.transition = '1s';
            loadDom.style.top = this.y + 'px';
        }
    });
};