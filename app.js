document.addEventListener("DOMContentLoaded", () => {


  // --- 2. COUNTER ANIMATION (INTERSECTION OBSERVER) ---
  const animateCounter = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2500; // 2.5 secunde
    const startStep = 0;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (echivalent cu 'swing')
      const ease = 0.5 - Math.cos(progress * Math.PI) / 2;

      const currentValue = Math.ceil(ease * target);
      el.innerText = currentValue;

      if (progress < 1) {
        el.dataset.animationFrame = requestAnimationFrame(step);
      } else {
        el.innerText = target;
      }
    };

    el.dataset.animationFrame = requestAnimationFrame(step);
  };

  const observerOptions = { threshold: 0.3 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      } else {
        // Oprim animația și resetăm
        cancelAnimationFrame(entry.target.dataset.animationFrame);
        entry.target.innerText = "0";
      }
    });
  }, observerOptions);

  document.querySelectorAll('.count').forEach(el => observer.observe(el));


  // --- 3. CHANGING TEXT (ABOUT US SECTION) ---
  const wordElement = document.getElementById("word");
  if (wordElement) {
    let count = 0;
    const wordsArray = [
      "FISHING", "SWIMMING", "JET SKI", "WATER SKIING",
      "SCUBA DIVING", "JACUZZI", "WATER PARK",
      "DUTY FREE SHOPPING", "SAUNA", "ALL INCLUSIVE MENU"
    ];

    setInterval(() => {
      count++;
      // Efect de Fade Out / Fade In folosind CSS Opacity
      wordElement.style.transition = "opacity 0.4s";
      wordElement.style.opacity = 0;

      setTimeout(() => {
        wordElement.innerText = wordsArray[count % wordsArray.length];
        wordElement.style.opacity = 1;
      }, 400);

    }, 1700);
  }


  /* =========================================
   CANVAS PESTI
   ========================================= */

  const canvas = document.getElementById('fishCanvas');
  const ctx = canvas.getContext('2d');

  let width, height, fishes = [];
  const colorPairs = [
    { body: 'magenta', detail: 'springgreen' },
    { body: 'springgreen', detail: 'magenta' },
    { body: 'cyan', detail: 'gold' },
    { body: 'gold', detail: 'cyan' }
  ];

  function resize() {
    const section = document.getElementById('underwater');
    if (section) {
      width = canvas.width = window.innerWidth;
      height = canvas.height = section.offsetHeight;
    }
  }
  window.addEventListener('resize', resize);
  resize();

  class Fish {
    constructor(fastStart = false) {
      this.init(fastStart);
    }

    init(fastStart = false) {
      this.direction = Math.random() > 0.5 ? 1 : -1;
      this.x = fastStart ? (this.direction === 1 ? -100 : width + 100) : (this.direction === 1 ? -400 : width + 400);
      this.y = Math.random() * (height * 0.75) + (height * 0.1);

      this.baseSpeed = (Math.random() * 0.6 + 0.4);
      this.currentSpeed = this.baseSpeed;

      const pair = colorPairs[Math.floor(Math.random() * colorPairs.length)];
      this.color = pair.body;
      this.detailColor = pair.detail;

      this.size = Math.random() < 0.4 ? (Math.random() * 10 + 35) : (Math.random() * 15 + 50);

      this.patternType = Math.floor(Math.random() * 3);
      this.tailType = Math.floor(Math.random() * 4);

      this.wave = Math.random() * Math.PI * 2;
      this.waveSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.x += this.currentSpeed * this.direction;
      this.wave += this.waveSpeed;
      if ((this.direction === 1 && this.x > width + 400) || (this.direction === -1 && this.x < -400)) {
        this.init(false);
      }
    }

    draw() {
      this.update();
      const yOffset = Math.sin(this.wave) * 5;
      const s = this.size;
      const bodyH = s / 5.5;

      ctx.save();
      ctx.translate(this.x, this.y + yOffset);
      if (this.direction === -1) ctx.scale(-1, 1);

      // --- 1. CORP ---
      ctx.beginPath();
      if (this.patternType === 2) {
        let grad = ctx.createLinearGradient(0, 0, s, 0);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, this.detailColor);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = this.color;
      }
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.ellipse(s / 2, 0, s / 2, bodyH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // --- 2. OCHI ---
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(s * 0.85, -bodyH * 0.2, s * 0.045, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.arc(s * 0.87, -bodyH * 0.2, s * 0.025, 0, Math.PI * 2);
      ctx.fill();

      // --- 3. BRANHIA ---
      ctx.strokeStyle = "rgba(0,0,0,0.2)";
      ctx.lineWidth = 1.5;
      const gillX = s * 0.72;
      const dxGill = (gillX - s / 2) / (s / 2);
      const gillLimit = Math.sqrt(Math.max(0, 1 - dxGill * dxGill)) * bodyH * 0.8;
      ctx.beginPath();
      ctx.moveTo(gillX, -gillLimit);
      ctx.quadraticCurveTo(gillX - 5, 0, gillX, gillLimit);
      ctx.stroke();

      // --- 4. DETALII ---
      if (this.patternType === 0) {
        ctx.strokeStyle = this.detailColor;
        ctx.lineWidth = s * 0.09;
        ctx.lineCap = "round";
        for (let i = 0; i < 3; i++) {
          let posX = s * (0.2 + i * 0.16);
          let dx = (posX - s / 2) / (s / 2);
          let localH = Math.sqrt(Math.max(0, 1 - dx * dx)) * bodyH;
          let stripeLimit = localH * 0.8;
          ctx.beginPath();
          ctx.moveTo(posX, -stripeLimit);
          ctx.quadraticCurveTo(posX + 3, 0, posX, stripeLimit);
          ctx.stroke();
        }
      } else if (this.patternType === 1) {
        ctx.fillStyle = this.detailColor;
        for (let i = 0; i < 6; i++) {
          let pX = s * (0.15 + i * 0.1);
          ctx.beginPath();
          ctx.arc(pX, (i % 2 === 0 ? 1 : -1) * (bodyH * 0.3), s * 0.03, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- 5. COADA ---
      ctx.beginPath();
      ctx.fillStyle = (this.patternType === 2) ? this.detailColor : this.color;

      if (this.tailType === 0) { // V-Sharp
        ctx.moveTo(0, 0);
        ctx.lineTo(-s * 0.22, -bodyH * 1.2);
        ctx.lineTo(-s * 0.06, 0);
        ctx.lineTo(-s * 0.22, bodyH * 1.2);
      } else if (this.tailType === 1) { // Fan
        ctx.moveTo(s * 0.05, 0);
        ctx.quadraticCurveTo(-s * 0.25, -bodyH * 1.8, -s * 0.3, 0);
        ctx.quadraticCurveTo(-s * 0.25, bodyH * 1.8, s * 0.05, 0);
      } else if (this.tailType === 2) { // Bifurcată Elegantă
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-s * 0.2, -bodyH * 1.7, -s * 0.35, -bodyH * 0.5, -s * 0.1, 0);
        ctx.bezierCurveTo(-s * 0.35, bodyH * 0.5, -s * 0.2, bodyH * 1.7, 0, 0);
      } else { // RÂNDUNICĂ MICȘORATĂ
        ctx.moveTo(s * 0.05, 0);
        ctx.lineTo(-s * 0.3, -bodyH * 1.3); // Lob scurt
        ctx.lineTo(-s * 0.12, 0);          // Scobitură puțin adâncă
        ctx.lineTo(-s * 0.3, bodyH * 1.3);
      }
      ctx.fill();

      ctx.restore();
    }
  }

  function startSimulation() {
    fishes = [];
    for (let i = 0; i < 22; i++) {
      setTimeout(() => { fishes.push(new Fish(true)); }, i * 120);
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    fishes.forEach(fish => fish.draw());
    requestAnimationFrame(animate);
  }

  startSimulation();
  animate();



});




