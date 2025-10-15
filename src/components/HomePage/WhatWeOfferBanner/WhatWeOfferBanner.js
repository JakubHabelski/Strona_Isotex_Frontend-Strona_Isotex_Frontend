import { useTranslation } from "react-i18next";
import style from './WhatWeOfferBanner.module.css'
import { Button } from "react-bootstrap";

export default function WhatWeOfferBanner(){
  const { t } = useTranslation();

  return(
    <>
    <div className={style.WhatWeOfferBanner}>
      <div className={style.WhatWeOfferBannerText}>
        <p>{t('WhatWeOfferBanner.paragraph1')}</p>
        <p>{t('WhatWeOfferBanner.paragraph2')}</p>
        <Button variant='outline-warning' style={{ float: 'right' }}>
          {t('shortinfo2.button')}
        </Button>
      </div>
    </div>
    </>
  )
}