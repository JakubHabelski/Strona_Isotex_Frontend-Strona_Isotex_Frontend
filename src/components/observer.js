import { useEffect } from "react";



export function observer_implementation(){
  useEffect(() => {
  const text_elements = document.querySelectorAll(`.${style.text_element}`);


  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          //entry.target.style.backgroundColor = 'blue';
          entry.target.style.setProperty('transform', 'none', 'important');
          
        } else {
          
        }
      });
    },
    { threshold: 0.9 }
  );
  text_elements.forEach((text_element) =>{
    observer.observe(text_element)
  })
  }, []);
}