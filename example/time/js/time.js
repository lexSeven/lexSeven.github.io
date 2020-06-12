import popEvent from './event.js';

let temp = document.createElement('template');
document.body.appendChild(temp);
temp.innerHTML = `
<em></em>
<span>
    {{date}}<br>
    <small>{{time}}</small>
</span>
<div class="alert">点击有惊喜哦！</div>`;

export default class myCom extends HTMLElement {
    constructor() {
        super();
        let attr = this.attributes;
        this._data = {
            date: attr.date ? attr.date.value : '日期还没计算好',
            time: attr.time ? attr.time.value : '时间是很宝贵的，不能轻易展示出来',
        }
        this.render();
        this.compileNode(this);
        this.observe(this._data);
        this.bindEvent();
        this.updateTime();
    }
    observe(data) {
        let _this = this;
        this._data = new Proxy(data, {
            set(obj, prop, value) {
                let event = new CustomEvent(prop, {
                    detail: value
                });
                _this.dispatchEvent(event);
                return Reflect.set(...arguments);
            }
        });
    }
    bindEvent() {
        this.event = new popEvent({
            obj: this
        });
    }
    render() {
        this.append(temp.content.cloneNode(true));
    }
    updateTime(){
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth()+1;
        let date = d.getDate();
        let _this = this;

        this._data.date =  year + '年' + month + '月' + date + '日';
        this._data.time = d.getHours() + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());

        setInterval(function(){
            let d = new Date();
            _this._data.time = d.getHours() + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
        },1000);

        function addZero(n){
            return n < 10 ? '0' + n : n;
        }
    }
    compileNode(el) {
        let child = el.childNodes;
        [...child].forEach((node) => {
            if (node.nodeType === 3) {
                let text = node.textContent;
                let reg = /\{\{\s*([^\s\{\}]+)\s*\}\}/g;
                if (reg.test(text)) {
                    let $1 = RegExp.$1;
                    this._data[$1] && (node.textContent = text.replace(reg, this._data[$1]));

                    this.addEventListener($1, (e) => {
                        node.textContent = text.replace(reg, e.detail)
                    })

                };
            } else if (node.nodeType === 1) {
                let attrs = node.attributes;
                if (attrs.hasOwnProperty('v-model')) {
                    let keyname = attrs['v-model'].nodeValue;
                    node.value = this._data[keyname];
                    node.addEventListener('input', e => {
                        this._data[keyname] = node.value;
                    });
                    // console.log(this._data);
                    // console.log(attrs['v-model'].nodeValue);
                }

                if (node.childNodes.length > 0) {
                    this.compileNode(node);
                }
            }
        })
    }
    requestfullscreen(option) {
        // console.log(123);
        let element = option.obj;

        element.querySelector('.alert').style.display = 'none';

        let requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            let wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
}



window.customElements.define('my-com', myCom);

let style = document.createElement('style');
document.body.appendChild(style);
style.innerText = `
html,body{
    height: 100%;
}
body{
    background: #2f474d;
    text-align: center;
    color: #fff;
    overflow: hidden;
}
em{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
span{
    font-size: 130px;
    line-height: 130px;
    display: inline-block;
    vertical-align: middle;
    color: #fff;
}
span small{
    font-size: 80px;
}

.next{
    position: absolute;
    width: 100px;
    height: 50px;
    line-height: 50px;
    bottom:0;
    left: 50%;
    margin-left: -50px;
    text-align: left;
    padding-left: 20px;
    color:#fff;
    cursor: pointer;
    /* background: #aaa; */
}
.next:after{
    content: '';
    display: block;
    width: 2px;
    height: 12px;
    background: #fff;
    transform: rotate(45deg);
    position: absolute;
    top: 18px;
    left: 0;
}
.next:before{
    content: '';
    display: block;
    width: 2px;
    height: 12px;
    background: #fff;
    transform: rotate(-45deg);
    position: absolute;
    top: 18px;
    left: -7px;
}

.alert{
    width: 290px;
    height: 50px;
    border-radius: 3px;
    background: #2a2e34;
    font-size: 16px;
    color: #fff;
    line-height: 50px;
    text-align:center;
    position: absolute;
    top: 50px;
    left: 50%;
    margin-left:-145px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.7);
    cursor: pointer;
}
`;