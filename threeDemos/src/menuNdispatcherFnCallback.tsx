// these import setup demoA() as demoA.doAllWork() 
// import { doAllWork as demoA } from './demos/demoA.mjs';
import { doAllWork as demoB } from './demos/demoB.ts';
import { TwoSpheresWithMovingLight } from './demos/OrbitLights/DemoA.ts'
// import { PopupA, QrInFrame } from './util/PopupA.ts';
import type { MenuItemLink, MenuItemFnCall } from './util/HamburgerMenu.ts';
import { CreateHamburgerMenuLinks } from './util/HamburgerMenu.ts';

const menuItems:Array<MenuItemFnCall> = [
  { cback: () => { replaceView(demoB({ anisotropic:1, textureSpec:'circle' } ))  }, text: "texture circle aniso-16"  },
  { cback: () => { replaceView(demoB({ anisotropic:1, textureSpec:'star' } ))  }, text: "texture stars aniso-1"  },
  { cback: () => { replaceView(demoB({ anisotropic:16, textureSpec:'star' } ))  }, text: "texture stars aniso-16"  },
  { cback: () => { replaceView(TwoSpheresWithMovingLight())  }, text: "orbit lights 2"  }
];

let frameElem: HTMLElement | null = document.querySelector("#mainDiv");
function replaceView( newView:HTMLElement) {
    if (frameElem && frameElem?.childNodes?.length > 0) frameElem?.removeChild(frameElem?.children[0])
    frameElem?.appendChild(newView)
}

frameElem?.appendChild(demoB({ anisotropic:16, textureSpec:'circle' }));
// example where params come from url after the ?  ie: www.zz.com/bbb?demoID=demoID-B&anisotropic=16&textureSpec=star
// var demoID = new URLSearchParams(window.location.search).get('demoID')
// switch (demoID) {
//     //case 'demoID-A': demoA(); break;
//     case 'demoID-B': 
//         frameElem?.appendChild(demoB());
//         break;  
//     case 'OrbitLights': 
//         frameElem?.appendChild(TwoSpheresWithMovingLight()); 
//         break;  
//     default: frameElem?.appendChild(TwoSpheresWithMovingLight()); 
//         break;  
// }

document.body.appendChild(
    CreateHamburgerMenuLinks(()=>{ /* code here */ } , menuItems)   )
