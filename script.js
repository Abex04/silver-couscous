// Maraki — Minimal interactivity

document.addEventListener('DOMContentLoaded',function(){
  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const mobileNav = document.getElementById('mobileNav');
  function toggleMobileNav(open){
    const isOpen = typeof open === 'boolean' ? open : mobileNav.getAttribute('aria-hidden') === 'true';
    if(isOpen){
      mobileNav.setAttribute('aria-hidden','false');
      navToggle.setAttribute('aria-expanded','true');
      document.documentElement.style.overflow = 'hidden';
    } else {
      mobileNav.setAttribute('aria-hidden','true');
      navToggle.setAttribute('aria-expanded','false');
      document.documentElement.style.overflow = '';
    }
  }
  navToggle && navToggle.addEventListener('click',()=> toggleMobileNav());
  // close mobile nav on link click
  document.querySelectorAll('.mobile-nav-inner a').forEach(a=>a.addEventListener('click',()=> toggleMobileNav(false)));

  // Sticky header shadow on scroll
  const header = document.querySelector('.site-header');
  const topOffset = 20;
  const onScroll = ()=>{
    if(window.scrollY > topOffset) header.classList.add('sticky');
    else header.classList.remove('sticky');
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href = this.getAttribute('href');
      if(href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('[data-reveal], .section-title, .service-card, .price-card, .icon-card').forEach(el=>observer.observe(el));

  // close mobile nav on escape
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') toggleMobileNav(false); });

  // subtle parallax / tilt for hero illustration
  (function(){
    const hero = document.querySelector('.hero-illustration');
    if(!hero) return;
    // respect reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce) return;

    const rect = () => hero.getBoundingClientRect();
    function onMove(e){
      const r = rect();
      const x = (e.clientX - (r.left + r.width/2)) / (r.width/2);
      const y = (e.clientY - (r.top + r.height/2)) / (r.height/2);
      const tx = (x * 6).toFixed(2);
      const ty = (-y * 4).toFixed(2);
      hero.style.setProperty('--tx', `${tx}deg`);
      hero.style.setProperty('--ty', `${ty}deg`);
    }
    function reset(){ hero.style.setProperty('--tx','0deg'); hero.style.setProperty('--ty','0deg'); }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', reset);
    // touch friendly: gentle parallax on tilt (deviceorientation could be added later)
  })();

  // No lightbox initialization needed

  // Simple testimonial slider with accessibility improvements
  (function(){
    const slider = document.getElementById('testimonialSlider');
    if(!slider) return;
    const slides = Array.from(slider.querySelectorAll('.testimonial-card'));
    if(!slides.length) return;
    let idx = 0;

    // helper: announce current slide to screen readers
    const liveAnnouncer = document.createElement('div');
    liveAnnouncer.className = 'sr-only';
    liveAnnouncer.setAttribute('aria-live','polite');
    liveAnnouncer.setAttribute('aria-atomic','true');
    slider.appendChild(liveAnnouncer);

    function show(i){
      slides.forEach((s,sn)=>{
        const active = sn===i;
        s.classList.toggle('is-active', active);
        s.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
      // update announcer text
      const text = slides[i]?.querySelector('p')?.textContent || '';
      liveAnnouncer.textContent = text;
    }
    function next(){ idx = (idx+1) % slides.length; show(idx); }
    function prev(){ idx = (idx-1+slides.length) % slides.length; show(idx); }

    show(0);

    // respect prefers-reduced-motion: disable auto-rotate if user prefers reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = null;
    if(!reduce){
      timer = setInterval(next, 6000);
      slider.addEventListener('mouseenter', ()=> clearInterval(timer));
      slider.addEventListener('mouseleave', ()=> timer = setInterval(next, 6000));
    }

    const controls = document.getElementById('testimonialControls');
    if(controls){
      controls.addEventListener('click', (e)=>{
        const btn = e.target.closest('button');
        if(!btn) return;
        const action = btn.getAttribute('data-action');
        if(action==='next') { next(); if(timer){ clearInterval(timer); timer = setInterval(next, 6000);} }
        if(action==='prev') { prev(); if(timer){ clearInterval(timer); timer = setInterval(next, 6000);} }
      });
    }
    // keyboard support for controls
    if(controls){
      controls.querySelectorAll('button').forEach(b=> b.setAttribute('tabindex','0'));
      controls.addEventListener('keydown', (e)=>{
        if(e.key === 'ArrowRight') next();
        if(e.key === 'ArrowLeft') prev();
      });
    }
  })();

  // Make "Request This Package" buttons selectable (visually indicate selected package)
  (function(){
    const priceBtns = Array.from(document.querySelectorAll('.price-card .btn'));
    if(!priceBtns.length) return;
    function clearAll(){
      priceBtns.forEach(b=>{
        b.classList.remove('selected');
        b.removeAttribute('aria-pressed');
      });
    }
    priceBtns.forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        // keep the normal link behaviour (scroll to contact). Mark as selected for visual feedback.
        clearAll();
        btn.classList.add('selected');
        btn.setAttribute('aria-pressed','true');
        // prefill hidden package field in contact form
        try{
          const pkg = btn.getAttribute('data-package') || btn.textContent.trim();
          const pkgInput = document.getElementById('contactPackage');
          if(pkgInput) pkgInput.value = pkg;
        }catch(err){/* ignore */}
      });
    });
  })();

  // Lightweight mailto-based contact handler: builds a mailto: URL and opens user's email client.
  (function(){
    const form = document.getElementById('mailtoForm');
    const formMessage = document.getElementById('formMessage');
    if(!form) return;

    function showMessage(msg, isError){
      if(!formMessage) return;
      formMessage.textContent = msg;
      formMessage.style.color = isError ? 'salmon' : '';
    }

    function setFieldError(id, msg){
      const el = document.getElementById(id);
      if(el) el.textContent = msg || '';
    }

    form.addEventListener('submit', function(e){
      e.preventDefault();
      const to = 'abebemihiretu217@gmail.com';
      const name = (document.getElementById('contactName')||{}).value || '';
      const from = (document.getElementById('contactEmail')||{}).value || '';
      const subjectField = (document.getElementById('contactSubject')||{}).value || '';
      const pkg = (document.getElementById('contactPackage')||{}).value || '';
      const bodyField = (document.getElementById('contactMessage')||{}).value || '';

      // Clear field errors
      setFieldError('errorName',''); setFieldError('errorEmail',''); setFieldError('errorMessage','');

      let hasError = false;
      if(!name || !name.trim()){ setFieldError('errorName','Please provide your name.'); hasError = true; }
      if(!from || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(from)){ setFieldError('errorEmail','Please provide a valid email address.'); hasError = true; }
      if(!bodyField || !bodyField.trim()){ setFieldError('errorMessage','Please enter a short message describing your project.'); hasError = true; }
      if(hasError){ showMessage('Please fix the highlighted fields.', true); return; }

      // Construct subject (include package if provided)
      let subject = subjectField.trim();
      if(pkg && !subject.includes(pkg)) subject = subject ? `${subject} — ${pkg}` : pkg;
      if(!subject) subject = 'Website inquiry';

      // Build the body: include contact details then the message
      const preBody = `Name: ${name || '—'}\r\nEmail: ${from}\r\nPackage: ${pkg || '—'}\r\n\r\n`;
      const body = preBody + bodyField;

      // Encode and create mailto
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      // Protect against extremely long mailto links (some clients have limits).
      if(mailto.length > 1900){
        showMessage('Your message is too long to open the email client. Please shorten it or send an email directly to ' + to + '.', true);
        return;
      }

      // Open user's email client
      showMessage('Opening your email client...');
      window.location.href = mailto;
    });

    // Copy/fallback UI removed per user request — no clipboard or fallback handlers.
  })();

});
