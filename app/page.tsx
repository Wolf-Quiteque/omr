import Link from 'next/link';
import { RevealText } from '@/components/RevealText';
import { FadeIn } from '@/components/FadeIn';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  return (
    <>
      {/* Hero with Video */}
      <section className="hero">
        <div className="hero__media">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/images/headerwebb8554.jpg"
          >
            <source
              src="/assets/videos/55477736b1654023b3c186289ff97490/55477736b1654023b3c186289ff97490.HD-1080p-7.2Mbps-57332441a4f0.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <RevealText as="h1" className="hero__headline t-heading-xl">
            O aroma como ritual.
          </RevealText>
          <p className="hero__subline">
            Fragrância de luxo criada com intenção.
            <br />
            Para os momentos que te definem.
          </p>
          <a href="#featured" className="hero__cta">
            Explorar Colecção
          </a>
        </div>
      </section>

      {/* Brand Statement */}
      <FadeIn as="section" className="brand-statement">
        <div className="container container--narrow">
          <p className="brand-statement__text">
            A OMR Beauty é uma casa de fragrâncias de luxo construída sobre a presença, não sobre a
            performance. Cada aroma é desenhado para ser usado como um ritual — silencioso, intencional
            e profundamente pessoal.
          </p>
        </div>
      </FadeIn>

      {/* Featured Collection */}
      <section className="featured" id="featured">
        <div className="container">
          <div className="section-header">
            <RevealText as="h2" className="section-header__title t-heading-lg">
              A Colecção
            </RevealText>
            <FadeIn as="p" className="section-header__subtitle t-body">
              Eau de Parfum. Óleos Perfumados. Velas. Essenciais seleccionados.
            </FadeIn>
          </div>
          <div className="product-grid">
            <ProductCard
              href="/produto?variant=intro"
              image="/assets/images/INTRO_c6d6f086-e4f0-46e4-8c7d-10fbba44eb2bc38d.jpg"
              alt="INTRO Eau de Parfum"
              name="INTRO — Eau de Parfum"
              price="Kz 115.000"
            />
            <ProductCard
              href="/produto?variant=duo"
              image="/assets/images/DUO_e4157c23-9c96-43ea-bd92-c96ff5f530166a9b.jpg"
              alt="DUO Eau de Parfum"
              name="DUO — Eau de Parfum"
              price="Kz 115.000"
            />
            <ProductCard
              href="/produto?variant=fluid"
              image="/assets/images/FLUID1_6e02ed26-6a03-4a2b-a277-897c7438d2a4ca01.jpg"
              alt="FLUID Eau de Parfum"
              name="FLUID — Eau de Parfum"
              price="Kz 115.000"
            />
            <ProductCard
              href="/produto?variant=copper"
              image="/assets/images/Cb1fa.jpg"
              alt="COPPER Vela"
              name="COPPER — Vela"
              price="Kz 60.000"
            />
          </div>
        </div>
      </section>

      {/* Philosophy Strip */}
      <section className="philosophy">
        <div className="container container--narrow">
          <RevealText as="p" className="philosophy__text">
            A fragrância é a forma mais íntima de expressão pessoal.
          </RevealText>
        </div>
      </section>

      {/* Video Reel */}
      <section className="video-reel">
        <div className="container">
          <FadeIn className="video-reel__header">
            <p className="t-label" style={{ color: 'var(--taupe)', marginBottom: 'var(--space-sm)' }}>
              Por Trás do Aroma
            </p>
            <RevealText as="h2" className="t-heading-lg">
              A Experiência OMR
            </RevealText>
          </FadeIn>
          <div className="video-reel__grid">
            <FadeIn className="video-reel__item">
              <video autoPlay muted loop playsInline>
                <source
                  src="/assets/videos/83f4eee21e9f41c584a792b92c8b917f/83f4eee21e9f41c584a792b92c8b917f.HD-1080p-7.2Mbps-62470788a4f0.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="video-reel__item-overlay"></div>
              <span className="video-reel__item-label">Criado</span>
            </FadeIn>
            <FadeIn className="video-reel__item">
              <video autoPlay muted loop playsInline>
                <source
                  src="/assets/videos/c3bb24a3fb564dbda750d68fb57f3582/c3bb24a3fb564dbda750d68fb57f3582.HD-1080p-7.2Mbps-56565066a4f0.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="video-reel__item-overlay"></div>
              <span className="video-reel__item-label">Ritual</span>
            </FadeIn>
            <FadeIn className="video-reel__item">
              <video autoPlay muted loop playsInline>
                <source
                  src="/assets/videos/46eb26b99de24175b2480012d147fb5a/46eb26b99de24175b2480012d147fb5a.HD-1080p-7.2Mbps-57442143a4f0.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="video-reel__item-overlay"></div>
              <span className="video-reel__item-label">Presença</span>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Collection Banner */}
      <FadeIn as="section" className="collection-banner">
        <div className="collection-banner__image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/OMRSETc442.jpg" alt="Colecção OMR" loading="lazy" />
        </div>
        <div className="collection-banner__overlay"></div>
        <div className="collection-banner__content">
          <p className="t-label" style={{ color: 'var(--taupe)', marginBottom: 'var(--space-md)' }}>
            Óleos Perfumados
          </p>
          <RevealText as="h2" className="t-heading-lg">
            Leva o teu ritual contigo.
          </RevealText>
          <p
            style={{
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              marginTop: 'var(--space-sm)',
              fontSize: '0.9rem',
            }}
          >
            Roll-on de 8ml. Puro. Portátil. Pessoal.
          </p>
        </div>
      </FadeIn>

      {/* Oils Product Row */}
      <section className="featured" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          <div className="product-grid">
            <ProductCard
              href="/produto?variant=intro-oil"
              image="/assets/images/OMR20267016.jpg"
              alt="INTRO Óleo Perfumado"
              name="INTRO — Óleo Perfumado"
              price="Kz 42.000"
            />
            <ProductCard
              href="/produto?variant=duo-oil"
              image="/assets/images/OMR20264f030.jpg"
              alt="DUO Óleo Perfumado"
              name="DUO — Óleo Perfumado"
              price="Kz 42.000"
            />
            <ProductCard
              href="/produto?variant=fluid-oil"
              image="/assets/images/OMR20266ccfb.jpg"
              alt="FLUID Óleo Perfumado"
              name="FLUID — Óleo Perfumado"
              price="Kz 42.000"
            />
            <ProductCard
              href="/produto?variant=cap"
              image="/assets/images/CAP_68229e31-81a1-49a6-b4da-5cf48715359b0080.jpg"
              alt="OMR Boné"
              name="OMR — Boné"
              price="Kz 38.000"
            />
          </div>
        </div>
      </section>

      {/* Journal Preview */}
      <section className="journal-preview">
        <div className="container">
          <FadeIn className="journal-preview__inner">
            <div className="journal-preview__image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/about01f5.jpg" alt="Jornal OMR Beauty" loading="lazy" />
            </div>
            <div className="journal-preview__content">
              <p className="journal-preview__label t-label">Jornal</p>
              <RevealText as="h2" className="journal-preview__title t-heading-lg">
                O Estado OMR
              </RevealText>
              <p className="journal-preview__desc">
                Sobre presença, intenção e os rituais que moldam a identidade. A fragrância como a
                camada invisível do ser.
              </p>
              <Link href="/jornal" className="journal-preview__cta">
                Ler Mais
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
