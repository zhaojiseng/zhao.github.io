// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.hbyczk.com/queryPost
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let zkz = "*";  //你的准考证
    let idcard = "*";  //你的身份证
    let isStart1 = false;
    let doc;
    let times;
    times = 0;
    let size;
    size = 0;
    doc = document.getElementsByClassName('container theme-showcase')[0];
    let pMenu = document.createElement("p");
    let obj1;
    obj1 = document.createElement("a");
    obj1.className = "btn btn-success btn-lg";
    obj1.innerText = "Start";
    obj1.onclick = function start() {
        if (xmlhttp !== undefined){
            isStart1 = true;
            fStart();
        }
    };
    let obj2;
    obj2 = document.createElement("textarea");
    obj2.id = "textArea1";
    obj2.style = "margin: 0px; width: 700px; height: 170px;";
    let obj3;
    obj3 = document.createElement("a");
    obj3.className = "btn btn-success btn-lg";
    obj3.innerText = "Stop";
    obj3.onclick = function stop() {
        isStart1 = false;
    };
    let obj4;
    obj4 = document.createElement("nobr");
    obj4.innerText = " ";
    let dataObj;
    dataObj = document.createElement("nobr");
    dataObj.id = "screenData";
    pMenu.appendChild(obj1);
    pMenu.appendChild(obj4);
    pMenu.appendChild(obj3);
    pMenu.appendChild(dataObj);
    doc.appendChild(pMenu);
    doc.appendChild(obj2);


    //ajax
    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange=function getAlready(){
        if (xmlhttp.readyState===4 &&xmlhttp.status===200)
        {
            let allText, outText;
            allText = xmlhttp.responseText;
            outText = /var data = ".*?;/s.exec(allText);
            outText = /".*?"/.exec(outText)[0];

            //alert(Object.prototype.toString.call(outText));
            outText = outText.substring(1, outText.length-1);
            document.getElementById('textArea1').value = outText;
            init1(outText);
            size = size + getLength(allText + idcard + zkz + "id: Content-type: application/x-www-form-urlencoded4&|code: ");
            if (isStart1){
                fStart();
            }
        }
    };

    function fStart() {
        let d = new Date();
        let txt = d.getHours() + "." + d.getMinutes() + "." + d.getSeconds() + "." + d.getMilliseconds();
        xmlhttp.open("POST","http://www.hbyczk.com/queryPost",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("id=4&" + "code="+ zkz + "|" +idcard);
        times = times + 1;
        document.getElementById("screenData").innerText ="最后一次刷新时间：" + txt + "(" + times.toString() +"|" + Math.floor(size/1000) +"kB)";
    }
    function init1(data){
        //处理列标题
        let allTitle = "报名号,准考证号,姓名,身份证号,性别,学籍类型,分配生资格,总分,原始分,语文,数学,外语,物理,化学,体育,优录分,优录(不加分),历史,地理,道法,生物,音,美,实,方,校,综,公,学,交,运,审";
        let showTitleNo = "1,3,5,6,7,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32";
        let showTitleNoArray = showTitleNo.split(",");
        let titleArray = allTitle.split(",");


        let obj = document.getElementById("auto_gen_table_item");


        let row = data.split(",",-1);
        let index = 0;
        for(let i=0;i<showTitleNoArray.length;i++){
            index = showTitleNoArray[i]*1-1;
            obj = document.getElementById("title"+showTitleNoArray[i]);
            obj.innerHTML = titleArray[index];
            obj = document.getElementById("value"+showTitleNoArray[i]);
            obj.innerHTML = row[index];
        }
    }


    function getLength(val) {
        var str = String(val);
        var bytesCount = 0;
        for (var i = 0 ,n = str.length; i < n; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                bytesCount += 1;
            } else {
                bytesCount += 2;
            }
        }
        return bytesCount;
    }
})();
