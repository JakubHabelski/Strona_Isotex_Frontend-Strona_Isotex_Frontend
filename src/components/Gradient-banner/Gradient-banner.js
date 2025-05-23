import { Button } from 'react-bootstrap'
import styles from './Gradient-banner.module.css'
import { style } from 'motion/react-client'



export default function Gradient_banner(){
    return(
    <>
    <div className={styles.banner_bcg}>
        <div className={styles.banner}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                Optimize Your Daily Routine with LifeSync: The Ultimate Upgrade for Productivity!
                </h1>
                <p className={styles.description}>
                Take control of your day and maximize your productivity with LifeSync, the revolutionary upgraded daily routine app. Designed to seamlessly integrate into your lifestyle, LifeSync empowers you to unlock your full potential and achieve your goals.
                </p>
                <div className={styles.buttons}>        
                <a href="#"  className={styles.button}>Download Now</a>
                <a href="#"  className={styles.button}>Find Out More</a>
                </div>
            </div>
            <div className={styles.graphic}>
                {/* Tutaj wstaw grafikę (np. postać lub wykresy) */}
                <img src="/path-to-character-image.png" alt="LifeSync Character" className={styles.character} />
                <div className={styles.charts}>
                {/* Przykładowe placeholder dla wykresów */}
                <div className={styles.chartPlaceholder}>Chart 1</div>
                <div className={styles.chartPlaceholder}>Chart 2</div>
                </div>
            </div>
        </div>
    </div>
    </>
    )
}