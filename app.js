/* ========================================
   OLIVER — PUBLIC LANDING PAGE LOGIC
   Reads from shared localStorage (CMS)
   ======================================== */

// ---- LOAD CMS DATA ----
let db = {
  site: {
    name: 'Oliver Araújo',
    title: 'Desenvolvedor Full Stack',
    tagline: 'Transformo ideias em produtos digitais',
    bio: 'Desenvolvedor apaixonado por criar experiências digitais de alto impacto.',
    email: 'oliver@email.com',
    phone: '(00) 00000-0000',
    whatsapp: '5500000000000',
    instagram: '@oliveraraujo',
    linkedin: 'linkedin.com/in/oliveraraujo',
    github: 'github.com/oliveraraujo',
    address: 'Brasil — Atendimento Online',
    hours: 'Seg–Sex, 9h às 18h',
    waMessage: 'Olá Oliver! Vim pelo seu site e gostaria de solicitar um orçamento.'
  },
  hero: {
    h1: 'Soluções Digitais de Alta Performance',
    sub: 'Sites, sistemas e lojas que geram resultados reais para o seu negócio',
    cta1: 'Solicitar Orçamento Grátis',
    cta2: 'Ver Portfólio',
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
    letterSpacing: '0'
  },
  layout: {
    sections: {
      hero: true, services: true, projects: true, shop: true,
      testimonials: true, stats: true, chatbot: true, contact: true
    },
    floatBtn: 'whatsapp'
  },
  shop: {
    name: 'Oliver Store',
    slogan: 'Os melhores produtos com entrega garantida',
    shipping: 'Frete grátis para todo Brasil acima de R$100',
    currency: 'BRL'
  },
  chatbot: {
    name: 'Olivia',
    welcome: 'Olá! Sou a Olivia, assistente virtual do Oliver 👋 Como posso te ajudar hoje?',
    prompt: 'Você é Olivia, assistente de vendas do desenvolvedor Oliver Araújo. Seja simpática e direta.',
    apiKey: '',
    model: 'gpt-4o-mini'
  },
  projects: [
    { id: 1, name: 'Plataforma E-commerce Premium', result: '+37% conversão, -60% bounce rate', desc: 'Loja virtual completa com checkout otimizado e integração com marketplaces.', tech: 'React, Node.js, MongoDB', emoji: '🛒', url: '' },
    { id: 2, name: 'Sistema de Gestão Empresarial', result: 'Reduziu tempo operacional em 70%', desc: 'ERP personalizado para gestão de estoque, vendas e financeiro.', tech: 'Vue.js, Laravel, MySQL', emoji: '📊', url: '' },
    { id: 3, name: 'App de Delivery Personalizado', result: '2.500+ pedidos no 1º mês', desc: 'Aplicativo web progressivo para delivery com rastreamento em tempo real.', tech: 'Next.js, Socket.io, Firebase', emoji: '🚀', url: '' },
    { id: 4, name: 'Landing Page de Alta Conversão', result: '380% de aumento em leads', desc: 'LP otimizada com testes A/B e copy focada em conversão.', tech: 'HTML, CSS, JS, HubSpot', emoji: '🎯', url: '' },
  ],
  services: [
    { id: 1, name: 'Sites & Landing Pages', desc: 'Sites profissionais, responsivos e rápidos que convertem visitantes em clientes.', emoji: '🌐', price: 'A partir de R$800' },
    { id: 2, name: 'Sistemas Personalizados', desc: 'Plataformas e sistemas sob medida para automatizar e escalar o seu negócio.', emoji: '⚙️', price: 'A partir de R$2.500' },
    { id: 3, name: 'Loja Virtual & E-commerce', desc: 'Lojas online completas com pagamento, estoque e integração com marketplaces.', emoji: '🛒', price: 'A partir de R$1.500' },
    { id: 4, name: 'Integração de APIs', desc: 'Conexão entre sistemas, automações e integrações com ferramentas externas.', emoji: '🔌', price: 'A partir de R$1.200' },
    { id: 5, name: 'Consultoria Técnica', desc: 'Análise, diagnóstico e planejamento estratégico para projetos digitais.', emoji: '🧠', price: 'R$300/hora' },
    { id: 6, name: 'UI/UX Design', desc: 'Interfaces modernas e focadas em experiência do usuário.', emoji: '🎨', price: 'A partir de R$700' },
  ],
  products: [],
  leads: []
};

