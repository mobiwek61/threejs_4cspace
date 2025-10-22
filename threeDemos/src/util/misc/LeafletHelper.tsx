// todo: move this file out of mobiwek61menu package. Here for coding
// and possible modification to package.
import  L, { map }  from 'leaflet'
import 'leaflet/dist/leaflet.css';

interface leafletMarkerIntf { latlong:[number, number], size:number, circleDia?:number }
// class markerI { latlong:[number, number]; size:number; circleDia?:number }

class leafletInDivArgs { 
    targetDiv: string; 
    markers: leafletMarkerIntf[]
    constructor() { this.markers = [] } // array must be initialized
}

var mapObj
var lastMark
function leaflet_un_mount_cleanup(mapObj) {
    mapObj.off();mapObj.remove()
}
function addMeHereMarker(mark) {
    L.marker(mark.latlong, { icon:getIconA(mark.size)}).addTo(mapObj)
    L.polyline([mark.latlong, lastMark], {color: 'red',  dashArray:'5, 8', weight: 4, opacity: 0.5 }).addTo(mapObj);
}
function modifyStyle() {
    // fix too-tiny scale thing. Relies on css class names in leaflet "leaflet": "1.9.4",
    document.querySelectorAll('.leaflet-control-scale-line')
       .forEach((elem) => {  // need to cast in 2 steps
       (elem as HTMLElement).style.fontSize='1.7rem'; // NO this is the gauge jj.style.width='auto';
       (elem as HTMLElement).style.backgroundColor='#0000ff5c';
       (elem as HTMLElement).style.border='2px solid black' })
       
    // document.querySelectorAll('.leaflet-control-attribution')
    //    .forEach((elem, key) => { 
    //         (elem as HTMLElement).style.fontSize='0.6em'
    //         var leafletAnchor = elem.querySelector('a')
    //         leafletAnchor?.setAttribute('href', '#');

    //         // const zz = leafletHref?.innerHTML
    //         // const dd:HTMLDivElement = document.createElement("span")
    //         // dd.append(...(leafletHref?.childNodes))
    //         // leafletHref?.parentNode?.appendChild(dd)
    //         // leafletHref?.remove();
    //         // This is a link to https://leafletjs.com/
    //         // Removed because this app's users won't expect it and will not
    //         // understand why they're directed to another website.
    //     })
}
/**
 * THIS IS NOT A CONTROL! IT PLACES CONTENT INSIDE THE DIV!
 * @param args:leafletInDivArgs
 * @returns leaflet map object
 */
function doLeafletInDiv(args:leafletInDivArgs) {
    console.log('doLeafletInDiv')
    // setup map, using first marker as view location
    mapObj = L.map(args.targetDiv,  { attributionControl: false, zoomControl:false }).setView(args.markers[0].latlong, 13);
    // add scale thing at bottom. ref: https://leafletjs.com/reference.html#control-scale
    L.control.scale({ position:'bottomright'}).addTo(mapObj);
    // leaflet attribution control:   L.control.attribution(<Control.Attribution options> options)

    // downloads map tiles, I think   
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapObj);

    // const marker = L.marker(args.markers[1].latlong, { icon:getIconA(args.markers[1].size)}).addTo(mapObj)
    // //     .bindPopup('<b>Hello world!</b><br />I am a popup.').openPopup();
    // L.marker(args.markers[0].latlong, { icon:getIconA(args.markers[0].size)}).addTo(mapObj)
    args.markers.forEach((mark) => { 
        L.marker(mark.latlong, { icon:getIconA(mark.size)}).addTo(mapObj)
        lastMark = mark.latlong
    })

    const circle = L.circle(args.markers[0].latlong, {
        color: 'green', fillColor: 'blue', fillOpacity: 0.1, radius: 440
    }).addTo(mapObj) //.bindPopup('I am a circle.');
    // const polygon = L.polygon([[51.509, -0.08],	[51.503, -0.06],
    // 	[51.51, -0.047]]).addTo(mapObj).bindPopup('I am a polygon.');
    // const popup = L.popup().setLatLng(args.markers[0])
    //     .setContent('popup from doLeafletInDiv').openOn(mapObj);

    function onMapClick(e) {
        //popup.setLatLng(e.latlng).setContent(`You clicked the map at ${e.latlng.toString()}`).openOn(mapObj);
    }
    //mapObj.locate({setView: true, maxZoom: 16});
    mapObj.on('click', onMapClick);
    return mapObj
}

function getIconA(width) {
    var myIcon = L.icon({
        iconUrl: '/icons/marker-icon.png', // leaflet-marker-pane
        iconSize: [width, width*1.7], 
        iconAnchor: [width/2, width*1.7], // [22, 94],
        // popupAnchor: [-3, -76],
        shadowUrl: '/icons/marker-shadow.png', // "leaflet-shadow-pane"
        shadowSize: [width*1.8, width*1.7],
        // same as iconAnchor if omitted ->  
        //shadowAnchor: [width*0.6, width*1.7], //[22, 94]
    });
    return myIcon;
}

export { modifyStyle, doLeafletInDiv, getIconA, leafletInDivArgs, leafletMarkerIntf, leaflet_un_mount_cleanup, addMeHereMarker }

/* save
trash
/ * WARNING coded for "leaflet": "1.9.4", THIS REV ONLY * /
    // var foo:CSSStyleRule = findRulesBySelector('leaflet-control-scale-line')[0]
    var foo:CSSStyleRule[] = findRulesBySelector('leaflet-container') //[0]
    //'font-size'
    console.log(foo)
    //foo.styleMap.entries().forEach((jj) => { console.log('entry: ' + jj)})
    foo.forEach((jj:CSSStyleRule) => { 
        console.log('entry: ' + jj.cssText) 
    })
    function findRulesBySelector(selector) {  // Copilot !
        const matchingRules = []; 
        for (const sheet of document.styleSheets) {
                //sheet.cssRules.forEach ((rule:CSSStyleRule) => {
                for (const rule:CSSStyleRule of sheet.cssRules) {
                    // if (rule.selectorText && rule.selectorText.includes(selector)) {
                    if (rule.selectorText && rule.selectorText === '.' + selector) {
                            matchingRules.push(rule);
                    } } }; return matchingRules;
    }
    
    // Example usage:
    // const rules = findRulesBySelector('.my-class');
    // console.log(rules);
    
    // 
    // CSSStyleRule {selectorText: '.leaflet-pane,
    */