export const reviewStatus = [
    {value: 0, label: '未提交'},
    {value: 1, label: '未审核'},
    {value: 2, label:'审核不通过'},
    {value: 3, label:'审核通过'},
    {value: 4, label:'审核不通过且留档'},
    {value: 5, label:'条件通过'}
];
export function statusFilter(val){
    let status = reviewStatus,
        _val = Number.parseInt(val);
    for(let obj of status){
        if(obj.value == _val){
            return obj.label;
        }
    }
}
export  function dealWithTime(input,fm) {
    /*if (value === 0) {
        return '-';
    } else {
        let val = Number.parseInt(value)*1000,
            date = new Date(val),
            Y = date.getFullYear() + '-',
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
            D = date.getDate() + ' ';
        // var html = "<a href='#'>" + value + "</a>";
        return (Y + M + D);
    }*/
    if(!typeof input == 'number' || input === 0 || Number.isNaN(input) ){
        return '-';
    }
    let format = function(time, format){
        let t = new Date(time),
            tf = function(i){return (i < 10 ? '0' : '') + i};
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
            switch(a){
                case 'yyyy':
                    return tf(t.getFullYear());
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        });
    };
    let time = Number.parseInt(input)*1000;
    return format(time,fm||'yyyy-MM-dd HH:mm:ss');
}
//服务返回空字符时显示-
export function dealWithEmptyString(value){
    let val = value ? value : '-';
    return val;
    //   return value;
}
export const userRole = [{value:1,label:'省公司审核员'},{value:2,label:'事业部经理'},{value:3,label:'普通员工'}];
