webpackJsonp([0],[,,,,,,,function(t,e,a){"use strict";function s(t,e,a){return Math.max(Math.min(t,a),e)}function i(t,e,a){return t*(a-e)+e}function n(t,e,a){return(t-e)/(a-e)}e.a=s,e.c=i,e.b=n},,,,function(t,e,a){a(61);var s=a(0)(a(19),a(81),"data-v-0f4cba99",null);t.exports=s.exports},function(t,e,a){a(65);var s=a(0)(a(20),a(89),"data-v-843f626a",null);t.exports=s.exports},function(t,e,a){a(64);var s=a(0)(a(21),a(88),null,null);t.exports=s.exports},,function(t,e,a){"use strict";var s=a(6),i=a(92),n=a(74),r=a.n(n),o=a(73),l=a.n(o),c=a(76),u=a.n(c),d=a(72),v=a.n(d),p=a(75),f=a.n(p),m=a(77),g=a.n(m),h=a(78),b=a.n(h);s.a.use(i.a),e.a=new i.a({routes:[{path:"/engineering",component:r.a,children:[{path:"/",name:"engineering/dashboard",component:l.a},{path:"reactor",name:"engineering/reactor",component:u.a},{path:"cooling",name:"engineering/cooling",component:v.a},{path:"power",name:"engineering/power",component:f.a},{path:"storage",name:"engineering/storage",component:g.a}]},{path:"/test/everything",component:b.a}]})},function(t,e,a){a(62);var s=a(0)(a(17),a(82),null,null);t.exports=s.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(34);a.n(s);e.default={name:"gauge",props:{type:{type:String,required:!0},value:{type:Number,required:!0},options:{type:Object,default:function(){return{}}}},data:function(){return{gauge:null}},watch:{value:function(t){this.gauge&&(this.gauge.value=t)}},mounted:function(){this.options.renderTo=this.$el,"linear"===this.type?this.gauge=new s.LinearGauge(this.options):this.gauge=new s.RadialGauge(this.options),this.gauge.value=this.value,this.gauge.draw()},beforeDestroy:function(){this.gauge&&this.gauge.destroy()}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"lamp",props:{color:{type:String,default:"red"},enabled:Boolean,flash:{type:Boolean,default:!0}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"seven-segment-display",props:{value:{type:[Number,String],required:!0},digits:{type:Number,default:3},decimals:{type:Number,default:1},color:{type:String,default:"orange"}},computed:{formattedValue:function(){if("string"==typeof this.value)return this.value.substring(this.value.length-this.digits);var t=Math.pow(10,this.decimals);return(Math.round(this.value*t)/t).toFixed(this.decimals)},backgroundDigits:function(){for(var t="",e=0;e<this.digits;e++)t+="8",this.decimals&&e===this.digits-this.decimals-1&&(t+=".");return t}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(30);e.default={name:"vertical-slider",props:{value:{type:Number,required:!0},vertical:{type:Boolean,default:!0}},methods:{sliderValueChanged:function(t){this.$emit("update",t)}},mounted:function(){this.slider=a.i(s.a)(this.$el,{value:this.value,vertical:this.vertical,drag:this.sliderValueChanged})}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"stepped-bar",props:{min:{type:Number,default:0},max:{type:Number,default:100},value:{type:Number,required:!0},orientation:{type:String,default:"vertical"},steps:{type:Number,required:!0},color:{type:String,default:"green"}},data:function(){return{}},computed:{valueToSteps:function(){return(this.value-this.min)/(this.max-this.min)*this.steps}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"cooling",props:{state:{required:!0}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(33),i=a.n(s),n=a(12),r=a.n(n),o=a(11),l=a.n(o),c=a(13),u=a.n(c),d=a(7),v=a(31);e.default={name:"dashboard",props:{state:{required:!0}},data:function(){return{limits:v.a}},computed:{values:function(){var t=this,e={};return i()(this.state).forEach(function(a){var s=t.state[a];e[a]={},i()(s).forEach(function(i){var n=s[i],r=t.rangeForValue(a,i,n);e[a][i]={data:n,type:r.id,color:r.color}})}),e}},methods:{rangeForValue:function(t,e,a){if(!v.a.ranges[t]||!v.a.ranges[t][e])return{id:"default",color:"default"};var s=v.a.ranges[t][e].find(function(t){return a>=t.from&&a<=t.to});return s||{id:"default",color:"default"}},rangeToNormalized:d.b,normalizedToRange:d.c},components:{SevenSegmentDisplay:r.a,Lamp:l.a,Slider:u.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(69),i=(a.n(s),a(67));e.default={name:"dashboard",data:function(){var t=a.i(i.a)();return{stateMachine:t,state:a.i(s.createInitialState)(t),simulationIntervalId:null,navigation:[{to:{name:"engineering/dashboard"},text:"dashboard"},{to:{name:"engineering/reactor"},text:"reactor"},{to:{name:"engineering/cooling"},text:"cooling"},{to:{name:"engineering/power"},text:"power"},{to:{name:"engineering/storage"},text:"storage"}]}},mounted:function(){var t=this;this.simulationIntervalId=setInterval(function(){t.state=a.i(s.update)(t.stateMachine,t.state)},1e3)},beforeDestroy:function(){this.simulationIntervalId&&clearInterval(simulationIntervalId)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"power",props:{state:{required:!0}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"reactor",props:{state:{required:!0}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"storage",props:{state:{required:!0}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(7),i=a(71),n=a.n(i),r=a(12),o=a.n(r),l=a(11),c=a.n(l),u=a(70),d=a.n(u),v=a(13),p=a.n(v);e.default={name:"TestEverything",data:function(){return{values:[3.7,54,7.31,.5],lamps:[{id:0,color:"red",enabled:!0,flashing:!0},{id:1,color:"red",enabled:!1,flashing:!1},{id:2,color:"orange",enabled:!0,flashing:!0},{id:3,color:"green",enabled:!0,flashing:!0}],sliderValue:50,gaugeValues:[83.6,2573],intervals:[]}},methods:{updateValues:function(){this.values.splice(0,1,a.i(s.a)(this.values[0]+10*Math.random()-5,0,100)),this.values.splice(1,1,a.i(s.a)(this.values[1]+10*Math.random()-5,0,99)),this.values.splice(2,1,a.i(s.a)(this.values[2]+Math.random()-.5,0,10)),this.values.splice(3,1,a.i(s.a)(this.values[3]+.5*Math.random()-.25,0,1))},updateGauges:function(){this.gaugeValues.splice(0,1,53.6+40*Math.random()),this.gaugeValues.splice(1,1,1e3+4e3*Math.random())},toggleLamp:function(t){t.enabled=!t.enabled}},mounted:function(){this.intervals.push(setInterval(this.updateValues.bind(this),250)),this.intervals.push(setInterval(this.updateGauges.bind(this),2e3))},beforeDestroy:function(){this.intervals.forEach(clearInterval)},components:{SevenSegmentDisplay:o.a,SteppedBar:n.a,Lamp:c.a,Gauge:d.a,VerticalSlider:p.a}}},function(t,e,a){"use strict";function s(t,e,a){function s(t){return void 0!==t}function i(t){return"function"==typeof t}function n(t){for(var e=t[T];t=t.offsetParent;)e+=t[T];return e}function r(t,e,a){e.addEventListener?e.addEventListener(t,a,!1):e.attachEvent?e.attachEvent("on"+t,a):e["on"+t]=a}function o(t,e,a){e.removeEventListener?e.removeEventListener(t,a):e.detachEvent?e.detachEvent("on"+t,a):e["on"+t]=null}function l(t,e){e.classList?e.classList.add(t):e.className+=" "+t}function c(t,e,a){return t<e?e:t>a?a:t}function u(t){return t.preventDefault&&t.preventDefault(),!1}function d(){x=b[S],w=n(b),k=_[S]}function v(a){return d(),y=!0,m(a),r("touchmove",h,p),r("mousemove",h,p),i(e.start)&&e.start(C,t,a),u(a)}function p(t){return m(t),u(t)}function f(a){return y=!1,o("touchmove",h,p),o("mousemove",h,p),i(e.stop)&&e.stop(C,t,a),u(a)}function m(a){a=a||g.event;var s=a.touches?a.touches[0][M]:a[M],n=c(s-w,0,x),r=c((s-w)/x,0,1);s||(s=a[P]+h.body[R]+h.documentElement[R]),y&&(_.style[E]=n-k/2+"px",C=r,i(e.drag)&&e.drag(C,t,a))}e=e||{};var g=window,h=document,b=h.createElement("div"),_=h.createElement("span"),y=!1,x=0,k=0,w=0,C=0,a=a||e.vertical||!1,S=a?"offsetHeight":"offsetWidth",E=a?"top":"left",M=a?"pageY":"pageX",T=a?"offsetTop":"offsetLeft",P=a?"clientY":"clientX",R=a?"scrollTop":"scrollLeft";return l("range-slider",t),l("range-slider-"+(a?"vertical":"horizontal"),t),l("range-slider-track",b),l("dragger",_),i(e)&&(e={drag:e}),r("touchstart",b,v),r("mousedown",b,v),r("touchend",h,f),r("mouseup",h,f),r("resize",g,function(t){d(),y=!1,_.style[E]=C*x-k/2+"px"}),b.appendChild(_),t.appendChild(b),d(),function(){C=c(s(e.value)?e.value:0,0,1),_.style[E]=C*x-k/2+"px",i(e.create)&&e.create(C,t),i(e.drag)&&e.drag(C,t)}(),t}e.a=s},function(t,e,a){"use strict";e.a={ranges:{reactor:{heat:[{from:-1/0,to:100,id:"cold",color:"blue"},{from:100,to:500,id:"normal",color:"green"},{from:500,to:1e3,id:"warning",color:"orange"},{from:1e3,to:1/0,id:"critical",color:"red"}]},distributor:{heat:[{from:-1/0,to:50,id:"normal",color:"green"},{from:100,to:150,id:"warning",color:"orange"},{from:150,to:1/0,id:"critical",color:"red"}]},core:{powerSatisfaction:[{from:-1/0,to:.25,id:"critical",color:"red"},{from:.25,to:.75,id:"warning",color:"orange"},{from:.75,to:1/0,id:"normal",color:"green"}]},base:{powerSatisfaction:[{from:-1/0,to:.25,id:"critical",color:"red"},{from:.25,to:.75,id:"warning",color:"orange"},{from:.75,to:1/0,id:"normal",color:"green"}]}},input:{"storage-matter":{releasedMatterPerTick:{min:0,max:250}},"storage-antimatter":{releasedAntimatterPerTick:{min:0,max:250}},"reactor-cooling":{cooling:{min:0,max:500}}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a(6),i=a(16),n=a.n(i),r=a(15);s.a.config.productionTip=!1,new s.a({el:"#app",router:r.a,render:function(t){return t(n.a)}})},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e){t.exports={initial:{"storage-matter":{matter:1e8},"storage-antimatter":{antimatter:1e8}},cooling:{distributor:100},production:{reactor:{maxMatterInput:1e3,maxAntimatterInput:1e3,maxMatterConsumption:500,maxAntimatterConsumption:500,maxPowerGeneration:500,maxHeatGeneration:1e3,powerToHeatFactor:2,heatTolerance:2e3,heatShutdownThreshold:5e3,shutdownDuration:10},distributor:{powerToHeatFactor:.5,heatTolerance:200,shutdownDuration:10}},limits:{core:{powerRequired:50},base:{powerRequired:75}}}},,function(t,e,a){var s=a(0)(a(18),a(91),null,null);t.exports=s.exports},function(t,e,a){a(66);var s=a(0)(a(22),a(90),"data-v-c9ef275e",null);t.exports=s.exports},function(t,e,a){var s=a(0)(a(23),a(83),null,null);t.exports=s.exports},function(t,e,a){var s=a(0)(a(24),a(87),null,null);t.exports=s.exports},function(t,e,a){a(63);var s=a(0)(a(25),a(86),null,null);t.exports=s.exports},function(t,e,a){var s=a(0)(a(26),a(85),null,null);t.exports=s.exports},function(t,e,a){var s=a(0)(a(27),a(84),null,null);t.exports=s.exports},function(t,e,a){var s=a(0)(a(28),a(79),null,null);t.exports=s.exports},function(t,e,a){var s=a(0)(a(29),a(80),null,null);t.exports=s.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"10%"}},[t._v("\n            A\n            "),a("stepped-bar",{attrs:{steps:25,value:t.values[0],color:"orange"}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[0],digits:3,decimals:1}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%"}},[t._v("\n            B\n            "),a("stepped-bar",{attrs:{steps:15,max:99,value:t.values[1]}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[1],digits:2,decimals:0,color:"green"}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[1],digits:3,decimals:1,color:"red"}}),t._v(" "),a("stepped-bar",{attrs:{steps:7,value:t.values[0],color:"orange"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"12%"}},[t._v("\n            C\n            "),a("stepped-bar",{attrs:{steps:10,max:10,value:t.values[2],color:"red"}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[2],digits:4,decimals:2,color:"red"}}),t._v(" "),a("stepped-bar",{attrs:{steps:14,max:99,value:t.values[1],color:"red"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"5%"}},[t._v("\n            D\n            "),a("stepped-bar",{attrs:{steps:10,max:1,value:t.values[3],color:"red"}}),t._v(" "),a("div",{staticStyle:{"font-size":"0.5em"}},[a("seven-segment-display",{attrs:{value:t.values[3],digits:3,decimals:2,color:"red"}})],1),t._v(" "),a("div",{staticClass:"block-group",staticStyle:{"font-size":"0.25em"}},[a("seven-segment-display",{staticClass:"block",staticStyle:{width:"50%"},attrs:{value:t.values[3],digits:3,decimals:2,color:"green"}}),t._v(" "),a("seven-segment-display",{staticClass:"block",staticStyle:{width:"50%"},attrs:{value:t.values[3],digits:3,decimals:2,color:"orange"}})],1),t._v(" "),a("lamp",{attrs:{color:"orange",enabled:!0,flash:!0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%"}},[t._v("\n            E\n            "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"50%"}},[t._v("\n                    Ist\n                    "),a("stepped-bar",{attrs:{value:t.sliderValue,steps:10,min:100,max:0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"50%"}},[t._v("\n                    Soll\n                    "),a("vertical-slider",{staticStyle:{height:"180px"},attrs:{value:t.sliderValue},on:{update:function(e){t.sliderValue=e}}})],1)])]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%"}},[t._v("\n            F\n            "),a("seven-segment-display",{attrs:{value:"-E-",digits:3,color:"red"}}),t._v(" "),a("seven-segment-display",{attrs:{value:"EEEEEEEEE",digits:3,color:"green"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%",height:"300px"}},[t._v("\n            G\n            "),a("gauge",{attrs:{type:"linear",value:t.gaugeValues[0],options:{tickSide:"left",needleSide:"left",numberSide:"left",units:"°C",valueInt:2,valueDec:1,valueBox:!1,borders:!1,colorPlate:"transparent",title:"Kühlwasser",colorTitle:"black",colorUnits:"black",colorNumbers:"black",colorNeedle:"black",colorNeedleEnd:"black",colorBarProgress:"#ff5454",colorBarProgressEnd:"#0063c7",fontNumbersSize:40,fontTitleSize:40,fontUnitsSize:50,fontValueSize:40,fontTitleWeight:"bold",majorTicks:[0,25,50,75,100],minorTicks:1,highlights:[{from:0,to:50,color:"green"},{from:50,to:75,color:"orange"},{from:75,to:100,color:"red"}],animationRule:"dequad",animatedValue:!0}}})],1)]),t._v(" "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block"},[a("div",{staticClass:"danger-strip",staticStyle:{width:"200px",height:"20px"}}),t._v(" "),a("div",{staticStyle:{height:"50px"}},t._l(t.lamps,function(e){return a("span",{key:e.id,on:{click:function(a){t.toggleLamp(e)}}},[a("lamp",{attrs:{color:e.color,enabled:e.enabled,flash:e.flashing}})],1)})),t._v(" "),a("div",{staticClass:"warning-strip",staticStyle:{width:"200px",height:"20px"}})]),t._v(" "),a("div",{staticClass:"block"},[a("gauge",{attrs:{type:"radial",value:t.gaugeValues[1],options:{units:"RPM",minValue:0,maxValue:6e3,animationRule:"dequad"}}})],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lamp"},[a("div",{staticClass:"inactive",class:[t.color]}),t._v(" "),a("div",{staticClass:"active",class:[{enabled:t.enabled,flash:t.flash},t.color]})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("nav",[a("div",{staticClass:"block-group"},t._l(t.navigation,function(e){return a("div",{key:e.text,staticClass:"block nav-item-wrapper",style:{width:100/t.navigation.length+"%"}},[a("router-link",{staticClass:"nav-item",attrs:{tag:"a",to:e.to}},[t._v("\n                    "+t._s(e.text)+"\n                ")])],1)}))]),t._v(" "),a("section",{staticClass:"content"},[a("router-view",{attrs:{state:t.state.stateMachines}})],1),t._v(" "),a("div",{staticClass:"warning-strip"},[t._v(" ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[t._v("\n                    reactor\n                    "),t.state.reactor.shutdownRemaining?a("span",[t._v("offline")]):t._e()]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"50%"}},[a("seven-segment-display",{attrs:{value:Math.round(t.values.reactor.heat.data)+"°C",color:t.values.reactor.heat.color,digits:6,decimals:0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"20%"}},[a("lamp",{attrs:{enabled:"critical"===t.values.reactor.heat.type,color:"red",flash:!0}})],1)]),t._v(" "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[t._v("\n                    distributor\n                    "),t.state.distributor.shutdownRemaining?a("span",[t._v("offline")]):t._e()]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"50%"}},[a("seven-segment-display",{attrs:{value:Math.round(t.values.distributor.heat.data)+"°C",color:t.values.distributor.heat.color,digits:6,decimals:0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"20%"}},[a("lamp",{attrs:{enabled:"critical"===t.values.distributor.heat.type,color:"red",flash:!0}})],1)])]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"20%"}},[a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[t._v("\n                    core\n                ")]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"60%"}},[a("seven-segment-display",{attrs:{value:t.values.core.powerRequired.data*t.values.core.powerSatisfaction.data,color:t.values.core.powerSatisfaction.color,digits:4,decimals:1}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"10%"}},[t._v("\n                    kWh\n                ")])]),t._v(" "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[t._v("\n                    base\n                ")]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"60%"}},[a("seven-segment-display",{attrs:{value:t.values.base.powerRequired.data*t.values.base.powerSatisfaction.data,color:t.values.base.powerSatisfaction.color,digits:4,decimals:1}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"10%"}},[t._v("\n                    kWh\n                ")])])]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"25%"}}),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"25%"}})]),t._v(" "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block block-group",staticStyle:{width:"25%"}},[a("div",{staticClass:"block"},[t._v("\n                matter: "+t._s(Math.round(t.state["storage-matter"].releasedMatterPerTick))+"\n                "),a("slider",{attrs:{vertical:!1,value:t.state["storage-matter"].releasedMatterPerTick},on:{update:function(e){return t.state["storage-matter"].releasedMatterPerTick=t.normalizedToRange(e,t.limits.input["storage-matter"].releasedMatterPerTick.min,t.limits.input["storage-matter"].releasedMatterPerTick.max)}}})],1),t._v(" "),a("div",{staticClass:"block"},[t._v("\n                antimatter: "+t._s(Math.round(t.state["storage-antimatter"].releasedAntimatterPerTick))+"\n                "),a("slider",{attrs:{vertical:!1,value:t.state["storage-antimatter"].releasedAntimatterPerTick},on:{update:function(e){return t.state["storage-antimatter"].releasedAntimatterPerTick=t.normalizedToRange(e,t.limits.input["storage-antimatter"].releasedAntimatterPerTick.min,t.limits.input["storage-antimatter"].releasedAntimatterPerTick.max)}}})],1)]),t._v(" "),a("div",{staticClass:"block block-group",staticStyle:{width:"25%"}},[a("div",{staticClass:"block"},[t._v("\n                cooling: "+t._s(Math.round(t.state["reactor-cooling"].cooling))+"\n                "),a("slider",{attrs:{vertical:!1,value:t.rangeToNormalized(t.state["reactor-cooling"].cooling,0,1)},on:{update:function(e){return t.state["reactor-cooling"].cooling=t.normalizedToRange(e,t.limits.input["reactor-cooling"].cooling.min,t.limits.input["reactor-cooling"].cooling.max)}}})],1)])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"segment-display"},[a("div",{staticClass:"background",attrs:{"data-content":t.backgroundDigits}}),t._v(" "),a("div",{staticClass:"value",class:[t.color]},[t._v(t._s(t.formattedValue))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stepped-bar"},[a("div",{staticClass:"steps"},t._l(t.steps,function(e){return a("div",{staticClass:"step"},[a("div",{staticClass:"state",class:[{active:t.steps-e<t.valueToSteps},t.color]})])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("canvas",{staticClass:"canvas-gauges"})},staticRenderFns:[]}}],[32]);
//# sourceMappingURL=app.2a976bb6ca8a0310fbc0.js.map