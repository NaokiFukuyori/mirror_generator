{
const originalText = document.getElementById('original_text');
const generatorBtn = document.getElementById('generator_btn');
const translatedImg = document.getElementById('translated_img');
const fontWidth = 9;
const fontHeight = 18;
const fontCount = 26;
const maxWidth = 234;

const getLen = (str) => {
    var result = 0;
    for(var i=0;i<str.length;i++){
      var chr = str.charCodeAt(i);
      if((chr >= 0x00 && chr < 0x81) ||
         (chr === 0xf8f0) ||
         (chr >= 0xff61 && chr < 0xffa0) ||
         (chr >= 0xf8f1 && chr < 0xf8f4)){
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

const createImg = async () => {
    const textValue = originalText.value;
    const textLen = getLen(textValue);
    const textWidth = (fontCount < textLen) ? maxWidth : (textLen * fontWidth);
    const textHeight = fontHeight * Math.ceil(textLen / fontCount);

    const copyText = document.createElement('div');
    copyText.style.width = textWidth + 'px';
    copyText.style.height = textHeight + 'px';
    copyText.classList.add('copyTextCss');
    copyText.textContent = textValue;
    document.body.appendChild(copyText);

    const canvas = await html2canvas(copyText, {scale: 1});
    const imageData = canvas.toDataURL();
    translatedImg.setAttribute('src', imageData);
}

generatorBtn.addEventListener('click', createImg);
    
}
