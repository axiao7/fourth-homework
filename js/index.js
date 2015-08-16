//forEach IE6-8扩展
if (typeof Array.prototype.forEach != "function") {
  Array.prototype.forEach = function (fn, context) {
    for (var k = 0, length = this.length; k < length; k++) {
      if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
        fn.call(context, this[k], k, this);
      }
    }
  };
}

//some IE6-8扩展
if (typeof Array.prototype.some != "function") {
  Array.prototype.some = function (fn, context) {
	var passed = false;
	if (typeof fn === "function") {
   	  for (var k = 0, length = this.length; k < length; k++) {
		  if (passed === true) break;
		  passed = !!fn.call(context, this[k], k, this);
	  }
    }
	return passed;
  };
}

//定义一个对象，拥有全选和反选的方法
var choose = {
	all: function (ele) {
		ele.forEach(function (item) {
			if (item.checked === true) {
	    	    return;
	        }else {
	    	    item.checked = true;
	        }
		})
    },
	reverse: function (ele) {	    
	    ele.forEach(function (item) {
			if (item.checked === true) {
	    		item.checked = false;
	    	}else {
	    		item.checked = true;
	    	}
		})
	}
};
var EventUntil = {
	addHandler: function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type,handler);
		} else {
			element["on" + type] = handler;
		}
	}
}


	    function Handle () {
	    	var inputs = document.getElementsByTagName('input'),//document.querySelectorAll('input')因为我一开始没用，而后也发现了一些问题，下面用注释注明了，所以就不换了
	    	    choosed = [],
	    	    chooseAll,
	    	    chooseReverse;
	    	// inputs.forEach(function (item) {
	    	// 	if (item.value === "全选") {
	    	// 		chooseAll = item;
	    	// 	}else if (item.value === "反选") {
	    	// 		chooseReverse = item;
	    	// 	}else {
	    	// 		choosed.push(item);
	    	//     }
	    	// })
            //失败了，问了下度娘：准确的说 getElementsByTagName返回的也是节点列表类型 NodeList对象，非数组对象，但是会随着节点的改变而更新。之前就这么觉得，不过当时只是以为document.querySelector才会这样，没试过
            //在JS中getElementsByTagName()获得的是一个类似于数组的NodeList对象，但除了有个length属性和下标取值以外再也没有别的数组方法了，因为他不是一个真正的数组对象。
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
	    	function checkBox (ele) {
	    		return ele.checked === false; 
	    	}
	    	EventUntil.addHandler(chooseAll,"click",function () {
	    		if (choosed.some(checkBox)) {
	    			choose.all(choosed);
	    		}else {
	    			choose.reverse(choosed);
	    		}	    		
	    	})
	    	EventUntil.addHandler(chooseReverse,"click",function () {
	    		chooseAll.checked = false;
	    		choose.reverse(choosed);
	    		if (!choosed.some(checkBox)) {
	    				chooseAll.checked = true;
	    		};
	    	})
	    	choosed.forEach(function (value) {
	    		EventUntil.addHandler(value,"click",function () {
	    			chooseAll.checked = false;
	    			if (!choosed.some(checkBox)) {
	    				chooseAll.checked = true;
	    			};
	    		})
	    	})
	    }
	    window.onload = Handle;