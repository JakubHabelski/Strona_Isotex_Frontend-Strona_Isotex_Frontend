import style from './Success_payment.module.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Elo() {
    const navigate = useNavigate(); // Wywołaj useNavigate bezpośrednio w komponencie

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/'); // Replace '/new-url' with your desired path
        }, 5000);

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, [navigate]); // Dodaj navigate jako zależność

}

export default function Success_payment() {
    return (
        <>
            <div className={style.Success_payment_box}>
                <Elo />
                <div className={style.Success_payment_mess}>
                success, Redirecting
                </div>
                
            </div>
        </>
    );
}