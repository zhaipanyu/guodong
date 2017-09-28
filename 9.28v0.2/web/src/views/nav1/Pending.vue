<!--待审核列表-->
<template>
    <section class="pr">
        <el-col :span="24">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-col>
        <div v-show="$route.name=='待审核列表'" class="wrap-el-table">
            <!--工具条-->
            <el-col :span="24" class="toolbar pr">
                <el-form :inline="true" :model="filters">
                    <el-form-item>
                        <el-input title="模糊查询至少3个字符" @keyup.enter.native="getUsers" class="search-input"  v-model="filters.fuzzy_searche_key" placeholder="可搜索字段:项目编号、项目名称、环节名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getUsers">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-alert class="pa" style="top:10px;left:500px;width:200px;color:#aa0004" :class="{disNone:searchTips}"
                          title="请输入至少三个字符"
                          type="warning"
                          show-icon>
                </el-alert>
            </el-col>
            <!--列表665-->
            <el-table class="tableStyle" max-height="" @row-dblclick="detail" :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                <el-table-column
                        label="项目编号" width="180">
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" @click="detail(scope.row)">
                            <a href="javascript:void(0)">{{ scope.row.proj_code }}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        label="项目名称" min-width="150">
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" @click="detail(scope.row)">
                            <a href="javascript:void(0)">{{ scope.row.proj_name }}</a>
                        </div>
                    </template>
                </el-table-column>

                <!--先保留-->
                <el-table-column
                        label="环节名称">
                    <template scope="scope">
                        <div slot="reference" class="name-wrapper" @click="detail(scope.row)">
                            <a href="javascript:void(0)">{{ scope.row.proj_link_name }}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="proj_module_name" label="施工阶段" >
                </el-table-column>
                <el-table-column prop="proj_link_status" label="环节状态" :formatter="linkStatus">
                </el-table-column>
                <el-table-column prop="proj_link_submit_time" label="提交时间" :formatter="SubmitTime">
                </el-table-column>
                <el-table-column prop="proj_link_submit_user_name" label="提交人" >
                </el-table-column>
            </el-table>
            <!--底部工具条-->
            <el-col :span="24" class="toolbar toolbar-bottom  ">
                <el-pagination class="toolbar-pagination " layout="prev, pager, next,total,sizes" @size-change="handleSizeChange" :page-size="pageSize" @current-change="handleCurrentChange" :total="total"  :page-sizes="[10, 20, 50]" style="float:right;">
                </el-pagination>
            </el-col>
        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {statusFilter,dealWithTime,dealWithEmptyString} from '../../common/js/tableFilter'
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                searchTips:true,
                filters: {
                    fuzzy_searche_key: ''
                },
                users: [],
                total: 0,
                page: 0,
                pageSize:10,
                listLoading: false,
                filtersRules: {
                    fuzzy_searche_key: [
                        { required: true, message: '请输入fuzzy_searche_key', trigger: 'blur' }
                    ]
                }

            }
        },
        methods: {
            SubmitTime(row){
                return dealWithTime(row.proj_link_submit_time,'yyyy-MM-dd HH:mm:ss');
            },
            linkStatus(row){
                return statusFilter(row.proj_link_status);
            },
            detail(obj){
                this.$router.push({ name: '待审核详情', params: { obj: obj }});
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let self = this,
                    para = this.filters;
                self.listLoading = true;
                if(para.fuzzy_searche_key && para.fuzzy_searche_key.length<3){
                    self.searchTips=false;
                    self.listLoading = false;
                    setTimeout(function(){self.searchTips=true;},1500)
                    return;
                }
                /*//NProgress.start();
                getUserListPage({limit:10,offset:0}).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });*/
                self.$axios('projectLinkList_get',Object.assign({
                    offset:(self.page-1)*10,
                    limit:this.pageSize,
                    proj_link_status:1
                    },para)).then(data => {
                    self.listLoading = false;
                    if(data.error===0){
                        self.total = data.other.total;
                        self.users =  Array.isArray(data.result) ? data.result:[];
                    } else {
                        self.$message({
                            message: data.result,
                            type: 'warning'
                        });
                    }

                });//then
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    this.$axios('User_Delete',para).then(data => {
                        this.listLoading = false;
                        if(data.error === 0){
                            this.$message({
                                message: '删除成功!',
                                type: 'success'
                            });
                            this.getUsers();
                        }
                    });
                    /*removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });*/
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            this.getUsers();
            $('form').submit(function(){
                return false;
            });
        },
        // updated () {
        // // $('.toolbar-bottom').css()
        // }
    }
</script>

<style>
.search-input{
    width: 340px;
}
/*高度百分比 container,.main,.grid-content section,.content-wrapper,.wrap-el-table*/
html, body, #app{
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-table,section {
  max-height: 85%;
}

/*底部工具条*/
.toolbar-bottom{
        position: fixed;
        bottom: 5px; 
        height: 50px;
        background-color: transparent;
}
/*底部d分页*/
.toolbar-pagination{
    position: absolute;
    right:50%;
}
</style>