const saved = localStorage.getItem('oliverCMS');
if (saved) {
  try { db = { ...db, ...JSON.parse(saved) }; } catch(e) {}
}

// ---- APPLY DESIGN TOKENS ----
function applyDesign() {
  const d = db.design;
  const root = document.documentElement;
  if (d.colorAccent) root.style.setProperty('--accent', d.colorAccent);
  if (d.colorSecondary) root.style.setProperty('--accent2', d.colorSecondary);
  if (d.colorBg) {
    root.style.setProperty('--bg', d.colorBg);
    document.body.style.backgroundColor = d.colorBg;
  }
  if (d.colorText) {
    root.style.setProperty('--text', d.colorText);
    document.body.style.color = d.colorText;
  }
  if (d.fontMain) {
    root.style.setProperty('--font', `'${d.fontMain}', -apple-system, sans-serif`);
    document.body.style.fontFamily = `'${d.fontMain}', -apple-system, sans-serif`;
  }
  if (d.fontHeroSize) {
    const h1 = document.getElementById('hero-h1');
    if (h1) h1.style.fontSize = Math.min(d.fontHeroSize, 68) + 'px';
  }
}

// ---- POPULATE CONTENT ----
function populateSite() {
  const s = db.site;
  const h = db.hero;
  const la = db.layout;

  // Hero
  setText('hero-badge-el', h.badge);
  setText('hero-h1', h.h1.replace(/\n/g, '<br>'));
  setText('hero-sub', h.sub);
  setText('hero-cta1-text', h.cta1);
  setText('hero-cta2-text', h.cta2);
  if (h.stat1) setText('hero-stat1-el', h.stat1.replace(/[^0-9+%]/g,''));
  if (h.stat2) setText('hero-stat2-el', h.stat2.replace(/[^0-9+%]/g,''));
  if (h.stat3) setText('hero-stat3-el', h.stat3.replace(/[^0-9+%]/g,''));

  // Brand name in navbar
  const navBrand = document.querySelector('.nav-brand');
  if (navBrand && s.name) {
    const parts = s.name.split(' ');
    navBrand.innerHTML = `<span>${parts[0]}</span> ${parts.slice(1).join(' ')}`;
  }

  // Contact
  setText('contact-phone-el', s.phone);
  setText('contact-email-el', s.email);
  setText('contact-address-el', s.address);
  setText('contact-hours-el', s.hours);

  // WA Links
  const waNum = (s.whatsapp || '').replace(/\D/g,'');
  const waMsg = encodeURIComponent(s.waMessage || '');
  const waHref = `https://wa.me/${waNum}?text=${waMsg}`;
  const waLink = document.getElementById('wa-link');
  if (waLink) waLink.href = waHref;
  const floatWA = document.getElementById('float-wa');
  if (floatWA) {
    floatWA.href = waHref;
    if (la.floatBtn === 'email') {
      floatWA.href = `mailto:${s.email}`;
      floatWA.textContent = '📧';
      floatWA.style.background = db.design.colorAccent || '#4f6ef7';
    } else if (la.floatBtn === 'none') {
      floatWA.style.display = 'none';
    }
  }

  // Email link
  const emailLink = document.getElementById('email-link');
  if (emailLink) emailLink.href = `mailto:${s.email}`;

  // Footer
  setText('footer-bio-el', s.bio);
  setText('footer-phone-li', s.phone);
  setText('footer-email-li', s.email);

  const footerInstagram = document.getElementById('footer-instagram');
  if (footerInstagram) footerInstagram.href = `https://instagram.com/${(s.instagram||'').replace('@','')}`;
  const footerLinkedin = document.getElementById('footer-linkedin');
  if (footerLinkedin) footerLinkedin.href = `https://${s.linkedin}`;
  const footerGithub = document.getElementById('footer-github');
  if (footerGithub) footerGithub.href = `https://${s.github}`;

  const footerCopy = document.getElementById('footer-copy');
  if (footerCopy) footerCopy.textContent = `© ${new Date().getFullYear()} ${s.name}. Todos os direitos reservados.`;

  // Chatbot name
  setText('chat-bot-name', db.chatbot.name || 'Olivia');

  // Shop
  setText('shop-title-el', db.shop.name || 'Oliver Store');
  setText('shop-slogan-el', db.shop.slogan || '');
  setText('shop-shipping-el', db.shop.shipping || '');

  // SEO
  if (db.seo) {
    if (db.seo.title) document.title = db.seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && db.seo.desc) metaDesc.content = db.seo.desc;
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaKw && db.seo.keywords) metaKw.content = db.seo.keywords;
  }

  // Section visibility
  if (la.sections) {
    const map = {
      hero: 'hero',
      services: 'services',
      projects: 'projects',
      shop: 'shop',
      testimonials: 'testimonials',
      stats: 'stats-section',
      chatbot: 'chatbot-float',
      contact: 'contact'
    };
    Object.keys(map).forEach(k => {
      const el = document.getElementById(map[k]);
      if (el) el.style.display = la.sections[k] !== false ? '' : 'none';
    });
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (!el || val === undefined) return;
  if (val.includes && val.includes('<br>')) {
    el.innerHTML = val;
  } else {
    el.textContent = val;
  }
}

