var douyin = {};
douyin.抖音_首页=function(){//初始化的时候需要回到首页
    var i=0;
    var b="";
    do
    {
        if(ll_ym=="1"){
            b=dz_mokuai.控件_查找点击("id","bcm",null,xz_time)//推荐页面
        }
        if(ll_ym=="2"){
            b=dz_mokuai.控件_查找点击("id","cn5",null,xz_time)//同城页面
        }
        if(b==true){
            i=3;
            
        }else{
            b=dz_mokuai.控件_查找点击("id","bwc",null,xz_time)//首页
            i++;
        }
    }  
    while (i<=2);
    if(ll_ym=="1"){
        b=dz_mokuai.控件_查找点击("id","bcm",null,xz_time)//推荐页面
    }
    if(ll_ym=="2"){
        b=dz_mokuai.控件_查找点击("id","cn5",null,xz_time)//同城页面
    }
    if(b!=true){
        return false;
    }
    return true;
};
douyin.抖音_上传视频=function(url,视频标题){
    var 文件名=dz_mokuai.取时间戳();
    var luj=dz_mokuai.下载视频文件(url,文件名);
    dz_mokuai.媒体库_加减(luj);//加入媒体库
    var str=click(1080/2, 1920-50);//点击上传坐标 
    str=dz_mokuai.控件_查找点击("text","上传",null,xz_time)//从相册上传
    if(str!=true){
        return false;
    }
    str=dz_mokuai.控件_查找点击("id","az_",null,xz_time)//选择视频
    if(str!=true){
        return false;
    }
    str=dz_mokuai.控件_查找点击("id","mi","下一步",xz_time)//下一步
    if(str!=true){
        return false;
    }
    sleep(3000)//延迟等待视频合成
    str=dz_mokuai.控件_查找点击("id","zb","选配乐",xz_time)//选配乐
    if(str!=true){
        return false;
    }
    str=dz_mokuai.控件_查找点击("id","ayx",null,xz_time)//点击音乐
    if(str!=true){
        return false;
    }
    str=dz_mokuai.控件_查找点击("id","bcj","使用",xz_time)//点击使用按钮   （使用所点击的音乐
    if(str!=true){
        return false;
    }  
    str=dz_mokuai.控件_查找点击("id","rj","下一步",xz_time)//下一步
    if(str!=true){
        return false;
    }      
    str=dz_mokuai.控件_寻找颜色("text","com.ss.android.ugc.aweme:id/aw9",null,"#ffface15",xz_time)//寻找是否已勾选本地本地选项
    if(str!=false){
        str=dz_mokuai.控件_查找点击("text","保存本地",null,xz_time)//取消勾选
        if(str!=true){
            return false;
        }           
    }
    str=dz_mokuai.控件_查找输入("className","android.widget.EditText",null,视频标题,xz_time)//写入标题
    if(str!=true){
        return false;
    }
    str=dz_mokuai.控件_查找点击("id","com.ss.android.ugc.aweme:id/aqg","发布",xz_time)//发布
    if(str!=true){
        return false;
    }
    dz_mokuai.删除文件(luj);
    dz_mokuai.媒体库_加减(luj);//退出媒体库
};
douyin.抖音_视频_滑动=function(){
    var str=swipe(400, 1500, 450, 150, 1000);
    if(str!=true){
        return false;
    }else{
        return true;
    }
};
douyin.抖音_视频_点赞=function(){
    b=dz_mokuai.控件_查找点击("id","c6n",null,xz_time)//同城页面
    if(b!=true){
        return false;
    }else{
        return true;
    }
};
douyin.抖音_打开视频页面=function (aweme_id){
    app.startActivity({ 
    action: "VIEW", 
    data:"snssdk1128://aweme/detail/"+aweme_id+"?refer=web&gd_label=click_wap_download_banner&appParam=&needlaunchlog=1" , 
    packageName: "com.ss.android.ugc.aweme", 
    });
};
douyin.抖音_打开用户页面_并关注=function (userid){
    app.startActivity({ 
    action: "VIEW", 
    data:"snssdk1128://user/profile/"+userid+"?refer=web&gd_label=click_wap_profile_bottom&type=need_follow&needlaunchlog=1" , 
    packageName: "com.ss.android.ugc.aweme", 
    });
};
douyin.抖音_打开直播页面=function (room_id,userid){
    app.startActivity({ 
        action: "VIEW", 
        data:"snssdk1128://live?room_id="+room_id+"&user_id="+userid+"&from=webview&refer=web" , 
        packageName: "com.ss.android.ugc.aweme", 
    });
};
douyin.抖音_关注方式1=function (uid,sf){//uid=用户抖音号   sf=关注方式(1=首页关注，2=粉丝列表关注)
    var str="";
    str=dz_mokuai.控件_查找点击("id","amx",null,xz_time)//查找搜索按钮
    if(str!=true){
        return false;
    } 
    str=dz_mokuai.控件_查找输入("id","adr",null,uid,xz_time)//输入抖音号
    if(str!=true){
        return false;
    }  
    str=dz_mokuai.控件_查找点击("text","搜索",null,xz_time)//查找搜索按钮
    if(str!=true){
        return false;
    }    
    str=dz_mokuai.控件_查找点击("text","用户",null,xz_time)//查找搜索页面用户按钮
    if(str!=true){
        return false;
    } 
    str=dz_mokuai.控件_查找点击("text","抖音号:"+uid,null,xz_time)//查找搜索页面用户按钮
    if(str!=true){
        return false;
    } 
    if(sf=="1"){
        str=dz_mokuai.控件_查找点击("id","aev",null,xz_time)//查找关注用户按钮
    }else{
        str=dz_mokuai.控件_查找点击("id","afo",null,xz_time)//查找粉丝关注按钮
        if(str!=true){
            return false;
        } 
        douyin.抖音_粉丝列表_关注();
        str=dz_mokuai.控件_查找点击("id","lk",null,xz_time)//退出用户页面按钮
        if(str!=true){
            return false;
        } 
    }
    str=dz_mokuai.控件_查找点击("id","lk",null,xz_time)//退出用户页面按钮
    if(str!=true){
        return false;
    } 
    str=dz_mokuai.控件_查找点击("id","com.ss.android.ugc.aweme:id/adt",null,xz_time)//退出用户页面按钮
    if(str!=true){
        return false;
    }     
    str=dz_mokuai.控件_查找点击("id","ald",null,xz_time)//退出用户页面按钮
    if(str!=true){
        return false;
    } 
    return true;//关注成功
};
douyin.抖音_粉丝列表_关注=function(){
    for(var ii = 0; ii < 10; ii++){
        var uc = id("afu").find();
        for(var i = 0; i < uc.length; i++){
            if(uc[i].text()=="关注"){
                var f=uc[i].bounds();
                click(f.centerX(), f.centerY());//点击坐标
                sleep(gz_time);
            }
        }  
        抖音_视频_滑动(); 
    } 
};
douyin.抖音_关注方式2=function (user,sf){//user=用户userid   sf=关注方式(1=首页关注，2=粉丝列表关注)
    douyin.抖音_打开用户页面_并关注(user);
    if(sf=="2"){
        str=dz_mokuai.控件_查找点击("id","afo",null,xz_time)//查找粉丝关注按钮
        if(str!=true){
            return false;//失败
        } 
        douyin.抖音_粉丝列表_关注();
        str=dz_mokuai.控件_查找点击("id","lk",null,xz_time)//退出用户页面按钮
        if(str!=true){
            return false;
        }         
    }
    return true;
};

module.exports = douyin;