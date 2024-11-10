let selectedElement = null;
const imageMap = new Map();  // 用于存储图片文件名和数据

function addElement(tagName) {
    const canvas = document.getElementById('canvas');
    const newElement = document.createElement(tagName);
    newElement.style.position = 'absolute';
    newElement.style.left = '50px';
    newElement.style.top = '50px';
    newElement.style.width = '100px';
    newElement.style.height = '100px';
    newElement.style.border = '1px solid black';
    newElement.style.backgroundColor = '#fff';
    newElement.style.color = '#000';
    newElement.style.fontSize = '16px';
    newElement.style.borderRadius = '0px';
    newElement.style.borderColor = '#000';
    newElement.style.borderWidth = '1px';
    newElement.style.opacity = '1';
    if (tagName === 'img') {
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/100';  // 默认占位符
        img.style.width = '100px';
        img.style.height = 'auto';
        newElement.appendChild(img);
    } else if (tagName === 'button') {
        newElement.textContent = '按鈕';
    } else if (tagName === 'a') {
        newElement.textContent = '鏈接';
        newElement.href = '#';
    } else {
        newElement.textContent = tagName;
    }
    canvas.appendChild(newElement);
}

function selectElement(event) {
    if (event.target !== event.currentTarget) {
        selectedElement = event.target;
        updatePropertiesPanel();
    }
}

function updatePropertiesPanel() {
    const panel = document.getElementById('propertyPanel');
    if (selectedElement) {
        const { style, tagName, textContent, src } = selectedElement;
        const width = style.width || '100px';
        const height = style.height || '100px';
        const color = style.color || '#000000';
        const backgroundColor = style.backgroundColor || '#ffffff';
        const borderRadius = style.borderRadius || '0px';
        const borderColor = style.borderColor || '#000000';
        const borderWidth = style.borderWidth || '1px';
        const opacity = style.opacity || '1';
        
        // 设置属性面板内容
        panel.innerHTML = `
            <p id="elementType">元素類型：${tagName.toLowerCase()}</p>
            <strong>文字內容：</strong> <input type="text" id="elementText" value="${textContent || ''}" oninput="updateElementText()"><br>
            <strong>左邊距：</strong> <input type="range" id="elementLeft" min="0" max="1000" value="${parseInt(style.left || '0px')}" oninput="updateElementPosition()"> px<br>
            <strong>上邊距：</strong> <input type="range" id="elementTop" min="0" max="1000" value="${parseInt(style.top || '0px')}" oninput="updateElementPosition()"> px<br>
            <strong>寬度：</strong> <input type="range" id="elementWidth" min="0" max="1000" value="${parseInt(width)}" oninput="updateElementWidth()"> px<br>
            <strong>高度：</strong> <input type="range" id="elementHeight" min="0" max="1000" value="${parseInt(height)}" oninput="updateElementHeight()"> px<br>
            <strong>字體大小：</strong> <input type="range" id="elementFontSize" min="8" max="72" value="${parseInt(style.fontSize || '16px')}" oninput="updateElementFontSize()"> px<br>
            <strong>文字顏色：</strong> <input type="color" id="elementColor" value="${color || '#000000'}" oninput="updateElementColor()"><br>
            <strong>背景顏色：</strong> <input type="color" id="elementBackgroundColor" value="${backgroundColor || '#ffffff'}" oninput="updateElementBackgroundColor()"><br>
            <strong>邊框半徑：</strong> <input type="range" id="elementBorderRadius" min="0" max="100" value="${parseInt(borderRadius)}" oninput="updateElementBorderRadius()"> px<br>
            <strong>邊框顏色：</strong> <input type="color" id="elementBorderColor" value="${borderColor || '#000000'}" oninput="updateElementBorderColor()"><br>
            <strong>邊框寬度：</strong> <input type="range" id="elementBorderWidth" min="0" max="20" value="${parseInt(borderWidth)}" oninput="updateElementBorderWidth()"> px<br>
            <strong>透明度：</strong> <input type="range" id="elementOpacity" min="0" max="1" step="0.1" value="${opacity}" oninput="updateElementOpacity()"><br>
            ${selectedElement.tagName === 'IMG' ? `<strong>圖片來源：</strong> <input type="file" id="elementFileInput" accept="image/*" onchange="updateImageSource()">` : ''}
        `;
    } else {
        panel.innerHTML = '<p>選擇一個元素以查看其屬性。</p>';
    }
}

