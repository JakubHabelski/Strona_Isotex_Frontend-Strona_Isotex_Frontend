import { useTranslation } from "react-i18next";
import style from './Catalog.module.css'
import { Button } from "react-bootstrap";


export default function Catalog(){
const { t } = useTranslation();
  return(
    <>
    <div className={style.CatalogContainerBG}>
      <div className={style.CatalogContainer}>
        <div className={style.CatalogText}>
          <h1>{t('Catalog.title')}</h1>
          <p>{t('Catalog.description')}</p>
          <Button href='/assets/KATALOG_ISOTEX_GROUP.pdf' variant='outline-danger'>
            {t('Catalog.download_button')}
          </Button>
        </div>
        <img
          src='/assets/KATALOG_ISOTEX_GROUP_page-0001.jpg'
          className={style.CatalogImage}
          alt={t('Catalog.image_alt')}
          loading="lazy"
        />
      </div>
    </div>
    
    
    
    </>
  )
}
