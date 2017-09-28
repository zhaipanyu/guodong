/*页面中需要引入百度地图api*/
const createMap = function(id,arr) {
    var map = new BMap.Map(id),//依赖百度api，需提前引入文件
        arr = arr || [121,31.5];//默认上海
    map.centerAndZoom(new BMap.Point(arr[0], arr[1]), 15);
    map.enableScrollWheelZoom();
    //增加测距
    var $img = $('.ruler img');
    $img.length >0 && $ocLazyLoad.load('baseMap').then(
        function(){
            var myDis = new BMapLib.DistanceTool(map);
            if($img.length>0){
                $img.on('click',function(e) {
                    e.preventDefault();
                    myDis.open();
                });
            } else {
                console.log( '没有测量图标！')
            }
        }
    );
    return map;
};
const drawMap = function(idName,arr) {
    let a=0,_map,strArr=[];
    function getCount(val,arr){//获取经纬度重复个数大于1的点
        let str_ll = val.toString(),count=1;
        for(let j of arr){
            (str_ll == j) && count++
        }
        if(count>1){
            return count;
        }
    }
    for(let val of arr) {
        let title = getCount(val,strArr);
        strArr.push(val);
        a++;
        let longitude = val[0],
            latitude = val[1],
            str = val[2],
            path,arr;
        if(a===1) {
            idName && (_map = createMap(idName,[longitude,latitude]));
            path = 'static/img/timg.png';
        } else {
            if(str==='Y'){
                path = 'static/img/proj_inner.png';
            } else {
                path = 'static/img/proj_outer.png';
            }
        }
        //画图才执行
        if(idName){
            arr = new BMap.Point(longitude,latitude);
            //添加标识
            var myIcon = new BMap.Icon(path, new BMap.Size(40,48)),
                marker = new BMap.Marker(arr,{icon:myIcon});
            _map.addOverlay(marker);
            if(title){
                var label = new BMap.Label(title,{offset:new BMap.Size(20,-15)});
                marker.setLabel(label);
            }
        }
    }
    return _map;
};
const addImgInfo = function(ctr,center,obj){
    if(this.arguments<3){
        throw "安全距离、中心点、对比数组不可缺少";
    }
    if(!Array.isArray(center) || !Array.isArray(obj)){
        throw "对比参数必须为数组";
    }
    let _obj = [];
    for(let val of obj){
        let isLocation = !!val.location,
            lat = isLocation && val.location.lat,
            lon = isLocation && val.location.lon;
        _obj.push([lon,lat]);
    }
    let isInDistance = function (ctr,center,cust){
        let distance = BMapLib.GeoUtils.getDistance(center,cust),
            mark;
        if(Number.parseInt(ctr)- Number.parseInt(distance)>0){
            mark = 'Y';
        } else {
            mark = 'N';
        }
        return mark;
    };
    let newArr = [],warningCount=0;
    for(var i=0;i<_obj.length;i++){
        let lon = _obj[i][0].lon,
            lat = _obj[i][1].lat,
            isInner = isInDistance(ctr,new BMap.Point(center[0],center[1]),new BMap.Point(lon,lat));
        _obj[i].push(isInner);
        if(isInner === 'N'){
            warningCount++;
        }
        isInner && newArr.push(_obj[i]);
    }
    return {newArr:newArr,warningCount:warningCount};

}
export{drawMap,createMap,addImgInfo}