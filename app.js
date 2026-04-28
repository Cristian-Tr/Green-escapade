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

});




