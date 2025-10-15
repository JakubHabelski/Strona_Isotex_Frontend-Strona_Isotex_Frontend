import { useTranslation } from "react-i18next";
import style from './OurProducts.module.css'

export default function OurProducts(){
  const { t } = useTranslation();
  return(
    <>
    <div className={style.OurProductsBG}>
      <div className={style.OurProducts}>
        <h1>{t('OurProducts.title')}</h1>
        <div className={style.OurProductsGrid}>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product1.title')}</h2>
              <p>{t('OurProducts.product1.description')}</p>
            </div>
            <img
              src="/assets/Linkedin/1615967129156.jpg"
              alt={t('OurProducts.product1.image_alt')}
              loading="lazy"
            />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product2.title')}</h2>
              <p>{t('OurProducts.product2.description')}</p>
            </div>
            <img
              src="/assets/materials/fabrics/glass.jpg"
              alt={t('OurProducts.product2.image_alt')}
              loading="lazy"
            />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product3.title')}</h2>
              <p>{t('OurProducts.product3.description')}</p>
            </div>
            <img
              src="/assets/materials/Fillings/welna-mineralna/welna_szklana.jpg"
              alt={t('OurProducts.product3.image_alt')}
              loading="lazy"
            />
          </div>
          <div className={style.GridProduct}>
            <div className={style.GridProductText}>
              <h2>{t('OurProducts.product4.title')}</h2>
              <p>{t('OurProducts.product4.description')}</p>
            </div>
            <img
              src="/assets/whatsapp/IMG-20250528-WA0018.jpg"
              alt={t('OurProducts.product4.image_alt')}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}