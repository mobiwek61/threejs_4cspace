import React, { useEffect, useState } from 'react';
import { BsInfoCircle } from "react-icons/bs";
/**
 * This is the glowing info icon. It consists of a react-icon/fa thing 
 * on top of a SVG circle which forms a background color
 * @param fontSize
 * @param onClick function to invoke when control is clicked
 * @returns 
 */
function GlowingInfo(props) {
    return(
        <div id='GlowingInfo' style={{display:'inline-grid'}} >
        {/* below is box under hamburger to give the glowingCloud effect. Got right size by
          looking as debug-source of hamburger, using its viewbox etc */}
        <svg id='SolidBoxUnderInfo' 
              className="glowingBackdrop"
              viewBox="0 0 10 10" // viewBox is min/max scale for cx, cy, r, not size
              height="1em" width="1em" // use 1em to set relative to font size, setup below in style
              xmlns="http://www.w3.org/2000/svg" 
              style={{fontSize:props.fontSize, // width/height eats this
                      zIndex:'22', margin:'0',  position:'absolute' }} >
              <circle // below center & radius in viewBox coordinates setup in svg tag
                      cx="5" cy="5" r="5" 
                      //fill='#cccccc' 
                      />
        </svg>
        <BsInfoCircle // this sits on top of glowing backdrop
              style={{fontSize:props.fontSize, zIndex:'22', color:'#000000' }}
              />
      </div>)
  }

  export { GlowingInfo }