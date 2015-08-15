//定义一个对象，拥有全选和反选的方法
var choose = {
	all: function (ele) {
	    var l = ele.length;
	    for (var i = 0; i < l; i++) {
	        if (ele[i].checked === true) {
	    	    continue;
	        }else {
	    	    ele[i].checked = true;
	        }
	    }
    },
	reverse: function (ele) {
	    var l = ele.length;
	    for (var i = 0; i < l; i++) {
	    	if (ele[i].checked === true) {
	    		ele[i].checked = false;
	    	}else {
	    		ele[i].checked = true;
	    	}
	    }
	}
};
	    function Handle () {
	    	var inputs = document.getElementsByTagName('input'),
	    	    choosed = [],
	    	    chooseAll,
	    	    chooseReverse;
	    	for (var i = 0; i < inputs.length; i++) {
	    		if (inputs[i].value === "全选") {
	    			chooseAll = inputs[i];
	    			continue;
	    		}else if (inputs[i].value === "反选") {
	    			chooseReverse = inputs[i];
	    			continue;
	    		}else {
	    			choosed.push(inputs[i]);
	    		}
	    	}
	    	chooseAll.onclick = function () {
	    		chooseReverse.checked = false;
	    		choose.all(choosed);
	    	}
	    	chooseReverse.onclick = function () {
	    		chooseAll.checked = false;
	    		choose.reverse(choosed);
	    	}
	    	for (var i = 0; i < choosed.length; i++) {
	    		choosed[i].onclick = function () {
	    			chooseAll.checked = false;
	    		}
	    	};
	    }
	    window.onload = Handle;