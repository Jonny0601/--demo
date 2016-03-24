define(function(){
    function widget(){
        this.boundingBox = null;             //属性：弹窗最外层容器
    };
    widget.prototype={
        on:function(type,handler){
            if(!this.handlers[type]){
                this.handlers[type]=[];
            }
           this.handlers[type].push(handler);
            console.log(this.handlers)
            return this
        },
        fire:function(type,data){
            if(this.handlers[type] instanceof Array){
                var handers = this.handlers[type];
                for(var i = 0;i<handers.length;i++){
                    handers[i](data)
                }
            }
        },
        renderUI:function(){},               //接口：添加DOM节点
        bindUI:function(){},                 //接口：监听事件
        syncUI:function(){},                 //接口：初始化组件属性
        render:function(container){          //方法：渲染组件
            this.handlers = {};
            this.renderUI();
            $(container||document.body).append(this.boundingBox);
            this.syncUI();
            this.bindUI();
            
        },
        destructor:function(){},            //接口：销毁前的处理函数
        destroy:function(){                 //接口：销毁组件
            this.destructor();              
            this.boundingBox.remove();
            this.boundingBox.off();
        },
    };
    
    return {
        widget:widget,
    }
})