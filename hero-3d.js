/* Extruded original lightning polygon, rendered locally with WebGL. No libraries. */
(() => {
 const original=document.querySelector('svg.bolt'); if(!original)return;
 const canvas=document.createElement('canvas'); canvas.className='bolt bolt-3d';canvas.setAttribute('aria-hidden','true');
 const gl=canvas.getContext('webgl',{alpha:true,antialias:true,premultipliedAlpha:false});if(!gl)return;
 const vertex=`attribute vec3 p;attribute vec3 n;uniform float angle;varying vec3 normal;varying vec3 position;
 void main(){float c=cos(angle),s=sin(angle);float z=-.20944;mat3 tilt=mat3(cos(z),sin(z),0.,-sin(z),cos(z),0.,0.,0.,1.);mat3 spin=mat3(c,0.,-s,0.,1.,0.,s,0.,c);vec3 q=spin*tilt*p;normal=spin*tilt*n;position=q;float w=1.-q.z*.28;gl_Position=vec4(q.x/0.75,q.y,q.z*.15,w);}`;
 const fragment=`precision mediump float;varying vec3 normal;varying vec3 position;void main(){vec3 n=normalize(normal);vec3 l=normalize(vec3(-.7,1.,1.5));float diff=max(dot(n,l),0.);float shine=pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),32.);float rim=pow(1.-abs(n.z),3.);vec3 base=mix(vec3(.32,.075,.66),vec3(.72,.37,.98),clamp(position.y*.5+.5,0.,1.));vec3 color=base*(.36+.72*diff)+vec3(.8,.65,1.)*shine*.5+vec3(.24,.11,.4)*rim;gl_FragColor=vec4(color,1.);}`;
 function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('shader');return s;}
 try{
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return;gl.useProgram(program);
 const outline=[[273,35],[55,342],[191,342],[155,601],[408,256],[247,256],[336,35]].map(([x,y])=>[(x-231.5)/355,(318-y)/355]);
 // Ear-clipping triangulation preserves the original concave silhouette.
 let area=0;outline.forEach((p,i)=>{const q=outline[(i+1)%outline.length];area+=p[0]*q[1]-q[0]*p[1]});if(area<0)outline.reverse();
 const cross=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
 let ids=outline.map((_,i)=>i),tri=[];
 while(ids.length>3){let found=false;for(let j=0;j<ids.length;j++){let a=ids[(j+ids.length-1)%ids.length],b=ids[j],c=ids[(j+1)%ids.length];if(cross(outline[a],outline[b],outline[c])<=0)continue;
 if(ids.some(k=>k!==a&&k!==b&&k!==c&&cross(outline[a],outline[b],outline[k])>=0&&cross(outline[b],outline[c],outline[k])>=0&&cross(outline[c],outline[a],outline[k])>=0))continue;
 tri.push([a,b,c]);ids.splice(j,1);found=true;break;}if(!found)throw Error('polygon');}tri.push(ids);
 const data=[],depth=.075;
 const add=(p,n)=>data.push(...p,...n);
 for(const t of tri){for(const side of [-1,1])for(const i of t)add([...outline[i],side*depth],[0,0,side]);}
 outline.forEach((a,i)=>{let b=outline[(i+1)%outline.length],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),n=[dy/len,-dx/len,0];const v=[[...a,-depth],[...b,-depth],[...b,depth],[...a,depth]];for(const k of [0,1,2,0,2,3])add(v[k],n)});
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
 for(const [name,offset] of [['p',0],['n',12]]){const loc=gl.getAttribLocation(program,name);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,3,gl.FLOAT,false,24,offset);}
 gl.enable(gl.DEPTH_TEST);gl.clearColor(0,0,0,0);const angle=gl.getUniformLocation(program,'angle');
 original.after(canvas);original.style.display='none';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let frame;
 function paint(now){const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2),w=Math.round(r.width*d),h=Math.round(r.height*d);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform1f(angle,reduced.matches?-.35:(now%10000)/10000*Math.PI*2);gl.drawArrays(gl.TRIANGLES,0,data.length/6);if(!reduced.matches&&!document.hidden)frame=requestAnimationFrame(paint);}
 function restart(){cancelAnimationFrame(frame);paint(performance.now())}restart();reduced.addEventListener('change',restart);document.addEventListener('visibilitychange',restart);new ResizeObserver(restart).observe(canvas);
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);canvas.style.display='none';original.style.display='';});
 }catch(e){canvas.remove();original.style.display='';}
})();
