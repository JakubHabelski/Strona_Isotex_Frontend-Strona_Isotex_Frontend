import { useEffect, useRef } from 'react'
import style from './OrderProcedure.module.css'



export default function OrderProcedure(){
    const procedureRef = useRef(null);
    useEffect(() =>{
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
            
        
        const observer = new IntersectionObserver((entries) =>{
            entries.forEach((entry) =>{
                if(entry.isIntersecting){
                    const index = Array.from(OrderSteps).indexOf(entry.target);
                    
                    entry.target.style.transform = `translateX(0)`;
                    //OrderStep.style.transitionDelay = `${index * 200}ms`;
                    entry.target.style.opacity = 1;
                    entry.target.style.zIndex = OrderSteps.length- index;
                    entry.target.style.transition = `all ${index *0.5}s ease`
                    

                }
            })
        },
            {
                threshold: 0.9
            }
        )

        OrderSteps.forEach((OrderStep) =>{
            observer.observe(OrderStep);
        })


       
       
    })
    


     return(
        <>
        <h1>Procedura wykonania zamówienia w Isotex Group</h1>
        <div ref={procedureRef}  className={style.OrderProcedure}>
            <div className={style.OrderStep}>
                <h5>Zapoznanie się z ofertą</h5>
                <p>Poznaj naszą szeroką gamę materaców izolacyjnych i usług. Skontaktuj się z nami, aby otrzymać szczegółowe informacje o produktach i ich zastosowaniach.</p>
            </div>
            <div className={style.OrderStep}>
                <h5>Pomiary i konsultacja</h5>
                <p>Nasi specjaliści przeprowadzą dokładne pomiary Twojej instalacji i doradzą najlepsze rozwiązania. Wykorzystujemy technologię CAD 3D do precyzyjnego projektowania.</p>
            </div>
            <div className={style.OrderStep}>
                <h5>Przygotowanie projektu i wyceny</h5>
                <p>Na podstawie pomiarów przygotujemy indywidualny projekt izolacji i przedstawimy szczegółową wycenę. Dostosujemy się do Twoich potrzeb i budżetu.</p>
            </div>
            <div className={style.OrderStep}>
                <h5>Złożenie zamówienia</h5>
                <p>Po akceptacji projektu możesz złożyć zamówienie. Oferujemy szybką realizację dzięki zaawansowanym procesom produkcyjnym.</p>
            </div>
            <div className={style.OrderStep}>
                <h5>Produkcja i montaż</h5>
                <p>Po złożeniu zamówienia przystępujemy do produkcji materaców izolacyjnych. Po zakończeniu produkcji dostarczamy je pod wskazany adres lub przeprowadzamy profesjonalny montaż na miejscu.</p>
            </div>
        </div>
        </>
     )
}