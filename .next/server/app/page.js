(()=>{var e={};e.id=974,e.ids=[974],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4573:e=>{"use strict";e.exports=require("node:buffer")},8957:(e,t,r)=>{Promise.resolve().then(r.bind(r,79450)),Promise.resolve().then(r.bind(r,7161)),Promise.resolve().then(r.bind(r,93821)),Promise.resolve().then(r.bind(r,54976)),Promise.resolve().then(r.bind(r,50044))},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},15588:(e,t,r)=>{"use strict";r.d(t,{ThemeProvider:()=>o});var n=r(12907);let o=(0,n.registerClientReference)(function(){throw Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Muneer Ali Subzwari\\Desktop\\SheSync\\SheSync\\context\\ThemeContext.tsx","ThemeProvider");(0,n.registerClientReference)(function(){throw Error("Attempted to call useTheme() from the server but useTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Muneer Ali Subzwari\\Desktop\\SheSync\\SheSync\\context\\ThemeContext.tsx","useTheme")},16141:e=>{"use strict";e.exports=require("node:zlib")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19587:(e,t)=>{"use strict";function r(e){return e.split("/").map(e=>encodeURIComponent(e)).join("/")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"encodeURIPath",{enumerable:!0,get:function(){return r}})},19771:e=>{"use strict";e.exports=require("process")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33111:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,16444,23)),Promise.resolve().then(r.t.bind(r,16042,23)),Promise.resolve().then(r.t.bind(r,88170,23)),Promise.resolve().then(r.t.bind(r,49477,23)),Promise.resolve().then(r.t.bind(r,29345,23)),Promise.resolve().then(r.t.bind(r,12089,23)),Promise.resolve().then(r.t.bind(r,46577,23)),Promise.resolve().then(r.t.bind(r,31307,23))},33845:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d});var n=r(60687),o=r(49587),i=r.n(o),s=r(43210);let a=function(){let[e,t]=(0,s.useState)(0),[r,o]=(0,s.useState)(0),[i,a]=(0,s.useState)(!1),[l,d]=(0,s.useState)(!1),p=["\uD83C\uDF38","\uD83E\uDD8B","✨","\uD83C\uDF3A","\uD83D\uDC96","\uD83C\uDF19","\uD83C\uDF37","\uD83D\uDC95","\uD83C\uDF80","\uD83C\uDF39"];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(90deg); 
          }
        }
        
        @keyframes spin-slow {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }
        
        @keyframes spin-reverse {
          from { 
            transform: rotate(360deg); 
          }
          to { 
            transform: rotate(0deg); 
          }
        }
        
        @keyframes orbit-clockwise {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }
        
        @keyframes orbit-counter {
          from { 
            transform: rotate(360deg); 
          }
          to { 
            transform: rotate(0deg); 
          }
        }
        
        @keyframes fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(15px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(236, 72, 153, 0.5);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }
        
        .animate-orbit-clockwise {
          animation: orbit-clockwise 4s linear infinite;
        }
        
        .animate-orbit-counter {
          animation: orbit-counter 6s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 3s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 3s ease-out forwards;
        }

        @media (max-width: 640px) {
          .mobile-padding {
            padding: 20px;
          }
          .mobile-text-sm {
            font-size: 14px;
          }
          .mobile-text-base {
            font-size: 16px;
          }
          .mobile-text-lg {
            font-size: 18px;
          }
        }
        `}),(0,n.jsxs)("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",background:"linear-gradient(135deg, #fdf2f8 0%, #fce7f3 25%, #f3e8ff 50%, #fae8ff 75%, #fdf4ff 100%)",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",zIndex:9999},children:[(0,n.jsx)("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",overflow:"hidden",pointerEvents:"none"},children:[...Array(15)].map((e,t)=>(0,n.jsx)("div",{className:"animate-float",style:{position:"absolute",left:`${100*Math.random()}%`,top:`${100*Math.random()}%`,fontSize:"clamp(20px, 4vw, 28px)",opacity:.15,color:["#f472b6","#ec4899","#d946ef","#c084fc"][t%4],animationDelay:`${5*t}s`,animationDuration:`${10+6*Math.random()}s`},children:p[t%p.length]},t))}),l&&(0,n.jsx)("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none"},children:[...Array(20)].map((e,t)=>(0,n.jsx)("div",{className:"animate-sparkle",style:{position:"absolute",left:`${100*Math.random()}%`,top:`${100*Math.random()}%`,width:"6px",height:"6px",background:"#fbbf24",borderRadius:"50%",animationDelay:`${.1*t}s`}},t))}),(0,n.jsxs)("div",{className:"mobile-padding",style:{textAlign:"center",zIndex:10,padding:"clamp(16px, 4vw, 32px)",maxWidth:"min(800px, 90vw)",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh"},children:[(0,n.jsxs)("div",{style:{marginBottom:"clamp(32px, 6vh, 48px)"},children:[(0,n.jsx)("h1",{style:{fontSize:"clamp(48px, 12vw, 96px)",fontWeight:"bold",background:"linear-gradient(90deg, #ec4899, #f43f5e, #a855f7)",backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent",marginBottom:"16px",lineHeight:1.1},children:"SheSync"}),(0,n.jsx)("p",{style:{color:"#6b7280",fontSize:"clamp(16px, 3vw, 20px)",fontWeight:"500"},children:"Your Journey to Confident Cycles"})]}),(0,n.jsx)("div",{style:{marginBottom:"clamp(32px, 6vh, 48px)",position:"relative"},children:(0,n.jsxs)("div",{style:{width:"clamp(96px, 20vw, 160px)",height:"clamp(96px, 20vw, 160px)",margin:"0 auto",position:"relative"},children:[(0,n.jsx)("div",{className:"animate-spin-slow",style:{position:"absolute",top:0,left:0,right:0,bottom:0,border:"4px solid #fbcfe8",borderRadius:"50%"}}),(0,n.jsx)("div",{className:"animate-spin-reverse",style:{position:"absolute",top:"8px",left:"8px",right:"8px",bottom:"8px",border:"3px solid #f9a8d4",borderRadius:"50%"}}),(0,n.jsx)("div",{className:"animate-pulse",style:{position:"absolute",top:"clamp(16px, 4vw, 24px)",left:"clamp(16px, 4vw, 24px)",right:"clamp(16px, 4vw, 24px)",bottom:"clamp(16px, 4vw, 24px)",background:"linear-gradient(135deg, #f472b6, #f43f5e, #a855f7)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 10px 25px rgba(236, 72, 153, 0.3)"},children:(0,n.jsx)("div",{style:{color:"white",fontSize:"clamp(24px, 6vw, 40px)"},children:"\uD83C\uDF38"})})]})}),(0,n.jsx)("div",{style:{marginBottom:"clamp(32px, 6vh, 48px)",height:"clamp(48px, 8vh, 64px)",display:"flex",alignItems:"center",justifyContent:"center",width:"100%"},children:(0,n.jsx)("p",{className:"animate-fade-in",style:{fontSize:"clamp(16px, 3.5vw, 20px)",fontWeight:"500",color:"#374151",padding:"0 16px",textAlign:"center",maxWidth:"100%"},children:["✨ Embracing your natural rhythm","\uD83C\uDF38 Your cycle is your superpower","\uD83D\uDC96 Celebrating womanhood","\uD83E\uDD8B Syncing with your beautiful body","\uD83C\uDF3A Every cycle tells your story","\uD83D\uDC95 You're perfectly you","\uD83C\uDF19 Honoring your feminine energy","\uD83C\uDF37 Blooming with confidence"][e]},e)}),(0,n.jsxs)("div",{style:{width:"100%",maxWidth:"clamp(300px, 80vw, 500px)",margin:"0 auto 24px auto"},children:[(0,n.jsx)("div",{style:{width:"100%",height:"clamp(12px, 3vw, 16px)",backgroundColor:"#fbcfe8",borderRadius:"50px",overflow:"hidden",boxShadow:"inset 0 2px 4px rgba(0, 0, 0, 0.1)",position:"relative"},children:(0,n.jsx)("div",{style:{height:"100%",width:`${r}%`,background:"linear-gradient(90deg, #f472b6, #f43f5e, #a855f7)",borderRadius:"50px",position:"relative",overflow:"hidden",transition:"width 0.3s ease-out"},children:(0,n.jsx)("div",{className:"animate-shimmer",style:{position:"absolute",top:0,left:0,right:0,bottom:0,background:"linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",width:"100%"}})})}),(0,n.jsx)("p",{style:{fontSize:"clamp(12px, 2.5vw, 14px)",color:i?"#10b981":"#6b7280",marginTop:"8px",fontWeight:"500"},children:i?"\uD83C\uDF89 Ready to sync!":`${Math.round(r)}% Complete`})]}),i&&(0,n.jsxs)("div",{className:"animate-fade-in",style:{marginTop:"clamp(16px, 4vh, 32px)",textAlign:"center"},children:[(0,n.jsx)("p",{style:{fontSize:"clamp(18px, 4vw, 20px)",fontWeight:"600",color:"#ec4899",marginBottom:"16px"},children:"✨ Welcome to your journey! ✨"}),(0,n.jsx)("p",{style:{fontSize:"clamp(14px, 3vw, 16px)",color:"#6b7280"},children:"Redirecting to SheSync..."})]})]})]})]})},l=i()(async()=>{},{loadableGenerated:{modules:["app\\page.tsx -> @/components/Landing"]},loading:()=>(0,n.jsx)(a,{}),ssr:!1});function d(){return(0,n.jsx)(l,{})}},33873:e=>{"use strict";e.exports=require("path")},37067:e=>{"use strict";e.exports=require("node:http")},37830:e=>{"use strict";e.exports=require("node:stream/web")},44708:e=>{"use strict";e.exports=require("node:https")},44783:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,86346,23)),Promise.resolve().then(r.t.bind(r,27924,23)),Promise.resolve().then(r.t.bind(r,35656,23)),Promise.resolve().then(r.t.bind(r,40099,23)),Promise.resolve().then(r.t.bind(r,38243,23)),Promise.resolve().then(r.t.bind(r,28827,23)),Promise.resolve().then(r.t.bind(r,62763,23)),Promise.resolve().then(r.t.bind(r,97173,23))},47552:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>s.a,__next_app__:()=>u,pages:()=>p,routeModule:()=>c,tree:()=>d});var n=r(65239),o=r(48088),i=r(88170),s=r.n(i),a=r(30893),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let d=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,90597)),"C:\\Users\\Muneer Ali Subzwari\\Desktop\\SheSync\\SheSync\\app\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,58014)),"C:\\Users\\Muneer Ali Subzwari\\Desktop\\SheSync\\SheSync\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"]}],p=["C:\\Users\\Muneer Ali Subzwari\\Desktop\\SheSync\\SheSync\\app\\page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},c=new n.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},49587:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let n=r(59630)._(r(64963));function o(e,t){var r;let o={};"function"==typeof e&&(o.loader=e);let i={...o,...t};return(0,n.default)({...i,modules:null==(r=i.loadableGenerated)?void 0:r.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},51690:(e,t,r)=>{Promise.resolve().then(r.bind(r,90597))},55511:e=>{"use strict";e.exports=require("crypto")},56780:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return o}});let n=r(81208);function o(e){let{reason:t,children:r}=e;throw Object.defineProperty(new n.BailoutToCSRError(t),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0})}},57075:e=>{"use strict";e.exports=require("node:stream")},57975:e=>{"use strict";e.exports=require("node:util")},58014:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>d,metadata:()=>l});var n=r(37413),o=r(29604),i=r(61421),s=r.n(i),a=r(15588);r(82704);let l={title:"SheSync - Your Journey to Confident Cycles",description:"Empowering Women One Cycle at a Time"};function d({children:e}){return(0,n.jsx)(o.lJ,{publishableKey:"pk_test_ZXRoaWNhbC1nZWxkaW5nLTI5LmNsZXJrLmFjY291bnRzLmRldiQ",appearance:{elements:{formButtonPrimary:"bg-pink-600 hover:bg-pink-700 text-sm",card:"bg-white dark:bg-gray-800",headerTitle:"text-gray-900 dark:text-white",headerSubtitle:"text-gray-600 dark:text-gray-400",formFieldLabel:"text-gray-700 dark:text-gray-300",formFieldInput:"bg-white dark:bg-gray-700 text-gray-900 dark:text-white",footerActionLink:"text-pink-600 hover:text-pink-500 dark:text-pink-400 dark:hover:text-pink-300"}},children:(0,n.jsx)("html",{lang:"en",children:(0,n.jsx)("body",{className:s().className,children:(0,n.jsx)(a.ThemeProvider,{children:e})})})})}},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},64777:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadChunks",{enumerable:!0,get:function(){return a}});let n=r(60687),o=r(51215),i=r(29294),s=r(19587);function a(e){let{moduleIds:t}=e,r=i.workAsyncStorage.getStore();if(void 0===r)return null;let a=[];if(r.reactLoadableManifest&&t){let e=r.reactLoadableManifest;for(let r of t){if(!e[r])continue;let t=e[r].files;a.push(...t)}}return 0===a.length?null:(0,n.jsx)(n.Fragment,{children:a.map(e=>{let t=r.assetPrefix+"/_next/"+(0,s.encodeURIPath)(e);return e.endsWith(".css")?(0,n.jsx)("link",{precedence:"dynamic",href:t,rel:"stylesheet",as:"style"},e):((0,o.preload)(t,{as:"script",fetchPriority:"low"}),null)})})}},64963:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let n=r(60687),o=r(43210),i=r(56780),s=r(64777);function a(e){return{default:e&&"default"in e?e.default:e}}let l={loader:()=>Promise.resolve(a(()=>null)),loading:null,ssr:!0},d=function(e){let t={...l,...e},r=(0,o.lazy)(()=>t.loader().then(a)),d=t.loading;function p(e){let a=d?(0,n.jsx)(d,{isLoading:!0,pastDelay:!0,error:null}):null,l=!t.ssr||!!t.loading,p=l?o.Suspense:o.Fragment,u=t.ssr?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.PreloadChunks,{moduleIds:t.modules}),(0,n.jsx)(r,{...e})]}):(0,n.jsx)(i.BailoutToCSR,{reason:"next/dynamic",children:(0,n.jsx)(r,{...e})});return(0,n.jsx)(p,{...l?{fallback:a}:{},children:u})}return p.displayName="LoadableComponent",p}},73024:e=>{"use strict";e.exports=require("node:fs")},73136:e=>{"use strict";e.exports=require("node:url")},73566:e=>{"use strict";e.exports=require("worker_threads")},76760:e=>{"use strict";e.exports=require("node:path")},77030:e=>{"use strict";e.exports=require("node:net")},77598:e=>{"use strict";e.exports=require("node:crypto")},79428:e=>{"use strict";e.exports=require("buffer")},79450:(e,t,r)=>{"use strict";r.d(t,{D:()=>a,ThemeProvider:()=>s});var n=r(60687),o=r(43210);let i=(0,o.createContext)(void 0),s=({children:e})=>{let[t,r]=(0,o.useState)("light");return(0,o.useEffect)(()=>{r(localStorage.getItem("theme")||"light")},[]),(0,o.useEffect)(()=>{document.documentElement.classList.toggle("dark","dark"===t),localStorage.setItem("theme",t)},[t]),(0,n.jsx)(i.Provider,{value:{theme:t,toggleTheme:()=>{r(e=>"dark"===e?"light":"dark")}},children:e})},a=()=>{let e=(0,o.useContext)(i);if(void 0===e)throw Error("useTheme must be used within a ThemeProvider");return e}},81341:(e,t,r)=>{Promise.resolve().then(r.bind(r,15588)),Promise.resolve().then(r.bind(r,63441)),Promise.resolve().then(r.bind(r,7791)),Promise.resolve().then(r.bind(r,12918)),Promise.resolve().then(r.bind(r,62278))},82704:()=>{},90597:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});let n=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Muneer Ali Subzwari\\\\Desktop\\\\SheSync\\\\SheSync\\\\app\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Muneer Ali Subzwari\\Desktop\\SheSync\\SheSync\\app\\page.tsx","default")},91442:(e,t,r)=>{Promise.resolve().then(r.bind(r,33845))}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[134],()=>r(47552));module.exports=n})();