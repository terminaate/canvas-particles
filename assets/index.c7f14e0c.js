const v=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}};v();const m=(e,r,t,s,i="#000",o=!0,a="#222",p=!1)=>{e.beginPath(),e.arc(r,t,s,0,2*Math.PI,!1),e.fillStyle=i,o&&e.fill(),e.strokeStyle=a,p&&e.stroke()},g=(e,r="#000")=>{e.fillStyle=r,e.fillRect(0,0,e.canvas.width,e.canvas.height)},w=(e,r,t="rgba(8,255,0,0.37)")=>{let s=25,i=10;e.fillStyle=t,e.fillRect(0,0,300,200+s),e.fillStyle="#000",e.font="20px Arial, sans-serif";for(let o in r)e.fillText(`${o}: ${r[o]}`,i,s),s+=25},n=document.querySelector("#canvas");n.height=innerHeight;n.width=innerWidth;onresize=()=>{n.height=innerHeight,n.width=innerWidth};const d=n.getContext("2d");let c=[];const l={minRadius:1,maxRadius:4,particlesVelocity:2,mouseRadius:20,particlesCount:200,devTools:!1};let u=0,f=0,y=!1;addEventListener("mousemove",e=>{u=e.clientX,f=e.clientY});addEventListener("mousedown",()=>{y=!0});addEventListener("mouseup",()=>{y=!1});const h=()=>{if(g(d),y&&u>0&&f>0){const r=Math.floor(Math.random()*(l.maxRadius-l.minRadius+1))+l.minRadius;c.push({x:u,y:f,radius:r,color:`rgb(255, 255, 255, ${Math.random()*1})`,velocityX:Math.random()*(l.particlesVelocity*2)-l.particlesVelocity,velocityY:Math.random()*(l.particlesVelocity*2)+l.particlesVelocity})}for(let r in c){let t=c[r];m(d,t.x,t.y,t.radius,t.color),t.x<0?t.x=n.width:t.x+=t.velocityX,t.y<0?t.y=n.height-t.radius/2:t.y-=t.velocityY}let e=.1;y&&(e+=.1),m(d,u,f,l.mouseRadius,`rgba(255, 255, 255, ${e})`),l.devTools&&w(d,l),requestAnimationFrame(h)};addEventListener("keypress",e=>{e.key==="1"&&(l.devTools=!l.devTools)});const L=()=>{c=[],h()};L();
