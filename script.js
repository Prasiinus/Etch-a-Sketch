const Container = document.querySelector('.container');

let size=16;

for (let i = 0; i < size; i++) {
    const raw = document.createElement('div');
    raw.setAttribute('class','raw');
    Container.appendChild(raw);
    
    for (let i = 0; i < size; i++) {
        const div = document.createElement('div');
        div.setAttribute('class','pix')
        raw.appendChild(div);
    //     div.addEventListener("click", () => {
    //     div.addEventListener("mouseenter", () => {
    //         div.style.backgroundColor = 'red';
    //     });
    // })

    }
}
const boxes = [...document.getElementsByClassName('pix')];
        const makeRed = event => event.target.style.backgroundColor = 'red';
        
        function color(box) {
          box.addEventListener("mousedown", makeRed);
          box.addEventListener("mouseover", event => {
            if (event.buttons == 1) makeRed(event);
          });
        }
boxes.forEach(color);
