/* ================= LOGIC (v0.3 evergreen) ================= */
const KEY='survival-mode-flood-v3';
const S={tab:'home',kind:'house',people:2,days:7,req:{},done:{},sit:'',sub:'do',z:1,kit:0};
function load(){try{const r=localStorage.getItem(KEY);if(!r)return;const o=JSON.parse(r);
  if(['home','guide','bag','mine','urgent','p1','p2','p3','fix'].includes(o.tab))S.tab=o.tab;
  if(o.kind==='house'||o.kind==='condo')S.kind=o.kind;
  if(Number.isInteger(o.people)&&o.people>=1&&o.people<=20)S.people=o.people;
  if([3,7,14].includes(o.days))S.days=o.days;
  if(o.req&&typeof o.req==='object')S.req=o.req;
  if(o.done&&typeof o.done==='object')S.done=o.done;
  if(SITS[o.sit])S.sit=o.sit;
  if(o.sub==='bag'||o.sub==='do')S.sub=o.sub;
  if([1,1.15,1.3].includes(o.z))S.z=o.z;
  if(Number.isFinite(o.kit)&&o.kit>0&&o.kit<=Date.now())S.kit=o.kit;}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function hash(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return h.toString(36);}
ITEMS.forEach(it=>{it.id='p'+it.ph+'-'+hash(it.g+'|'+it.t);});
const $=id=>document.getElementById(id);
const vis=it=>(!it.k||it.k===S.kind)&&(!it.r||S.req[it.r]);
const list=(ph,f)=>ITEMS.filter(i=>i.ph===ph&&vis(i)&&(!f||f(i)));
function prog(ph){if(typeof ph==='string')ph=+ph.slice(1);const a=list(ph);const d=a.filter(i=>S.done[i.id]).length;return{d,t:a.length,p:a.length?Math.round(d/a.length*100):0};}
function qWater(daily){return daily?(4*S.people)+' ลิตร/วัน':(4*S.people*S.days)+' ลิตร';}
const ICON={
 p1:'M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1zM6 5h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 14l2 2 4-4',
 p2:'M12 3c3.5 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-6.5 6-11z',
 p3:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'};
let tt;function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200);}

/* ---------- icon library (stroke icons, 24px grid) ---------- */
const IC={
 bolt:'M13 2L4 14h7l-1 8 9-12h-7z',
 drop:'M12 3c3.5 4.5 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 2.5-6.5 6-11z',
 home:'M3 11l9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z M9 21v-6h6v6',
 exit:'M10 3H5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h5 M16 8l4 4-4 4 M20 12H9',
 plug:'M9 2v5 M15 2v5 M6 7h12v4a6 6 0 0 1-12 0z M12 17v5',
 toilet:'M7 3h8v6 M4 9h16c0 5-3.5 8-8 8s-8-3-8-8z M9 17l-1 4h8l-1-4',
 food:'M5 3v7a2 2 0 0 0 2 2v9 M9 3v7a2 2 0 0 1-2 2 M17 3c-2 2-3 5-3 8h3v10',
 pump:'M12 16V4 M7 9l5-5 5 5 M4 20h16',
 buoy:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2z M5.6 5.6l3.9 3.9 M14.5 14.5l3.9 3.9 M18.4 5.6l-3.9 3.9 M9.5 14.5l-3.9 3.9',
 trash:'M4 7h16 M9 7V4h6v3 M6 7l1 13h10l1-13 M10 11v6 M14 11v6',
 people:'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6 M17 11a2.5 2.5 0 1 0 0-5 M21 19c0-2.5-1.5-4.4-3.5-5',
 car:'M4 16v-4l2-5h12l2 5v4 M3 16h18v3H3z M7.5 12h9',
 phone:'M7 2h10a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z M11 18h2',
 camera:'M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
 shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
 cross:'M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z',
 flame:'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
 building:'M4 21V5l8-2 8 2v16 M4 21h16 M9 9h2 M13 9h2 M9 13h2 M13 13h2 M10 21v-4h4v4',
 heart:'M12 21s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 10c0 6-8 11-8 11z',
 clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2',
 signal:'M4 20v-3 M9 20v-7 M14 20v-11 M19 20V5',
 search:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4',
 calendar:'M5 5h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z M4 10h16 M8 3v4 M16 3v4',
 smile:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M8 14c1 1.5 2.5 2.2 4 2.2s3-.7 4-2.2 M9 9.5v.5 M15 9.5v.5',
 bag:'M6 8h12l1 13H5z M9 8V6a3 3 0 0 1 6 0v2',
 doc:'M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6',
 shirt:'M8 3l-5 4 3 3 2-1v12h8V9l2 1 3-3-5-4a4 4 0 0 1-8 0z',
 wind:'M3 9h11a3 3 0 1 0-3-3 M3 15h15a3 3 0 1 1-3 3 M3 12h8',
 paw:'M7 11a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z M17 11a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6z M10 8a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z M14 8a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4z M12 12c-3 0-5 3-5 5 0 2 2 2.5 5 2.5s5-.5 5-2.5c0-2-2-5-5-5z',
 tool:'M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z',
 list:'M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1zM6 5h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 14l2 2 4-4',
 spark:'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z'
};
function icon(n){return '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="'+(IC[n]||IC.tool)+'"/></svg>';}
const FIXI={enter:'drop',leave:'exit',elec:'bolt',power:'wind',toilet:'toilet',food:'food',pump:'pump',stuck:'buoy',waste:'trash',move:'people',car:'car',phone:'phone',claim:'camera',back:'home'};
const LESI={race:'clock',line:'signal',fact:'search',power:'bolt',toilet:'toilet',long:'calendar',weak:'heart',meme:'smile',proof:'camera',attach:'bag'};
const SOSI=['shield','cross','flame','bolt','bolt','building','drop','heart'];
const SITI={before:'list',enter:'drop',in:'home',after:'spark'};
const GRPI=[[/ส้วม|ขยะ/,'toilet'],[/ไฟ|พลังงาน/,'bolt'],[/บ้านเดี่ยว/,'home'],[/คอนโด/,'building'],[/สัตว์/,'paw'],[/เด็ก|ผู้สูงอายุ|ผู้ป่วย|ดูแลเพิ่ม/,'people'],[/ยา|ปฐมพยาบาล|สุขภาพ/,'cross'],[/น้ำ|อาหาร/,'drop'],[/เอกสาร|เคลม/,'doc'],[/เสื้อผ้า/,'shirt'],[/ตัดสินใจหนี/,'exit'],[/ขอความช่วยเหลือ/,'buoy'],[/ข่าว|แผน|ติดต่อ/,'signal'],[/จัดที่อยู่|ก่อนก้าว/,'home'],[/สวน/,'spark']];
function gIcon(g){for(const r of GRPI)if(r[0].test(g))return icon(r[1]);return icon('tool');}

