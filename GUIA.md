# OMR Beauty Angola — Guia Técnico

> Documentação completa do projecto. Inclui a stack utilizada, como
> correr a aplicação localmente, como gerir o painel de administração,
> e como configurar Supabase e Cloudflare R2.

---

## Índice

1. [Visão Geral](#1-visão-geral)
2. [Aplicação em Produção](#2-aplicação-em-produção)
3. [Rotas Públicas](#3-rotas-públicas)
4. [Rotas de Administração](#4-rotas-de-administração)
5. [Credenciais de Acesso](#5-credenciais-de-acesso)
6. [Stack Tecnológica](#6-stack-tecnológica)
7. [Estrutura do Projecto](#7-estrutura-do-projecto)
8. [Pré-requisitos](#8-pré-requisitos)
9. [Configuração Local](#9-configuração-local)
10. [Variáveis de Ambiente](#10-variáveis-de-ambiente)
11. [Base de Dados (Supabase)](#11-base-de-dados-supabase)
12. [Armazenamento de Imagens (Cloudflare R2)](#12-armazenamento-de-imagens-cloudflare-r2)
13. [Criação do Utilizador Administrador](#13-criação-do-utilizador-administrador)
14. [Correr a Aplicação Localmente](#14-correr-a-aplicação-localmente)
15. [Deploy na Vercel](#15-deploy-na-vercel)
16. [Como Usar o Painel de Administração](#16-como-usar-o-painel-de-administração)
17. [Como Funciona a Loja Pública](#17-como-funciona-a-loja-pública)
18. [Tarefas Comuns](#18-tarefas-comuns)
19. [Resolução de Problemas](#19-resolução-de-problemas)
20. [Boas Práticas de Segurança](#20-boas-práticas-de-segurança)

---

## 1. Visão Geral

**OMR Beauty Angola** é uma loja online de fragrâncias de luxo. O
projecto é composto por duas partes:

- **Loja pública** — Onde os clientes navegam pelo catálogo, lêem o
  jornal, conhecem a marca e fazem encomendas.
- **Painel de administração** — Onde o administrador adiciona,
  edita ou remove produtos, e visualiza/gere as encomendas recebidas.

Toda a interface está em português de Angola (`pt-AO`) e os preços
são apresentados em Kwanza (Kz).

---

## 2. Aplicação em Produção

A versão em produção da aplicação está disponível em:

**https://omr-one.vercel.app/**

A loja é totalmente responsiva e foi optimizada para dispositivos
móveis.

---

## 3. Rotas Públicas

| Rota                          | Descrição                                          |
|-------------------------------|----------------------------------------------------|
| `/`                           | Página inicial (hero, colecção, jornal, óleos)     |
| `/produto?variant={slug}`     | Página detalhada de um produto                     |
| `/jornal`                     | Artigos do jornal da marca                         |
| `/sobre`                      | Página "Sobre" — filosofia da OMR                  |

Exemplos de URLs de produtos:

- `https://omr-one.vercel.app/produto?variant=intro`
- `https://omr-one.vercel.app/produto?variant=duo`
- `https://omr-one.vercel.app/produto?variant=fluid`
- `https://omr-one.vercel.app/produto?variant=copper`
- `https://omr-one.vercel.app/produto?variant=intro-oil`
- `https://omr-one.vercel.app/produto?variant=duo-oil`
- `https://omr-one.vercel.app/produto?variant=fluid-oil`
- `https://omr-one.vercel.app/produto?variant=cap`

---

## 4. Rotas de Administração

Todas as rotas de admin são protegidas. É preciso fazer login antes
de aceder a qualquer uma (excepto `/admin/login`).

| Rota                              | Descrição                              |
|-----------------------------------|----------------------------------------|
| `/admin/login`                    | Página de login                        |
| `/admin`                          | Resumo / dashboard com estatísticas    |
| `/admin/products`                 | Lista de produtos                      |
| `/admin/products/new`             | Criar novo produto                     |
| `/admin/products/{id}`            | Editar produto existente               |
| `/admin/orders`                   | Lista de encomendas                    |
| `/admin/orders/{id}`              | Detalhes de uma encomenda              |

URL completo de login:

**https://omr-one.vercel.app/admin/login**

---

## 5. Credenciais de Acesso

Conta de administrador da demo:

- **Email:** `josefa@gmail.com`
- **Palavra-passe:** `12345678`

> **Importante:** Esta palavra-passe é fraca e existe apenas para
> efeitos de demonstração. Antes de colocar a loja em produção real,
> altera a palavra-passe (ver [secção 20](#20-boas-práticas-de-segurança)).

---

## 6. Stack Tecnológica

| Camada              | Tecnologia                                                | Versão     |
|---------------------|-----------------------------------------------------------|------------|
| Framework           | [Next.js](https://nextjs.org/) (App Router, TypeScript)   | 16.2.x     |
| UI                  | [React](https://react.dev/)                               | 19.0.0     |
| Linguagem           | TypeScript                                                | 5.7.x      |
| Estilo              | CSS puro (`app/globals.css`)                              | —          |
| Fontes              | `next/font` — Inter                                       | —          |
| Base de dados       | [Supabase](https://supabase.com/) (PostgreSQL)            | —          |
| Autenticação        | Supabase Auth (email + palavra-passe)                     | —          |
| Armazenamento       | [Cloudflare R2](https://www.cloudflare.com/products/r2/)  | —          |
| Deploy              | [Vercel](https://vercel.com/)                             | —          |
| Build               | Webpack (Turbopack desactivado)                           | —          |

### Porque foi escolhida esta stack

- **Next.js 16 (App Router)** — Permite render no servidor para SEO,
  geração estática para velocidade, e Server Actions para forms
  seguros (não é preciso criar APIs separadas).
- **Supabase** — Postgres gerido, com autenticação, Row Level
  Security (RLS) e dashboard administrativo. Substitui um backend
  inteiro.
- **Cloudflare R2** — Armazenamento de objectos compatível com S3,
  sem custos de saída (egress). Ideal para imagens de produtos.
- **TypeScript** — Detecção de erros antes da execução, melhor
  experiência de desenvolvimento, segurança de tipos entre camadas
  (DB → API → UI).
- **Vercel** — Plataforma criada pela Next.js. Deploy automático em
  cada `git push`, edge network global, e tier gratuito generoso.

---

## 7. Estrutura do Projecto

```
omr/
├── app/
│   ├── (site)/                  Loja pública (route group)
│   │   ├── layout.tsx           Chrome (nav, footer, cursor, etc.)
│   │   ├── page.tsx             Página inicial
│   │   ├── produto/
│   │   │   ├── page.tsx         Página detalhe do produto
│   │   │   └── ProductDetails.tsx
│   │   ├── jornal/page.tsx      Página do jornal
│   │   └── sobre/page.tsx       Página "Sobre"
│   ├── admin/
│   │   ├── layout.tsx           Layout do admin
│   │   ├── login/               Página de login (não protegida)
│   │   │   ├── page.tsx
│   │   │   └── LoginForm.tsx
│   │   └── (protected)/         Tudo aqui exige autenticação
│   │       ├── layout.tsx       Verifica role admin + renderiza sidebar
│   │       ├── page.tsx         Dashboard / resumo
│   │       ├── products/
│   │       │   ├── page.tsx
│   │       │   ├── new/page.tsx
│   │       │   ├── [id]/page.tsx
│   │       │   └── actions.ts   Server actions (CRUD)
│   │       └── orders/
│   │           ├── page.tsx
│   │           ├── [id]/page.tsx
│   │           └── actions.ts
│   ├── api/
│   │   └── admin/
│   │       └── upload-url/      Endpoint que gera URLs presigned R2
│   │           └── route.ts
│   ├── globals.css              CSS único, partilhado por tudo
│   └── layout.tsx               Layout raiz (<html>, <body>, fonte)
│
├── components/
│   ├── Nav.tsx                  Navegação principal
│   ├── MobileMenu.tsx
│   ├── Footer.tsx
│   ├── Loader.tsx
│   ├── CustomCursor.tsx
│   ├── PageTransition.tsx
│   ├── BackToTop.tsx
│   ├── EmailModal.tsx           Pop-up de subscrição (sessionStorage)
│   ├── CartDrawer.tsx           Sacola lateral + form de checkout
│   ├── CartProvider.tsx         Estado do carrinho (Context API)
│   ├── UIProvider.tsx           Estado de UI (menu mobile, etc.)
│   ├── ProductCard.tsx
│   ├── FadeIn.tsx               Wrapper de animação de entrada
│   ├── RevealText.tsx           Animação palavra-a-palavra
│   └── admin/
│       ├── AdminShell.tsx       Sidebar do admin
│       ├── ProductForm.tsx      Formulário criar/editar produto + upload R2
│       └── DeleteButton.tsx
│
├── lib/
│   ├── auth.ts                  Helper `requireAdmin()`
│   ├── checkout.ts              Server action `createOrder()`
│   ├── products.ts              Leitura de produtos do Supabase
│   ├── r2.ts                    Cliente S3-compatível para o R2
│   └── supabase/
│       ├── client.ts            Cliente para o browser
│       ├── server.ts            Cliente para Server Components (SSR)
│       ├── admin.ts             Cliente service-role (ignora RLS)
│       └── types.ts             Tipos de tabela + utilitários
│
├── supabase/
│   ├── migrations/
│   │   └── 001_init.sql         Schema completo (correr 1 vez)
│   └── seed.sql                 Dados iniciais (8 produtos)
│
├── scripts/
│   └── create-admin.mjs         Script para criar o admin
│
├── public/
│   └── assets/                  Imagens e vídeos da loja original
│       ├── images/              115 imagens
│       └── videos/              4 vídeos
│
├── legacy/                      Versão HTML/CSS antiga (referência)
│
├── proxy.ts                     Middleware: protege /admin/*
├── next.config.ts
├── tsconfig.json
├── package.json
├── .env.example                 Modelo para .env.local
└── GUIA.md                      Este documento
```

---

## 8. Pré-requisitos

Antes de começar, é preciso ter instalado:

- **Node.js** versão 20 ou superior (recomendado 22)
  - https://nodejs.org/
- **npm** (instalado com o Node)
- **Git**
  - https://git-scm.com/
- Conta na **Supabase** (https://supabase.com/) — tier gratuito chega.
- Conta na **Cloudflare** (https://dash.cloudflare.com/) com R2 activado.
- Conta na **Vercel** (https://vercel.com/) ligada ao GitHub (para deploy).

Comandos para verificar:

```bash
node --version    # deve mostrar v20.x ou superior
npm --version
git --version
```

---

## 9. Configuração Local

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/Wolf-Quiteque/omr.git
cd omr
```

### Passo 2 — Instalar dependências

```bash
npm install
```

Isto descarrega todos os pacotes definidos no `package.json` para a
pasta `node_modules/` (que NÃO é commitada ao Git).

### Passo 3 — Criar o ficheiro `.env.local`

```bash
cp .env.example .env.local
```

Em seguida, abrir `.env.local` e preencher com os valores reais
(ver [secção 10](#10-variáveis-de-ambiente)).

---

## 10. Variáveis de Ambiente

Todas as variáveis ficam em `.env.local` (para desenvolvimento) e
nas **Environment Variables** do projecto Vercel (para produção).

> **Atenção:** O ficheiro `.env.local` está no `.gitignore` e nunca
> deve ser commitado. Contém segredos.

| Variável                          | Descrição                                                     | Exemplo                                           |
|-----------------------------------|---------------------------------------------------------------|---------------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`        | URL do projecto Supabase                                      | `https://abc.supabase.co`                         |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | Chave anónima (pública)                                       | `eyJhbGc...`                                      |
| `SUPABASE_SERVICE_ROLE_KEY`       | Chave service role (SECRETA — só no servidor)                 | `eyJhbGc...`                                      |
| `R2_ACCOUNT_ID`                   | Account ID da Cloudflare                                      | `67c418d7629b...`                                 |
| `R2_ACCESS_KEY_ID`                | Access key do R2                                              | `15d9ad08...`                                     |
| `R2_SECRET_ACCESS_KEY`            | Secret key do R2 (SECRETA)                                    | `4ed9d986...`                                     |
| `R2_BUCKET_NAME`                  | Nome do bucket no R2                                          | `nfrg`                                            |
| `R2_PUBLIC_BASE_URL`              | URL pública do bucket                                         | `https://pub-xxx.r2.dev`                          |
| `ADMIN_EMAIL`                     | Email do admin (usado pelo script de criação)                 | `josefa@gmail.com`                                |
| `ADMIN_PASSWORD`                  | Palavra-passe do admin                                        | `12345678`                                        |

### Onde encontrar cada chave

**Supabase**

1. Aceder a https://supabase.com/dashboard
2. Escolher o projecto
3. **Settings → API**
4. Copiar:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY` (clicar em "Reveal")

**Cloudflare R2**

1. Aceder a https://dash.cloudflare.com/
2. Sidebar esquerda → **R2 Object Storage**
3. Criar bucket (se ainda não existir)
4. Em **Manage R2 API tokens** → **Create API token**
   - Permissões: `Object Read & Write`
   - Bucket: o que criaste
5. Copiar:
   - Account ID (do canto superior direito) → `R2_ACCOUNT_ID`
   - Access Key ID → `R2_ACCESS_KEY_ID`
   - Secret Access Key → `R2_SECRET_ACCESS_KEY`
6. No bucket, **Settings → Public access** → activar **R2.dev subdomain**
   - Copiar o URL `https://pub-xxx.r2.dev` → `R2_PUBLIC_BASE_URL`
7. Em **Settings → CORS Policy**, colar:

   ```json
   [
     {
       "AllowedOrigins": [
         "http://localhost:3000",
         "https://omr-one.vercel.app"
       ],
       "AllowedMethods": ["PUT", "GET"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 3000
     }
   ]
   ```

---

## 11. Base de Dados (Supabase)

A base de dados tem três tabelas: `products`, `orders` e `order_items`.

### Passo 1 — Correr a migração inicial

1. Abrir o Supabase Dashboard
2. **SQL Editor** (ícone de SQL na sidebar)
3. **New Query**
4. Colar TODO o conteúdo de `supabase/migrations/001_init.sql`
5. Clicar em **Run**

Isto cria:

- Tabela `products` (catálogo)
- Tabela `orders` (encomendas)
- Tabela `order_items` (linhas das encomendas)
- Função `is_admin()` (verifica se o utilizador tem role 'admin')
- Função `generate_order_number()` (gera números como `OMR-20260518-A3F7`)
- Trigger que actualiza `updated_at` automaticamente
- Políticas de Row Level Security (RLS):
  - Qualquer um pode **ler** produtos
  - Só admin pode **escrever** produtos
  - Qualquer um pode **criar** uma encomenda (com status `pending`)
  - Só admin pode **ler/actualizar** encomendas

### Passo 2 — Inserir os produtos iniciais

1. **SQL Editor → New Query**
2. Colar TODO o conteúdo de `supabase/seed.sql`
3. **Run**

Isto adiciona os 8 produtos da colecção original:

| Slug         | Nome   | Categoria  | Preço (Kz) |
|--------------|--------|------------|------------|
| `intro`      | INTRO  | parfum     | 115.000    |
| `duo`        | DUO    | parfum     | 115.000    |
| `fluid`      | FLUID  | parfum     | 115.000    |
| `copper`     | COPPER | candle     | 60.000     |
| `intro-oil`  | INTRO  | oil        | 42.000     |
| `duo-oil`    | DUO    | oil        | 42.000     |
| `fluid-oil`  | FLUID  | oil        | 42.000     |
| `cap`        | OMR    | accessory  | 38.000     |

> O `seed.sql` é **idempotente** — pode ser corrido várias vezes
> sem criar duplicados (usa `ON CONFLICT (slug) DO UPDATE`).

### Schema das tabelas (resumo)

**products**

| Coluna           | Tipo         | Notas                                            |
|------------------|--------------|--------------------------------------------------|
| `id`             | uuid         | Chave primária                                   |
| `slug`           | text         | Único, usado no URL (`/produto?variant=intro`)   |
| `name`           | text         | Ex: "INTRO"                                      |
| `tagline`        | text         | Ex: "Eau de Parfum — 50ml"                       |
| `price_kz`       | integer      | Preço em Kwanzas (inteiro)                       |
| `description`    | jsonb        | Array de parágrafos                              |
| `specs`          | jsonb        | Array de especificações                          |
| `ritual`         | text         | Texto do "Uso ritual"                            |
| `images`         | jsonb        | Array de URLs                                    |
| `category`       | text         | `parfum` / `oil` / `candle` / `accessory`        |
| `featured_order` | integer      | Ordem na homepage (NULL = não destacado)         |
| `in_stock`       | boolean      | Disponibilidade                                  |

**orders**

| Coluna              | Tipo      | Notas                                                 |
|---------------------|-----------|-------------------------------------------------------|
| `id`                | uuid      | Chave primária                                        |
| `order_number`      | text      | Ex: `OMR-20260518-A3F7`                               |
| `customer_name`     | text      |                                                       |
| `customer_email`    | text      |                                                       |
| `customer_phone`    | text      | Opcional                                              |
| `shipping_address`  | text      | Opcional                                              |
| `total_kz`          | integer   | Total da encomenda                                    |
| `status`            | text      | `pending`, `confirmed`, `shipped`, `delivered`, `cancelled` |
| `notes`             | text      | Notas do cliente                                      |
| `created_at`        | timestamp |                                                       |

**order_items**

| Coluna             | Tipo    | Notas                                             |
|--------------------|---------|---------------------------------------------------|
| `id`               | uuid    | Chave primária                                    |
| `order_id`         | uuid    | FK para `orders`                                  |
| `product_id`       | uuid    | FK para `products` (pode ficar NULL se apagado)   |
| `product_name`     | text    | Snapshot no momento da encomenda                  |
| `product_tagline`  | text    | Snapshot                                          |
| `price_kz`         | integer | Snapshot                                          |
| `quantity`         | integer | Quantidade                                        |

---

## 12. Armazenamento de Imagens (Cloudflare R2)

As imagens originais (115 ficheiros) ficam em `/public/assets/images/`
e são servidas pela própria Vercel.

As **novas imagens** carregadas pelo admin são guardadas no
**Cloudflare R2**. O processo é:

1. O admin escolhe uma imagem no formulário (`ProductForm.tsx`)
2. O browser pede ao endpoint `/api/admin/upload-url` um **URL
   presigned** válido por 5 minutos
3. O browser faz `PUT` directamente para o R2 com esse URL
4. O URL público da imagem (`https://pub-xxx.r2.dev/products/...`)
   é guardado na coluna `images` do produto

Vantagens:

- A imagem nunca passa pelo servidor da Vercel (poupa largura de banda)
- O R2 não cobra saída de dados (egress)
- A chave secreta do R2 nunca é exposta ao browser

### Estrutura dentro do bucket

```
products/
  └── 1747958400000-INTRO-bottle.jpg
  └── 1747958412345-DUO-packaging.jpg
  ...
```

Cada ficheiro começa com um timestamp (`Date.now()`) para evitar
colisões.

---

## 13. Criação do Utilizador Administrador

Há duas formas de criar o admin:

### Opção A — Script automático (recomendado)

Com o `.env.local` preenchido:

```bash
node scripts/create-admin.mjs
```

Output esperado:

```
✓ Created admin user: josefa@gmail.com (id: 1f2e3d4c-...)
```

Se o utilizador já existe, o script actualiza a palavra-passe e o
role `admin` (idempotente).

### Opção B — Manualmente no Supabase Dashboard

1. **Authentication → Users → Add user**
2. Email: `josefa@gmail.com`
3. Password: `12345678`
4. Auto Confirm User: **ON**
5. Criar
6. Editar o utilizador → **Raw user meta data → Raw app meta data**:
   ```json
   { "role": "admin" }
   ```
7. **Save**

> Importante: o role tem de estar em **`app_metadata`**, não em
> `user_metadata`. O `user_metadata` pode ser alterado pelo próprio
> utilizador, o `app_metadata` não.

---

## 14. Correr a Aplicação Localmente

Com tudo configurado:

```bash
npm run dev
```

A aplicação fica disponível em:

- Loja: http://localhost:3000
- Admin: http://localhost:3000/admin/login

Para parar: `Ctrl + C` no terminal.

### Comandos úteis

| Comando             | O que faz                                       |
|---------------------|-------------------------------------------------|
| `npm run dev`       | Modo desenvolvimento (hot reload)               |
| `npm run build`     | Compila para produção                           |
| `npm run start`     | Corre o build de produção localmente            |
| `npm run lint`      | Verifica erros de código                        |

---

## 15. Deploy na Vercel

A Vercel está ligada ao repositório GitHub. Cada `git push` para a
branch `main` faz deploy automático.

### Configuração inicial (uma vez)

1. https://vercel.com/new
2. Importar o repositório `Wolf-Quiteque/omr`
3. Framework Preset: **Next.js** (auto-detectado)
4. Root Directory: `./`
5. Build Command: deixar default (`next build`, já configurado para webpack)
6. Output Directory: deixar default

### Adicionar variáveis de ambiente

**Settings → Environment Variables**, adicionar (para Production +
Preview):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
R2_ACCOUNT_ID
R2_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY
R2_BUCKET_NAME
R2_PUBLIC_BASE_URL
```

Depois de adicionar, clicar em **Redeploy** na última deployment.

### Domínio

Por defeito a Vercel atribui um URL como
`https://omr-{random}.vercel.app/`. Para o projecto actual é:

**https://omr-one.vercel.app/**

Para adicionar um domínio próprio (ex: `omrbeauty.ao`):

1. Vercel **Settings → Domains**
2. Adicionar o domínio
3. Configurar os registos DNS conforme as instruções da Vercel

---

## 16. Como Usar o Painel de Administração

### 16.1 Fazer login

1. Abrir https://omr-one.vercel.app/admin/login
2. Inserir email e palavra-passe
3. Se as credenciais estiverem correctas E o utilizador tiver role
   `admin`, és redireccionado para `/admin`

### 16.2 Dashboard (Resumo)

A página `/admin` mostra:

- Número total de produtos
- Número total de encomendas
- Receita acumulada (excluindo canceladas)
- As 5 encomendas mais recentes

### 16.3 Gerir Produtos

**Listar produtos** — `/admin/products`

Mostra todos os produtos em tabela com thumbnail, nome, categoria,
preço, stock e ordem de destaque.

**Criar produto** — `/admin/products/new`

Campos obrigatórios:

- **Nome** — Ex: "INTRO"
- **Slug** — Ex: `intro` (minúsculas, dígitos e hífens). Aparece no URL.
- **Descrição curta (tagline)** — Ex: "Eau de Parfum — 50ml"
- **Preço (Kz)** — Inteiro, sem casas decimais
- **Categoria** — Eau de Parfum / Óleo / Vela / Acessório
- **Imagens** — Carregadas para o R2 (ver abaixo)

Campos opcionais:

- **Descrição** — Um parágrafo por linha
- **Especificações** — Uma por linha
- **Uso ritual** — Texto livre
- **Ordem em destaque** — Inteiro. Menor = aparece primeiro na homepage.
  Vazio = não aparece em destaque.
- **Em stock** — Checkbox

**Carregar imagens**

1. Clicar em **Choose Files** (ou equivalente do browser)
2. Seleccionar uma ou mais imagens
3. O upload é feito directamente para o R2
4. Cada miniatura aparece no formulário; o botão "Remover" descarta-a

> A primeira imagem da lista é usada como capa em todo o site
> (homepage, página do produto, dashboard, etc.).

**Editar produto** — `/admin/products/{id}`

O formulário é o mesmo de "Criar", já preenchido. Ao guardar, o
site público é actualizado em até 60 segundos (cache `revalidate`).

**Apagar produto**

Na lista, clicar em **Apagar**. Confirmar o aviso. As imagens
guardadas no R2 (e só essas — as originais em `/public/assets`
ficam intactas) são removidas no mesmo passo.

### 16.4 Gerir Encomendas

**Listar encomendas** — `/admin/orders`

Tabela com:

- Número da encomenda
- Cliente
- Email
- Total
- Estado (pill colorido)
- Data

**Detalhe da encomenda** — `/admin/orders/{id}`

Mostra:

- Dados do cliente (nome, email, telefone)
- Morada de entrega
- Notas do cliente
- Linha por linha dos produtos
- Total
- **Dropdown para alterar o estado** (pending → confirmed → shipped → delivered ou cancelled)

A alteração do estado é guardada imediatamente.

### 16.5 Terminar sessão

Botão **Sair** no rodapé da sidebar.

---

## 17. Como Funciona a Loja Pública

### Fluxo de compra

1. Cliente navega na homepage e vê 8 produtos em destaque
2. Clica num produto → vai para `/produto?variant={slug}`
3. Clica em **Adicionar à Selecção** — o produto é adicionado à
   sacola (estado em memória, geriu pelo `CartProvider`)
4. Abre a sacola (botão "Sacola (n)" no topo)
5. Clica em **Finalizar Compra**
6. Preenche: nome, email, telefone (opcional), morada, notas
7. Clica em **Confirmar encomenda**
8. O servidor:
   - Re-calcula o total a partir do preço actual na base de dados
     (impede manipulação de preços pelo cliente)
   - Gera um número de encomenda único (`OMR-YYYYMMDD-XXXX`)
   - Cria o registo em `orders` com status `pending`
   - Cria os registos em `order_items` com snapshot dos preços
9. O cliente vê o número de encomenda e o aviso de confirmação por email
10. A encomenda aparece imediatamente em `/admin/orders`

### Cache e revalidação

- Páginas estáticas (`/jornal`, `/sobre`) são geradas no build
- Homepage tem `revalidate = 60` — actualiza no máximo a cada 60
  segundos
- Página de produto é dinâmica — sempre lê do Supabase
- Quando o admin altera um produto, as páginas relevantes são
  invalidadas via `revalidatePath`

---

## 18. Tarefas Comuns

### Alterar a palavra-passe do admin

```bash
# Editar .env.local
ADMIN_EMAIL=josefa@gmail.com
ADMIN_PASSWORD=nova-palavra-mais-forte

# Correr o script (actualiza o utilizador existente)
node scripts/create-admin.mjs
```

### Adicionar um novo administrador

```bash
ADMIN_EMAIL=outro@email.ao ADMIN_PASSWORD=outra-pass node scripts/create-admin.mjs
```

### Mudar o preço de um produto sem entrar no admin

Supabase Dashboard → **Table Editor → products** → encontrar o
produto → editar `price_kz` → guardar.

### Forçar a actualização do site público

Vercel Dashboard → **Deployments** → última deployment → **Redeploy**.

### Ver os logs de produção

Vercel Dashboard → **Deployments** → última deployment → **Functions**
ou **Runtime Logs**.

### Adicionar uma nova categoria de produto

1. Editar `supabase/migrations/001_init.sql` (linha do CHECK
   constraint da coluna `category`)
2. Correr o ALTER no Supabase:

   ```sql
   alter table public.products drop constraint products_category_check;
   alter table public.products add constraint products_category_check
     check (category in ('parfum','oil','candle','accessory','novacat'));
   ```

3. Actualizar as opções no `components/admin/ProductForm.tsx` (array
   `CATEGORIES`)
4. Actualizar a homepage `app/(site)/page.tsx` se quiser mostrar a
   nova categoria

---

## 19. Resolução de Problemas

### "404 NOT_FOUND" em todas as páginas na Vercel

Build com **Turbopack** não inclui o trace que a Vercel precisa para
servir as rotas. Verificar que `package.json` tem:

```json
"build": "next build --webpack"
```

Se estava em Turbopack, alterar e fazer push.

### Loja não mostra produtos / Mostra "Catálogo a carregar..."

A aplicação não consegue ler do Supabase. Verificar:

1. As variáveis `NEXT_PUBLIC_SUPABASE_URL` e
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão definidas
2. O seed `supabase/seed.sql` foi corrido
3. As políticas RLS estão activas (a `001_init.sql` cuida disso)

### Não consigo fazer login no admin

- Confirmar que correste `node scripts/create-admin.mjs` com sucesso
- Tentar entrar na Supabase Dashboard em **Authentication → Users**
  e confirmar que o utilizador existe e tem `app_metadata: { role: "admin" }`
- Verificar as variáveis `NEXT_PUBLIC_SUPABASE_URL` /
  `SUPABASE_SERVICE_ROLE_KEY` estão correctas

### Upload de imagens falha com erro de CORS

R2 → bucket → **Settings → CORS Policy** — adicionar o domínio
(localhost e/ou produção) ao `AllowedOrigins`.

### A encomenda não aparece no admin depois de finalizada

1. Verificar a Supabase Table Editor → **orders**
2. Se não está lá, o erro foi no checkout — abrir a consola do
   browser para ver a mensagem
3. Se está lá mas não aparece em `/admin/orders`, verificar as
   políticas RLS (a `orders: admin read` policy deve estar activa)

### Imagens novas não aparecem na loja

Esperar 60 segundos (cache de revalidação) OU forçar redeploy no
Vercel.

---

## 20. Boas Práticas de Segurança

### Antes de pôr em produção real

- [ ] **Alterar a palavra-passe** do admin para algo forte
      (mínimo 16 caracteres, mistura de letras/dígitos/símbolos)
- [ ] **Nunca commitar** o `.env.local` ou o `.env` ao Git
- [ ] **Não partilhar** a `SUPABASE_SERVICE_ROLE_KEY` — só deve
      existir no servidor (Vercel env + máquina local)
- [ ] **Rotar as chaves** de R2 e Supabase se foram alguma vez
      partilhadas/expostas
- [ ] Activar **2FA** nas contas Vercel, Supabase, Cloudflare e GitHub
- [ ] Confirmar que `.env.example` não contém valores reais

### Como rotar uma chave comprometida

**Supabase service role**

1. Supabase Dashboard → **Settings → API**
2. Clicar **Roll** ao lado da `service_role`
3. Copiar a nova chave para `.env.local` e Vercel
4. Redeploy

**R2 token**

1. Cloudflare → **R2 → Manage R2 API tokens**
2. **Revoke** o token antigo
3. **Create new token**
4. Actualizar `R2_ACCESS_KEY_ID` e `R2_SECRET_ACCESS_KEY` em
   `.env.local` e Vercel
5. Redeploy

---

## Apêndice — Glossário

| Termo                  | Significado                                                    |
|------------------------|----------------------------------------------------------------|
| **App Router**         | Sistema de routing do Next.js baseado em pastas (`app/`)       |
| **Server Component**   | Componente React que corre apenas no servidor (default em Next.js 16) |
| **Client Component**   | Componente que corre no browser — marcado com `'use client'`   |
| **Server Action**      | Função do servidor chamada directamente do form/cliente        |
| **Route Group**        | Pasta com `(nome)` que organiza rotas sem aparecer no URL      |
| **RLS**                | Row Level Security — políticas de acesso na própria base de dados |
| **Presigned URL**      | URL temporário que dá permissão de upload directo ao R2        |
| **Edge / SSR**         | Renderização no servidor antes de enviar HTML ao browser       |
| **Revalidation**       | Mecanismo do Next.js para actualizar páginas estáticas         |
| **slug**               | Identificador legível usado em URLs (ex: `intro`, `duo-oil`)   |

---

## Contactos

- **Repositório:** https://github.com/Wolf-Quiteque/omr
- **Produção:** https://omr-one.vercel.app/
- **Admin:** https://omr-one.vercel.app/admin/login
- **Criado por:** Josefa Félix
