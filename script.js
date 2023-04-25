const Container = document.querySelector('.container');
const range = document.querySelector('.range');
const inputvalue = document.querySelector('.inputvalue')

const validsize = [8, 16, 32, 64];
const defaultvalue = validsize[range.value];

board(defaultvalue);
inputvalue.textContent = defaultvalue + 'x' + defaultvalue;

range.addEventListener("click", function (e) {
    let size = validsize[this.value];
    inputvalue.textContent = `${size}x${size}`;;
    board(size);
    clean();
});


function board(size) {
    
    while (Container.firstChild) {
        Container.removeChild(Container.firstChild);
    }

    for (let i = 0; i < size; i++) {
        const raw = document.createElement('div');
        raw.setAttribute('class', 'raw');
        Container.appendChild(raw);
        for (let i = 0; i < size; i++) {
            const pixel = document.createElement('div');
            pixel.setAttribute('class', 'pix')
            raw.appendChild(pixel);
            color(pixel);
        }
    }
}


function color(pixel) {
    pixel.addEventListener("mousedown", crayon);
    pixel.addEventListener("mouseover", event => {
        if (event.buttons == 1) crayon(event);
    });
}



let shade;

function crayon(event) { 
    event.target.style.backgroundColor = shade;
}

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        clean();
        shade = button.id;
    });
});

const clear = document.querySelector('#clear')
clear.addEventListener('click', clean)

function clean() 
{
    const pixels = document.querySelectorAll('.pix')
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white'});
        shade = 'red';
}

const downloadBtn = document.querySelector('#download');
downloadBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const pixelSize = containerRect.width / container.children.length;

    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    const ctx = canvas.getContext('2d');

    Array.from(container.children).forEach((row, rowIndex) => {
        Array.from(row.children).forEach((pixel, colIndex) => {
            const { backgroundColor } = pixel.style;
            const x = colIndex * pixelSize;
            const y = rowIndex * pixelSize;

            ctx.fillStyle = backgroundColor;
            ctx.fillRect(x, y, pixelSize, pixelSize);
        });
    });

    canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mon_dessin.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
});
