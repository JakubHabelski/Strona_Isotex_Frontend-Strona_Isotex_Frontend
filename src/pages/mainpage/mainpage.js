import React, { use } from 'react';
import style from './mainpage.module.css';

import VideoHeader from '../../components/VideoHeader/VideoHeader';
import NavbarMain from '../../components/Navbar/Navbar';
import App from '../../App';


export default function MainPage() {
    
  return (
    <>
    <NavbarMain></NavbarMain>
    <VideoHeader></VideoHeader>
    
    </>
    
  );
}   