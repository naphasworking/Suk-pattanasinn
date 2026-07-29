/* ============================================================
   SUK Pattanasin — site script
   ============================================================ */

/* ────────────────────────────────────────────────────────────
   1. PROJECTS  ← EDIT THIS ARRAY, NOTHING ELSE
   ────────────────────────────────────────────────────────────
   Every card in the Work section comes from here.

   img      Cover photo shown in the grid. Replace cover.jpg in that project's
            folder to change it — no code edit needed.
   dir      Folder holding the gallery. Clicking a card opens every shot in it.
   shots    How many numbered images the folder holds: 01.jpg .. NN.jpg
            ** Add a photo -> bump this number. It is the one thing a static
            site cannot work out for itself, since it can't list a directory. **
   cat      One of: 'dental' | 'specialty' | 'commercial'
            (these drive the filter buttons — see CATEGORIES below)
   th / en  Title and caption in each language.

   The six projects below are the client's REAL work, read from the folders
   they supplied. Captions describe what is visible in the renders; the client
   should confirm locations, unit counts and dates before launch.
   ──────────────────────────────────────────────────────────── */
const PROJECTS = [
    {
        img:   'Asset/projects/chilldent-clinic/cover.jpg',
        dir:   'Asset/projects/chilldent-clinic',
        shots: 7,
        cat: 'dental',
        th: { title: 'Chill Dent Clinic',   sub: 'คลินิกทันตกรรม · โทนครีมและไม้ธรรมชาติ' },
        en: { title: 'Chill Dent Clinic',   sub: 'Dental clinic · cream and natural wood' }
    },
    {
        img:   'Asset/projects/comkrit-eye-clinic/cover.jpg',
        dir:   'Asset/projects/comkrit-eye-clinic',
        shots: 10,
        cat: 'specialty',
        th: { title: 'Comkrit Eye Clinic',  sub: 'คลินิกจักษุ · โทนหินทรเวอร์ทีน' },
        en: { title: 'Comkrit Eye Clinic',  sub: 'Eye clinic · travertine palette' }
    },
    {
        img:   'Asset/projects/forfun-dental/cover.jpg',
        dir:   'Asset/projects/forfun-dental',
        shots: 8,
        cat: 'dental',
        th: { title: 'คลินิกทันตกรรมฟอฟัน',  sub: 'คลินิกทันตกรรม · โทนเขียวมิ้นต์' },
        en: { title: 'Forfun Dental Clinic', sub: 'Dental clinic · mint green palette' }
    },
    {
        img:   'Asset/projects/monday-dental/cover.jpg',
        dir:   'Asset/projects/monday-dental',
        shots: 4,
        cat: 'dental',
        th: { title: 'Monday Dental Clinic', sub: 'คลินิกทันตกรรม · โทนน้ำเงินสดใส' },
        en: { title: 'Monday Dental Clinic', sub: 'Dental clinic · cobalt blue palette' }
    },
    {
        img:   'Asset/projects/nana-dental/cover.jpg',
        dir:   'Asset/projects/nana-dental',
        shots: 12,
        cat: 'dental',
        th: { title: 'คลินิกทันตกรรมนานา',   sub: 'คลินิกทันตกรรม · โทนขาวและฟ้าพาสเทล' },
        en: { title: 'Nana Dental Clinic',   sub: 'Dental clinic · white and pastel blue' }
    },
    {
        img:   'Asset/projects/work-sip-purr/cover.jpg',
        dir:   'Asset/projects/work-sip-purr',
        shots: 8,
        cat: 'commercial',
        th: { title: 'Work, Sip & Purr',    sub: 'คาเฟ่แมว & Co-working · I’m Park กรุงเทพฯ' },
        en: { title: 'Work, Sip & Purr',    sub: 'Cat café & co-working · I’m Park, Bangkok' }
    }
];

