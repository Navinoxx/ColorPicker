const body = document.querySelector('body')
const colorPicker = document.querySelector('#colorPicker')
const colorHEX = document.querySelector('#colorHEX')
const red = document.querySelector('#red')
const green = document.querySelector('#green')
const blue = document.querySelector('#blue')
const hue = document.querySelector('#hue')
const saturation = document.querySelector('#saturation')
const lightness = document.querySelector('#lightness')

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
    navigator.clipboard.writeText(colorPicker.value)
  })
}

colorPicker.addEventListener('input', () => {
    setColor()
})

function setColor() {
    body.style.backgroundColor = colorPicker.value
    colorHEX.value = colorPicker.value

    const numHEX = JSON.stringify(colorPicker.value)
    const sinHEX = numHEX.slice(2, 8)
    const aRgbHex = sinHEX.match(/.{1,2}/g);
    const aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
        ];
        
    red.value = aRgb[0]
    green.value = aRgb[1]
    blue.value = aRgb[2]
    
    function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
        
            let max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
        
            if (max == min) {
            h = 0; 
            } else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d) % 6;
                    break;
                    case g:
                    h = (b - r) / d + 2;
                    break;
                    case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 1.69;
            if (h < 0) h++;
            }
            
            h = Math.round(h * 100);
            s = Math.round(s * 100);
            l = Math.round(l * 100);

            return [h, s, l];

        }
        
        const [h, s, l] = rgbToHsl(aRgb[0],aRgb[1],aRgb[2])

        hue.value = [h, s, l][0]
        saturation.value = [h, s, l][1] + "%"
        lightness.value = [h, s, l][2] + "%"

}

