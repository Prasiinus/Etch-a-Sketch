const Container = document.querySelector('.container');
const range = document.querySelector('.range');
const inputvalue = document.querySelector('.inputvalue')

const validsize = [8, 16, 32, 64];
const defaultvalue = validsize[range.value];

let shade = 'black';
let pattern;

board(defaultvalue);
inputvalue.textContent = defaultvalue + 'x' + defaultvalue;

range.addEventListener("click", function (e) {
    let size = validsize[this.value];
    inputvalue.textContent = `${size}x${size}`;
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
            pixel.style.backgroundColor = 'white';
            color(pixel);
        }
    }
}

;

function color(pixel) {
    pixel.addEventListener("mousedown", crayon);
    pixel.addEventListener("mouseover", event => {
        if (event.buttons == 1) crayon(event);
    });
}


function crayon(event) {
    if (pattern == 'Rainbow') {
        function mix() {
            return Math.floor(Math.random() * 255);
        }
        let rainbo = 'rgba(' + mix() + ',' + mix() + ',' + mix() + ')'
        event.target.style.opacity = ''
        event.target.style.backgroundColor = rainbo
    } else if (pattern == 'Shadow') {
        let opacity = Number(event.target.style.opacity);

        if (event.target.style.backgroundColor == 'black') {
            opacity += 0.1;
            event.target.style.opacity = opacity;
        }
        else {
            event.target.style.backgroundColor = 'black';
            event.target.style.opacity = 0.1;
        }
    } else if (pattern == 'estompe') {

        let opacity = Number(event.target.style.opacity);
        if (event.target.style.opacity == '') opacity = 1;
        if (opacity >= 0.1) opacity -= 0.1;
        event.target.style.opacity = opacity;
    } else {
        event.target.style.opacity = ''
        event.target.style.backgroundColor = shade
    }
}

const buttons = document.querySelectorAll('.button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        pattern = 'classic'
        shade = button.id;
    });
});

const rainbow = document.querySelector('.rainbow')
rainbow.addEventListener('click', () => {
    pattern = 'Rainbow';
})
const shadow = document.querySelector('.shadow')
shadow.addEventListener('click', () => {
    pattern = 'Shadow'
});

const estompe = document.querySelector('.estompe')
estompe.addEventListener('click', () => {
    pattern = 'estompe'
});


const clear = document.querySelector('#clear')
clear.addEventListener('click', clean)

function clean() {
    const pixels = document.querySelectorAll('.pix')
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white'
        pixel.style.opacity = '';
    });
}


const quadrillage = document.querySelector('#quadri')
quadrillage.addEventListener('click', () => {

    const pixels = document.querySelectorAll('.pix')
    pixels.forEach(pixel => {
        if (pixel.style.border == '0px solid white') {
            pixel.style.border = '0.1px solid rgba(0, 0, 0, 0.563)'
            quadrillage.innerHTML = 'Quadrillage : On'

        }
        else {
            pixel.style.border = '0px solid white';
            quadrillage.innerHTML = 'Quadrillage : Off'

        }
    });

})








const downloadBtn = document.querySelector('#download');
downloadBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    // Ces deux lignes sélectionnent l'élément "container"  et récupèrent sa taille et sa position sur la page.

    const pixelSize = containerRect.width / container.children.length;
    // Cette ligne calcule la taille en pixels de chaque pixel dans la grille en divisant la largeur du
    //  conteneur par le nombre de pixels dans une rangée.

    canvas.width = containerRect.width;
    canvas.height = containerRect.height;
    // Ces deux lignes définissent la largeur et la hauteur du canvas pour qu'elles correspondent à la taille du conteneur.

    const ctx = canvas.getContext('2d');
    // Cette ligne crée un contexte de dessin 2D pour le canvas.

    Array.from(container.children).forEach((row, rowIndex) => {
        Array.from(row.children).forEach((pixel, colIndex) => {

            // Ces deux lignes utilisent la méthode "Array.from" pour convertir les nœuds enfants de "container" en un tableau d'éléments DOM.
            //  Ensuite, deux boucles imbriquées sont utilisées pour parcourir chaque pixel dans la grille.

            const { backgroundColor, opacity } = pixel.style
            // Cette ligne récupère la couleur de fond du pixel en cours de traitement.

            const x = colIndex * pixelSize;
            const y = rowIndex * pixelSize;

            // Ces deux lignes calculent les coordonnées X et Y du pixel en cours de traitement.

            ctx.fillStyle = backgroundColor;
            ctx.globalAlpha = opacity || 1;
            ctx.fillRect(x, y, pixelSize, pixelSize);
            // Ces deux lignes utilisent le contexte de dessin 2D pour dessiner un rectangle rempli avec la couleur de fond du pixel en cours de traitement.
            ctx.globalAlpha = 1;
        });
    });

    canvas.toBlob((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'MyDrawN0.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    });
});

// Cette section convertit le canvas en un objet Blob, qui peut être téléchargé en tant que fichier.
//  Ensuite, un lien de téléchargement est créé et cliqué pour lancer le téléchargement.
//  Enfin, le lien de téléchargement est supprimé et l'URL du Blob est révoquée pour libérer la mémoire.

