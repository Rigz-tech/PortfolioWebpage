/* ============================================
   Mobile Navigation Toggle (Shared)
   ============================================ */
(function() {
  var menuBtn = document.getElementById('mobile-menu-btn');
  var menuPanel = document.getElementById('mobile-menu');
  if (!menuBtn || !menuPanel) return;

  function toggleMenu(forceClose) {
    var isOpen = !menuPanel.classList.contains('hidden');
    if (forceClose && !isOpen) return;
    menuPanel.classList.toggle('hidden');
    var nowOpen = !menuPanel.classList.contains('hidden');
    menuBtn.setAttribute('aria-expanded', nowOpen);
    var icon = menuBtn.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = nowOpen ? 'close' : 'menu';
    }
    document.body.style.overflow = nowOpen ? 'hidden' : '';
  }

  menuBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });

  var links = menuPanel.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      toggleMenu(true);
    });
  }

  document.addEventListener('click', function(e) {
    if (!menuPanel.classList.contains('hidden') &&
        !menuPanel.contains(e.target) &&
        !menuBtn.contains(e.target)) {
      toggleMenu(true);
    }
  });
})();

/* ============================================
   Smooth Scroll with Null Safety
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ============================================
   Populate real `alt` from `data-alt`
   ============================================ */
(function() {
  var imgs = document.querySelectorAll('img[data-alt]');
  for (var i = 0; i < imgs.length; i++) {
    if (!imgs[i].alt) {
      imgs[i].alt = imgs[i].getAttribute('data-alt');
    }
  }
})();

/* ============================================
   Background Atmosphere Particles
   ============================================ */
var canvas = document.getElementById('particleCanvas');
if (canvas) {
  var ctx = canvas.getContext('2d');
  var particles = [];
  var animId = null;
  var isPageVisible = true;

  function initParticles() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (var i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: Math.random() > 0.5 ? '#00dbe7' : '#14d1ff'
      });
    }
  }

  function animate() {
    if (!isPageVisible) {
      animId = requestAnimationFrame(animate);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    animId = requestAnimationFrame(animate);
  }

  var resizeTimer = null;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initParticles, 150);
  });

  document.addEventListener('visibilitychange', function() {
    isPageVisible = !document.hidden;
  });

  initParticles();
  animate();
}

/* ============================================
   Infinite Artwork Carousel
   ============================================ */

