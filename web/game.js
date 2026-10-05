
const $=s=>document.querySelector(s),C=n=>document.createElement(n);
const PAL={k:'#000',w:'#fff',g:'#6fbf5a',d:'#3c7a3a',r:'#ff3b3b'};
function spr(rows,p){const c=C('canvas');c.width=c.height=8;const x=c.getContext('2d');rows.forEach((r,y)=>[...r].forEach((h,i)=>{const o=p[h]||PAL[h];if(o){x.fillStyle=o;x.fillRect(i,y,1,1)}}));return c}
const TS=["..kkkk..",".kaaaak.",".kawwak.",".kaaaak.","..kbbk..",".kbbbbk.",".kbbbbk.","kkkkkkkk"];
const ZR=["..dddd..",".dggggd.",".grgrgg.",".gggggg.","..cccc..",".gcccg..","..cccc..","..c..c.."];
const TW=[
{id:'archer',n:'Archer',cost:50,price:0,rg:3,dmg:9,rt:.5,a:'#c98b3a',b:'#6b4520',d:'Murah & cepat'},
{id:'cannon',n:'Cannon',cost:120,price:150,rg:2.6,dmg:35,rt:1.4,a:'#777',b:'#333',d:'Ledakan area'},
{id:'frost',n:'Frost',cost:90,price:200,rg:2.6,dmg:3,rt:.8,a:'#6fd3ff',b:'#2b6c99',d:'Zombie jadi lambat'},
{id:'flame',n:'Flame',cost:100,price:250,rg:1.9,dmg:5,rt:.12,a:'#ff7a2b',b:'#8a2b0a',d:'Dekat tapi sakit'},
{id:'sniper',n:'Sniper',cost:150,price:300,rg:6,dmg:80,rt:2,a:'#4ad06a',b:'#1d6b32',d:'Jarak jauh'},
{id:'tesla',n:'Tesla',cost:180,price:500,rg:3,dmg:26,rt:1,a:'#ffe14a',b:'#9a7d0a',d:'Kena 3 zombie'}];
TW.forEach(t=>t.s=spr(TS,t));
const ZS=['#4a7bd8','#e0a030','#8a3ad8'].map(c=>spr(ZR,{c}));
const WP=[[0,1],[9,1],[9,4],[2,4],[2,6],[11,6]].map(a=>[a[0]*16+8,a[1]*16+8]);
const PC=[];{const w=[[0,1],[9,1],[9,4],[2,4],[2,6],[11,6]];for(let s=0;s<5;s++){let[a,b]=w[s],[c,d]=w[s+1];for(;;){PC[b*12+a]=1;if(a==c&&b==d)break;a+=Math.sign(c-a);b+=Math.sign(d-b)}}}
const ZT=[{sp:22,hp:n=>30+9*n,rw:10},{sp:40,hp:n=>20+6*n,rw:15},{sp:13,hp:n=>140+35*n,rw:30}];

const LS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v)}catch(e){}};
let AC=null,mus=null,ms=0,musOn=LS('ptd_m')!=='0',sfxOn=LS('ptd_s')!=='0',autoPref=LS('ptd_a')!=='0';
const t0=Date.now(),hideSplash=()=>Promise.all([document.fonts?document.fonts.ready:0,new Promise(r=>setTimeout(r,Math.max(0,1200-(Date.now()-t0))))]).then(()=>$('#splash').classList.add('hide'));
const au=()=>{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();if(AC.state=='suspended')AC.resume();return AC};
const NOTE=n=>220*Math.pow(2,n/12);
function beep(f,d,t='square',v=.05,f2){const a=au(),o=a.createOscillator(),g=a.createGain(),n=a.currentTime;o.type=t;o.frequency.setValueAtTime(f,n);if(f2)o.frequency.exponentialRampToValueAtTime(f2,n+d);g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(a.destination);o.start(n);o.stop(n+d)}
const SF={click:[600,.05,'square',.04,900],place:[300,.12,'square',.06,600],sell:[500,.12,'square',.05,200],no:[120,.15,'sawtooth',.05],kill:[200,.12,'square',.05,60],leak:[150,.3,'sawtooth',.08,50],wave:[220,.4,'triangle',.08,440],archer:[900,.06,'square',.02,500],cannon:[120,.2,'sawtooth',.07,40],frost:[1200,.1,'sine',.03,800],flame:[300,.05,'sawtooth',.015,200],sniper:[1500,.15,'square',.05,200],tesla:[700,.15,'sawtooth',.04,1400]},lastS={};
function sfx(k){if(!sfxOn)return;const n=performance.now();if(n-(lastS[k]||0)<(k=='flame'?90:50))return;lastS[k]=n;
 if(k=='win'||k=='lose'){(k=='win'?[0,4,7,12]:[7,3,0,-5]).forEach((s,i)=>setTimeout(()=>beep(NOTE(s+12),.2,'square',.06),i*130));return}
 const a=SF[k];if(a)beep(...a)}
