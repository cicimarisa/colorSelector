
let colors = []
const selectColor = document.getElementById("select-color")
const selectMode = document.getElementById("select-mode")

function render() {
    let colorsHtml = colors.map((color) => {
        let classBright = (!lightOrDark(color)) ? "light" : ""
        return `<div class="color-panel d-flex" style="background:${color}" aria-label="Hex Color display of ${color}">
                    <p class="color-val ${classBright}">${color.substring(1)}</p>
                </div>`
    }).join("")


    document.getElementById("colors").innerHTML = colorsHtml

    const copiedHtml = document.getElementsByClassName("color-panel")
    const copiedHex = document.getElementsByClassName("color-val")

    for (let i = 0; i < copiedHtml.length; i++) {
        copiedHtml[i].addEventListener('click', function (event) {
            event.preventDefault()
            navigator.clipboard.writeText(copiedHex[i].textContent).then(function () {
                alert(`${copiedHex[i].textContent} Copied`)
            }, function () {
                alert(`Unsuccessful`)
            });
        });
    }
}

function lightOrDark(color) {
    var r, g, b, hsp;

    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(
        color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return true;
    }
    else {
        return false;
    }
}


function getColors(hexColor, colorMode) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexColor}&mode=${colorMode}&count=5`)
        .then(res => res.json())
        .then(data => {
            colors = []
            for (let color of data.colors) {
                colors.push(color.hex.value)
            }
            render()
        })
}

document.getElementById("form-color").addEventListener("submit", function (e) {
    e.preventDefault()
    getColors(selectColor.value.substring(1), selectMode.value)
})

getColors(selectColor.value.substring(1), selectMode.value)