"ui";
var color = "#009688";
ui.layout(
    <drawer id="peizhi">
    <frame>
        <vertical >
            <appbar>
                <toolbar id="toolbar" title="抖音APP辅助脚本"/>
                <tabs id="tabs"/>
            </appbar>       
            <viewpager  id="viewpager">
                <frame>
                    <vertical padding="18 8" h="auto">
                        <linear marginLeft="8" marginTop="5">
                            <text  textSize="16sp" textColor="black" text="发布视频的URL地址："/>
                        </linear>  
                        <input id="text_url" w="*" marginLeft="8" text="https://bbs.125.la/"/>
                        <linear marginLeft="8" marginTop="5">
                            <text  textSize="16sp" textColor="black" text="关注用户的user_id："/>
                        </linear>  
                        <input id="text_user_id" w="*" marginLeft="8" text="101306936509"/>
                        <linear marginLeft="8" marginTop="5">
                            <text  textSize="16sp" textColor="black" text="直播间ROOM_ID地址："/>
                        </linear>   
                        <input id="text_room_id" w="*" marginLeft="8" text="00000000000000"/>
                        <linear marginLeft="8" marginTop="5">
                            <text  textSize="16sp" textColor="black" text="视频aweme_id地址："/>                           
                        </linear>                                                                                     
                        <input id="text_aweme_id" w="*" marginLeft="8" text="6671597200042200324"/>
                        <linear marginLeft="8" marginTop="5">
                            <text  textSize="16sp" textColor="black" text="浏览视频的间隔(单位/毫秒)"/>                           
                            <input id="text_time" w="*" marginLeft="8" text="10000"/>
                        </linear>                                                                                     
                        
                    </vertical>       
                </frame>
                <frame>
                    <text text="交流群Q424324784" textColor="red" textSize="16sp"/>
                </frame>
                <frame>
                    <text text="此版本为抖音5.3.0版本特制！请注意你的抖音版本是否相符。如果不是请下载5.3.0版本。" textColor="green" textSize="16sp"/>
                </frame>                
            </viewpager>          
        </vertical>
    </frame>
    <frame>        
        <card h="130" margin="5 5" cardCornerRadius="2dp"
            cardElevation="1dp" gravity="center_vertical" layout_gravity="bottom|center" >
            <vertical padding="10 2" >
            <horizontal >
                    <text margin="10" textSize="20sp" >功能选择</text>
                    <spinner margin="10" w="*" textSize="20sp" id="sp1" entries="浏览视频|打开直播|打开首页并关注|打开视频页面|发布视频"/>
                </horizontal>
            <button id="yunxing" textSize="20sp" text="运行" style="Widget.AppCompat.Button.Colored" />
            </vertical>
        </card>
    </frame> 
    </drawer>
);
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "交流群Q:424324784");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);
//设置滑动页面的标题
ui.viewpager.setTitles(["浏览视频", "关注用户", "帮助"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//引入模块
var dz_mokuai = require('./动作类.js');
var dy_mokuai = require('./抖音类.js');
var dy_mokuai1 = require('./抖音类1.js');
var peizhi=ui.peizhi;
var xz_time="10000";//异常后停止时间 
var gn="1";//运行主功能 1=浏览视频  2=关注用户
var gz_gzfs="1";//关注方式   1=首页直接关注   2=粉丝列表关注
var ll_ym="1";//浏览的页面   1=推荐页面   2=同城页面
var ll_dz="0";//浏览同时是否点赞  1=点赞   0=不点赞
var gz_time="2000";//每一个的间隔时间
var 全_唯一标识="1";//停止/启动指令  1=正常   0=停止
var ll_time="10000";//浏览每一个视频的间隔时间
var user_id="";
var gz_dkfs="1";
var msg="";//全局状态事件
var msg_length=0;
var bjmsgmokuai = {};
var url="";
if(device.width != 1080 || device.height != 1920){
    setScreenMetrics(1080, 1920); // 适配分辨率
    device.keepScreenDim();//保持屏幕常亮
    device.setMusicVolume(5);//设置媒体音量
}
var jubin=threads.start(function(){//启动循环线程
    requestScreenCapture();//请求截图权限
}); 
jubin.interrupt();//中断线程运行
var clear = confirm("此版本为抖音5.3.0版本特制！请注意你的抖音版本是否相符。如果不是请下载5.3.0版本。为此应用开启辅助模式.为此应用开启悬浮窗.")
bjmsgmokuai.bjmsg =function(a){//拼接msg反馈
    toast(a);
    log(a);
    msg +="/n"+a;
};
 
threads.start(function(){//启动循环线程
    循环获取服务器();
});  

peizhi.yunxing.click( //APP运行按钮被点击
    () => { 
        if(xz_time<10000){
            xz_time="10000";
            //peizhi.xz_time.setText("10000");
        };          
        threads.start(function(){
            
            准备运行();
        });
    }
 );
 function 准备运行(){

   
    var i=peizhi.sp1.getSelectedItemPosition();
    if(i==4){
        toast("请自行将源码中的[dy_mokuai]模块中的【抖音_上传视频】函数整合");
        return false;
    }
    if(i==3){
        var aweme_id=peizhi.text_aweme_id.getText();
        dy_mokuai.抖音_打开视频页面(aweme_id);
        return true;
    }
    if(i==2){
        var user_id=peizhi.text_user_id.getText();
        dy_mokuai.抖音_打开用户页面_并关注(user_id);
        return true;
    }
    if(i==1){
        var room_id=peizhi.text_room_id.getText();
        dy_mokuai.抖音_打开直播页面(room_id);
        return true;
    }
    if(i==0){
        auto.waitFor();//检查
        toast("检查");
        ll_time=room_id=peizhi.text_time.getText();
        toast("检查版本");
        var and=device.release;
         and=and.replace(".","");
         and=and.replace(".","");
        toast("当前版本为"+and);
        if(and < 700){
            toast("安卓系统小于7.0.0，此功能受限！")
            return false;
        }else{
            toast("打开程序");
            if(打开程序()==false){
                toast("打开程序=失败");
                return false;
            }
    
            toast("创建悬浮窗...");
            创建悬浮窗()
            if (dy_mokuai.抖音_首页()==false){
                toast("切换抖音_首页失败！...");
                return false;
            }   
        }
        toast("开始工作...");
        threads.start(function(){//启动线程
            开始运行();
        }); 
    }



};
function 开始运行(){
    var i=0;
    while (true)
    {
        dy_mokuai.抖音_视频_滑动();
        i++;
        toast("当前浏览第"+i+"个视频,等待"+ll_time+"延迟中.");  
        sleep(ll_time) ;                

    } 
};
 function 打开程序(){
    var str= launch("com.ss.android.ugc.aweme");
    if(str==false){
        return false;
    }else{
        return true;
    }
};
function 创建悬浮窗(){
    var w = floaty.window(
        <frame gravity="center">
            <button id="xf_yx"  padding="2" alpha="0.5" text="停止"/>
        </frame>
    );
    w.xf_yx.click(()=>{//按钮被点击
        悬浮窗点击事件(w);
    });
    w.setPosition(0,540);//设置X  Y坐标位置

};
 function 悬浮窗点击事件(a){
    var text = a.xf_yx.getText();//获取按钮标题
    if(text=="停止") {
        a.xf_yx.setText("运行");    
        全_唯一标识="0";
        toast("停止"); 
        engines.stopAll();//关闭主程序
    }else{
        a.xf_yx.setText("停止"); 
        全_唯一标识="1"; 
        toast("运行");
    }  
};
function 循环获取服务器(){
    while(true){

        var and=device.release;
         and=and.replace(".","");
         and=and.replace(".","");
        if(and < 700){
        }else{
            dy_mokuai1.抖音_检测弹窗();
            device.wakeUpIfNeeded();//如果屏幕没有点亮，则唤醒设备。
/*             var  v=获取设备参数();
            连接服务器_post(v);  */ 
        }


        sleep(10000);
    }
};
