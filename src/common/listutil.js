var mui = require('src/static/js/mui')
var apiUrl = 'http://192.168.2.135:8000/'
/**
 * ajax 方法
 * @param String url api的url
 * @param Object context 调用该方法的组件对象
 * @param Function callback 回调方法，callback(context,data)
 */
var getListData = function(url,callback) {
	mui.ajax(apiUrl + url,{
		type: "get",
		//url: apiUrl + url,
		data: {},
		async: true,
		dataType: "json",
		success: function(data) {
			callback(data);
		}
	});
};

module.exports = getListData;