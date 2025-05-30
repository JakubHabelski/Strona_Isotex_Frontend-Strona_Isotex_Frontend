import Footer from "../../components/Footer";
import Navbar_v2 from "../../components/Navbar_v2/Navbar";
import style from './Fastenings.module.css'



function FasteningsInfo(){
    

    return (
        <>
        <div className={style.FasteningsContainer}>
       
            <div className={style.FasteningsHero}>
            <h1>Zapięcia: Haki, rzepy, paski – dla łatwego montażu i demontażu</h1>
            <p>
                W isoTex Group oferujemy wysokiej jakości zapięcia, które zapewniają prostotę i niezawodność w montażu oraz demontażu izolacji termicznych.
                Nasze haki, rzepy i paski są projektowane z myślą o Twoich potrzebach, zapewniając trwałość i precyzję w każdym zastosowaniu.
            </p>
            </div>
            <div>

            </div>
            <div className={style.FasteningsTypes}>
                <div className={style.FasteningsType}>
                    <h1>Rzepy</h1>
                    <img src="/assets/whatsapp/IMG-20250528-WA0043.jpg"></img>
                </div>
                <div className={style.FasteningsType}>
                    <h1>Haki</h1>
                    <img src="/assets/whatsapp/IMG-20250528-WA0078.jpg"></img>
                </div>
                <div className={style.FasteningsType}>
                    <h1>klamry</h1>
                    <img src="/assets/whatsapp/IMG-20250528-WA0069.jpg"></img>
                </div>
            </div>

        </div>
        </>
    )
}

export default function Fastenings() {
   return (
    <>
    <Navbar_v2/>
    <FasteningsInfo/>
    

    <Footer/>
    </>
   )
}