const LEAD=[0,3,7,12,10,7,3,7,0,3,7,12,14,12,10,7,-2,2,5,10,9,5,2,5,-4,0,3,7,5,3,0,-5];
function music(on){clearInterval(mus);mus=null;if(on&&musOn)mus=setInterval(()=>{const n=LEAD[ms%LEAD.length];beep(NOTE(n),.18,'square',.02);if(ms%4==0)beep(NOTE(n-24),.6,'triangle',.05);ms++},220)}
function sndUi(){$('#bm').classList.toggle('off',!musOn);$('#bf').classList.toggle('off',!sfxOn);if($('#auto')&&G)$('#auto').textContent='AUTO '+(G.auto?'ON':'OFF')}
const tgM=()=>{musOn=!musOn;LS('ptd_m',musOn?'1':'0');music(musOn);sndUi()},tgF=()=>{sfxOn=!sfxOn;LS('ptd_s',sfxOn?'1':'0');sndUi()};
const tgA=()=>{G.auto=!G.auto;autoPref=G.auto;LS('ptd_a',G.auto?'1':'0');ui();sndUi()};
addEventListener('pointerdown',()=>{au();if(!mus&&musOn)music(true)});
document.addEventListener('click',e=>{if(e.target.closest('button'))sfx('click')});
document.addEventListener('visibilitychange',()=>{if(AC)document.hidden?AC.suspend():AC.resume()});
import{initializeApp}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import{getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc,deleteDoc,collection,onSnapshot}from"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import{firebaseConfig}from"./firebase-config.js";
import{apkUrl}from"./app-config.js";
const fapp=initializeApp(firebaseConfig),auth=getAuth(fapp),fdb=getFirestore(fapp);
let P=null,G=null,R=null,starting=0,opp='',uid=null;
const em=u=>u.trim().toLowerCase()+'@ptd.game',amsg=t=>$('#am').textContent=t;
async function authGo(up){const n=$('#un').value.trim(),p=$('#pw').value;
 if(!/^[a-z0-9_]{3,12}$/i.test(n))return amsg('Username 3-12 huruf/angka/_');
 if(p.length<6)return amsg('Password minimal 6 karakter');
 try{up?await createUserWithEmailAndPassword(auth,em(n),p):await signInWithEmailAndPassword(auth,em(n),p)}catch(e){amsg(e.code.replace('auth/',''))}}
onAuthStateChanged(auth,async u=>{
 if(!u){uid=null;P=null;if(R)R.leave();['lobby','game','ov'].forEach(i=>$('#'+i).classList.add('hide'));$('#auth').classList.remove('hide');hideSplash();return}
 uid=u.uid;const s=await getDoc(doc(fdb,'users',uid));
 P=s.exists()?s.data():{name:u.email.split('@')[0],coins:0,owned:['archer'],load:['archer']};
 if(!s.exists())save();lobby();hideSplash()});
