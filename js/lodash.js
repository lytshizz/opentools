(function(root 	) {
	var _ = function(obj) {			//构造函数
		if(!(this instanceof _)) {
			return new _(obj);
		}
		this.wrap = obj;
	}
	
	//数组数据的去重  [1,2,3,4,5,2,3,4,5,23]
	_.uniq = function(target, callback) {   //对象
		var result=[];
		var computed;
		for(var i = 0; i < target.length; i++) {
			computed = callback ? callback(target[i]) : target[i];
			if(result.indexOf(computed) === -1) {
				result.push(computed);
			}
		}
		return result;
	}
	
	_.reduce = function(target) {
		console.log(target);
		var res = 0;
		for (var i = 0; i < target.length; i++) {
			res += target[i];
		}
		return res;
	}
	
	//开启链接式调用
	_.chain = function(obj) {
		var instance = _(obj);
		instance._chain = true;   //开启链接式调用
		return instance;
	}
	
	_.prototype.value = function() {
		return this.wrap;
	}
	
	//辅助函数   实例对象  obj->instance
	_.result = function(instance, obj) {
//		console.log(obj);
		return instance._chain ? _(obj).chain() : obj;
	}
	
	_.each = function(arr, callback) {
		for (var i = 0; i < arr.length; i++) {
			callback.call(arr, arr[i]);
		}
	}
	
	_.functions = function(obj) {
		var result = [];
		for (var key in obj) {
			result.push(key);
		}
		return result;
	}
	
	
	
	//自身扩展的方法       [属性名,属性名,属性名]        添加到原型对象中	
	_.mixin = function(obj) {
		_.each(_.functions(obj), function(key) {
			var func = obj[key];       //_.uniq
			
			obj.prototype[key] = function() {
				var args = [this.wrap]; 
				//数组的合并
				Array.prototype.push.apply(args, arguments);
				// 实例对象     数据
				return _.result(this, func.apply(this, args));   //apply 中第二个参数是一个数组
				
			}
		});
	}
	
	_.mixin(_);
	root._ = _;
})(this)
