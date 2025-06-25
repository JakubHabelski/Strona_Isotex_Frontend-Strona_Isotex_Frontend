import { useEffect, useRef } from 'react'
import style from './OrderProcedure.module.css'
import { useTranslation } from 'react-i18next';



export default function OrderProcedure(){
    const { t } = useTranslation();
    const procedureRef = useRef(null);
    useEffect(() =>{
        const OrderProcedure = document.querySelectorAll(`.${style.OrderProcedure}`)
        const OrderSteps = document.querySelectorAll(`.${style.OrderStep}`)
        const containerWidth = procedureRef.current.getBoundingClientRect().width;
        const stepWidth = containerWidth / OrderSteps.length;
        let h5_height= 0;
        let p_height = 0;
        
        OrderSteps.forEach((OrderSteps) =>{
            console.log(OrderSteps.children[0].getBoundingClientRect().height)
            if(OrderSteps.children[0].getBoundingClientRect().height>h5_height){
                h5_height=OrderSteps.children[0].getBoundingClientRect().height
            }
            if(OrderSteps.children[1].getBoundingClientRect().height>p_height){
                p_height=OrderSteps.children[1].getBoundingClientRect().height
            }
            
        })
        console.log("p_height: " , p_height)
        OrderSteps.forEach((OrderSteps) =>{
            OrderSteps.children[0].style.height= `${h5_height}px`;
            OrderSteps.children[1].style.height= `${p_height}px`;
        })
            
        
          const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
            if(entry.isIntersecting){
                let delay = 0;
                OrderSteps.forEach((step, index) => {
                setTimeout(() => {
                    step.style.transform = 'translateX(0)';
                    step.style.opacity = 1;
                    step.style.zIndex = OrderSteps.length - index;
                    step.style.transition = `all 0.8s cubic-bezier(.77,0,.18,1)`;
                }, delay);
                delay += 500;
                });
                observer.disconnect(); // animuj tylko raz
            }
            });
        }, { threshold: 0.2 });

        OrderSteps.forEach((OrderStep) => {
            observer.observe(OrderStep);
        })


       
       
    })
    


     return(
        <>
        <h1>{t('OrderProcedure.title')}</h1>
        <div ref={procedureRef} className={style.OrderProcedure}>
            <div className={style.OrderStep}>
            <h5>{t('OrderProcedure.step1.title')}</h5>
            <p>{t('OrderProcedure.step1.description')}</p>
            </div>
            <div className={style.OrderStep}>
            <h5>{t('OrderProcedure.step2.title')}</h5>
            <p>{t('OrderProcedure.step2.description')}</p>
            </div>
            <div className={style.OrderStep}>
            <h5>{t('OrderProcedure.step3.title')}</h5>
            <p>{t('OrderProcedure.step3.description')}</p>
            </div>
            <div className={style.OrderStep}>
            <h5>{t('OrderProcedure.step4.title')}</h5>
            <p>{t('OrderProcedure.step4.description')}</p>
            </div>
            <div className={style.OrderStep}>
            <h5>{t('OrderProcedure.step5.title')}</h5>
            <p>{t('OrderProcedure.step5.description')}</p>
            </div>
        </div>
        </>
     )
}