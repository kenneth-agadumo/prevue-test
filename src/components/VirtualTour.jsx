import React, { useEffect } from 'react';

export const  EmbedScript = ({ script }) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://static.kuula.io/embed.js';
        script.async = true;
        script.onload = () => {
          // Initialize Kuula embed when the script is loaded
          const div = document.getElementById('kuula-container');
          if (div) {
            div.innerHTML = `<div style="width: 100%; height: 640px;"
                data-kuula="https://kuula.co/share/N28FK?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1&margin=26&alpha=0.60">
            </div>`;
            window.kuula();
          }
        };
        document.body.appendChild(script);
    
        // Clean up function to remove the script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      return <div id="kuula-container"></div>;
}

