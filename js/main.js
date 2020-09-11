{
const originalText = document.getElementById('original_text');
const generatorBtn = document.getElementById('generator_btn');
const translatedImg = document.getElementById('translated_img');
const createImg = async () => {
    const canvas = await html2canvas(originalText);
    const imageData = canvas.toDataURL();
    translatedImg.setAttribute('src', imageData);
};

generatorBtn.addEventListener('click', createImg);
    
}
