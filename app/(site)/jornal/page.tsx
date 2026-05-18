import type { Metadata } from 'next';
import { RevealText } from '@/components/RevealText';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Jornal — OMR Beauty Angola',
  description:
    'Sobre presença, fragrância, intenção e os rituais que moldam a identidade.',
};

const ENTRIES = [
  {
    image: '/assets/images/eaudeparfum4505.jpg',
    alt: 'A Camada Invisível',
    date: 'Março 2026 — Luanda',
    title: 'A Camada Invisível',
    excerpt:
      'Antes da roupa, antes do espelho, antes de o mundo te ver — há um aroma. A primeira decisão que vestes. Aquela que ninguém vê mas todos recordam. A fragrância é a camada invisível da identidade.',
  },
  {
    image: '/assets/images/about01f5.jpg',
    alt: 'Sobre a Presença',
    date: 'Fevereiro 2026 — Luanda',
    title: 'Sobre a Presença em vez da Performance',
    excerpt:
      'O mundo recompensa o ruído. Mas as pessoas que permanecem ao teu lado são atraídas pela presença — a certeza tranquila de quem fez as pazes consigo próprio. A fragrância é uma declaração dessa paz.',
  },
  {
    image: '/assets/images/Copper_Candle_19_horizontal7a6c.jpg',
    alt: 'O Ritual do Descanso',
    date: 'Janeiro 2026 — Luanda',
    title: 'O Ritual do Descanso',
    excerpt:
      'Acende a vela. Deixa o cobre e o calor preencher o espaço. O descanso não é ócio — é a infra-estrutura da criação. O ritual ao fim do dia é onde o amanhã começa.',
  },
];

export default function JornalPage() {
  return (
    <main className="journal-page">
      {/* Journal Hero */}
      <section className="journal-hero">
        <div className="container container--narrow">
          <p className="journal-hero__label t-label">Jornal</p>
          <RevealText as="h1" className="journal-hero__title t-heading-xl">
            O Estado OMR
          </RevealText>
          <FadeIn as="p" className="journal-hero__desc">
            Sobre presença, fragrância, intenção e os rituais que moldam a identidade.
          </FadeIn>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="journal-entries">
        <div className="container">
          {ENTRIES.map((entry, i) => (
            <FadeIn as="article" className="journal-entry" key={i}>
              <div className="journal-entry__image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={entry.image} alt={entry.alt} loading="lazy" />
              </div>
              <div className="journal-entry__content">
                <p className="journal-entry__date">{entry.date}</p>
                <h2 className="journal-entry__title">{entry.title}</h2>
                <p className="journal-entry__excerpt">{entry.excerpt}</p>
                <a href="#" className="journal-entry__link">
                  Ler
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Video Feature */}
      <FadeIn as="section" className="video-feature" style={{ paddingBottom: 'var(--space-2xl)' }}>
        <div className="video-feature__wrapper">
          <video autoPlay muted loop playsInline>
            <source
              src="/assets/videos/83f4eee21e9f41c584a792b92c8b917f/83f4eee21e9f41c584a792b92c8b917f.HD-1080p-7.2Mbps-62470788a4f0.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </FadeIn>
    </main>
  );
}
