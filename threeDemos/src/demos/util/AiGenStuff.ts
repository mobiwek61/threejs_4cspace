
// function asciiBar2(min:number, max:number, val1:number, val2:number) {
//         return ( val1 + '<br/>' + // val1 + '  kal:' + val2  // + '  ct:' + ct++ + '<br/>' 
//             asciiBar(min, max, val1) + '<br/>' + asciiBar(min, max, val2))
// }
function asciiBar2(min:number, max:number, val1:number, val2:number) {
        return ( '<div id="asciibar">' + // val1 + '  kal:' + val2  // + '  ct:' + ct++ + '<br/>' 
            asciiBar(min, max, val1) + asciiBar(min, max, val2) + '</div')
}

function asciiBar(min: number, max: number, current: number): string {
  const totalWidth = 60;
  const clamped = Math.max(min, Math.min(current, max));
  const ratio = (clamped - min) / (max - min);
  const pos = Math.round(ratio * (totalWidth - 1)); // position of 'X'

  let bar = '';
  for (let i = 0; i < totalWidth; i++) {
    bar += i === pos ? 'X' : '-';
  }

  return `[${bar}] <div class='fontX'> ${current.toFixed(2)} </div>`;
}


// function QQasciiBar(min: number, max: number, current: number): string {
//   const totalWidth = 30;
//   const halfWidth = Math.floor(totalWidth / 2);
//   const clamped = Math.max(min, Math.min(current, max));

//   let left = ' '.repeat(halfWidth);
//   let right = ' '.repeat(halfWidth);

//   if (clamped < 0) {
//     const ratio = Math.abs(clamped / min); // min is negative
//     const fillLeft = Math.round(ratio * halfWidth);
//     left = '='.repeat(fillLeft).padStart(halfWidth, ' ');
//   } else if (clamped > 0) {
//     const ratio = clamped / max;
//     const fillRight = Math.round(ratio * halfWidth);
//     right = '='.repeat(fillRight).padEnd(halfWidth, ' ');
//   }

//   return `[${left}|${right}] ${clamped}`;
// }


// function ZZasciiBar(min: number, max: number, current: number): string {
//     const totalWidth = 30; // total characters in the bar
//     const clamped = Math.max(min, Math.min(current, max));
//     const ratio = (clamped - min) / (max - min);
//     const filled = Math.round(ratio * totalWidth);
//     const empty = totalWidth - filled;
//     // return `[${'='.repeat(filled)}${' '.repeat(empty)}] ${clamped}/${max}`;
//     return `[${'='.repeat(filled)}${' '.repeat(empty)}] `;
// }
export { asciiBar, asciiBar2 }