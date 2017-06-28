webpackJsonp([0],[,function(t,e,a){"use strict";e.a={props:{state:{required:!0}},methods:{changeProperty:function(t,e,a){this.$emit("changeProperty",t,e,a)}}}},function(t,e,a){"use strict";function n(t,e,a){return Math.max(Math.min(t,a),e)}function r(t,e,a){return t*(a-e)+e}function i(t,e,a){return(t-e)/(a-e)}e.a=n,e.b=r,e.c=i},,,function(t,e,a){a(84);var n=a(0)(a(31),a(111),"data-v-843f626a",null);t.exports=n.exports},,,,,function(t,e,a){a(77);var n=a(0)(a(30),a(101),"data-v-0f4cba99",null);t.exports=n.exports},function(t,e,a){a(83);var n=a(0)(a(32),a(110),null,null);t.exports=n.exports},,function(t,e,a){"use strict";function n(){l=setInterval(function(){return o.a.update()},s)}function r(){l&&(clearInterval(l),l=null)}e.a=n,e.b=r;var i=a(22),o=a.n(i),s=100,l=null},,,,,,,,,,function(t,e,a){a(82);var n=a(0)(a(34),a(109),"data-v-79636a42",null);t.exports=n.exports},function(t,e,a){a(86);var n=a(0)(a(35),a(115),"data-v-f22c48aa",null);t.exports=n.exports},,function(t,e,a){"use strict";var n=a(12),r=a(116),i=a(93),o=a.n(i),s=a(92),l=a.n(s),c=a(95),u=a.n(c),d=a(94),f=a.n(d),m=a(97),p=a.n(m),g=a(96),v=a.n(g),h=a(98),y=a.n(h),b=a(90),_=a.n(b);n.a.use(r.a),e.a=new r.a({routes:[{path:"/engineering",component:o.a,children:[{path:"/",name:"engineering/dashboard",component:l.a},{path:"reactor",name:"engineering/reactor",component:u.a},{path:"power",name:"engineering/power",component:f.a},{path:"water",name:"engineering/water",component:p.a},{path:"storage",name:"engineering/storage",component:v.a}]},{path:"/test/everything",component:y.a},{path:"/debug/simulation",component:_.a}]})},function(t,e,a){a(79);var n=a(0)(a(28),a(103),null,null);t.exports=n.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(50);a.n(n);e.default={name:"gauge",props:{type:{type:String,required:!0},value:{type:Number,required:!0},options:{type:Object,default:function(){return{}}}},data:function(){return{gauge:null}},watch:{value:function(t){this.gauge&&(this.gauge.value=t)}},mounted:function(){this.options.renderTo=this.$el,"linear"===this.type?this.gauge=new n.LinearGauge(this.options):this.gauge=new n.RadialGauge(this.options),this.gauge.value=this.value,this.gauge.draw()},beforeDestroy:function(){this.gauge&&this.gauge.destroy()}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"lamp",props:{color:{type:String,default:"red"},enabled:Boolean,flash:{type:Boolean,default:!0}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(22),r=a.n(n);e.default={name:"seven-segment-display",props:{value:{type:[Number,String],required:!0},digits:{type:Number,default:3},decimals:{type:Number,default:1},color:{type:String,default:"orange"}},data:function(){return{animatedValue:this.value}},computed:{formattedValue:function(){if("string"==typeof this.value)return this.value.substring(this.value.length-this.digits);var t=Math.pow(10,this.decimals);return(Math.round(this.animatedValue*t)/t).toFixed(this.decimals)},backgroundDigits:function(){for(var t="",e=0;e<this.digits;e++)t+="8",this.decimals&&e===this.digits-this.decimals-1&&(t+=".");return t}},watch:{value:function(t,e){var a=this;new r.a.Tween({value:e}).easing(r.a.Easing.Linear.None).to({value:t},1e3).onUpdate(function(){a.animatedValue=this.value}).start()}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(45);e.default={name:"slider",props:{value:{type:Number,required:!0},vertical:{type:Boolean,default:!0}},methods:{sliderValueChanged:function(t){this.$emit("update",t)}},mounted:function(){this.slider=a.i(n.a)(this.$el,{value:this.value,vertical:this.vertical,drag:this.sliderValueChanged})}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"stepped-bar",props:{min:{type:Number,default:0},max:{type:Number,default:100},value:{type:Number,required:!0},orientation:{type:String,default:"vertical"},steps:{type:Number,required:!0},color:{type:String,default:"green"}},data:function(){return{}},computed:{valueToSteps:function(){return(this.value-this.min)/(this.max-this.min)*this.steps}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(5),r=a.n(n);e.default={name:"PowerConsumptionDisplay",props:{state:{required:!0},stateMachine:{required:!0,type:String},consumptionProperty:{default:"powerConsumed",type:String},satisfactionProperty:{default:"powerSatisfaction",type:String},label:{required:!0,type:String}},components:{SevenSegmentDisplay:r.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(5),r=a.n(n),i=a(10),o=a.n(i);e.default={name:"TemperatureDisplay",props:{state:{required:!0},stateMachine:{required:!0,type:String},property:{required:!0,type:String},label:{required:!0,type:String}},components:{SevenSegmentDisplay:r.a,Lamp:o.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(15),r=a.n(n),i=a(21),o=a.n(i),s=a(13),l=a(9),c=a.n(l),u=a(91),d=a.n(u),f=function(){var t=c()({},this.state);t.stateMachines=c()(t.stateMachines,this.stateChanges),this.stateChanges={},this.state=o.a.update(this.program,t)};e.default={name:"simulation",data:function(){var t=o.a.Program.BE13;return{program:t,state:o.a.createInitialState(t),stateChanges:{},simulationIntervalId:null,display:{stateMachines:[{id:"storage-matter",position:[0,0],targets:[{id:"reactor",fromOffset:{y:50},toOffset:{y:-50}}]},{id:"storage-antimatter",position:[1,0],targets:[{id:"reactor",fromOffset:{y:50},toOffset:{x:20,y:-50}}]},{id:"reactor",position:[0,1],targets:[{id:"energy-distributor",fromOffset:{y:60},toOffset:{y:-90}},{id:"reactor-cooling",fromOffset:{x:130},toOffset:{x:-140}}]},{id:"energy-distributor",position:[0,2],targets:[{id:"energy-converter",fromOffset:{x:140,y:-45},toOffset:{x:-140}},{id:"core",fromOffset:{y:90},toOffset:{y:-60}},{id:"energy-capacitor",fromOffset:{x:120,y:90},toOffset:{y:-40}}]},{id:"energy-converter",position:[1,2],targets:[{id:"power-distributor",fromOffset:{x:140},toOffset:{x:-140}}]},{id:"power-distributor",position:[2,2],targets:[{id:"reactor-cooling",fromOffset:{y:-40},toOffset:{y:60}},{id:"base",fromOffset:{y:60},toOffset:{y:-40}},{id:"water-treatment",fromOffset:{x:-120,y:60},toOffset:{x:80,y:-70}}]},{id:"reactor-cooling",position:[2,1]},{id:"energy-capacitor",position:[1,3.5],targets:[{id:"core",fromOffset:{x:-145},toOffset:{x:130}}]},{id:"core",position:[0,3.5]},{id:"base",position:[2,3]},{id:"water-tank",position:[2,4.5],targets:[{id:"water-treatment",fromOffset:{x:-140,y:5},toOffset:{x:130,y:-50}},{id:"reactor-cooling",fromOffset:{x:120,y:-30},toOffset:{x:120,y:60}}]},{id:"water-treatment",position:[1,4.5],targets:[{id:"base",fromOffset:{x:120,y:-70},toOffset:{y:50}}]},{id:"pump-a",position:[0,5.75],targets:[{id:"water-tank",fromOffset:{y:-60},toOffset:{x:-40,y:40}}]},{id:"pump-b",position:[1,5.75],targets:[{id:"water-tank",fromOffset:{y:-60},toOffset:{y:40}}]},{id:"pump-c",position:[2,5.75],targets:[{id:"water-tank",fromOffset:{y:-60},toOffset:{x:20,y:40}}]}]},arrowsDrawn:!1}},methods:{changeState:function(t){this.stateChanges=c()(this.stateChanges,t)},stateMachineChanged:function(t,e,a){this.changeState(r()({},t,r()({},e,a)))},stopSimulation:function(){this.simulationIntervalId&&(clearInterval(this.simulationIntervalId),this.simulationIntervalId=null)},startSimulation:function(){this.simulationIntervalId=setInterval(f.bind(this),1e3)},stepSimulation:function(){f.bind(this).apply()},resetSimulation:function(){var t=this.simulationRunning;this.stopSimulation(),this.state=o.a.createInitialState(this.program),this.stateChanges={},t&&this.startSimulation()},drawArrows:function(){function t(t,e){var a=Math.atan2(e.y-t.y,e.x-t.x);r.moveTo(t.x,t.y),r.lineTo(e.x,e.y),r.moveTo(e.x,e.y),r.lineTo(e.x-24*Math.cos(a-Math.PI/6),e.y-24*Math.sin(a-Math.PI/6)),r.moveTo(e.x,e.y),r.lineTo(e.x-24*Math.cos(a+Math.PI/6),e.y-24*Math.sin(a+Math.PI/6))}function e(t){var e=t.getBoundingClientRect();return{x:e.left+e.width/2-n.left,y:e.top+e.height/2-n.top}}var a=document.getElementById("connections-canvas"),n=a.getBoundingClientRect(),r=a.getContext("2d");r.strokeStyle="rgba(0, 100, 230, 0.75)",r.lineWidth=4,r.beginPath(),this.display.stateMachines.forEach(function(a){a.targets&&a.targets.forEach(function(n){var r=document.getElementById("state-machine-"+a.id),i=document.getElementById("state-machine-"+n.id),o=e(r),s=e(i);n.fromOffset&&(o.x+=n.fromOffset.x||0,o.y+=n.fromOffset.y||0),n.toOffset&&(s.x+=n.toOffset.x||0,s.y+=n.toOffset.y||0),t(o,s)})}),r.stroke(),this.arrowsDrawn=!0}},computed:{simulationRunning:function(){return!!this.simulationIntervalId}},mounted:function(){a.i(s.a)(),this.startSimulation()},beforeUpdate:function(){this.arrowsDrawn||this.drawArrows()},beforeDestroy:function(){this.stopSimulation(),a.i(s.b)()},components:{StateMachine:d.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(14),r=a.n(n),i=a(11),o=a.n(i),s=a(46),l=a(2);e.default={components:{Slider:o.a},name:"state-machine",props:{id:{type:String,required:!0},state:{required:!0},definition:{required:!0},position:{required:!0}},data:function(){return{limits:s.a,style:{minWidth:"304px",left:336*this.position[0]+"px",top:192*this.position[1]+"px"}}},methods:{update:function(t,e){var n=this.limits.input[this.id][t];this.$emit("update",t,a.i(l.a)(e,n.min,n.max))}},computed:{stateProperties:function(){var t=this;return r()(this.state).filter(function(e){return!t.editableProperties.includes(e)&&!t.outputProperties.includes(e)})},editableProperties:function(){var t=this;return r()(this.state).filter(function(e){return!!t.definition.public&&t.definition.public[e]})},outputProperties:function(){var t=this;return r()(this.state).filter(function(e){return!!t.definition.output&&t.definition.output.includes(e)})}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1),r=a(5),i=a.n(r),o=a(10),s=a.n(o),l=a(11),c=a.n(l),u=a(24),d=a.n(u),f=a(23),m=a.n(f);e.default={name:"dashboard",mixins:[n.a],components:{PowerConsumptionDisplay:m.a,SevenSegmentDisplay:i.a,Lamp:s.a,Slider:c.a,TemperatureDisplay:d.a}}},function(t,e,a){"use strict";function n(t,e,n,r){var i=t.stateMachines[e][n];return a.i(f.b)(r,i.min,i.max)}Object.defineProperty(e,"__esModule",{value:!0});var r=a(15),i=a.n(r),o=a(21),s=a.n(o),l=a(13),c=a(9),u=a.n(c),d=a(48),f=a(2);e.default={name:"dashboard",data:function(){var t=s.a.Program.BE13;return{simulation:{program:t,state:s.a.createInitialState(t),stateChanges:{},intervalId:null},navigation:[{to:{name:"engineering/dashboard"},text:"dashboard"},{to:{name:"engineering/reactor"},text:"reactor"},{to:{name:"engineering/power"},text:"power"},{to:{name:"engineering/water"},text:"water"},{to:{name:"engineering/storage"},text:"storage"}]}},methods:{changeProperty:function(t,e,a){this.changeState(i()({},t,i()({},e,n(this.state,t,e,a))))},changeState:function(t){this.simulation.stateChanges=u()(this.simulation.stateChanges,t)}},computed:{state:function(){return a.i(d.a)(this.simulation.state)}},mounted:function(){var t=this;this.simulation.intervalId=setInterval(function(){var e=u()({},t.simulation.state);e.stateMachines=u()(e.stateMachines,t.simulation.stateChanges),t.simulation.stateChanges={},t.simulation.state=s.a.update(t.simulation.program,e)},1e3),a.i(l.a)()},beforeDestroy:function(){this.simulation.intervalId&&clearInterval(this.simulation.intervalId),a.i(l.b)()}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1);e.default={name:"power",mixins:[n.a]}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1),r=a(24),i=a.n(r),o=a(23),s=a.n(o);e.default={name:"reactor",mixins:[n.a],components:{TemperatureDisplay:i.a,PowerConsumptionDisplay:s.a}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1);e.default={name:"storage",mixins:[n.a]}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(1);e.default={name:"water",mixins:[n.a]}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(2),r=a(89),i=a.n(r),o=a(5),s=a.n(o),l=a(10),c=a.n(l),u=a(88),d=a.n(u),f=a(11),m=a.n(f);e.default={name:"TestEverything",data:function(){return{values:[3.7,54,7.31,.5],lamps:[{id:0,color:"red",enabled:!0,flashing:!0},{id:1,color:"red",enabled:!1,flashing:!1},{id:2,color:"orange",enabled:!0,flashing:!0},{id:3,color:"green",enabled:!0,flashing:!0}],sliderValue:50,gaugeValues:[83.6,2573],intervals:[]}},methods:{updateValues:function(){this.values.splice(0,1,a.i(n.a)(this.values[0]+10*Math.random()-5,0,100)),this.values.splice(1,1,a.i(n.a)(this.values[1]+10*Math.random()-5,0,99)),this.values.splice(2,1,a.i(n.a)(this.values[2]+Math.random()-.5,0,10)),this.values.splice(3,1,a.i(n.a)(this.values[3]+.5*Math.random()-.25,0,1))},updateGauges:function(){this.gaugeValues.splice(0,1,53.6+40*Math.random()),this.gaugeValues.splice(1,1,1e3+4e3*Math.random())},toggleLamp:function(t){t.enabled=!t.enabled}},mounted:function(){this.intervals.push(setInterval(this.updateValues.bind(this),250)),this.intervals.push(setInterval(this.updateGauges.bind(this),2e3))},beforeDestroy:function(){this.intervals.forEach(clearInterval)},components:{SevenSegmentDisplay:s.a,SteppedBar:i.a,Lamp:c.a,Gauge:d.a,VerticalSlider:m.a}}},function(t,e,a){"use strict";function n(t,e,a){function n(t){return void 0!==t}function r(t){return"function"==typeof t}function i(t){for(var e=t[R];t=t.offsetParent;)e+=t[R];return e}function o(t,e,a){e.addEventListener?e.addEventListener(t,a,!1):e.attachEvent?e.attachEvent("on"+t,a):e["on"+t]=a}function s(t,e,a){e.removeEventListener?e.removeEventListener(t,a):e.detachEvent?e.detachEvent("on"+t,a):e["on"+t]=null}function l(t,e){e.classList?e.classList.add(t):e.className+=" "+t}function c(t,e,a){return t<e?e:t>a?a:t}function u(t){return t.preventDefault&&t.preventDefault(),!1}function d(){x=y[M],C=i(y),w=b[M]}function f(a){return d(),_=!0,g(a),o("touchmove",h,m),o("mousemove",h,m),r(e.start)&&e.start(S,t,a),u(a)}function m(t){return g(t),u(t)}function p(a){return _=!1,s("touchmove",h,m),s("mousemove",h,m),r(e.stop)&&e.stop(S,t,a),u(a)}function g(a){a=a||v.event;var n=a.touches?a.touches[0][P]:a[P],i=c(n-C,0,x),o=c((n-C)/x,0,1);n||(n=a[O]+h.body[E]+h.documentElement[E]),_&&(b.style[k]=i-w/2+"px",S=o,r(e.drag)&&e.drag(S,t,a))}e=e||{};var v=window,h=document,y=h.createElement("div"),b=h.createElement("span"),_=!1,x=0,w=0,C=0,S=0,a=a||e.vertical||!1,M=a?"offsetHeight":"offsetWidth",k=a?"top":"left",P=a?"pageY":"pageX",R=a?"offsetTop":"offsetLeft",O=a?"clientY":"clientX",E=a?"scrollTop":"scrollLeft";return l("range-slider",t),l("range-slider-"+(a?"vertical":"horizontal"),t),l("range-slider-track",y),l("dragger",b),r(e)&&(e={drag:e}),o("touchstart",y,f),o("mousedown",y,f),o("touchend",h,p),o("mouseup",h,p),o("resize",v,function(t){d(),_=!1,b.style[k]=S*x-w/2+"px"}),y.appendChild(b),t.appendChild(y),d(),function(){S=c(n(e.value)?e.value:0,0,1),b.style[k]=S*x-w/2+"px",r(e.create)&&e.create(S,t),r(e.drag)&&e.drag(S,t)}(),t}e.a=n},function(t,e,a){"use strict";e.a={ranges:{reactor:{heat:[{from:-1/0,to:1e3,id:"cold",color:"blue"},{from:1e3,to:2e3,id:"normal",color:"green"},{from:2e3,to:4e3,id:"warning",color:"orange"},{from:4e3,to:1/0,id:"critical",color:"red"}]},"energy-distributor":{},"energy-converter":{},"reactor-cooling":{powerConsumed:[],powerSatisfaction:[{from:-1/0,to:.25,id:"critical",color:"red"},{from:.25,to:.75,id:"warning",color:"orange"},{from:.75,to:1/0,id:"normal",color:"green"}]},distributor:{heat:[{from:-1/0,to:50,id:"normal",color:"green"},{from:50,to:150,id:"warning",color:"orange"},{from:150,to:1/0,id:"critical",color:"red"}]},core:{powerSatisfaction:[{from:-1/0,to:.25,id:"critical",color:"red"},{from:.25,to:.75,id:"warning",color:"orange"},{from:.75,to:1/0,id:"normal",color:"green"}]},base:{powerSatisfaction:[{from:-1/0,to:.25,id:"critical",color:"red"},{from:.25,to:.75,id:"warning",color:"orange"},{from:.75,to:1/0,id:"normal",color:"green"}]}},input:{"storage-matter":{releasedMatterPerTick:{min:0,max:500}},"storage-antimatter":{releasedAntimatterPerTick:{min:0,max:500}},"energy-distributor":{converterWeight:{min:0,max:1},capacitorWeight:{min:0,max:1},coreWeight:{min:0,max:1}},"energy-converter":{energyConversion:{min:0,max:100}},"reactor-cooling":{cooling:{min:0,max:200}},"pump-a":{enabled:{min:0,max:1}},"pump-b":{enabled:{min:0,max:1}},"pump-c":{enabled:{min:0,max:1}}}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(12),r=a(27),i=a.n(r),o=a(26);n.a.config.productionTip=!1,new n.a({el:"#app",router:o.a,render:function(t){return t(i.a)}})},function(t,e,a){"use strict";function n(t){return{enabled:{editable:!0,min:0,max:1},filterHealth:{statusRanges:[{from:-1/0,to:function(e){return.25*e[t].filterMaxHealth},id:f.Critical,color:"red"},{from:function(e){return.25*e[t].filterMaxHealth},to:function(e){return.75*e[t].filterMaxHealth},id:f.Warning,color:"orange"},{from:function(e){return.75*e[t].filterMaxHealth},to:1/0,id:f.Normal,color:"green"}]}}}function r(t,e,n,r,i,o){var s=u()(m,e[r]||{});if(e[r]=s,s.stateMachine=n,s.property=r,void 0===i){if("function"!=typeof s.value)throw new Error("Invalid custom state machine property "+s.stateMachine+"."+s.property+": "+s.value);s.value=s.value(s,o)}else s.value=i;"number"==typeof s.min&&"number"==typeof s.max&&(s.normalizedValue=a.i(d.c)(s.value,s.min,s.max)),s.statusRanges&&(s.status=s.statusRanges.find(function(t){return s.value>=t.from&&s.value<=t.to})||{})}function i(t,e,a,n,i){l()(a).forEach(function(o){r(e,a,t,o,i[o],n)})}function o(t){var e=u()({},t,{clone:!0});return e.stateMachines=u()(e.stateMachines,p,{clone:!0}),l()(t.stateMachines).forEach(function(a){e.stateMachines[a]&&i(a,e.stateMachines,e.stateMachines[a],t.stateMachines,t.stateMachines[a])}),console.log(e),e}e.a=o;var s=a(14),l=a.n(s),c=a(9),u=a.n(c),d=a(2),f={Normal:"normal",Cold:"cold",Warning:"warning",Critical:"critical"},m={stateMachine:null,property:null,value:null,normalizedValue:null,editable:!1,min:null,max:null,status:null,statusRanges:[]},p={"storage-matter":{matter:{statusRanges:[{from:-1/0,to:function(t){return 3600*t["storage-matter"].releasedMatterPerTick},id:f.Critical,color:"red"},{from:function(t){return 3600*t["storage-matter"].releasedMatterPerTick},to:function(t){return 43200*t["storage-matter"].releasedMatterPerTick},id:f.Warning,color:"orange"},{from:function(t){return 43200*t["storage-matter"].releasedMatterPerTick},to:1/0,id:f.Normal,color:"green"}]},releasedMatterPerTick:{editable:!0,min:0,max:500}},"storage-antimatter":{antimatter:{statusRanges:[{from:-1/0,to:function(t){return 3600*t["storage-antimatter"].releasedAntimatterPerTick},id:f.Critical,color:"red"},{from:function(t){return 3600*t["storage-antimatter"].releasedAntimatterPerTick},to:function(t){return 43200*t["storage-antimatter"].releasedAntimatterPerTick},id:f.Warning,color:"orange"},{from:function(t){return 43200*t["storage-antimatter"].releasedAntimatterPerTick},to:1/0,id:f.Normal,color:"green"}]},releasedAntimatterPerTick:{editable:!0,min:0,max:500}},reactor:{shutdownRemaining:{statusRanges:[{from:-1/0,to:0,id:f.Normal,color:"green"},{from:1,to:1/0,id:f.Critical,color:"red"}]},heat:{statusRanges:[{from:-1/0,to:1e3,id:f.Cold,color:"blue"},{from:1e3,to:2e3,id:f.Normal,color:"green"},{from:2e3,to:4e3,id:f.Warning,color:"orange"},{from:4e3,to:1/0,id:f.Critical,color:"red"}]}},"energy-distributor":{unusedEnergy:{statusRanges:[{from:-1/0,to:0,id:f.Normal,color:"green"},{from:0,to:55,id:f.Warning,color:"orange"},{from:55,to:1/0,id:f.Critical,color:"red"}]},converterWeight:{editable:!0,min:0,max:1},capacitorWeight:{editable:!0,min:0,max:1},coreWeight:{editable:!0,min:0,max:1}},"energy-capacitor":{energy:{statusRanges:[{from:-1/0,to:9e4,id:f.Critical,color:"red"},{from:9e4,to:18e4,id:f.Warning,color:"orange"},{from:18e4,to:1/0,id:f.Normal,color:"green"}]}},"energy-converter":{energyConversion:{editable:!0,min:0,max:100},energy:{statusRanges:[{from:-1/0,to:0,id:f.Critical,color:"red"},{from:0,to:function(t){return 1*t["energy-converter"].energyConversion*.95},id:f.Warning,color:"orange"},{from:function(t){return 1*t["energy-converter"].energyConversion*.95},to:function(t){return 1*t["energy-converter"].energyConversion},id:f.Normal,color:"green"}]}},"power-distributor":{wastedPower:{statusRanges:[{from:-1/0,to:0,id:f.Normal,color:"green"},{from:0,to:1/0,id:f.Warning,color:"orange"}]},heat:{statusRanges:[{from:-1/0,to:10,id:f.Cold,color:"blue"},{from:10,to:30,id:f.Normal,color:"green"},{from:30,to:150,id:f.Warning,color:"orange"},{from:150,to:1/0,id:f.Critical,color:"red"}]},shutdownRemaining:{statusRanges:[{from:-1/0,to:0,id:f.Normal,color:"green"},{from:1,to:1/0,id:f.Critical,color:"red"}]}},"reactor-cooling":{cooling:{editable:!0,min:0,max:200},powerConsumed:{value:function(t,e){return e["reactor-cooling"].powerRequired*e["reactor-cooling"].powerSatisfaction}},powerSatisfaction:{min:0,max:1,statusRanges:[{from:-1/0,to:.75,id:f.Critical,color:"red"},{from:.75,to:.95,id:f.Warning,color:"orange"},{from:.95,to:1/0,id:f.Normal,color:"green"}]},waterSatisfaction:{min:0,max:1,statusRanges:[{from:-1/0,to:.75,id:f.Critical,color:"red"},{from:.75,to:.95,id:f.Warning,color:"orange"},{from:.95,to:1/0,id:f.Normal,color:"green"}]}},core:{energySatisfaction:{min:0,max:1,statusRanges:[{from:-1/0,to:.25,id:f.Critical,color:"red"},{from:.25,to:.75,id:f.Warning,color:"orange"},{from:.75,to:1/0,id:f.Normal,color:"green"}]}},base:{powerConsumed:{value:function(t,e){return e.base.powerRequired*e.base.powerSatisfaction}},powerSatisfaction:{min:0,max:1,statusRanges:[{from:-1/0,to:.5,id:f.Critical,color:"red"},{from:.5,to:.9,id:f.Warning,color:"orange"},{from:.9,to:1/0,id:f.Normal,color:"green"}]},drinkingWaterConsumed:{value:function(t,e){return e.base.drinkingWaterRequired*e.base.drinkingWaterSatisfaction}},drinkingWaterSatisfaction:{min:0,max:1,statusRanges:[{from:-1/0,to:.5,id:f.Warning,color:"red"},{from:.5,to:.9,id:f.Warning,color:"orange"},{from:.9,to:1/0,id:f.Normal,color:"green"}]}},"pump-a":n("pump-a"),"pump-b":n("pump-b"),"pump-c":n("pump-c"),"water-tank":{water:{statusRanges:[{from:-1/0,to:5e3,id:f.Critical,color:"red"},{from:5e3,to:25e3,id:f.Warning,color:"orange"},{from:25e3,to:1/0,id:f.Normal,color:"green"}]}},"water-treatment":{resourceCleaner:{statusRanges:[{from:-1/0,to:3600,id:f.Critical,color:"red"},{from:3600,to:43200,id:f.Warning,color:"orange"},{from:43200,to:1/0,id:f.Normal,color:"green"}]},resourceChlorine:{statusRanges:[{from:-1/0,to:3600,id:f.Critical,color:"red"},{from:3600,to:43200,id:f.Warning,color:"orange"},{from:43200,to:1/0,id:f.Normal,color:"green"}]},resourceMinerals:{statusRanges:[{from:-1/0,to:3600,id:f.Critical,color:"red"},{from:3600,to:43200,id:f.Warning,color:"orange"},{from:43200,to:1/0,id:f.Normal,color:"green"}]},powerSatisfaction:{min:0,max:1,statusRanges:[{from:-1/0,to:.5,id:f.Critical,color:"red"},{from:.5,to:.9,id:f.Warning,color:"orange"},{from:.9,to:1/0,id:f.Normal,color:"green"}]},drinkingWater:{min:0,max:1e3,statusRanges:[{from:-1/0,to:250,id:f.Critical,color:"red"},{from:250,to:750,id:f.Warning,color:"orange"},{from:750,to:1/0,id:f.Normal,color:"green"}]}}}},,,,,,,,,,,,,,,,,,,,,,,,,,,,,function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){},,function(t,e,a){var n=a(0)(a(29),a(114),null,null);t.exports=n.exports},function(t,e,a){a(85);var n=a(0)(a(33),a(113),"data-v-c9ef275e",null);t.exports=n.exports},function(t,e,a){a(78);var n=a(0)(a(36),a(102),"data-v-1a4364f0",null);t.exports=n.exports},function(t,e,a){a(80);var n=a(0)(a(37),a(106),"data-v-646007f6",null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(38),a(108),null,null);t.exports=n.exports},function(t,e,a){a(81);var n=a(0)(a(39),a(107),null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(40),a(105),null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(41),a(104),null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(42),a(99),null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(43),a(112),null,null);t.exports=n.exports},function(t,e,a){var n=a(0)(a(44),a(100),null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"10%"}},[t._v("\n            A\n            "),a("stepped-bar",{attrs:{steps:25,value:t.values[0],color:"orange"}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[0],digits:3,decimals:1}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%"}},[t._v("\n            B\n            "),a("stepped-bar",{attrs:{steps:15,max:99,value:t.values[1]}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[1],digits:2,decimals:0,color:"green"}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[1],digits:3,decimals:1,color:"red"}}),t._v(" "),a("stepped-bar",{attrs:{steps:7,value:t.values[0],color:"orange"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"12%"}},[t._v("\n            C\n            "),a("stepped-bar",{attrs:{steps:10,max:10,value:t.values[2],color:"red"}}),t._v(" "),a("seven-segment-display",{attrs:{value:t.values[2],digits:4,decimals:2,color:"red"}}),t._v(" "),a("stepped-bar",{attrs:{steps:14,max:99,value:t.values[1],color:"red"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"5%"}},[t._v("\n            D\n            "),a("stepped-bar",{attrs:{steps:10,max:1,value:t.values[3],color:"red"}}),t._v(" "),a("div",{staticStyle:{"font-size":"0.5em"}},[a("seven-segment-display",{attrs:{value:t.values[3],digits:3,decimals:2,color:"red"}})],1),t._v(" "),a("div",{staticClass:"block-group",staticStyle:{"font-size":"0.25em"}},[a("seven-segment-display",{staticClass:"block",staticStyle:{width:"50%"},attrs:{value:t.values[3],digits:3,decimals:2,color:"green"}}),t._v(" "),a("seven-segment-display",{staticClass:"block",staticStyle:{width:"50%"},attrs:{value:t.values[3],digits:3,decimals:2,color:"orange"}})],1),t._v(" "),a("lamp",{attrs:{color:"orange",enabled:!0,flash:!0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%"}},[t._v("\n            E\n            "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"50%"}},[t._v("\n                    Ist\n                    "),a("stepped-bar",{attrs:{value:t.sliderValue,steps:10,min:100,max:0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"50%"}},[t._v("\n                    Soll\n                    "),a("vertical-slider",{staticStyle:{height:"180px"},attrs:{value:t.sliderValue},on:{update:function(e){t.sliderValue=e}}})],1)])]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%"}},[t._v("\n            F\n            "),a("seven-segment-display",{attrs:{value:"-E-",digits:3,color:"red"}}),t._v(" "),a("seven-segment-display",{attrs:{value:"EEEEEEEEE",digits:3,color:"green"}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"8%",height:"300px"}},[t._v("\n            G\n            "),a("gauge",{attrs:{type:"linear",value:t.gaugeValues[0],options:{tickSide:"left",needleSide:"left",numberSide:"left",units:"°C",valueInt:2,valueDec:1,valueBox:!1,borders:!1,colorPlate:"transparent",title:"Kühlwasser",colorTitle:"black",colorUnits:"black",colorNumbers:"black",colorNeedle:"black",colorNeedleEnd:"black",colorBarProgress:"#ff5454",colorBarProgressEnd:"#0063c7",fontNumbersSize:40,fontTitleSize:40,fontUnitsSize:50,fontValueSize:40,fontTitleWeight:"bold",majorTicks:[0,25,50,75,100],minorTicks:1,highlights:[{from:0,to:50,color:"green"},{from:50,to:75,color:"orange"},{from:75,to:100,color:"red"}],animationRule:"dequad",animatedValue:!0}}})],1)]),t._v(" "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block"},[a("div",{staticClass:"danger-strip",staticStyle:{width:"200px",height:"20px"}}),t._v(" "),a("div",{staticStyle:{height:"50px"}},t._l(t.lamps,function(e){return a("span",{key:e.id,on:{click:function(a){t.toggleLamp(e)}}},[a("lamp",{attrs:{color:e.color,enabled:e.enabled,flash:e.flashing}})],1)})),t._v(" "),a("div",{staticClass:"warning-strip",staticStyle:{width:"200px",height:"20px"}})]),t._v(" "),a("div",{staticClass:"block"},[a("gauge",{attrs:{type:"radial",value:t.gaugeValues[1],options:{units:"RPM",minValue:0,maxValue:6e3,animationRule:"dequad"}}})],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"lamp"},[a("div",{staticClass:"inactive",class:[t.color]}),t._v(" "),a("div",{staticClass:"active",class:[{enabled:t.enabled,flash:t.flash},t.color]})])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("section",{staticClass:"content"},[a("p",[a("span",{staticStyle:{display:"inline-block",width:"100px"}},[t._v("\n                Tick: "+t._s(t.state.tick)+"\n            ")]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[a("button",{attrs:{disabled:!t.simulationRunning},on:{click:t.stopSimulation}},[t._v("Pause")]),t._v(" "),a("button",{attrs:{disabled:t.simulationRunning},on:{click:t.startSimulation}},[t._v("Resume")]),t._v(" "),a("button",{on:{click:t.stepSimulation}},[t._v("Step")])]),t._v(" "),a("span",{staticStyle:{"margin-right":"20px"}},[a("button",{on:{click:t.resetSimulation}},[t._v("Reset")])])]),t._v(" "),a("canvas",{attrs:{id:"connections-canvas",width:"984",height:"1280"}}),t._v(" "),a("div",{staticClass:"state-machines"},t._l(t.display.stateMachines,function(e){return a("state-machine",{key:e.id,attrs:{id:e.id,state:t.state.stateMachines[e.id],definition:t.program.stateMachines.find(function(t){return t.id===e.id}),position:e.position,targets:e.targets},on:{update:function(a,n){return t.stateMachineChanged(e.id,a,n)}}})}))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("router-view")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("div",{staticClass:"block-group"},[a("div",{staticClass:"block",staticStyle:{width:"40%"}},[a("temperature-display",{staticStyle:{width:"100%"},attrs:{state:t.state,stateMachine:"reactor",property:"heat",label:"reactor"}},[t.state.reactor.shutdownRemaining.value?a("span",{slot:"status"},[t._v("(offline)")]):t._e()]),t._v(" "),a("temperature-display",{staticStyle:{width:"100%"},attrs:{state:t.state,stateMachine:"power-distributor",property:"heat",label:"distributor"}},[t.state["power-distributor"].shutdownRemaining.value?a("span",{slot:"status"},[t._v("(offline)")]):t._e()])],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"20%"}},[a("power-consumption-display",{staticStyle:{width:"100%"},attrs:{state:t.state,stateMachine:"reactor-cooling",label:"cooling"}}),t._v(" "),a("power-consumption-display",{staticStyle:{width:"100%"},attrs:{state:t.state,stateMachine:"core",consumptionProperty:"energyConsumed",satisfactionProperty:"energySatisfaction",label:"core"}}),t._v(" "),a("power-consumption-display",{staticStyle:{width:"100%"},attrs:{state:t.state,stateMachine:"base",label:"base"}})],1)])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"state-machine",style:t.style,attrs:{id:"state-machine-"+t.id}},[a("div",[a("strong",[t._v(t._s(t.id))])]),t._v(" "),t.stateProperties?a("ul",t._l(t.stateProperties,function(e){return a("li",[t._v("\n            "+t._s(e)+": "+t._s(Math.round(10*t.state[e])/10)+"\n        ")])})):t._e(),t._v(" "),t.editableProperties?a("ul",t._l(t.editableProperties,function(e){return a("li",[t._v("\n            "+t._s(e)+":\n            "),a("input",{attrs:{type:"number",step:"1",min:t.limits.input[t.id][e].min,max:t.limits.input[t.id][e].max},domProps:{value:t.state[e]},on:{input:function(a){t.update(e,a.target.value)}}})])})):t._e(),t._v(" "),t.outputProperties?a("ul",t._l(t.outputProperties,function(e){return a("li",[t._v("\n            "+t._s(e)+": "+t._s(Math.round(10*t.state[e])/10)+"\n        ")])})):t._e()])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("nav",[a("div",{staticClass:"block-group"},t._l(t.navigation,function(e){return a("div",{key:e.text,staticClass:"block nav-item-wrapper",style:{width:100/t.navigation.length+"%"}},[a("router-link",{staticClass:"nav-item",attrs:{tag:"a",to:e.to}},[t._v("\n                    "+t._s(e.text)+"\n                ")])],1)}))]),t._v(" "),a("section",{staticClass:"content"},[a("router-view",{attrs:{state:t.state.stateMachines},on:{changeProperty:t.changeProperty,changeState:t.changeState}})],1),t._v(" "),a("div",{staticClass:"warning-strip"},[t._v(" ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("section",[a("p",[t._v("\n        reactor:\n        "),t.state.reactor.shutdownRemaining.value?a("span",[t._v("offline")]):a("span",[t._v("online ("+t._s(Math.round(t.state.reactor.heat.value))+"°C)")])]),t._v(" "),a("p",[t._v("\n        ai core:\n        "),"normal"===t.state.core.energySatisfaction.status.id?a("span",[t._v("active")]):"warning"===t.state.core.energySatisfaction.status.id?a("span",[t._v("active, not enough energy")]):a("span",[t._v("offline")])]),t._v(" "),a("div",{staticClass:"block-group"},[a("div",{staticClass:"block block-group",staticStyle:{width:"25%"}},[a("div",{staticClass:"block"},[t._v("\n                matter: "+t._s(Math.round(t.state["storage-matter"].releasedMatterPerTick.value))+"\n                "),a("slider",{attrs:{vertical:!1,value:t.state["storage-matter"].releasedMatterPerTick.normalizedValue},on:{update:function(e){return t.changeProperty("storage-matter","releasedMatterPerTick",e)}}})],1),t._v(" "),a("div",{staticClass:"block"},[t._v("\n                antimatter: "+t._s(Math.round(t.state["storage-antimatter"].releasedAntimatterPerTick.value))+"\n                "),a("slider",{attrs:{vertical:!1,value:t.state["storage-antimatter"].releasedAntimatterPerTick.normalizedValue},on:{update:function(e){return t.changeProperty("storage-antimatter","releasedAntimatterPerTick",e)}}})],1)]),t._v(" "),a("div",{staticClass:"block block-group",staticStyle:{width:"25%"}},[a("div",{staticClass:"block"},[t._v("\n                cooling: "+t._s(Math.round(t.state["reactor-cooling"].effectiveCooling.value))+"/"+t._s(Math.round(t.state["reactor-cooling"].cooling.value))+"\n                "),a("slider",{attrs:{vertical:!1,value:t.state["reactor-cooling"].cooling.normalizedValue},on:{update:function(e){return t.changeProperty("reactor-cooling","cooling",e)}}})],1)])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block-group power-consumption-display"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[t._v("\n        "+t._s(t.label)+"\n    ")]),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"60%"}},[a("seven-segment-display",{attrs:{value:t.state[t.stateMachine][t.consumptionProperty].value,color:t.state[t.stateMachine][t.satisfactionProperty].status.color,digits:4,decimals:1}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"10%"}},[t._v("\n        kWh\n    ")])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"segment-display"},[a("div",{staticClass:"background",attrs:{"data-content":t.backgroundDigits}}),t._v(" "),a("div",{staticClass:"value",class:[t.color]},[t._v(t._s(t.formattedValue))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("section")},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"stepped-bar"},[a("div",{staticClass:"steps"},t._l(t.steps,function(e){return a("div",{staticClass:"step"},[a("div",{staticClass:"state",class:[{active:t.steps-e<t.valueToSteps},t.color]})])}))])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("canvas",{staticClass:"canvas-gauges"})},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"block-group temperature-display"},[a("div",{staticClass:"block",staticStyle:{width:"30%"}},[t._v("\n        "+t._s(t.label)+"\n        "),t._t("status")],2),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"35%"}},[a("seven-segment-display",{attrs:{value:Math.round(t.state[t.stateMachine][t.property].value),color:t.state[t.stateMachine][t.property].status.color,digits:4,decimals:0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"15%"}},[a("seven-segment-display",{attrs:{value:"°C",color:t.state[t.stateMachine][t.property].status.color,digits:2,decimals:0}})],1),t._v(" "),a("div",{staticClass:"block",staticStyle:{width:"20%"}},[a("lamp",{attrs:{enabled:"critical"===t.state[t.stateMachine][t.property].status.id,color:"red",flash:!0}})],1)])},staticRenderFns:[]}}],[47]);
//# sourceMappingURL=app.89d4b6d81e7316800283.js.map