/* ========================================
   OLIVER CMS — ADMIN LOGIC
   ======================================== */

// ---- STATE ----
let db = {
  site: {
    name: 'Oliver Araújo',
    title: 'Desenvolvedor Full Stack & Especialista Digital',
    tagline: 'Transformo ideias em produtos digitais que vendem',
    bio: 'Desenvolvedor apaixonado por criar experiências digitais de alto impacto.',
    email: 'oliver@email.com',
    phone: '(00) 00000-0000',
    whatsapp: '5500000000000',
    instagram: '@oliveraraujo',
    linkedin: 'linkedin.com/in/oliveraraujo',
    github: 'github.com/oliveraraujo',
    address: 'Brasil — Atendimento Online',
    hours: 'Seg–Sex, 9h às 18h',
    waMessage: 'Olá Oliver! Vim pelo seu site e gostaria de solicitar um orçamento.',
  },
  hero: {
    h1: 'Soluções Digitais de Alta Performance',
    sub: 'Sites, sistemas e lojas que geram resultados reais para o seu negócio',
    cta1: 'Solicitar Orçamento Grátis',
    cta2: 'Ver Portfólio',
    style: 'gradient',
    badge: '🚀 Disponível para novos projetos',
    stat1: '50+ Clientes',
    stat2: '100% Satisfação',
    stat3: '5+ Anos de Experiência'
  },
  design: {
    colorAccent: '#4f6ef7',
    colorSecondary: '#06d6a0',
    colorBg: '#020617',
    colorText: '#e2e8f0',
    fontMain: 'Inter',
    fontHeroSize: 60,
    fontWeight: '800',
    letterSpacing: '0',
  },
  layout: {
    sections: {
      hero: true, services: true, projects: true, shop: true,
      testimonials: true, stats: true, chatbot: true, contact: true
    },
    maxWidth: '1200px',
    cardStyle: 'solid',
    animStyle: 'slide',
    floatBtn: 'whatsapp'
  },
  seo: {
    title: 'Oliver Araújo | Desenvolvedor Full Stack & Especialista Digital',
    desc: 'Desenvolvimento de sites, sistemas e lojas virtuais de alta performance.',
    keywords: 'desenvolvedor, full stack, site profissional, landing page, loja virtual'
  },
  shop: {
    name: 'Oliver Store',
    slogan: 'Os melhores produtos com entrega garantida',
    margin: 30,
    currency: 'BRL',
    shipping: 'Frete grátis para todo Brasil acima de R$100'
  },
  chatbot: {
    name: 'Olivia',
    welcome: 'Olá! Sou a Olivia, assistente virtual do Oliver 👋 Como posso te ajudar hoje?',
    prompt: 'Você é Olivia, assistente de vendas do desenvolvedor Oliver Araújo. Seja simpática e direta.',
    apiKey: '',
    model: 'gpt-4o-mini'
  },
  projects: [
    { id: 1, name: 'Plataforma E-commerce Premium', result: '+37% conversão, -60% bounce rate', desc: 'Loja virtual completa com checkout otimizado, análise de comportamento e integração com marketplaces.', tech: 'React, Node.js, MongoDB', emoji: '🛒', url: '' },
    { id: 2, name: 'Sistema de Gestão Empresarial', result: 'Reduziu tempo operacional em 70%', desc: 'ERP personalizado para gestão de estoque, vendas, financeiro e RH numa única plataforma.', tech: 'Vue.js, Laravel, MySQL', emoji: '📊', url: '' },
    { id: 3, name: 'App de Delivery Personalizado', result: '2.500+ pedidos no 1º mês', desc: 'Aplicativo web progressivo para delivery com rastreamento em tempo real e painel de restaurante.', tech: 'Next.js, Socket.io, Firebase', emoji: '🚀', url: '' },
    { id: 4, name: 'Landing Page de Alta Conversão', result: '380% de aumento em leads', desc: 'LP otimizada com testes A/B, copy focada em conversão e integração com CRM.', tech: 'HTML, CSS, JS, HubSpot', emoji: '🎯', url: '' },
  ],
  services: [
    { id: 1, name: 'Sites & Landing Pages', desc: 'Sites profissionais, responsivos e rápidos que convertem visitantes em clientes.', emoji: '🌐', price: 'A partir de R$800' },
    { id: 2, name: 'Sistemas Personalizados', desc: 'Plataformas e sistemas sob medida para automatizar e escalar o seu negócio.', emoji: '⚙️', price: 'A partir de R$2.500' },
    { id: 3, name: 'Loja Virtual & E-commerce', desc: 'Lojas online completas com pagamento, estoque e integração com marketplaces.', emoji: '🛒', price: 'A partir de R$1.500' },
    { id: 4, name: 'Integração de APIs', desc: 'Conexão entre sistemas, automações e integrações com ferramentas externas.', emoji: '🔌', price: 'A partir de R$1.200' },
    { id: 5, name: 'Consultoria Técnica', desc: 'Análise, diagnóstico e planejamento estratégico para projetos digitais.', emoji: '🧠', price: 'R$300/hora' },
    { id: 6, name: 'UI/UX Design', desc: 'Interfaces modernas, intuitivas e focadas em experiência do usuário.', emoji: '🎨', price: 'A partir de R$700' },
  ],
  products: [],
  leads: [
    { id: 1, name: 'Carlos Mendes', email: 'carlos@email.com', phone: '(11) 99999-0001', interest: 'E-commerce completo', budget: 'R$3.000–R$6.000', stage: 'proposta', date: new Date().toLocaleDateString('pt-BR') },
    { id: 2, name: 'Ana Lúcia', email: 'ana@email.com', phone: '(21) 99999-0002', interest: 'Landing page de serviços', budget: 'R$800–R$1.500', stage: 'contato', date: new Date().toLocaleDateString('pt-BR') },
    { id: 3, name: 'Rafael Souza', email: 'rafael@email.com', phone: '(31) 99999-0003', interest: 'Sistema de agendamento', budget: 'R$2.000–R$4.000', stage: 'novo', date: new Date().toLocaleDateString('pt-BR') },
  ],
  orders: []
};