/* ---------- small renderers ---------- */
// ids = แหล่งที่มา; opts.u = ข้อคิด (ไม่มีแหล่งตรง ๆ), opts.q = ปริมาณ
function chips(ids,opts){opts=opts||{};const by={};(ids||[]).forEach(id=>{const s=SRCM[id];if(!s)return;(by[s.sn]=by[s.sn]||[]).push(id);});
  let h='';if(opts.q)h+='<span class="q">'+opts.q+'</span>';
  Object.keys(by).forEach(sn=>{h+='<button type="button" class="src" data-srcs="'+by[sn].join(',')+'" aria-label="ดูแหล่งที่มา '+sn+'">'+sn+'</button>';});
  if(opts.u)h+='<span class="gen">ข้อคิด</span>';
  return h?'<div class="tags">'+h+'</div>':'';}
function rowHTML(i){const q=typeof i.q==='function'?i.q():i.q;
  return '<label class="row"><input type="checkbox" data-id="'+i.id+'"'+(S.done[i.id]?' checked':'')+'><span class="ck"></span><span class="tx"><span class="t">'+i.t+'</span>'+(i.n?'<span class="n">'+(i.u?'เพราะ: ':'')+i.n+'</span>':'')+chips(i.s,{u:i.u,q:q})+'</span></label>';}
function groupsHTML(items){const gs=[];items.forEach(i=>{if(!gs.includes(i.g))gs.push(i.g);});
  return gs.map(g=>{const a=items.filter(i=>i.g===g);const d=a.filter(i=>S.done[i.id]).length;
   return '<section class="grp"><div class="gh"><b>'+gIcon(g)+g+'</b><small>'+d+'/'+a.length+'</small></div><div class="card">'+a.map(rowHTML).join('')+'</div></section>';}).join('');}
