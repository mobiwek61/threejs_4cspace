
import './Hamburger.css';
// var QRCode = require('qrcode')
import  QRCode  from 'qrcode'

interface PopupProps {
    isVisible?: boolean;
    txtdesc?: string;
    callBackCloseMe?: () => void;
    // somethingElse?: string;
 }
var rightArrow = 0x25B6;
// This component is a popup showing description of image, qr button and viewing tips
// PopupProps is a typescript interface obtained from the bundle
//    it specifies the parameters given to the popup by the mobiwek framework.
function QRpopup (puprops:PopupProps):HTMLCanvasElement { // , frameElem:HTMLElement|null) {
    const qrcanvas = document.createElement("canvas")
    QRCode.toCanvas(qrcanvas, window.location.href, { width: 99 }, 
      function (error:any) { if (error) console.error('error in doQRcode: ' + error);  })
    qrcanvas.style.display=(puprops.isVisible ? '' : 'none')
    return qrcanvas;
}


export { QRpopup }
    // return (
    //     <div id='divPopupContentRoot' 
    //         style={{
    //             display: (puprops.isVisible ? '' : 'none'),
    //             zIndex: '222',
    //             position: 'absolute',
    //             // fontSize: 
    //             color:'black',
    //             top: (window.innerHeight * 0.1) + 'px',
    //             maxHeight: window.innerHeight - (window.innerHeight * 0.2) + 'px',
    //         }}>
    
    //         <div id='detailDivA' >
    //             <div id='zz8'>..Scan QR to show this page on mobile</div>
    //             <canvas ref={qrcanvas} style={{ width: '200px', height: '200px' }} />
    //         </div>
           
    //         <div id='buttonsHere' style={{ display:'grid', width: 'fit-content'}}>
    //             <div className='buttonA hoverBox' 
    //                  style={{gridColumn:'1/1'}}
    //                 onClick={() => {
    //                     // document.querySelectorAll('[id^="detailDiv"]').forEach((bbb) => { (bbb as HTMLDivElement).style.display = 'none' });
    //                     puprops.callBackCloseMe(); 
    //                 }}
    //                 autoFocus={true} >
    //                 Ok, now close dialog.
    //             </div>

    //         </div>
    //     </div>
    // );





