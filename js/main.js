{
const originalText = document.getElementById('original_text');
const invertBtn = document.getElementById('invert_btn');
const reverseBtn = document.getElementById('reverse_btn');
const downloadBtn = document.getElementById('download');
const translatedImg = document.getElementById('translated_img');

const createImg = async (e) => {
    e.preventDefault();
    const textValue = originalText.value;
   
    const copyText = document.createElement('div');
    copyText.classList.add('copyTextCss');
    copyText.innerText = textValue;

    if (e.target === invertBtn) {
      copyText.classList.remove('reverseCss');
      copyText.classList.add('mirrorCss');
   } else if(e.target === reverseBtn) {
    copyText.classList.remove('mirrorCss');
  copyText.classList.add('reverseCss');
  }

    document.body.appendChild(copyText);
    window.scrollTo(0, 0);
    const canvas = await html2canvas(copyText, {scale: 3, scrollX: 0, scrollY: -window.scrollY});
    const imageData = canvas.toDataURL();
    translatedImg.setAttribute('src', imageData);
    document.body.removeChild(copyText);
}

const downloadImg = () => {
  downloadBtn.href = translatedImg.src
}

invertBtn.addEventListener('click', createImg);
reverseBtn.addEventListener('click', createImg);
downloadBtn.addEventListener('click', downloadImg);
}
