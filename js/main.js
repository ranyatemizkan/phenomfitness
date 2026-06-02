/* ============================================================
   PHENOM FITNESS — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navigation ───────────────────────────────────────────
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  // Scroll effect on navbar
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // ─── SPA Page Routing ─────────────────────────────────────
  const pages   = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');

  function showPage(id) {
    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById('page-' + id);
    if (target) {
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navLinks.forEach(l => {
      if (l.dataset.page === id) l.classList.add('active');
    });

    // Close mobile nav
    mobileNav.classList.remove('open');

    // Trigger fade-ins for new page
    setTimeout(initFadeIns, 100);

    // Update hash for bookmarking
    history.pushState({}, '', '#' + id);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // Handle initial hash
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'about', 'merch', 'partners', 'work'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage('home');
  }

  // ─── Scroll-triggered Fade Ins ────────────────────────────
  function initFadeIns() {
    const elements = document.querySelectorAll('.page.active .fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }

  initFadeIns();

  // ─── YouTube Videos ───────────────────────────────────────
  // Curated YouTube video IDs from @ranyatemizkan channel
  const videos = [
    { id: '8_mTnYjGJb8', title: 'Pain is NECESSARY', date: '1 month ago' },
    { id: 'd0U9EDFjvz0', title: 'ROAD TO TAMPA 26', date: '4 weeks ago' },
    { id: 'eUKmbaT-1sQ', title: 'NEW PLAN: SAME DRIVE | 17 WKS OUT', date: '1 month ago' },
    { id: 'WKsSwDmjWCo', title: 'THE PROCESS OF BECOMING', date: '2 months ago' },
    { id: '3Vi1BBldpjY', title: 'DISCOMFORT BUILDS LEGACY', date: '3 months ago' },
    { id: '4e5KwdwOcRw', title: 'STAGE READY', date: '2 months ago' },
  ];

  const ytGrid = document.getElementById('ytGrid');
  if (ytGrid) {
    ytGrid.innerHTML = videos.map(v => `
      <div class="yt-card fade-in" onclick="openVideo('${v.id}')">
        <div style="position:relative;">
          <img class="yt-thumb" src="https://img.youtube.com/vi/${v.id}/hqdefault.jpg" alt="${v.title}" loading="lazy">
          <div class="yt-overlay">
            <div class="yt-play">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
        <div class="yt-info">
          <p class="yt-title">${v.title}</p>
          <p class="yt-date">${v.date}</p>
        </div>
      </div>
    `).join('');
  }

  // ─── Scroll CTA ───────────────────────────────────────────
  const scrollCta = document.getElementById('scrollCta');
  if (scrollCta) {
    scrollCta.addEventListener('click', () => {
      document.querySelector('#page-home .stats-bar')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

});

// ─── Video Modal ────────────────────────────────────────────
function openVideo(id) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
    display:flex;align-items:center;justify-content:center;padding:2rem;
  `;
  modal.innerHTML = `
    <div style="position:relative;width:100%;max-width:900px;">
      <button onclick="this.parentElement.parentElement.remove()" style="
        position:absolute;top:-2.5rem;right:0;background:none;border:none;
        color:#fff;font-size:1.5rem;cursor:pointer;font-family:sans-serif;
      ">✕ Close</button>
      <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
        <iframe src="https://www.youtube.com/embed/${id}?autoplay=1"
          style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;"
          allow="autoplay;encrypted-media" allowfullscreen></iframe>
      </div>
    </div>
  `;
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}
