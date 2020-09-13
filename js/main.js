{
const originalText = document.getElementById('original_text');
const invertBtn = document.getElementById('invert_btn');
const reverseBtn = document.getElementById('reverse_btn');
const downloadBtn = document.getElementById('download');
const translatedImg = document.getElementById('translated_img');
const fontWidth = 9;
const fontHeight = 18;
const fontCount = 26;
const maxWidth = 252;


// 空白スペース,改行の処理をする
const getLen = (str) => {
    var result = 0;
    for(var i=0;i<str.length;i++){
      var chr = str.charCodeAt(i);
      if((chr >= 0x00 && chr < 0x81) ||
         (chr === 0xf8f0) ||
         (chr >= 0xff61 && chr < 0xffa0) ||
         (chr >= 0xf8f1 && chr < 0xf8f4) ){
        //半角文字の場合は1を加算
        result += 1;
      }else{
        //それ以外の文字の場合は2を加算
        result += 2;
      }
    }
    //結果を返す
    return result;
}

const createImg = async (e) => {
    e.preventDefault();
    const textValue = originalText.value;
    const textLen = getLen(textValue);
    const textWidth = (fontCount < textLen) ? maxWidth : (textLen * fontWidth);
    const textHeight = fontHeight * Math.ceil(textLen / fontCount);

    const copyText = document.createElement('div');
    copyText.style.width = textWidth + 'px';
    copyText.style.height = textHeight + 'px';
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
