(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{55:function(e,a,t){e.exports=t(82)},82:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(18),l=t.n(o),c=t(20),i="INITIAL_LOAD",u="ADD_NIFTY_INDEX",s="ADD_ERROR",m=t(17),p=t.n(m),d=t(16),g=t(32),v=t(24),f=t.n(v),h={get:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:6e4;return new Promise(function(n,r){f.a.get(e).set({accept:"application/json"}).timeout(t).query(a).end(function(e,a){if(e||!a.ok){var t=a&&a.body?a.body.message||a.body:e.message||e;r(t)}else n(a.body)})})},put:function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:6e4;return new Promise(function(n,r){f.a.put(e).send(a).set({accept:"application/json"}).timeout(t).end(function(e,a){if(e||!a.ok){var t=a&&a.body?a.body.message||a.body:e.message||e;r(t)}else n(a.body)})})},post:function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:6e4,r={accept:"application/json"},o=Object(g.a)({},r,t);return new Promise(function(t,r){f.a.post(e).send(a).set(o).timeout(n).end(function(e,a){if(e||!a.ok){var n=a&&a.body?a.body.message||a.body:e.message||e;r(n)}else t(a.body)})})},patch:function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:6e4,r={accept:"application/json"},o=Object(g.a)({},r,t);return new Promise(function(t,r){f.a.patch(e).send(a).set(o).timeout(n).end(function(e,a){if(e||!a.ok){var n=a&&a.body?a.body.message||a.body:e.message||e;r(n)}else t(a.body)})})},delete:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:6e4,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},r={accept:"application/json"},o=Object(g.a)({},r,a);return new Promise(function(a,r){f.a.del(e).set(o).timeout(t).send(n).end(function(e,t){if(e||!t.ok){var n=t&&t.body?t.body.message||t.body:e.message||e;r(n)}else a(t.body)})})}},b={fetchNiftyIndices:function(){var e=new Date,a=parseInt(e.getTime()/1e3).toFixed(0),t=new Date(e.getFullYear()-1,e.getMonth()+1,e.getDate()),n=parseInt(t.getTime()/1e3).toFixed(0);return h.get("https://finnhub.io/api/v1/stock/candle?symbol=NIFTY.NS&resolution=D&from=".concat(n,"&to=").concat(a,"&token=bq0b7tvrh5rddd65fppg")).then(function(e){return{response:e}}).catch(function(e){return{error:e}})}},E=p.a.mark(j),y=p.a.mark(I),w=p.a.mark(N),F=p.a.mark(O),x=function(e){var a=""+(e.getMonth()+1),t=""+e.getDate(),n=e.getFullYear();return a.length<2&&(a="0"+a),t.length<2&&(t="0"+t),[n,a,t].join("-")},k=function(e){for(var a=[],t=0;t<e.t.length;t++){var n=new Date(1e3*e.t[t]);a.push([x(n),{open:e.o[t],high:e.h[t],close:e.c[t],low:e.l[t]}])}return a};function j(){var e,a,t,n,r;return p.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,Object(d.b)(b.fetchNiftyIndices);case 2:if(e=o.sent,a=e.response,t=e.error,!a){o.next=13;break}return n=k(a),r=x(new Date),localStorage.setItem(r,JSON.stringify(n)),o.next=11,Object(d.c)({type:u,payload:n});case 11:o.next=15;break;case 13:return o.next=15,Object(d.c)({type:s,payload:t});case 15:case"end":return o.stop()}},E)}function I(){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.b)(j);case 2:case"end":return e.stop()}},y)}function N(){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.d)(i,I);case 2:return e.t0=e.sent,e.next=5,[e.t0];case 5:case"end":return e.stop()}},w)}function O(){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.a)([N()]);case 2:case"end":return e.stop()}},F)}var B=t(14),S={},D=Object(B.c)({nifty:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case u:case s:return a.payload;default:return e}}}),R=t(49),C=(t(71),t(46)),T=t(116),P=t(120),L=t(48),H=t.n(L),z=t(115),W=t(119),A=t(117),M=t(85),Y=t(47),J=t(118),_=t(114),G=t(113),V=t(84),q=t(110),X=t(112),$=t(111),K=t(109),Q=t(7),U=t(108),Z=Object(Y.a)({table:{minWidth:700},headerStyle:{paddingLeft:10,paddingTop:10,paddingBottom:10,fontSize:30,color:"rgba(0, 0, 0, 0.54)"}}),ee=Object(Q.a)(function(e){return{head:{backgroundColor:"#3f51b5",color:e.palette.common.white,fontSize:25},body:{fontSize:20}}})(U.a),ae=Object(Q.a)(function(e){return{root:{"&:nth-of-type(odd)":{backgroundColor:e.palette.background.default}}}})(K.a),te=function(e){return[{name:"Open",value:parseFloat(e.open).toFixed(2)},{name:"High",value:parseFloat(e.high).toFixed(2)},{name:"Low",value:parseFloat(e.low).toFixed(2)},{name:"Close",value:parseFloat(e.close).toFixed(2)}]};function ne(){var e=Z(),a=Object(c.b)(function(e){return e.nifty}),t=a[a.length-1],n=te(t[1]),o=new Date(t[0]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.headerStyle},"Previous Range for ".concat(o.toDateString())," "),r.a.createElement(q.a,{className:e.table,"aria-label":"customized table"},r.a.createElement($.a,null,r.a.createElement(K.a,null,r.a.createElement(ee,null,"Reference Name"),r.a.createElement(ee,{align:"center"},"Value"))),r.a.createElement(X.a,null,n.map(function(e){return r.a.createElement(ae,{key:e.name},r.a.createElement(ee,{component:"th",scope:"row"},e.name),r.a.createElement(ee,{align:"center"},e.value))}))))}var re=function(e){var a=e.high,t=e.low,n=e.close,r=parseInt((a+t+n)/3),o=parseInt((a+t)/2),l=parseInt(2*r-o);if(o>l){var c=l;l=o,o=c}var i=parseInt(2*r-t),u=parseInt(r+a-t),s=parseInt(i+a-t),m=parseInt(s+u-i),p=parseInt(2*r-a),d=parseInt(r-(a-t)),g=parseInt(p-(a-t));return[{name:"Resistance 4",value:m},{name:"Resistance 3",value:s},{name:"Resistance 2",value:u},{name:"Resistance 1",value:i},{name:"Top Pivot",value:l},{name:"Cetral Pivot",value:r},{name:"Bottom Pivot",value:o},{name:"Support 1",value:p},{name:"Support 2",value:d},{name:"Support 3",value:g},{name:"Support 4",value:parseInt(g-(p-d))}]};function oe(){var e=Z(),a=Object(c.b)(function(e){return e.nifty}),t=a[a.length-1],n=re(t[1]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.headerStyle},"Pivot Range"),r.a.createElement(q.a,{className:e.table,"aria-label":"customized table"},r.a.createElement($.a,null,r.a.createElement(K.a,null,r.a.createElement(ee,null,"Reference Name"),r.a.createElement(ee,{align:"center"},"Value"))),r.a.createElement(X.a,null,n.map(function(e){return r.a.createElement(ae,{key:e.name},r.a.createElement(ee,{component:"th",scope:"row"},e.name),r.a.createElement(ee,{align:"center"},e.value))}))))}var le=function(e){var a=e.high,t=e.low,n=e.close,r=a-t,o=n+1.1*r/12,l=n+1.1*r/6,c=n+1.1*r/4,i=n+1.1*r/2,u=a/t*n,s=n-1.1*r/12,m=n-1.1*r/6,p=n-1.1*r/4,d=n-1.1*r/2,g=2*n-u;return[{name:"H5(Breakout Target)",value:parseFloat(u).toFixed(2)},{name:"H4(Bullish Breakout)",value:parseFloat(i).toFixed(2)},{name:"H3(Sell Reversal)",value:parseFloat(c).toFixed(2)},{name:"H2",value:parseFloat(l).toFixed(2)},{name:"H1",value:parseFloat(o).toFixed(2)},{name:"L1",value:parseFloat(s).toFixed(2)},{name:"L2",value:parseFloat(m).toFixed(2)},{name:"L3(Buy Reversal)",value:parseFloat(p).toFixed(2)},{name:"L4(Bearish Breakout)",value:parseFloat(d).toFixed(2)},{name:"L5(Breakout Target)",value:parseFloat(g).toFixed(2)}]};function ce(){var e=Z(),a=Object(c.b)(function(e){return e.nifty}),t=a[a.length-1],n=le(t[1]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:e.headerStyle},"Camarilla Range"),r.a.createElement(q.a,{className:e.table,"aria-label":"customized table"},r.a.createElement($.a,null,r.a.createElement(K.a,null,r.a.createElement(ee,null,"Reference Name"),r.a.createElement(ee,{align:"center"},"Value"))),r.a.createElement(X.a,null,n.map(function(e){return r.a.createElement(ae,{key:e.name},r.a.createElement(ee,{component:"th",scope:"row"},e.name),r.a.createElement(ee,{align:"center"},e.value))}))))}function ie(){return r.a.createElement(G.a,{component:V.a},r.a.createElement(ne,null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(oe,null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement(ce,null),r.a.createElement("br",null),r.a.createElement("br",null))}var ue=function(){return r.a.createElement(M.a,{variant:"body2",color:"textSecondary",align:"center"},"Copyright \xa9 ",r.a.createElement(_.a,{color:"inherit",href:"https://material-ui.com/"},"Flight Book")," ",(new Date).getFullYear(),".")},se=Object(Y.a)(function(e){return{icon:{marginRight:e.spacing(2)},heroContent:{backgroundColor:e.palette.background.paper,padding:e.spacing(8,0,6)},heroButtons:{marginTop:e.spacing(4)},cardGrid:{paddingTop:e.spacing(8),paddingBottom:e.spacing(8)},card:{height:"100%",display:"flex",flexDirection:"column"},cardMedia:{paddingTop:"56.25%"},cardContent:{flexGrow:1},footer:{backgroundColor:e.palette.background.paper,padding:e.spacing(6)}}});function me(){var e=se();return r.a.createElement(r.a.Fragment,null,r.a.createElement(z.a,null),r.a.createElement(T.a,{position:"relative"},r.a.createElement(A.a,null,r.a.createElement(H.a,{className:e.icon}),r.a.createElement(M.a,{variant:"h6",color:"inherit",noWrap:!0},"Flight Book"))),r.a.createElement("main",null,r.a.createElement("div",{className:e.heroContent},r.a.createElement(J.a,{maxWidth:"sm"},r.a.createElement(M.a,{component:"h1",variant:"h2",align:"center",color:"textPrimary",gutterBottom:!0},"Flight Book"),r.a.createElement(M.a,{variant:"h5",align:"center",color:"textSecondary",paragraph:!0},"Trading Manual using Secrets of Pivot Boss"),r.a.createElement("div",{className:e.heroButtons},r.a.createElement(W.a,{container:!0,spacing:2,justify:"center"},r.a.createElement(W.a,{item:!0},r.a.createElement(P.a,{variant:"contained",color:"primary"},"Choose Nifty Index")),r.a.createElement(W.a,{item:!0},r.a.createElement(P.a,{variant:"outlined",color:"primary"},"Choose Date")))))),r.a.createElement(J.a,{className:e.cardGrid,maxWidth:"md"},r.a.createElement(W.a,{container:!0,spacing:4},r.a.createElement(ie,null)))),r.a.createElement("footer",{className:e.footer},r.a.createElement(M.a,{variant:"h6",align:"center",gutterBottom:!0},"Flight Book"),r.a.createElement(M.a,{variant:"subtitle1",align:"center",color:"textSecondary",component:"p"},"Made with Heart by BelieveC"),r.a.createElement(ue,null)))}var pe=function(){var e=Object(R.a)(),a=[e],t=Object(B.e)(D,B.a.apply(void 0,a));e.run(O);var n=x(new Date),o=localStorage.getItem(n);return Object(C.isEmpty)(o)?t.dispatch({type:i}):t.dispatch({type:u,payload:JSON.parse(o)}),window.store=t,r.a.createElement(c.a,{store:t},r.a.createElement("div",{className:"App"},r.a.createElement(me,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(pe,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[55,1,2]]]);
//# sourceMappingURL=main.ce8dd887.chunk.js.map