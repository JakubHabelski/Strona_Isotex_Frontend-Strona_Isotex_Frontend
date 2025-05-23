import { Button } from 'react-bootstrap';
import styles from './SimpleBanner.module.css';


const SimpleBanner = () => {
  return (
    <div className={styles.SimpleBannerContainer}>
        <div className={styles.banner}>
        <div className={styles.decorativeElementLeft}></div>
        <div className={styles.content}>
            <h1 className={styles.title}>
            Discover Energy Efficiency with Isotex Group
            </h1>
            <p className={styles.description}>
            Innovative thermal insulation solutions for your home or business. Save energy, reduce costs, and build a sustainable future.
            </p>
            <Button text="View Solutions" primary>View Solutions</Button> 
        </div>
        <div className={styles.decorativeElementRight}></div>
        </div>
    </div>
        
  );
};

export default SimpleBanner;