/**
 * [Utils utils class]
 */
var mumIndex = 0
var ajaxIndex = 0
var  language = localStorage.getItem("lang") || navigator.language.split('-')[0]
export default class Utils {
    /**
     * [ajax ajax]
     * @param  {[String]}   type         [get or post]
     * @param  {[String]}   url          [url]
     * @param  {[Object]}   data         [request body]
     * @param  {Function} callback     [callback]
     * @param  {[bool]}   handleBySelf [handleBySelf]
     */
    static ajax(type, url, data, callback, handleBySelf) { //参数对象, type, url, data, callback，是否自己处理
        mumIndex++
        let hostPort = ""

        let contentTypes = "application/json;charset=UTF-8"
        // }
        $.ajax({
            headers: {
                "Sys-Language": language
            },
            type: type,
            url: hostPort + url,
            data: data,
            contentType: "application/json; charset=utf-8",//(可以)
            success: function(data) {
                ajaxIndex++
                if(ajaxIndex == mumIndex){
                    // Utils.ctrlMum('hidden')
                }
                if (typeof(data) === "string") {
                    data = JSON.parse(data)
                }
                // -1000 直接弹框验证，不做其他任何处理
                if (data.code === -1000) {
                    createGT()
                    return
                }
                // -999 直接前往付款
                if (data.code === -999) {
                    location.href = '/user/profile?binds=home'
                    return
                }
                //直接返回后台数据，自行处理
                if (handleBySelf) {
                    if(callback) callback(data)
                    return
                }
                if(data.code === 400){
                    location.href = '/logout'
                    return
                }
                //统一处理框架
                if (data.code === 1) callback(data)
                else {
                    alert(data.msg)
                    Utils.hideDom(".login-loading")
                    Utils.hideDom(".list-foot-loading")
                    Utils.ctrlMum('hidden')            
                }
            },
            error: function(error) {
                ajaxIndex++
                Utils.ctrlMum('hidden')
            },
            complete: function(data) {
                if(window.ajaxComplete) {
                    window.ajaxComplete()
                    window.ajaxComplete = null
                } // 某些场合需要使用到
            }
        })
    }

    /**
     * [get ajax]
     * @param  {[String]}   url          [url]
     * @param  {[Object]}   data         [request body]
     * @param  {Function} callback     [callback]
     * @param  {[bool]}   handleBySelf [handleBySelf]
     */
    static get(url, data, callback, handleBySelf) {
        Utils.ajax('get', url, data, callback, handleBySelf)
    }

    /**
     * [post ajax]
     * @param  {[String]}   url          [url]
     * @param  {[Object]}   data         [request body]
     * @param  {Function} callback     [callback]
     * @param  {[bool]}   handleBySelf [handleBySelf]
     * @return {[null]}                [null]
     */
    static post(url, data, callback, handleBySelf) {
        Utils.ajax('post', url, data, callback, handleBySelf)
    }

    /**
     * [params get url params]
     * @return {[Object]} [params object]
     */
    static params() {
        var _params = new Object()
        var urlSearch = location.search

        if (urlSearch.indexOf("?") == 0) {
            var paramsString = urlSearch.substr(1)
            var paramLink = paramsString.split("&linkUrl=")
            _params.linkUrl = paramLink[1]
            var paramsStrings = paramLink[0].split("&")
            for (var i = 0; i < paramsStrings.length; i++) {
                _params[paramsStrings[i].split("=")[0]] = paramsStrings[i].split("=")[1]
            }
        }

        return _params
    }

    /**
     * [className 返回相应 class 的名字]
     * @param  {[object]} who [需要查询的 class]
     * @return {[string]}     [返回结果]
     */
    static className(who) {
        return who.constructor.toString().match(/function\s\w*/).toString().replace(/function\s/, '')
    }

    /**
     * [ctrlMum 菊花转控制器]
     * @param  {[string]} type [show or null]
     */
    static ctrlMum(type) {
    	var mum = document.getElementById('mum')
    	if(mum) {
    		if(type === 'show') mum.style.display = 'block'
    		else mum.style.display = 'none'
    	}
    }

    static showDom(tag,isFlex=false) {
        if(isFlex){
            $(tag).css("display","flex")
        }else{
            $(tag).css("display","block")
        }
    }

    static hideDom(tag) {
        $(tag).css("display","none")
    }

    static getValue(tag) {
        return $(tag).text()
    }

    static setValue(tag,value) {
        $(tag).html(value)
    }


    /**
     * [supportShrink 是否支持新动画]
     * @return {[bool]} [bool]
     */
    static supportShrink() {
        return CSS.supports("animation", "shrink 0.3s forwards")
    }

    static zhEn(zh, en) {
        if(language === "en") {
            return en
        } else {
            return zh
        }
    }
}
