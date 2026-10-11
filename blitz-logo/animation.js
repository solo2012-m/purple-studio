/* Independent SVG layers. No dependencies or permanent animation loop. */
const root=document.querySelector('.stage svg');
let animations=[];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function clear(){animations.forEach(a=>a.cancel());animations=[];}
function animate(id,frames,options){const e=root.querySelector('#'+id);animations.push(e.animate(frames,{fill:'both',...options}));}
function final(){clear();root.querySelector('#discharges').style.opacity=0;document.querySelector('#status').textContent='Финальный логотип · прозрачный фон';}
function play(){if(reduced.matches){final();return;}clear();root.querySelector('#discharges').style.opacity=1;
animate('purple',[{opacity:0,transform:'translate(-25px,8px)'},{opacity:1,transform:'translate(0,0)'}],{duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
animate('blit',[{opacity:0,transform:'translate(-20px,8px)'},{opacity:1,transform:'translate(0,0)'}],{delay:180,duration:650,easing:'cubic-bezier(.16,1,.3,1)'});
animate('letter-z',[{opacity:0,filter:'brightness(4)'},{opacity:1,filter:'brightness(3)',offset:.2},{opacity:1,filter:'brightness(1)'}],{delay:1160,duration:1000});
animate('z-veins',[{opacity:0},{opacity:1,offset:.15},{opacity:.85}],{delay:1160,duration:1900});
animate('glow',[{opacity:0},{opacity:1,offset:.16},{opacity:.8}],{delay:1100,duration:2000});
animate('discharges',[{opacity:0},{opacity:1,offset:.04},{opacity:.65,offset:.2},{opacity:.5,offset:.45},{opacity:0}],{delay:950,duration:2000});
root.querySelectorAll('#discharges path').forEach(p=>{const len=p.getTotalLength();animations.push(p.animate([{strokeDasharray:len,strokeDashoffset:len},{strokeDasharray:len,strokeDashoffset:0}],{delay:950,duration:260,fill:'both',easing:'ease-out'}));});
document.querySelector('#status').textContent='Появление → удар → формирование Z → затухание.';
}
document.querySelector('#replay').onclick=play;document.querySelector('#final').onclick=final;document.querySelector('#background').onclick=()=>document.querySelector('#stage').classList.toggle('checker');reduced.addEventListener('change',()=>{if(reduced.matches)final();});play();
