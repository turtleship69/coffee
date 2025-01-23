import insertText from 'https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js'

const tooltip = document.querySelector('#emoji-picker')

document.querySelector('#emoji').onclick = () => {
    tooltip.classList.toggle('shown');
    // document.removeEventListener("keydown", event)
}

// document.querySelector("#emoji-background").onclick = () => {
//     tooltip.classList.remove("shown");
// }

// document.addEventListener("keydown", (event) => {
//     if (event.key === "Escape") {
//         tooltip.classList.remove("shown");
//     }
// });

document.querySelector('emoji-picker').addEventListener('emoji-click', e => {
    insertText(document.querySelector('input'), e.detail.unicode)
})