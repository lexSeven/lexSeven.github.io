var photo = document.querySelector('.photo'),
    photoBox = photo.querySelector('.imgBox'),
    imgfile = photoBox.querySelector('img');
var menu = document.querySelector('.menu'),
    adjustment = menu.querySelector('#adjustment'),//调整
    filter = menu.querySelector('#filter');//滤镜

var adjOption = document.querySelectorAll('.regMenu span');/*调整项*/
var regulator = document.querySelector('.regulator');//调整面板
var filterMenu = document.querySelector('.filterMenu'),//滤镜面板
    filterBlock = filterMenu.querySelectorAll('.filterBlock');

var adjLine = document.querySelector('.line');
var adjBtn = document.querySelector('.line .btn');//调整按钮

var filterData = null;




document.addEventListener("touchstart",function(e){e.preventDefault()},{passive:true});
window.onload =init;

var isOpen,defOption,defOptionNum;

function init(){
    filterData = {
        'brightness':{
            'default':1,//默认值
            'min':0,//最小值
            'max':2,//最大值
            'unit':'',//单位
            'now':1,//当前值
            'range':2//取值区间数量
        },//亮度 -1+
        'contrast':{
            'default':1,
            'min':0,
            'max':2,
            'unit':'',
            'now':1,
            'range':2
        },//对比度 -1+
        'grayscale':{
            'default':0,
            'min':0,
            'max':1,
            'unit':'',
            'now':0,
            'range':1
        },//灰度 0-1
        'hue-rotate':{
            'default':0,
            'min':0,
            'max':360,
            'unit':'deg',
            'now':0,
            'range':360
        },//色相 0-360deg
        'invert':{
            'default':1,
            'min':0,
            'max':1,
            'unit':'',
            'now':0,
            'range':1
        },//反相 0-1
        'saturate':{
            'default':1,
            'min':0,
            'max':5,
            'unit':'',
            'now':1,
            'range':5
        },//饱和度 -1+
        'sepia':{
            'default':0,
            'min':0,
            'max':1,
            'unit':'',
            'now':0,
            'range':1
        },//褐色 0-1
        'blur':{
            'default':0,
            'min':0,
            'max':100,
            'unit':'px',
            'now':0,
            'range':100
        }//模糊 0+px
    };
    menu.classList.remove('active');
    photo.classList.remove('active');
    regulator.classList.remove('active');
    filterMenu.classList.remove('active');
    photoBox.querySelector('.filterColor').className = 'filterColor';

    isOpen = false;
    defOption = '';
    defOptionNum = -1;

    for(var i=0;i<adjOption.length;i++){
        adjOption[i].classList.remove('active');
    }
    adjBtn.style.transform= 'translateY(-50%) translateX(-20px)';

    filterEvent();
    setFilter(imgfile);
    changeAdj();//选择调整项
    addDrag();//拖动调整栏
    resizeImg();
}
function resizeImg(){//重置图片尺寸
    var width = imgfile.offsetWidth,
        height = imgfile.offsetHeight;
    if(height/width > 2){
        imgfile.style.cssText = '';
        imgfile.style.height = '100%';
    }else{
        imgfile.style.cssText = '';
        imgfile.style.width = '100vw';
    }
};

setHeight();
function setHeight(){
    photo.style.height = document.documentElement.clientHeight - menu.offsetHeight + 'px';
}


adjustment.ontouchstart = function(){//显示调整按钮
    if(isOpen=='adjustment'){
        menu.classList.remove('active');
        photo.classList.remove('active');
        regulator.classList.remove('active');
        isOpen = false;
    }else if(isOpen=='filter'){
        regulator.classList.add('active');
        filterMenu.classList.remove('active');
        isOpen = 'adjustment';
    }else{
        menu.classList.add('active');
        photo.classList.add('active');
        regulator.classList.add('active');
        isOpen = 'adjustment';
    }
};
filter.ontouchstart = function(){//显示调整按钮
    if(isOpen=='filter'){
        menu.classList.remove('active');
        photo.classList.remove('active');
        filterMenu.classList.remove('active');
        isOpen = false;
    }else if(isOpen=='adjustment'){
        filterMenu.classList.add('active');
        regulator.classList.remove('active');
        isOpen = 'filter';
    }else{
        menu.classList.add('active');
        photo.classList.add('active');
        filterMenu.classList.add('active');
        isOpen = 'filter';
    }
};

