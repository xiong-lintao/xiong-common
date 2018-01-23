(function(global){
    var Tween = {
        linear: function (t, b, c, d){  //匀速 t:时间差，b:初始位置，c:位移差d:总时间
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        },
        easeOut: function(t, b, c, d){  //减速曲线
            return -c *(t/=d)*(t-2) + b;
        },
        easeBoth: function(t, b, c, d){  //加速减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInStrong: function(t, b, c, d){  //加加速曲线
            return c*(t/=d)*t*t*t + b;
        },
        easeOutStrong: function(t, b, c, d){  //减减速曲线
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
            if ((t/=d/2) < 1) {
                return c/2*t*t*t*t + b;
            }
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
            if (t === 0) { 
                return b; 
            }
            if ( (t /= d) == 1 ) {
                return b+c; 
            }
            if (!p) {
                p=d*0.3; 
            }
            if (!a || a < Math.abs(c)) {
                a = c; 
                var s = p/4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
            if (t === 0) {
                return b;
            }
            if ( (t /= d) == 1 ) {
                return b+c;
            }
            if (!p) {
                p=d*0.3;
            }
            if (!a || a < Math.abs(c)) {
                a = c;
                var s = p / 4;
            } else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },    
        elasticBoth: function(t, b, c, d, a, p){
            if (t === 0) {
                return b;
            }
            if ( (t /= d/2) == 2 ) {
                return b+c;
            }
            if (!p) {
                p = d*(0.3*1.5);
            }
            if ( !a || a < Math.abs(c) ) {
                a = c; 
                var s = p/4;
            }
            else {
                var s = p/(2*Math.PI) * Math.asin (c/a);
            }
            if (t < 1) {
                return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
                        Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            }
            return a*Math.pow(2,-10*(t-=1)) * 
                    Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
        },
        backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
            if (typeof s == 'undefined') {
               s = 1.70158;
            }
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        backOut: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 3.70158;  //回缩的距离
            }
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        }, 
        backBoth: function(t, b, c, d, s){
            if (typeof s == 'undefined') {
                s = 1.70158; 
            }
            if ((t /= d/2 ) < 1) {
                return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            }
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
            return c - Tween['bounceOut'](d-t, 0, c, d) + b;
        },       
        bounceOut: function(t, b, c, d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
            }
            return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
        },      
        bounceBoth: function(t, b, c, d){
            if (t < d/2) {
                return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
            }
            return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
        }
    };
    var Xiong = function(){}
    Xiong.prototype = {
        //兼容ie678获取css的方法
        getClass:function(obj,parent){
            parent = parent || document
            if( document.getElementsByClassName)
            {
                return parent.getElementsByClassName(obj)
            }
            else
            {
                var doms = parent.getElementsByTagName('*')
                var getDom = []
                for(i=0;i<doms.length;i++)
                {
                    var clsNames = doms[i].className
                    var arr = clsNames.split(' ')
                    for(j=0;j<arr.length;j++)
                    {
                        if(arr[j]==obj)
                        {
                            getDom.push(doms[i])
                        }
                    }
                }
                return getDom
            }
            
        },
        //矩形的碰撞检测
        strike: function( obj1 , obj2 ){
            
            var T1 = obj1.offsetTop;
            var B1 = T1 + obj1.clientHeight;
            var L1 = obj1.offsetLeft;
            var R1 = L1 + obj1.clientWidth;
    
            var T2 = obj2.offsetTop;
            var B2 = T2 + obj2.clientHeight;
            var L2 = obj2.offsetLeft;
            var R2 = L2 + obj2.clientWidth;
    
            if ( R2 < L1 || L2 > R1 || B2 < T1 || T2 > B1 )
            {
                return false; // 没撞上
            }
            else
            {
                return true; // 撞上了
            }
        },
        //时间型运动框架
        move: function(obj,json,time,cv){  //对象，运动属性，耗时，运动速度
            cv = cv || 'linear'
            var startVal = {},endVal = {},timeErr = 0
            var startTime = new Date()
            for (var key in json){
                startVal[key] = parseInt( this.getStyle(obj,key) )
                endVal[key] = parseInt( json[key] )
            }
            var timer = setInterval(function(){
                var now = new Date()
                timeErr = now - startTime
                if( timeErr >= time ){
                    clearInterval(timer)
                }else{
                    for (var key in endVal){ //t:时间差，b:初始位置，c:位移差d:总时间
                        var t = timeErr,
                            b = parseInt( startVal[key] ),
                            c = parseInt( endVal[key] - startVal[key] )
                            d = time
                        var moveVal = Tween[cv]( t , b , c , d );
                        obj.style[key] = moveVal + 'px'
                    }
                }               
            },13)
        },
        //获取对象的css样式的值
        getStyle: function(dom,attr){
            return dom.currentStyle?dom.currentStyle[attr]:getComputedStyle(dom)[attr]
        },

    }
    return global.Xiong = Xiong
})(window)