var douyin1 = {};
douyin1.抖音_判断是否弹出登陆界面=function(){
    var b = id("cp3").findOne(xz_time);//判断方式=其他登陆方式
    if(b==null){
        return false;
    }else{
        return true; 
    }
};
douyin1.抖音_检测弹窗=function (){
    dz_mokuai.控件_查找点击("text","以后再说",null,1000);//抖音更新界面
    dz_mokuai.控件_查找点击("text","取消",null,1000);//抖音发现通讯录界面
};

module.exports = douyin1;