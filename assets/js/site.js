/* Broadmoor Accounting & Financials — shared site behaviour.
   Header/footer markup is inlined into each page by tools/build.py (no runtime fetch/injection). */
(function () {
  'use strict';
  
  document.documentElement.classList.add('js');

  /* ── Header: compact state on scroll ─────────────────── */
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    var onScroll = function () { siteHeader.classList.toggle('scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mega menu (desktop) ─────────────────────────────── */
  document.querySelectorAll('.has-mega').forEach(function (item) {
    var trigger = item.querySelector('.mega-trigger');
    var panel = item.querySelector('.mega');
    if (!trigger || !panel) return;
    var closeTimer;
    var hoverable = window.matchMedia('(hover: hover) and (pointer: fine)');

    function setOpen(open, focusTrigger) {
      clearTimeout(closeTimer);
      item.classList.toggle('open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open && focusTrigger) trigger.focus();
    }
    trigger.addEventListener('click', function () {
      setOpen(trigger.getAttribute('aria-expanded') !== 'true');
    });
    item.addEventListener('mouseenter', function () { if (hoverable.matches) setOpen(true); });
    item.addEventListener('mouseleave', function () {
      if (!hoverable.matches) return;
      closeTimer = setTimeout(function () { setOpen(false); }, 160);
    });
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && item.classList.contains('open')) { e.stopPropagation(); setOpen(false, true); }
      if (e.key === 'ArrowDown' && document.activeElement === trigger) {
        e.preventDefault(); setOpen(true);
        var first = panel.querySelector('a'); if (first) first.focus();
      }
    });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) setOpen(false);
    });
    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) setOpen(false);
    });
  });

  /* ── Mobile drawer ───────────────────────────────────── */
  var mobileNav = document.getElementById('mobileNav');
  var burger = document.querySelector('.hamburger');

  function openMobileNav() {
    if (!mobileNav) return;
    mobileNav.hidden = false;
    requestAnimationFrame(function () { mobileNav.classList.add('open'); });
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = mobileNav.querySelector('.drawer-close-btn'); if (first) first.focus();
  }
  window.closeMobileNav = function () {
    if (!mobileNav || mobileNav.hidden) return;
    mobileNav.classList.remove('open');
    if (burger) { burger.setAttribute('aria-expanded', 'false'); burger.focus(); }
    document.body.style.overflow = '';
    setTimeout(function () { if (!mobileNav.classList.contains('open')) mobileNav.hidden = true; }, 260);
  };
  window.toggleMobileNav = function () {
    if (mobileNav && mobileNav.classList.contains('open')) closeMobileNav(); else openMobileNav();
  };
  if (burger) burger.addEventListener('click', window.toggleMobileNav);
  if (mobileNav) {
    mobileNav.addEventListener('click', function (e) { if (e.target === mobileNav) closeMobileNav(); });
    var closeBtn = mobileNav.querySelector('.drawer-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileNav);
    mobileNav.querySelectorAll('.mobile-sub-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = document.getElementById(btn.getAttribute('aria-controls'));
        var open = btn.getAttribute('aria-expanded') !== 'true';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (sub) sub.hidden = !open;
      });
    });
    // keep focus inside the open drawer
    mobileNav.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = Array.prototype.filter.call(
        mobileNav.querySelectorAll('a, button'), function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    });
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMobileNav(); });

  /* ── Active nav state (aria-current is set at build time) ─ */
  var current = document.querySelector('.mega-grid a[aria-current="page"]');
  if (current) {
    var t = document.querySelector('.mega-trigger'); if (t) t.classList.add('active');
    var mt = document.querySelector('.mobile-sub-toggle'); if (mt) mt.classList.add('active');
  }

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
