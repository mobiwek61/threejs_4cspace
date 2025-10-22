import React, { useEffect, useState } from 'react';
/* WARNING: OMITTING BRACKETS GIVES THIS MISLEADING ERROR:
   "Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function..." */
import { doLeafletInDiv, leafletInDivArgs, leafletMarkerIntf, leaflet_un_mount_cleanup, addMeHereMarker, modifyStyle } from "./LeafletHelper.tsx"
import { latLng } from 'leaflet';
import { GlowingInfo } from './SvgImageHelper.js';
import { Popup_mapinfo } from './Popup_mapinfo.tsx';

/** this is a functional component
 *  Anything related to rendering leaflet in React.js is here
 *  Code in LeafletHelper.tsx has nothing involving react
 */
function ShowMap(props:{targetDiv:string, latlong:[number,number], showMe:boolean, mwmkeyLeaf:any}) {
    // LOOK set fontsize using "Custom properties" (sometimes referred to as CSS variables or cascading variables) set in the css in the framework's bundle
    // const fontSizeSetByUser = parseInt(getComputedStyle(document.body).getPropertyValue('--mwmMenuFontSize'))
    // see https://github.com/mobiwek61/mobiwek61menu/blob/main/src/mobiwekMenu/mobiwekMenu.css
    const fontSizeSetByUser = document.body.style.getPropertyValue('--mwmMenuFontSize')
    var pointerSize = parseInt(fontSizeSetByUser) * 1.2;
    // setup new leaflet map
    var leafArg:leafletInDivArgs = new leafletInDivArgs()
    leafArg.targetDiv = 'mapA'
    const mrk:leafletMarkerIntf = {latlong:props.latlong, size:pointerSize, circleDia:30 }
    leafArg.markers.push(mrk)
    var leafletMapObj:any 
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    useEffect(() => {
        /* if this component is not active, just return */
        if (!props.showMe) return 
        //setTimeout(() => { // ONLY FOR TESTING TO SIMULATE SLOW LOAD and to see loading message

        // render leaflet map in the named div, as setup in return of this control.
        // DO NOT wait for geolocation to get my location; it takes too long.
        leafletMapObj = doLeafletInDiv(leafArg)
        modifyStyle()
        // if (navigator.geolocation) {
        /* Call to geolocation takes a few seconds, so put this code
           inside useEffect(). Map is already being rendered by the
           return() of this component. Now wait for current position and when ready 
           tell the mapping object to add it as a marker */
        navigator.geolocation?.getCurrentPosition((meHere) => {
            // now have the current location. Add a marker on the map, maybe a line too.
            addMeHereMarker({latlong:[meHere.coords.latitude, meHere.coords.longitude], size:pointerSize })
        }, (err:any) => { console.log('geo error') }) 
        /* React calls this anonymous fn and end of control lifecycle
           when control "un-mounts". It does this by return()ing it. */
        return () => { 
          console.log('map cleanup');
          leaflet_un_mount_cleanup(leafletMapObj)
        }
        //}, 1000) // setTimeout
    }) // , [props.showMe])
    var cssA:React.CSSProperties = { 
      fontSize:'1.2em', zIndex:'0', position:'absolute', 
      backgroundColor:'#bbbbbb', color:'black', 
      border: '3px solid red'
    }
    if (!props.showMe) return <></> // leaflet wont work without something already there...
    var googleUrl = 'https://www.google.com/maps/search/?api=1&query=' + props.latlong
    // WARNING: use of pointerEvents:'none', here breaks map zoom/pan!!
    ///// var ThePopup: React.FC<PopupProps> = dvprops.imageDescPopup ? dvprops.imageDescPopup : Popup_descrip_qr_scrollTips 
    return <div id='mapHolder'>
        <Popup_mapinfo 
            LEAF={ props.mwmkeyLeaf.LEAF }
            isVisible={ isInfoPopupOpen } 
            txtdesc={ props.mwmkeyLeaf.txtdesc }
            googleUrl={googleUrl}
            callBackCloseMe={(isOpen)=> { setIsInfoPopupOpen(isOpen) } } />
        {/* setup the round info button at bottom. set its onClick to update the useState() thing.
        The useState() thing is a property of the popup control; this fires it to redraw
        when the state changes. In this case it makes the popup visible.  */}
        <div id='attribution' style={{ position:'absolute', bottom:'0em', 
             right:'25%', zIndex:'100', color:'#192d60', fontWeight:'500'}}> © OpenStreetMap</div>
        <div style={{ position:'absolute', bottom:'0em'}}
             onClick={ () => { setIsInfoPopupOpen(true) }}>
          <GlowingInfo fontSize='2.0em'/></div>
        <div id="mapA" 
             style={{...cssA, width: '98vw', height: 'calc(100% - 0.0em)'}}> {/* must use 100% not 100vh on mobile ! */}
           <div style={{...cssA, paddingTop:'30vh'}}>There is a delay while OSM map tiles are loading... </div>
        </div>
        {/* SAVE this is a good output window for mobile debugging   <div style={{ zIndex:'100', backgroundColor:'#777777', position:'absolute', top:'20vh', fontSize:'22px'}}>
          <a id='googleLink' href={googleUrl} target='lkj'>google map</a>
        </div> */}
        </div>
}

// < CheckNavigatorPermissions perm="geolocation" />
function CheckNavigatorPermissions(xyz) {   
    useEffect(() => {
        navigator.permissions.query({ name: xyz.perm }).then((result) => {
          console.log('permission: \"' + xyz.perm + '\"' + result.state); 
          document.querySelector('#msgA').innerHTML='result.state: ' + result.state})
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((position) => {
                    document.querySelector('#msgA').innerHTML+=' coords: ' + 
                    position.coords.latitude + ',' + position.coords.longitude; })
              }
    })
    return (<div id='msgA' 
      style={{position:'absolute', top:'30vh', background:'yellow'}} className='blockyMsg' >waiting...</div>)
}

export { ShowMap, CheckNavigatorPermissions }