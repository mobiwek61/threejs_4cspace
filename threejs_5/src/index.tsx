// these import setup demoA() as demoA.doAllWork() 
import { doAllWork as demoA } from './demoA.mjs';
import { doAllWork as demoB } from './demoB.ts';
import { TwoSpheresWithMovingLight } from './OrbitLights/DemoA.ts'
// import { PopupA, QrInFrame } from './util/PopupA.ts';
import { Hamburger } from './util/HamburgerMenu';

var demoID = new URLSearchParams(window.location.search).get('demoID')
const menuItems = [
  { href: "?demoID=demoID-A", text: "demoID-A" },
  { href: "?demoID=demoID-B&anisotropic=0", text: "demo_B-aniso-0" },
  { href: "?demoID=demoID-B&anisotropic=16", text: "demo_B-aniso-16" },
  { href: "?demoID=OrbitLights", text: "OrbitLights" },
];

let frameElem: HTMLElement | null = document.querySelector("#mainDiv");

switch (demoID) {
    case 'demoID-A': demoA(); break;
    case 'demoID-B': 
        frameElem?.appendChild(demoB());
        break;  
    case 'OrbitLights': 
        frameElem?.appendChild(TwoSpheresWithMovingLight()); 
        break;  
    default: demoA()
}

document.body.appendChild(
    Hamburger((ff:void)=>{ console.log('hi2')} , menuItems)   )
