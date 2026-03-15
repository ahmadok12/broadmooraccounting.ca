document.getElementById("navbar-placeholder").innerHTML = `<!--
  ╔══════════════════════════════════════════════════════╗
  ║          BROADMOOR ACCOUNTING & FINANCIALS           ║
  ║                  Navbar Component                    ║
  ║                                                      ║
  ║  Usage: paste below the <body> tag in any page.      ║
  ║  Requires: style.css linked in <head>                ║
  ║  Google Fonts link also required in <head>:          ║
  ║  https://fonts.googleapis.com/css2?family=Playfair+  ║
  ║  Display:ital,wght@0,400;0,700;0,900;1,400&family=  ║
  ║  DM+Sans:wght@300;400;500;600&display=swap           ║
  ╚══════════════════════════════════════════════════════╝

  TIP: To mark a nav link as active on the current page,
  add class="active" to the relevant <a> tag.
  e.g. on insurance-services.html, the Services link has class="active"
-->


<!-- ═══════════════════════════
     HEADER + NAV
═══════════════════════════ -->
<div class="site-header-wrap" id="siteHeader">

  <!-- ── Top Bar ── -->
  <div class="top-bar">

    <!-- Phone -->
    <a href="tel:+18882867860" class="top-bar-phone">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .93h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
      </svg>
      +1 888 286 7860
    </a>

    <div class="top-bar-divider top-bar-phone"></div>

    <!-- Email -->
    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@broadmooraccounting.ca" target="_blank">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
      info@broadmooraccounting.ca
    </a>

    <div class="top-bar-divider"></div>

    <!-- WhatsApp -->
    <a href="https://wa.me/18882867860" class="whatsapp-link" target="_blank">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.85L0 24l6.335-1.51A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.792 9.792 0 01-5.032-1.388l-.36-.214-3.762.897.944-3.67-.235-.375A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
      </svg>
      WhatsApp
    </a>

    <div class="top-bar-divider top-bar-address"></div>

    <!-- Address / Map -->
    <a href="https://maps.google.com" class="maps-link top-bar-address" target="_blank">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      Sherwood Park, AB
    </a>

  </div><!-- /.top-bar -->


  <!-- ── Main Nav ── -->
  <nav>

    <!-- Logo -->
    <a href="index.html" class="nav-logo">
      <!--
        Replace the <img> src below with your logo path, e.g. src="assets/logo.png"
        The base64 image from the original has been removed for brevity.
        If you still want the embedded image, copy the full src="data:image/..." from the original HTML.
      -->
      <img src="logo.png" alt="Broadmoor Accounting &amp; Financials" class="nav-logo-img"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
      <!-- Fallback text logo shown if image fails to load -->
      <div class="nav-logo-mark" style="display:none">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" style="flex-shrink:0">
          <rect width="36" height="36" rx="9" fill="rgba(46,139,71,0.15)"/>
          <path d="M10 24 L18 10 L26 24" stroke="#3aad5a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M13.5 20 L22.5 20" stroke="#3aad5a" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <div class="nav-logo-copy" style="margin-left:10px">
          <span class="nav-logo-text">Broadmoor<span>.</span></span>
          <span class="nav-logo-sub">Accounting &amp; Financials</span>
        </div>
      </div>
    </a>

    <!-- Desktop Menu -->
    <ul class="nav-menu">

      <li>
        <a href="index.html">Home</a>
      </li>

      <li>
        <!-- Add class="active" here when on any Services page -->
        <a href="#">Services <span class="chevron">▾</span></a>
        <div class="dropdown">
          <a href="accounting-services.html">
            <span class="dropdown-icon">📊</span>
            Accounting Services
          </a>
          <a href="insurance-services.html">
            <span class="dropdown-icon">🛡️</span>
            Insurance Services
          </a>
          <a href="mortgage-services.html">
            <span class="dropdown-icon">🏠</span>
            Mortgage Services
          </a>
          <a href="investment-services.html">
            <span class="dropdown-icon">📈</span>
            Investment Services
          </a>
          <div class="dropdown-divider"></div>
          <a href="other-services.html">
            <span class="dropdown-icon">✦</span>
            Other Services
          </a>
        </div>
      </li>

      <li>
        <a href="contact-us.html">Contact Us</a>
      </li>

      <li>
        <a href="financial-calculators.html" class="nav-calc">🧮 Financial Calculators</a>
      </li>

    </ul><!-- /.nav-menu -->

    <!-- CTA Button -->
    <a href="contact-us.html" class="nav-book">📅 Book Free Consultation</a>

    <!-- Hamburger (mobile) -->
    <button
      class="hamburger"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobileNav"
      onclick="toggleMobileNav(this)"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

  </nav>
</div><!-- /.site-header-wrap -->


<!-- ═══════════════════════════
     MOBILE NAV DRAWER
═══════════════════════════ -->
<div
  class="mobile-nav"
  id="mobileNav"
  role="dialog"
  aria-modal="true"
  aria-label="Navigation menu"
  onclick="if(event.target===this) closeMobileNav()"
>
  <div class="mobile-drawer">

    <!-- Close button -->
    <div class="drawer-close">
      <button onclick="closeMobileNav()" aria-label="Close menu">✕</button>
    </div>

    <!-- Mobile Menu Links -->
    <ul class="mobile-menu-list">

      <li>
        <a href="index.html">Home</a>
      </li>

      <li>
        <a href="#" onclick="toggleMobileSubmenu(this); return false;">Services ▾</a>
        <div class="mobile-submenu" style="display:none">
          <a href="accounting-services.html">📊 Accounting Services</a>
          <a href="insurance-services.html">🛡️ Insurance Services</a>
          <a href="mortgage-services.html">🏠 Mortgage Services</a>
          <a href="investment-services.html">📈 Investment Services</a>
          <a href="other-services.html">✦ Other Services</a>
        </div>
      </li>

      <li>
        <a href="contact-us.html">Contact Us</a>
      </li>

      <li>
        <a href="financial-calculators.html">🧮 Financial Calculators</a>
      </li>

    </ul>

    <!-- Mobile CTA -->
    <a href="contact-us.html" class="mobile-book">📅 Book Free Consultation</a>

    <!-- Address in drawer -->
    <div class="drawer-address">
      <div class="drawer-address-row">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <a href="https://maps.google.com" target="_blank">
          12 Blackfoot Road, Unit #6<br>
          Sherwood Park, AB&nbsp;&nbsp;T8A 4P4
        </a>
      </div>
    </div>

  </div><!-- /.mobile-drawer -->
</div><!-- /.mobile-nav -->


<!-- ═══════════════════════════
     NAVBAR JAVASCRIPT
═══════════════════════════ -->
<script>
  /* ── Scroll: shrink header on scroll ─────────────────── */
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


  /* ── Mobile Nav: open/close ──────────────────────────── */
  function toggleMobileNav(btn) {
    const nav = document.getElementById('mobileNav');
    const isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      nav.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    }
  }

  function closeMobileNav() {
    const nav = document.getElementById('mobileNav');
    const btn = document.querySelector('.hamburger');
    nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = ''; // restore scroll
  }

  // Close drawer on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMobileNav();
  });


  /* ── Mobile Submenu: accordion toggle ───────────────── */
  function toggleMobileSubmenu(trigger) {
    const submenu = trigger.nextElementSibling;
    const isOpen = submenu.style.display === 'block';
    submenu.style.display = isOpen ? 'none' : 'block';
    trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  }


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
</script>
`;

// Re-run navbar scripts
(function() {
  var el = document.getElementById("navbar-placeholder");
  var scripts = el.querySelectorAll("script");
  scripts.forEach(function(old) {
    var s = document.createElement("script");
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });
})();