function tintHTML(title,arr){return '<div class="tint" style="margin-top:18px"><h3>'+title+'</h3><ul>'+arr.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>';}
function profileHTML(){
 return '<div class="card pad form"><div><span class="lab">ที่อยู่อาศัย</span><div class="seg" id="kindSeg"><button type="button" data-k="house" aria-pressed="'+(S.kind==='house')+'">บ้าน</button><button type="button" data-k="condo" aria-pressed="'+(S.kind==='condo')+'">คอนโด / อพาร์ตเมนต์</button></div></div>'+
 '<div><span class="lab">จำนวนคนในบ้าน</span><div class="step"><button type="button" id="pMinus" aria-label="ลดจำนวนคน">−</button><output>'+S.people+'</output><button type="button" id="pPlus" aria-label="เพิ่มจำนวนคน">+</button></div></div>'+
 '<div><span class="lab">มีใครหรืออะไรที่ต้องดูแลเพิ่ม</span><div class="tg">'+REQ.map(r=>'<button type="button" data-req="'+r[0]+'" aria-pressed="'+!!S.req[r[0]]+'">'+r[1]+'</button>').join('')+'</div></div></div>';}
function hdHTML(ph){const p=PH[ph];const g=prog(ph);
 return '<div class="hd"><div class="ic"><svg viewBox="0 0 24 24"><path d="'+ICON[ph]+'"/></svg></div><div><div class="kick">ช่วง '+p.no+' · '+p.nm+'</div></div></div>'+
 '<h1 class="lt" style="margin-top:12px">'+p.h+'</h1><p class="sub">'+p.p+'</p>'+
 '<div class="prog"><div class="bar"><i id="pgBar" style="width:'+g.p+'%"></i></div><span id="pgTxt" class="mono">'+g.d+'/'+g.t+' ข้อ</span></div>';}

/* ---------- annual kit check ---------- */
const KIT_CHECK=['วันหมดอายุของน้ำ อาหาร และยา แล้วเปลี่ยนของที่ใกล้หมด','แบตเตอรี่ของไฟฉาย วิทยุ และพาวเวอร์แบงก์ (ชาร์จหรือเปลี่ยนถ่าน)','เอกสารและสำเนา ยังเป็นปัจจุบันไหม (ที่อยู่ กรมธรรม์ บัญชี)','เบอร์ฉุกเฉินและรายชื่อติดต่อ ยังใช้ได้ไหม (ตรวจกับเว็บหน่วยงาน)','คนในบ้านเปลี่ยนไหม (เด็กโตขึ้น ผู้สูงอายุ ยาใหม่ สัตว์เลี้ยง) และขนาดเสื้อผ้า รองเท้า'];
function kitHTML(){
 let st='<span class="chip no">ยังไม่เคยบันทึก</span>',sub='ควรตรวจอย่างน้อยปีละครั้ง';
 if(S.kit){const d=Math.floor((Date.now()-S.kit)/86400000);let dt='';try{dt=new Date(S.kit).toLocaleDateString('th-TH',{year:'numeric',month:'short',day:'numeric'});}catch(e){dt='';}
  if(d>=365){st='<span class="chip due">ครบปีแล้ว ควรตรวจ</span>';sub='ตรวจล่าสุด '+dt+' ('+d+' วันที่แล้ว)';}
  else{st='<span class="chip ok">ยังไม่ครบปี</span>';sub='ตรวจล่าสุด '+dt+' · อีก '+(365-d)+' วันถึงรอบถัดไป';}}
 return '<div class="card pad"><div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between"><b class="kit-h" style="font-size:17px">'+icon('calendar')+'ตรวจ kit ประจำปี</b>'+st+'</div><p class="n" style="margin-top:4px">'+sub+'</p><ul class="kl">'+KIT_CHECK.map(x=>'<li>'+x+'</li>').join('')+'</ul>'+chips([15])+'<div class="links"><button type="button" class="btn sm" id="kitBtn">บันทึกว่าตรวจแล้ววันนี้</button></div><p class="foot" style="margin-left:0">วันที่เก็บไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น</p></div>';}

/* ---------- lessons ---------- */
function lessonHTML(l,i){
 const fx=l.fx?FIX.find(x=>x.id===l.fx):null;
 return '<details class="fx" id="ls-'+l.id+'"><summary><span class="e">'+icon(LESI[l.id])+'</span><b>'+l.t+'</b></summary><div class="fxb">'+
  '<p class="lesp">'+l.p+'</p>'+
  '<div class="lb w"><h4>ควรระวัง</h4><ul>'+l.w.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>'+
  '<div class="lb d"><h4>ควรทำ</h4><ul>'+l.d.map(x=>'<li>'+x+'</li>').join('')+'</ul></div>'+
  '<div class="lb a"><h4>ถามตัวเอง</h4><p>'+l.a+'</p></div>'+
  chips(l.s,{u:!l.s.length})+
  (fx?'<div class="links" style="margin:0"><button type="button" class="btn soft sm" data-fix="'+fx.id+'">วิธีทำ: '+fx.n+'</button></div>':'')+
  '</div></details>';}

/* ---------- views ---------- */
function originalHomeView(){
 const cc={before:'blue',enter:'red',in:'orange',after:'green'};
 let h='<div class="kick">SERIES 01 · ฉบับร่าง v0.3</div><h1 class="lt" style="margin-top:4px">น้ำท่วม</h1><p class="sub">Survival Mode ซีรีส์ 01 — คู่มือเอาตัวรอดที่อ่านง่าย ทำตามได้จริง ไม่ผูกกับเหตุการณ์ใดเหตุการณ์หนึ่ง ใช้ซ้ำได้ทุกปี</p>';
 h+='<div class="gh"><b>'+icon('search')+'ตอนนี้คุณอยู่ตรงไหน?</b></div><div class="sit">'+Object.keys(SITS).map(k=>'<button type="button" data-s="'+k+'" aria-pressed="'+(S.sit===k)+'">'+icon(SITI[k])+'<b>'+SITS[k].b+'</b><span>'+SITS[k].s+'</span></button>').join('')+'</div>';
 if(S.sit){const s=SITS[S.sit],c=cc[S.sit];
  h+='<div class="now" style="--cc:var(--'+c+');--cc-t:var(--'+c+'-t);--cc-v:var(--'+c+'-v)"><h3>'+s.t+'</h3><ol>'+s.a.map(x=>'<li>'+x+'</li>').join('')+'</ol><div class="links">'+
   s.fx.map(id=>{const f=FIX.find(x=>x.id===id);return '<button type="button" class="btn soft sm" style="background:var(--cc-t);box-shadow:inset 0 0 0 1.5px var(--cc-v);color:var(--cc)" data-fix="'+id+'">'+f.n+'</button>';}).join('')+
   '<button type="button" class="btn sm" style="background:var(--cc-v);color:#fff" data-go="'+s.tab+'">'+s.go+'</button></div></div>';}
 h+='<div class="gh"><b>'+icon('phone')+'เบอร์ฉุกเฉิน</b><small>จดลงกระดาษด้วย</small></div><div class="card"><div class="sos">'+
  SOS.map((x,i)=>'<div><div class="num"><span class="ib">'+icon(SOSI[i])+'</span><span id="num'+i+'">'+x.n+'</span></div><div class="who">'+x.w+'</div><div class="acts"><button type="button" class="btn soft sm" data-copy="'+i+'">คัดลอก</button>'+chips(x.s).replace('<div class="tags">','<span class="tags" style="margin:0;display:contents">').replace(/<\/div>$/,'</span>')+(x.v?'<span class="gen">ตรวจก่อนใช้</span>':'')+'</div></div>').join('')+'</div></div>'+
  '<p class="foot">เบอร์โทรอาจเปลี่ยนได้ ควรตรวจกับเว็บหน่วยงานปีละครั้ง (ใช้ตัวช่วย “ตรวจ kit ประจำปี” ด้านล่าง) · จดไว้บนกระดาษและใส่ซองกันน้ำ เผื่อมือถือใช้ไม่ได้</p>';
 h+='<div class="gh"><b>'+icon('home')+'บ้านของคุณ</b><small>เลือกแล้วรายการจะปรับตาม</small></div>'+profileHTML();
 const ps=['p1','p2','p3'].map(prog);const D=ps.reduce((a,x)=>a+x.d,0),T=ps.reduce((a,x)=>a+x.t,0),P=T?Math.round(D/T*100):0;const C=2*Math.PI*64;
 h+='<div class="gh"><b>'+icon('shield')+'ความคืบหน้าเช็กลิสต์ของคุณ</b></div><div class="card pad big3"><div class="ring"><svg viewBox="0 0 150 150"><circle cx="75" cy="75" r="64" fill="none" stroke="var(--fill)" stroke-width="14"/><circle id="ringArc" cx="75" cy="75" r="64" fill="none" stroke="var(--blue-v)" stroke-width="14" stroke-linecap="round" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+(C*(1-P/100)).toFixed(1)+'"/></svg><div class="c"><div><b id="ringTxt">'+P+'%</b><span>ติ๊กแล้ว '+D+'/'+T+'</span></div></div></div><div class="mini">'+
  [['p1','ก่อนท่วม','blue'],['p2','ระหว่างท่วม','orange'],['p3','หลังน้ำลด','green']].map((m,i)=>'<div><b><span>'+m[1]+'</span><span class="mono">'+ps[i].p+'%</span></b><div class="bar"><i style="width:'+ps[i].p+'%;background:var(--'+m[2]+'-v)"></i></div></div>').join('')+'</div></div>';
 h+='<div class="gh"><b>'+icon('calendar')+'ตรวจ kit ประจำปี</b><small>เพื่อให้ของพร้อมใช้ทุกปี</small></div>'+kitHTML();
 h+='<div class="gh"><b>'+icon('spark')+'บทเรียนที่ต้องรู้</b><small>'+LESSONS.length+' เรื่อง</small></div><div>'+LESSONS.map(lessonHTML).join('')+'</div>'+
  '<p class="foot">ถอดจากรูปแบบปัญหาที่คนพูดถึงซ้ำ ๆ ในช่วงน้ำท่วมใหญ่ ไม่อ้างเหตุการณ์ วันที่ หรือตัวเลขของครั้งใดครั้งหนึ่ง ป้ายแหล่งคือข้อที่มีแหล่งรองรับ ป้าย “ข้อคิด” คือข้อที่มาจากเหตุผล</p>';
 h+='<div class="gh"><b>'+icon('buoy')+'ปัญหาที่เจอบ่อย → วิธีแก้</b><small>แตะเพื่อดูทีละขั้น</small></div><div class="card">'+
  PROBLEMS.map((s,i)=>'<button type="button" class="sig" data-fix="'+s[2]+'"><span class="rk">'+icon(FIXI[s[2]])+'</span><span><b>'+s[0]+'</b><span>'+s[1]+'</span></span><span class="go">›</span></button>').join('')+'</div>';
 h+='<div class="gh"><b>'+icon('doc')+'แหล่งที่มา</b><small>แหล่งอ้างอิงจากเอกสารที่รวบรวม</small></div><details class="fx"><summary><span class="e">'+SRC.length+'</span><b>ดูแหล่งข้อมูลทั้งหมด<small>แตะที่ป้ายแหล่งในแต่ละข้อเพื่อดูรายละเอียดเฉพาะแหล่งนั้น</small></b></summary><div>'+
  SRC.map(s=>'<div class="srcrow"><div class="id">['+s.id+']</div><div><div class="tt"><span class="lv '+s.l+'">'+LV[s.l]+'</span>'+s.t+'</div><div class="org">'+s.o+'</div>'+(s.u?'<a href="'+s.u+'" target="_blank" rel="noopener noreferrer">'+s.u+'</a>':'<span class="org">ไฟล์ PDF ที่ผู้จัดทำได้รับ</span>')+'</div></div>').join('')+'</div></details>'+
  '<p class="foot"><span class="lv gov">หน่วยงาน</span> เว็บหน่วยงานโดยตรง · <span class="lv guide">คู่มือ</span> คู่มือหน่วยงาน/สมาคมวิชาชีพ · <span class="lv">บล็อก</span> บล็อกเอกชน (ใช้น้อยที่สุด) · แหล่งต่างประเทศ (Ready.gov, Red Cross, CDC, FDA, NOAA, FEMA) ใช้เป็นหลักการ ไม่ใช่กฎหมายไทย</p>';
 h+='<div class="card pad" style="margin-top:24px"><p style="font-size:14px;color:var(--label2);line-height:1.6">คู่มือนี้รวบรวมเพื่อเตรียมความพร้อมทั่วไป ไม่ใช่คำสั่งอย่างเป็นทางการ ในสถานการณ์จริงให้ทำตามประกาศของหน่วยงานในพื้นที่ก่อนเสมอ · ป้ายชื่อแหล่ง = ข้อนั้นมีแหล่งรองรับ กดดูได้ · ป้าย “ข้อคิด” = ไม่มีมาตรฐานเขียนไว้ตรง ๆ แต่มีเหตุผลรองรับ ซึ่งเขียนไว้ใต้ข้อนั้น · เนื้อหาไม่ผูกกับเหตุการณ์ใด จึงใช้ซ้ำได้ แต่เบอร์โทรและแหล่งอ้างอิงควรทบทวนปีละครั้ง · ข้อที่ติ๊กเก็บไว้ในเบราว์เซอร์เครื่องนี้เท่านั้น</p><div id="resetBox" style="margin-top:12px"><button type="button" class="btn line sm" id="resetBtn">ล้างข้อมูลที่ติ๊กไว้</button></div></div>';
 return h;}

function phaseView(ph){
 const p=PH[ph];let h=hdHTML(ph);
 if(ph==='p1'){
  h+=tintHTML('สรุป 1 นาที',p.sum);
  h+=groupsHTML(list(1));
  h+='<div class="links" style="margin-top:18px"><button type="button" class="btn" data-bag="1">เปิดรายการถุงยังชีพ</button></div>';
 }else if(ph==='p2'){
  h+='<div class="seg" style="margin-top:18px"><button type="button" data-sub="do" aria-pressed="'+(S.sub==='do')+'">ต้องทำระหว่างท่วม</button><button type="button" data-sub="bag" aria-pressed="'+(S.sub==='bag')+'">ถุงยังชีพ (Go-Bag)</button></div>';
  if(S.sub==='do'){
   h+=tintHTML('สรุป 1 นาที',p.sum);
   const items=list(2,i=>!i.bag);const gs=groupsHTML(items);
   h+=gs;
   h=h.replace(/(<b>จัดที่อยู่ในบ้านหรือห้อง<\/b><small>[^<]*<\/small><\/div>)/,'$1<div class="card" style="margin-bottom:10px">'+ZONES.map(z=>'<div class="zone"><div class="z">'+z[0]+'</div><div><b>'+z[1]+'</b><p>'+z[2]+'</p></div></div>').join('')+'</div>');
  }else{h+=bagView();}
 }else{
  h+=tintHTML('สรุป 1 นาที',p.sum);
  h+=groupsHTML(list(3));
  h+='<section class="grp"><div class="gh"><b>'+icon('tool')+'วัสดุแห้งนานแค่ไหน</b><small>คู่มือ 2554</small></div><div class="card">'+MAT.map(m=>'<div class="info"><b>'+m[0]+'</b><span>'+m[1]+'</span>'+chips(m[2])+'</div>').join('')+'</div></section>';
  h+='<section class="grp"><div class="gh"><b>'+icon('cross')+'โรคและอาการที่ควรเฝ้าระวัง</b><small>ไม่ใช่การวินิจฉัย</small></div><div class="card">'+DZ.map(d=>'<div class="info"><b>'+d[0]+'</b><span><b style="font-size:14px;color:var(--label2)">อาการ:</b> '+d[1]+'</span><span><b style="font-size:14px;color:var(--label2)">ควรทำ:</b> '+d[2]+'</span>'+chips(d[3])+'</div>').join('')+'</div><p class="foot">สรุปจากคู่มือประชาชนป้องกันโรคที่มากับน้ำท่วม และ CDC หากมีอาการรุนแรงให้ไปพบแพทย์หรือโทร 1669</p></section>';
 }
 return h;}

function bagView(){
 const P=S.people,D=S.days;
 let h='<div class="tint" style="margin-top:18px"><h3>เตรียมของแยกเป็น 3 ส่วน</h3><ul><li><b>ถุงหนี</b> — หิ้วออกได้ทันที ใช้ตอนต้องไป</li><li><b>คลังอยู่บ้าน</b> — ของที่ตั้งไว้ชั้นสูง ใช้ตอนอยู่ต่อ (3, 7 หรือ 14 วัน)</li><li><b>ของเฉพาะคน</b> — เด็ก ผู้สูงอายุ ผู้ป่วย สัตว์เลี้ยง ยาประจำ</li></ul></div>';
 h+='<div class="card pad" style="margin-top:14px"><span class="lab">วางแผนของสำรองรวมกี่วัน</span><div class="seg">'+[[3,'3 วัน'],[7,'7 วัน'],[14,'14 วัน']].map(d=>'<button type="button" data-days="'+d[0]+'" aria-pressed="'+(D===d[0])+'">'+d[1]+'</button>').join('')+'</div>'+
  '<div class="stats"><div><b>'+(4*P*D)+'<small>ลิตร</small></b><span>น้ำดื่มและใช้จำเป็น (4 ลิตร × '+P+' คน × '+D+' วัน) ≈ '+Math.ceil(4*P*D/1.5)+' ขวด 1.5 ลิตร</span></div><div><b>'+(3*P*D)+'<small>มื้อ</small></b><span>อาหารแห้ง/กระป๋อง (ประมาณ 3 มื้อ × '+P+' คน × '+D+' วัน)</span></div><div><b>'+P+'<small>ใบ</small></b><span>กระเป๋าฉุกเฉิน 1 ใบต่อคน</span></div></div>'+
  chips([15,16])+'<p class="foot" style="margin-left:0">ตัวเลขด้านบนคือของสำรองรวม ไม่ใช่น้ำหนักที่ต้องใส่กระเป๋าใบเดียว ควรวางแผนของที่พกและแหล่งรับของเพิ่มแยกกัน · ที่มาของตัวเลข: Ready.gov และ Red Cross ใช้น้ำ 1 แกลลอน (ราว 4 ลิตร) ต่อคนต่อวัน Red Cross แนะนำชุดอพยพ 3 วัน และชุดอยู่บ้าน 2 สัปดาห์ ส่วนจำนวนมื้อ (3 มื้อต่อคนต่อวัน) เป็นการประมาณง่าย ๆ ของเราเอง · ถ้าที่เก็บไม่พอ ให้เริ่มที่ 3 วัน แล้วเพิ่มทีละสัปดาห์</p></div>';
 const sec=[['go','ถุงหนี','หิ้วออกได้ทันที ใส่ถุงซิปแยกเป็นหมวด'],['home','คลังอยู่บ้าน','ตั้งไว้ที่สูง เก็บในกล่องปิดสนิท'],['who','ของเฉพาะคน','ปรับสมาชิกที่ต้องดูแลได้ด้านบน']];
 sec.forEach(s=>{const items=list(2,i=>i.bag===s[0]);
  h+='<div class="gh" style="margin-top:34px"><b style="font-size:24px">'+icon({go:'bag',home:'home',who:'people'}[s[0]])+s[1]+'</b><small>'+s[2]+'</small></div>';
  h+=items.length?groupsHTML(items):'<div class="card empty">ยังไม่ได้เลือกสมาชิกที่ต้องดูแลเพิ่ม ปรับได้ในส่วน “บ้านและคนของคุณ” ด้านบน</div>';});
 return h;}

function fixView(){
 let h='<h1 class="lt">แก้ปัญหา</h1><p class="sub">เลือกเรื่องที่คุณกำลังเจอ ทำทีละขั้น ภาษาง่าย ๆ เรียงจากเรื่องเร่งด่วนต่อชีวิตก่อน</p><div class="links" style="margin-top:14px"><span class="gen" style="background:var(--red-t);color:var(--red)">เร่งด่วน = เกี่ยวกับชีวิต</span><span class="gen">ข้อคิด = ไม่มีมาตรฐานเขียนไว้ตรง ๆ แต่มีเหตุผลรองรับ (อ่านใต้ข้อ)</span></div><div style="margin-top:18px">';
 FIX.forEach((f,i)=>{const open=S.openFix===f.id;
  h+='<details class="fx'+(f.urgent?' urgent':'')+'" id="fx-'+f.id+'"'+(open?' open':'')+'><summary><span class="e">'+icon(FIXI[f.id])+'</span><b>'+f.q+'<small>'+f.n+(f.urgent?' · เร่งด่วน':'')+'</small></b></summary><div class="fxb">'+
   '<div class="sigbox"><b>ทำไมต้องรู้:</b> '+f.why+'</div>'+
   '<ol class="steps">'+f.st.map(s=>'<li>'+s[0]+(s[3]?'<span class="why">เพราะ: '+s[3]+'</span>':'')+chips(s[1],{u:s[2]})+'</li>').join('')+'</ol>'+
   (f.info?f.info.map(x=>'<div class="sigbox"><b>ข้อควรรู้</b><br>'+x+'</div>').join(''):'')+
   (f.dont&&f.dont.length?'<div class="dont"><h4>อย่าทำ</h4><ul>'+f.dont.map(x=>'<li>'+x+'</li>').join('')+'</ul>'+chips(f.ds)+'</div>':'')+
   (f.need&&f.need.length?'<div><h4 class="s">ของที่ต้องใช้</h4><div class="need">'+f.need.map(x=>'<span>'+x+'</span>').join('')+'</div></div>':'')+
   (f.call?'<div class="sigbox" style="background:var(--indigo-t);color:var(--label)"><b style="color:var(--indigo)">โทร:</b> '+f.call+'</div>':'')+
   (f.tab?'<div class="links" style="margin:0"><button type="button" class="btn sm" data-go="'+f.tab+'">เปิดรายการ “หลังน้ำลด”</button></div>':'')+
   '</div></details>';});
 return h+'</div>';}

function homeView(){
 const original=originalHomeView();
 const start=original.indexOf('<div class="gh">');
 const old=original.slice(start);
 const cut=old.indexOf('<div class="gh"><b>'+icon('phone'));
 const situation=old.slice(0,cut);
 const remaining=old.slice(cut);
 return `<div class="chapter"><span>THE SURVIVAL SERIES</span><span>01 / น้ำท่วม</span></div>
 <section class="intro"><div><div class="eyebrow">เตรียมไว้ อุ่นใจกว่า</div><h1>น้ำท่วมรับมือได้<br><em>เริ่มจากความพร้อม</em></h1><p>คู่มือสำหรับทุกบ้าน ตั้งแต่เตรียมของจำเป็น<br class="desktop-break"> ไปจนถึงกลับบ้านอย่างปลอดภัย ค่อย ๆ ทำไปด้วยกัน</p><div class="intro-actions"><button class="btn" data-go="p1">เริ่มเช็กลิสต์เตรียมพร้อม</button><button class="btn line" data-bag="1">จัดกระเป๋าฉุกเฉิน</button></div></div><aside class="field-note"><span class="note-label">จำไว้ก่อนเสมอ</span><div class="note-icon">${icon('shield')}</div><h2>คนปลอดภัย<br>สำคัญกว่าสิ่งของ</h2><p>อย่าเดินหรือขับรถฝ่าน้ำท่วม<br>ติดตามคำสั่งอพยพจากหน่วยงานในพื้นที่</p><a href="https://www.ready.gov/floods" target="_blank" rel="noopener noreferrer">คำแนะนำจาก Ready.gov</a></aside></section>
 <section class="situation-panel">${situation}</section>
 <div class="route-heading"><div class="eyebrow">ทีละขั้น ทีละช่วง</div><h2>คู่มือที่ใช้ได้ตลอดสถานการณ์</h2></div>
 <div class="phase-grid">${[['p1','01','ก่อนน้ำมา','เตรียมบ้าน เตรียมคน เตรียมของ','list'],['p2','02','เมื่อน้ำท่วม','อยู่ให้ปลอดภัย พร้อมอพยพ','drop'],['p3','03','หลังน้ำลด','กลับบ้านและฟื้นฟูอย่างระวัง','home']].map(x=>`<button class="phase-card ${x[0]}" data-go="${x[0]}"><div><span class="phase-no">${x[1]}</span>${icon(x[4])}</div><h3>${x[2]}</h3><p>${x[3]}</p><span class="phase-link">เปิดเช็กลิสต์</span></button>`).join('')}</div>
 <div class="home-content">${remaining}</div><footer><b>Survival Kit</b><span>ความรู้เล็ก ๆ เพื่อความพร้อมที่มากขึ้น</span><p>ซีรีส์ 01 น้ำท่วม · เรื่องการรับมือภัยอื่น ๆ จะตามมา</p></footer>`;
}

/* ---------- render / nav ---------- */
function render(){
 document.body.dataset.tab=S.tab;
 document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.t===S.tab)));
 const v=$('view');v.style.zoom=S.z;$('zBtn').textContent=S.z===1?'Aa':S.z===1.15?'Aa+':'Aa++';
 v.innerHTML='<div class="view">'+(S.tab==='home'?homeView():S.tab==='fix'?fixView():phaseView(S.tab))+'</div>';
 save();}
