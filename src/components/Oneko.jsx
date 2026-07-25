import { useEffect } from 'react';

// A wandering oneko cat that roams the page, rests with a random activity
// (sit / sleep / groom / scratch a wall), and can be petted.
// Sprite + frame coordinates from https://github.com/adryd325/oneko.js
export default function Oneko() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
    let restAnim = null;
    let restFrame = 0;
    let frameCount = 0;
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

    // Pick a new place to wander to — sometimes a wall edge so it can scratch it
    const pickTarget = () => {
      const w = window.innerWidth, h = window.innerHeight;
      if (Math.random() < 0.3) {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) { targetX = 20; targetY = 40 + Math.random() * (h - 80); }
        else if (side === 1) { targetX = w - 20; targetY = 40 + Math.random() * (h - 80); }
        else if (side === 2) { targetX = 40 + Math.random() * (w - 80); targetY = 20; }
        else { targetX = 40 + Math.random() * (w - 80); targetY = h - 20; }
      } else {
        targetX = 40 + Math.random() * Math.max(1, w - 80);
        targetY = 40 + Math.random() * Math.max(1, h - 80);
      }
      waitTicks = 26 + Math.floor(Math.random() * 80);
      restAnim = null;
    };
    pickTarget();

    // Choose what the cat does while resting at a spot
    const chooseRest = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const roll = Math.random();
      if (nekoPosY < 40 && roll < 0.7) restAnim = 'scratchWallN';
      else if (nekoPosY > h - 40 && roll < 0.7) restAnim = 'scratchWallS';
      else if (nekoPosX > w - 40 && roll < 0.7) restAnim = 'scratchWallE';
      else if (nekoPosX < 40 && roll < 0.7) restAnim = 'scratchWallW';
      else if (roll < 0.4) restAnim = 'sleeping';
      else if (roll < 0.68) restAnim = 'scratchSelf';
      else restAnim = 'idle';
      restFrame = 0;
    };

    const playRest = () => {
      restFrame += 1;
      switch (restAnim) {
        case 'sleeping':
          if (restFrame < 8) setSprite('tired', 0);
          else setSprite('sleeping', Math.floor(restFrame / 4));
          break;
        case 'scratchSelf':
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
          setSprite(restAnim, restFrame);
          break;
        default:
          setSprite('idle', 0);
      }
    };

    const spawnHeart = () => {
      const heart = document.createElement('div');
      heart.textContent = '❤';
      heart.style.cssText =
        `position:fixed;left:${nekoPosX - 5}px;top:${nekoPosY - 22}px;z-index:61;pointer-events:none;` +
        `color:#ff8ab5;font-size:13px;text-shadow:0 0 6px rgba(255,138,181,0.6);` +
        `animation:onekoHeart 1s ease-out forwards;`;
      heart.style.setProperty('--dx', `${Math.random() * 22 - 11}px`);
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    };

    const onPet = () => {
      for (let i = 0; i < 3; i++) setTimeout(spawnHeart, i * 110);
      targetX = nekoPosX; targetY = nekoPosY;
      petHappy = 22; // ~4 frames "alert" + happy grooming
      nekoEl.style.transition = 'transform 0.14s ease';
      nekoEl.style.transform = 'scale(1.3)';
      setTimeout(() => { nekoEl.style.transform = 'scale(1)'; }, 150);
    };
    nekoEl.addEventListener('click', onPet);

    const frame = () => {
      frameCount += 1;

      // reacting to a pet: perk up (alert), then a happy groom
      if (petHappy > 0) {
        petHappy -= 1;
        if (petHappy > 18) setSprite('alert', 0);
        else setSprite('scratchSelf', frameCount);
        if (petHappy === 0) { waitTicks = 10; restAnim = 'idle'; restFrame = 0; }
        return;
      }

      const diffX = nekoPosX - targetX;
      const diffY = nekoPosY - targetY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      // arrived — rest with a chosen activity, then move on
      if (distance < 12) {
        nekoPosX = targetX; nekoPosY = targetY;
        nekoEl.style.left = `${nekoPosX - 16}px`;
        nekoEl.style.top = `${nekoPosY - 16}px`;
        if (restAnim === null) chooseRest();
        playRest();
        waitTicks -= 1;
        if (waitTicks <= 0) pickTarget();
        return;
      }

      // walking toward the target
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
