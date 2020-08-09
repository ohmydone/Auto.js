var dongzuo = {};
dongzuo.控件_查找点击 =function(类型,data,text_,time){
    //类型=（ID,text,className）,data=控件特征，text=text内容(可空),time=超时时间(毫秒)
    if(类型=="id"){
        if(text_==null){
            log(time+"=====")
            var c = id(data).findOne(time);
        }else{
            var c = id(data).text(text_).findOne(time);
        }
    }
    if(类型=="text"){
            var c = text(data).findOne(time);
    }
    if(类型=="className"){
        if(text_==null){
            var c = className(data).findOne(time);
        }else{
            var c = className(data).text(text_).findOne(time);
        }
    }    
    if(c==null){
        bjmsgmokuai.bjmsg("搜索控件【 "+data+" 】失败");
        return false;
    } 
    var f=c.bounds();
    var str=click(f.centerX(), f.centerY());//点击坐标    
    if(str!=true){
        bjmsgmokuai.bjmsg("点击控件【 "+data+" 】坐标失败");
        return false;    
    }
    return true; 
  };
  dongzuo.控件_查找输入 =function(类型,data,text_,datatext,time){
    //类型=（ID,text,className）,data=控件特征，text=text内容(可空),time=超时时间(毫秒)
    if(类型=="id"){
        if(text_==null){
            var c = id(data).findOne(time);
        }else{
            var c = id(data).text(text_).findOne(time);
        }
    }
    if(类型=="text"){
            var c = text(data).findOne(time);
    }
    if(类型=="className"){
        if(text_==null){
            var c = className(data).findOne(time);
        }else{
            var c = className(data).text(text_).findOne(time);
        }
    }    
    if(c==null){
        bjmsgmokuai.bjmsg("搜索控件【 "+data+" 】失败");
        return false;
    } 
    str=c.setText(datatext);        
    if(str!=true){
        bjmsgmokuai.bjmsg("setText控件【 "+data+" 】植入内容失败，内容="+datatext);
        return false;
    }
    return true; 
  };
  dongzuo.控件_寻找颜色 =function(类型,data,text_,rgb,time){//text=text内容(可空)，rdg=颜色的rgb,time=超时时间(毫秒),找到返回true
    if(类型=="id"){
        if(text_==null){
            var c = id(data).findOne(time);
        }else{
            var c = id(data).text(text_).findOne(time);
        }       
    }
    if(类型=="text"){
        var c = text(data).findOne(time);     
    }
    if(类型=="className"){
        if(text_==null){
            var c = className(data).findOne(time);
        }else{
            var c = className(data).text(text_).findOne(time);
        }
    }        
    if(c==null){
        bjmsgmokuai.bjmsg("搜索控件【 "+data+" 】失败");
        return false;
    } 
    var f=c.bounds();
    var img = captureScreen();//截图
    if(!img){//判断图片是否加载成功
        toast("没有该图片");
        exit();
    }
    var point = findColor(img, rgb, {
        //【长方形左边界的x坐标】,【长方形上边界的y坐标】,【长方形右边界的x坐标-长方形左边界的x坐标】,【长方形下边界的y坐标-长方形上边界的y坐标】
        region: [f.left, f.top, f.right-f.left, f.bottom-f.top],
        threshold: 4
    });
    if(point!=null){
        return true;
    }else{
        return false;
    }
  };
  dongzuo.取时间戳=function(){ //返回从 1970 年 1 月 1 日至今的毫秒数。
	var d = new Date();
	return d.getTime();
  };
  dongzuo.删除文件=function(lujing){ //删除文件或空文件夹，返回是否删除成功。
    files.remove(lujing)
  };
  dongzuo.下载视频文件=function(URL_,文件名){//url=下载的网络地址，成功返回储存的文件路径
    var res = http.get(URL_);
    if(res.statusCode != 200){
        toast("请求失败");
        return ;
    }
    var i=files.getSdcardPath();//获取系统路径
    var lj=i+"/data";
    files.createWithDirs(lj)//创建路径文件夹
    files.writeBytes(lj+"/"+文件名, res.body.bytes());//写入文件
    return lj+"/"+文件名;
  };
  dongzuo.媒体库_加减=function(路径){
    media.scanFile(路径);//加入或退出媒体库
  }
  module.exports = dongzuo;  