function go(tab,top){S.tab=tab;render();if(top!==false)window.scrollTo({top:0});}
function openSheet(ids){
 const s=ids.map(id=>SRCM[id]).filter(Boolean);
 $('sheet').innerHTML='<div class="grab"></div><h3>แหล่งที่มา</h3>'+s.map(x=>'<div style="padding:12px 0;border-top:.5px solid var(--sep)"><div style="font-size:13px"><span class="lv '+x.l+'">'+LV[x.l]+'</span></div><div style="font-weight:600;line-height:1.45;margin-top:4px">'+x.t+'</div><div style="font-size:14px;color:var(--label2)">'+x.o+'</div>'+
  (x.l==='media'?'<div style="font-size:13px;color:var(--orange);margin-top:4px">บล็อกเอกชน — ใช้ประกอบเท่านั้น</div>':'')+
  (/สหรัฐ|US |อเมริกัน/.test(x.o)?'<div style="font-size:13px;color:var(--indigo);margin-top:4px">แหล่งต่างประเทศ — ใช้เป็นหลักการ ไม่ใช่กฎหมายไทย</div>':'')+
  (x.u?'<div style="margin-top:8px"><a class="btn sm" style="text-decoration:none" href="'+x.u+'" target="_blank" rel="noopener noreferrer">เปิดเว็บไซต์ต้นทาง</a></div><div style="font-size:12px;color:var(--label2);margin-top:6px;overflow-wrap:anywhere">'+x.u+'</div>':'<div style="font-size:13px;color:var(--label2);margin-top:6px">ไฟล์ PDF ที่ผู้จัดทำได้รับ (ไม่มีลิงก์ออนไลน์)</div>')+'</div>').join('')+
  '<div style="margin-top:8px"><button type="button" class="btn soft" data-close="1" style="width:100%">ปิด</button></div>';
 $('bd').classList.add('on');$('sheet').classList.add('on');}
