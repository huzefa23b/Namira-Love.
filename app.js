/* ============================================================
   NAMIRA — CINEMATIC LOVE EXPERIENCE
   Interactive engine
============================================================ */

(() => {

  "use strict";

  /* ==========================================================
     BASIC ELEMENTS
  ========================================================== */

  const scenes = [...document.querySelectorAll(".scene")];
  const dots = [...document.querySelectorAll(".dot")];

  const progressText =
    document.getElementById("progressText");

  const progressFill =
    document.getElementById("progressFill");

  const previousButton =
    document.getElementById("previousButton");

  const nextNavigation =
    document.getElementById("nextNavigation");

  const soundButton =
    document.getElementById("soundButton");

  const music =
    document.getElementById("music");

  let currentScene = 1;

  const totalScenes = scenes.length;


  /* ==========================================================
     SCENE ENGINE
  ========================================================== */

  function showScene(number) {

    if (number < 1) {
      number = totalScenes;
    }

    if (number > totalScenes) {
      number = 1;
    }

    currentScene = number;

    scenes.forEach((scene) => {

      const sceneNumber =
        Number(scene.dataset.scene);

      scene.classList.toggle(
        "active",
        sceneNumber === currentScene
      );

    });


    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index + 1 === currentScene
      );

    });


    progressText.textContent =
      String(currentScene).padStart(2, "0") +
      " / " +
      String(totalScenes).padStart(2, "0");


    progressFill.style.width =
      `${(currentScene / totalScenes) * 100}%`;


    if (currentScene === 5) {
      createHeartBurst();
    }

  }


  function nextScene() {
    showScene(currentScene + 1);
  }


  function previousScene() {
    showScene(currentScene - 1);
  }


  /* ==========================================================
     NEXT BUTTONS
  ========================================================== */

  document
    .querySelectorAll(".next-button")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const next =
          Number(button.dataset.next);

        if (next) {
          showScene(next);
        } else {
          nextScene();
        }

      });

    });


  /* ==========================================================
     NAVIGATION
  ========================================================== */

  nextNavigation.addEventListener(
    "click",
    nextScene
  );

  previousButton.addEventListener(
    "click",
    previousScene
  );


  dots.forEach((dot) => {

    dot.addEventListener("click", () => {

      showScene(
        Number(dot.dataset.go)
      );

    });

  });


  /* ==========================================================
     KEYBOARD
  ========================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown" ||
        event.key === " "
      ) {

        event.preventDefault();

        nextScene();

      }


      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {

        event.preventDefault();

        previousScene();

      }

    }
  );


  /* ==========================================================
     TOUCH SWIPE
  ========================================================== */

  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener(
    "touchstart",
    (event) => {

      const touch =
        event.changedTouches[0];

      touchStartX =
        touch.clientX;

      touchStartY =
        touch.clientY;

    },
    { passive: true }
  );


  document.addEventListener(
    "touchend",
    (event) => {

      const touch =
        event.changedTouches[0];

      const deltaX =
        touch.clientX - touchStartX;

      const deltaY =
        touch.clientY - touchStartY;


      if (
        Math.abs(deltaX) < 45 &&
        Math.abs(deltaY) < 45
      ) {
        return;
      }


      if (
        Math.abs(deltaY) >
        Math.abs(deltaX)
      ) {

        if (deltaY < 0) {
          nextScene();
        } else {
          previousScene();
        }

      } else {

        if (deltaX < 0) {
          nextScene();
        } else {
          previousScene();
        }

      }

    },
    { passive: true }
  );


  /* ==========================================================
     PHOTO LIGHTBOX
  ========================================================== */

  const photoModal =
    document.getElementById("photoModal");

  const modalImage =
    document.getElementById("modalImage");

  const modalCaption =
    document.getElementById("modalCaption");

  const closePhoto =
    document.getElementById("closePhoto");


  document
    .querySelectorAll(".photo-card")
    .forEach((card) => {

      card.addEventListener(
        "click",
        () => {

          const image =
            card.dataset.photo;

          const img =
            card.querySelector("img");

          modalImage.src = image;

          modalImage.alt =
            img.alt;

          modalCaption.textContent =
            card.querySelector(
              ".photo-caption"
            ).innerText;

          photoModal.classList.add("open");

          photoModal.setAttribute(
            "aria-hidden",
            "false"
          );

        }
      );

    });


  function closePhotoModal() {

    photoModal.classList.remove(
      "open"
    );

    photoModal.setAttribute(
      "aria-hidden",
      "true"
    );

    setTimeout(() => {
      modalImage.src = "";
    }, 300);

  }


  closePhoto.addEventListener(
    "click",
    closePhotoModal
  );


  photoModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === photoModal
      ) {
        closePhotoModal();
      }

    }
  );


  /* ==========================================================
     LETTER
  ========================================================== */

  const envelope =
    document.getElementById("envelope");

  const letterText =
    document.getElementById("letterText");

  const envelopeHint =
    document.getElementById("envelopeHint");


  const letterMessage =
    "I don't know if there are perfect words for everything we feel. But I know that some people make ordinary moments feel a little more beautiful. You are one of those people for me. So this little world is simply my way of saying — you matter to me.";


  let letterOpened = false;
  let typingTimer = null;


  envelope.addEventListener(
    "click",
    () => {

      if (letterOpened) {
        return;
      }

      letterOpened = true;

      envelope.classList.add(
        "open"
      );

      envelopeHint.textContent =
        "a little something for you ♥";


      let index = 0;

      letterText.textContent = "";


      clearInterval(typingTimer);


      typingTimer = setInterval(() => {

        letterText.textContent =
          letterMessage.slice(
            0,
            index + 1
          );

        index++;


        if (
          index >=
          letterMessage.length
        ) {

          clearInterval(
            typingTimer
          );

        }

      }, 26);

    }
  );


  /* ==========================================================
     SECRET MESSAGE
  ========================================================== */

  const secretButton =
    document.getElementById("secretButton");

  const secretModal =
    document.getElementById("secretModal");

  const closeSecret =
    document.getElementById("closeSecret");


  secretButton.addEventListener(
    "click",
    () => {

      secretModal.classList.add(
        "open"
      );

      secretModal.setAttribute(
        "aria-hidden",
        "false"
      );

      createHeartBurst(
        45
      );

    }
  );


  function closeSecretModal() {

    secretModal.classList.remove(
      "open"
    );

    secretModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  closeSecret.addEventListener(
    "click",
    closeSecretModal
  );


  secretModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target === secretModal
      ) {
        closeSecretModal();
      }

    }
  );


  /* ==========================================================
     ESCAPE MODALS
  ========================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        closePhotoModal();
        closeSecretModal();

      }

    }
  );


  /* ==========================================================
     SOUND
  ========================================================== */

  let soundEnabled = false;


  soundButton.addEventListener(
    "click",
    async () => {

      if (!music.src) {

        soundButton.innerHTML =
          "♫ <span>add music</span>";

        return;

      }


      if (!soundEnabled) {

        try {

          await music.play();

          soundEnabled = true;

          soundButton.innerHTML =
            "♫ <span>playing</span>";

        } catch {

          soundButton.innerHTML =
            "♫ <span>tap again</span>";

        }

      } else {

        music.pause();

        soundEnabled = false;

        soundButton.innerHTML =
          "♫ <span>sound</span>";

      }

    }
  );


  /* ==========================================================
     CANVAS PARTICLES
  ========================================================== */

  const canvas =
    document.getElementById("stars");

  const ctx =
    canvas.getContext("2d");

  let particles = [];

  let width = 0;
  let height = 0;


  function resizeCanvas() {

    const ratio =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    width =
      window.innerWidth;

    height =
      window.innerHeight;

    canvas.width =
      width * ratio;

    canvas.height =
      height * ratio;

    canvas.style.width =
      `${width}px`;

    canvas.style.height =
      `${height}px`;

    ctx.setTransform(
      ratio,
      0,
      0,
      ratio,
      0,
      0
    );

    createParticles();

  }


  function createParticles() {

    const count =
      Math.min(
        130,
        Math.max(
          55,
          Math.floor(
            width * height / 12000
          )
        )
      );


    particles =
      Array.from(
        { length: count },
        () => ({

          x: Math.random() * width,

          y: Math.random() * height,

          size:
            Math.random() * 1.8 + .3,

          alpha:
            Math.random() * .55 + .15,

          speed:
            Math.random() * .25 + .05,

          phase:
            Math.random() * Math.PI * 2

        })
      );

  }


  function drawParticles(time) {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );


    particles.forEach((particle) => {

      particle.y -= particle.speed;

      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x =
          Math.random() * width;
      }


      const pulse =
        Math.sin(
          time * .001 +
          particle.phase
        ) * .25 + .75;


      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.size,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        `rgba(255,150,205,${
          particle.alpha * pulse
        })`;

      ctx.fill();

    });


    requestAnimationFrame(
      drawParticles
    );

  }


  window.addEventListener(
    "resize",
    resizeCanvas
  );


  resizeCanvas();

  requestAnimationFrame(
    drawParticles
  );


  /* ==========================================================
     MOUSE / POINTER GLOW
  ========================================================== */

  let pointerX =
    window.innerWidth / 2;

  let pointerY =
    window.innerHeight / 2;


  window.addEventListener(
    "pointermove",
    (event) => {

      pointerX =
        event.clientX;

      pointerY =
        event.clientY;

    },
    { passive: true }
  );


  /* ==========================================================
     HEART BURST
  ========================================================== */

  function createHeartBurst(
    amount = 18
  ) {

    const container =
      document.body;

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const heart =
        document.createElement(
          "div"
        );

      heart.textContent = "♥";

      heart.style.position =
        "fixed";

      heart.style.left =
        `${50 + (Math.random() - .5) * 12}%`;

      heart.style.top =
        `${50 + (Math.random() - .5) * 12}%`;

      heart.style.zIndex =
        "300";

      heart.style.pointerEvents =
        "none";

      heart.style.color =
        Math.random() > .5
          ? "#ff4f9a"
          : "#ff9ec9";

      heart.style.fontSize =
        `${10 + Math.random() * 22}px`;

      heart.style.transition =
        `transform ${
          1.2 + Math.random() * .8
        }s cubic-bezier(.1,.8,.2,1),
        opacity ${
          1.2 + Math.random() * .8
        }s ease`;

      container.appendChild(
        heart
      );


      requestAnimationFrame(() => {

        const x =
          (Math.random() - .5) *
          window.innerWidth *
          .8;

        const y =
          (Math.random() - .5) *
          window.innerHeight *
          .8;

        heart.style.transform =
          `translate(${x}px, ${y}px)
           rotate(${(Math.random() - .5) * 90}deg)
           scale(${.7 + Math.random()})`;

        heart.style.opacity = "0";

      });


      setTimeout(() => {

        heart.remove();

      }, 2200);

    }

  }


  /* ==========================================================
     INITIALIZE
  ========================================================== */

  showScene(1);


  /* ==========================================================
     CONSOLE
  ========================================================== */

  console.log(
    "%c♥ Namira — Cinematic Love Experience",
    "color:#ff4f9a;font-size:18px;font-weight:bold;"
  );

  console.log(
    "Made with a lot of feelings."
  );

})();
