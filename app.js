document.documentElement.classList.add('js');
const menu=document.querySelector('.menu'),nav=document.querySelector('#navigation');
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}});
const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('visible');observer.unobserve(item.target)}}),{threshold:.07});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll('[data-category]').forEach(x=>{x.hidden=b.dataset.filter!=='all'&&x.dataset.category!==b.dataset.filter;if(!x.hidden)x.classList.add('visible')})}));
const dialog=document.querySelector('#lightbox');document.querySelectorAll('[data-photo]').forEach(b=>b.addEventListener('click',()=>{dialog.querySelector('img').src=b.dataset.photo;dialog.querySelector('img').alt=b.dataset.caption;dialog.querySelector('p').textContent=b.dataset.caption;dialog.showModal()}));dialog.querySelector('button').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const form=document.querySelector('#contact-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);const body=`Nom : ${d.get('nom')}\nE-mail : ${d.get('email')}\nTéléphone : ${d.get('telephone')}\n\n${d.get('message')}`;window.location.href=`mailto:guerrin.b@wanadoo.fr?subject=${encodeURIComponent('Demande '+d.get('sujet'))}&body=${encodeURIComponent(body)}`;document.querySelector('#form-status').textContent='Votre demande a été préparée. Envoyez-la depuis votre messagerie. Si elle ne s’ouvre pas, écrivez directement à guerrin.b@wanadoo.fr.'});

// A bounded offset keeps the photograph inside its diagonal mask.
const parallaxMedia=document.querySelector('[data-parallax]');
if(parallaxMedia){
 const motion=window.matchMedia('(prefers-reduced-motion: reduce)');let parallaxPending=false;
 const updateParallax=()=>{parallaxPending=false;if(motion.matches){parallaxMedia.style.removeProperty('--parallax-y');return}const r=parallaxMedia.getBoundingClientRect();const vh=window.innerHeight;if(r.bottom<0||r.top>vh)return;const progress=Math.max(-1,Math.min(1,(vh/2-r.top-r.height/2)/(vh/2+r.height/2)));const amplitude=Math.min(45,r.height*.12);parallaxMedia.style.setProperty('--parallax-y',`${(progress*amplitude).toFixed(2)}px`)};
 const scheduleParallax=()=>{if(!parallaxPending){parallaxPending=true;requestAnimationFrame(updateParallax)}};
 window.addEventListener('scroll',scheduleParallax,{passive:true});window.addEventListener('resize',scheduleParallax);motion.addEventListener('change',scheduleParallax);scheduleParallax();
}