const save=()=>setDoc(doc(fdb,'users',uid),P).catch(e=>console.error(e));
const logout=()=>signOut(auth);
const tgS=()=>{G.sell=!G.sell;ui()},tgP=()=>{G.sp=G.sp==1?2:1;ui()},skp=()=>{G.cd=0};
function lobby(){['game','auth'].forEach(i=>$('#'+i).classList.add('hide'));$('#lobby').classList.remove('hide');G=null;tab('main')}
function hdr(){$('#who').textContent='👤 '+P.name;$('#coin').textContent='🪙 '+P.coins}
function tab(k){hdr();const b=$('#tb');b.innerHTML='';
 if(k=='main'){b.innerHTML=`<p>Pilih mode</p><button class="p" onclick="startGame('sp')">SINGLEPLAYER</button><hr><p>Battle 1v1<br>Menang +350, Kalah -150 koin</p><input id="code" value="ARENA" placeholder="Kode room"><p></p><button onclick="findMatch()">CARI LAWAN</button><p id="mm"></p><button class="d" onclick="logout()">KELUAR AKUN</button>`}
 if(k=='shop'){b.innerHTML='<p>Beli tower pakai koin</p><div class="g" id="gg"></div>';TW.forEach(t=>{const o=P.owned.includes(t.id),e=C('div');e.className='t';e.innerHTML=`<img src="${t.s.toDataURL()}"><b>${t.n}</b><span>${t.d}</span><span>Cash ${t.cost}</span>`;const x=C('button');x.textContent=o?'PUNYA':'🪙'+t.price;x.disabled=o||P.coins<t.price;x.onclick=()=>{P.coins-=t.price;P.owned.push(t.id);save();tab('shop')};e.append(x);$('#gg').append(e)})}
 if(k=='load'){b.innerHTML=`<p>Tower dipakai (${P.load.length}/5)</p><div class="g" id="gg"></div>`;TW.filter(t=>P.owned.includes(t.id)).forEach(t=>{const on=P.load.includes(t.id),e=C('button');e.className='t'+(on?' sel':'');e.innerHTML=`<img src="${t.s.toDataURL()}"><b>${t.n}</b>`;e.onclick=()=>{if(on){if(P.load.length>1)P.load=P.load.filter(i=>i!=t.id)}else if(P.load.length<5)P.load.push(t.id);save();tab('load')};$('#gg').append(e)})}
}
async function findMatch(){
 const code=($('#code').value||'ARENA').toUpperCase().replace(/[^A-Z0-9]/g,'')||'ARENA';starting=0;
 if(R)R.leave();
 const me=doc(fdb,'rooms/'+code+'/players/'+uid);let cur={name:P.name,st:'wait',wave:0,lives:10},docs=[];
 const w=o=>{cur={...cur,...o,t:Date.now()};return setDoc(me,cur).catch(()=>{})};
 const ev=()=>{const o=docs.filter(x=>x.id!=uid&&Date.now()-x.data().t<20000).map(x=>x.data());
  if(!G||G.mode!='mp'){const q=o.find(x=>x.st=='wait');if(q&&!starting){starting=1;opp=q.name;$('#mm').textContent='Lawan: '+opp+' - mulai!';setTimeout(()=>startGame('mp'),2500)}return}
  if(G.over)return;const q=o[0];
  if(!q){end(true,'Lawan keluar');return}
  $('#opp').textContent=`${opp} W${q.wave} ❤${q.lives}`;
  if(q.st=='dead')end(true,'Lawan kalah');else if(q.st=='done')end(false,'Lawan selesai duluan')};
 await w({});$('#mm').textContent='Menunggu lawan di room '+code+'...';
 const hb=setInterval(()=>{w({});ev()},5000),un=onSnapshot(collection(fdb,'rooms/'+code+'/players'),sn=>{docs=sn.docs;ev()});
 R={presence:w,leave(){clearInterval(hb);un();deleteDoc(me).catch(()=>{});R=null}};
}
const pr=o=>{if(R&&G&&G.mode=='mp')R.presence(o)};
function startGame(m){
 $('#lobby').classList.add('hide');$('#game').classList.remove('hide');$('#ov').classList.add('hide');
 G={mode:m,cash:500,lives:10,wave:0,zs:[],ts:[],fx:[],q:[],sc:0,st:'wait',cd:5,sp:1,sell:false,auto:autoPref,sel:P.load[0],over:false,last:performance.now()};
 $('#opp').textContent=m=='mp'?opp:'';$('#spd').classList.toggle('hide',m=='mp');
 const bar=$('#bar');bar.innerHTML='';
 P.load.forEach(id=>{const t=TW.find(x=>x.id==id),b=C('button');b.className='t';b.id='b_'+id;b.innerHTML=`<img src="${t.s.toDataURL()}" style="width:32px;height:32px">${t.cost}`;b.onclick=()=>{G.sel=id;G.sell=false;ui()};bar.append(b)});
 pr({st:'play',wave:0,lives:10});ui();requestAnimationFrame(loop)}
