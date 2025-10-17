// import React from 'react';
import './Hamburger.css';
import { QRpopup } from './QRpopup';

type MenuItemLink = { href: string;   text: string; };
// type callbackA = () => void;
type MenuItemFnCall = { cback: () => void; text: string; };

var theQR = QRpopup({})
function CreateHamburgerMenuLinks(ff: () => void, menus:Array) {
  console.log('asdf')
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
  container.appendChild(parseMenuToLink(menus));
  container.appendChild(theQR) // the {} removes missing-arg error
  return container;
}

const parseMenuToFn = (links:Array<MenuItemFnCall>) => {
  const div = document.createElement('div'); div.id = 'menuFrame'; div.style.display = 'none'
  const menuDiv = document.createElement('div'); div.id = 'menuA'; 
  menuDiv.style.color = 'white'; menuDiv.textContent = 'choose item: '; 
  /* stack vertically */menuDiv.style.display='flex'; menuDiv.style.flexDirection='column';
  menuDiv.style.whiteSpace = 'nowrap'; 
  links.forEach(link => {
    const anch = document.createElement('a'); anch.className='anchorStyle'; 
    anch.href = link.href;  anch.textContent = link.text; 
    menuDiv.appendChild(anch);
  });
  createButton('qr code', () => { console.log('adfasdf')}, menuDiv)
  div.appendChild(menuDiv)
  return div
};

const parseMenuToLink = (links:Array<MenuItemLink>) => {
  const div = document.createElement('div'); div.id = 'menuFrame'; div.style.display = 'none'
  const menuDiv = document.createElement('div'); div.id = 'menuA'; 
  menuDiv.style.color = 'white'; menuDiv.textContent = 'choose item: '; 
  /* stack vertically */menuDiv.style.display='flex'; menuDiv.style.flexDirection='column';
  menuDiv.style.whiteSpace = 'nowrap'; 
  links.forEach(link => {
    const anch = document.createElement('a'); anch.className='anchorStyle'; 
    anch.href = link.href;  anch.textContent = link.text; 
    menuDiv.appendChild(anch);
  });
  createButton('qr code', () => { console.log('adfasdf')}, menuDiv)
  div.appendChild(menuDiv)
  return div
};

function createButton(label: string, onClick: () => void, target: HTMLElement = document.body) {
  const button = document.createElement('a');
  button.textContent = label; button.className='anchorStyle';
  //Object.assign(button.style, { width:'fit-content', backgroundColor: 'transparent' });
  // button.onclick = onClick;
  button.onclick = () => { theQR.style.display = theQR.style.display === 'block' ? 'none' : 'block' };
    
  target.appendChild(button);
}

export { CreateHamburgerMenuLinks, type MenuItemLink, type MenuItemFnCall };

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


