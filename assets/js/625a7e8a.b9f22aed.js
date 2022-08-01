"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[732],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),l=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=l(e.components);return n.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=l(r),m=a,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},6729:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={sidebar_position:2},i="Retrieving available items",c={unversionedId:"usage_instructions/retrieve_available",id:"usage_instructions/retrieve_available",title:"Retrieving available items",description:"First thing you should do is to define your product IDs for iOS and Android separately like defined below.",source:"@site/docs/usage_instructions/retrieve_available.md",sourceDirName:"usage_instructions",slug:"/usage_instructions/retrieve_available",permalink:"/docs/usage_instructions/retrieve_available",editUrl:"https://github.com/dooboolab/react-native-iap/edit/main/docs/docs/usage_instructions/retrieve_available.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Lifecycle",permalink:"/docs/usage_instructions/connection_lifecycle"},next:{title:"Making a purchase",permalink:"/docs/usage_instructions/purchase"}},s=[],l={toc:s};function p(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},l,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"retrieving-available-items"},"Retrieving available items"),(0,a.kt)("p",null,"First thing you should do is to define your product IDs for iOS and Android separately like defined below."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import * as RNIap from 'react-native-iap';\n\nconst productIds = Platform.select({\n  ios: [\n    'com.example.coins100'\n  ],\n  android: [\n    'com.example.coins100'\n  ]\n});\n")),(0,a.kt)("p",null,"To get a list of valid items, call ",(0,a.kt)("inlineCode",{parentName:"p"},"getProducts()"),"."),(0,a.kt)("p",null,"You can do it in ",(0,a.kt)("inlineCode",{parentName:"p"},"componentDidMount()"),", or another area as appropriate for your app."),(0,a.kt)("p",null,"Since a user may first start your app with a bad internet connection, then later have an internet connection, making preparing/getting items more than once may be a good idea."),(0,a.kt)("p",null,"Like if the user has no IAPs available when the app first starts, you may want to check again when the user enters your IAP store."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"  async componentDidMount() {\n    try {\n      const products: Product[] = await RNIap.getProducts(productIds);\n      this.setState({ products });\n    } catch(err) {\n      console.warn(err); // standardized err.code and err.message available\n    }\n  }\n")),(0,a.kt)("p",null,"Each ",(0,a.kt)("inlineCode",{parentName:"p"},"product")," returns from ",(0,a.kt)("inlineCode",{parentName:"p"},"getProducts()")," contains a ",(0,a.kt)("a",{parentName:"p",href:"../api_reference/product"},"Product object"),"."))}p.isMDXComponent=!0}}]);