(function () {
  const track = document.getElementById('artworkTrack');
  if (!track) return;

  const container = track.closest('.carousel-container');
  if (!container) return;

  // Artwork file list (number → extension → project title)
  var artworkFiles = [
    { n: 1, ext: 'png',  title: 'National Coffee Authority — Official Brand Identity Logo Design' },
    { n: 2, ext: 'png',  title: 'National Coffee Authority — Alternative Logo Identity Concept' },
    { n: 3, ext: 'png',  title: 'Coffee Industry Corporation — Corporate Logo Redesign' },
    { n: 4, ext: 'png',  title: 'AI-Powered Realistic Coffee Industry Logo Concept' },
    { n: 5, ext: 'png',  title: 'Kainantu Technical Secondary School — Institutional Logo Redesign' },
    { n: 6, ext: 'png',  title: 'National Gaming Board — Modern Corporate Logo Redesign' },
    { n: 7, ext: 'jpeg', title: 'Professional Photo-to-Vector Illustration Conversion' },
    { n: 8, ext: 'png',  title: 'AI Prompt Engineering for Advanced Photo Manipulation' },
    { n: 9, ext: 'png',  title: 'Self-Portrait AI Vector Illustration Transformation' },
    { n: 10, ext: 'png', title: 'Personal Brand Identity — Uniform Design Concept' },
    { n: 11, ext: 'png', title: 'High-Definition Self-Portrait Vector Artwork' },
    { n: 12, ext: 'png', title: 'Custom Apparel Branding — Full Shirt Design Concept' },
    { n: 13, ext: 'jpg', title: 'Handcrafted Front Shirt Design (100% Manual — No AI)' },
    { n: 14, ext: 'jpg', title: 'Handcrafted Back Shirt Design (100% Manual — No AI)' },
    { n: 15, ext: 'png', title: 'Software Project Infographics & Visual Presentation Design' },
    { n: 16, ext: 'png', title: 'Educational Lesson Infographics & Learning Illustrations' },
    { n: 17, ext: 'jpg', title: 'Professional Graphics Design Portfolio & Tutoring Showcase' },
    { n: 18, ext: 'png', title: 'Commercial Graphic Design Collection (IDs, Letterheads, Flyers & Print Media)' },
    { n: 19, ext: 'jpg', title: 'Creative Curriculum Vitae (CV) & Personal Branding Design' },
    { n: 20, ext: 'jpg', title: 'Featured Collection of Graphic Design Projects & Creative Works' }
  ];

  // Build card HTML
  function buildCard(file, index) {
    var num = String(file.n).padStart(2, '0');
    return '<div class="carousel-card" role="listitem">' +
      '<img src="img/infinite_carousel/slider_' + file.n + '.' + file.ext + '" alt="' + file.title + ' – Graphic Design Portfolio" loading="lazy" decoding="async">' +
      '<div class="card-number">#' + num + '</div>' +
      '<div class="card-overlay"></div>' +
      '<div class="card-title">' + file.title + '</div>' +
      '</div>';
  }

  // Render 20 cards, then duplicate for seamless loop
  var html = '';
  for (var i = 0; i < artworkFiles.length; i++) {
    html += buildCard(artworkFiles[i], i);
  }
  for (var i = 0; i < artworkFiles.length; i++) {
    html += buildCard(artworkFiles[i], i);
  }
  track.innerHTML = html;

  // ---- Animation ----
  var animation = null;
  var gap = 24;
  var setWidth = 0;
  var isDragging = false;
  var isHovering = false;
  var velocityHistory = [];

  function getSetWidth() {
    var firstCard = track.querySelector('.carousel-card');
    if (!firstCard) return 0;
    var w = firstCard.offsetWidth;
    return 20 * (w + gap);
  }

  function initAnimation() {
    if (animation) {
      animation.cancel();
    }
    var sw = getSetWidth();
    if (sw === 0) return;
    setWidth = sw;
    animation = track.animate(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-' + sw + 'px)' }],
      { duration: 40000, iterations: Infinity, easing: 'linear' }
    );
    // Re-apply pause states
    if (isHovering || isDragging) {
      animation.pause();
    }
  }

  function resumeAnimation() {
    if (animation && !isHovering && !isDragging) {
      try { animation.play(); } catch (e) {}
    }
  }

  // Wait for layout to settle then init
  function delayedInit() {
    initAnimation();
  }

  if (document.readyState === 'complete') {
    setTimeout(delayedInit, 100);
  } else {
    window.addEventListener('load', function () { setTimeout(delayedInit, 100); });
  }

  // ---- Hover pause ----
  container.addEventListener('mouseenter', function () {
    isHovering = true;
    if (animation) animation.pause();
  });

  container.addEventListener('mouseleave', function () {
    isHovering = false;
    resumeAnimation();
  });

  // ---- Touch / Mouse drag ----
  var lastX = 0;
  var lastTime = 0;

  function onDragStart(e) {
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    lastX = clientX;
    lastTime = performance.now();
    velocityHistory = [];
    if (animation) animation.pause();
    container.classList.add('dragging');
  }

  function onDragMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    var clientX = e.touches ? e.touches[0].clientX : e.clientX;
    var now = performance.now();
    var deltaX = clientX - lastX;
    lastX = clientX;

    // Record velocity sample
    if (now - lastTime > 0) {
      velocityHistory.push({ dx: deltaX, dt: now - lastTime, t: now });
      if (velocityHistory.length > 8) velocityHistory.shift();
    }
    lastTime = now;

    if (!animation) return;
    var pxPerMs = setWidth / 40000;
    animation.currentTime = animation.currentTime - (deltaX / pxPerMs);
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    container.classList.remove('dragging');

    // Momentum
    if (velocityHistory.length > 0 && animation) {
      var totalWeight = 0;
      var weightedVel = 0;
      for (var k = 0; k < velocityHistory.length; k++) {
        var v = velocityHistory[k];
        var weight = v.dt;
        weightedVel += (v.dx / v.dt) * weight;
        totalWeight += weight;
      }
      var avgVel = totalWeight > 0 ? weightedVel / totalWeight : 0;

      if (Math.abs(avgVel) > 0.15) {
        var pxPerMs = setWidth / 40000;
        var duration = Math.min(600, Math.abs(avgVel) * 120);
        var totalOffset = -(avgVel / pxPerMs) * duration * 0.5;
        var startMom = animation.currentTime;
        var momStart = performance.now();

        function momentumLoop(now) {
          var elapsed = now - momStart;
          var t = Math.min(elapsed / duration, 1);
          var eased = 1 - (1 - t) * (1 - t);
          animation.currentTime = startMom + totalOffset * eased;
          if (t < 1) {
            requestAnimationFrame(momentumLoop);
          } else {
            resumeAnimation();
          }
        }
        requestAnimationFrame(momentumLoop);
        return;
      }
    }

    resumeAnimation();
  }

  container.addEventListener('mousedown', onDragStart);
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);

  container.addEventListener('touchstart', onDragStart, { passive: true });
  container.addEventListener('touchmove', onDragMove, { passive: false });
  container.addEventListener('touchend', onDragEnd);

  // ---- Resize ----
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initAnimation();
    }, 150);
  });
})();
