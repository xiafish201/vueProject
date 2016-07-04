
var path = require('path')
var fs = require('fs');

var mockbase = './test/mock/data';
var mockApi = function(res, pathname, paramObj, next,req) {
    switch (pathname) {

        case '/account/account_name/is_used':
            var data = fs.readFileSync(path.join(mockbase, 'logintest.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return ;
        case '/account/account_name/check':
            var data = fs.readFileSync(path.join(mockbase, 'logintest1.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return ;
        case '/account/login/login':
            var data = fs.readFileSync(path.join(mockbase, 'logintest2.json'), 'utf-8');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return ;
        
        
        

        case '/account/mobile/is_used': //查询手机号是否注册
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'login_is_used.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return ;
        case '/account/mobile/sms_code/send': //发送手机验证码
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'login_send_code.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;
        case '/account/mobile/sms_code/check': //验证码校验
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'login_check_code.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;
        case '/account/login/login': //登陆
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'login_user_info.json'), 'utf-8'));
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
            return;
        case '/api/listdata'://json
        	var page = '1';
        	if(paramObj.page){
        		page = paramObj.page;
        	}
            var data = JSON.parse(fs.readFileSync(path.join(mockbase, 'listdata.json'), 'utf-8'));
            page = ~~(page);
            if(data.code === '200'){
				data.detail.pageNumber = page;
				for(var i = 0;i<10;i++){
					data.detail.list[i]['s_id'] = (page-1)*10+i;
					data.detail.list[i]['price'] = (page-1)*10+i;
				}
			}
            console.log(JSON.stringify(paramObj));
            var callback = paramObj.callback;
            console.log('123'+callback);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('access_token', 'babababa');
            if(callback){//jsonp跨域
                res.end(callback+'\('+JSON.stringify(data)+'\)');    
            }else{//正常访问
                res.end(JSON.stringify(data));
            }
            
            return ;
         case '/api/topics/latest'://json
            var data = fs.readFileSync(path.join(mockbase, 'latest.json'), 'utf-8'); 
            console.log(data);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Origin', 'http://localhost:8080');
            res.end(data);
            return ;          
        case '/api/topics/test'://jsonp
            var data = fs.readFileSync(path.join(mockbase, 'test.json'), 'utf-8');
            console.log(data);
//          res.setHeader('Content-type', 'application/javascript');
//          res.end(paramObj.callback + '(' + data + ')');
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
            return ;
        default:
            ;
    }
    next();
};

module.exports = mockApi;