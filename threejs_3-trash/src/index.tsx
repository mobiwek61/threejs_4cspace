import { doAllWork as demoA } from './demoA.mjs';
import { doAllWork as demoB } from './demoB.mjs';

var demoID = new URLSearchParams(window.location.search).get('demoID')
console.log(demoID)
var foo = document.querySelector('#menuDiv')
foo.appendChild(Object.assign(document.createElement("a"), { href: "?demoID=demoID-A", textContent: "demoID-A" }));
foo.appendChild(Object.assign(document.createElement("a"), { href: "?demoID=demoID-B&anisotropic=0", textContent: "demoID-B" }));
foo.appendChild(Object.assign(document.createElement("a"), { href: "?demoID=demoID-B&anisotropic=16", textContent: "demoID-B" }));

switch (demoID) {
    case 'demoID-A': demoA(); break;
    case 'demoID-B': demoB(); break;  
}