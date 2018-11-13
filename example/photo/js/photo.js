var photo = document.querySelector('.photo'),
    imgfile = document.querySelector('.photo img');
var menu = document.querySelector('.menu'),
    adjustment = menu.querySelector('#adjustment'),//调整
    filter = menu.querySelector('#filter'),
    more = menu.querySelector('.more');
var adjOption = document.querySelectorAll('.regMenu span');/*调整项*/

var adjLine = document.querySelector('.line');
var adjBtn = document.querySelector('.line .btn');//调整按钮

var filterData = {
    'brightness':{
        'default':1,//默认值
        'min':0,//最小值
        'max':5,//最大值
        'unit':'',//单位
        'now':1,//当前值
        'range':5//取值区间数量
    },//亮度 -1+
    'contrast':{
        'default':1,
        'min':0,
        'max':5,
        'unit':'',
        'now':1,
        'range':5
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
document.addEventListener("touchstart",function(e){e.preventDefault()},{passive:true});
window.onload =resizeImg;

function resizeImg(){//重置图片尺寸
    var width = imgfile.getBoundingClientRect().width,
        height = imgfile.getBoundingClientRect().height;
    if(width>height){
        imgfile.style.height = '100%';
    }else{
        imgfile.style.width = '100%';
    }
};

var isOpen = false;
var defOption = 'brightness';
var defOptionNum = -1;

adjustment.ontouchstart = function(){//显示调整按钮
    if(isOpen){
        menu.classList.remove('active');
        photo.classList.remove('active');
        // this.classList.remove('close');
        // this.classList.add('adjustment');
        // filter.classList.remove('yes');
        // filter.classList.add('filter');
        isOpen = false;
    }else{
        menu.classList.add('active');
        photo.classList.add('active');
        // this.classList.add('close');
        // this.classList.remove('adjustment');
        // filter.classList.add('yes');
        // filter.classList.remove('filter');
        isOpen = true;
    }
};

imgfile.ontouchstart = function(){
    if(isOpen){
        menu.classList.remove('active');
        photo.classList.remove('active');
        isOpen = false;
    }
}

changeAdj();//选择调整项
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
addDrag();
function addDrag(){
    var max = adjLine.getBoundingClientRect().width - adjBtn.offsetWidth/2;
    var min = -20;
    var Proportion = 0;
    var newProportion = 0;
    adjLine.ontouchmove = function(ev){//拖拽调整
        var move = ev.changedTouches[0].clientX - this.getBoundingClientRect().left;
        if(move>min && move < max){
            adjBtn.style.transform= 'translateY(-50%) translateX('+ move +'px)';
            newProportion = (Math.floor(((move - min) / max)*100))/100;
            if(newProportion != Proportion){
                Proportion = newProportion;
                var range = filterData[defOption].max-filterData[defOption].min;
                filterData[defOption].now = range*Proportion;
                setFilter(imgfile);
            }
        }
        ev.preventDefault();
    }
}

setFilter(imgfile);
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
            photo.querySelector('.imgBox').innerHTML = '';
            photo.querySelector('.imgBox').appendChild(img);
            imgfile = document.querySelector('.photo img');
            resizeImg();
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


