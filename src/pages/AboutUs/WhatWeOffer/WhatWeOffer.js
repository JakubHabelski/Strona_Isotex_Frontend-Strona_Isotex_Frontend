import { useEffect } from "react"
import style from "./WhatWeOffer.module.css"
import { Button } from "react-bootstrap"


export default function WhatWeOffer(){
    useEffect(() =>{
    const WhatWeOfferContainer = document.querySelector(`.${style.WhatWeOfferContainer}`)
    const WhatWeOfferContainer_h1 = WhatWeOfferContainer.children[0]
    const WhatWeOfferContainer_p = WhatWeOfferContainer.children[1]
    const WhatWeOfferContainer_ul = WhatWeOfferContainer.children[2]
    const WhatWeOfferContainer_lis = WhatWeOfferContainer_ul.querySelectorAll("li");

    console.log(WhatWeOfferContainer_h1)
    console.log(WhatWeOfferContainer_p)
    console.log(WhatWeOfferContainer_ul)

    const observer = new IntersectionObserver ((entries) =>{
        entries.forEach((entry) =>{
            if(entry.isIntersecting){
                entry.target.style.transform = "translateY(-20px)"
                entry.target.style.opacity = 1;
            }
        })
    },
    {
        threshold: 1
    }
    )

    observer.observe(WhatWeOfferContainer_h1)
    observer.observe(WhatWeOfferContainer_p)
    WhatWeOfferContainer_lis.forEach((e) =>{
        observer.observe(e)
    })
    })

   

  


    return(
        <>
        <div className={style.WhatWeOfferBG}>
            <img src="assets/Linkedin/1626864710604.jpg"></img>
            <div className={style.WhatWeOfferContainer}>
                <h1>
                Kompleksowa obsługa na każdym etapie
                </h1>
                <p>
                    W isoTex Group zapewniamy kompleksową obsługę, aby dostarczyć Ci najlepsze rozwiązania w zakresie izolacji termicznych. Od pierwszego kontaktu po finalny montaż – wspieramy Cię w każdym kroku, dbając o jakość i efektywność Twoich instalacji. W ramach naszej usługi oferujemy:
                </p>
                <ul>
                    <li>
                        <strong>Pomiary: </strong>Przeprowadzamy szczegółowe pomiary Twojej instalacji, aby zapewnić idealne dopasowanie izolacji.
                    </li>
                    <li>
                        <strong>Indywidualny projekt: </strong>Tworzymy spersonalizowany projekt, który odpowiada specyficznym wymaganiom Twojego systemu.
                    </li>
                    <li>
                        <strong>Dobór odpowiednich komponentów: </strong>Wybieramy najlepsze rozwiązania i materiały, aby zagwarantować trwałość i efektywność.
                    </li>
                    <li>
                        <strong>Produkcja: </strong>Realizujemy produkcję materaców izolacyjnych z zachowaniem najwyższych standardów jakości.
                    </li>
                    <li>
                        <strong>Montaż: </strong>Nasi specjaliści przeprowadzają profesjonalny montaż na miejscu, zapewniając bezproblemową instalację.
                    </li>
                                
                </ul>
                <Button variant="danger">Dowiedz się więcej</Button>
            </div>
            
        </div>
        </>
    )
}