function openSos(){
 $('sheet').innerHTML='<div class="grab"></div><h3 style="color:var(--red)">ฉุกเฉิน — โทรตรงนี้</h3><p style="font-size:14px;color:var(--label2)">แตะหมายเลขเพื่อโทร หรือคัดลอกเก็บไว้</p>'+
  SOS.map((x,i)=>'<div style="padding:12px 0;border-top:.5px solid var(--sep);display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center"><div><div class="mono" style="font-size:26px;font-weight:700;display:flex;align-items:center;gap:10px"><span class="ib" style="width:34px;height:34px;border-radius:50%;background:var(--red-t);color:var(--red);display:grid;place-items:center;flex:none">'+icon(SOSI[i])+'</span><span id="snum'+i+'" style="user-select:all">'+x.n.split(' / ').map(n=>'<a href="tel:'+n+'">'+n+'</a>').join(' / ')+'</span></div><div style="font-size:14px;color:var(--label2);line-height:1.4">'+x.w+'</div></div><button type="button" class="btn soft sm" style="background:var(--red-t);color:var(--red)" data-copy="'+i+'">คัดลอก</button></div>').join('')+
  '<p style="font-size:13px;color:var(--label2);margin-top:10px;line-height:1.5">เมื่อโทร ให้บอก ชื่อ เบอร์ ที่อยู่/ซอย จำนวนคน และมีเด็ก คนแก่ ผู้ป่วยไหม · โทรไม่ติดให้ลองใหม่และส่งข้อความผ่าน LINE @1784DDPM · เบอร์อาจเปลี่ยน ตรวจกับหน่วยงานปีละครั้ง</p><div style="margin-top:8px"><button type="button" class="btn soft" data-close="1" style="width:100%">ปิด</button></div>';
 $('bd').classList.add('on');$('sheet').classList.add('on');}