photo.ontouchstart = function(){//当点击图片的时候关闭所有调整面板
    if(isOpen){
        menu.classList.remove('active');
        photo.classList.remove('active');
        regulator.classList.remove('active');
        filterMenu.classList.remove('active');
        isOpen = false;
    }
};


function filterEvent(){
    for(var i=0;i<filterBlock.length;i++){
        filterBlock[i].ontouchstart = function(){
            var color = this.dataset.color;
            var filterDom = imgfile.parentNode.querySelector('.filterColor');
            var domWidth = imgfile.offsetWidth;
            var domHeight = imgfile.offsetHeight;
            var domLeft = imgfile.offsetLeft;
            var domTop = imgfile.offsetTop;
            filterDom.className = 'filterColor '+color;
            filterDom.style.cssText = 'width:'+ domWidth +'px;height:'+ domHeight +'px;left:'+ domLeft +'px;top:'+ domTop +'px';
        }
    }
}


function changeAdj(){
    var Proportion = 0;
    for(var i=0;i<adjOption.length;i++){
        adjOption[i].index = i;
        adjOption[i].ontouchstart = function(ev){
            this.classList.add('active');
            if(adjOption[defOptionNum]){
                adjOption[defOptionNum].classList.remove('active');
            }
            defOptionNum = this.index;
            defOption = this.dataset.option;
            Proportion = filterData[defOption].now/filterData[defOption].range;
            adjBtn.style.transform= 'translateY(-50%) translateX('+ (Proportion * adjBtn.parentNode.offsetWidth) +'px)';
            ev.preventDefault();
        }
    }
}

function addDrag(){
    var max = adjLine.getBoundingClientRect().width - adjBtn.offsetWidth/2;
    var min = -20;
    var Proportion = 0;
    var newProportion = 0;
    adjLine.ontouchmove = function(ev){//拖拽调整
        var move = ev.changedTouches[0].clientX - this.getBoundingClientRect().left;
        if(move>min && move < max && defOption != ''){
            adjBtn.style.transform= 'translateY(-50%) translateX('+ move +'px)';
            newProportion = (Math.floor(((move - min) / max)*100))/100;
            // adjBtn.innerText = newProportion*100;
            if(newProportion != Proportion){
                Proportion = newProportion;
                var range = filterData[defOption].max-filterData[defOption].min;
                filterData[defOption].now = range*Proportion;
                setFilter(imgfile);
            }
        }else if(defOption == ''){
            alert('哎呀，人家猜不到你要调整哪个哎~');
        }
        ev.preventDefault();
    }
}


function setFilter(obj){
    var str = '';
    var range = 0;
    for(a in filterData){
        str += a +'(' +filterData[a]['now']+filterData[a]['unit']+') ';
    }
    obj.style.filter = str;
}

uploadImg.onchange = function(){
    var fileT = fileType( this.files[0].name );
    if(fileT == '.jpeg' || fileT == '.jpg' || fileT == '.png' || fileT == '.gif'){
        var file = this.files[0];
        var reader = new FileReader();
        var img = document.createElement("img");
        reader.onload = function(){
            img.src = this.result;
            photoBox.removeChild(imgfile);
            photoBox.insertBefore(img,photoBox.querySelector('.filterColor'));
            imgfile = photoBox.querySelector('img');
            init();
        };
        reader.readAsDataURL(file);
    }else{
        console.log('请选择图片文件');
    }
}

function fileType(name){
    var newname=/\.[^\.]+$/.exec(name);
    return newname[0].toLocaleLowerCase();
}


