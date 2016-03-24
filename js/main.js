'use strict'

require.config({
    paths: {
        jquery: 'jquery-2.2.0.min',
        jqueryUI: 'http://code.jquery.com/ui/1.12.0-beta.1/jquery-ui'
    }
})

require(['alert', 'jquery'], function (w, $) {
    var win = new w.Window();

    $('#btn').click(function () {
        win.alert({
            title: '提示',
            content: 'welcome',
            handler: function () {
                alert('you click the btn');
            },
            width: 400,
            height: 200,
            top: 100,
            hasCloseBtn: true,
            text4AlertBtn: '记住了',
            dragHandle: '.boundingBox_header',
            handler4AlertBtn: function () {
                alert('you click the 1 btn')
            },
        }).on('alert', function () {
            alert('you click the 2 btn');
        }).on('close', function () {
            alert('111111');
        });

        win.on('alert', function () {
            alert('you click the btn')
        });
        win.on('close', function () {
            alert('you click the closeBtn');
        });
        win.on('alert', function () {
            confirm('确定关闭吗？');
        })

    });
    $('#btnConfirm').click(function(){
        win.confirm({
            width:400,
            height:300,
            title:'慕课网',
            content:'您选择？',
            hasCloseBtn:false,
            handle4CancelBtn:function(){
                alert('已经取消');
            },
            handler4ConfirmBtn:function(){
                alert('已经创建');
            },
        }).on('cancel',function(){
            alert('再次取消');
        }).on('confirm',function(){
            alert('再次创建')
        })
    });
    $('#propmt').click(function(){
        win.prompt({
            title:'请输入名字',
            hasCloseBtn:true,
            handle4PropmtBtn:function(data){
                alert('您输入的名字是：'+data)
            },
            content:'您输入的内容将被保密',
        }).on('propmt',function(data){
            alert(data);
        });
        win.on('propmt',function(data){
            alert(data+'哈哈');
        })
    });

})