function updateElementText() {
    if (selectedElement) {
        const text = document.getElementById('elementText').value;
        selectedElement.textContent = text;
    }
}



function updateElementPosition() {
    if (selectedElement) {
        const left = document.getElementById('elementLeft').value + 'px';
        const top = document.getElementById('elementTop').value + 'px';
        selectedElement.style.left = left;
        selectedElement.style.top = top;
    }
}

function updateElementWidth() {
    if (selectedElement) {
        const width = document.getElementById('elementWidth').value + 'px';
        selectedElement.style.width = width;
    }
}

function updateElementHeight() {
    if (selectedElement) {
        const height = document.getElementById('elementHeight').value + 'px';
        selectedElement.style.height = height;
    }
}

function updateElementFontSize() {
    if (selectedElement) {
        const fontSize = document.getElementById('elementFontSize').value + 'px';
        selectedElement.style.fontSize = fontSize;
    }
}

function updateElementColor() {
    if (selectedElement) {
        const color = document.getElementById('elementColor').value;
        selectedElement.style.color = color;
    }
}

function updateElementBackgroundColor() {
    if (selectedElement) {
        const backgroundColor = document.getElementById('elementBackgroundColor').value;
        selectedElement.style.backgroundColor = backgroundColor;
    }
}

function updateElementBorderRadius() {
    if (selectedElement) {
        const borderRadius = document.getElementById('elementBorderRadius').value + 'px';
        selectedElement.style.borderRadius = borderRadius;
    }
}

function updateElementBorderColor() {
    if (selectedElement) {
        const borderColor = document.getElementById('elementBorderColor').value;
        selectedElement.style.borderColor = borderColor;
    }
}

function updateElementBorderWidth() {
    if (selectedElement) {
        const borderWidth = document.getElementById('elementBorderWidth').value + 'px';
        selectedElement.style.borderWidth = borderWidth;
    }
}

function updateElementOpacity() {
    if (selectedElement) {
        const opacity = document.getElementById('elementOpacity').value;
        selectedElement.style.opacity = opacity;
    }
}

function updateImageSource() {
    if (selectedElement && selectedElement.tagName === 'IMG') {
        const fileInput = document.getElementById('elementFileInput');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedElement.src = e.target.result;
                const fileName = file.name;
                imageMap.set(fileName, e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
}

function saveChanges() {
    const canvas = document.getElementById('canvas');
    const html = canvas.innerHTML;
    document.getElementById('htmlOutput').value = html;
}

function copyElement() {
    if (selectedElement) {
        const clone = selectedElement.cloneNode(true);
        clone.style.left = (parseInt(selectedElement.style.left) + 10) + 'px';
        clone.style.top = (parseInt(selectedElement.style.top) + 10) + 'px';
        document.getElementById('canvas').appendChild(clone);
    }
}

function deleteElement() {
    if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
        updatePropertiesPanel();
    }
}

function updateContent() {
    const htmlInput = document.getElementById('htmlInput').value;
    document.getElementById('canvas').innerHTML = htmlInput;
    saveChanges();
}

function downloadHtml() {
    const canvas = document.getElementById('canvas');
    const html = `<html><head><title>Download</title></head><body>${canvas.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // 下載圖片
    const images = canvas.getElementsByTagName('img');
    const imagePromises = [];
    for (let img of images) {
        if (img.src) {
            imagePromises.push(fetch(img.src)
                .then(response => response.blob())
                .then(blob => {
                    const imageBlob = new Blob([blob], { type: 'image/png' });
                    const imageUrl = URL.createObjectURL(imageBlob);
                    const a = document.createElement('a');
                    a.href = imageUrl;
                    a.download = img.src.split('/').pop();
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }));
        }
    }
    Promise.all(imagePromises).then(() => {
        URL.revokeObjectURL(url);
    });
}

function showFileInput() {
    document.getElementById('fileInput').click();
}

function addImageFromFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.position = 'absolute';
            img.style.left = '50px';
            img.style.top = '50px';
            img.style.width = '100px';
            img.style.height = 'auto';
            img.style.border = '1px solid black';
            img.style.backgroundColor = '#fff';
            img.style.borderRadius = '0px';
            img.style.opacity = '1';
            document.getElementById('canvas').appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function changeLanguage() {
    // Your language change logic here
}

function updatePageTitle() {
    const title = document.getElementById('pageTitle').value;
    document.getElementById('headerTitle').textContent = title;
}
