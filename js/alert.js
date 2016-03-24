'use strict'

define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
    
    function Window(){
        this.cfg = {
            width:500,
            height:300,
            content:'',
            handler:null,
            title:'系统消息',
            hasCloseBtn:false,
            skinClassName:null,
            text4AlertBtn:'确定',
            text4ConfirmBtn:'确定',
            text4CancelBtn:'取消',
            handler4AlertBtn:null,
            handler4CloseBtn:null,
            handler4ConfirmBtn:null,
            handle4CancelBtn:null,
            hasMask:true,
            isDraggable:true,
            dragHandle:null,
            text4PropmtBtn:'好的',
            defaultVal4PropmtInput:'请输入',
            maxlength4PropmtInput:10,
            handle4PropmtBtn:null,
            isProssword:true
        };
    };
    Window.prototype =$.extend({},new widget.widget(),{
        renderUI:function(){
            var footerContent = '';
            switch (this.cfg.winType){
                case 'confirm':
                    footerContent = '<input class="boundingBox_cancelBtn" type="button" value="'+this.cfg.text4CancelBtn+'"/><input class="boundingBox_confirmBtn" type="button" value="'+this.cfg.text4ConfirmBtn+'"/>';
                    break;
                case 'alert':
                    footerContent = '<input class="boundingBox_alertBtn" type="button" value="'+this.cfg.text4AlertBtn+'">'
                    break;
                case 'propmt':
                    this.cfg.content = '<p>'+this.cfg.content+'</p><input type="'+(this.cfg.isProssword?'password':'text')+'" maxlength="'+this.cfg.maxlength4PropmtInput+'" placeholder="'+this.cfg.defaultVal4PropmtInput+'" class="boundingBox_propmt"/>';
                    footerContent = '<input class="boundingBox_cancelBtn" type="button" value="'+this.cfg.text4CancelBtn+'"/><input class="boundingBox_propmtBtn" type="button" value="'+this.cfg.text4PropmtBtn+'"/>'
            };
            this.boundingBox = $('<div class="window_boundingBox">'
                                +'<div class="boundingBox_header">'+ this.cfg.title +'</div>'
                                +'<div class="boundingBox_body">'+ this.cfg.content +'</div>'
                                +'<div class="boundingBox_footer">'+footerContent+'</div>'
                                +'</div>');
            this.cfg.propmtInput = this.boundingBox.find('.boundingBox_propmt');
            console.log(this.cfg.propmtInput)
            if(this.cfg.hasMask){
                this._mask = $('<div class="window_mask"></div>');
                this._mask.appendTo('body');
            };
            if(this.cfg.hasCloseBtn){
                this.boundingBox.append('<span class="boundingBox_closeBtn">X</span>');
            }
            this.boundingBox.appendTo('body')
        },
        bindUI:function(){
            var that = this;
            this.boundingBox.delegate('.boundingBox_alertBtn','click',function(){
                that.destroy();
                that.fire('alert');
                console.log(that.handlers)
            }).delegate('.boundingBox_closeBtn','click',function(){
                that.destroy();
                that.fire('close');
                console.log(that.handlers)
            }).delegate('.boundingBox_cancelBtn','click',function(){
                that.destroy();
                that.fire('cancel');
            }).delegate('.boundingBox_confirmBtn','click',function(){
                that.destroy();
                that.fire('confirm');
            }).delegate('.boundingBox_propmtBtn','click',function(){
                that.destroy();
                that.fire('propmt',that.cfg.propmtInput.val());
            })
            if(this.cfg.handler4AlertBtn){
                this.on('alert',this.cfg.handler4AlertBtn);
            }
            if(this.cfg.handler4CloseBtn){
                this.on('close',this.cfg.handler4CloseBtn);
            }
            if(this.cfg.handle4CancelBtn){
                this.on('cancel',this.cfg.handle4CancelBtn)
            }
            if(this.cfg.handler4ConfirmBtn){
                this.on('confirm',this.cfg.handler4ConfirmBtn)
            }
            if(this.cfg.handle4PropmtBtn){
                this.on('propmt',this.cfg.handle4PropmtBtn)
            }
        },
        syncUI:function(){
            this.boundingBox.css({
                width:this.cfg.width,
                height:this.cfg.height,
                left:(this.cfg.left||(window.innerWidth - this.cfg.width)/2)+'px',
                top:(this.cfg.top||(window.innerHeight - this.cfg.height)/2)+'px'
            });
            if(this.cfg.skinClassName){
                this.boundingBox.addClass(this.cfg.skinClassName);
            };
            if(this.cfg.isDraggable){
                if(this.cfg.dragHandle){
                    this.boundingBox.draggable({handle:this.cfg.dragHandle})
                }else{
                    this.boundingBox.draggable();
                }
            }
        },
        destructor:function(){
            this._mask&&this._mask.remove();
        },
        alert:function(cfg){
            $.extend(this.cfg,cfg,{winType:'alert'});
            this.render();
            return this;
        },
        confirm:function(cfg){
            $.extend(this.cfg,cfg,{winType:'confirm'});
            this.render();
            return this;
        },
        prompt:function(cfg){
            $.extend(this.cfg,cfg,{winType:'propmt'});
            this.render();
            this.cfg.propmtInput.focus();
            return this;
        },
    });
    console.log(Window.prototype)
    return {
        Window:Window
    }
})

