function asciiBar(min: number, max: number, current: number): string {
    const totalWidth = 50; // total characters in the bar
    const clamped = Math.max(min, Math.min(current, max));
    const ratio = (clamped - min) / (max - min);
    const filled = Math.round(ratio * totalWidth);
    const empty = totalWidth - filled;
    // return `[${'='.repeat(filled)}${' '.repeat(empty)}] ${clamped}/${max}`;
    return `[${'='.repeat(filled)}${' '.repeat(empty)}] `;
}
export { asciiBar }