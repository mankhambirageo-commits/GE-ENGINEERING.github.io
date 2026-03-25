// ═══════════════════════════════════════════════════════════════
// GE ENGINEERING — Main Script
// ═══════════════════════════════════════════════════════════════

// ─── Products ──────────────────────────────────────────────────
const defaultProducts = [
    { id: 1, name: "Arduino Starter Kit", price: 15000, category: "DIY Modules", description: "Complete kit for beginners to learn electronics", images: [] },
    { id: 2, name: "Resistor Assortment Pack", price: 3500, category: "Components", description: "1000 resistors in various values", images: [] },
    { id: 3, name: "Soldering Iron Kit", price: 8500, category: "Consumables", description: "60W soldering iron with accessories", images: [] },
    { id: 4, name: "Raspberry Pi 4", price: 45000, category: "DIY Modules", description: "4GB RAM model with case and accessories", images: [] },
    { id: 5, name: "Capacitor Kit", price: 5000, category: "Components", description: "Assorted ceramic and electrolytic capacitors", images: [] },
    { id: 6, name: "Multimeter", price: 12000, category: "Consumables", description: "Digital multimeter with auto-ranging", images: [] }
];
function loadProducts() { try { const s = localStorage.getItem('ge_products'); if (s) return JSON.parse(s); } catch (e) {} return defaultProducts.map(p => ({ ...p })); }
function saveProducts() { try { localStorage.setItem('ge_products', JSON.stringify(products)); } catch (e) { alert('Storage limit reached.'); } }
let products = loadProducts();

// ─── Portfolio ─────────────────────────────────────────────────
function loadPortfolio() { try { const s = localStorage.getItem('ge_portfolio'); if (s) return JSON.parse(s); } catch (e) {} return []; }
function savePortfolio() { try { localStorage.setItem('ge_portfolio', JSON.stringify(portfolioPosts)); } catch (e) { alert('Storage limit reached.'); } }
let portfolioPosts = loadPortfolio();
function loadLikedPosts() { try { const s = localStorage.getItem('ge_liked_posts'); if (s) return new Set(JSON.parse(s)); } catch (e) {} return new Set(); }
function saveLikedPosts() { try { localStorage.setItem('ge_liked_posts', JSON.stringify([...likedPosts])); } catch (e) {} }
let likedPosts = loadLikedPosts();

// ─── Testimonials ──────────────────────────────────────────────
const defaultTestimonials = [
    { id: 1, name: "James Mwale", service: "Solar Installations", rating: 5, text: "GE Engineering installed our 2kW solar system in just two days. Excellent workmanship and very professional team. Highly recommended!", approved: true, date: "2025-03-10" },
    { id: 2, name: "Grace Phiri", service: "Domestic Electrical Installation", rating: 5, text: "They wired our new home from scratch. Very neat work, on time and within budget. We are very happy with the results.", approved: true, date: "2025-04-02" },
    { id: 3, name: "Emmanuel Banda", service: "Fault Finding & Repair", rating: 4, text: "Found the fault in our factory control system quickly when others couldn't. Saved us a lot of downtime. Great service.", approved: true, date: "2025-05-15" }
];
function loadTestimonials() { try { const s = localStorage.getItem('ge_testimonials'); if (s) return JSON.parse(s); } catch (e) {} return defaultTestimonials.map(t => ({ ...t })); }
function saveTestimonials() { try { localStorage.setItem('ge_testimonials', JSON.stringify(testimonials)); } catch (e) {} }
let testimonials = loadTestimonials();

// ─── FAQs ──────────────────────────────────────────────────────
const defaultFAQs = [
    { id: 1, question: "What areas do you serve?", answer: "We primarily serve Lilongwe and surrounding areas in Malawi. For large industrial projects, we can travel to other regions — contact us to discuss." },
    { id: 2, question: "How long does a solar installation take?", answer: "A typical residential solar installation takes 1-3 days depending on system size. Larger commercial installations may take up to a week." },
    { id: 3, question: "Do you offer warranties on your work?", answer: "Yes, all our installations come with a 12-month workmanship warranty. Equipment warranties are provided by the respective manufacturers." },
    { id: 4, question: "How do I get a quote?", answer: "Fill in our quick quote form on this page, or contact us directly on WhatsApp at +265 885 890 781. We typically respond within a few hours." },
    { id: 5, question: "Can I purchase individual components?", answer: "Yes! Visit our Marketplace section to browse and purchase electronic components, tools, and DIY kits with WhatsApp checkout." },
    { id: 6, question: "What payment methods do you accept?", answer: "We accept mobile money (Airtel Money, TNM Mpamba), bank transfers, and cash payments upon completion of work." }
];
function loadFAQs() { try { const s = localStorage.getItem('ge_faqs'); if (s) return JSON.parse(s); } catch (e) {} return defaultFAQs.map(f => ({ ...f })); }
function saveFAQs() { try { localStorage.setItem('ge_faqs', JSON.stringify(faqs)); } catch (e) {} }
let faqs = loadFAQs();

// ─── Banner ─────────────────────────────────────────────────────
function loadBanner() { try { const s = localStorage.getItem('ge_banner'); if (s) return JSON.parse(s); } catch (e) {} return { message: '', active: false }; }
function saveBanner() { try { localStorage.setItem('ge_banner', JSON.stringify(banner)); } catch (e) {} }
let banner = loadBanner();
let bannerDismissedThisSession = false;

