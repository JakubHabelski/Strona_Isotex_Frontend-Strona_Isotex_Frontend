

import { Button } from 'react-bootstrap';
import Footer from '../../components/Footer';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import style from './CertifikatePage.module.css'
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

function CertificatePageInfo(){

    const {t} = useTranslation();

    const certs = [
        {
            CertName: "ISO 9001:2015",
            CertImg: "/assets/certyfikaty/system-iso-9001.jpeg",
            Certdesc: t("CertificatePage.ISO90012015.Certdesc"),
            Links: [
                { lang: "PN-EN ISO 9001:2015 (PL)", url: "/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-pl.pdf" },
                { lang: "PN-EN ISO 9001:2015 (ENG)", url: "/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-eng.pdf" },
                { lang: "PN-EN ISO 9001:2015 (FR)", url: "/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-fr.pdf" },
                { lang: "PN-EN ISO 9001:2015 (DE)", url: "/assets/certyfikaty/cert-qms-isotex-group-ilona-zurawa-de.pdf" }
            ],
            MoreInfo: [
                { desc: t("CertificatePage.ISO90012015.MoreInfo.desc"), url: "https://www.iso.org/search.html?PROD_isoorg_en%5Bquery%5D=ISO%209001%3A2015" }
            ]
        },
        {
            CertName: t("CertificatePage.Hygienic_Certificate.CartName"),
            CertImg: "/assets/certyfikaty/logo-nizp-atest-pib.jpeg", // Zakładam poprawny obraz
            Certdesc: t("CertificatePage.Hygienic_Certificate.Certdesc"),
            Links: [
                { lang: t("CertificatePage.Hygienic_Certificate.Button"), url: "/assets/polityka/cert-qms-isotex-group-ilona-zurawa-eng.pdf" } // Poprawiony URL
            ],
            MoreInfo: [
                { desc: t("CertificatePage.Hygienic_Certificate.MoreInfo.desc"), url: "https://www.pzh.gov.pl/" }
            ]
        }
    ];
    

    return(
        <>
        <h1>{t("CertificatePage.OurCerts")}</h1>
        <div className={style.CertificatePageInfo}>
            {certs.map(cert => {
                return (
                    <div className={style.CertificateInfo}>
                        <img src={cert.CertImg} alt={cert.CertImg}></img>
                        <div>
                            <h2>{cert.CertName}</h2>
                            <p>
                                {cert.Certdesc.split("\n").map((line, index, arr) => (
                                    <React.Fragment key={index}>
                                    {line}
                                    {index !== arr.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                            <h2>Linki:</h2>
                            <div className={style.CertificateLinks}>
                            {cert.Links.map(link => (
                                <Button key={link.lang} href={link.url} variant="outline-danger">{link.lang}</Button>
                            ))}
                            </div>
                            <div>
                                {cert.MoreInfo.map(info =>(
                                    <>
                                        <p>{info.desc}<a href={info.url}>Link</a></p>
                                        
                                    </>
                                    
                                ))}
                            </div>
                        </div>

                            
                        
                    </div>
                );
            })}
            
        </div>
        </>
    )
}



function CertificatePage() {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Helmet>
                <title>{t("page_titles.Certificate")}</title>
                <link rel="icon" type="image/png" href="/assets/logo.png" />
                <meta name="description" content="Wysokiej jakości tkaniny i maty izolacyjne od Isotex Group. Przeglądaj nasze produktu i zamawiaj online!" />
                <meta name="keywords" content="tkaniny izolacyjne, maty izolacyjne, Isotex Group, materiały ognioodporne, sklep online" />
                <meta name="robots" content="index, follow" />
                <script type="application/ld+json">{`
                    {
                        "@context": "https://schema.org",
                        "@type": "WebPage",
                        "name": "Isotex Group Sklep",
                        "description": "Sklep online z tkaninami i matami izolacyjnymi od Isotex Group.",
                        "publisher": {
                            "@type": "Organization",
                            "name": "Isotex Group",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://testfunkcjonalonscisklepu.pl/assets/logo.png"
                            }
                        }
                    }
                `}</script>
            </Helmet>
            <Navbar_v2></Navbar_v2>
            <CertificatePageInfo></CertificatePageInfo>
            <Footer></Footer>
        </>
    );
}

export default CertificatePage;