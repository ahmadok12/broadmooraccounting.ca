/* Broadmoor Accounting & Financials — shared site behaviour.
   Header/footer markup is inlined into each page by tools/build.py (no runtime fetch/injection). */
(function () {
  'use strict';
  
  /* ── Scroll: shrink header on scroll ─────────────────── */
  const siteHeader = document.getElementById('siteHeader');
  if (siteHeader) window.addEventListener('scroll', function () {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Mobile Nav: open/close ──────────────────────────── */
  window.toggleMobileNav = function (btn) {
    const nav = document.getElementById('mobileNav');
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      nav.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }
  };
  
  window.closeMobileNav = function () {
    const nav = document.getElementById('mobileNav');
    const btn = document.querySelector('.hamburger');
    nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // restore scroll
  };
  
  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });

  /* ── Mobile Submenu: accordion toggle ───────────────── */
  window.toggleMobileSubmenu = function (trigger) {
    const submenu = trigger.nextElementSibling;
    const isOpen = submenu.style.display === 'block';
    submenu.style.display = isOpen ? 'none' : 'block';
    trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  };

  /* ── Active nav link: auto-highlight current page ───── */
  (function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu > li > a, .mobile-menu-list a').forEach(function (link) {
      const linkPath = link.getAttribute('href');
      if (linkPath && linkPath !== '#' && linkPath === currentPath) {
        link.classList.add('active');
        // If inside a dropdown, also mark the parent Services link active
        const parentLi = link.closest('.nav-menu > li');
        if (!parentLi) {
          const parentDropdown = link.closest('.dropdown');
          if (parentDropdown) {
            const parentA = parentDropdown.previousElementSibling;
            if (parentA) parentA.classList.add('active');
          }
        }
      }
    });
  })();

  /* ── FAQ accordion (used by onclick="toggleFaq(this)") ─ */
  window.toggleFaq = function (btn) {
    var item = btn.closest('.faq-item');
    if (!item) return;
    var open = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  /* ── Footer year ─────────────────────────────────────── */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Contact forms (Web3Forms) ───────────────────────────
     Any <form data-web3form> is submitted via fetch. Fields need name="" attributes.
     A consent checkbox (name="consent") is required by the form markup.          */
  var ACCESS_KEY = '417c3ae3-dee4-40f3-b918-e0c6a13cd7b0';
  document.querySelectorAll('form[data-web3form]').forEach(function (form) {
    var status = form.querySelector('.form-status');
    var btn = form.querySelector('[type="submit"]');
    function say(msg, ok) {
      if (!status) return;
      status.textContent = msg;
      status.className = 'form-status ' + (ok ? 'is-ok' : 'is-err');
    }
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      if (data.get('botcheck')) return;               // honeypot
      if (!data.get('access_key')) data.append('access_key', ACCESS_KEY);
      data.append('page', location.pathname);
      var label = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      say('', true);
      try {
        var res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST', headers: { 'Accept': 'application/json' }, body: data
        });
        var json = await res.json();
        if (!json.success) throw new Error(json.message || 'Submission failed');
        form.reset();
        say('Thank you — your message has been sent. We aim to reply within one business day.', true);
        var success = document.getElementById(form.dataset.success || '');
        if (success) { form.style.display = 'none'; success.style.display = 'block'; }
      } catch (err) {
        say('Sorry, something went wrong. Please call +1 888 286 7860 or email info@broadmooraccounting.ca.', false);
      } finally {
        if (btn) { btn.disabled = false; btn.innerHTML = label; }
      }
    });
  });
})();
