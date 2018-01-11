
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			//  设置当前元素的选项
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from:            $(this).data('from'),
				to:              $(this).data('to2'),
				speed:           $(this).data('speed'),
				refreshInterval: $(this).data('refresh-interval'),
				decimals:        $(this).data('decimals')
			}, options);
			
			// /更新值多少次，以及每次更新时增加多少值
			
			var yy =localStorage.getItem("number2");//取出保存在浏览器里的节点数
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
			// increment = (settings.to - settings.from) / loops;
			increment = (yy - settings.from) / loops;
			console.log('yy:'+ yy);
			// /引用和变量将随着每次更新而改变
			var self = this,
				$self = $(this),
				loopCount = 0,
				value = settings.from,
				data = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// 如果找到存在的时间间隔，先清除它。
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// 初始化具有起始值的元素。
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					//删除间隔
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render(value) {
				var formattedValue = settings.formatter.call(self, value, settings);
				$self.html(formattedValue);
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from: 0,               // 起始值
		to: 0,                 // 
		speed:5000,           //  在目标数之间计算要多长时间？		
		refreshInterval: 100,  //   元素应该多长时间更新一次？
		decimals: 0,           //  要显示的小数位数。  
		formatter: formatter,  // 呈现前格式化值的处理程序
		onUpdate: null,        // 每次元素更新/回调方法
		onComplete: null       //  回调方法，当元件完成更新
	};
	
	function formatter(value, settings) {
		return value.toFixed(settings.decimals);
	}



  //自定义格式的例子
  $('#count-number2').data('countToOptions', {
	formatter: function (value, options) {
	  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
	}
  });
  
  // 启动所有计时器
  $('.timer2').each(count);  
  
  function count(options) {
	var $this = $(this);
	options = $.extend({}, options || {}, $this.data('countToOptions') || {});
	$this.countTo(options);
  }
  