// Load from localStorage if exists
const saved = localStorage.getItem('oliverCMS');
if (saved) {
  try { db = { ...db, ...JSON.parse(saved) }; } catch(e) {}
}

function persist() {
  localStorage.setItem('oliverCMS', JSON.stringify(db));
}

// ---- NAVIGATION ----
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    const panel = item.dataset.panel;
    if (!panel) return;
    goPanel(panel);
  });
});

function goPanel(panel) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-panel="${panel}"]`);
  if (navItem) navItem.classList.add('active');

  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('panel-' + panel);
  if (el) el.classList.add('active');

  const titles = {
    dashboard: 'Dashboard',
    editor: 'Editor Visual',
    projects: 'Projetos',
    services: 'Serviços',
    shop: 'Dropshipping',
    orders: 'Pedidos',
    crm: 'CRM / Leads',
    chatbot: 'Chatbot IA',
    settings: 'Configurações'
  };
  document.getElementById('topbar-title').textContent = titles[panel] || panel;

  // Render specific panels
  if (panel === 'projects') renderProjects();
  if (panel === 'services') renderServices();
  if (panel === 'crm') renderKanban();
  if (panel === 'shop') renderShopProducts();
  if (panel === 'orders') renderOrders();
  if (panel === 'dashboard') renderDashboard();
}

// ---- TABS ----
document.querySelectorAll('.tabs').forEach(tabs => {
  tabs.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      const parent = tabs.closest('.panel') || document;

      tabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tabScope = tabs.nextElementSibling;
      let current = tabs.nextElementSibling;
      while (current) {
        if (current.classList.contains('tab-content')) {
          current.classList.remove('active');
        }
        current = current.nextElementSibling;
      }

      const target = document.getElementById(tabId);
      if (target) target.classList.add('active');
    });
  });
});

// ---- MODALS ----
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

// ---- TOAST ----
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const div = document.createElement('div');
  div.className = `toast ${type}`;
  div.innerHTML = `<span>${icons[type]}</span> ${msg}`;
  document.getElementById('toast-container').appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// ---- SAVE ALL ----
function saveAll() {
  // Collect editor fields
  db.site.name = v('site-name');
  db.site.title = v('site-title');
  db.site.tagline = v('site-tagline');
  db.site.bio = v('site-bio');
  db.site.whatsapp = v('site-whatsapp');
  db.site.email = v('contact-email');
  db.site.phone = v('contact-phone');
  db.site.instagram = v('site-instagram');
  db.site.linkedin = v('site-linkedin');
  db.site.github = v('site-github');
  db.site.address = v('contact-address');
  db.site.hours = v('contact-hours');
  db.site.waMessage = v('wa-message');

  db.hero.h1 = v('hero-h1');
  db.hero.sub = v('hero-sub');
  db.hero.cta1 = v('hero-cta1');
  db.hero.cta2 = v('hero-cta2');
  db.hero.style = v('hero-style');
  db.hero.badge = v('hero-badge');
  db.hero.stat1 = v('hero-stat1');
  db.hero.stat2 = v('hero-stat2');
  db.hero.stat3 = v('hero-stat3');

  db.design.colorAccent = v('color-accent');
  db.design.colorSecondary = v('color-secondary');
  db.design.colorBg = v('color-bg');
  db.design.colorText = v('color-text');
  db.design.fontMain = v('font-main');
  db.design.fontHeroSize = parseInt(v('font-hero-size')) || 60;
  db.design.fontWeight = v('font-weight');
  db.design.letterSpacing = v('letter-spacing');

  db.layout.maxWidth = v('layout-maxwidth');
  db.layout.cardStyle = v('card-style');
  db.layout.animStyle = v('anim-style');
  db.layout.floatBtn = v('float-btn');

  db.layout.sections.hero = document.getElementById('section-hero').checked;
  db.layout.sections.services = document.getElementById('section-services').checked;
  db.layout.sections.projects = document.getElementById('section-projects').checked;
  db.layout.sections.shop = document.getElementById('section-shop').checked;
  db.layout.sections.testimonials = document.getElementById('section-testimonials').checked;
  db.layout.sections.stats = document.getElementById('section-stats').checked;
  db.layout.sections.chatbot = document.getElementById('section-chatbot').checked;
  db.layout.sections.contact = document.getElementById('section-contact').checked;

  db.seo.title = v('seo-title');
  db.seo.desc = v('seo-desc');
  db.seo.keywords = v('seo-keywords');

  db.chatbot.name = v('bot-name');
  db.chatbot.welcome = v('bot-welcome');
  db.chatbot.prompt = v('bot-prompt');
  db.chatbot.model = v('bot-model');
  if (v('bot-apikey')) db.chatbot.apiKey = v('bot-apikey');

  persist();
  showToast('Configurações salvas com sucesso!', 'success');
}

function v(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

// ---- POPULATE FORMS ----
function populateForms() {
  setVal('site-name', db.site.name);
  setVal('site-title', db.site.title);
  setVal('site-tagline', db.site.tagline);
  setVal('site-bio', db.site.bio);
  setVal('site-whatsapp', db.site.whatsapp);
  setVal('site-email', db.site.email);
  setVal('site-instagram', db.site.instagram);
  setVal('site-linkedin', db.site.linkedin);
  setVal('site-github', db.site.github);
  setVal('contact-phone', db.site.phone);
  setVal('contact-email', db.site.email);
  setVal('contact-address', db.site.address);
  setVal('contact-hours', db.site.hours);
  setVal('wa-message', db.site.waMessage);

  setVal('hero-h1', db.hero.h1);
  setVal('hero-sub', db.hero.sub);
  setVal('hero-cta1', db.hero.cta1);
  setVal('hero-cta2', db.hero.cta2);
  setVal('hero-style', db.hero.style);
  setVal('hero-badge', db.hero.badge);
  setVal('hero-stat1', db.hero.stat1);
  setVal('hero-stat2', db.hero.stat2);
  setVal('hero-stat3', db.hero.stat3);

  setVal('color-accent', db.design.colorAccent);
  setVal('color-accent-text', db.design.colorAccent);
  setVal('color-secondary', db.design.colorSecondary);
  setVal('color-secondary-text', db.design.colorSecondary);
  setVal('color-bg', db.design.colorBg);
  setVal('color-bg-text', db.design.colorBg);
  setVal('color-text', db.design.colorText);
  setVal('color-text-text', db.design.colorText);
  setVal('font-main', db.design.fontMain);
  setVal('font-hero-size', db.design.fontHeroSize);
  document.getElementById('font-hero-size-val').textContent = db.design.fontHeroSize + 'px';
  setVal('font-weight', db.design.fontWeight);
  setVal('letter-spacing', db.design.letterSpacing);

  setVal('layout-maxwidth', db.layout.maxWidth);
  setVal('card-style', db.layout.cardStyle);
  setVal('anim-style', db.layout.animStyle);
  setVal('float-btn', db.layout.floatBtn);

  if (db.layout.sections) {
    Object.keys(db.layout.sections).forEach(k => {
      const el = document.getElementById('section-' + k);
      if (el) el.checked = db.layout.sections[k];
    });
  }

  setVal('seo-title', db.seo.title);
  setVal('seo-desc', db.seo.desc);
  setVal('seo-keywords', db.seo.keywords);

  setVal('bot-name', db.chatbot.name);
  setVal('bot-welcome', db.chatbot.welcome);
  setVal('bot-prompt', db.chatbot.prompt);
  setVal('bot-model', db.chatbot.model);

  setVal('shop-name', db.shop.name);
  setVal('shop-slogan', db.shop.slogan);
  setVal('shop-margin', db.shop.margin);
  setVal('shop-currency', db.shop.currency);
  setVal('shop-shipping', db.shop.shipping);
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.value = val;
}

// ---- COLOR INPUTS SYNC ----
['accent','secondary','bg','text'].forEach(key => {
  const picker = document.getElementById('color-' + key);
  const text = document.getElementById('color-' + key + '-text');
  if (!picker || !text) return;
  picker.addEventListener('input', () => text.value = picker.value);
  text.addEventListener('input', () => picker.value = text.value);
});

// Font size range
const heroRange = document.getElementById('font-hero-size');
const heroRangeVal = document.getElementById('font-hero-size-val');
if (heroRange) {
  heroRange.addEventListener('input', () => {
    heroRangeVal.textContent = heroRange.value + 'px';
  });
}

// Theme swatches
const themes = {
  ocean:   { accent:'#4f6ef7', secondary:'#06d6a0', bg:'#020617', text:'#e2e8f0' },
  fire:    { accent:'#f7644f', secondary:'#fb923c', bg:'#0f0a08', text:'#f0e8e2' },
  purple:  { accent:'#a78bfa', secondary:'#ec4899', bg:'#0a0618', text:'#e2daf0' },
  emerald: { accent:'#10b981', secondary:'#06b6d4', bg:'#020f0a', text:'#d0f0e8' },
  sunset:  { accent:'#f59e0b', secondary:'#ef4444', bg:'#0f0a02', text:'#f0e8d0' },
  light:   { accent:'#3b82f6', secondary:'#0ea5e9', bg:'#f8fafc', text:'#0f172a' }
};

document.querySelectorAll('[data-theme]').forEach(sw => {
  sw.addEventListener('click', () => {
    document.querySelectorAll('[data-theme]').forEach(s => s.classList.remove('active'));
    sw.classList.add('active');
    const t = themes[sw.dataset.theme];
    if (!t) return;
    setVal('color-accent', t.accent); setVal('color-accent-text', t.accent);
    setVal('color-secondary', t.secondary); setVal('color-secondary-text', t.secondary);
    setVal('color-bg', t.bg); setVal('color-bg-text', t.bg);
    setVal('color-text', t.text); setVal('color-text-text', t.text);
    document.getElementById('color-accent').value = t.accent;
    document.getElementById('color-secondary').value = t.secondary;
    document.getElementById('color-bg').value = t.bg;
    document.getElementById('color-text').value = t.text;
    showToast('Tema aplicado! Clique em Salvar Tudo.', 'info');
  });
});

// ---- PROJECTS ----
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = db.projects.map((p, i) => `
    <div class="product-card">
      <div class="product-img">${p.emoji || '💻'}</div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div style="font-size:12px;color:var(--accent2);margin:4px 0">${p.result}</div>
        <div style="font-size:12px;color:var(--text-muted)">${p.desc}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:6px">🔧 ${p.tech}</div>
        <div class="product-actions">
          <button class="btn btn-ghost btn-sm" onclick="deleteProject(${i})">🗑 Remover</button>
          ${p.url ? `<a href="${p.url}" target="_blank" class="btn btn-ghost btn-sm">🔗</a>` : ''}
        </div>
      </div>
    </div>
  `).join('') || '<p style="color:var(--text-muted);padding:20px">Nenhum projeto. Clique em + Novo Projeto.</p>';
}

function saveProject() {
  const name = v('proj-name');
  if (!name) { showToast('Preencha o nome do projeto.', 'error'); return; }
  db.projects.push({
    id: Date.now(),
    name,
    result: v('proj-result'),
    desc: v('proj-desc'),
    tech: v('proj-tech'),
    emoji: v('proj-emoji') || '💻',
    url: v('proj-url')
  });
  persist();
  closeModal('modal-project');
  renderProjects();
  updateDashboard();
  showToast('Projeto adicionado!', 'success');
  ['proj-name','proj-result','proj-desc','proj-tech','proj-url'].forEach(id => setVal(id, ''));
}

function deleteProject(i) {
  if (!confirm('Remover projeto?')) return;
  db.projects.splice(i, 1);
  persist();
  renderProjects();
  updateDashboard();
  showToast('Projeto removido.', 'info');
}

// ---- SERVICES ----
function renderServices() {
  const list = document.getElementById('services-list');
  if (!list) return;
  list.innerHTML = `<div class="grid-3">` + db.services.map((s, i) => `
    <div class="card">
      <div style="font-size:28px;margin-bottom:8px">${s.emoji}</div>
      <div class="card-title">${s.name}</div>
      <p style="font-size:13px;color:var(--text-muted);margin:8px 0">${s.desc}</p>
      <div style="font-size:14px;font-weight:700;color:var(--accent2)">${s.price}</div>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-danger btn-sm" onclick="deleteService(${i})">🗑</button>
      </div>
    </div>
  `).join('') + `</div>`;
}

function saveService() {
  const name = v('svc-name');
  if (!name) { showToast('Preencha o nome do serviço.', 'error'); return; }
  db.services.push({
    id: Date.now(),
    name,
    desc: v('svc-desc'),
    emoji: v('svc-emoji') || '🚀',
    price: v('svc-price') || 'Consulte'
  });
  persist();
  closeModal('modal-service');
  renderServices();
  showToast('Serviço adicionado!', 'success');
}

function deleteService(i) {
  if (!confirm('Remover serviço?')) return;
  db.services.splice(i, 1);
  persist();
  renderServices();
  showToast('Serviço removido.', 'info');
}

// ---- SHOP / PRODUCTS ----
function renderShopProducts() {
  const grid = document.getElementById('shop-products-grid');
  if (!grid) return;
  const query = (v('shop-search') || '').toLowerCase();
  const platform = v('shop-filter-platform') || '';
  const filtered = db.products.filter(p =>
    (!query || p.name.toLowerCase().includes(query)) &&
    (!platform || p.platform === platform)
  );
  grid.innerHTML = filtered.map((p, i) => `
    <div class="product-card">
      <div class="product-img">${p.emoji || '📦'}</div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-price">R$ ${parseFloat(p.price).toFixed(2)}</div>
        <div class="product-platform">
          ${p.platform === 'mercadolivre' ? '🟡 Mercado Livre' : p.platform === 'shopee' ? '🟠 Shopee' : '📦 Manual'}
          ${p.category ? ' · ' + p.category : ''}
        </div>
        ${p.url ? `<div style="font-size:11px;margin-top:4px"><a href="${p.url}" target="_blank" style="color:var(--accent)">Ver original ↗</a></div>` : ''}
        <div class="product-actions">
          <button class="btn btn-danger btn-sm" onclick="deleteProduct(${db.products.indexOf(p)})">🗑</button>
          <span class="badge badge-green" style="font-size:10px">+${db.shop.margin}% margem</span>
        </div>
      </div>
    </div>
  `).join('') || '<p style="grid-column:1/-1;color:var(--text-muted);padding:20px;text-align:center">Nenhum produto. Use a aba "Adicionar Produto" ou "Importar".</p>';
}

document.getElementById('shop-search').addEventListener('input', renderShopProducts);
document.getElementById('shop-filter-platform').addEventListener('change', renderShopProducts);

function addProduct() {
  const name = v('prod-name');
  if (!name) { showToast('Preencha o nome do produto.', 'error'); return; }
  const cost = parseFloat(v('prod-cost')) || 0;
  const margin = db.shop.margin || 30;
  const autoPrice = (cost * (1 + margin / 100)).toFixed(2);
  const price = parseFloat(v('prod-price')) || autoPrice;

  db.products.push({
    id: Date.now(),
    name,
    platform: v('prod-platform'),
    cost,
    price,
    emoji: v('prod-emoji') || '📦',
    category: v('prod-category'),
    desc: v('prod-desc'),
    url: v('prod-url')
  });
  persist();
  renderShopProducts();
  updateDashboard();
  showToast('Produto adicionado!', 'success');
  ['prod-name','prod-cost','prod-price','prod-desc','prod-url','prod-category'].forEach(id => setVal(id,''));
}

function deleteProduct(i) {
  if (!confirm('Remover produto?')) return;
  db.products.splice(i, 1);
  persist();
  renderShopProducts();
  updateDashboard();
  showToast('Produto removido.', 'info');
}

function importFromML() {
  const url = v('ml-url');
  if (!url || !url.includes('mercadolivre')) {
    showToast('Cole um link válido do Mercado Livre.', 'error');
    return;
  }
  // Simulate import (real integration requires proxy/API due to CORS)
  const name = 'Produto importado do Mercado Livre';
  db.products.push({
    id: Date.now(),
    name,
    platform: 'mercadolivre',
    cost: 0,
    price: 0,
    emoji: '🟡',
    category: 'Importado',
    desc: 'Produto importado do Mercado Livre. Atualize o preço manualmente.',
    url
  });
  persist();
  renderShopProducts();
  updateDashboard();
  showToast('Produto importado! Atualize o preço e descrição.', 'success');
  setVal('ml-url', '');
}

function importFromShopee() {
  const url = v('shopee-url');
  if (!url || !url.includes('shopee')) {
    showToast('Cole um link válido da Shopee.', 'error');
    return;
  }
  db.products.push({
    id: Date.now(),
    name: 'Produto importado da Shopee',
    platform: 'shopee',
    cost: 0,
    price: 0,
    emoji: '🟠',
    category: 'Importado',
    desc: 'Produto importado da Shopee. Atualize o preço manualmente.',
    url
  });
  persist();
  renderShopProducts();
  updateDashboard();
  showToast('Produto importado! Atualize o preço e descrição.', 'success');
  setVal('shopee-url', '');
}

function saveShopSettings() {
  db.shop.name = v('shop-name');
  db.shop.slogan = v('shop-slogan');
  db.shop.margin = parseInt(v('shop-margin')) || 30;
  db.shop.currency = v('shop-currency');
  db.shop.shipping = v('shop-shipping');
  persist();
  showToast('Configurações da loja salvas!', 'success');
}

// ---- ORDERS ----
function renderOrders() {
  const tbody = document.getElementById('orders-tbody');
  const noOrders = document.getElementById('no-orders');
  if (!tbody) return;
  if (!db.orders || db.orders.length === 0) {
    tbody.innerHTML = '';
    noOrders.style.display = 'block';
    return;
  }
  noOrders.style.display = 'none';
  tbody.innerHTML = db.orders.map((o, i) => `
    <tr>
      <td>#${String(i+1).padStart(3,'0')}</td>
      <td>${o.customer}</td>
      <td>${o.product}</td>
      <td>R$ ${parseFloat(o.value).toFixed(2)}</td>
      <td><span class="badge ${o.status==='pago'?'badge-green':o.status==='enviado'?'badge-blue':'badge-orange'}">${o.status}</span></td>
      <td>${o.date}</td>
      <td>
        <button class="btn btn-ghost btn-sm" onclick="updateOrderStatus(${i})">Atualizar</button>
      </td>
    </tr>
  `).join('');
  document.getElementById('orders-badge').textContent = db.orders.length;
}

function updateOrderStatus(i) {
  const statuses = ['pendente', 'pago', 'enviado', 'entregue'];
  const current = db.orders[i].status;
  const next = statuses[(statuses.indexOf(current) + 1) % statuses.length];
  db.orders[i].status = next;
  persist();
  renderOrders();
  showToast(`Status atualizado para: ${next}`, 'info');
}

// ---- CRM / KANBAN ----
const kanbanCols = [
  { id: 'novo', label: '🔵 Novo Lead', color: '#4f6ef7' },
  { id: 'contato', label: '🟡 Em Contato', color: '#f59e0b' },
  { id: 'proposta', label: '🟠 Proposta Enviada', color: '#fb923c' },
  { id: 'fechado', label: '🟢 Fechado', color: '#06d6a0' }
];

function renderKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;
  board.innerHTML = kanbanCols.map(col => {
    const leads = db.leads.filter(l => l.stage === col.id);
    document.getElementById('crm-badge').textContent = db.leads.length;
    return `
      <div class="kanban-col">
        <div class="kanban-col-header" style="color:${col.color}">
          ${col.label}
          <span class="kanban-count">${leads.length}</span>
        </div>
        ${leads.map((lead, gi) => {
          const i = db.leads.indexOf(lead);
          return `
            <div class="kanban-card">
              <div class="kanban-card-name">${lead.name}</div>
              <div class="kanban-card-sub">${lead.interest || ''}</div>
              <div style="font-size:12px;color:var(--text-muted)">📞 ${lead.phone}</div>
              <div style="font-size:12px;color:var(--accent2);margin-top:2px">${lead.budget || ''}</div>
              <div class="kanban-card-actions">
                ${col.id !== 'fechado' ? `<button class="btn btn-ghost btn-sm" onclick="advanceLead(${i})">→ Avançar</button>` : ''}
                <button class="btn btn-ghost btn-sm" onclick="contactLead(${i})">📞</button>
                <button class="btn btn-danger btn-sm" onclick="deleteLead(${i})">✕</button>
              </div>
            </div>
          `;
        }).join('')}
        ${leads.length === 0 ? `<div style="font-size:12px;color:var(--text-muted);text-align:center;padding:20px">Nenhum lead</div>` : ''}
      </div>
    `;
  }).join('');
}

function saveLead() {
  const name = v('lead-name');
  if (!name) { showToast('Preencha o nome do lead.', 'error'); return; }
  db.leads.push({
    id: Date.now(),
    name,
    email: v('lead-email'),
    phone: v('lead-phone'),
    interest: v('lead-interest'),
    budget: v('lead-budget'),
    stage: v('lead-stage') || 'novo',
    date: new Date().toLocaleDateString('pt-BR')
  });
  persist();
  closeModal('modal-lead');
  renderKanban();
  updateDashboard();
  showToast('Lead adicionado!', 'success');
}

function advanceLead(i) {
  const stages = ['novo', 'contato', 'proposta', 'fechado'];
  const current = db.leads[i].stage;
  const next = stages[stages.indexOf(current) + 1];
  if (!next) return;
  db.leads[i].stage = next;
  persist();
  renderKanban();
  showToast(`Lead avançado para: ${next}`, 'info');
}

function deleteLead(i) {
  if (!confirm('Remover este lead?')) return;
  db.leads.splice(i, 1);
  persist();
  renderKanban();
  updateDashboard();
  showToast('Lead removido.', 'info');
}

function contactLead(i) {
  const lead = db.leads[i];
  const phone = lead.phone.replace(/\D/g,'');
  window.open(`https://wa.me/55${phone}?text=Olá ${lead.name}!`, '_blank');
}

