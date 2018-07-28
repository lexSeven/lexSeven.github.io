function $s(option){
    if(typeof option === 'string'){
        return document.querySelector(option);
    }else if(typeof option === 'object'){
        var el = option.el || document;
        if(option.n){
            return el.querySelectorAll(option.s);
        }else{
            return el.querySelector(option.s);
        }
    }
}