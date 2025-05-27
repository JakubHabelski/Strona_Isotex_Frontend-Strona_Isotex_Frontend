import { Button } from "react-bootstrap"
import style from "./JoinUs.module.css" 
import { useTranslation } from "react-i18next";




export default function JoinUs() {
    const { t } = useTranslation();
    return(
        <>
            <div className={style.joinUsContainer}>
                <div >
                    <img src="/assets/handshake2.jpeg" alt="Join Us" className={style.joinUsImage} />
                    <div style={{background: "linear-gradient(to right, #ffffff, transparent)"}}></div>
                </div>
                
                <div className={style.joinUsText}>
                    <h1>{t("JoinUs.title")}</h1>
                    <p>{t("JoinUs.description")}</p>
                    <a className={`${style.joinUsButton} btn btn-outline-light`} href="/joinus" role="button">{t("JoinUs.button")}</a>

                </div>
                
                
            </div>
        </>
    )
}