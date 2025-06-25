import { useTranslation } from "react-i18next";
import style from "./OurTeam.module.css";



export default function OurTeam() {
    const { t } = useTranslation();
    return(
        <>
            <h1>{t('Team.title')}</h1>
            <div className={style.teamContainer}>
                <div className={style.teamMember}>
                <img
                    src="/assets/OurTeam/woman.png"
                    alt={t('Team.member1.image_alt')}
                    className={style.teamMemberIMG}
                />
                <h2>{t('Team.member1.name')}</h2>
                <p>{t('Team.member1.position')}</p>
                </div>
                <div className={style.teamMember}>
                <img
                    src="/assets/OurTeam/man.png"
                    alt={t('Team.member2.image_alt')}
                    className={style.teamMemberIMG}
                />
                <h2>{t('Team.member2.name')}</h2>
                <p>{t('Team.member2.position')}</p>
                </div>
                <div className={style.teamMember}>
                <img
                    src="/assets/OurTeam/man.png"
                    alt={t('Team.member3.image_alt')}
                    className={style.teamMemberIMG}
                />
                <h2>{t('Team.member3.name')}</h2>
                <p>{t('Team.member3.position')}</p>
                </div>
            </div>
        </>
    )
}