(function(){
  function setLang(lang){
    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('fp_lang', lang);
    document.querySelectorAll('.langswitch button').forEach(b=>{
      b.classList.toggle('active', b.dataset.lang===lang);
    });
  }
  const saved = localStorage.getItem('fp_lang') || 'en';
  setLang(saved);
  document.querySelectorAll('.langswitch button').forEach(b=>{
    b.addEventListener('click', ()=>setLang(b.dataset.lang));
  });
  const modal = document.getElementById('leave-modal');
  const msg = document.getElementById('leave-url');
  const titleNode = document.getElementById('leave-title');
  let href = null;
  function show(h){ href=h; msg.textContent=h; modal.style.display='flex';
    const lang = document.documentElement.getAttribute('data-lang');
    titleNode.textContent = (lang==='zh') ? '離開本網站' : 'Leaving this website';
  }
  function hide(){ modal.style.display='none'; href=null; }
  document.querySelectorAll('a[target="_blank"], a.external').forEach(a=>{
    a.setAttribute('rel','noopener noreferrer');
    a.addEventListener('click', function(e){
      const url = this.getAttribute('href');
      if(url && !url.startsWith('#')){ e.preventDefault(); show(url); }
    });
  });
  document.getElementById('cancel-leave')?.addEventListener('click', hide);
  document.getElementById('confirm-leave')?.addEventListener('click', function(){ if(href) window.open(href,'_blank'); hide(); });
})();

// Tabs for partners page
(function(){
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tabpane');
  if(!tabs.length) return;
  function activate(id){
    tabs.forEach(t=>{const on=t.id===('tab-'+id); t.classList.toggle('active', on); t.setAttribute('aria-selected', on);});
    panes.forEach(p=>p.classList.toggle('active', p.id===('pane-'+id)));
  }
  tabs.forEach(t=>t.addEventListener('click', ()=>{ const id=t.id.replace('tab-',''); activate(id); }));
})();

/* Tabs for partners page + hash routing */
(function () {
  const tabs  = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.tabpane');
  if (!tabs.length) return;

  function activate(id) {
    tabs.forEach(t => {
      const on = t.id === ('tab-' + id);
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
    });
    panes.forEach(p => p.classList.toggle('active', p.id === ('pane-' + id)));
  }

  // Click behavior
  tabs.forEach(t => t.addEventListener('click', () => {
    const id = t.id.replace('tab-', '');
    // Update hash without scrolling jump
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    } else {
      location.hash = '#' + id;
    }
    activate(id);
  }));

  // --- NEW: read hash on load & on change ---
  function fromHash() {
    const h = (location.hash || '').replace('#', '').toLowerCase();
    if (['life','gi','mpf','inv'].includes(h)) activate(h);
    else activate('life'); // default
  }
  window.addEventListener('hashchange', fromHash);
  document.addEventListener('DOMContentLoaded', fromHash);
  // Also run immediately (in case this script is at end of body)
  fromHash();
})();
