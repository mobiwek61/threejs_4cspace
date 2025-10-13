// import React from 'react';
import './Hamburger.css';

function Hamburger(ff: () => void) {
  const container = document.createElement('div');
  container.className = 'hamburger';
  container.onclick = () => {  ff(); 
    const popup = document.getElementById('menuA');
    if (popup) {
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    }
  };

  for (let i = 0; i < 3; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    container.appendChild(bar);
  }
  container.appendChild(Foo());
  return container;
}

const Foo = () => {
  const div = document.createElement('div'); div.id = 'menuA';
  div.style.color = 'white';
  div.textContent = 'choose item: '; 
  div.style.display = 'none'
  div.appendChild(Object.assign(document.createElement("a"), { href: "?demoID=demoID-A", textContent: "demoID-A" }));
  div.appendChild(Object.assign(document.createElement("a"), { href: "?demoID=demoID-B&anisotropic=0", textContent: "demoID-B" }));
  div.appendChild(Object.assign(document.createElement("a"), { href: "?demoID=demoID-B&anisotropic=16", textContent: "demoID-B" }));

  return div
};

// Example usage:
//document.body.appendChild(Hamburger());


// const Hamburger: React.FC<MenuProps> = (mprops) => {
//   const handleClick = () => {  mprops.hamburgerCallBack();  };
//   return (
//     <svg onClick={handleClick} 
//      viewBox="0 0 30 30" width="30" height="30" 
//      style={{ position: 'fixed', top: 0, left: 0, 
//               cursor: 'pointer', zIndex: 9999 }}>
//      {[7, 14, 21].map((y, i) => // ask AI what this does cuz it make it
//      <rect key={i} x="5" y={y} width="20" height="2" rx="1" 
//            fill="#333" />)}
// </svg>

//   );


  // return (
  //   <div className="hamburger" onClick={handleClick}>
  //     <span></span>
  //     <span></span>
  //     <span></span>
  //   </div>
  // );
// };

export { Hamburger };