// ─── Global State ───────────────────────────────────────────────
let cart = [];
let currentEditId = null;
let isAdminAuthenticated = false;
let currentImages = [];
const cardImageIndex = {};
let activeService = '';
let currentPostImages = [];
const postImageIndex = {};
let lightboxImages = [], lightboxIndex = 0;
let selectedRating = 0;
const ADMIN_PASSWORD = "geadmin123";
const MAX_IMAGES = 5;

// ─── DOM Refs ───────────────────────────────────────────────────
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.querySelector('.cart-count');
const cartSidebar = document.getElementById('cartSidebar');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productsGrid = document.getElementById('productsGrid');
const adminPanel = document.getElementById('adminPanel');
const toggleAdminBtn = document.getElementById('toggleAdminBtn');
const adminForm = document.getElementById('adminForm');
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const productImagesInput = document.getElementById('productImages');
const imagePreviewGrid = document.getElementById('imagePreviewGrid');
const lightboxOverlay = document.getElementById('lightboxOverlay');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxDots = document.getElementById('lightboxDots');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const portfolioOverlay = document.getElementById('portfolioOverlay');
const portfolioServiceIcon = document.getElementById('portfolioServiceIcon');
const portfolioServiceName = document.getElementById('portfolioServiceName');
const portfolioCloseBtn = document.getElementById('portfolioCloseBtn');
const portfolioAdminArea = document.getElementById('portfolioAdminArea');
const portfolioPostsGrid = document.getElementById('portfolioPostsGrid');
const portfolioEmpty = document.getElementById('portfolioEmpty');
const postImagesInput = document.getElementById('postImages');
const postImagePreviewGrid = document.getElementById('postImagePreviewGrid');
const submitPostBtn = document.getElementById('submitPostBtn');
const estimatorOverlay = document.getElementById('estimatorOverlay');
const estimatorClose = document.getElementById('estimatorClose');
const estService = document.getElementById('estService');
const estInputs = document.getElementById('estInputs');
const calcEstimateBtn = document.getElementById('calcEstimateBtn');
const estimateResult = document.getElementById('estimateResult');
const estimateValue = document.getElementById('estimateValue');
const promoBanner = document.getElementById('promoBanner');
const bannerMessage = document.getElementById('bannerMessage');
const bannerDismiss = document.getElementById('bannerDismiss');

// ─── Image Compression ─────────────────────────────────────────
function compressImage(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                const MAX = 900; let w = img.width, h = img.height;
                if (w > h) { if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; } }
                else { if (h > MAX) { w = Math.round(w * MAX / h); h = MAX; } }
                const c = document.createElement('canvas'); c.width = w; c.height = h;
                c.getContext('2d').drawImage(img, 0, 0, w, h);
                resolve(c.toDataURL('image/jpeg', 0.72));
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    });
}

function renderImagePreviews(arr, grid, inputId) {
    grid.innerHTML = '';
    arr.forEach((src, idx) => {
        const wrap = document.createElement('div'); wrap.className = 'preview-thumb';
        wrap.innerHTML = `<img src="${src}" alt="Photo ${idx+1}"><button class="remove-preview-btn"><i class="fas fa-times"></i></button>`;
        wrap.querySelector('.remove-preview-btn').addEventListener('click', () => { arr.splice(idx, 1); renderImagePreviews(arr, grid, inputId); });
        grid.appendChild(wrap);
    });
    if (arr.length < MAX_IMAGES) {
        const more = document.createElement('label'); more.className = 'preview-add-more'; more.htmlFor = inputId; more.innerHTML = '<i class="fas fa-plus"></i>';
        grid.appendChild(more);
    }
}

// ─── Banner ─────────────────────────────────────────────────────
function applyBanner() {
    if (banner.active && banner.message && !bannerDismissedThisSession) {
        bannerMessage.textContent = banner.message;
        promoBanner.style.display = 'flex';
    } else {
        promoBanner.style.display = 'none';
    }
}

