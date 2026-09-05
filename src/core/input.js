const keys = {};
const mouse = { x: 0, y: 0, down: false };

window.addEventListener('keydown', e => { keys[e.code] = true; });
window.addEventListener('keyup', e => { keys[e.code] = false; });
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener('mousedown', () => { mouse.down = true; });
window.addEventListener('mouseup', () => { mouse.down = false; });

export function isKeyDown(code) { return !!keys[code]; }
export function getMouse() { return mouse; }
