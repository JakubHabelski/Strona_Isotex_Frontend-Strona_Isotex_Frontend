import React, { useEffect, useRef } from 'react';
import styles from './ClientSlider.module.css';
import { Translate } from 'react-bootstrap-icons';

const ClientSlider = () => {
    
      const logos = [
        { src: '/assets/clients/atex.jpg', name: 'ATEX' },
        { src: '/assets/clients/cropped-madrass-insulation-jackets-icon-1.jpg', name: 'MADRASS' },
        { src: '/assets/clients/iwg_isolier_wendt.jpeg', name: 'IWG ISOLIER WENDT' },
        { src: '/assets/clients/Newag_Group_logo_2013_500x115.svg.png', name: 'NEWAG GROUP' },
        { src: '/assets/clients/wendt_noise.png', name: 'WENDT NOISE' },
        { src: '/assets/clients/atex.jpg', name: 'ATEX' },
        { src: '/assets/clients/cropped-madrass-insulation-jackets-icon-1.jpg', name: 'MADRASS' },
        { src: '/assets/clients/iwg_isolier_wendt.jpeg', name: 'IWG ISOLIER WENDT' },
        { src: '/assets/clients/Newag_Group_logo_2013_500x115.svg.png', name: 'NEWAG GROUP' },
        { src: '/assets/clients/wendt_noise.png', name: 'WENDT NOISE' },
        
    ];
    const trastion_distance = 320; //px
    const transition_time = 2; //s
    let current_distance = 0; //px
    let logo_count = 0;
    useEffect(() => {
        const list = document.querySelector(`.${styles.list}`);
        
        const interval = setInterval(() => {
            logo_count += 1;
                console.log(logo_count);
                console.log(logos[logo_count]);
                list.style.transition = `transform ${transition_time}s ease-in-out`;
                list.style.transform = `translateX(-${current_distance}px)`;
                current_distance += trastion_distance;
                
                if (logo_count > (logos.length/2)+1) {
                    
                    list.style.transition = 'none'; // Reset transition for instant jump
                    list.style.transform = `translateX(0)`; // Instantly jump back to the start
                    
                    logo_count = 0;
                    current_distance = 0;
                }
                
            
        }, transition_time * 1000 );
        return () => clearInterval(interval);
            
        
    }, []);
      
    
     return (
        
        <div className={` ${styles.clientSliderContainer}`}>
            <h1 >Some of our clients...</h1>
                <div className={styles.clientSlider}>
                <div className={styles.list}>
                    {logos.map((logo, index) => (
                        <div key={index} className={styles.logoContainer}>
                            <img src={logo.src} alt={logo.name} className={styles.logo} />
                            <div className={styles.overlay}>
                                <div className={styles.overlayText}>{logo.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
          
        
     
        
    )
};

export default ClientSlider;