// ---- RENDER SERVICES ----
function renderServices() {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  grid.innerHTML = db.services.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.emoji}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      ${s.price ? `<span class="service-price">${s.price}</span>` : ''}
    </div>
  `).join('');
}

// ---- RENDER PROJECTS ----
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  if (!db.projects || db.projects.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)"><div style="font-size:48px;margin-bottom:16px">💼</div><div>Portfólio em construção. Projetos serão exibidos em breve!</div></div>';
    return;
  }
  grid.innerHTML = db.projects.map(p => {
    const techs = (p.tech || '').split(',').map(t => `<span class="tech-tag">${t.trim()}</span>`).join('');
    return `
      <div class="project-card" ${p.url ? `onclick="window.open('${p.url}','_blank')"` : ''}>
        <div class="project-thumb">${p.emoji || '💻'}</div>
        <div class="project-body">
          ${p.result ? `<span class="project-result">✅ ${p.result}</span>` : ''}
          <div class="project-name">${p.name}</div>
          <div class="project-desc">${p.desc}</div>
          <div class="project-tech">${techs}</div>
        </div>
      </div>
    `;
  }).join('');
}

// ---- RENDER SHOP ----
let allProducts = [];

function renderShop() {
  allProducts = db.products || [];
  filterShop();
}

function filterShop() {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;
  const query = (document.getElementById('shop-search').value || '').toLowerCase();
  const products = allProducts.filter(p =>
    !query || p.name.toLowerCase().includes(query) || (p.desc||'').toLowerCase().includes(query)
  );

  if (products.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--muted)">
        <div style="font-size:48px;margin-bottom:16px">🛒</div>
        <div style="font-size:16px">${query ? 'Produto não encontrado.' : 'Em breve novos produtos!'}</div>
        <div style="font-size:13px;margin-top:8px">Adicione produtos pelo painel administrativo.</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const platform = p.platform === 'mercadolivre' ? '🟡 Mercado Livre' : p.platform === 'shopee' ? '🟠 Shopee' : '📦 Loja';
    const price = parseFloat(p.price) || 0;
    return `
      <div class="shop-card">
        <div class="shop-img">${p.emoji || '📦'}</div>
        <div class="shop-body">
          <div class="shop-name">${p.name}</div>
          <div class="shop-price">R$ ${price.toFixed(2)}</div>
          <div class="shop-platform">${platform}</div>
          ${p.desc ? `<div style="font-size:12px;color:var(--muted);margin-top:6px">${p.desc.slice(0,80)}${p.desc.length>80?'...':''}</div>` : ''}
          ${p.url
            ? `<a href="${p.url}" target="_blank" class="shop-btn">Ver Produto ↗</a>`
            : `<button class="shop-btn" onclick="openShopOrder('${p.name}', ${price})">Comprar Agora</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function openShopOrder(name, price) {
  const waNum = (db.site.whatsapp || '').replace(/\D/g,'');
  const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${name} (R$ ${price.toFixed(2)})`);
  window.open(`https://wa.me/${waNum}?text=${msg}`, '_blank');
}