function closeSheet(){$('bd').classList.remove('on');$('sheet').classList.remove('on');}
function updateProgressUI(){
 const ph=S.tab;if(['p1','p2','p3'].includes(ph)){const g=prog(ph);const b=$('pgBar'),t=$('pgTxt');if(b)b.style.width=g.p+'%';if(t)t.textContent=g.d+'/'+g.t+' ข้อ';}}

/* ---------- events ---------- */
document.addEventListener('click',e=>{
 const t=e.target.closest('button');if(!t)return;
 if(t.classList.contains('tab')){go(t.dataset.t);return;}
 if(t.dataset.s){S.sit=t.dataset.s;go(t.dataset.s==='enter'?'urgent':SITS[t.dataset.s].tab);return;}
 if(t.dataset.go){go(t.dataset.go);return;}
 if(t.dataset.bag){go('bag');return;}
 if(t.dataset.sub){S.sub=t.dataset.sub;render();return;}
 if(t.dataset.fix){S.openFix=t.dataset.fix;go('fix',false);const el=$('fx-'+t.dataset.fix);if(el)el.scrollIntoView({block:'start'});S.openFix=null;return;}
 if(t.dataset.srcs){openSheet(t.dataset.srcs.split(',').map(Number));return;}
 if(t.dataset.close){closeSheet();return;}
 if(t.dataset.sos){openSos();return;}
 if(t.dataset.z){S.z=S.z===1?1.15:S.z===1.15?1.3:1;render();return;}
 if(t.dataset.k){S.kind=t.dataset.k;render();return;}
 if(t.id==='pMinus'){S.people=Math.max(1,S.people-1);render();return;}
 if(t.id==='pPlus'){S.people=Math.min(20,S.people+1);render();return;}
 if(t.dataset.req){S.req[t.dataset.req]=!S.req[t.dataset.req];render();return;}
 if(t.dataset.days){S.days=+t.dataset.days;render();return;}
 if(t.id==='kitBtn'){S.kit=Date.now();render();toast('บันทึกวันที่ตรวจ kit แล้ว');return;}
 if(t.dataset.copy!==undefined){const i=+t.dataset.copy,txt=SOS[i].n,node=$('num'+i)||$('snum'+i);
  const fb=()=>{try{const r=document.createRange();r.selectNodeContents(node);const s=window.getSelection();s.removeAllRanges();s.addRange(r);}catch(x){}toast('เลือกเบอร์แล้ว กดคัดลอกจากเมนูเครื่อง');};
  try{navigator.clipboard.writeText(txt).then(()=>toast('คัดลอก '+txt+' แล้ว'),fb);}catch(x){fb();}return;}
 if(t.id==='resetBtn'){$('resetBox').innerHTML='<span style="font-size:14px;margin-right:8px">ลบรายการที่ติ๊กทั้งหมด?</span><button type="button" class="btn red sm" id="resetYes">ยืนยัน</button> <button type="button" class="btn soft sm" id="resetNo">ยกเลิก</button>';return;}
 if(t.id==='resetNo'){$('resetBox').innerHTML='<button type="button" class="btn line sm" id="resetBtn">ล้างข้อมูลที่ติ๊กไว้</button>';return;}
 if(t.id==='resetYes'){S.done={};render();toast('ล้างข้อมูลแล้ว');return;}
});
$('bd').addEventListener('click',closeSheet);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet();});
document.addEventListener('change',e=>{
 const c=e.target;if(!c.matches('input[data-id]'))return;
 if(c.checked)S.done[c.dataset.id]=1;else delete S.done[c.dataset.id];save();updateProgressUI();
 const g=c.closest('.grp');if(g){const all=g.querySelectorAll('input[data-id]');const d=[...all].filter(x=>x.checked).length;const sm=g.querySelector('.gh small');if(sm)sm.textContent=d+'/'+all.length;}
});

let sheetTrigger=null;
const baseSos=openSos,baseSource=openSheet,baseClose=closeSheet;
function focusSheet(){document.body.style.overflow='hidden';$('sheet').querySelector('a,button')?.focus();}
openSos=function(){sheetTrigger=document.activeElement;baseSos();$('sheet').setAttribute('aria-label','เบอร์ฉุกเฉิน');focusSheet();};
openSheet=function(ids){sheetTrigger=document.activeElement;baseSource(ids);$('sheet').setAttribute('aria-label','แหล่งที่มา');focusSheet();};
closeSheet=function(){baseClose();document.body.style.overflow='';sheetTrigger?.focus();};
document.addEventListener('keydown',e=>{if(e.key!=='Tab'||!$('sheet').classList.contains('on'))return;const f=[...$('sheet').querySelectorAll('a,button')];if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f.at(-1).focus();}else if(!e.shiftKey&&document.activeElement===f.at(-1)){e.preventDefault();f[0].focus();}});
/* ---------- init ---------- */
load();
