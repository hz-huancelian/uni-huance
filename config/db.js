import * as api from './api.js' //引入common
import * as common from './common.js' //引入common
import * as db from './db.js' //引入common
// 取值
function get(key, sync= true) {
	try{
		if(sync) {
			return uni.getStorageSync(key)
		} else {
			let data = ';'
			uni.getStorage({
				key:key,
				success:function(res) {
					data = res.data
				}
			})
			return data
		}
	}catch(e) {
		return false
	}
}

// 赋值
function set(key, value, sync=true) {
	try{
		if(sync) {
			return uni.setStorageSync(key, value)
		} else {
			uni.setStorage({
				key:key,
				data:value
			})
		}
	}catch(e){
		//TODO handle the exception
	}
}

//移除
function del(key, sync = true){
    try {
        if (sync) {
            return uni.removeStorageSync(key);
        } else {
            uni.removeStorage({
                key: key
            });
        }
    } catch (e) {
        return false;
    }
}

// 删除
function clear(sync =true) {
	try{
		if(sync){
			return uni.removeStorageSync();
		} else {
			uni.clearStorage();
		}
	}catch(e){
		//TODO handle the exception
		return false
	}
}

function userToken(callback){
	var token = get('userToken');
	if(token) {
		callback(token)
	}else {
	}
}

// 微信一键登录
function wxHandleLogin(){
	let login_code = ""
	uni.login({
	   provider: 'weixin',
	   success: (data) => {
		   api.doSlientLogin({code: data.code}, res => {
			   if(res.code === 200) {
				   const { Authorization, sign } = res.result
				   if(+sign === 0) {
						set('userToken', Authorization);
						set("TOKEN", Authorization)
						set("SIGN", sign)
						return false
				   }
				   uni.login({
				      provider: 'weixin',
				      success: (nres) => {
						  // 新用户
						  api.auth({code: nres.code}, res => {
						  	debugger
						  	if(res.success) {
						  		const { openid, session_key } = res.result
						  		set('userToken', Authorization);
						  		set("openid", openid)
						  		set("session_key", session_key)
						  		set("SIGN", 1)
						  		return false
						  	} else {
						  		common.errorToShow(res.message)
						  	}
						  })
					  },
				    })
				   
			    } else {
						common.errorToShow(res.message)
				}
		   })
	   },
	});
}

function logout() {
	uni.clearStorage();
}

export {
    get,
    set,
    del,
    clear,
    userToken,
	logout,
	wxHandleLogin
}