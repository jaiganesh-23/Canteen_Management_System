import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if(entry.target.classList.contains('data-index')) {
            // Set transition delay based on index
            const index = Number(entry.target.dataset.index ?? 0);
            entry.target.style.setProperty('--scroll-delay', `${index * 0.15}s`);
            setTimeout(() => {
              entry.target.style.setProperty('--scroll-delay', '0s');
            }, index * 150); 
          }
        } else {
          // Remove the active class when element leaves viewport
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    // Observe all elements with animation classes
    document.querySelectorAll('.scroll-scale, .scroll-bottom, .scroll-top').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.scroll-scale, .scroll-bottom, .scroll-top').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
};

export default useScrollAnimation; 