export type ProductVariant = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  description: string[];
  specs: string[];
  ritual: string;
  images: string[];
};

export const PRODUCTS: Record<string, ProductVariant> = {
  intro: {
    id: 'intro',
    name: 'INTRO',
    tagline: 'Eau de Parfum — 50ml',
    price: 'Kz 115.000',
    description: [
      'A primeira impressão. A nota inicial da intenção.',
      'INTRO é uma declaração de chegada — concebido para o momento em que assumes quem és. Luminoso, ousado e inegavelmente presente.',
      'Isto é confiança, destilada.',
    ],
    specs: [
      '50ml Eau de Parfum',
      'Estela duradoura',
      'Frasco de vidro com tampa exclusiva OMR',
      'Criado com intenção',
      'Unissexo — concebido para a presença',
    ],
    ritual:
      'Aplica nos pontos de pulsação antes dos momentos que importam — primeiros encontros, fins de tarde tranquilos, actos de renovação pessoal.',
    images: [
      '/assets/images/INTRO_c6d6f086-e4f0-46e4-8c7d-10fbba44eb2bc38d.jpg',
      '/assets/images/INTRO_c6d6f086-e4f0-46e4-8c7d-10fbba44eb2b81e8.jpg',
      '/assets/images/INTRO2_cb5184e5-d4ab-42fd-ad91-ff661ab22c249697.jpg',
      '/assets/images/INTRO3_6a28dbf1-6060-4782-904c-2c07d4865522c38d.jpg',
    ],
  },
  duo: {
    id: 'duo',
    name: 'DUO',
    tagline: 'Eau de Parfum — 50ml',
    price: 'Kz 115.000',
    description: [
      'A nota dupla. Equilíbrio entre força e suavidade.',
      'DUO é a fragrância da dualidade — para quem habita várias versões de si próprio com confiança. Profundo, complexo e quietamente magnético.',
      'Duas notas. Uma identidade.',
    ],
    specs: [
      '50ml Eau de Parfum',
      'Estela duradoura',
      'Frasco de vidro com tampa exclusiva OMR',
      'Criado com intenção',
      'Unissexo — concebido para a presença',
    ],
    ritual:
      'Aplica antes das tuas conversas mais importantes. DUO é uma fragrância para se entrar numa sala e mudá-la.',
    images: [
      '/assets/images/DUO_e4157c23-9c96-43ea-bd92-c96ff5f530166a9b.jpg',
      '/assets/images/DUO_e4157c23-9c96-43ea-bd92-c96ff5f53016817c.jpg',
      '/assets/images/DUO2_ef231a4d-6424-48e8-8202-39de6a27e40f6a9b.jpg',
      '/assets/images/DUO3_dc0c758f-caf6-46e6-bbde-5473db2b10056a9b.jpg',
    ],
  },
  fluid: {
    id: 'fluid',
    name: 'FLUID',
    tagline: 'Eau de Parfum — 50ml',
    price: 'Kz 115.000',
    description: [
      'O movimento, captado em aroma.',
      'FLUID é leveza e fluidez — uma fragrância que respira contigo. Fresca, etérea e sempre em movimento.',
      'Liberdade, em forma de aroma.',
    ],
    specs: [
      '50ml Eau de Parfum',
      'Estela duradoura',
      'Frasco de vidro com tampa exclusiva OMR',
      'Criado com intenção',
      'Unissexo — concebido para a presença',
    ],
    ritual:
      'Aplica de manhã, antes de o dia começar. FLUID é para os dias em que precisas de te mover com leveza.',
    images: [
      '/assets/images/FLUID1_6e02ed26-6a03-4a2b-a277-897c7438d2a4ca01.jpg',
      '/assets/images/FLUID1_6e02ed26-6a03-4a2b-a277-897c7438d2a4b8a9.jpg',
      '/assets/images/FLUID1_6e02ed26-6a03-4a2b-a277-897c7438d2a43685.jpg',
      '/assets/images/FLUID131329.jpg',
    ],
  },
  copper: {
    id: 'copper',
    name: 'COPPER',
    tagline: 'Vela Perfumada — 200g',
    price: 'Kz 60.000',
    description: [
      'O ritual ao fim do dia.',
      'COPPER é o calor de um final de tarde — notas de âmbar, madeira e especiarias subtis. Para os momentos em que o mundo se aquieta.',
      'Acende e deixa-te ficar.',
    ],
    specs: [
      '200g de cera de soja natural',
      'Duração aproximada: 50 horas',
      'Recipiente em vidro fumado',
      'Pavio de algodão sem chumbo',
      'Made in Angola',
    ],
    ritual:
      'Acende ao final do dia, num ambiente tranquilo. Deixa que o aroma marque o fim do dia e o início do descanso.',
    images: [
      '/assets/images/Cb1fa.jpg',
      '/assets/images/Copper3b1fa.jpg',
      '/assets/images/Copper_Candle_19_horizontal7a6c.jpg',
      '/assets/images/C7b9b.jpg',
    ],
  },
  'intro-oil': {
    id: 'intro-oil',
    name: 'INTRO',
    tagline: 'Óleo Perfumado — 8ml',
    price: 'Kz 42.000',
    description: [
      'A versão portátil do ritual INTRO.',
      'Óleo perfumado em roll-on, concentrado e duradouro. Para quem quer levar o aroma para todo o lado.',
    ],
    specs: [
      'Roll-on de 8ml',
      'Fórmula concentrada em óleo',
      'Sem álcool — suave na pele',
      'Discreto, portátil, pessoal',
      'Made in Angola',
    ],
    ritual:
      'Aplica directamente nos pontos de pulsação. Reaplica ao longo do dia, sempre que precisares.',
    images: [
      '/assets/images/OMR20267016.jpg',
      '/assets/images/OMR202624460.jpg',
      '/assets/images/OMR20262eaee.jpg',
      '/assets/images/OMR202631bb9.jpg',
    ],
  },
  'duo-oil': {
    id: 'duo-oil',
    name: 'DUO',
    tagline: 'Óleo Perfumado — 8ml',
    price: 'Kz 42.000',
    description: [
      'A dualidade, em formato portátil.',
      'O ritual DUO em óleo concentrado. Para os dias em que precisas de o levar contigo.',
    ],
    specs: [
      'Roll-on de 8ml',
      'Fórmula concentrada em óleo',
      'Sem álcool — suave na pele',
      'Discreto, portátil, pessoal',
      'Made in Angola',
    ],
    ritual:
      'Aplica directamente nos pontos de pulsação. Reaplica ao longo do dia, sempre que precisares.',
    images: [
      '/assets/images/OMR20264f030.jpg',
      '/assets/images/OMR20264460.jpg',
      '/assets/images/OMR20264bb95.jpg',
      '/assets/images/OMR2026488a7.jpg',
    ],
  },
  'fluid-oil': {
    id: 'fluid-oil',
    name: 'FLUID',
    tagline: 'Óleo Perfumado — 8ml',
    price: 'Kz 42.000',
    description: [
      'A leveza, em formato portátil.',
      'O ritual FLUID em óleo concentrado. Movimento e frescura — para todo o lado.',
    ],
    specs: [
      'Roll-on de 8ml',
      'Fórmula concentrada em óleo',
      'Sem álcool — suave na pele',
      'Discreto, portátil, pessoal',
      'Made in Angola',
    ],
    ritual:
      'Aplica directamente nos pontos de pulsação. Reaplica ao longo do dia, sempre que precisares.',
    images: [
      '/assets/images/OMR202633cf8.jpg',
      '/assets/images/OMR20263d5d5.jpg',
      '/assets/images/OMR20265_ce5cafbb-a71d-4eb0-9d19-d1c027af529a3107.jpg',
      '/assets/images/OMR20265_ce5cafbb-a71d-4eb0-9d19-d1c027af529accfb.jpg',
    ],
  },
  cap: {
    id: 'cap',
    name: 'OMR',
    tagline: 'Boné — Edição Limitada',
    price: 'Kz 38.000',
    description: [
      'O símbolo OMR, em formato vestível.',
      'Boné em algodão pesado, com logotipo bordado. Para quem usa o ritual além do aroma.',
    ],
    specs: [
      '100% algodão pesado',
      'Logotipo OMR bordado',
      'Tamanho único, ajustável',
      'Edição limitada',
      'Made in Angola',
    ],
    ritual: 'Usa em qualquer momento. O ritual estende-se para lá da fragrância.',
    images: [
      '/assets/images/CAP_68229e31-81a1-49a6-b4da-5cf48715359b0080.jpg',
      '/assets/images/CAP_68229e31-81a1-49a6-b4da-5cf48715359b3a0f.jpg',
      '/assets/images/CAP_68229e31-81a1-49a6-b4da-5cf48715359ba6ec.jpg',
      '/assets/images/CAP_68229e31-81a1-49a6-b4da-5cf48715359b0080.jpg',
    ],
  },
};

export function getVariant(key: string | undefined): ProductVariant {
  if (key && PRODUCTS[key]) return PRODUCTS[key];
  return PRODUCTS.intro;
}
