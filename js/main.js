/* ============================================
   GitHub Profile - Interactive Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTabs();
    initAudioPlayer();
    initHeatmap();
    initRepoSearch();
    initOverviewTyping();
    initCanvasVideo();
    initLive2D();
});

/* === Particle Background === */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const maxParticles = 50;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); this.y = Math.random() * canvas.height; }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = Math.random() * 0.35 + 0.08;
            this.speedX = (Math.random() - 0.5) * 0.25;
            this.opacity = Math.random() * 0.4 + 0.08;
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y > canvas.height + 10) { this.reset(); this.y = -10; }
            if (this.x < -10) this.x = canvas.width + 10;
            if (this.x > canvas.width + 10) this.x = -10;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(88, 166, 255, ' + this.opacity + ')';
            ctx.fill();
        }
    }

    for (let i = 0; i < maxParticles; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(88, 166, 255, ' + (0.05 * (1 - dist / 120)) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

/* === Tab Switching === */
function initTabs() {
    const tabs = document.querySelectorAll('.gh-tab');
    const sections = document.querySelectorAll('.tab-content');
    if (!tabs.length || !sections.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-tab');
            if (!targetId) return;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Show/hide sections
            sections.forEach(sec => {
                sec.classList.remove('active');
                if (sec.id === targetId) sec.classList.add('active');
            });

            // Update URL hash
            if (history.pushState) {
                history.pushState(null, null, '#' + targetId);
            }
        });
    });

    // Handle initial hash
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetTab = document.querySelector('.gh-tab[data-tab="' + hash + '"]');
        if (targetTab) targetTab.click();
    }

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
        const h = window.location.hash.replace('#', '');
        if (h) {
            const t = document.querySelector('.gh-tab[data-tab="' + h + '"]');
            if (t) t.click();
        }
    });
}

/* === Audio Player (Autoplay + Redesigned Button) === */
function initAudioPlayer() {
    const audio = document.getElementById('bgm-audio');
    const toggleBtn = document.getElementById('music-toggle');
    const toast = document.getElementById('audio-toast');
    if (!audio || !toggleBtn) return;

    let isPlaying = false;

    function updateUI() {
        if (isPlaying) {
            toggleBtn.classList.add('playing');
            toggleBtn.querySelector('.gh-music-icon').textContent = '🔊';
            if (toast) toast.classList.add('visible');
        } else {
            toggleBtn.classList.remove('playing');
            toggleBtn.querySelector('.gh-music-icon').textContent = '🔇';
            if (toast) toast.classList.remove('visible');
        }
    }

    updateUI();

    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
        } else {
            audio.play().then(() => { isPlaying = true; }).catch(() => {});
            isPlaying = true;
        }
        updateUI();
    });

    audio.addEventListener('play', () => { isPlaying = true; updateUI(); });
    audio.addEventListener('pause', () => { isPlaying = false; updateUI(); });
    audio.addEventListener('ended', () => { isPlaying = false; updateUI(); });
    audio.volume = 0.3;
}

/* === Repository Search === */
function initRepoSearch() {
    const input = document.getElementById('repo-search-input');
    const dropdown = document.getElementById('search-dropdown');
    const results = document.getElementById('search-results');
    if (!input || !dropdown || !results) return;

    // Real repo data
    const repos = [
        {
            name: 'EGEVIDEO',
            desc: '在 EGE 图形环境中播放 MJPEG AVI 视频',
            lang: 'C++',
            langColor: '#f34b7d',
            stars: 1,
            url: 'https://github.com/StarTensor/EGEVIDEO',
            updated: 'Jul 5, 2026'
        },
        {
            name: 'startensor.github.io',
            desc: '个人 GitHub Pages',
            lang: 'CSS',
            langColor: '#563d7c',
            stars: 0,
            url: 'https://github.com/StarTensor/startensor.github.io',
            updated: 'Jan 25, 2026'
        }
    ];

    function renderResults(filtered) {
        results.innerHTML = '';
        if (filtered.length === 0) {
            results.innerHTML = '<div class="gh-search-empty">No repositories found</div>';
        } else {
            filtered.forEach(repo => {
                const item = document.createElement('div');
                item.className = 'gh-search-result-item';
                item.innerHTML = 
                    '<span class="gh-search-result-icon">📁</span>' +
                    '<div class="gh-search-result-info">' +
                        '<div class="gh-search-result-name">' + repo.name + '</div>' +
                        '<div class="gh-search-result-desc">' + repo.desc + '</div>' +
                    '</div>' +
                    '<div class="gh-search-result-meta">' +
                        '<span><span class="gh-lang-dot" style="background:' + repo.langColor + ';width:8px;height:8px;display:inline-block;border-radius:50%;margin-right:3px;"></span>' + repo.lang + '</span>' +
                        '<span>⭐ ' + repo.stars + '</span>' +
                    '</div>';
                item.addEventListener('click', () => {
                    window.open(repo.url, '_blank');
                    dropdown.style.display = 'none';
                    input.value = '';
                });
                results.appendChild(item);
            });
        }
    }

    function doSearch() {
        const query = input.value.toLowerCase().trim();
        if (query.length === 0) {
            dropdown.style.display = 'none';
            return;
        }
        const filtered = repos.filter(r =>
            r.name.toLowerCase().includes(query) ||
            r.desc.toLowerCase().includes(query) ||
            r.lang.toLowerCase().includes(query)
        );
        renderResults(filtered);
        dropdown.style.display = 'block';
    }

    input.addEventListener('input', doSearch);
    input.addEventListener('focus', () => {
        if (input.value.trim().length > 0) dropdown.style.display = 'block';
        else {
            renderResults(repos);
            dropdown.style.display = 'block';
        }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#repo-search-wrapper')) {
            dropdown.style.display = 'none';
        }
    });

    // Keyboard shortcut: "/" focuses search
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== input && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            input.focus();
        }
        if (e.key === 'Escape') {
            dropdown.style.display = 'none';
            input.blur();
        }
    });
}

