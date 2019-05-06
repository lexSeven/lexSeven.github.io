function ajax(){
    var ajaxData = {
        type: (arguments[0].type || "GET").toUpperCase(),
        url: arguments[0].url || "",
        async: arguments[0].async || "true",
        data: arguments[0].data || null,
        dataType: arguments[0].dataType || "json",
        contentType: arguments[0].contentType || "application/x-www-form-urlencoded; charset=utf-8",
        beforeSend: arguments[0].beforeSend || function(){},
        success: arguments[0].success || function(){},
        error: arguments[0].error || function(){}
    }

    ajaxData.beforeSend()
    var xhr = createxmlHttpRequest();
    xhr.responseType=ajaxData.dataType;

    var params = [];
    for(var key in ajaxData.data){
        params.push(key + "=" + ajaxData.data[key]);
    }
    var sendData = params.join("&");
    if(ajaxData.type.toUpperCase() == "GET"){
        xhr.open(ajaxData.type, ajaxData.url + "?" + sendData, ajaxData.async);
        xhr.send(null);
    }else{
        xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        xhr.send(sendData);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if(xhr.status == 200){
                ajaxData.success(xhr.response)
            }else{
                ajaxData.error()
            }
        }
    }
}

function createxmlHttpRequest() {
    if (window.ActiveXObject) {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
}

function convertData(data){
    if( typeof data === 'object' ){
        var convertResult = "" ;
        for(var c in data){
            convertResult+= c + "=" + data[c] + "&";
        }
        convertResult=convertResult.substring(0,convertResult.length-1)
        return convertResult;
    }else{
        return data;
    }
}