// ---- CONTACT FORM ----
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const phone = document.getElementById('cf-phone').value;
  const email = document.getElementById('cf-email').value;
  const type = document.getElementById('cf-type').value;
  const budget = document.getElementById('cf-budget').value;
  const message = document.getElementById('cf-message').value;

  // Save lead to localStorage (CMS will pick it up)
  const lead = {
    id: Date.now(),
    name,
    phone,
    email,
    interest: type,
    budget,
    message,
    stage: 'novo',
    date: new Date().toLocaleDateString('pt-BR'),
    source: 'Formulário do site'
  };

  db.leads = db.leads || [];
  db.leads.push(lead);
  localStorage.setItem('oliverCMS', JSON.stringify(db));

  // Send via WhatsApp as backup
  const waNum = (db.site.whatsapp || '').replace(/\D/g,'');
  if (waNum) {
    const waMsg = encodeURIComponent(`📋 Novo Lead do Site!\n\n👤 Nome: ${name}\n📞 Telefone: ${phone}\n📧 Email: ${email}\n🎯 Projeto: ${type}\n💰 Orçamento: ${budget}\n\n💬 Mensagem: ${message}`);
    window.open(`https://wa.me/${waNum}?text=${waMsg}`, '_blank');
  }

  document.getElementById('form-success').style.display = 'block';
  document.getElementById('contact-form').reset();
  setTimeout(() => {
    document.getElementById('form-success').style.display = 'none';
  }, 6000);
}

// ---- CHATBOT ----
let chatOpen = false;
let chatHistory = [];
let chatStarted = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chat-window');
  win.classList.toggle('open', chatOpen);
  const btn = document.getElementById('chat-toggle');
  btn.textContent = chatOpen ? '✕' : '💬';
  if (!chatOpen) {
    btn.innerHTML = '💬 <span class="chat-pulse"></span>';
  }

  if (chatOpen && !chatStarted) {
    chatStarted = true;
    addChatMsg('bot', db.chatbot.welcome || 'Olá! Como posso ajudar?');
    // Quick replies
    setTimeout(() => {
      addChatMsg('bot', '💡 Sobre o que você gostaria de falar?\n\n• Solicitar orçamento\n• Conhecer os serviços\n• Sobre a loja\n• Outro assunto');
    }, 800);
  }
}

function addChatMsg(who, text) {
  const div = document.getElementById('chat-messages');
  const bubble = document.createElement('div');
  bubble.className = `msg msg-${who}`;
  bubble.innerHTML = text.replace(/\n/g, '<br>');
  div.appendChild(bubble);
  div.scrollTop = div.scrollHeight;
  chatHistory.push({ role: who === 'bot' ? 'assistant' : 'user', content: text });
}

async function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  addChatMsg('user', msg);

  const apiKey = db.chatbot.apiKey;
  if (!apiKey) {
    // Smart fallback responses
    const responses = getFallbackResponse(msg.toLowerCase());
    setTimeout(() => addChatMsg('bot', responses), 600);
    return;
  }

  const thinkEl = document.createElement('div');
  thinkEl.className = 'msg msg-bot';
  thinkEl.innerHTML = '⌛ Digitando...';
  document.getElementById('chat-messages').appendChild(thinkEl);

  try {
    const messages = [
      {
        role: 'system',
        content: db.chatbot.prompt +
          `\n\nInformações do profissional:\nNome: ${db.site.name}\nEmail: ${db.site.email}\nTelefone: ${db.site.phone}\nServiços: ${db.services.map(s=>s.name).join(', ')}`
      },
      ...chatHistory.filter(m => m.content !== 'Digitando...')
    ];

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: db.chatbot.model || 'gpt-4o-mini',
        messages,
        max_tokens: 300
      })
    });

    const data = await res.json();
    thinkEl.remove();
    const reply = data.choices?.[0]?.message?.content || 'Desculpe, tente novamente.';
    addChatMsg('bot', reply);

    // Capture lead if contact info shared
    if (msg.includes('@') || /\d{8,}/.test(msg)) {
      captureChatLead(msg);
    }

  } catch(e) {
    thinkEl.remove();
    addChatMsg('bot', 'Ops! Houve um erro. Que tal falar diretamente pelo WhatsApp? 💬');
  }
}

