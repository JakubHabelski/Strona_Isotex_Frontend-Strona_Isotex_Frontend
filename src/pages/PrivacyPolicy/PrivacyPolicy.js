import { useTranslation } from 'react-i18next';
import Navbar_v2 from '../../components/Navbar_v2/Navbar';
import Footer from '../../components/Footer';
import style from './PrivacyPolicy.module.css';

function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className={style.privacyPolicyPage}>
      <Navbar_v2 />
      <div className={style.privacyPolicyContainer}>
        <h1>{t('PrivacyPolicy.title')}</h1>
        <p>{t('PrivacyPolicy.introduction.p1')}</p>
        <p>{t('PrivacyPolicy.introduction.p2')}</p>
        <p>{t('PrivacyPolicy.introduction.p3')}</p>
        <p>{t('PrivacyPolicy.introduction.p4')}</p>

        <h2>{t('PrivacyPolicy.userConsent.title')}</h2>
        <p>{t('PrivacyPolicy.userConsent.p1')}</p>
        <p>{t('PrivacyPolicy.userConsent.p2')}</p>
        <p>{t('PrivacyPolicy.userConsent.p3')}</p>

        <h2>{t('PrivacyPolicy.personalData.title')}</h2>
        <h3>{t('PrivacyPolicy.personalData.acquisition.title')}</h3>
        <p>{t('PrivacyPolicy.personalData.acquisition.p1')}</p>
        <p>{t('PrivacyPolicy.personalData.acquisition.p2')}</p>
        <h3>{t('PrivacyPolicy.personalData.types.title')}</h3>
        <p>{t('PrivacyPolicy.personalData.types.p1')}</p>
        <ul>
          <li>{t('PrivacyPolicy.personalData.types.li1')}</li>
          <li>{t('PrivacyPolicy.personalData.types.li2')}</li>
          <li>{t('PrivacyPolicy.personalData.types.li3')}</li>
          <li>{t('PrivacyPolicy.personalData.types.li4')}</li>
          <li>{t('PrivacyPolicy.personalData.types.li5')}</li>
        </ul>

        <h2>{t('PrivacyPolicy.purposes.title')}</h2>
        <p>{t('PrivacyPolicy.purposes.p1')}</p>
        <h3>{t('PrivacyPolicy.purposes.communication.title')}</h3>
        <p>{t('PrivacyPolicy.purposes.communication.p1')}</p>
        <h3>{t('PrivacyPolicy.purposes.electronicOffers.title')}</h3>
        <p>{t('PrivacyPolicy.purposes.electronicOffers.p1')}</p>
        <h3>{t('PrivacyPolicy.purposes.phoneOffers.title')}</h3>
        <p>{t('PrivacyPolicy.purposes.phoneOffers.p1')}</p>
        <h3>{t('PrivacyPolicy.purposes.newsletter.title')}</h3>
        <p>{t('PrivacyPolicy.purposes.newsletter.p1')}</p>
        <h3>{t('PrivacyPolicy.purposes.comments.title')}</h3>
        <p>{t('PrivacyPolicy.purposes.comments.p1')}</p>
        <p>{t('PrivacyPolicy.purposes.additional.p1')}</p>
        <ul>
          <li>{t('PrivacyPolicy.purposes.additional.li1')}</li>
          <li>{t('PrivacyPolicy.purposes.additional.li2')}</li>
          <li>{t('PrivacyPolicy.purposes.additional.li3')}</li>
          <li>{t('PrivacyPolicy.purposes.additional.li4')}</li>
        </ul>

        <h2>{t('PrivacyPolicy.sharing.title')}</h2>
        <p>{t('PrivacyPolicy.sharing.p1')}</p>

        <h2>{t('PrivacyPolicy.userRights.title')}</h2>
        <h3>{t('PrivacyPolicy.userRights.rights.title')}</h3>
        <p>{t('PrivacyPolicy.userRights.rights.p1')}</p>
        <p>{t('PrivacyPolicy.userRights.rights.p2')}</p>
        <h3>{t('PrivacyPolicy.userRights.complaint.title')}</h3>
        <p>{t('PrivacyPolicy.userRights.complaint.p1')}</p>

        <h2>{t('PrivacyPolicy.cookies.title')}</h2>
        <p>{t('PrivacyPolicy.cookies.p1')}</p>
        <ul>
          <li>{t('PrivacyPolicy.cookies.li1')}</li>
          <li>{t('PrivacyPolicy.cookies.li2')}</li>
          <li>{t('PrivacyPolicy.cookies.li3')}</li>
          <li>{t('PrivacyPolicy.cookies.li4')}</li>
          <li>{t('PrivacyPolicy.cookies.li5')}</li>
        </ul>
        <p>{t('PrivacyPolicy.cookies.p2')}</p>

        <h2>{t('PrivacyPolicy.other.title')}</h2>
        <h3>{t('PrivacyPolicy.other.security.title')}</h3>
        <p>{t('PrivacyPolicy.other.security.p1')}</p>
        <h3>{t('PrivacyPolicy.other.storage.title')}</h3>
        <p>{t('PrivacyPolicy.other.storage.p1')}</p>
        <p>{t('PrivacyPolicy.other.storage.p2')}</p>
        <ul>
          <li>{t('PrivacyPolicy.other.storage.li1')}</li>
        </ul>
        <p>{t('PrivacyPolicy.other.storage.p3')}</p>
        <h3>{t('PrivacyPolicy.other.changes.title')}</h3>
        <p>{t('PrivacyPolicy.other.changes.p1')}</p>
        <h3>{t('PrivacyPolicy.other.contact.title')}</h3>
        <p>{t('PrivacyPolicy.other.contact.p1')}</p>
        <p>{t('PrivacyPolicy.other.contact.p2')}</p>
        <p>{t('PrivacyPolicy.other.update.p1')}</p>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;