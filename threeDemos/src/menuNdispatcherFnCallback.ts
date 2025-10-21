// these import setup demoA() as demoA.doAllWork() 
// import { doAllWork as demoA } from './demos/demoA.mjs';
import { doAllWork as demoB } from './demos/demoB.ts';
import { TwoSpheresWithMovingLight } from './demos/OrbitLights/DemoA.ts'
// import { PopupA, QrInFrame } from './util/PopupA.ts';
import type { MenuItemLink, MenuItemFnCall } from './util/HamburgerMenu.ts';
import { CreateHamburgerMenuLinks } from './util/HamburgerMenu.ts';
import { sensorDemo } from './demos/sensors_kalman/sensorDemo.ts';

const menuItems:Array<MenuItemFnCall> = [
  { cback: () => { replaceView(sensorDemo({}), 1)  }, text: "Sensor + Kalman"  },
  { cback: () => { replaceView(demoB({ anisotropic:1, textureSpec:'circle' } ), 2)  }, text: "texture circle aniso-16"  },
  { cback: () => { replaceView(demoB({ anisotropic:1, textureSpec:'star' } ), 3)  }, text: "texture stars aniso-1"  },
  { cback: () => { replaceView(demoB({ anisotropic:16, textureSpec:'star' } ), 4)  }, text: "texture stars aniso-16"  },
  { cback: () => { replaceView(TwoSpheresWithMovingLight(), 5)  }, text: "orbit lights 2"  }
];
// menuItems.map((item, idx) => ({ key: idx + 1, ...item })); // assign keys to each

let frameElem: HTMLElement | null = document.querySelector("#mainDiv");
function replaceView( newView:HTMLElement, key:number) {
    sessionStorage.setItem('menuKey', key.toString());
    if (frameElem && frameElem?.childNodes?.length > 0) frameElem?.removeChild(frameElem?.children[0])
    frameElem?.appendChild(newView)
}
// setup only for first time...
frameElem?.appendChild(demoB({ anisotropic:16, textureSpec:'circle' }));


document.body.appendChild(
    CreateHamburgerMenuLinks(()=>{ /* code here */ } , menuItems)   )

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