const CATEGORIES = [
    { key: 'all',        th: 'ทั้งหมด',          en: 'All' },
    { key: 'dental',     th: 'คลินิกทันตกรรม',    en: 'Dental clinics' },
    { key: 'specialty',  th: 'คลินิกเฉพาะทาง',    en: 'Specialist clinics' },
    { key: 'commercial', th: 'คาเฟ่ & ร้านค้า',   en: 'Café & retail' }
];

/* TODO(form): paste the Google Apps Script web-app URL here to start
   collecting enquiries in a Sheet. Until then the form validates,
   shows a success state, and logs the payload to the console. */
const SHEET_URL = '';

/* ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    const hasGSAP = typeof window.gsap !== 'undefined';
    let currentLang = localStorage.getItem('suk_lang') || 'th';
    let lenis = null;   // assigned in section 7; the lightbox needs to pause it

    /* ────────────────────────────────────────────────────────
       2. LANGUAGE
       ──────────────────────────────────────────────────────── */
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('suk_lang', lang);
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-th][data-en]').forEach(el => {
            const val = el.getAttribute('data-' + lang);
            if (val !== null) el.innerHTML = val;
        });

        document.querySelectorAll('[data-th-ph][data-en-ph]').forEach(el => {
            el.placeholder = el.getAttribute('data-' + lang + '-ph') || '';
        });

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        renderFilters();
        renderProjects(activeFilter);
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    /* ────────────────────────────────────────────────────────
       3. WORK GRID + FILTERS
       ──────────────────────────────────────────────────────── */
    const grid = document.getElementById('work-grid');
    const filterBar = document.getElementById('filters');
    let activeFilter = 'all';

    function renderFilters() {
        // Only show a filter if at least one project uses it
        const used = new Set(PROJECTS.map(p => p.cat));
        filterBar.innerHTML = CATEGORIES
            .filter(c => c.key === 'all' || used.has(c.key))
            .map(c => `<button class="filter${c.key === activeFilter ? ' active' : ''}" data-cat="${c.key}">${c[currentLang]}</button>`)
            .join('');

        filterBar.querySelectorAll('.filter').forEach(btn => {
            btn.addEventListener('click', () => {
                activeFilter = btn.dataset.cat;
                filterBar.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderProjects(activeFilter);
            });
        });
    }

    function mediaMarkup(p, label) {
        if (!p.img) {
            return `<div class="ph is-empty" data-ph="${label}"></div>`;
        }
        // If the file is missing the placeholder takes over automatically
        return `<div class="ph" data-ph="${label}">
                    <img src="${p.img}" alt="${p[currentLang].title}" loading="lazy"
                         onerror="this.closest('.ph').classList.add('is-empty');this.remove()">
                </div>`;
    }

    function renderProjects(filter) {
        grid.innerHTML = PROJECTS.map((p, i) => {
            const hidden = filter !== 'all' && p.cat !== filter;
            const cat = CATEGORIES.find(c => c.key === p.cat);
            return `
            <article class="card${hidden ? ' hidden' : ''}" data-index="${i}">
                <div class="card-media">${mediaMarkup(p, 'PROJECT 0' + (i + 1))}</div>
                <div class="card-meta">
                    <h3 class="card-title">${p[currentLang].title}</h3>
                    <span class="card-cat">${cat ? cat[currentLang] : ''}</span>
                </div>
                <p class="card-sub">${p[currentLang].sub}</p>
            </article>`;
        }).join('');

        grid.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => openLightbox(+card.dataset.index));
        });

        if (hasGSAP) {
            gsap.fromTo(grid.querySelectorAll('.card:not(.hidden)'),
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: .7, stagger: .06, ease: 'power2.out' });
        }
    }

    /* ────────────────────────────────────────────────────────
       4. LIGHTBOX GALLERY
       Horizontal scroll-snap track showing every shot in the
       project's folder, with dot markers on the image's lower edge.
       ──────────────────────────────────────────────────────── */
    const lb       = document.getElementById('lb');
    const lbTrack  = document.getElementById('lb-track');
    const lbDots   = document.getElementById('lb-dots');
    const lbTitle  = document.getElementById('lb-title');
    const lbCount  = document.getElementById('lb-count');
    const lbPrev   = document.getElementById('lb-prev');
    const lbNext   = document.getElementById('lb-next');
    let   lbActive = 0;

    // Asset/projects/<slug>  ->  [Asset/projects/<slug>/01.jpg, .../02.jpg, ...]
    const shotList = p => Array.from({ length: p.shots || 0 },
        (_, k) => `${p.dir}/${String(k + 1).padStart(2, '0')}.jpg`);

    function openLightbox(i) {
        const p = PROJECTS[i];
        const shots = shotList(p);

        // Nothing numbered in the folder yet — fall back to the cover alone
        const srcs = shots.length ? shots : [p.img].filter(Boolean);

        lbTrack.innerHTML = srcs.map((src, k) => `
            <figure class="lb-slide">
                <img src="${src}" alt="${p[currentLang].title} — ${k + 1}"
                     ${k < 2 ? '' : 'loading="lazy"'} decoding="async"
                     onerror="this.closest('.lb-slide').classList.add('gone')">
            </figure>`).join('');

        lbDots.innerHTML = srcs.map((_, k) => `
            <button class="lb-dot${k === 0 ? ' active' : ''}" data-go="${k}"
                    role="tab" aria-label="รูปที่ ${k + 1}"></button>`).join('');

        lbTitle.textContent = `${p[currentLang].title} — ${p[currentLang].sub}`;
        lbActive = 0;
        setCount(0, srcs.length);

        lbTrack.scrollLeft = 0;
        lb.classList.add('open');
        lockScroll(true);
        lbTrack.focus({ preventScroll: true });
    }

    function setCount(i, total) {
        lbCount.textContent = total > 1 ? `${i + 1} / ${total}` : '';
        lbPrev.disabled = i <= 0;
        lbNext.disabled = i >= total - 1;
    }

    function closeLightbox() {
        if (!lb.classList.contains('open')) return;
        lb.classList.remove('open');
        lockScroll(false);
        // release the images so a long gallery isn't held in memory
        setTimeout(() => { if (!lb.classList.contains('open')) lbTrack.innerHTML = ''; }, 500);
    }

    /* Lenis owns the scroll, so body:overflow alone would not stop the page
       moving behind the modal — it has to be told to stand down. */
    function lockScroll(on) {
        document.body.style.overflow = on ? 'hidden' : '';
        if (lenis) on ? lenis.stop() : lenis.start();
    }

    function goToSlide(k) {
        const slide = lbTrack.children[k];
        if (slide) lbTrack.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
    }

    // keep the dots and counter in step with wherever the track has landed
    let scrollTick;
    lbTrack.addEventListener('scroll', () => {
        clearTimeout(scrollTick);
        scrollTick = setTimeout(() => {
            const total = lbTrack.children.length;
            if (!total) return;
            const k = Math.round(lbTrack.scrollLeft / lbTrack.clientWidth);
            if (k === lbActive) return;
            lbActive = Math.max(0, Math.min(total - 1, k));
            lbDots.querySelectorAll('.lb-dot').forEach((d, j) =>
                d.classList.toggle('active', j === lbActive));
            setCount(lbActive, total);
        }, 60);
    }, { passive: true });

    lbDots.addEventListener('click', e => {
        const dot = e.target.closest('.lb-dot');
        if (dot) goToSlide(+dot.dataset.go);
    });

    lbPrev.addEventListener('click', () => goToSlide(lbActive - 1));
    lbNext.addEventListener('click', () => goToSlide(lbActive + 1));

    /* A plain mouse wheel only produces deltaY, which would do nothing in a
       horizontally-scrolling track. Translate it so the wheel scrolls right. */
    lbTrack.addEventListener('wheel', e => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;   // real trackpad swipe
        e.preventDefault();
        lbTrack.scrollLeft += e.deltaY;
    }, { passive: false });

    document.getElementById('lb-close').addEventListener('click', closeLightbox);

    /* A swipe that the browser resolves as a tap was closing the gallery
       mid-gesture. Measure the travel and only treat a near-stationary
       pointer as a real tap. */
    let downX = 0, downY = 0, dragged = false;
    lb.addEventListener('pointerdown', e => { downX = e.clientX; downY = e.clientY; dragged = false; });
    lb.addEventListener('pointermove', e => {
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 10) dragged = true;
    });

    lb.addEventListener('click', e => {
        if (dragged) return;
        // taps on the backdrop or the empty area around a slide close it
        if (e.target === lb || e.target === lbTrack || e.target.classList.contains('lb-slide')) closeLightbox();
    });

    document.addEventListener('keydown', e => {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape')     { closeLightbox(); return; }
        if (e.key === 'ArrowRight') { e.preventDefault(); goToSlide(lbActive + 1); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); goToSlide(lbActive - 1); }
    });

    /* ────────────────────────────────────────────────────────
       5. NAV
       ──────────────────────────────────────────────────────── */
    const nav = document.getElementById('nav');
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');

    const onScroll = () => nav.classList.toggle('stuck', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function setMenu(open) {
        navLinks.classList.toggle('open', open);
        burger.classList.toggle('open', open);
        // the drawer is cream, so the whole nav must drop out of its
        // light-over-hero palette or the burger and TH/EN vanish into it
        nav.classList.toggle('menu-open', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
        if (lenis) open ? lenis.stop() : lenis.start();
    }

    burger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

    /* ────────────────────────────────────────────────────────
       7. LEAD FORM
       ──────────────────────────────────────────────────────── */
    const form = document.getElementById('lead-form');
    const note = document.getElementById('form-note');

    const MSG = {
        th: {
            required: 'กรุณากรอกชื่อและเบอร์โทรศัพท์',
            tel:      'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง',
            sending:  'กำลังส่ง...',
            ok:       'ส่งข้อมูลเรียบร้อย เราจะติดต่อกลับภายใน 1 วันทำการ',
            err:      'ส่งไม่สำเร็จ กรุณาโทรหาเราโดยตรง',
            submit:   'ส่งข้อมูล'
        },
        en: {
            required: 'Please enter your name and phone number',
            tel:      'Please enter a valid phone number',
            sending:  'Sending...',
            ok:       "Thanks — we'll be in touch within one business day.",
            err:      'Could not send. Please call us directly.',
            submit:   'Send enquiry'
        }
    };

    form.addEventListener('submit', e => {
        e.preventDefault();
        const t = MSG[currentLang];
        // form.name would resolve to the form's own name attribute, not the input
        const name = form.elements.namedItem('name');
        const tel = form.elements.namedItem('tel');

        form.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));
        note.className = 'form-note';

        if (!name.value.trim() || !tel.value.trim()) {
            if (!name.value.trim()) name.closest('.field').classList.add('invalid');
            if (!tel.value.trim()) tel.closest('.field').classList.add('invalid');
            note.textContent = t.required;
            note.classList.add('err');
            return;
        }

        // Thai mobile / landline: 9–10 digits, optional +66
        if (!/^\+?[\d\s-]{9,15}$/.test(tel.value.trim())) {
            tel.closest('.field').classList.add('invalid');
            note.textContent = t.tel;
            note.classList.add('err');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = t.sending;
        note.textContent = '';

        const data = new FormData(form);

        const finish = ok => {
            btn.disabled = false;
            btn.textContent = t.submit;
            note.textContent = ok ? t.ok : t.err;
            note.classList.add(ok ? 'ok' : 'err');
            if (ok) form.reset();
        };

        if (!SHEET_URL) {
            // No endpoint wired up yet — show the success path so the UX is testable
            console.log('[lead] no SHEET_URL set. Payload:', Object.fromEntries(data));
            setTimeout(() => finish(true), 600);
            return;
        }

        fetch(SHEET_URL, { method: 'POST', body: data })
            .then(() => finish(true))
            .catch(err => { console.error(err); finish(false); });
    });

    /* ────────────────────────────────────────────────────────
       8. SMOOTH SCROLL + REVEALS
       ──────────────────────────────────────────────────────── */
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof Lenis !== 'undefined' && !reduceMotion) {
        lenis = new Lenis({
            lerp: 0.1,        // follows the wheel closely; duration-based easing felt heavy
            smoothWheel: true,
            syncTouch: false  // never smooth touch — it fights native momentum on phones
        });

        if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
            // One frame loop, not two. GSAP's ticker drives Lenis so the scroll
            // position and ScrollTrigger's recalc land in the same frame.
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add(t => lenis.raf(t * 1000));
            gsap.ticker.lagSmoothing(0);
        } else {
            const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
            requestAnimationFrame(raf);
        }

        // CSS smooth-scroll is disabled while Lenis runs, so anchors are its job
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', e => {
                const id = a.getAttribute('href');
                if (id.length < 2) return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                lenis.scrollTo(target, { offset: -80 });
            });
        });
    } else {
        // No Lenis (CDN blocked or reduced motion) — hand anchors back to the browser
        document.documentElement.classList.add('no-lenis');
    }

    if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Hero headline: masked line-by-line rise
        gsap.set('.hero-title .line-in', { yPercent: 110 });
        gsap.timeline({ delay: .15 })
            .to('.hero-title .line-in', {
                yPercent: 0, duration: 1.15, stagger: .1, ease: 'power3.out'
            })
            .fromTo('.hero .eyebrow', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .8 }, 0)
            .fromTo('.hero-foot .rv', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .9, stagger: .1 }, .5);

        /* Sticky stack: the hero is pinned while the content plate rides up over
           it. Without this it would sit frozen behind the plate; instead it
           drifts and fades so the two feel physically stacked. */
        gsap.to('.hero-inner', {
            yPercent: -14,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: '68% top',      // clear the copy before the plate clips it
                scrub: true
            }
        });

        // slow push-in on the artwork adds depth to the pinned panel
        gsap.to('.hero-bg', {
            scale: 1.07,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
        });

        gsap.to('.scroll-cue', {
            opacity: 0,
            ease: 'none',
            scrollTrigger: { trigger: '.hero', start: 'top top', end: '18% top', scrub: true }
        });

        /* The hero is sticky inside <body>, so it stays pinned behind the plate
           for the whole page. Once it is fully covered there is no reason for
           the compositor to keep a full-viewport image layer alive. */
        const heroEl = document.querySelector('.hero');
        ScrollTrigger.create({
            trigger: '.hero',
            start: 'bottom top',
            onEnter:     () => { heroEl.style.visibility = 'hidden'; },
            onLeaveBack: () => { heroEl.style.visibility = 'visible'; }
        });

        // Everything else on scroll
        gsap.utils.toArray('.rv').forEach(el => {
            if (el.closest('.hero')) return;
            gsap.fromTo(el,
                { opacity: 0, y: 26 },
                {
                    opacity: 1, y: 0, duration: .95, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true }
                });
        });

        gsap.utils.toArray('.rv-img').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, scale: 1.03 },
                {
                    opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 92%', once: true }
                });
        });
    } else {
        // CDN blocked or GSAP failed — never leave the page invisible
        document.querySelectorAll('.rv, .rv-img').forEach(el => { el.style.opacity = 1; });
        document.querySelectorAll('.hero-title .line-in').forEach(el => { el.style.transform = 'none'; });
    }

    /* ────────────────────────────────────────────────────────
       9. BOOT
       ──────────────────────────────────────────────────────── */
    document.getElementById('year').textContent = new Date().getFullYear();
    applyLanguage(currentLang);
});
