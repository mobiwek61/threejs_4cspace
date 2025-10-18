// import React from 'react';
import './Hamburger.css';
import { QRpopup } from './QRpopup';

type MenuItemLink = { href: string;   text: string; };
// type callbackA = () => void;

var theQR:HTMLElement;
function CreateHamburgerMenuLinks(ff: () => void, menus:Array<MenuItemFnCall>) {
  theQR = QRpopup({}, window.location.href + '?menuKey=' + sessionStorage.getItem('menuKey'))
  const container = document.createElement('div');
  container.className = 'hamburger';
  container.onclick = () => {  ff(); 
    const popup = document.getElementById('menuA');
    if (popup) {
      popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    }
  };

  for (let i = 0; i < 3; i++) {  // this is the hamburger 3-bar thing
    const bar = document.createElement('div'); bar.className = 'bar'; container.appendChild(bar);  
  }
  //container.appendChild(parseMenuToLink(menus));
  const items = parseMenuToFn(menus);
  container.appendChild(items);
  container.appendChild(theQR) // the {} removes missing-arg error
  return container;
}

type MenuItemFnCall = { key?:number; cback: (bb:any) => void; text: string; params?: Object };

const parseMenuToFn = (links:Array<MenuItemFnCall>) => {
  const div = document.createElement('div'); div.id = 'menuFrame'; div.style.display = 'none'
  const menuDiv = document.createElement('div'); div.id = 'menuA'; 
  menuDiv.style.color = 'white'; menuDiv.textContent = 'choose item: '; 
  /* stack vertically */menuDiv.style.display='flex'; menuDiv.style.flexDirection='column';
  menuDiv.style.whiteSpace = 'nowrap'; 
  links.forEach(link => {
    createButtonCbFunc(link.text, link.cback, {}, menuDiv)
    // menuDiv.appendChild(anch);
  });
  createButton('qr code', () => { theQR.style.display = theQR.style.display === 'block' ? 'none' : 'block'; console.log('menuKey ' + sessionStorage.getItem('menuKey')) }, menuDiv)
  div.appendChild(menuDiv)
  return div
};

function createButtonCbFunc(label: string, callBackFn: (params:Object) => void, params: Object, target: HTMLElement) {
  const button = document.createElement('a');
  button.textContent = label; button.className='anchorStyle';
  button.onclick = () => { callBackFn(params); console.log('clicked '+label) };  
  target.appendChild(button);
}

function createButton(label: string, onClick: () => void, target: HTMLElement = document.body) {
  const button = document.createElement('a');
  button.textContent = label; button.className='anchorStyle';
  button.onclick = onClick
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


