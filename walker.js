/* Braided girl with a basket (real walk cycle taken from a video) who walks across the bottom of the
   page once the "Hi, I'm ..." intro is dismissed.
   - walker-sheet.webp = 42 cleaned video frames (one full two-step stride) in one image, played at 24 fps.
     The frames were repaired (holes filled, edges smoothed, background specks removed), the loop seam got an
     in-between frame and the sideways drift was evened out, so the loop has no visible hitch.
   - position, frame and shadow are all driven from ONE clock, so the feet stay planted (no sliding)
   - the shadow widens/narrows with her stride
   Decorative, plays once per page load. */
(function () {
  if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const intro = document.getElementById("intro");
  if (!intro) return;

  const RTL = false;                // false: walks left -> right, true: right -> left
  const FACE_RIGHT = !RTL;          // the video girl faces LEFT, so she is mirrored when travelling right
  const FRAMES = 42, FPS = 24;      // sprite sheet: 42 frames, each 185 x 260 px
  const TILE_W = 185, TILE_H = 260;
  const GROUND_PX_PER_FRAME = 6.8;  // how fast the video's ground slides under her feet (video px / frame)
  const VIDEO_TILE_W = 247;         // width of one frame in the original video's pixels (for the speed match)
  // distance between her feet in each frame (tile px) -> shadow width follows the stride
  const STANCE = [36,25,41,55,71,87,86,114,122,125,128,130,131,126,120,112,102,90,82,68,55,43,32,35,60,77,94,108,119,124,127,128,128,106,101,95,85,70,60,47,55,46];

  const css = document.createElement("style");
  css.textContent = `
#walker{position:fixed;left:0;bottom:2px;z-index:35;pointer-events:none;width:122px;will-change:transform;transform:translate3d(-200px,0,0);opacity:0;transition:opacity .5s}
#walker.go{opacity:1}
#walker *{margin:0;box-sizing:content-box}
#walker .wk-sprite{position:relative;filter:drop-shadow(0 0 .6px rgba(40,30,20,.55)) drop-shadow(0 1px 1px rgba(40,30,20,.18));display:block;width:100%;aspect-ratio:${TILE_W}/${TILE_H};transform:scaleX(${FACE_RIGHT ? -1 : 1})}
#walker .wk-sh{position:absolute;left:50%;bottom:-2px;width:70%;height:10px;margin-left:-35%;border-radius:50%;
  background:radial-gradient(closest-side,rgba(0,0,0,.38),rgba(0,0,0,0));will-change:transform}
#walker .wk-bub{position:absolute;left:50%;bottom:100%;margin-bottom:2px;transform:translateX(-50%);white-space:nowrap;background:#fffaf0;color:#3a3030;
  font:600 11px/1.2 system-ui,sans-serif;padding:6px 11px;border-radius:12px;border:1.5px solid #3a3a3a;box-shadow:0 3px 0 #3a3a3a;
  animation:wkpop .5s .4s both,wkfloat 1.8s 1s ease-in-out infinite;transition:opacity .4s}
#walker .wk-bub.bye{opacity:0}
#walker .wk-bub:after{content:"";position:absolute;left:50%;top:100%;margin-left:-7px;border:7px solid transparent;border-top-color:#3a3a3a}
@keyframes wkpop{from{opacity:0;transform:translateX(-50%) scale(.4)}to{opacity:1;transform:translateX(-50%) scale(1)}}
@keyframes wkfloat{50%{margin-bottom:8px}}
@media(max-width:600px){#walker{width:90px}#walker .wk-bub{font-size:10px;padding:4px 8px}}`;
  document.head.appendChild(css);

  const w = document.createElement("div");
  w.id = "walker"; w.setAttribute("aria-hidden", "true");
  w.innerHTML = `<div class="wk-bub">Hi! Welcome to my portfolio 👋</div><div class="wk-sh"></div><canvas class="wk-sprite"></canvas>`;
  document.body.appendChild(w);

  const sprite = w.querySelector(".wk-sprite"), shadow = w.querySelector(".wk-sh"), bubble = w.querySelector(".wk-bub");
  const ctx = sprite.getContext("2d");
  const sheet = new Image(); let ready = false, last = -1;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  function size() { sprite.width = Math.round(w.offsetWidth * dpr); sprite.height = Math.round(w.offsetWidth * dpr * TILE_H / TILE_W); last = -1; }
  sheet.onload = () => { ready = true; size(); };
  sheet.src = "walker-sheet.webp?v=1794600002";
  addEventListener("resize", () => { if (ready) size(); });

  function drawFrame(i) {
    if (i === last) return;
    ctx.clearRect(0, 0, sprite.width, sprite.height);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = "high";
    ctx.drawImage(sheet, i * TILE_W, 0, TILE_W, TILE_H, 0, 0, sprite.width, sprite.height);
    const s = STANCE[i] / 131;                       // 0.2 .. 1
    shadow.style.transform = `scaleX(${(0.55 + 0.5 * s).toFixed(3)})`;
    shadow.style.opacity = (0.75 + 0.25 * (1 - s)).toFixed(2); // a little darker when the feet are together
    last = i;
  }

  let started = false;
  function start() {
    if (started) return; started = true;
    const begin = () => {
      w.classList.add("go");
      const width = w.offsetWidth;
      // on-screen speed = video ground speed scaled to her size -> the planted foot stays put on the ground
      const v = GROUND_PX_PER_FRAME * FPS * (width / VIDEO_TILE_W);
      const from = RTL ? innerWidth + 20 : -(width + 40), to = RTL ? -(width + 40) : innerWidth + 20;
      const dir = Math.sign(to - from), dist = Math.abs(to - from);
      let t0 = null, paused = 0, hiddenAt = 0;
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) hiddenAt = performance.now(); else if (hiddenAt) { paused += performance.now() - hiddenAt; hiddenAt = 0; }
      });
      setTimeout(() => bubble.classList.add("bye"), 5500);
      (function step(now) {
        if (t0 === null) t0 = now;
        const t = (now - t0 - paused) / 1000;
        const x = from + dir * v * t;
        drawFrame(Math.floor(t * FPS) % FRAMES);
        w.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
        if (v * t < dist) requestAnimationFrame(step); else w.remove();
      })(performance.now());
    };
    setTimeout(() => (ready ? begin() : (sheet.onload = () => { ready = true; size(); begin(); })), 700);
  }
  if (intro.classList.contains("done")) start();
  else new MutationObserver((_, ob) => { if (intro.classList.contains("done")) { ob.disconnect(); start(); } })
    .observe(intro, { attributes: true, attributeFilter: ["class"] });
})();
