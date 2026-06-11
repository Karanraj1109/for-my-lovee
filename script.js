/**
 * ROMANTIC WEBSITE - PREMIUM CINEMATIC ENGINE
 * 60FPS Optimized Vanilla JS with Telegram Sequence, Parallax & Audio System
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // CONFIGURATION
    // ==========================================
    const myName = "KARAN";
    const partnerName = "AYAA";
    const startDate = "2025-09-11T00:00:00"; 

    // ==========================================
    // 0. TELEGRAM INTRO SEQUENCE
    // ==========================================
    const tgIntro = document.getElementById('telegram-intro');
    const notifPill = document.getElementById('notif-pill');
    const notifText = document.getElementById('notif-text');
    const openingScreen = document.getElementById('opening-screen');

    setTimeout(() => {
        notifPill.classList.add('active'); 
        setTimeout(() => {
            notifText.style.opacity = 0;
            setTimeout(() => { notifText.textContent = "🤫🧏"; notifText.style.opacity = 1; }, 500);
            
            setTimeout(() => {
                notifText.style.opacity = 0;
                setTimeout(() => { notifText.textContent = "Aku tidak pernah menyangka..."; notifText.style.opacity = 1; }, 500);
                
                setTimeout(() => {
                    notifText.style.opacity = 0;
                    setTimeout(() => { notifText.textContent = "Bahwa satu pesan sederhana..."; notifText.style.opacity = 1; }, 500);
                    
                    setTimeout(() => {
                        notifText.style.opacity = 0;
                        setTimeout(() => { notifText.textContent = "Akan membawaku ke seseorang yang begitu berarti."; notifText.style.opacity = 1; }, 500);
                        
                        setTimeout(() => {
                            tgIntro.style.opacity = 0;
                            tgIntro.style.filter = "blur(20px)";
                            openingScreen.classList.remove('hidden');
                            setTimeout(() => { tgIntro.classList.add('hidden'); startStarryOpening(); }, 3000);
                        }, 3000);

                    }, 3500);
                }, 3500);
            }, 3000);
        }, 3000);
    }, 1500);

    // ==========================================
    // 1. OPENING CINEMATIC SEQUENCE (GALAXY)
    // ==========================================
    const txtDate = document.getElementById('cine-date');
    const txtStory = document.getElementById('cine-story');
    const opMain = document.getElementById('opening-main');
    const opCanvas = document.getElementById('opening-canvas');
    const opCtx = opCanvas.getContext('2d');

    function resizeOp() { opCanvas.width = window.innerWidth; opCanvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeOp); resizeOp();

    function startStarryOpening() {
        txtDate.style.opacity = 1;
        setTimeout(() => {
            txtDate.style.opacity = 0; txtDate.style.filter = "blur(10px)";
            setTimeout(() => {
                txtStory.style.opacity = 1;
                setTimeout(() => {
                    txtStory.style.opacity = 0; txtStory.style.filter = "blur(10px)";
                    createExplosion();
                    setTimeout(() => opMain.classList.remove('hidden'), 1000);
                }, 3000);
            }, 2000);
        }, 3000);
    }

    let opParticles = [];
    function createExplosion() {
        for(let i=0; i<150; i++) {
            opParticles.push({
                x: opCanvas.width/2, y: opCanvas.height/2,
                vx: (Math.random() - 0.5) * (Math.random() * 25),
                vy: (Math.random() - 0.5) * (Math.random() * 25),
                size: Math.random() * 3, life: 1,
            });
        }
        requestAnimationFrame(animExplosion);
    }
    
    function animExplosion() {
        opCtx.clearRect(0,0, opCanvas.width, opCanvas.height);
        let alive = false;
        opParticles.forEach(p => {
            p.vx *= 0.95; p.vy *= 0.95; p.vy += 0.05; 
            p.x += p.vx; p.y += p.vy; p.life -= 0.008;
            
            if(p.life > 0) {
                alive = true;
                opCtx.fillStyle = `rgba(212, 175, 55, ${p.life})`;
                opCtx.shadowBlur = 15; opCtx.shadowColor = "rgba(232, 180, 184, 0.8)";
                opCtx.beginPath(); opCtx.arc(p.x, p.y, p.size, 0, Math.PI*2); opCtx.fill();
                opCtx.shadowBlur = 0;
            }
        });
        if(alive) requestAnimationFrame(animExplosion);
    }

    // ==========================================
    // AUDIO SYSTEM FIXED & BUTTON START
    // ==========================================
    const audio = document.getElementById('romantic-audio');
    const btnStart = document.getElementById('btn-start'); 
    const musicPlayer = document.getElementById('music-player');
    const btnPlayPause = document.getElementById('btn-play-pause');
    const volBar = document.getElementById('volume-bar');
    const progressBar = document.getElementById('progress-bar');
    const trackStatus = document.getElementById('track-status');
    const mainContent = document.getElementById('main-content');

    let targetVolume = 0.4; 
    let isUserInteracted = false;

    if (audio) {
        audio.volume = 0; 
    }

    function fadeAudioIn() {
        let volumeStep = targetVolume / 30; 
        let fadeInterval = setInterval(() => {
            if (audio.volume < targetVolume) {
                let newVol = audio.volume + volumeStep;
                audio.volume = newVol > targetVolume ? targetVolume : newVol;
            } else {
                clearInterval(fadeInterval);
            }
        }, 100);
    }

    btnStart.addEventListener('click', () => {
        if (!isUserInteracted) {
            isUserInteracted = true;
            
            // Audio Play & UI Update
            if (audio) {
                let playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        fadeAudioIn();
                        if (musicPlayer) musicPlayer.classList.remove('hidden');
                        if (btnPlayPause) btnPlayPause.innerHTML = '<i class="ph-fill ph-pause"></i>';
                        if (trackStatus) trackStatus.textContent = "Our Song 🎵";
                    }).catch(error => {
                        console.error("Autoplay diblokir:", error);
                        if (trackStatus) trackStatus.textContent = "Klik untuk Play 🎵";
                        if (musicPlayer) musicPlayer.classList.remove('hidden');
                    });
                }
            }

            // Cinematic UI Transition
            openingScreen.style.opacity = '0';
            openingScreen.style.filter = 'blur(20px)';
            openingScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                openingScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                window.scrollTo(0,0);
                initMainSystems();
            }, 2000);
        }
    });

    if (btnPlayPause && audio) {
        btnPlayPause.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                btnPlayPause.innerHTML = '<i class="ph-fill ph-pause"></i>';
                trackStatus.textContent = "Our Song 🎵";
            } else {
                audio.pause();
                btnPlayPause.innerHTML = '<i class="ph-fill ph-play"></i>';
                trackStatus.textContent = "Paused";
            }
        });
    }

    if (volBar && audio) {
        volBar.addEventListener('input', (e) => {
            targetVolume = e.target.value / 100;
            audio.volume = targetVolume;
        });
    }

    if (progressBar && audio) {
        audio.addEventListener('timeupdate', () => {
            if (!audio.duration) return;
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.value = progressPercent;
        });

        progressBar.addEventListener('input', (e) => {
            if (!audio.duration) return;
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        });
    }

    // ==========================================
    // 2. MOUSE/GYRO 3D PARALLAX ENGINE
    // ==========================================
    function init3DTilt() {
        const parallaxLayers = document.querySelectorAll('.parallax-layer');
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2);
            const y = (e.clientY - window.innerHeight / 2);
            
            parallaxLayers.forEach(layer => {
                const speed = layer.getAttribute('data-speed');
                layer.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
            });
        });

        document.querySelectorAll('.parallax-card, .flip-card-inner').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                const cx = rect.width / 2; const cy = rect.height / 2;
                const rx = ((y - cy) / cy) * -6; const ry = ((x - cx) / cx) * 6; 
                
                card.style.setProperty('--rx', `${rx}deg`);
                card.style.setProperty('--ry', `${ry}deg`);
                card.style.setProperty('--ty', `-10px`);
                card.style.transition = 'none';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
                card.style.setProperty('--rx', `0deg`);
                card.style.setProperty('--ry', `0deg`);
                card.style.setProperty('--ty', `0px`);
            });
        });
    }

    // ==========================================
    // 3. HEART CURSOR TRAIL
    // ==========================================
    const cursorTrail = document.getElementById('cursor-trail');
    let lastMove = 0;
    function addHeart(e) {
        if(Date.now() - lastMove < 50) return; 
        lastMove = Date.now();
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        
        const heart = document.createElement('div');
        heart.className = 'trail-heart';
        heart.innerHTML = '<i class="ph-fill ph-heart"></i>';
        heart.style.left = (x - 10) + 'px';
        heart.style.top = (y - 10) + 'px';
        cursorTrail.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
    window.addEventListener('mousemove', addHeart, {passive: true});
    window.addEventListener('touchmove', addHeart, {passive: true});

    // ==========================================
    // 4. MAIN SYSTEMS INIT
    // ==========================================
    function initMainSystems() {
        initLoveCounter();
        initScrollReveal();
        injectReasonsCards();
        initConstellation();
        initShootingStars();
        init3DTilt();
    }

    // ==========================================
    // 5. PREMIUM LOVE COUNTER
    // ==========================================
    function initLoveCounter() {
        const dEl = document.getElementById('count-days');
        const hEl = document.getElementById('count-hours');
        const mEl = document.getElementById('count-minutes');
        const sEl = document.getElementById('count-seconds');
        
        function update() {
            const start = new Date(startDate).getTime();
            const now = new Date().getTime();
            const diff = now - start;

            if(diff < 0) { dEl.textContent="00"; hEl.textContent="00"; mEl.textContent="00"; sEl.textContent="00"; return; }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);

            dEl.textContent = d.toString().padStart(2, '0');
            hEl.textContent = h.toString().padStart(2, '0');
            mEl.textContent = m.toString().padStart(2, '0');
            sEl.textContent = s.toString().padStart(2, '0');
        }
        setInterval(update, 1000); update();
    }

    // ==========================================
    // 6. SCROLL REVEAL & AUDIO DUCKING
    // ==========================================
    let isReadingLetter = false;
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-blur');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.15 });
        reveals.forEach(rev => observer.observe(rev));

        const letterParagraphs = document.querySelectorAll('.letter-paragraph');
        const letterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('scrolled-in'); });
        }, { threshold: 0.8, rootMargin: "0px 0px -100px 0px" });
        letterParagraphs.forEach(p => letterObserver.observe(p));

        const letterSection = document.getElementById('letter');
        const audioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isReadingLetter = entry.isIntersecting;
                if(audio && !audio.paused) {
                    audio.volume = isReadingLetter ? 0.1 : targetVolume;
                }
            });
        }, { threshold: 0.5 });
        if(letterSection) audioObserver.observe(letterSection);
    }

    // ==========================================
    // 7. DIGITAL ARCHIVE LIGHTBOX
    // ==========================================
    window.openArchive = function(element) {
        const visualBg = element.querySelector('.archive-visual').style.backgroundImage;
        const caption = element.querySelector('.archive-caption').textContent;
        
        const lbVisual = document.getElementById('lightbox-visual');
        lbVisual.style.backgroundImage = visualBg;
        
        document.getElementById('lightbox-caption').textContent = caption;
        document.getElementById('archive-lightbox').classList.add('active');
    };

    document.getElementById('close-lightbox').addEventListener('click', () => {
        document.getElementById('archive-lightbox').classList.remove('active');
    });

    // ==========================================
    // 8. FIX: 30 REASONS I LOVE YOU (DATA & INJECTOR)
    // ==========================================
    const reasonsData = [
        "Senyummu selalu membuat hariku lebih baik",
        "Kamu selalu mendengarkanku",
        "Kamu membuatku merasa dihargai",
        "Kamu selalu ada saat aku membutuhkanmu",
        "Kamu membuatku nyaman menjadi diriku sendiri",
        "Kamu memiliki hati yang baik",
        "Kamu selalu berusaha memahami aku",
        "Kamu membuatku merasa spesial",
        "Kamu adalah tempat ternyamanku",
        "Kamu selalu memberi semangat",
        "Kamu membuatku tersenyum tanpa alasan",
        "Kamu begitu perhatian",
        "Kamu membuat hari-hariku lebih berwarna",
        "Kamu selalu sabar menghadapi aku",
        "Kamu membuatku merasa dicintai",
        "Kamu menerima kekuranganku",
        "Kamu membuatku ingin menjadi lebih baik",
        "Kamu adalah teman terbaikku",
        "Kamu selalu membuatku tertawa",
        "Kamu begitu tulus",
        "Kamu adalah bagian terindah dalam hidupku",
        "Kamu membuatku merasa aman",
        "Kamu selalu mendukungku",
        "Kamu membuat setiap hari terasa istimewa",
        "Kamu tidak pernah menyerah pada kita",
        "Kamu membuat jarak terasa lebih dekat",
        "Kamu selalu berhasil menenangkanku",
        "Kamu adalah alasan aku bersyukur setiap hari",
        "Kamu membuat masa depan terasa indah",
        "Karena kamu adalah kamu ❤️"
    ];

    function injectReasonsCards() {
        const container = document.getElementById('reasons-container');
        if (!container) return; 
        
        let html = '';
        reasonsData.forEach((desc, i) => {
            html += `
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front glass-ultra">
                        <span class="card-number">${i + 1}</span>
                        <div class="icon"><i class="ph-fill ph-heart"></i></div>
                        <h3>Alasan ${i + 1}</h3>
                    </div>
                    <div class="flip-card-back glass-ultra">
                        <p>${desc}</p>
                    </div>
                </div>
            </div>`;
        });
        container.innerHTML = html;
        
        setTimeout(() => {
            document.querySelectorAll('.flip-card').forEach(card => {
                ['click', 'touchstart'].forEach(evt => {
                    card.addEventListener(evt, function(e) {
                        if(evt === 'touchstart') e.preventDefault();
                        this.classList.toggle('flipped');
                    }, {passive: false});
                });
            });
        }, 100);
    }

    // ==========================================
    // 9. CONSTELLATION MAGICAL ENGINE (FIXED HEART BUG)
    // ==========================================
    function initConstellation() {
        const cvs = document.getElementById('constellation-canvas');
        if(!cvs) return;
        const ctx = cvs.getContext('2d');
        
        let width = cvs.width = cvs.parentElement.clientWidth;
        let height = cvs.height = cvs.parentElement.clientHeight;

        window.addEventListener('resize', () => { 
            width = cvs.width = cvs.parentElement.clientWidth; 
            height = cvs.height = cvs.parentElement.clientHeight; 
        });

        const words = [`${myName} & ${partnerName}`, "❤️", "Happy 9 Months"];
        let currentWordIndex = 0;
        let cParticles = [];
        
        for(let i=0; i<300; i++){
            cParticles.push({
                x: Math.random()*width, y: Math.random()*height,
                targetX: Math.random()*width, targetY: Math.random()*height,
                size: Math.random()*2+1, friction: 0.85, ease: 0.06,
                vx: 0, vy: 0, isTargeting: false
            });
        }

        function getTextData(text) {
            const offCvs = document.createElement('canvas'); 
            const offCtx = offCvs.getContext('2d');
            offCvs.width = width; offCvs.height = height;
            
            offCtx.fillStyle = '#000'; offCtx.fillRect(0,0,width,height);
            offCtx.fillStyle = '#fff';
            
            let fontSize;
            if(text === "❤️") {
                fontSize = Math.min(width, height) * 0.45;
                offCtx.font = `${fontSize}px Arial, sans-serif`;
            } else {
                fontSize = width > 600 ? 55 : 28;
                offCtx.font = `bold ${fontSize}px 'Cinzel', serif`;
            }
            
            offCtx.textAlign = 'center'; 
            offCtx.textBaseline = 'middle';
            offCtx.fillText(text, width/2, height/2);

            const data = offCtx.getImageData(0,0,width,height).data;
            const points = [];
            let step = width < 500 ? 4 : 6;
            
            for(let y=0; y<height; y+=step) {
                for(let x=0; x<width; x+=step) {
                    if(data[((y*width)+x)*4] > 128) points.push({x,y});
                }
            }
            return points;
        }

        function changeWord() {
            const points = getTextData(words[currentWordIndex]);
            points.sort(() => Math.random() - 0.5);
            
            cParticles.forEach((p, i) => {
                if(i < points.length) { 
                    p.targetX = points[i].x; p.targetY = points[i].y; p.isTargeting = true; 
                } else { 
                    p.targetX = Math.random()*width; p.targetY = Math.random()*height; p.isTargeting = false; 
                }
            });
            currentWordIndex = (currentWordIndex+1) % words.length;
        }

        setInterval(changeWord, 4000); 
        changeWord(); 

        function drawConstellation() {
            ctx.clearRect(0,0,width,height);
            ctx.beginPath();
            for(let i=0; i<cParticles.length; i++) {
                let p = cParticles[i];
                p.vx += (p.targetX - p.x) * p.ease; 
                p.vy += (p.targetY - p.y) * p.ease;
                p.vx *= p.friction; p.vy *= p.friction; 
                p.x += p.vx; p.y += p.vy;

                if(!p.isTargeting) { 
                    p.targetX += (Math.random()-0.5)*10; p.targetY += (Math.random()-0.5)*10; 
                }

                ctx.moveTo(p.x, p.y); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                
                if(p.isTargeting) {
                    for(let j=i+1; j<cParticles.length; j+=6) { 
                        let p2 = cParticles[j];
                        if(p2.isTargeting) {
                            let dist = (p.x - p2.x)**2 + (p.y - p2.y)**2;
                            if(dist < 400) { ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y); }
                        }
                    }
                }
            }
            ctx.fillStyle = '#E8B4B8'; ctx.fill();
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.2)'; ctx.stroke();
            requestAnimationFrame(drawConstellation);
        }
        drawConstellation();
    }

    // ==========================================
    // 10. SECRET BUTTON CINEMATIC
    // ==========================================
    const btnSecret = document.getElementById('btn-secret-trigger');
    const secOverlay = document.getElementById('secret-overlay');
    const btnCloseSec = document.getElementById('btn-close-secret');
    const secTexts = [
        document.getElementById('sec-txt-1'), document.getElementById('sec-txt-2'),
        document.getElementById('sec-txt-3'), document.getElementById('sec-txt-4'), document.getElementById('sec-txt-5')
    ];

    btnSecret.addEventListener('click', () => {
        if (audio) audio.volume = 0.2; 
        secOverlay.classList.add('active');

        let delay = 1000;
        secTexts.forEach((txt, idx) => {
            setTimeout(() => {
                txt.classList.add('active');
                if(idx === 4) { createConfetti(); setTimeout(()=> btnCloseSec.classList.remove('hidden'), 3000); }
                else { setTimeout(() => { txt.classList.remove('active'); }, 3000); }
            }, delay);
            delay += 4000;
        });
    });

    btnCloseSec.addEventListener('click', () => {
        secOverlay.classList.remove('active');
        secTexts.forEach(t => t.classList.remove('active'));
        btnCloseSec.classList.add('hidden');
        if (audio && volBar) audio.volume = targetVolume;
    });

    function createConfetti() {
        for (let i = 0; i < 150; i++) {
            const conf = document.createElement('div');
            conf.innerHTML = Math.random() > 0.5 ? '<i class="ph-fill ph-heart" style="color:var(--rose-gold)"></i>' : '✨';
            conf.style.position = 'absolute'; conf.style.left = Math.random() * 100 + 'vw'; conf.style.top = '-50px';
            conf.style.zIndex = '5'; conf.style.fontSize = Math.random() * 20 + 10 + 'px';
            conf.style.pointerEvents = 'none'; conf.style.transition = `all ${Math.random() * 3 + 3}s linear`;
            secOverlay.appendChild(conf);

            setTimeout(() => {
                conf.style.top = '105vh';
                conf.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
            }, 50);
            setTimeout(() => conf.remove(), 6000);
        }
    }

    // ==========================================
    // 11. SHOOTING STARS
    // ==========================================
    function initShootingStars() {
        const ssContainer = document.getElementById('shooting-stars-container');
        setInterval(() => {
            if(document.hidden) return;
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.top = Math.random() * 50 + 'vh';
            star.style.right = Math.random() * 50 + 'vw';
            ssContainer.appendChild(star);
            setTimeout(() => star.remove(), 2000);
        }, 8000); 
    }
});