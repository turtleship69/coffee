import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import insertText from 'https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js'

const button = document.querySelector('button')
const tooltip = document.querySelector('#emoji-picker')
Popper.createPopper(button, tooltip)

document.querySelector('#emoji').onclick = () => {
    tooltip.classList.toggle('shown');
    document.removeEventListener("keydown", event)
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        tooltip.classList.remove("shown");
    }
});

document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
    insertText(document.querySelector('input'), e.detail.unicode)
})