function ui(){if(!G)return;$('#cash').textContent=' '+Math.floor(G.cash);$('#lv').textContent=' '+G.lives;$('#wv').textContent=G.wave;
 $('#spd').textContent='X'+G.sp;$('#auto').textContent='AUTO '+(G.auto?'ON':'OFF');$('#sell').classList.toggle('sel',G.sell);
 P.load.forEach(id=>{const b=$('#b_'+id);if(b)b.classList.toggle('sel',!G.sell&&G.sel==id)});
 $('#info').textContent=G.st=='wait'?(G.auto?`Wave ${G.wave+1} dalam ${Math.ceil(G.cd)}s`:`Tekan WAVE ▶ untuk mulai wave ${G.wave+1}`):`Wave ${G.wave} berjalan`}
function wl(n){const a=[];for(let i=0;i<5+3*n;i++)a.push(n>=5&&i%5==4?2:n>=3&&i%3==2?1:0);return a}
function hit(z,d){z.hp-=d;if(z.hp<=0&&!z.x_){z.x_=1;G.cash+=z.rw;sfx('kill')}}
function fx(a,b,c){G.fx.push({a,b,c,t:.1})}
function upd(dt){
 if(G.st=='wait'){if(G.auto)G.cd-=dt;if(G.cd<=0){G.wave++;G.q=wl(G.wave);G.st='run';G.sc=0;sfx('wave');pr({wave:G.wave})}}
 else{G.sc-=dt;if(G.q.length&&G.sc<=0){const k=G.q.shift(),t=ZT[k];G.zs.push({k,x:WP[0][0]-16,y:WP[0][1],i:0,hp:t.hp(G.wave),mx:t.hp(G.wave),sl:0,rw:t.rw});G.sc=.9}
  if(!G.q.length&&!G.zs.length){if(G.wave>=10){end(true,'Semua wave selesai!');return}G.st='wait';G.cd=6;G.cash+=20}}
 for(const z of G.zs){z.sl-=dt;let s=ZT[z.k].sp*(z.sl>0?.5:1)*dt;
  while(s>0&&z.i<WP.length){const[tx,ty]=WP[z.i],dx=tx-z.x,dy=ty-z.y,d=Math.hypot(dx,dy);if(d<=s){z.x=tx;z.y=ty;z.i++;s-=d}else{z.x+=dx/d*s;z.y+=dy/d*s;s=0}}
  if(z.i>=WP.length){z.x_=1;z.esc=1;G.lives--;sfx('leak');pr({lives:G.lives});if(G.lives<=0){end(false,'Base hancur');return}}}
 for(const t of G.ts){t.cd-=dt;if(t.cd>0)continue;const d=t.d,cx=t.i*16+8,cy=t.j*16+8,r=d.rg*16;
  const inr=G.zs.filter(z=>!z.x_&&Math.hypot(z.x-cx,z.y-cy)<=r).sort((a,b)=>b.i-a.i);
  if(!inr.length)continue;t.cd=d.rt;const z=inr[0];sfx(d.id);
  if(d.id=='cannon'){G.zs.forEach(o=>{if(Math.hypot(o.x-z.x,o.y-z.y)<=24)hit(o,d.dmg)});fx([cx,cy],[z.x,z.y],'#ff9')}
  else if(d.id=='tesla'){inr.slice(0,3).forEach(o=>{hit(o,d.dmg);fx([cx,cy],[o.x,o.y],'#ff4')})}
  else{hit(z,d.dmg);if(d.id=='frost')z.sl=2;fx([cx,cy],[z.x,z.y],d.a)}}
 G.zs=G.zs.filter(z=>!z.x_);G.fx.forEach(f=>f.t-=dt);G.fx=G.fx.filter(f=>f.t>0)}
