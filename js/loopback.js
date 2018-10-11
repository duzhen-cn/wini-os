/**
 *
 * @参数说明：
 * @url URL地址
 * @dataUrl 服务器地址，用来请求数据
 * @chartFontSize 仪表盘内显示数据的文字大小
 * @paraString URL中的参数数组
 * @showFlag 进入此次回环的机房数量的奇偶性 1 为显示的单个 2为显示两个
 * @仪表盘控件为百度echarts 3.0，参数设置可参考API
 *
 */


var url = location.href; //获取url
url = decodeURI(url); //防止中文乱码
var chartFontSize = parseInt(window.screen.width / 113);
var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&"); //获取url参数
var showFlag = paraString[0].substring(11, paraString[0].length) //用来控制机房显示数量
var stationNameA = paraString[1].substring(6, paraString[1].length) //stationNameA
var stationNameB = paraString[2].substring(6, paraString[2].length) //stationNameB
var stationIDA = paraString[3].substring(11, paraString[3].length) //stationNameA
var stationIDB = paraString[4].substring(11, paraString[4].length) //stationNameB

//点击页面时隐藏帮助中心和开始菜单
$("#stationDivA").click(function() {
    $("#win10-desktop-scene", parent.document).removeClass("bg-blur");
    $("#win10_command_center", parent.document).addClass('hidden_right');
    $("#win10_command_center", parent.document).addClass('hidden_right');
    $("#win10-menu", parent.document).removeClass('opened');
    $("#win10-menu", parent.document).addClass('hidden');
});
//设置右键菜单
function renderContextMenu(x, y, menu, trigger) {
    window.parent.Win10._removeContextMenu();
    removeContextMenu();
    if (menu === true) { return; }
    var dom = $("<div class='win10-context-menu'><ul></ul></div>");
    $('#stationDivA').append(dom);
    var ul = dom.find('ul');
    for (var i = 0; i < menu.length; i++) {
        var item = menu[i];
        if (item === '|') {
            ul.append($('<hr/>'));
            continue;
        }
        if (typeof(item) === 'string') {
            ul.append($('<li>' + item + '</li>'));
            continue;
        }
        if (typeof(item) === 'object') {
            var sub = $('<li>' + item[0] + '</li>');
            ul.append(sub);
            sub.click(trigger, item[1]);
            continue;
        }
    }
    //修正坐标
    if (x + 150 > document.body.clientWidth) { x -= 150 }
    if (y + dom.height() > document.body.clientHeight) { y -= dom.height() }
    dom.css({
        top: y,
        left: x,
    });
}
// 设置右键参数
function setContextMenu(jq_dom, menu) {

    if (typeof(jq_dom) === 'string') {
        jq_dom = $(jq_dom);
    }
    jq_dom.unbind('contextmenu');
    jq_dom.on('contextmenu', function(e) {
        if (menu) {
            renderContextMenu(e.clientX, e.clientY, menu, this);
            if (e.cancelable) {
                // 判断默认行为是否已经被禁用
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
            e.stopPropagation();
        }
    });
}

function removeContextMenu() {
    $('.win10-context-menu').remove();
}
//点击清空右键菜单
$(document).click(function(event) {
    if (!event.button)
        window.parent.Win10._removeContextMenu();
    removeContextMenu();
});
//禁用右键的右键
$(document).on('contextmenu', '.win10-context-menu', function(e) {
    e.preventDefault();
    e.stopPropagation();
});
//修正右键菜单
setContextMenu('#stationDivA', [
    ['<i class="fa fa-fw fa-refresh"></i> Refresh List', function() { window.parent.loadData(); }],
    ['<i class="fa fa-fw fa-window-maximize"></i> Full screen', function() { window.parent.Win10.enableFullScreen() }],
    ['<i class="fa fa-fw fa-window-restore"></i> Disable Full', function() { window.parent.Win10.disableFullScreen() }],
    '|', ['<i class="fa fa-fw fa-info-circle"></i> About Us', function() { window.parent.Win10.aboutUs() }],

]);

//只显示单个机房
if (showFlag == 1) {
    $("#stationDivA").show();
    $(document).ready(function() {
        var myChartT1 = echarts.init(document.getElementById('mainT1'));
        var myChartT2 = echarts.init(document.getElementById('mainT2'));
        var myChartT3 = echarts.init(document.getElementById('mainT3'));
        var myChartT4 = echarts.init(document.getElementById('mainT4'));
        var myChartT5 = echarts.init(document.getElementById('mainT5'));
        var myChartT7 = echarts.init(document.getElementById('mainT7'));
        var myChartT8 = echarts.init(document.getElementById('mainT8'));
        option = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 300,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        option2 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 100,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        option3 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        option4 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        option5 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        option7 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: '电压',
                type: 'gauge',
                min: 0,
                max: 600,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        option8 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -200,
                max: 200,
                splitNumber: 4,
                axisLine: {
                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']
                        ]
                    }
                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {
                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    offsetCenter: ['70%', '100%'],
                },
                data: [{
                    value: 26.1,
                }]
            }]
        };
        myChartT1.setOption(option);
        myChartT2.setOption(option2);
        myChartT3.setOption(option3);
        myChartT4.setOption(option4);
        myChartT5.setOption(option5);
        myChartT7.setOption(option7);
        myChartT8.setOption(option8); //设置Echarts图表参数
    });

} else {
    $("#stationDivA").show();
    $("#stationDivB").show();
    $(document).ready(function() {
        var myChartT1 = echarts.init(document.getElementById('mainT1')); //实例化echart图表
        var myChartT2 = echarts.init(document.getElementById('mainT2')); //实例化echart图表
        var myChartT3 = echarts.init(document.getElementById('mainT3')); //实例化echart图表
        var myChartT4 = echarts.init(document.getElementById('mainT4')); //实例化echart图表
        var myChartT5 = echarts.init(document.getElementById('mainT5')); //实例化echart图表
        //var myChartT6 = echarts.init(document.getElementById('mainT6'));//实例化echart图表
        var myChartT7 = echarts.init(document.getElementById('mainT7')); //实例化echart图表
        var myChartT8 = echarts.init(document.getElementById('mainT8')); //实例化echart图表

        //******************************************************************************

        var myChartG1 = echarts.init(document.getElementById('mainG1')); //实例化echart图表
        var myChartG2 = echarts.init(document.getElementById('mainG2')); //实例化echart图表
        var myChartG3 = echarts.init(document.getElementById('mainG3')); //实例化echart图表
        var myChartG4 = echarts.init(document.getElementById('mainG4')); //实例化echart图表
        var myChartG5 = echarts.init(document.getElementById('mainG5')); //实例化echart图表
        //var myChartG6 = echarts.init(document.getElementById('mainG6'));//实例化echart图表
        var myChartG7 = echarts.init(document.getElementById('mainG7')); //实例化echart图表
        var myChartG8 = echarts.init(document.getElementById('mainG8')); //实例化echart图表



        // 指定图表的配置项和数据
        option = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 300,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/

                }]
            }]
        };

        // 指定图表的配置项和数据
        option2 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 100,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        option3 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        option4 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        option5 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        /*
	option6 =  {
			title: {
			text: '电池温度',
			textStyle:{
				color: '#FFF', 
				fontSize:9,	
				},
				bottom: 0,
				left: '10%',
		},
	
		series: [{
			name: '温度',
			type: 'gauge',
			min:-20,
			max:50,
			splitNumber:4,
	
			axisLine: {
				
				lineStyle: {
					width: 3,
					color: [
						[0.5, '#FFCC22'],
						[1, '#FFAA33']
	
					]
				}
	 
	
			},
			axisLabel:{
				fontSize: 8,
			},
			pointer:{width :2,color :'#FFFFFF'},
			splitLine: {
				length: 0
			},
			axisTick:{
				
				length: 4
				},
			detail:{
				show:true,
				color: '#FFF',
				fontSize: 9,
				//fontWeight: 'bold',
				offsetCenter:['70%','100%'],
				
				},
	
			data: [{
				value: 2.3,
	
			
			}]
		}]
	};*/
        option7 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 600,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        option8 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -200,
                max: 200,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        //*****************************************************
        // 指定图表的配置项和数据
        optionG = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 300,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/

                }]
            }]
        };

        // 指定图表的配置项和数据
        optionG2 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: 0,
                max: 100,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        optionG3 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        optionG4 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        optionG5 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: 'value',
                type: 'gauge',
                min: -20,
                max: 50,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        /*
	optionG6 =  {
			title: {
			text: '电池温度',
			textStyle:{
				color: '#FFF', 
				fontSize:9,	
				},
				bottom: 0,
				left: '10%',
		},
	
		series: [{
			name: '温度',
			type: 'gauge',
			min:-20,
			max:50,
			splitNumber:4,
	
			axisLine: {
				
				lineStyle: {
					width: 3,
					color: [
						[0.5, '#FFCC22'],
						[1, '#FFAA33']
	
					]
				}
	 
	
			},
			axisLabel:{
				fontSize: 8,
			},
			pointer:{width :2,color :'#FFFFFF'},
			splitLine: {
				length: 0
			},
			axisTick:{
				
				length: 4
				},
			detail:{
				show:true,
				color: '#FFF',
				fontSize: 9,
				//fontWeight: 'bold',
				offsetCenter:['70%','100%'],
				
				},
	
			data: [{
				value: 23.6,
		
	
			
			}]
		}]
	};
	*/
        optionG7 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: '电压',
                type: 'gauge',
                min: 0,
                max: 600,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };
        optionG8 = {
            title: {
                text: 'value',
                textStyle: {
                    color: '#FFF',
                    fontSize: chartFontSize,
                },
                bottom: 0,
                left: '10%',
            },
            animationDuration: function() {
                return 2500;
            },
            series: [{
                name: '电压',
                type: 'gauge',
                min: -200,
                max: 200,
                splitNumber: 4,

                axisLine: {

                    lineStyle: {
                        width: 3,
                        color: [
                            [0.5, '#FFCC22'],
                            [1, '#FFAA33']

                        ]
                    }


                },
                axisLabel: {
                    fontSize: 8,
                },
                pointer: {
                    width: 2,
                    color: '#FFFFFF'
                },
                splitLine: {
                    length: 0
                },
                axisTick: {

                    length: 4
                },
                detail: {
                    show: true,
                    color: '#FFF',
                    fontSize: chartFontSize,
                    //fontWeight: 'bold',
                    offsetCenter: ['70%', '100%'],

                },

                data: [{
                    value: 26.1,
                    /*lable:{emphasis:{
					fontSize:10,	
					
					}},*/


                }]
            }]
        };

        myChartT1.setOption(option); //设置Echarts图表参数
        myChartT2.setOption(option2); //设置Echarts图表参数
        myChartT3.setOption(option3); //设置Echarts图表参数
        myChartT4.setOption(option4); //设置Echarts图表参数
        myChartT5.setOption(option5); //设置Echarts图表参数
        //myChartT6.setOption(option6);//设置Echarts图表参数
        myChartT7.setOption(option7); //设置Echarts图表参数
        myChartT8.setOption(option8); //设置Echarts图表参数
        //*************************************************
        myChartG1.setOption(optionG); //设置Echarts图表参数
        myChartG2.setOption(optionG2); //设置Echarts图表参数
        myChartG3.setOption(optionG3); //设置Echarts图表参数
        myChartG4.setOption(optionG4); //设置Echarts图表参数
        myChartG5.setOption(optionG5); //设置Echarts图表参数
        //myChartG6.setOption(optionG6);//设置Echarts图表参数
        myChartG7.setOption(optionG7); //设置Echarts图表参数
        myChartG8.setOption(optionG8); //设置Echarts图表参数
    });

}



$("#StationNameA").html(stationNameA);
$("#StationNameB").html(stationNameB);

function DetailA() {
    alert("You can write custom events.");
}

function DetailB() {
    alert("You can write custom events.");
}

function AlarmStatus(id, flag) {
    if (flag == 1) {
        $(id).html('Alarm');
        $(id).removeClass("layui-btn-warm");
        $(id).addClass("layui-btn-danger");
    } else if (flag == "0") {
        $(id).html('Normal');
        $(id).removeClass("layui-btn-warm");
        $(id).addClass("layui-btn-lg");
    }
}