function exportLeads() {
  const data = JSON.stringify(db.leads, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leads-oliver.json';
  a.click();
  showToast('Leads exportados!', 'success');
}

// ---- CHATBOT TEST ----
async function testChat() {
  const input = document.getElementById('test-input');
  const chat = document.getElementById('test-chat');
  const msg = input.value.trim();
  if (!msg) return;

  chat.innerHTML += `<div style="background:rgba(79,110,247,0.1);padding:10px;border-radius:8px;margin-bottom:8px"><strong>Você:</strong> ${msg}</div>`;
  input.value = '';
  chat.scrollTop = chat.scrollHeight;

  const apiKey = db.chatbot.apiKey;
  if (!apiKey) {
    chat.innerHTML += `<div style="background:var(--bg-card);padding:10px;border-radius:8px;margin-bottom:8px"><strong>${db.chatbot.name}:</strong> Configure sua API Key do OpenAI nas configurações para ativar a IA real! 🤖</div>`;
    chat.scrollTop = chat.scrollHeight;
    return;
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: db.chatbot.model || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: db.chatbot.prompt },
          { role: 'user', content: msg }
        ]
      })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Erro ao obter resposta.';
    chat.innerHTML += `<div style="background:var(--bg-card);padding:10px;border-radius:8px;margin-bottom:8px"><strong>${db.chatbot.name}:</strong> ${reply}</div>`;
  } catch(e) {
    chat.innerHTML += `<div style="background:rgba(247,100,79,0.1);padding:10px;border-radius:8px;margin-bottom:8px"><strong>Erro:</strong> Verifique a API Key e tente novamente.</div>`;
  }
  chat.scrollTop = chat.scrollHeight;
}

