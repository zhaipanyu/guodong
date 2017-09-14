
    ajax封装
    function wrpAjax(str, data, fn) {

      $.ajax({
        url: "http://120.27.216.49:2112/api/" + str,
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'text/plain charset=UTF-8',
          'user-id': localStorage.getItem('myuserid'),
          'dev_request_type': "user_web"
        },
        type: 'post',
        dataType: 'json',
        processData: false,
        data: JSON.stringify({
          params: data
        })
      }).done(function (res) {
        fn(res);
      }).fail(function () {
        alert('error');
      })
    }
    //调用方法
    wrpAjax('projectList_get', {
      //data
      // user_name: userName,
      // user_password: password,
      // dev_request_type: "user_web"
      //fn
    }, function (data) {
      console.log(data.result);
    });







//初始化


//请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数
// var queryParams = function (params) {
//     var param = {
//         pageIndex: Math.ceil(params.offset / params.limit) + 1,
//         pageSize: params.limit,
//         order: params.order,
//         ordername: params.sort,
//         startDateTime: $("#dateSearch .startDate").val(),
//         endDateTime: $("#dateSearch .endDate").val(),
//         search: $("#dateSearch .imuserid").val()
//     };
//     return param;
// }


// var responseHandler = function (e) {
//     console.log(e);
//     if (e.data && e.data.length > 0) {
//         return {
//             "rows": e.data,
//             "total": e.count
//         };
//     } else {
//         return {
//             "rows": [],
//             "total": 0
//         };
//     }

// }

//重写上面
var responseHandler = function (e) {
    console.log(e);
    if (e.data && e.data.length > 0) {
        return {
            "total":e.other.total,
            "rows": e.result,
            // "total": e.count
        };
    } else {
        return {
            "rows": [],
            "total": 0
        };
    }

}

//跳转
// var uidHandle = function (res) {
//     var html = "<a href='#'>" + res + "</a>";
//     return html;
// }


self.dataInit = function (name) {
    var url, columns, tableName;
    
          var  tableName = "loginLog-table";
            columns = [{
                    checkbox: true
                },
                {
                    field: 'proj_name',
                    title: '项目名称',
                    align: 'center',
                    // formatter: uidHandle, //自定义方法设置uid跳转链接
                    width: 300
                }, {
                    field: 'proj_code',
                    title: 'GD编码',
                    align: 'center',
                    sortable: false //本列不可以排序
                }, {
                    field: 'sex',
                    title: '性别',
                    align: 'center'
                }, {
                    field: 'age',
                    title: '年龄',
                    align: 'center',
                    sortable: true,
                    clickToSelect: false,
                    sortName: "age",
                    order: "asc"
                }, {
                    field: 'area',
                    title: '户籍所在地',
                    align: 'left',
                    halign: 'center' //设置表头列居中对齐
                }, {
                    field: 'loginWay',
                    title: '登录方式',
                    align: 'center'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center'
                }, {
                    field: 'createTime',
                    title: '登录时间',
                    align: 'center',
                    width: 90
                }, {
                    field: 'orderService',
                    title: '购买服务',
                    align: 'center'
                }, {
                    field: 'connectorIP',
                    title: '连接器IP',
                    align: 'center'
                }, {
                    field: 'connectorPort',
                    title: '连接器端口',
                    align: 'center'
                }, {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                }
            ];
            
    }
    $('#' + tableName).empty();
    $('#' + tableName).bootstrapTable('destroy').bootstrapTable({
        url: 'data/list.json', //url一般是请求后台的url地址,调用ajax获取数据。此处我用本地的json数据来填充表格。
        method: "post", //使用get请求到服务器获取数据
        dataType: "json",
        contentType: 'application/json,charset=utf-8',
        toolbar: "#toolbar", //一个jQuery 选择器，指明自定义的toolbar 例如:#toolbar, .toolbar.
        uniqueId: "id", //每一行的唯一标识，一般为主键列
        height: document.body.clientHeight - 165, //动态获取高度值，可以使表格自适应页面
        cache: false, // 不缓存
        striped: true, // 隔行加亮
        //queryParamsType: "limit", //设置为"undefined",可以获取pageNumber，pageSize，searchText，sortName，sortOrder 
        //设置为"limit",符合 RESTFul 格式的参数,可以获取limit, offset, search, sort, order 
        queryParams: queryParams,
        sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
        // sortable: true,                     //是否启用排序;意味着整个表格都会排序
        sortName: 'uid', // 设置默认排序为 name
        sortOrder: "asc", //排序方式
        pagination: true, //是否显示分页（*）
        search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true, //是否显示刷新按钮
        showToggle: true, //是否显示详细视图和列表视图
        clickToSelect: true, //是否启用点击选中行
        minimumCountColumns: 2, //最少允许的列数 clickToSelect: true, //是否启用点击选中行
        pageNumber: 1, //初始化加载第一页，默认第一页
        pageSize: 10, //每页的记录行数（*）
        pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
        paginationPreText: "Previous",
        paginationNextText: "Next",
        paginationFirstText: "First",
        paginationLastText: "Last",
        responseHandler: responseHandler,
        columns: columns,
        onLoadSuccess: function (data) { //加载成功时执行
            console.log(data);
        },
        onLoadError: function (res) { //加载失败时执行
            console.log(res);
        }
    });
