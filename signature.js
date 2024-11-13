const canvas = document.getElementById('signature-pad');
const ctx = canvas.getContext('2d');
let isDrawing = false;

function getCanvasCoordinates(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: (event.clientX || event.touches[0].clientX) - rect.left,
        y: (event.clientY || event.touches[0].clientY) - rect.top,
    };
}

function startDrawing(event) {
    isDrawing = true;
    const { x, y } = getCanvasCoordinates(event);
    ctx.beginPath();
    ctx.moveTo(x, y);
    event.preventDefault();
}

function draw(event) {
    if (!isDrawing) return;
    const { x, y } = getCanvasCoordinates(event);
    ctx.lineTo(x, y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Event listeners for mouse and touch
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