function saveBotConfig() {
  db.chatbot.name = v('bot-name');
  db.chatbot.welcome = v('bot-welcome');
  db.chatbot.prompt = v('bot-prompt');
  db.chatbot.model = v('bot-model');
  if (v('bot-apikey')) db.chatbot.apiKey = v('bot-apikey');
  persist();
  showToast('Chatbot configurado!', 'success');
}

// ---- DASHBOARD ----
function renderDashboard() {
  updateDashboard();
  const leadsList = document.getElementById('dash-leads-list');
  if (leadsList) {
    if (db.leads.length === 0) {
      leadsList.innerHTML = '<p style="color:var(--text-muted);font-size:13px">Nenhum lead ainda.</p>';
    } else {
      leadsList.innerHTML = db.leads.slice(0,4).map(l => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
          <div>
            <div style="font-size:14px;font-weight:600">${l.name}</div>
            <div style="font-size:12px;color:var(--text-muted)">${l.interest || l.email}</div>
          </div>
          <span class="badge ${l.stage==='fechado'?'badge-green':l.stage==='proposta'?'badge-orange':'badge-blue'}">${l.stage}</span>
        </div>
      `).join('');
    }
  }

  const ordersList = document.getElementById('dash-orders-list');
  if (ordersList) {
    if (!db.orders || db.orders.length === 0) {
      ordersList.innerHTML = '<p style="color:var(--text-muted);font-size:13px">Nenhum pedido ainda.</p>';
    } else {
      ordersList.innerHTML = db.orders.slice(0,4).map(o => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border)">
          <div>
            <div style="font-size:14px;font-weight:600">${o.customer}</div>
            <div style="font-size:12px;color:var(--text-muted)">${o.product}</div>
          </div>
          <span class="badge badge-green">R$ ${parseFloat(o.value).toFixed(2)}</span>
        </div>
      `).join('');
    }
  }
}

