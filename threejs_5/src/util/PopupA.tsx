
// todo: move this file out of mobiwek61menu package. Here for coding
// and possible modification to package.
import React, { useState, useEffect, useRef } from 'react';
import './Hamburger.css';
var QRCode = require('qrcode')

interface PopupProps {
    isVisible?: boolean;
    txtdesc?: string;
    callBackCloseMe: () => void;
    // somethingElse?: string;
 }

// This component is a popup showing description of image, qr button and viewing tips
// PopupProps is a typescript interface obtained from the bundle
//    it specifies the parameters given to the popup by the mobiwek framework.
const PopupA: React.FC<PopupProps> = (puprops) => {
    const qrcanvas = useRef<HTMLCanvasElement>(null);

    // useEffect life cycle method.. missing: run always;  [] empty: run only once when component mounts; [foo] run when useState foo changes
    useEffect(() => {
        doQRcode(window, qrcanvas.current!);
        const dialogDiv = document.querySelector('#divPopupContentRoot') as HTMLDivElement;
    });

    const rightArrow = <>&#x25B6;</>;
    
    return (
        <div id='divPopupContentRoot' 
            style={{
                display: (puprops.isVisible ? '' : 'none'),
                zIndex: '222',
                position: 'absolute',
                // fontSize: 
                color:'black',
                top: (window.innerHeight * 0.1) + 'px',
                maxHeight: window.innerHeight - (window.innerHeight * 0.2) + 'px',
            }}>
    
            <div id='detailDivA' >
                <div id='zz8'>..Scan QR to show this page on mobile</div>
                <canvas ref={qrcanvas} style={{ width: '200px', height: '200px' }} />
            </div>
           
            <div id='buttonsHere' style={{ display:'grid', width: 'fit-content'}}>
                <div className='buttonA hoverBox' 
                     style={{gridColumn:'1/1'}}
                    onClick={() => {
                        // document.querySelectorAll('[id^="detailDiv"]').forEach((bbb) => { (bbb as HTMLDivElement).style.display = 'none' });
                        puprops.callBackCloseMe(); 
                    }}
                    autoFocus={true} >
                    Ok, now close dialog.
                </div>

            </div>
        </div>
    );
};

function doQRcode(window:any, qrcanvas:any) {
    QRCode.toCanvas(qrcanvas, window.location.href, { width: 99 }, 
      function (error:any) { if (error) console.error('error in doQRcode: ' + error);  })
}

export { PopupA }