function draw(){const x=$('#cv').getContext('2d');x.imageSmoothingEnabled=false;
 for(let j=0;j<8;j++)for(let i=0;i<12;i++){x.fillStyle=PC[j*12+i]?'#b8905a':(i+j)%2?'#4f9a49':'#58a652';x.fillRect(i*16,j*16,16,16)}
 G.ts.forEach(t=>x.drawImage(t.d.s,t.i*16,t.j*16,16,16));
 G.zs.forEach(z=>{x.drawImage(ZS[z.k],z.x-8,z.y-8,16,16);x.fillStyle='#000';x.fillRect(z.x-7,z.y-10,14,3);x.fillStyle=z.sl>0?'#6fd3ff':'#5bd16a';x.fillRect(z.x-6,z.y-9,12*Math.max(0,z.hp)/z.mx,1)});
 G.fx.forEach(f=>{x.strokeStyle=f.c;x.lineWidth=1;x.beginPath();x.moveTo(...f.a);x.lineTo(...f.b);x.stroke()})}
function loop(n){if(!G||G.over)return;let dt=Math.min(.05,(n-G.last)/1000)*G.sp;G.last=n;
 for(let k=0;k<G.sp&&!G.over;k++)upd(dt/G.sp);
 if(G&&!G.over){ui();draw();requestAnimationFrame(loop)}}
$('#cv').addEventListener('pointerdown',e=>{if(!G||G.over)return;const r=e.target.getBoundingClientRect(),i=Math.floor((e.clientX-r.left)/r.width*12),j=Math.floor((e.clientY-r.top)/r.height*8);
 const ex=G.ts.findIndex(t=>t.i==i&&t.j==j);
 if(G.sell){if(ex>=0){G.cash+=Math.floor(G.ts[ex].d.cost*.6);G.ts.splice(ex,1);sfx('sell')}return}
 const d=TW.find(t=>t.id==G.sel);if(ex>=0||PC[j*12+i]||G.cash<d.cost){sfx('no');return}G.cash-=d.cost;sfx('place');G.ts.push({i,j,d,cd:0});ui()});
function end(win,why){if(!G||G.over)return;G.over=true;const m=G.mode;let c=0;
 if(m=='sp')c=win?100:0;else c=win?350:-150;
 P.coins=Math.max(0,P.coins+c);save();sfx(win?'win':'lose');
 if(m=='mp')pr({st:win&&why=='Semua wave selesai!'?'done':win?'won':'dead'});
 $('#ot').innerHTML=`${win?'<span class=c>MENANG!</span>':'KALAH'}<br>${why}<br><br>Koin ${c>=0?'+':''}${c}<br>Total 🪙${P.coins}`;$('#ov').classList.remove('hide')}
function home(){if(R){try{R.leave()}catch(e){}R=null}$('#ov').classList.add('hide');lobby()}
Object.assign(window,{authGo,tab,startGame,findMatch,home,end,logout,tgS,tgP,skp,tgA,tgM,tgF});

sndUi();if(apkUrl&&!window.Capacitor){const a=$('#apk');a.href=apkUrl;a.classList.remove('hide')}
