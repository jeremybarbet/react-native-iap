"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3998],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>m});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=n.createContext({}),c=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,p=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),u=c(r),m=o,f=u["".concat(p,".").concat(m)]||u[m]||l[m]||i;return r?n.createElement(f,a(a({ref:t},d),{},{components:r})):n.createElement(f,a({ref:t},d))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},8138:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>l,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var n=r(7462),o=(r(7294),r(3905));const i={},a="presentCodeRedemptionSheetIOS",s={unversionedId:"api-reference/methods/ios/present-code-redemption-sheet-ios",id:"api-reference/methods/ios/present-code-redemption-sheet-ios",title:"presentCodeRedemptionSheetIOS",description:"Displays a sheet that enables users to redeem subscription offer codes that you generated in App Store Connect.",source:"@site/docs/api-reference/methods/ios/present-code-redemption-sheet-ios.md",sourceDirName:"api-reference/methods/ios",slug:"/api-reference/methods/ios/present-code-redemption-sheet-ios",permalink:"/docs/api-reference/methods/ios/present-code-redemption-sheet-ios",draft:!1,editUrl:"https://github.com/dooboolab/react-native-iap/edit/main/docs/docs/api-reference/methods/ios/present-code-redemption-sheet-ios.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"getReceiptIOS",permalink:"/docs/api-reference/methods/ios/get-receipt-ios"},next:{title:"requestPurchaseWithOfferIOS",permalink:"/docs/api-reference/methods/ios/request-purchase-with-offer"}},p={},c=[{value:"Signature",id:"signature",level:2},{value:"Usage",id:"usage",level:2}],d={toc:c};function l(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},d,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"presentcoderedemptionsheetios"},(0,o.kt)("inlineCode",{parentName:"h1"},"presentCodeRedemptionSheetIOS")),(0,o.kt)("p",null,"Displays a sheet that enables users to redeem subscription offer codes that you generated in App Store Connect."),(0,o.kt)("p",null,"Availability: ",(0,o.kt)("inlineCode",{parentName:"p"},"iOS 14.0+")),(0,o.kt)("h2",{id:"signature"},"Signature"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"presentCodeRedemptionSheetIOS(): Promise<null>;\n")),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"import React from 'react';\nimport {Button} from 'react-native';\nimport {presentCodeRedemptionSheetIOS} from 'react-native-iap';\n\nconst App = () => {\n  const handleRedemption = async () => {\n    await presentCodeRedemptionSheetIOS();\n  }\n\n  return (\n    <Button title=\"Redeem\" onPress={handleRedemption} />\n  )\n}\n")))}l.isMDXComponent=!0}}]);