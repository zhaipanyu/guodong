<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<img src="../assets/topleft-title.png" alt=""class="topleft-img media-topleftImg"><!-- 左一图标 -->
			<img src="../assets/guodong-title.png" alt=""class="topleft2-img"><!-- 左二图标 -->
			<!-- <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col> -->
			<!-- <el-col :span="10"> -->
				<!-- <div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div> -->
			<!-- </el-col> -->
			<el-col :span="8" class="userinfo"><!-- 设为8的原因是不会屏幕缩小不会吧文字挤下来 -->
				<!-- <el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">{{sysUserName}} </span><i class="el-icon-caret-bottom"></i>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item>设置</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown> -->
				<img src="../assets/userBackgroundImage.png" alt="" class="topright-img"><!-- 右一图标 -->
				<el-col class="topright-title">
					<a href="javascript:void(0)"><span>{{sysUserName}}  </span>|</a>
					<router-link to="/reset"><span>设置  </span></router-link>
					<a href="javascript:void(0)" >|</a>
					<a href="javascript:void(0)" @click="logout"><span>退出登录  </span>|</a>
					<router-link to="/Pending"><span>回到首页  </span></router-link>
				</el-col>				
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf && item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
								<router-link :to="item.path">{{ item.name }}</router-link>
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
				<!--底部固定-->
				<div class="bottom-fix">
							<span class="bottom-fix-p" style="margin-right:15px;">国动现场施工管理系统版本号:0.1</span>
							<span >版权所有 © 国动信息 | 沪ICP备16044829号-1</span>
				</div>
			</section>

		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				// sysName:'现场管理平台',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: 'static/img/123.png',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//设置页面
			userSet:function(){
				this.$router.push('/userSet');
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.img || '';
			}
		},
		updated () {
				//显示
				$('.bottom-fix').css('visibility','visible');
	  }
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			// width: 100%;
			height: 77px;
			line-height: 77px;
			// background: $color-primary;
			background: url(../assets/topBigBackground.png) no-repeat; //顶部的背景图片:带国动信息logo
			background-size: cover;
			color:#fff;
			.userinfo {
				position: relative;
				text-align: right;
				padding-right: 25px;
				float: right;
				.userinfo-inner {//右上角用户名称下拉
					cursor: pointer;
					font-size: 16px;
					padding:10px 0 10px 10px; 
					color:#000;
					
				}

				   .topright-img{//顶部右图
						position: absolute;
						top: 0;
						right: 20px;
						width: 400px;//窄了包不住文字
					}
					.topright-title{//右侧4个标题
						position: absolute;
						top: -22px;
						right: 62px;
						color: #000;
						font-size: 16px;
						a{
							color: #000;
							font-family: SimSun,sans-serif;
						}
						span:hover{
							color: red;
						}
						a:nth-child(1):hover{
							color: green;
							cursor: default;
						}
						a:nth-child(1) span:hover{
							color: #000;
							cursor: default;
						}
					}
			}
					.topleft-img {//左一图
						position: absolute;
						top: 10px;
						left: 20px;
					}
					@media (max-width: 1100px) {//响应式当屏幕小于1100px改变大小位置
						.media-topleftImg{
						position: absolute;
						top: 2px;
						left: 12px;
						width: 141px;
						height: 44px;
						// background-size: 60%;

						}
					}
					.topleft2-img{//左二图
						position: absolute;
						top: 25px;
						left: 50%;
						transform: translateX(-50%);	
					}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 77px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				ul.el-menu-vertical-demo {width:100%!important;};
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					height:90%;
					background-color: #fff;
					box-sizing: border-box;
				}
			}//content-container
				.bottom-fix{/*底部固定*/
				position: absolute;
				width: 100%;
				bottom: 0px;
				margin-right: 20px;
				height: 20px;
				line-height: 20px;
				font-size: 11px;
				color: rgba(0, 0, 0, .7);
			}
		}//main

	}
</style>