function getFallbackResponse(msg) {
  const wa = (db.site.whatsapp || '').replace(/\D/g,'');
  const waUrl = `https://wa.me/${wa}`;

  if (msg.includes('orçamento') || msg.includes('preço') || msg.includes('quanto') || msg.includes('custo') || msg.includes('valor')) {
    return `Ótimo! Para um orçamento preciso, preciso entender seu projeto. 🎯\n\nVocê pode:\n1️⃣ Preencher o formulário de contato abaixo\n2️⃣ Falar diretamente pelo <a href="${waUrl}" target="_blank" style="color:var(--accent2)">WhatsApp</a>\n\nQual tipo de projeto você tem em mente?`;
  }
  if (msg.includes('site') || msg.includes('landing') || msg.includes('página')) {
    return `Criamos sites profissionais, landing pages e plataformas digitais de alto impacto! 🌐\n\nNossos sites são:\n✅ Responsivos (celular + desktop)\n✅ Rápidos e otimizados\n✅ Focados em conversão\n\nQuer saber o valor? Me conta mais sobre seu projeto!`;
  }
  if (msg.includes('sistema') || msg.includes('plataforma') || msg.includes('app')) {
    return `Desenvolvemos sistemas personalizados para automatizar e escalar seu negócio! ⚙️\n\nAlguns exemplos:\n• Sistemas de gestão\n• CRMs personalizados\n• Aplicativos web\n• Integrações de APIs\n\nQual é a sua necessidade?`;
  }
  if (msg.includes('loja') || msg.includes('ecommerce') || msg.includes('e-commerce') || msg.includes('vender')) {
    return `Perfeito! Criamos lojas virtuais completas! 🛒\n\n✅ Integração com Mercado Livre e Shopee\n✅ Checkout otimizado\n✅ Gestão de estoque\n✅ Dropshipping\n\nQuer começar a vender online? Fale conosco!`;
  }
  if (msg.includes('olá') || msg.includes('oi') || msg.includes('boa') || msg.includes('bom')) {
    return `Olá! Que bom te ver por aqui! 😊\n\nSou a ${db.chatbot.name || 'Olivia'}, assistente do ${db.site.name}. Como posso te ajudar?\n\n• 💻 Desenvolvimento de sites\n• ⚙️ Sistemas personalizados\n• 🛒 Lojas virtuais\n• 🧠 Consultoria`;
  }
  if (msg.includes('prazo') || msg.includes('tempo') || msg.includes('quando')) {
    return `Os prazos variam conforme a complexidade! 📅\n\n• Landing page: 3–7 dias\n• Site institucional: 1–2 semanas\n• Loja virtual: 2–4 semanas\n• Sistema: 4–12 semanas\n\nQuer um prazo específico? Me conta seu projeto!`;
  }
  if (msg.includes('whatsapp') || msg.includes('contato') || msg.includes('falar')) {
    return `Claro! Fale diretamente pelo WhatsApp: <a href="${waUrl}" target="_blank" style="color:var(--accent2)">Clique aqui 💬</a>\n\nOu envie um email para ${db.site.email}\n\nHorário de atendimento: ${db.site.hours}`;
  }

  return `Entendi! 😊 Para te atender melhor, que tal falarmos diretamente?\n\n📱 <a href="${waUrl}" target="_blank" style="color:var(--accent2)">WhatsApp</a> — resposta imediata\n📧 ${db.site.email}\n\nComo posso te ajudar com seu projeto digital?`;
}

function captureChatLead(msg) {
  db.leads = db.leads || [];
  db.leads.push({
    id: Date.now(),
    name: 'Lead do Chat',
    message: msg,
    stage: 'novo',
    date: new Date().toLocaleDateString('pt-BR'),
    source: 'Chatbot'
  });
  localStorage.setItem('oliverCMS', JSON.stringify(db));
}

// ---- NAVBAR SCROLL ----
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

function toggleMobileNav() {
  document.getElementById('nav-links').classList.toggle('mobile-open');
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- INIT ----
applyDesign();
populateSite();
renderServices();
renderProjects();
renderShop();

// Re-observe after dynamic content
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) revealObserver.observe(el);
  });
}, 100);
