!function(t){var e={};function r(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([,function(t,e,r){"use strict";r(2);var n,o=r(3),u=(n=o)&&n.__esModule?n:{default:n};document.querySelector("#table").innerHTML=(0,u.default)({data:[{brand:"MI",name:"MI6",price:2999},{brand:"iphone",name:"iphoneX",price:9999}]})},function(t,e,r){},function(module,exports){module.exports=function(obj){obj||(obj={});var __t,__p="",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,"")}with(obj){__p+='<table class="table">\r\n\t<tr>\r\n\t\t<th>brand</th>\r\n\t\t<th>name</th>\r\n\t\t<th>price</th>\r\n\t</tr>\r\n\t';for(var i=0;i<data.length;i++)__p+="\r\n\t\t<tr>\r\n\t\t\t<td>"+(null==(__t=data[i].brand)?"":__t)+"</td>\r\n\t\t\t<td>"+(null==(__t=data[i].name)?"":__t)+"</td>\r\n\t\t\t<td>"+(null==(__t=data[i].price)?"":__t)+"</td>\r\n\t\t</tr>\r\n\t";__p+="\r\n</table>"}return __p}}]);