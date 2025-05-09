import  style  from "./Infinite_Scroll.module.css";

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

export default function InfiniteScroll() {
    return (
        <>
            <div className={style.infinite_scroll_container}>
                <div className={style.wrapper}>
                    {logos.map((logo, index) => (
                        <div key={index} className={`${style.item} ${style[`item${index + 1}`]}`}>
                            <img src={logo.src} alt={logo.name} />
                            
                                <div className={style.overlay}>{logo.name}</div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}