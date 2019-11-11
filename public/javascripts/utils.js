const fs = require('fs');

exports.fns = (() => {
	return {
		/**
		 * 从给定路径中返回第一个存在的路径
		 * @param {array}} paths
		 */
		choose_exists_file : function(paths){
			for(var i=0; i<paths.length; i++){
				if(fs.existsSync(paths[i])){
					return paths[i];
				}
			}
			return '';
		},

		/**
		 * 检查项目文件是否存在
		 */
		is_file_exists: (filepath) => {
			console.log(__dirname);
		},

		/**
		 * 扩展、继承
		 */
		
		extend : (initial={}, update={}) => {
			var target = {};
			for(var x in initial){
				if(x in update){
					target[x] = update[x];
				}else{
					target[x] = initial[x];
				}
			}
			for(var x in update){
				if(x in target){
					;
				}else{
					target[x] = update[x];
				}
			}
			return target;
		},

		ending: true

	};
})();
