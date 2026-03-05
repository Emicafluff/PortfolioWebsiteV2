/* ═══════════════════════════════════════════════════════════
   cozy.js — shared cursor & sparkle trail, all pages
═══════════════════════════════════════════════════════════ */
(function () {
    const cursor   = document.getElementById('cozy-cursor');
    const sparkles = ['✨', '⭐', '🌸', '💫', '🌟', '🍄', '🌿'];

    if (!cursor) return;

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { cursor.style.opacity = '1'; });

    // Sparkle trail
    let sparkleTimer = null;
    document.addEventListener('mousemove', e => {
        if (sparkleTimer) return;
        sparkleTimer = setTimeout(() => {
            const s = document.createElement('div');
            s.className   = 'cursor-sparkle';
            s.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            s.style.left     = (e.clientX + (Math.random() * 28 - 14)) + 'px';
            s.style.top      = (e.clientY + (Math.random() * 28 - 14)) + 'px';
            s.style.fontSize = (Math.random() * 10 + 9) + 'px';
            document.body.appendChild(s);
            requestAnimationFrame(() => { s.style.opacity = '1'; });
            setTimeout(() => {
                s.style.opacity = '0';
                setTimeout(() => s.remove(), 320);
            }, 420);
            sparkleTimer = null;
        }, 80);
    });

    // Grow cursor over clickable elements
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1.5)'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'translate(-50%,-50%) scale(1)'; });
    });
})();