function updateDashboard() {
  const el = id => document.getElementById(id);
  if (el('stat-leads')) el('stat-leads').textContent = db.leads.length;
  if (el('stat-products')) el('stat-products').textContent = db.products.length;
  if (el('stat-projects')) el('stat-projects').textContent = db.projects.length;
  if (el('stat-orders')) el('stat-orders').textContent = (db.orders||[]).length;
  if (el('crm-badge')) el('crm-badge').textContent = db.leads.length;
  if (el('orders-badge')) el('orders-badge').textContent = (db.orders||[]).length;
}

// ---- DATA MANAGEMENT ----
function exportData() {
  const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'oliver-cms-backup.json';
  a.click();
  showToast('Dados exportados!', 'success');
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    try {
      const data = JSON.parse(ev.target.result);
      Object.assign(db, data);
      persist();
      populateForms();
      renderDashboard();
      showToast('Dados importados com sucesso!', 'success');
    } catch {
      showToast('Erro ao importar arquivo.', 'error');
    }
  };
  reader.readAsText(file);
}

function resetData() {
  localStorage.removeItem('oliverCMS');
  showToast('Dados resetados. Recarregando...', 'info');
  setTimeout(() => location.reload(), 1500);
}

// ---- MOBILE MENU ----
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle) {
  menuToggle.style.display = 'block';
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
  });
}

// ---- INIT ----
populateForms();
renderDashboard();
