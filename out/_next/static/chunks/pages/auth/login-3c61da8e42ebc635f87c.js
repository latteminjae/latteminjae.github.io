(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[344],{8413:function(e,n,s){"use strict";s.r(n),s.d(n,{default:function(){return g}});var r=s(5893),i=s(7757),t=s.n(i),a=s(2137),c=s(2555),o=s(8874),l=s(8288),d=(s(7294),s(9501)),u=s(1163),h=s(6221),p=s(1664),m=s(1660),x=s(9163),f=(0,x.ZP)(d.GH).withConfig({displayName:"login__Wrap",componentId:"sc-1vfvi3v-0"})(["min-width:1200px;& > div{width:600px;height:850px;}"]),v=x.ZP.div.withConfig({displayName:"login__LeftBox",componentId:"sc-1vfvi3v-1"})(["display:flex;flex-direction:column;justify-content:space-between;padding:30px;box-sizing:border-box;"]),j=x.ZP.div.withConfig({displayName:"login__FormBox",componentId:"sc-1vfvi3v-2"})(["display:flex;flex-direction:column;align-items:center;"]);function g(){var e=(0,u.useRouter)(),n=function(){var n=(0,a.Z)(t().mark((function n(s){var r,i;return t().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.push("/main"),r={email:s.email,password:s.userPW},n.prev=2,n.next=5,h.o.post("/api/v1/auth/signin",r);case 5:if(n.sent.data.token){n.next=8;break}return n.abrupt("return");case 8:return n.next=10,h.o.get("/api/v1/auth/users");case 10:i=n.sent,console.log(i),n.next=19;break;case 15:n.prev=15,n.t0=n.catch(2),console.error(n.t0);case 19:case"end":return n.stop()}}),n,null,[[2,15]])})));return function(e){return n.apply(this,arguments)}}();return(0,r.jsxs)(f,{className:"h100vh",children:[(0,r.jsxs)(v,{children:[(0,r.jsx)(d.X2,{}),(0,r.jsx)(d.X2,{children:(0,r.jsx)(d.v4,{children:(0,r.jsx)(p.default,{href:"/auth/signup",children:"Create Account"})})}),(0,r.jsxs)(d.X2,{children:[(0,r.jsx)("p",{className:"fs46 fw700 mb30",children:"Login"}),(0,r.jsx)("p",{className:"fs16 mb70",children:"temporary text Company \uc124\uba85\uc774 \ub4e4\uc5b4\uac08.."}),(0,r.jsx)(c.l0,{onSubmit:n,render:function(e){return(0,r.jsx)(c.Wg,{children:(0,r.jsx)("fieldset",{className:"mb30",children:(0,r.jsxs)(j,{children:[(0,r.jsxs)(d.kC,{children:[(0,r.jsxs)("div",{children:[(0,r.jsx)(c.gN,{id:"email",name:"email",className:"fs16 w300 mb10",placeholder:"ID",component:d.U5,validator:m.Le,required:!0}),(0,r.jsx)(c.gN,{id:"userPW",name:"userPW",className:"fs16 w300 mb10",placeholder:"PW",type:"password",component:o.II,required:!0})]}),(0,r.jsx)(c.gN,{id:"saveCheck",name:"saveCheck",label:"Save",component:o.XZ,className:"ml20"})]}),(0,r.jsx)(d.GH,{className:"w300",children:(0,r.jsx)(l.zx,{primary:!0,className:"fs20 ",type:"submit",children:"Login"})})]})})})}}),(0,r.jsx)(p.default,{href:"/auth/find",children:"Forget you ID or password?"})]}),(0,r.jsx)(d.X2,{children:(0,r.jsx)(d.DK,{children:"@2020 PMS All rights reserved | Version 0.12"})})]}),(0,r.jsx)("div",{})]})}},4895:function(e,n,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/login",function(){return s(8413)}])}},function(e){e.O(0,[774,888,179],(function(){return n=4895,e(e.s=n);var n}));var n=e.O();_N_E=n}]);