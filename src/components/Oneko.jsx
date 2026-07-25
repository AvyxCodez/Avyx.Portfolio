import { useEffect } from 'react';

// A wandering oneko cat that roams the page on its own — and you can pet it.
// Sprite + frame coordinates from https://github.com/adryd325/oneko.js
export default function Oneko() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // heart-pop animation for petting
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes onekoHeart {
        0%   { opacity: 0; transform: translate(0, 0) scale(0.5); }
        25%  { opacity: 1; }
        100% { opacity: 0; transform: translate(var(--dx, 0px), -38px) scale(1.15); }
      }
    `;
    document.head.appendChild(styleEl);

    const nekoEl = document.createElement('div');
    let nekoPosX = 40;
    let nekoPosY = window.innerHeight - 48;
    let targetX = nekoPosX;
    let targetY = nekoPosY;
    let waitTicks = 0;
    let petHappy = 0;
    let frameCount = 0, idleTime = 0, idleAnimation = null, idleAnimationFrame = 0;
    const nekoSpeed = 10;

    const spriteSets = {
      idle: [[-3, -3]],
      alert: [[-7, -3]],
      scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
      scratchWallN: [[0, 0], [0, -1]],
      scratchWallS: [[-7, -1], [-6, -2]],
      scratchWallE: [[-2, -2], [-2, -3]],
      scratchWallW: [[-4, 0], [-4, -1]],
      tired: [[-3, -2]],
      sleeping: [[-2, 0], [-2, -1]],
      N: [[-1, -2], [-1, -3]],
      NE: [[0, -2], [0, -3]],
      E: [[-3, 0], [-3, -1]],
      SE: [[-5, -1], [-5, -2]],
      S: [[-6, -3], [-7, -2]],
      SW: [[-5, -3], [-6, -1]],
      W: [[-4, -2], [-4, -3]],
      NW: [[-1, 0], [-1, -1]],
    };

    nekoEl.id = 'oneko';
    nekoEl.setAttribute('aria-hidden', 'true');
    nekoEl.title = 'pet me!';
    Object.assign(nekoEl.style, {
      width: '32px',
      height: '32px',
      position: 'fixed',
      pointerEvents: 'auto',
      cursor: 'pointer',
      imageRendering: 'pixelated',
      left: `${nekoPosX - 16}px`,
      top: `${nekoPosY - 16}px`,
      zIndex: '60',
      backgroundImage: 'url(/oneko.gif)',
    });
    document.body.appendChild(nekoEl);

    const setSprite = (name, frame) => {
      const set = spriteSets[name] || spriteSets.idle;
      const sprite = set[frame % set.length];
      nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
    };
    const resetIdleAnimation = () => { idleAnimation = null; idleAnimationFrame = 0; };

    // Pick a new random spot to wander to, then rest a while
    const pickTarget = () => {
      targetX = 40 + Math.random() * Math.max(1, window.innerWidth - 80);
      targetY = 40 + Math.random() * Math.max(1, window.innerHeight - 80);
      waitTicks = 24 + Math.floor(Math.random() * 72);
      idleTime = 0;
      resetIdleAnimation();
    };
    pickTarget();

    const spawnHeart = () => {
      const h = document.createElement('div');
      h.textContent = '❤';
      h.style.cssText =
        `position:fixed;left:${nekoPosX - 5}px;top:${nekoPosY - 22}px;z-index:61;pointer-events:none;` +
        `color:#ff8ab5;font-size:13px;text-shadow:0 0 6px rgba(255,138,181,0.6);` +
        `animation:onekoHeart 1s ease-out forwards;`;
      h.style.setProperty('--dx', `${Math.random() * 22 - 11}px`);
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 1000);
    };

    const onPet = () => {
      for (let i = 0; i < 3; i++) setTimeout(spawnHeart, i * 110);
      targetX = nekoPosX; targetY = nekoPosY; // stop and enjoy the pets
      petHappy = 16;
      nekoEl.style.transition = 'transform 0.14s ease';
      nekoEl.style.transform = 'scale(1.3)';
      setTimeout(() => { nekoEl.style.transform = 'scale(1)'; }, 150);
    };
    nekoEl.addEventListener('click', onPet);

    const idle = () => {
      idleTime += 1;
      if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation == null) {
        const options = ['sleeping', 'scratchSelf'];
        if (nekoPosX < 32) options.push('scratchWallW');
        if (nekoPosY < 32) options.push('scratchWallN');
        if (nekoPosX > window.innerWidth - 32) options.push('scratchWallE');
        if (nekoPosY > window.innerHeight - 32) options.push('scratchWallS');
        idleAnimation = options[Math.floor(Math.random() * options.length)];
      }
      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) { setSprite('tired', 0); break; }
          setSprite('sleeping', Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) resetIdleAnimation();
          break;
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) resetIdleAnimation();
          break;
        default:
          setSprite('idle', 0);
          return;
      }
      idleAnimationFrame += 1;
    };

    const frame = () => {
      frameCount += 1;

      // just been petted — do a happy groom, then resume
      if (petHappy > 0) {
        petHappy -= 1;
        setSprite('scratchSelf', frameCount);
        if (petHappy === 0) waitTicks = 8;
        return;
      }

      const diffX = nekoPosX - targetX;
      const diffY = nekoPosY - targetY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // reached the spot — rest, then pick a new one
      if (distance < 12) {
        nekoPosX = targetX; nekoPosY = targetY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        idle();
        waitTicks -= 1;
        if (waitTicks <= 0) pickTarget();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      let direction = '';
      direction += diffY / distance > 0.5 ? 'N' : '';
      direction += diffY / distance < -0.5 ? 'S' : '';
      direction += diffX / distance > 0.5 ? 'W' : '';
      direction += diffX / distance < -0.5 ? 'E' : '';
      setSprite(direction || 'idle', frameCount);

      nekoPosX -= (diffX / distance) * nekoSpeed;
      nekoPosY -= (diffY / distance) * nekoSpeed;
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    let lastFrameTimestamp, rafId;
    const onAnimationFrame = (timestamp) => {
      if (!nekoEl.isConnected) return;
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp;
      if (timestamp - lastFrameTimestamp > 100) { lastFrameTimestamp = timestamp; frame(); }
      rafId = window.requestAnimationFrame(onAnimationFrame);
    };
    rafId = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      nekoEl.removeEventListener('click', onPet);
      nekoEl.remove();
      styleEl.remove();
    };
  }, []);

  return null;
}
