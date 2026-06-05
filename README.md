# Oliver CMS — Plataforma de Administração

Plataforma completa com painel administrativo e landing page pública separada, com loja dropshipping e chatbot IA integrado.

---

## 📁 Estrutura do Projeto

```
platform/
├── admin/
│   ├── index.html     ← Painel administrativo (você)
│   ├── style.css      ← Estilos do admin
│   └── app.js         ← Lógica do painel
├── site/
│   ├── index.html     ← Landing page pública (clientes)
│   ├── style.css      ← Estilos da landing page
│   └── app.js         ← Lógica do site + chatbot
└── README.md
```

---

## 🚀 Como usar

### 1. Abrir o Painel Admin
Abra `admin/index.html` no navegador.

### 2. Abrir a Landing Page (pública)
Abra `site/index.html` no navegador.

> **Os dados são compartilhados via `localStorage` do navegador.**  
> O que você salva no admin aparece automaticamente no site.

---

## 🎨 Funcionalidades do Painel Admin

### Editor Visual
- **Identidade**: Nome, título, bio, redes sociais
- **Hero**: Título, subtítulo, botões, estatísticas
- **Cores & Fontes**: Paleta completa, temas rápidos, tipografia
- **Layout**: Ativar/desativar seções, largura, estilo de cards
- **Contato**: Telefone, email, endereço, horário
- **SEO**: Title, description, keywords

### Projetos
- Adicionar projetos com nome, resultado, descrição, tecnologias
- Remover projetos

### Serviços
- Adicionar/remover serviços com emoji, preço e descrição

### Dropshipping
- **Aba Produtos**: Listar, filtrar, buscar produtos
- **Aba Adicionar**: Cadastro manual com margem de lucro
- **Aba Importar**: Cole link do Mercado Livre ou Shopee
- **Config Loja**: Nome, slogan, margem padrão, moeda

### Pedidos
- Tabela de pedidos recebidos da loja
- Atualização de status (pendente → pago → enviado → entregue)

### CRM / Leads
- Kanban visual com 4 etapas: Novo → Em Contato → Proposta → Fechado
- Adicionar leads manualmente
- Avançar no funil com 1 clique
- Contato via WhatsApp direto
- Exportar leads em JSON

### Chatbot IA
- Configurar nome, personalidade e API Key do OpenAI
- Testar o bot direto no painel
- Funciona sem API Key com respostas inteligentes pré-programadas

---

## 🤖 Ativar IA no Chatbot

1. Acesse [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Crie uma API Key
3. No painel admin → **Chatbot IA** → cole a chave em "Chave da API OpenAI"
4. Clique em "Salvar Configurações do Bot"

**Modelos disponíveis:**
- `gpt-4o-mini` — Rápido e econômico (recomendado)
- `gpt-4o` — Mais inteligente
- `gpt-3.5-turbo` — Mais barato

---

## 🛒 Dropshipping — Como funciona

1. **Adicione produtos** pela aba "Importar" (Mercado Livre / Shopee)
2. **Configure a margem** em "Config Loja" (ex: 30%)
3. **Produtos aparecem** automaticamente na landing page
4. **Quando cliente compra**: você recebe via WhatsApp, compra na plataforma original com endereço do cliente

---

## 💰 Leads do Formulário

Quando um visitante preenche o formulário de contato na landing page:
1. Lead é salvo no CRM (localStorage)
2. Mensagem é enviada automaticamente para seu WhatsApp
3. Você vê o lead no painel CRM

---

## 🌐 Publicar Online (próximo passo)

Para colocar no ar com domínio próprio:

**Opção 1 — Vercel (grátis):**
```bash
npm i -g vercel
cd platform
vercel deploy
```

**Opção 2 — Netlify (grátis):**
Arraste a pasta `platform` em [netlify.com/drop](https://netlify.com/drop)

**Opção 3 — Hostinger / Locaweb:**
Suba os arquivos via FTP para a pasta `public_html`

---

## 📊 Dados Persistentes

Os dados ficam salvos no `localStorage` do navegador com a chave `oliverCMS`.

Para usar em produção com múltiplos dispositivos, o próximo passo é integrar:
- Firebase Firestore (grátis para começar)
- Supabase (PostgreSQL gratuito)
- MongoDB Atlas

---

## ✅ Checklist de Personalização

- [ ] Abra `admin/index.html`
- [ ] Vá em **Editor Visual → Identidade** e atualize seus dados
- [ ] Atualize seu **WhatsApp** (com DDI, ex: 5511999999999)
- [ ] Adicione seus projetos reais em **Projetos**
- [ ] Adicione seus serviços em **Serviços**
- [ ] Configure a API Key em **Chatbot IA**
- [ ] Adicione produtos em **Dropshipping**
- [ ] Clique em **Salvar Tudo** no topo
- [ ] Abra `site/index.html` para ver o resultado

---

Desenvolvido por Oliver Araújo © 2025
