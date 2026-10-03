// One illustrated visual language across the existing guide, without adding navigation steps.
function storyImage(key,alt,cls='story-image'){return `<img class="${cls}" src="assets/bkk2026-${key}.webp" width="900" height="600" alt="${alt}" loading="lazy" decoding="async">`;}
const oldHomeIllustrated=homeView;
homeView=function(){return oldHomeIllustrated().replace(/assets\/(before|enter|in|after)\.webp/g,'assets/bkk2026-$1.webp');};
const oldGuideIllustrated=guideView;
guideView=function(){let h=oldGuideIllustrated();const a={p1:['before','เตรียมตัวก่อนน้ำมา'],p2:['in','ครอบครัวอยู่ในพื้นที่แห้งระหว่างน้ำท่วม'],p3:['after','ฟื้นฟูบ้านหลังน้ำลด']};for(const [id,[key,alt]]of Object.entries(a)){h=h.replace(`<button data-go="${id}"><span>`,`<button class="illustrated-guide-link" data-go="${id}">${storyImage(key,alt,'guide-thumb')}<span>`);}return h;};
const oldPhaseIllustrated=phaseView;
phaseView=function(ph){let h=oldPhaseIllustrated(ph);const key={p1:'before',p2:'in',p3:'after'}[ph];h=h.replace('<section class="first-actions">',`<figure class="chapter-scene">${storyImage(key,'ภาพประกอบ'+PH[ph].nm)}</figure><section class="first-actions">`);return h;};
const oldGroupsIllustrated=groupsHTML;
groupsHTML=function(items){let h=oldGroupsIllustrated(items);const groups=[...new Set(items.map(i=>i.g))];const used=new Set();for(const g of groups){let key='';if(S.tab==='p1'&&/ข่าว|แผน|ติดต่อ/.test(g))key='plan';if(S.tab==='p2'&&/น้ำดื่มและอาหาร/.test(g))key='food';if(S.tab==='p2'&&/ส้วมและความสะอาด/.test(g))key='hygiene';if(!key||used.has(key))continue;used.add(key);const id='group-'+hash(S.tab+g);const start=h.indexOf(`id="${id}"`);const target=h.indexOf('<div class="card">',start);if(target>=0)h=h.slice(0,target)+`<div class="topic-scene">${storyImage(key,'ภาพประกอบ'+g)}</div>`+h.slice(target);}return h;};
const oldBagIllustrated=bagView;
bagView=function(){let h=oldBagIllustrated();for(const [label,key] of [['ถุงหนี','go'],['คลังอยู่บ้าน','home-stock'],['ของเฉพาะคน','personal']]){const needle=label+'</b>';const sectionStart=h.indexOf('<div class="gh" style="margin-top:34px');const start=h.indexOf(needle,sectionStart);if(start<0)continue;const end=h.indexOf('</div>',start)+6;h=h.slice(0,end)+`<figure class="kit-section-scene">${storyImage(key,'ภาพประกอบ'+cleanText(label))}</figure>`+h.slice(end);}return h;};
const oldKitIllustrated=kitView;
kitView=function(){return oldKitIllustrated().replace('assets/kit.webp','assets/bkk2026-kit.webp');};
const oldMineIllustrated=mineView;
mineView=function(){return oldMineIllustrated().replace('<div class="my-lists">',`<div class="personal-scene">${storyImage('plan','ครอบครัวทบทวนแผนและรายการเตรียมพร้อม')}<p>ค่อย ๆ เตรียมไปด้วยกัน<br><span>กลับมาเช็กสิ่งที่ยังเหลือได้ทุกเมื่อ</span></p></div><div class="my-lists">`);};
const oldUrgentIllustrated=urgentView;
urgentView=function(){return oldUrgentIllustrated().replace('<section class="urgent-steps">',`<figure class="urgent-scene">${storyImage('enter','ครอบครัวรอในพื้นที่แห้งพร้อมกระเป๋าฉุกเฉิน')}</figure><section class="urgent-steps">`);};
const oldFixIllustrated=fixView;
fixView=function(){let h=oldFixIllustrated();const mapping={enter:'enter',leave:'go',elec:'enter',power:'home-stock',toilet:'hygiene',food:'food',pump:'after',stuck:'in',waste:'hygiene',move:'personal',car:'plan',phone:'go',claim:'plan',back:'after'};for(const [id,key]of Object.entries(mapping)){const start=h.indexOf(`id="fx-${id}"`);if(start<0)continue;const target=h.indexOf('<div class="fxb">',start)+17;if(target>=17)h=h.slice(0,target)+storyImage(key,'ภาพประกอบหัวข้อ '+FIX.find(f=>f.id===id).n,'fix-scene')+h.slice(target);}return h;};
render();
