(function(){
  'use strict';
  const registry=[];
  const $=id=>document.getElementById(id);
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const uid=()=>`wu_${Math.random().toString(36).slice(2,9)}`;
  function register(category,icon,title,description,build){registry.push({category,icon,title,description,build});}
  function render(){
    const grid=$('toolGrid'); const groups={};
    registry.forEach(t=>(groups[t.category]??=[]).push(t));
    grid.innerHTML='';
    Object.entries(groups).forEach(([category,tools])=>{
      const group=document.createElement('section'); group.className='category';
      group.innerHTML=`<div class="categoryHead"><span>${esc(category)}</span><span class="categoryCount">${tools.length}</span></div>`;
      const wrap=document.createElement('div'); wrap.className='toolGrid';
      tools.forEach(t=>{
        const card=document.createElement('article'); card.className='tool section'; card.dataset.search=(t.title+' '+t.description+' '+t.category).toLowerCase();
        card.innerHTML=`<div class="head"><span class="ico">${t.icon}</span><div class="titleWrap"><span class="title">${esc(t.title)}</span><span class="desc">${esc(t.description)}</span></div><button class="btn collapse" aria-label="Minimize ${esc(t.title)}"></button></div><div class="body"></div>`;
        t.build(card.querySelector('.body'),{esc,$,uid,notify});
        wrap.appendChild(card);
      });
      group.appendChild(wrap); grid.appendChild(group);
    });
    bindCollapse(); filterTools();
  }
  function bindCollapse(){document.querySelectorAll('.collapse').forEach(b=>b.onclick=()=>{const s=b.closest('.section');s.classList.toggle('min');b.setAttribute('aria-expanded',String(!s.classList.contains('min')))});}
  function notify(msg,type='ok'){const n=$('notice');n.textContent=msg;n.dataset.type=type;n.classList.add('show');clearTimeout(notify.t);notify.t=setTimeout(()=>n.classList.remove('show'),2200)}
  function filterTools(){const q=($('toolSearch')?.value||'').trim().toLowerCase();document.querySelectorAll('.tool').forEach(x=>x.hidden=!!q&&!x.dataset.search.includes(q));document.querySelectorAll('.category').forEach(g=>g.hidden=[...g.querySelectorAll('.tool')].every(x=>x.hidden));}
  function copy(value){navigator.clipboard?.writeText(String(value)).then(()=>notify('Copied to clipboard')).catch(()=>notify('Clipboard permission was not available','error'));}
  function download(name,text,type='text/plain'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
  window.WebUtil={register,render,$,esc,uid,notify,copy,download};
  window.addEventListener('DOMContentLoaded',()=>{
    $('toolSearch').addEventListener('input',filterTools);
    $('minAll').onclick=()=>document.querySelectorAll('.section').forEach(s=>s.classList.add('min'));
    $('maxAll').onclick=()=>document.querySelectorAll('.section').forEach(s=>s.classList.remove('min'));
    $('clearAll').onclick=()=>{document.querySelectorAll('input,textarea,select').forEach(e=>{if(e.type!=='button'&&e.id!=='toolSearch')e.value=e.defaultValue||''});notify('Inputs cleared')};
  });
  window.addEventListener('load',render);
})();