/* === Contribution Heatmap with REAL GitHub Data === */
function initHeatmap() {
    const grid = document.getElementById('heatmap-grid');
    if (!grid) return;

    // Real contribution data from github.com/StarTensor (2026, 28 weeks)
    const REAL_DATA = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4];

    const daysPerWeek = 7;
    const totalWeeks = REAL_DATA.length / daysPerWeek;

    for (let w = 0; w < totalWeeks; w++) {
        const weekCol = document.createElement('div');
        weekCol.className = 'gh-heatmap-week';

        for (let d = 0; d < daysPerWeek; d++) {
            const cell = document.createElement('div');
            cell.className = 'gh-heatmap-cell';
            const idx = w * daysPerWeek + d;
            const level = REAL_DATA[idx] || 0;
            cell.setAttribute('data-level', level);
            cell.title = level + ' contribution' + (level !== 1 ? 's' : '') + ' on week ' + (totalWeeks - w);
            weekCol.appendChild(cell);
        }
        grid.appendChild(weekCol);
    }
}

/* === Overview Typing Effect === */
function initOverviewTyping() {
    const el = document.getElementById('nb-tagline');
    if (!el) return;
    const phrases = [
        '＞ Building with C++ & Passion_',
        '＞ Exploring Computer Vision_',
        '＞ Welcome to my Code Universe_'
    ];
    let pi = 0, ci = 0, deleting = false;
    function tick() {
        const cur = phrases[pi];
        if (deleting) { el.textContent = cur.substring(0, ci - 1); ci--; }
        else { el.textContent = cur.substring(0, ci + 1); ci++; }
        let delay = deleting ? 30 : 60;
        if (!deleting && ci === cur.length) { delay = 1800; deleting = true; }
        else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 600);
}

/* === Matrix Code Rain Canvas === */
function initCanvasVideo() {
    const c = document.getElementById('nb-video-canvas');
    if (!c) return;
    const x = c.getContext('2d');
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}[]|&^%$#@!';
    const fontSize = 14;
    let columns, drops;

    function resize() {
        c.width = c.parentElement.clientWidth;
        c.height = c.width * 9 / 16;
        columns = Math.floor(c.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -c.height / fontSize;
        }
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
        x.fillStyle = 'rgba(13, 17, 23, 0.08)';
        x.fillRect(0, 0, c.width, c.height);
        x.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const px = i * fontSize;
            const py = drops[i] * fontSize;

            x.fillStyle = 'rgba(63, 185, 80, 0.9)';
            x.fillText(char, px, py);

            for (let j = 1; j <= 5; j++) {
                const alpha = 0.15 / j;
                x.fillStyle = 'rgba(63, 185, 80, ' + alpha + ')';
                x.fillText(chars[Math.floor(Math.random() * chars.length)], px, py - j * fontSize);
            }

            if (py > c.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
}

/* === Live2D Widget === */
function initLive2D() {
    if (typeof initWidget !== 'function') {
        console.warn('Live2D: initWidget not available');
        return;
    }

    initWidget({
        waifuPath: 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/waifu-tips.json',
        cdnPath: 'https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/',
        cubism2Path: 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/live2d.min.js',
        tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit'],
        logLevel: 'warn',
        drag: false,
    });
}
