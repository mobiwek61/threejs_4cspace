// these import setup demoA() as demoA.doAllWork() 
import { doAllWork as demoA } from './demoA.mjs';
import { doAllWork as demoB } from './demoB.ts';
import { PopupA, QrInFrame } from './util/PopupA.ts';
import { Hamburger } from './util/HamburgerMenu';

var demoID = new URLSearchParams(window.location.search).get('demoID')
const menuItems = [
  { href: "?demoID=demoID-A", text: "bbbbdemoID-A" },
  { href: "?demoID=demoID-B&anisotropic=0", text: "demoID-B" },
  { href: "?demoID=demoID-B&anisotropic=16", text: "demoID-B" },
  { href: "?demoID=qrcode", text: "qrcode" }
];

let frameElem: HTMLElement | null = document.querySelector("#mainDiv");

switch (demoID) {
    case 'demoID-A': demoA(); break;
    case 'demoID-B': demoB(frameElem); break;  
    case 'qrcode': QrInFrame(frameElem); break;  
    default: demoA()
}

document.body.appendChild(
    Hamburger((ff:void)=>{ console.log('hi2')} , menuItems)   )
