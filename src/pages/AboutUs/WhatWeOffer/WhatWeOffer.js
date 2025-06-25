import { useEffect, useRef } from "react"
import style from "./WhatWeOffer.module.css"
import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next";


export default function WhatWeOffer() {
    const containerRef = useRef(null);
    const { t } = useTranslation();
    useEffect(() => {
        const WhatWeOfferContainer = containerRef.current;
        if (!WhatWeOfferContainer) return;

        const WhatWeOfferContainer_h1 = WhatWeOfferContainer.children[0];
        const WhatWeOfferContainer_p = WhatWeOfferContainer.children[1];
        const WhatWeOfferContainer_ul = WhatWeOfferContainer.children[2];
        const WhatWeOfferContainer_lis = WhatWeOfferContainer_ul.querySelectorAll("li");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = "translateY(-20px)";
                    entry.target.style.opacity = 1;
                }
            });
        }, {
            threshold: 1
        });

        observer.observe(WhatWeOfferContainer_h1);
        observer.observe(WhatWeOfferContainer_p);
        WhatWeOfferContainer_lis.forEach((e) => {
            observer.observe(e);
        });

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div className={style.WhatWeOfferBG}>
                <img
                    src="assets/Linkedin/1626864710604.jpg"
                    alt={t('WhatWeOffer.image_alt')}
                />
                <div className={style.WhatWeOfferContainer} ref={containerRef}>
                    <h1>{t('WhatWeOffer.title')}</h1>
                    <p>{t('WhatWeOffer.description')}</p>
                    <ul>
                    <li>
                        <strong>{t('WhatWeOffer.list.item1.title')}</strong>{' '}
                        {t('WhatWeOffer.list.item1.description')}
                    </li>
                    <li>
                        <strong>{t('WhatWeOffer.list.item2.title')}</strong>{' '}
                        {t('WhatWeOffer.list.item2.description')}
                    </li>
                    <li>
                        <strong>{t('WhatWeOffer.list.item3.title')}</strong>{' '}
                        {t('WhatWeOffer.list.item3.description')}
                    </li>
                    <li>
                        <strong>{t('WhatWeOffer.list.item4.title')}</strong>{' '}
                        {t('WhatWeOffer.list.item4.description')}
                    </li>
                    <li>
                        <strong>{t('WhatWeOffer.list.item5.title')}</strong>{' '}
                        {t('WhatWeOffer.list.item5.description')}
                    </li>
                    </ul>
                    <Button variant="danger">{t('WhatWeOffer.button')}</Button>
                </div>
                </div>
        </>
    )
}