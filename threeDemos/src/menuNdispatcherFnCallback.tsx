// these import setup demoA() as demoA.doAllWork() 
// import { doAllWork as demoA } from './demos/demoA.mjs';
import { doAllWork as demoB } from './demos/demoB.ts';
import { TwoSpheresWithMovingLight } from './demos/OrbitLights/DemoA.ts'
// import { PopupA, QrInFrame } from './util/PopupA.ts';
import type { MenuItemLink, MenuItemFnCall } from './util/HamburgerMenu.ts';
import { CreateHamburgerMenuLinks } from './util/HamburgerMenu.ts';



const menuItems:Array<MenuItemLink> = [
  //{ href: "?demoID=demoID-A", text: "texture circles" },
  { href: "?demoID=demoID-B&anisotropic=16&textureSpec=circle", text: "texture circle aniso-16" },
  { href: "?demoID=demoID-B&anisotropic=0", text: "texture stars aniso-0" },
  { href: "?demoID=demoID-B&anisotropic=16", text: "texture stars aniso-16" },
  { href: "?demoID=OrbitLights", text: "OrbitLights" },
];
const menuItemszzzz:Array<MenuItemFnCall> = [
  //{ href: "?demoID=demoID-A", text: "texture circles" },
  { cback: demoB, text: "texture circle aniso-16" },
  { cback: demoB, text: "texture stars aniso-0" },
  { cback: demoB, text: "texture stars aniso-16" },
  { cback: demoB, text: "OrbitLights" },
];

let frameElem: HTMLElement | null = document.querySelector("#mainDiv");

var demoID = new URLSearchParams(window.location.search).get('demoID')
switch (demoID) {
    //case 'demoID-A': demoA(); break;
    case 'demoID-B': 
        frameElem?.appendChild(demoB());
        break;  
    case 'OrbitLights': 
        frameElem?.appendChild(TwoSpheresWithMovingLight()); 
        break;  
    default: frameElem?.appendChild(TwoSpheresWithMovingLight()); 
        break;  
}

document.body.appendChild(
    CreateHamburgerMenuLinks((ff:void)=>{ console.log('hi2')} , menuItems)   )
