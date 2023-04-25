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



let shade = 'red';



function crayon(event) {

    event.target.style.backgroundColor = shade;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        shade = button.id;
    });
});

const clear = document.querySelector('#clear')
clear.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pix')
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white'
        shade = 'red'
    });
})