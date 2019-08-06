const editor = document.getElementById('favicon-badge-editor');
const faviconContainer = document.getElementById('favicon-container')

editor.addEventListener('input', e => {
    faviconContainer.innerHTML = editor.value;
});

editor.innerText = faviconContainer.innerHTML;