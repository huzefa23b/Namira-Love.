const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const state={letter:false,music:false};
window.addEventListener("load",()=>{setTimeout(()=>$("#loader").classList.add("done"),1200);initNav();initLetter();initGallery();initSecret();initMusic();initParticles();initTrail();});

function initNav(){
  $$(".next").forEach(b=>b.addEventListener("click",()=>document.querySelector(`.scene[data-index="${b.dataset.go}"]`)?.scrollIntoView({behavior:"smooth"})));
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$("#progress").style.width=(Number(e.target.dataset.index)/4*100)+"%"}),{threshold:.55});
  $$(".scene").forEach(s=>io.observe(s));
}
function initLetter(){
 const env=$("#envelope"),btn=$("#open"),out=$("#typed");
 const msg="Namira, some people become a beautiful part of your thoughts without even trying. You are that person for me. I hope you always know that you are deeply special to me. No fancy words can completely explain it — but every little moment with you means more than you know.";
 btn.addEventListener("click",()=>{
  if(state.letter)return;state.letter=true;env.classList.add("open");let i=0;
  const type=()=>{out.textContent=msg.slice(0,i++);if(i<=msg.length)setTimeout(type,18)};setTimeout(type,650);
 });
}
function initGallery(){
 const lb=$("#lightbox"),img=$("#lightboxImg"),cap=$("#caption");
 const data=[["assets/photos/namira-memory-01.png","01 — THE SUNSET"],["assets/photos/namira-memory-02.png","02 — THE LITTLE MOMENT"]];
 $$(".photo-card").forEach(card=>card.addEventListener("click",()=>{
   const d=data[Number(card.dataset.photo)];img.src=d[0];cap.textContent=d[1];lb.classList.add("show");burst(innerWidth/2,innerHeight/2,30);
 }));
 $("#close").onclick=()=>lb.classList.remove("show");lb.addEventListener("click",e=>{if(e.target===lb)lb.classList.remove("show")});
}
function initSecret(){
 const box=$("#secretBox");$("#secret").onclick=()=>{box.classList.add("show");burst(innerWidth/2,innerHeight/2,100)};
 $("#closeSecret").onclick=()=>box.classList.remove("show");
 box.addEventListener("click",e=>{if(e.target===box)box.classList.remove("show")});
 $("#heart").addEventListener("click",e=>burst(e.clientX,e.clientY,60));
}
function initMusic(){
 const audio=$("#music"),b=$("#sound");b.onclick=async()=>{try{if(state.music){audio.pause();state.music=false;b.innerHTML="♫ <i>sound</i>"}else{await audio.play();state.music=true;b.innerHTML="❚❚ <i>sound</i>"}}catch{b.innerHTML="♫ <i>add your-song.mp3</i>"}};
}
function initParticles(){
 const c=$("#particles"),x=c.getContext("2d");let w,h,ps=[],mx=-9999,my=-9999,dpr=Math.min(devicePixelRatio||1,2);
 function resize(){w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);ps=Array.from({length:Math.min(170,Math.floor(w*h/9000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.2,v:Math.random()*.45+.08,a:Math.random()*.45+.08,t:Math.random()*7}))}
 function loop(){x.clearRect(0,0,w,h);for(const p of ps){let dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<110){p.x+=dx/d*.35;p.y+=dy/d*.35}p.y-=p.v;p.x+=Math.sin(p.t)*.06;p.t+=.008;if(p.y<0)p.y=h;x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fillStyle=`rgba(255,130,175,${p.a})`;x.fill()}requestAnimationFrame(loop)}
 addEventListener("resize",resize);addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY});resize();loop();
}
function initTrail(){
 const c=$("#trail"),x=c.getContext("2d");let w,h,dpr=Math.min(devicePixelRatio||1,2),pts=[];
 function resize(){w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0)}function loop(){x.clearRect(0,0,w,h);pts.forEach(p=>{p.a-=.025;p.r*=.985});pts=pts.filter(p=>p.a>0);pts.forEach(p=>{x.globalAlpha=p.a;x.fillStyle="#ff5d9b";x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});x.globalAlpha=1;requestAnimationFrame(loop)}addEventListener("resize",resize);addEventListener("pointermove",e=>{if(Math.random()>.65)pts.push({x:e.clientX,y:e.clientY,r:Math.random()*4+1,a:.7})});resize();loop();
}
function burst(x,y,n){const c=document.createElement("canvas");c.style.cssText="position:fixed;inset:0;z-index:95;pointer-events:none";c.width=innerWidth;c.height=innerHeight;document.body.appendChild(c);const g=c.getContext("2d"),a=Array.from({length:n},()=>({x,y,vx:(Math.random()-.5)*10,vy:(Math.random()-.5)*10-2,a:1,s:Math.random()*4+2,r:Math.random()*6}));function f(){g.clearRect(0,0,c.width,c.height);let live=false;a.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.12;p.a-=.018;p.r+=.1;if(p.a>0){live=true;g.save();g.globalAlpha=p.a;g.translate(p.x,p.y);g.rotate(p.r);g.font=`${p.s*3}px serif`;g.fillStyle="#ff5d9b";g.fillText("♥",0,0);g.restore()}});if(live)requestAnimationFrame(f);else c.remove()}f();}
