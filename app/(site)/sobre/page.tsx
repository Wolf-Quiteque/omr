import type { Metadata } from 'next';
import Link from 'next/link';
import { RevealText } from '@/components/RevealText';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Sobre — OMR Beauty Angola',
  description: 'A filosofia da OMR Beauty: presença, ritual, ofício e identidade.',
};

export default function SobrePage() {
  return (
    <main className="philosophy-page">
      {/* Hero */}
      <section className="philosophy-hero">
        <div className="container container--narrow">
          <RevealText as="h1" className="philosophy-hero__title">
            Presença, destilada.
          </RevealText>
        </div>
      </section>

      {/* About Split */}
      <FadeIn as="section" className="about-split">
        <div className="about-split__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/about01f5.jpg" alt="OMR Beauty" loading="lazy" />
        </div>
        <div
          className="about-split__content"
          style={{ background: 'var(--obsidian)', color: 'var(--ivory)' }}
        >
          <p className="philosophy-section__number">01 — Origem</p>
          <RevealText as="h2" className="philosophy-section__heading">
            A OMR nasceu da crença de que a fragrância é identidade.
          </RevealText>
          <div className="philosophy-section__body">
            <p>
              Não é decoração. Não é tendência. É identidade. A fragrância que escolhes é a primeira
              coisa que o mundo sente em ti — antes de qualquer palavra ser dita, antes de qualquer
              mão ser estendida.
            </p>
            <p>Criamos fragrâncias para quem entende que a presença é uma prática.</p>
          </div>
        </div>
      </FadeIn>

      {/* Divider Quote */}
      <FadeIn className="philosophy-divider">
        <div className="container container--narrow">
          <p className="philosophy-divider__text">
            A fragrância é a forma mais honesta de expressão pessoal.
            <br />
            Não consegue mentir.
          </p>
        </div>
      </FadeIn>

      {/* Section 02 */}
      <section className="philosophy-section">
        <div className="container container--narrow">
          <FadeIn as="p" className="philosophy-section__number">
            02 — Ofício
          </FadeIn>
          <RevealText as="h2" className="philosophy-section__heading">
            Cada aroma é uma decisão. Cada nota, intencional.
          </RevealText>
          <FadeIn className="philosophy-section__body">
            <p>
              Não seguimos tendências sazonais nem perseguimos o apelo das massas. Cada fragrância da
              colecção OMR é construída através da contenção — removendo o que não serve, até restar
              apenas a verdade.
            </p>
            <p>INTRO. DUO. FLUID. COPPER. Quatro expressões. Uma filosofia.</p>
          </FadeIn>
        </div>
      </section>

      {/* Grid Values */}
      <section className="philosophy-section">
        <div className="container">
          <div className="philosophy-grid">
            <FadeIn className="philosophy-grid__item">
              <p className="philosophy-grid__label">Presença</p>
              <p className="philosophy-grid__text">
                A fragrância deve anunciar-te silenciosamente. Não gritar — ressoar.
              </p>
            </FadeIn>
            <FadeIn className="philosophy-grid__item">
              <p className="philosophy-grid__label">Ritual</p>
              <p className="philosophy-grid__text">
                O acto de aplicar a fragrância é o primeiro momento intencional do dia.
              </p>
            </FadeIn>
            <FadeIn className="philosophy-grid__item">
              <p className="philosophy-grid__label">Ofício</p>
              <p className="philosophy-grid__text">
                Eau de Parfum. Óleos perfumados. Velas. Cada formato serve um ritual diferente.
              </p>
            </FadeIn>
            <FadeIn className="philosophy-grid__item">
              <p className="philosophy-grid__label">Identidade</p>
              <p className="philosophy-grid__text">
                A tua fragrância é tua. Nós criamos a paleta. Tu escreves a história.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Collection Image */}
      <FadeIn as="section" className="collection-banner" style={{ height: '50vh', minHeight: 400 }}>
        <div className="collection-banner__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/OMRCOLLECTION298e.jpg" alt="Colecção OMR" loading="lazy" />
        </div>
        <div className="collection-banner__overlay" style={{ background: 'rgba(0,0,0,0.25)' }}></div>
      </FadeIn>

      {/* Section 03 */}
      <section className="philosophy-section philosophy-section--bordered">
        <div className="container container--narrow">
          <FadeIn as="p" className="philosophy-section__number">
            03 — Para Quem
          </FadeIn>
          <RevealText as="h2" className="philosophy-section__heading">
            Isto é para quem usa intenção.
          </RevealText>
          <FadeIn className="philosophy-section__body">
            <p>
              A OMR Beauty é para quem já ultrapassou a necessidade de validação externa. Quem
              compreende que a declaração mais poderosa é aquela que ninguém vê — mas todos sentem.
            </p>
            <p>
              Construímos para a confiança silenciosa. O ritual interior. A camada invisível entre ti
              e o mundo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final Divider */}
      <FadeIn className="philosophy-divider">
        <div className="container container--narrow">
          <p className="philosophy-divider__text">
            O aroma é memória.
            <br />
            A memória é identidade.
            <br />
            A identidade é ritual.
          </p>
        </div>
      </FadeIn>

      {/* CTA */}
      <FadeIn as="section" className="philosophy-cta">
        <div className="container container--narrow">
          <p className="philosophy-cta__text">Descobre a colecção.</p>
          <Link href="/#featured" className="philosophy-cta__link">
            Explorar Colecção
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
