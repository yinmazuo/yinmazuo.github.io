!function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=t,n.c=r,n.i=function(t){return t},n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=72)}([function(t,n){var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,n,r){t.exports=!r(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var r={}.hasOwnProperty;t.exports=function(t,n){return r.call(t,n)}},function(t,n,r){var e=r(7),o=r(29),i=r(24),u=Object.defineProperty;n.f=r(1)?Object.defineProperty:function(t,n,r){if(e(t),n=i(n,!0),e(r),o)try{return u(t,n,r)}catch(t){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(t[n]=r.value),t}},function(t,n,r){var e=r(50),o=r(14);t.exports=function(t){return e(o(t))}},function(t,n,r){var e=r(3),o=r(12);t.exports=r(1)?function(t,n,r){return e.f(t,n,o(1,r))}:function(t,n,r){return t[n]=r,t}},function(t,n,r){var e=r(22)("wks"),o=r(13),i=r(0).Symbol,u="function"==typeof i,f=t.exports=function(t){return e[t]||(e[t]=u&&i[t]||(u?i:o)("Symbol."+t))};f.store=e},function(t,n,r){var e=r(10);t.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},function(t,n){var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,r){var e=r(34),o=r(15);t.exports=Object.keys||function(t){return e(t,o)}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){var r=0,e=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+e).toString(36))}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,r){var e=r(0),o=r(8),i=r(47),u=r(5),f="prototype",c=function(t,n,r){var a,s,l,p=t&c.F,y=t&c.G,v=t&c.S,d=t&c.P,h=t&c.B,b=t&c.W,g=y?o:o[n]||(o[n]={}),m=g[f],x=y?e:v?e[n]:(e[n]||{})[f];y&&(r=n);for(a in r)s=!p&&x&&void 0!==x[a],s&&a in g||(l=s?x[a]:r[a],g[a]=y&&"function"!=typeof x[a]?r[a]:h&&s?i(l,e):b&&x[a]==l?function(t){var n=function(n,r,e){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(n);case 2:return new t(n,r)}return new t(n,r,e)}return t.apply(this,arguments)};return n[f]=t[f],n}(l):d&&"function"==typeof l?i(Function.call,l):l,d&&((g.virtual||(g.virtual={}))[a]=l,t&c.R&&m&&!m[a]&&u(m,a,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,n){t.exports={}},function(t,n){t.exports=!0},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,r){var e=r(3).f,o=r(2),i=r(6)("toStringTag");t.exports=function(t,n,r){t&&!o(t=r?t:t.prototype,i)&&e(t,i,{configurable:!0,value:n})}},function(t,n,r){var e=r(22)("keys"),o=r(13);t.exports=function(t){return e[t]||(e[t]=o(t))}},function(t,n,r){var e=r(0),o="__core-js_shared__",i=e[o]||(e[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,n){var r=Math.ceil,e=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?e:r)(t)}},function(t,n,r){var e=r(10);t.exports=function(t,n){if(!e(t))return t;var r,o;if(n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;if("function"==typeof(r=t.valueOf)&&!e(o=r.call(t)))return o;if(!n&&"function"==typeof(r=t.toString)&&!e(o=r.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,n,r){var e=r(0),o=r(8),i=r(18),u=r(26),f=r(3).f;t.exports=function(t){var n=o.Symbol||(o.Symbol=i?{}:e.Symbol||{});"_"==t.charAt(0)||t in n||f(n,t,{value:u.f(t)})}},function(t,n,r){n.f=r(6)},function(t,n){var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,n,r){var e=r(10),o=r(0).document,i=e(o)&&e(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,n,r){t.exports=!r(1)&&!r(9)(function(){return 7!=Object.defineProperty(r(28)("div"),"a",{get:function(){return 7}}).a})},function(t,n,r){"use strict";var e=r(18),o=r(16),i=r(35),u=r(5),f=r(2),c=r(17),a=r(52),s=r(20),l=r(59),p=r(6)("iterator"),y=!([].keys&&"next"in[].keys()),v="@@iterator",d="keys",h="values",b=function(){return this};t.exports=function(t,n,r,g,m,x,O){a(r,n,g);var w,S,_,j=function(t){if(!y&&t in k)return k[t];switch(t){case d:return function(){return new r(this,t)};case h:return function(){return new r(this,t)}}return function(){return new r(this,t)}},P=n+" Iterator",E=m==h,M=!1,k=t.prototype,F=k[p]||k[v]||m&&k[m],N=F||j(m),A=m?E?j("entries"):N:void 0,T="Array"==n?k.entries||F:F;if(T&&(_=l(T.call(new t)),_!==Object.prototype&&(s(_,P,!0),e||f(_,p)||u(_,p,b))),E&&F&&F.name!==h&&(M=!0,N=function(){return F.call(this)}),e&&!O||!y&&!M&&k[p]||u(k,p,N),c[n]=N,c[P]=b,m)if(w={values:E?N:j(h),keys:x?N:j(d),entries:A},O)for(S in w)S in k||i(k,S,w[S]);else o(o.P+o.F*(y||M),n,w);return w}},function(t,n,r){var e=r(7),o=r(56),i=r(15),u=r(21)("IE_PROTO"),f=function(){},c="prototype",a=function(){var t,n=r(28)("iframe"),e=i.length,o="<",u=">";for(n.style.display="none",r(49).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write(o+"script"+u+"document.F=Object"+o+"/script"+u),t.close(),a=t.F;e--;)delete a[c][i[e]];return a()};t.exports=Object.create||function(t,n){var r;return null!==t?(f[c]=e(t),r=new f,f[c]=null,r[u]=t):r=a(),void 0===n?r:o(r,n)}},function(t,n,r){var e=r(34),o=r(15).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,r){var e=r(2),o=r(4),i=r(46)(!1),u=r(21)("IE_PROTO");t.exports=function(t,n){var r,f=o(t),c=0,a=[];for(r in f)r!=u&&e(f,r)&&a.push(r);for(;n.length>c;)e(f,r=n[c++])&&(~i(a,r)||a.push(r));return a}},function(t,n,r){t.exports=r(5)},function(t,n,r){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}function o(t){this.data=t,this.run(t)}var i=r(37),u=e(i),f=r(40),c=e(f);o.prototype.run=function(t){var n=void 0;for(var r in t)t.hasOwnProperty(r)&&(n=t[r],"object"===("undefined"==typeof n?"undefined":(0,c.default)(n))&&new DDB(n),this.convert(r,n))},o.prototype.convert=function(t,n){(0,u.default)(this.data,t,{get:function(){console.log("Getting -"+t+"-")},set:function(){console.log("Setting -"+t+"- and new value is -"+n+"-")}})},t.exports=o},function(t,n,r){t.exports={default:r(41),__esModule:!0}},function(t,n,r){t.exports={default:r(42),__esModule:!0}},function(t,n,r){t.exports={default:r(43),__esModule:!0}},function(t,n,r){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}n.__esModule=!0;var o=r(39),i=e(o),u=r(38),f=e(u),c="function"==typeof f.default&&"symbol"==typeof i.default?function(t){return typeof t}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":typeof t};n.default="function"==typeof f.default&&"symbol"===c(i.default)?function(t){return"undefined"==typeof t?"undefined":c(t)}:function(t){return t&&"function"==typeof f.default&&t.constructor===f.default&&t!==f.default.prototype?"symbol":"undefined"==typeof t?"undefined":c(t)}},function(t,n,r){r(65);var e=r(8).Object;t.exports=function(t,n,r){return e.defineProperty(t,n,r)}},function(t,n,r){r(68),r(66),r(69),r(70),t.exports=r(8).Symbol},function(t,n,r){r(67),r(71),t.exports=r(26).f("iterator")},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){t.exports=function(){}},function(t,n,r){var e=r(4),o=r(62),i=r(61);t.exports=function(t){return function(n,r,u){var f,c=e(n),a=o(c.length),s=i(u,a);if(t&&r!=r){for(;a>s;)if(f=c[s++],f!=f)return!0}else for(;a>s;s++)if((t||s in c)&&c[s]===r)return t||s||0;return!t&&-1}}},function(t,n,r){var e=r(44);t.exports=function(t,n,r){if(e(t),void 0===n)return t;switch(r){case 1:return function(r){return t.call(n,r)};case 2:return function(r,e){return t.call(n,r,e)};case 3:return function(r,e,o){return t.call(n,r,e,o)}}return function(){return t.apply(n,arguments)}}},function(t,n,r){var e=r(11),o=r(33),i=r(19);t.exports=function(t){var n=e(t),r=o.f;if(r)for(var u,f=r(t),c=i.f,a=0;f.length>a;)c.call(t,u=f[a++])&&n.push(u);return n}},function(t,n,r){t.exports=r(0).document&&document.documentElement},function(t,n,r){var e=r(27);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==e(t)?t.split(""):Object(t)}},function(t,n,r){var e=r(27);t.exports=Array.isArray||function(t){return"Array"==e(t)}},function(t,n,r){"use strict";var e=r(31),o=r(12),i=r(20),u={};r(5)(u,r(6)("iterator"),function(){return this}),t.exports=function(t,n,r){t.prototype=e(u,{next:o(1,r)}),i(t,n+" Iterator")}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n,r){var e=r(11),o=r(4);t.exports=function(t,n){for(var r,i=o(t),u=e(i),f=u.length,c=0;f>c;)if(i[r=u[c++]]===n)return r}},function(t,n,r){var e=r(13)("meta"),o=r(10),i=r(2),u=r(3).f,f=0,c=Object.isExtensible||function(){return!0},a=!r(9)(function(){return c(Object.preventExtensions({}))}),s=function(t){u(t,e,{value:{i:"O"+ ++f,w:{}}})},l=function(t,n){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,e)){if(!c(t))return"F";if(!n)return"E";s(t)}return t[e].i},p=function(t,n){if(!i(t,e)){if(!c(t))return!0;if(!n)return!1;s(t)}return t[e].w},y=function(t){return a&&v.NEED&&c(t)&&!i(t,e)&&s(t),t},v=t.exports={KEY:e,NEED:!1,fastKey:l,getWeak:p,onFreeze:y}},function(t,n,r){var e=r(3),o=r(7),i=r(11);t.exports=r(1)?Object.defineProperties:function(t,n){o(t);for(var r,u=i(n),f=u.length,c=0;f>c;)e.f(t,r=u[c++],n[r]);return t}},function(t,n,r){var e=r(19),o=r(12),i=r(4),u=r(24),f=r(2),c=r(29),a=Object.getOwnPropertyDescriptor;n.f=r(1)?a:function(t,n){if(t=i(t),n=u(n,!0),c)try{return a(t,n)}catch(t){}if(f(t,n))return o(!e.f.call(t,n),t[n])}},function(t,n,r){var e=r(4),o=r(32).f,i={}.toString,u="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],f=function(t){try{return o(t)}catch(t){return u.slice()}};t.exports.f=function(t){return u&&"[object Window]"==i.call(t)?f(t):o(e(t))}},function(t,n,r){var e=r(2),o=r(63),i=r(21)("IE_PROTO"),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),e(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,n,r){var e=r(23),o=r(14);t.exports=function(t){return function(n,r){var i,u,f=String(o(n)),c=e(r),a=f.length;return c<0||c>=a?t?"":void 0:(i=f.charCodeAt(c),i<55296||i>56319||c+1===a||(u=f.charCodeAt(c+1))<56320||u>57343?t?f.charAt(c):i:t?f.slice(c,c+2):(i-55296<<10)+(u-56320)+65536)}}},function(t,n,r){var e=r(23),o=Math.max,i=Math.min;t.exports=function(t,n){return t=e(t),t<0?o(t+n,0):i(t,n)}},function(t,n,r){var e=r(23),o=Math.min;t.exports=function(t){return t>0?o(e(t),9007199254740991):0}},function(t,n,r){var e=r(14);t.exports=function(t){return Object(e(t))}},function(t,n,r){"use strict";var e=r(45),o=r(53),i=r(17),u=r(4);t.exports=r(30)(Array,"Array",function(t,n){this._t=u(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,r=this._i++;return!t||r>=t.length?(this._t=void 0,o(1)):"keys"==n?o(0,r):"values"==n?o(0,t[r]):o(0,[r,t[r]])},"values"),i.Arguments=i.Array,e("keys"),e("values"),e("entries")},function(t,n,r){var e=r(16);e(e.S+e.F*!r(1),"Object",{defineProperty:r(3).f})},function(t,n){},function(t,n,r){"use strict";var e=r(60)(!0);r(30)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},function(t,n,r){"use strict";var e=r(0),o=r(2),i=r(1),u=r(16),f=r(35),c=r(55).KEY,a=r(9),s=r(22),l=r(20),p=r(13),y=r(6),v=r(26),d=r(25),h=r(54),b=r(48),g=r(51),m=r(7),x=r(4),O=r(24),w=r(12),S=r(31),_=r(58),j=r(57),P=r(3),E=r(11),M=j.f,k=P.f,F=_.f,N=e.Symbol,A=e.JSON,T=A&&A.stringify,I="prototype",D=y("_hidden"),C=y("toPrimitive"),B={}.propertyIsEnumerable,L=s("symbol-registry"),R=s("symbols"),W=s("op-symbols"),G=Object[I],J="function"==typeof N,K=e.QObject,z=!K||!K[I]||!K[I].findChild,Y=i&&a(function(){return 7!=S(k({},"a",{get:function(){return k(this,"a",{value:7}).a}})).a})?function(t,n,r){var e=M(G,n);e&&delete G[n],k(t,n,r),e&&t!==G&&k(G,n,e)}:k,Q=function(t){var n=R[t]=S(N[I]);return n._k=t,n},U=J&&"symbol"==typeof N.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof N},q=function(t,n,r){return t===G&&q(W,n,r),m(t),n=O(n,!0),m(r),o(R,n)?(r.enumerable?(o(t,D)&&t[D][n]&&(t[D][n]=!1),r=S(r,{enumerable:w(0,!1)})):(o(t,D)||k(t,D,w(1,{})),t[D][n]=!0),Y(t,n,r)):k(t,n,r)},H=function(t,n){m(t);for(var r,e=b(n=x(n)),o=0,i=e.length;i>o;)q(t,r=e[o++],n[r]);return t},V=function(t,n){return void 0===n?S(t):H(S(t),n)},X=function(t){var n=B.call(this,t=O(t,!0));return!(this===G&&o(R,t)&&!o(W,t))&&(!(n||!o(this,t)||!o(R,t)||o(this,D)&&this[D][t])||n)},Z=function(t,n){if(t=x(t),n=O(n,!0),t!==G||!o(R,n)||o(W,n)){var r=M(t,n);return!r||!o(R,n)||o(t,D)&&t[D][n]||(r.enumerable=!0),r}},$=function(t){for(var n,r=F(x(t)),e=[],i=0;r.length>i;)o(R,n=r[i++])||n==D||n==c||e.push(n);return e},tt=function(t){for(var n,r=t===G,e=F(r?W:x(t)),i=[],u=0;e.length>u;)!o(R,n=e[u++])||r&&!o(G,n)||i.push(R[n]);return i};J||(N=function(){if(this instanceof N)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),n=function(r){this===G&&n.call(W,r),o(this,D)&&o(this[D],t)&&(this[D][t]=!1),Y(this,t,w(1,r))};return i&&z&&Y(G,t,{configurable:!0,set:n}),Q(t)},f(N[I],"toString",function(){return this._k}),j.f=Z,P.f=q,r(32).f=_.f=$,r(19).f=X,r(33).f=tt,i&&!r(18)&&f(G,"propertyIsEnumerable",X,!0),v.f=function(t){return Q(y(t))}),u(u.G+u.W+u.F*!J,{Symbol:N});for(var nt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;nt.length>rt;)y(nt[rt++]);for(var nt=E(y.store),rt=0;nt.length>rt;)d(nt[rt++]);u(u.S+u.F*!J,"Symbol",{for:function(t){return o(L,t+="")?L[t]:L[t]=N(t)},keyFor:function(t){if(U(t))return h(L,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){z=!0},useSimple:function(){z=!1}}),u(u.S+u.F*!J,"Object",{create:V,defineProperty:q,defineProperties:H,getOwnPropertyDescriptor:Z,getOwnPropertyNames:$,getOwnPropertySymbols:tt}),A&&u(u.S+u.F*(!J||a(function(){var t=N();return"[null]"!=T([t])||"{}"!=T({a:t})||"{}"!=T(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!U(t)){for(var n,r,e=[t],o=1;arguments.length>o;)e.push(arguments[o++]);return n=e[1],"function"==typeof n&&(r=n),!r&&g(n)||(n=function(t,n){if(r&&(n=r.call(this,t,n)),!U(n))return n}),e[1]=n,T.apply(A,e)}}}),N[I][C]||r(5)(N[I],C,N[I].valueOf),l(N,"Symbol"),l(Math,"Math",!0),l(e.JSON,"JSON",!0)},function(t,n,r){r(25)("asyncIterator")},function(t,n,r){r(25)("observable")},function(t,n,r){r(64);for(var e=r(0),o=r(5),i=r(17),u=r(6)("toStringTag"),f=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],c=0;c<5;c++){var a=f[c],s=e[a],l=s&&s.prototype;l&&!l[u]&&o(l,u,a),i[a]=i.Array}},function(t,n,r){"use strict";function e(t){return t&&t.__esModule?t:{default:t}}var o=r(36),i=e(o),u=new i.default({name:"youngwind",age:25}),f=new i.default({university:"bupt",major:"computer"});console.log("----------DDB1-BEGIN-------"),u.data.name,u.data.age=100,f.data.university,f.data.major="science",console.log("----------DDB1--END------")}]);