import style from "./OurTeam.module.css";



export default function OurTeam() {
    return(
        <>
            <h1>Nasz zespół</h1>
            <div className={style.teamContainer}>
                <div className={style.teamMember}>
                    <img src="/assets/OurTeam/woman.png" alt="Członek zespołu 1" className={style.teamMemberIMG}/>
                    <h2>Ilona Żurawa</h2>
                    <p>CEO Isotex Group</p>
                </div>
                <div className={style.teamMember}>
                    <img src="/assets/OurTeam/man.png" alt="Członek zespołu 1" className={style.teamMemberIMG}/>
                    <h2>Rafał Ofiara</h2>
                    <p>Kierownik produkcji</p>
                </div>
                <div className={style.teamMember}>
                    <img src="/assets/OurTeam/man.png" alt="Członek zespołu 1" className={style.teamMemberIMG}/>
                    <h2>Łukasz Dymarczyk</h2>
                    <p>Kierownik Produkcji</p>
                </div>
                
                </div>
        </>
    )
}