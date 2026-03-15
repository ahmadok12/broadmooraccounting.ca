document.getElementById("footer-placeholder").innerHTML = `<!--
  ╔══════════════════════════════════════════════════════╗
  ║          BROADMOOR ACCOUNTING & FINANCIALS           ║
  ║                  Footer Component                    ║
  ║                                                      ║
  ║  Usage: paste just before the closing </body> tag.   ║
  ║  Requires: style.css linked in <head>                ║
  ║  Google Fonts link also required in <head>:          ║
  ║  https://fonts.googleapis.com/css2?family=Playfair+  ║
  ║  Display:ital,wght@0,400;0,700;0,900;1,400&family=  ║
  ║  DM+Sans:wght@300;400;500;600&display=swap           ║
  ╚══════════════════════════════════════════════════════╝
-->


<!-- ═══════════════════════════
     FOOTER
═══════════════════════════ -->
<footer class="site-footer">

  <!-- ── Footer Top (4-column grid) ── -->
  <div class="footer-top">
    <div class="footer-inner">


      <!-- Col 1: Brand -->
      <div class="footer-col footer-brand">

        <div class="footer-logo-mark">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="9" fill="rgba(46,139,71,0.18)"/>
            <path d="M10 24 L18 10 L26 24" stroke="#3aad5a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M13.5 20 L22.5 20" stroke="#3aad5a" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span class="footer-logo-text">Broadmoor<span>.</span></span>
        </div>

        <p class="footer-tagline">
          Accounting &amp; Financials — trusted expertise across tax, insurance, investments, and mortgages.
        </p>

        <div class="footer-social">

          <a href="#" aria-label="LinkedIn" class="social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>

          <a href="#" aria-label="Facebook" class="social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>

          <a href="#" aria-label="Instagram" class="social-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

        </div><!-- /.footer-social -->
      </div><!-- /.footer-brand -->


      <!-- Col 2: Services -->
      <div class="footer-col">
        <h4 class="footer-col-title">Services</h4>
        <ul class="footer-links">
          <li><a href="accounting-services.html">Accounting &amp; Tax Services</a></li>
          <li><a href="insurance-services.html">Insurance Services</a></li>
          <li><a href="investment-services.html">Investment Services</a></li>
          <li><a href="mortgage-services.html">Mortgages</a></li>
          <li><a href="other-services.html">Other Services</a></li>
        </ul>
      </div>


      <!-- Col 3: Company -->
      <div class="footer-col">
        <h4 class="footer-col-title">Company</h4>
        <ul class="footer-links">
          <li><a href="#">About Us</a></li>
          <li><a href="#">Testimonials</a></li>
          <li><a href="#">Partners</a></li>
          <li><a href="contact-us.html">Contact Us</a></li>
        </ul>
      </div>


      <!-- Col 4: Get In Touch -->
      <div class="footer-col">
        <h4 class="footer-col-title">Get In Touch</h4>

        <ul class="footer-contact-list">

          <!-- Address -->
          <li>
            <span class="fc-icon">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <span>12 Blackfoot Road Unit #6<br>Sherwood Park, AB T8A 4P4</span>
          </li>

          <!-- Phone -->
          <li>
            <span class="fc-icon">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .93h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </span>
            <a href="tel:+18882867860">+1 888 286 7860</a>
          </li>

          <!-- Email -->
          <li>
            <span class="fc-icon">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=info@broadmooraccounting.ca" target="_blank" rel="noopener">
              info@broadmooraccounting.ca
            </a>
          </li>

          <!-- Hours -->
          <li>
            <span class="fc-icon">🕐</span>
            <span>Mon–Fri: 8:30 AM – 6:00 PM<br>Sat: 10:00 AM – 3:00 PM</span>
          </li>

        </ul><!-- /.footer-contact-list -->

        <!-- WhatsApp CTA -->
        <a href="https://wa.me/18882867860" class="footer-whatsapp" target="_blank" rel="noopener">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#25d366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.532 5.85L0 24l6.335-1.51A11.933 11.933 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.792 9.792 0 01-5.032-1.388l-.36-.214-3.762.897.944-3.67-.235-.375A9.79 9.79 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/>
          </svg>
          Chat on WhatsApp
        </a>

      </div><!-- /.footer-col (Get In Touch) -->

    </div><!-- /.footer-inner -->
  </div><!-- /.footer-top -->


  <!-- ── Footer Bottom (copyright + legal) ── -->
  <div class="footer-bottom">
    <div class="footer-bottom-inner">

      <p class="footer-copy">© <span id="footerYear">2025</span> Broadmoor Accounting &amp; Financials. All rights reserved.</p>

      <div class="footer-legal">
        <a href="#">Privacy Policy</a>
        <div class="footer-legal-dot"></div>
        <a href="#">Terms of Use</a>
        <div class="footer-legal-dot"></div>
        <a href="#">Disclaimer</a>
      </div>

    </div><!-- /.footer-bottom-inner -->
  </div><!-- /.footer-bottom -->

</footer><!-- /.site-footer -->


<!-- ═══════════════════════════
     FOOTER JAVASCRIPT
═══════════════════════════ -->
<script>
  /* ── Auto-update copyright year ─────────────────────── */
  (function () {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  })();


  /* ── Highlight active footer service link ────────────── */
  (function () {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.footer-links a, .footer-col a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && href === currentPage) {
        link.style.color = 'var(--white)';
        link.style.paddingLeft = '4px';
      }
    });
  })();
</script>
`;

// Re-run footer scripts
(function() {
  var el = document.getElementById("footer-placeholder");
  var scripts = el.querySelectorAll("script");
  scripts.forEach(function(old) {
    var s = document.createElement("script");
    s.textContent = old.textContent;
    old.parentNode.replaceChild(s, old);
  });
})();