// ─── Post Count Badges ──────────────────────────────────────────
function updatePostCountBadges() {
    document.querySelectorAll('.post-count-badge').forEach(badge => {
        const count = portfolioPosts.filter(p => p.service === badge.dataset.service).length;
        badge.textContent = count; badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
}

// ─── Testimonials ───────────────────────────────────────────────
function renderTestimonials() {
    const grid = document.getElementById('testimonialsGrid');
    const empty = document.getElementById('noTestimonials');
    const approved = testimonials.filter(t => t.approved);
    grid.innerHTML = '';
    if (approved.length === 0) { empty.style.display = 'flex'; return; }
    empty.style.display = 'none';
    approved.forEach(t => {
        const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
        const card = document.createElement('div'); card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-stars">${stars}</div>
            <p class="testimonial-text">"${t.text}"</p>
            <div class="testimonial-footer">
                <div class="testimonial-avatar"><i class="fas fa-user"></i></div>
                <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-service">${t.service}</div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderPendingReviews() {
    const pending = testimonials.filter(t => !t.approved);
    const bar = document.getElementById('pendingBar');
    const panel = document.getElementById('pendingPanel');
    const list = document.getElementById('pendingList');
    const countEl = document.getElementById('pendingCount');
    if (!isAdminAuthenticated) { bar.style.display = 'none'; panel.style.display = 'none'; return; }
    countEl.textContent = `${pending.length} review(s) awaiting approval`;
    bar.style.display = pending.length > 0 ? 'flex' : 'none';
    list.innerHTML = '';
    pending.forEach(t => {
        const stars = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
        const item = document.createElement('div'); item.className = 'pending-item';
        item.innerHTML = `
            <div class="pending-meta"><strong>${t.name}</strong> — ${t.service} <span class="pending-stars">${stars}</span></div>
            <p>${t.text}</p>
            <div class="pending-actions">
                <button class="admin-btn add-product-btn approve-btn" data-id="${t.id}"><i class="fas fa-check"></i> Approve</button>
                <button class="admin-btn delete-btn reject-btn" data-id="${t.id}"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        item.querySelector('.approve-btn').addEventListener('click', () => { const r = testimonials.find(x => x.id === t.id); if (r) { r.approved = true; saveTestimonials(); renderTestimonials(); renderPendingReviews(); } });
        item.querySelector('.reject-btn').addEventListener('click', () => { testimonials = testimonials.filter(x => x.id !== t.id); saveTestimonials(); renderPendingReviews(); });
        list.appendChild(item);
    });
}

function setupStarPicker() {
    const stars = document.querySelectorAll('#starPicker i');
    stars.forEach(star => {
        star.addEventListener('mouseover', () => { const n = parseInt(star.dataset.star); stars.forEach((s, i) => { s.className = i < n ? 'fas fa-star' : 'far fa-star'; }); });
        star.addEventListener('mouseout', () => { stars.forEach((s, i) => { s.className = i < selectedRating ? 'fas fa-star' : 'far fa-star'; }); });
        star.addEventListener('click', () => { selectedRating = parseInt(star.dataset.star); document.getElementById('reviewRating').value = selectedRating; stars.forEach((s, i) => { s.className = i < selectedRating ? 'fas fa-star' : 'far fa-star'; }); });
    });
}

// ─── FAQs ───────────────────────────────────────────────────────
function renderFAQs() {
    const list = document.getElementById('faqList');
    list.innerHTML = '';
    faqs.forEach(faq => {
        const item = document.createElement('div'); item.className = 'faq-item';
        item.innerHTML = `
            <button class="faq-question">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down faq-icon"></i>
            </button>
            <div class="faq-answer"><p>${faq.answer}</p>${isAdminAuthenticated ? `<button class="faq-delete-btn" data-id="${faq.id}"><i class="fas fa-trash"></i> Remove</button>` : ''}</div>
        `;
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
        if (isAdminAuthenticated) {
            item.querySelector('.faq-delete-btn').addEventListener('click', e => { e.stopPropagation(); faqs = faqs.filter(f => f.id !== faq.id); saveFAQs(); renderFAQs(); });
        }
        list.appendChild(item);
    });
    const adminArea = document.getElementById('faqAdminArea');
    if (adminArea) adminArea.style.display = isAdminAuthenticated ? 'block' : 'none';
}

// ─── Cost Estimator ─────────────────────────────────────────────
const estimatorConfig = {
    solar: {
        label: "Number of solar panels",
        input: `<div class="form-group"><label>Number of Panels</label><input type="number" id="estVal" min="1" max="50" value="4" class="est-input"></div>`,
        calc: () => { const n = parseInt(document.getElementById('estVal').value) || 1; return [n * 180000, n * 230000]; }
    },
    'industrial-maint': {
        label: "Machines / units to maintain",
        input: `<div class="form-group"><label>Number of Machines / Units</label><input type="number" id="estVal" min="1" max="200" value="5" class="est-input"></div>`,
        calc: () => { const n = parseInt(document.getElementById('estVal').value) || 1; return [n * 70000, n * 95000]; }
    },
    'domestic-repair': {
        input: `<div class="form-group"><label>Type of Repair</label><select id="estVal" class="est-input"><option value="minor">Minor fault (socket, switch, light)</option><option value="moderate">Moderate repair (partial rewiring)</option><option value="major">Major rewiring / rewire</option></select></div>`,
        calc: () => { const v = document.getElementById('estVal').value; return { minor: [15000, 35000], moderate: [80000, 180000], major: [200000, 400000] }[v]; }
    },
    fault: {
        input: `<div class="form-group"><label>Type of Fault</label><select id="estVal" class="est-input"><option value="appliance">Appliance fault</option><option value="wiring">Wiring fault</option><option value="control">Control system / panel</option></select></div>`,
        calc: () => { const v = document.getElementById('estVal').value; return { appliance: [15000, 40000], wiring: [30000, 70000], control: [60000, 150000] }[v]; }
    },
    'domestic-install': {
        input: `<div class="form-group"><label>Number of Rooms</label><input type="number" id="estVal" min="1" max="30" value="3" class="est-input"></div>`,
        calc: () => { const n = parseInt(document.getElementById('estVal').value) || 1; return [n * 90000, n * 140000]; }
    },
    'industrial-install': {
        input: `<div class="form-group"><label>Facility Size</label><select id="estVal" class="est-input"><option value="small">Small (workshop / small factory)</option><option value="medium">Medium (medium factory / warehouse)</option><option value="large">Large (industrial complex)</option></select></div>`,
        calc: () => { const v = document.getElementById('estVal').value; return { small: [800000, 1800000], medium: [1800000, 4000000], large: [4000000, 9000000] }[v]; }
    }
};

function openEstimator() {
    estimatorOverlay.classList.add('active'); document.body.style.overflow = 'hidden';
    estService.value = ''; estInputs.innerHTML = ''; estimateResult.style.display = 'none'; calcEstimateBtn.style.display = 'none';
}
function closeEstimator() { estimatorOverlay.classList.remove('active'); document.body.style.overflow = ''; }

function setupEstimator() {
    estService.addEventListener('change', () => {
        const cfg = estimatorConfig[estService.value];
        estimateResult.style.display = 'none';
        if (!cfg) { estInputs.innerHTML = ''; calcEstimateBtn.style.display = 'none'; return; }
        estInputs.innerHTML = cfg.input;
        calcEstimateBtn.style.display = 'block';
    });
    calcEstimateBtn.addEventListener('click', () => {
        const cfg = estimatorConfig[estService.value]; if (!cfg) return;
        const [low, high] = cfg.calc();
        estimateValue.textContent = `MWK ${low.toLocaleString()} – MWK ${high.toLocaleString()}`;
        estimateResult.style.display = 'block';
    });
    estimatorClose.addEventListener('click', closeEstimator);
    estimatorOverlay.addEventListener('click', e => { if (e.target === estimatorOverlay) closeEstimator(); });
}

// ─── Admin Tabs ──────────────────────────────────────────────────
function setupAdminTabs() {
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.admin-tab-content').forEach(c => c.style.display = 'none');
            tab.classList.add('active');
            document.getElementById('tab-' + tab.dataset.tab).style.display = 'block';
        });
    });
}

// ─── Init ────────────────────────────────────────────────────────
function init() {
    renderProducts(); updateCartCount(); updatePostCountBadges();
    renderTestimonials(); renderPendingReviews();
    renderFAQs();
    applyBanner();
    toggleAdminBtn.style.display = 'none';
    setupStarPicker();
    setupEstimator();
    setupAdminTabs();

    // Banner
    bannerDismiss.addEventListener('click', () => { bannerDismissedThisSession = true; promoBanner.style.display = 'none'; });

    // Cart
    cartIcon.addEventListener('click', () => cartSidebar.classList.add('open'));
    closeCartBtn.addEventListener('click', () => cartSidebar.classList.remove('open'));
    checkoutBtn.addEventListener('click', checkout);

    // Admin auth
    document.querySelector('.hero').addEventListener('dblclick', showAdminAuthPrompt);
    document.addEventListener('keydown', e => { if (e.ctrlKey && e.shiftKey && e.key === 'A') { e.preventDefault(); showAdminAuthPrompt(); } });

    toggleAdminBtn.addEventListener('click', () => {
        const isVisible = adminPanel.style.display === 'block';
        adminPanel.style.display = isVisible ? 'none' : 'block';
        toggleAdminBtn.textContent = isVisible ? 'Show Admin Panel' : 'Hide Admin Panel';
    });

    // Product form
    addProductBtn.addEventListener('click', addProduct);
    updateProductBtn.addEventListener('click', updateProduct);
    cancelEditBtn.addEventListener('click', cancelEdit);
    productImagesInput.addEventListener('change', async e => {
        const files = Array.from(e.target.files); const rem = MAX_IMAGES - currentImages.length;
        for (const f of files.slice(0, rem)) currentImages.push(await compressImage(f));
        if (files.length > rem) alert(`Only ${MAX_IMAGES} photos allowed.`);
        productImagesInput.value = ''; renderImagePreviews(currentImages, imagePreviewGrid, 'productImages');
    });

    // Service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.querySelector('.view-work-btn').addEventListener('click', e => {
            e.stopPropagation(); openPortfolioModal(card.dataset.service, card.dataset.icon);
        });
    });

    // Portfolio modal
    portfolioCloseBtn.addEventListener('click', closePortfolioModal);
    portfolioOverlay.addEventListener('click', e => { if (e.target === portfolioOverlay) closePortfolioModal(); });
    postImagesInput.addEventListener('change', async e => {
        const files = Array.from(e.target.files); const rem = MAX_IMAGES - currentPostImages.length;
        for (const f of files.slice(0, rem)) currentPostImages.push(await compressImage(f));
        if (files.length > rem) alert(`Only ${MAX_IMAGES} photos allowed.`);
        postImagesInput.value = ''; renderImagePreviews(currentPostImages, postImagePreviewGrid, 'postImages');
    });
    submitPostBtn.addEventListener('click', submitPortfolioPost);

    // Review form
    document.getElementById('reviewForm').addEventListener('submit', e => { e.preventDefault(); submitReview(); });
    document.getElementById('viewPendingBtn').addEventListener('click', () => {
        const panel = document.getElementById('pendingPanel');
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        renderPendingReviews();
    });

    // Quote form
    document.getElementById('quoteForm').addEventListener('submit', e => { e.preventDefault(); submitQuote(); });
    document.getElementById('openEstimatorBtn').addEventListener('click', openEstimator);

    // FAQ admin
    document.getElementById('addFaqBtn').addEventListener('click', addFAQ);

    // Banner admin
    document.getElementById('saveBannerBtn').addEventListener('click', saveBannerAdmin);

    // Populate banner admin fields
    document.getElementById('bannerInput').value = banner.message;
    document.getElementById('bannerToggle').checked = banner.active;

    // Lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', e => { if (e.target === lightboxOverlay) closeLightbox(); });
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    document.addEventListener('keydown', e => {
        if (lightboxOverlay.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateLightbox(-1);
            if (e.key === 'ArrowRight') navigateLightbox(1);
            if (e.key === 'Escape') closeLightbox();
        }
        if (portfolioOverlay.classList.contains('active') && e.key === 'Escape') closePortfolioModal();
        if (estimatorOverlay.classList.contains('active') && e.key === 'Escape') closeEstimator();
    });
}

// ─── Auth ────────────────────────────────────────────────────────
function showAdminAuthPrompt() {
    const password = prompt("Enter admin password:");
    if (password === ADMIN_PASSWORD) {
        isAdminAuthenticated = true;
        toggleAdminBtn.style.display = 'inline-block';
        renderProducts(); renderFAQs(); renderPendingReviews();
        alert("Admin access granted!");
    } else if (password !== null) { alert("Incorrect password!"); }
}

// ─── Banner Admin ────────────────────────────────────────────────
function saveBannerAdmin() {
    banner.message = document.getElementById('bannerInput').value.trim();
    banner.active = document.getElementById('bannerToggle').checked;
    saveBanner(); bannerDismissedThisSession = false; applyBanner();
    alert('Banner saved!');
}

// ─── Review Submission ────────────────────────────────────────────
function submitReview() {
    const name = document.getElementById('reviewName').value.trim();
    const service = document.getElementById('reviewService').value;
    const rating = parseInt(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value.trim();
    if (!name || !service || !text) { alert('Please fill in all fields.'); return; }
    if (rating === 0) { alert('Please select a star rating.'); return; }
    const newId = testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1;
    testimonials.push({ id: newId, name, service, rating, text, approved: false, date: new Date().toISOString().split('T')[0] });
    saveTestimonials();
    document.getElementById('reviewForm').reset();
    selectedRating = 0;
    document.querySelectorAll('#starPicker i').forEach(s => s.className = 'far fa-star');
    renderPendingReviews();
    alert('Thank you! Your review has been submitted and will appear after verification.');
}

// ─── Quote Request ────────────────────────────────────────────────
function submitQuote() {
    const name = document.getElementById('quoteName').value.trim();
    const phone = document.getElementById('quotePhone').value.trim();
    const service = document.getElementById('quoteService').value;
    const location = document.getElementById('quoteLocation').value.trim();
    const details = document.getElementById('quoteDetails').value.trim();
    const msg = `Hello GE Engineering! 👋\n\nI'd like to request a quote:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🔧 Service: ${service}\n📍 Location: ${location}\n📝 Details: ${details || 'Not provided'}\n\nPlease get back to me with a quote. Thank you!`;
    window.open(`https://wa.me/265885890781?text=${encodeURIComponent(msg)}`, '_blank');
}

// ─── FAQ Admin ────────────────────────────────────────────────────
function addFAQ() {
    const question = document.getElementById('faqQuestion').value.trim();
    const answer = document.getElementById('faqAnswer').value.trim();
    if (!question || !answer) { alert('Please fill in the question and answer.'); return; }
    const newId = faqs.length > 0 ? Math.max(...faqs.map(f => f.id)) + 1 : 1;
    faqs.push({ id: newId, question, answer });
    saveFAQs(); renderFAQs();
    document.getElementById('faqQuestion').value = '';
    document.getElementById('faqAnswer').value = '';
}

// ─── Portfolio Modal ──────────────────────────────────────────────
function openPortfolioModal(service, iconClass) {
    activeService = service; currentPostImages = [];
    portfolioServiceName.textContent = service;
    portfolioServiceIcon.innerHTML = `<i class="fas ${iconClass}"></i>`;
    portfolioAdminArea.style.display = isAdminAuthenticated ? 'block' : 'none';
    if (isAdminAuthenticated) { document.getElementById('postTitle').value = ''; document.getElementById('postDescription').value = ''; renderImagePreviews(currentPostImages, postImagePreviewGrid, 'postImages'); }
    renderPortfolioPosts();
    portfolioOverlay.classList.add('active'); document.body.style.overflow = 'hidden';
}
function closePortfolioModal() { portfolioOverlay.classList.remove('active'); document.body.style.overflow = ''; }
function renderPortfolioPosts() {
    const posts = portfolioPosts.filter(p => p.service === activeService).sort((a, b) => b.id - a.id);
    portfolioPostsGrid.innerHTML = '';
    if (posts.length === 0) { portfolioEmpty.style.display = 'flex'; return; }
    portfolioEmpty.style.display = 'none';
    posts.forEach(post => {
        if (!(post.id in postImageIndex)) postImageIndex[post.id] = 0;
        const idx = postImageIndex[post.id]; const imgs = post.images || []; const liked = likedPosts.has(post.id);
        const card = document.createElement('div'); card.className = 'portfolio-post-card'; card.dataset.postId = post.id;
        const imageSection = imgs.length > 0
            ? `<div class="post-image-area"><img class="post-carousel-img" src="${imgs[idx]}" alt="${post.title}">
                ${imgs.length > 1 ? `<button class="carousel-btn carousel-prev post-carousel-btn" data-id="${post.id}"><i class="fas fa-chevron-left"></i></button><button class="carousel-btn carousel-next post-carousel-btn" data-id="${post.id}"><i class="fas fa-chevron-right"></i></button><div class="carousel-dots">${imgs.map((_, i) => `<span class="carousel-dot ${i===idx?'active':''}" data-post="${post.id}" data-i="${i}"></span>`).join('')}</div>` : ''}
                <div class="carousel-count">${imgs.length} photo${imgs.length>1?'s':''}</div></div>`
            : `<div class="post-image-area post-no-image"><i class="fas fa-camera-retro"></i></div>`;
        card.innerHTML = `${imageSection}<div class="post-body"><h4 class="post-title">${post.title}</h4><p class="post-description">${post.description}</p><div class="post-date"><i class="fas fa-calendar-alt"></i> ${formatDate(post.date)}</div><div class="post-actions"><button class="like-btn ${liked?'liked':''}" data-id="${post.id}"><i class="${liked?'fas':'far'} fa-heart"></i><span class="like-count">${post.likes||0}</span></button><button class="share-btn" data-id="${post.id}"><i class="fas fa-share-alt"></i> Share</button>${isAdminAuthenticated?`<button class="admin-action-btn delete-btn delete-post-btn" data-id="${post.id}"><i class="fas fa-trash"></i></button>`:''}</div></div>`;
        portfolioPostsGrid.appendChild(card);
        if (imgs.length > 0) card.querySelector('.post-carousel-img').addEventListener('click', () => openLightbox(imgs, postImageIndex[post.id]));
        if (imgs.length > 1) {
            card.querySelectorAll('.post-carousel-btn').forEach(btn => {
                const dir = btn.classList.contains('carousel-prev') ? -1 : 1;
                btn.addEventListener('click', e => { e.stopPropagation(); changePostImage(post.id, dir); });
            });
            card.querySelectorAll('.carousel-dot[data-post]').forEach(dot => { dot.addEventListener('click', e => { e.stopPropagation(); goToPostImage(post.id, parseInt(dot.dataset.i)); }); });
        }
        card.querySelector('.like-btn').addEventListener('click', () => toggleLike(post.id));
        card.querySelector('.share-btn').addEventListener('click', e => sharePost(post, e.currentTarget));
        if (isAdminAuthenticated) card.querySelector('.delete-post-btn').addEventListener('click', () => deletePortfolioPost(post.id));
    });
}
function changePostImage(id, dir) { const p = portfolioPosts.find(x => x.id===id); if (!p||!p.images.length) return; postImageIndex[id]=(postImageIndex[id]+dir+p.images.length)%p.images.length; refreshPostCarousel(id); }
function goToPostImage(id, idx) { postImageIndex[id]=idx; refreshPostCarousel(id); }
function refreshPostCarousel(id) {
    const post=portfolioPosts.find(p=>p.id===id); const card=portfolioPostsGrid.querySelector(`[data-post-id="${id}"]`); if(!card||!post) return;
    const img=card.querySelector('.post-carousel-img'); if(img) img.src=post.images[postImageIndex[id]];
    card.querySelectorAll('.carousel-dot[data-post]').forEach((dot,i)=>dot.classList.toggle('active',i===postImageIndex[id]));
}
function toggleLike(postId) {
    const post=portfolioPosts.find(p=>p.id===postId); const btn=portfolioPostsGrid.querySelector(`[data-post-id="${postId}"] .like-btn`); if(!post||!btn) return;
    if(likedPosts.has(postId)) { likedPosts.delete(postId); post.likes=Math.max(0,(post.likes||1)-1); btn.classList.remove('liked'); btn.querySelector('i').className='far fa-heart'; }
    else { likedPosts.add(postId); post.likes=(post.likes||0)+1; btn.classList.add('liked'); btn.querySelector('i').className='fas fa-heart'; btn.classList.add('like-pop'); setTimeout(()=>btn.classList.remove('like-pop'),400); }
    btn.querySelector('.like-count').textContent=post.likes; saveLikedPosts(); savePortfolio();
}
function sharePost(post, btn) {
    const text=`Check out this work by GE Engineering:\n"${post.title}"\n${post.description}\n\nContact: https://wa.me/265885890781`;
    document.querySelectorAll('.share-popover').forEach(p=>p.remove());
    if(navigator.share) { navigator.share({title:post.title,text}); return; }
    const popover=document.createElement('div'); popover.className='share-popover';
    popover.innerHTML=`<button class="share-option whatsapp-share"><i class="fab fa-whatsapp"></i> Share on WhatsApp</button><button class="share-option copy-share"><i class="fas fa-copy"></i> Copy Text</button>`;
    btn.parentElement.style.position='relative'; btn.parentElement.appendChild(popover);
    popover.querySelector('.whatsapp-share').addEventListener('click',()=>{ window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,'_blank'); popover.remove(); });
    popover.querySelector('.copy-share').addEventListener('click',()=>{ navigator.clipboard.writeText(text).then(()=>{ popover.innerHTML='<div style="padding:10px;color:#10b981;font-size:13px"><i class="fas fa-check"></i> Copied!</div>'; setTimeout(()=>popover.remove(),1500); }); });
    setTimeout(()=>{ document.addEventListener('click',function h(e){if(!popover.contains(e.target)){popover.remove();document.removeEventListener('click',h);}}); },10);
}
function submitPortfolioPost() {
    const title=document.getElementById('postTitle').value.trim(); const description=document.getElementById('postDescription').value.trim();
    if(!title||!description){alert('Please fill in the title and description.');return;}
    const newId=portfolioPosts.length>0?Math.max(...portfolioPosts.map(p=>p.id))+1:1;
    portfolioPosts.push({id:newId,service:activeService,title,description,images:[...currentPostImages],likes:0,date:new Date().toISOString().split('T')[0]});
    savePortfolio(); currentPostImages=[]; document.getElementById('postTitle').value=''; document.getElementById('postDescription').value='';
    renderImagePreviews(currentPostImages,postImagePreviewGrid,'postImages'); renderPortfolioPosts(); updatePostCountBadges(); alert('Posted successfully!');
}
function deletePortfolioPost(id) {
    if(!confirm('Delete this post?')) return;
    portfolioPosts=portfolioPosts.filter(p=>p.id!==id); savePortfolio(); renderPortfolioPosts(); updatePostCountBadges();
}

// ─── Lightbox ─────────────────────────────────────────────────────
function openLightbox(images,start){lightboxImages=images;lightboxIndex=start;lightboxOverlay.classList.add('active');document.body.style.overflow='hidden';renderLightbox();}
function closeLightbox(){lightboxOverlay.classList.remove('active');document.body.style.overflow='';}
function navigateLightbox(dir){lightboxIndex=(lightboxIndex+dir+lightboxImages.length)%lightboxImages.length;renderLightbox();}
function renderLightbox(){
    lightboxImg.src=lightboxImages[lightboxIndex];
    lightboxPrev.style.display=lightboxImages.length>1?'flex':'none';
    lightboxNext.style.display=lightboxImages.length>1?'flex':'none';
    lightboxDots.innerHTML=lightboxImages.map((_,i)=>`<span class="lightbox-dot ${i===lightboxIndex?'active':''}"></span>`).join('');
    lightboxDots.querySelectorAll('.lightbox-dot').forEach((d,i)=>d.addEventListener('click',()=>{lightboxIndex=i;renderLightbox();}));
}

// ─── Cart ──────────────────────────────────────────────────────────
function formatCurrency(n){return n.toFixed(2);}
function calculateCartTotal(){return cart.reduce((t,i)=>t+i.price*i.quantity,0);}
function updateCartCount(){cartCount.textContent=cart.reduce((t,i)=>t+i.quantity,0);}
function addToCart(id){
    const p=products.find(x=>x.id===id); if(!p) return;
    const ex=cart.find(i=>i.id===id); if(ex){ex.quantity+=1;}else{cart.push({id:p.id,name:p.name,price:p.price,quantity:1});}
    updateCartCount();renderCart();
}
function renderCart(){
    cartItems.innerHTML='';
    if(cart.length===0){cartItems.innerHTML='<p>Your cart is empty</p>';cartTotal.textContent='MWK 0.00';return;}
    cart.forEach(item=>{
        const el=document.createElement('div');el.className='cart-item';
        el.innerHTML=`<div class="cart-item-image"><i class="fas fa-microchip"></i></div><div class="cart-item-details"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">MWK ${formatCurrency(item.price)}</div><div class="cart-item-quantity"><button class="quantity-btn minus">-</button><span>${item.quantity}</span><button class="quantity-btn plus">+</button><button class="quantity-btn remove" style="margin-left:10px;background:var(--danger);color:white;">Remove</button></div></div>`;
        cartItems.appendChild(el);
        el.querySelector('.minus').addEventListener('click',()=>updateQuantity(item.id,-1));
        el.querySelector('.plus').addEventListener('click',()=>updateQuantity(item.id,1));
        el.querySelector('.remove').addEventListener('click',()=>removeFromCart(item.id));
    });
    cartTotal.textContent=`MWK ${formatCurrency(calculateCartTotal())}`;
}
function updateQuantity(id,change){const item=cart.find(i=>i.id===id);if(!item)return;item.quantity+=change;if(item.quantity<=0){removeFromCart(id);return;}updateCartCount();renderCart();}
function removeFromCart(id){cart=cart.filter(i=>i.id!==id);updateCartCount();renderCart();}
function checkout(){
    if(cart.length===0){alert('Your cart is empty!');return;}
    let msg='Hello GE Engineering! 🛍️\n\nI would like to purchase:\n\n';
    cart.forEach(i=>{msg+=`- ${i.name} (x${i.quantity}) - MWK ${formatCurrency(i.price*i.quantity)}\n`;});
    msg+=`\n📦 TOTAL: MWK ${formatCurrency(calculateCartTotal())}\n\nPlease confirm availability. Thank you!`;
    window.open(`https://wa.me/265885890781?text=${encodeURIComponent(msg)}`,'_blank');
    cart=[];updateCartCount();renderCart();cartSidebar.classList.remove('open');
}

// ─── Products: Render ──────────────────────────────────────────────
function renderProducts(){
    productsGrid.innerHTML='';
    products.forEach(product=>{
        if(!(product.id in cardImageIndex))cardImageIndex[product.id]=0;
        const imgs=product.images||[];const hasImages=imgs.length>0;const idx=cardImageIndex[product.id];
        const card=document.createElement('div');card.className='product-card';card.dataset.productId=product.id;
        const imgSection=hasImages
            ?`<div class="product-image carousel-container"><img class="carousel-img" src="${imgs[idx]}" alt="${product.name}">${imgs.length>1?`<button class="carousel-btn carousel-prev"><i class="fas fa-chevron-left"></i></button><button class="carousel-btn carousel-next"><i class="fas fa-chevron-right"></i></button><div class="carousel-dots">${imgs.map((_,i)=>`<span class="carousel-dot ${i===idx?'active':''}"></span>`).join('')}</div>`:''}<div class="carousel-count">${imgs.length} photo${imgs.length>1?'s':''}</div></div>`
            :`<div class="product-image carousel-container"><i class="fas fa-microchip"></i><div class="carousel-count no-photos">No photos yet</div></div>`;
        card.innerHTML=`${imgSection}<div class="product-info"><h3>${product.name}</h3><p>${product.description}</p><div class="product-price">MWK ${formatCurrency(product.price)}</div><button class="add-to-cart"><i class="fas fa-plus"></i> Add to Cart</button>${isAdminAuthenticated?`<div class="admin-actions"><button class="admin-action-btn edit-btn"><i class="fas fa-edit"></i> Edit</button><button class="admin-action-btn delete-btn"><i class="fas fa-trash"></i> Delete</button></div>`:''}</div>`;
        productsGrid.appendChild(card);
        card.querySelector('.add-to-cart').addEventListener('click',()=>addToCart(product.id));
        if(hasImages){card.querySelector('.carousel-img').addEventListener('click',()=>openLightbox(imgs,cardImageIndex[product.id]));}
        if(hasImages&&imgs.length>1){
            card.querySelector('.carousel-prev').addEventListener('click',e=>{e.stopPropagation();changeCardImage(product.id,-1);});
            card.querySelector('.carousel-next').addEventListener('click',e=>{e.stopPropagation();changeCardImage(product.id,1);});
            card.querySelectorAll('.carousel-dot').forEach((dot,i)=>dot.addEventListener('click',e=>{e.stopPropagation();goToCardImage(product.id,i);}));
        }
        if(isAdminAuthenticated){
            card.querySelector('.edit-btn').addEventListener('click',()=>editProduct(product.id));
            card.querySelector('.delete-btn').addEventListener('click',()=>deleteProduct(product.id));
        }
    });
}
function changeCardImage(id,dir){const p=products.find(x=>x.id===id);if(!p||!p.images.length)return;cardImageIndex[id]=(cardImageIndex[id]+dir+p.images.length)%p.images.length;refreshCardCarousel(id);}
function goToCardImage(id,idx){cardImageIndex[id]=idx;refreshCardCarousel(id);}
function refreshCardCarousel(id){
    const p=products.find(x=>x.id===id);const card=productsGrid.querySelector(`[data-product-id="${id}"]`);if(!card||!p)return;
    const img=card.querySelector('.carousel-img');if(img)img.src=p.images[cardImageIndex[id]];
    card.querySelectorAll('.carousel-dot').forEach((d,i)=>d.classList.toggle('active',i===cardImageIndex[id]));
}

// ─── Admin: Products ───────────────────────────────────────────────
function addProduct(){
    const name=document.getElementById('productName').value.trim();const price=parseFloat(document.getElementById('productPrice').value);const category=document.getElementById('productCategory').value;const description=document.getElementById('productDescription').value.trim();
    if(!name||!price||!category||!description){alert('Please fill all fields');return;}
    const newId=products.length>0?Math.max(...products.map(p=>p.id))+1:1;
    products.push({id:newId,name,price,category,description,images:[...currentImages]});
    saveProducts();renderProducts();resetAdminForm();alert('Product added!');
}
function updateProduct(){
    if(currentEditId===null)return;
    const name=document.getElementById('productName').value.trim();const price=parseFloat(document.getElementById('productPrice').value);const category=document.getElementById('productCategory').value;const description=document.getElementById('productDescription').value.trim();
    if(!name||!price||!category||!description){alert('Please fill all fields');return;}
    const idx=products.findIndex(p=>p.id===currentEditId);
    if(idx!==-1){products[idx]={id:currentEditId,name,price,category,description,images:[...currentImages]};saveProducts();renderProducts();resetAdminForm();alert('Product updated!');}
}
function deleteProduct(id){if(!confirm('Delete this product?'))return;products=products.filter(p=>p.id!==id);saveProducts();renderProducts();}
function editProduct(id){
    const p=products.find(x=>x.id===id);if(!p)return;
    currentEditId=id;currentImages=[...(p.images||[])];
    document.getElementById('productName').value=p.name;document.getElementById('productPrice').value=p.price;document.getElementById('productCategory').value=p.category;document.getElementById('productDescription').value=p.description;
    renderImagePreviews(currentImages,imagePreviewGrid,'productImages');
    addProductBtn.style.display='none';updateProductBtn.style.display='block';cancelEditBtn.style.display='block';
    adminPanel.style.display='block';toggleAdminBtn.textContent='Hide Admin Panel';adminPanel.scrollIntoView({behavior:'smooth'});
}
function cancelEdit(){resetAdminForm();}
function resetAdminForm(){
    currentEditId=null;currentImages=[];adminForm.reset();renderImagePreviews(currentImages,imagePreviewGrid,'productImages');
    updateProductBtn.style.display='none';cancelEditBtn.style.display='none';addProductBtn.style.display='block';
}

// ─── Helpers ────────────────────────────────────────────────────────
function formatDate(d){return new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}

// ─── Boot ────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
