'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  const variant: 'dark' | 'light' = pathname.startsWith('/produto') ? 'light' : 'dark';

  return (
    <footer className={`footer${variant === 'light' ? ' footer--light' : ''}`}>
      <div className="container">
        <p className="footer__brand-line">
          Usa a tua intenção.
          <br />
          Vive o teu ritual.
        </p>
        <div className="footer__grid">
          <div className="footer__col">
            <p className="footer__col-title">Loja</p>
            <ul>
              <li>
                <Link href="/produto?variant=intro">Eau de Parfum</Link>
              </li>
              <li>
                <Link href="/#featured">Óleos Perfumados</Link>
              </li>
              <li>
                <Link href="/produto?variant=copper">Velas</Link>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Marca</p>
            <ul>
              <li>
                <Link href="/sobre">Sobre a OMR</Link>
              </li>
              <li>
                <Link href="/jornal">Jornal</Link>
              </li>
              <li>
                <a href="#">Sustentabilidade</a>
              </li>
            </ul>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Apoio</p>
            <ul>
              <li><a href="#">Envios e Devoluções</a></li>
              <li><a href="#">Contacto</a></li>
              <li><a href="#">Perguntas Frequentes</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <p className="footer__col-title">Conecta-te</p>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">&copy; 2026 OMR Beauty Angola. Todos os direitos reservados.</p>
          <p className="footer__credit">Criado por Josefa Félix</p>
        </div>
      </div>
    </footer>
  );
}
