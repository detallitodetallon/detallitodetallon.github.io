!function(){"use strict";var e=[,function(e,t,o){function r(){const e=document.querySelectorAll(".navlista a"),t=window.location.pathname;e.forEach((e=>{e.getAttribute("href")==="."+t&&e.classList.add("active")}))}function n(e){Object.keys(e).forEach((t=>{e[t].sort(((e,t)=>parseFloat(e.precio.replace("S/.","").trim())-parseFloat(t.precio.replace("S/.","").trim())))}))}o.r(t),o.d(t,{orderPrice:function(){return n},setActiveNavLink:function(){return r}})},function(e,t,o){async function r(){const e=await fetch("https://sheets.googleapis.com/v4/spreadsheets/1UeRsfG_I1Ai27zZuWNzL4CYHdP9gzCd49Sz1IkNBtmE/values/Hoja1!A:J?key=AIzaSyB0wl-sQaS72bOzVKBbsdgPKMK9_IYlUWA");return(await e.json()).values.slice(1).map((e=>{let t=e[1];if(t.includes("drive.google.com/file/d/")){const e=t.match(/\/d\/(.*?)\//)[1];t=`https://drive.google.com/thumbnail?id=${e}&sz=w1000`}return{id:e[0],imagen:t,nombre:e[2],precio:e[3],descripcion:e[4],contenido:e[5]?e[5].split(";"):[],video:e[6]?e[6]:"",categoria:e[7],subcategorias:e[8]?e[8].split(";"):[],sku:e[9],destacado:!!e[10]&&"true"===e[10].toLowerCase()}})).filter((e=>null!==e.id&&""!==e.id))}o.r(t),o.d(t,{fetchProducts:function(){return r}})},function(e,t,o){o.r(t);var r=o(1);function n(e,t,o){fetch(e).then((e=>e.text())).then((e=>{document.getElementById(t).innerHTML=e,o&&o()})).catch((e=>console.error(`Error al cargar el componente ${t}:`,e)))}document.addEventListener("DOMContentLoaded",(()=>{new Promise(((e,t)=>{fetch("./parts/head.html").then((e=>e.text())).then((t=>{t="undefined"!=typeof pageTitle?t.replace("{{pageTitle}}",pageTitle):t.replace("{{pageTitle}}",""),document.head.innerHTML+=t,e()})).catch((e=>t(e)))})).then((()=>{n("./parts/nav.html","navegador",r.setActiveNavLink),n("./parts/footer.html","footer")})).catch((e=>{console.error("Error al cargar el head o los componentes:",e)})).finally((()=>{setTimeout((()=>{document.getElementById("main").style.display=""}),100)}))}))},function(e,t,o){o.r(t);var r=o(1),n=o(2);document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("mostrador")&&fetch("./parts/grilla-tabs.html").then((e=>e.text())).then((e=>{(0,n.fetchProducts)().then((t=>{const o={globos:[],gigantes:[],flores:[],helio:[]};t.forEach((e=>{e.destacado&&o[e.categoria].push(e)})),(0,r.orderPrice)(o),Object.keys(o).forEach((e=>{o[e]=o[e].slice(0,4)}));const n=document.querySelector("#globos .productos"),c=document.querySelector("#gigantes .productos"),a=document.querySelector("#flores .productos"),l=document.querySelector("#helio .productos");Object.keys(o).forEach((t=>{o[t].forEach(((o,r)=>{let i=o.contenido.length>0?o.contenido.map((e=>`<li>${e}</li>`)).join(""):"",s=e.replace(/{{cols}}/g,"col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12").replace(/{{imagen}}/g,o.imagen).replace(/{{nombre}}/g,o.nombre).replace(/{{precio}}/g,o.precio).replace(/{{video}}/g,o.video).replace(/{{descripcion}}/g,o.descripcion).replace(/{{contenido}}/g,i).replace(/{{index}}/g,o.categoria+r).replace(/{{sku}}/g,o.categoria+o.id);switch(t){case"globos":n.innerHTML+=s;break;case"gigantes":c.innerHTML+=s;break;case"flores":a.innerHTML+=s;break;case"helio":l.innerHTML+=s}}))}));return document.querySelectorAll(".modal").forEach((e=>{new bootstrap.Modal(e)})),o})).then((e=>{setTimeout((()=>{const e=document.querySelectorAll(".modal-contenido"),t=document.querySelectorAll(".modal-video");e.forEach((e=>{0===e.querySelector("ul").children.length&&(e.style.display="none")})),t.forEach((e=>{const t=window.location.origin+"/",o=e.querySelector(".video-enlace").href;""!=o&&null!=o&&null!=o&&o!=t||(e.style.display="none")}))}),500)})).catch((e=>console.error("Error fetching products from Google Sheets:",e)))})).catch((e=>console.error("Error fetching grilla-tabs.html:",e)))}))},function(e,t,o){o.r(t);var r=o(2),n=o(1);document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("catalogo");if(e){const t=e.dataset.categoria;fetch("./parts/grilla-tabs.html").then((e=>e.text())).then((e=>{(0,r.fetchProducts)().then((o=>{const r={};o.filter((e=>e.categoria===t)).forEach((e=>{e.subcategorias.forEach((t=>{r[t]||(r[t]=[]),r[t].push(e)}))})),(0,n.orderPrice)(r);const c=Object.keys(r).sort(),a=document.getElementById("tab-subcategorias"),l=document.getElementById("content-subcategorias");c.forEach(((t,o)=>{const n=`subcategoria-${t.replace(/\s+/g,"-").toLowerCase()}`,c=0==o,i=c?"active":"",s=document.createElement("li");s.classList.add("nav-item"),s.innerHTML=`\n                                 <button class="nav-link ${i}" id="${n}-tab" data-bs-toggle="pill"\n                                     data-bs-target="#${n}" type="button" role="tab" aria-controls="${n}"\n                                     aria-selected="${c}"><i class="bi bi-arrow-right-short"></i> ${t}</button>\n                             `,a.appendChild(s);const d=document.createElement("div");d.classList.add("tab-pane","fade"),1==c&&d.classList.add("show","active"),d.id=n,d.setAttribute("role","tabpanel"),d.setAttribute("aria-labelledby",`${n}-tab`),d.setAttribute("tabindex","0");const u=document.createElement("div");u.classList.add("row","productos"),d.appendChild(u),l.appendChild(d),r[t].forEach(((o,r)=>{let n=o.contenido.length>0?o.contenido.map((e=>`<li>${e}</li>`)).join(""):"",c=e.replace(/{{cols}}/g,"col-xl-4 col-lg-4 col-md-6 col-12").replace(/{{imagen}}/g,o.imagen).replace(/{{nombre}}/g,o.nombre).replace(/{{precio}}/g,o.precio).replace(/{{video}}/g,o.video).replace(/{{descripcion}}/g,o.descripcion).replace(/{{contenido}}/g,n).replace(/{{index}}/g,t.replace(/\s+/g,"-").toLowerCase()+"-"+r).replace(/{{sku}}/g,o.sku);u.innerHTML+=c}))}));return document.querySelectorAll(".modal").forEach((e=>{new bootstrap.Modal(e)})),r})).then((e=>{setTimeout((()=>{const e=document.querySelectorAll(".modal-contenido"),t=document.querySelectorAll(".modal-video");e.forEach((e=>{0===e.querySelector("ul").children.length&&(e.style.display="none")})),t.forEach((e=>{const t=window.location,o=e.querySelector(".video-enlace").href;""!=o&&null!=o&&null!=o&&o!=t||(e.style.display="none")}))}),500)})).catch((e=>console.error("Error fetching products from Google Sheets:",e)))})).catch((e=>console.error("Error fetching grilla-tabs.html:",e)))}}))}],t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var c=t[r]={exports:{}};return e[r](c,c.exports,o),c.exports}o.d=function(e,t){for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};!function(){o.r(r);o(1),o(2),o(3),o(4),o(5)}()}();