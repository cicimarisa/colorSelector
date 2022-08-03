
let colors = []
const selectColor = document.getElementById("select-color")
const selectMode = document.getElementById("select-mode")

function render() {
    let colorsHtml = colors.map((color) => {
        return `<div class="color-panel d-flex" style="background:${color}" aria-label="Hex Color display of ${color}">
                    <p class="color-val">${color}</p>
                </div>`
    }).join("")


    document.getElementById("colors").innerHTML = colorsHtml

    const copiedHtml = document.getElementsByClassName("color-panel")
    const copiedHex = document.getElementsByClassName("color-val")

    for (let i = 0; i < copiedHtml.length; i++){
        copiedHtml[i].addEventListener('click', function (event) {
            event.preventDefault()
            navigator.clipboard.writeText(copiedHex[i].textContent).then(function() {
                alert(`${copiedHex[i].textContent} Copied`)
              }, function() {
                alert(`Unsuccessful`)
              });
        });
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