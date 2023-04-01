'use strict'

const body = document.querySelector('body')
const colorPicker = document.querySelector('#colorPicker')
const colorHEX = document.querySelector('#colorHEX')
const red = document.querySelector('#red')
const green = document.querySelector('#green')
const blue = document.querySelector('#blue')
const hue = document.querySelector('#hue')
const saturation = document.querySelector('#saturation')
const lightness = document.querySelector('#lightness')

const botones = document.querySelector('#botones')
const saveColor = document.querySelector('#saveColor')
const template = document.querySelector('#template').content
const fragment = document.createDocumentFragment()

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

let coloresGuardados = []

document.addEventListener('DOMContentLoaded', (e) => {
  if(localStorage.getItem('colores')) {
      coloresGuardados = JSON.parse(localStorage.getItem('colores'))
  }
  mostrarGuardados()
})

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
    navigator.clipboard.writeText(colorPicker.value)
  })
  saveColor.addEventListener('click', (e) => {
    toastBootstrap.show()
    navigator.clipboard.writeText(e.target.textContent)
    
  })
}

colorPicker.addEventListener('input', () => {
    setColor()
})

botones.addEventListener('click', (e) => {
  boton(e)
})

const boton = e => {
  if (e.target.classList.contains('btn-danger')) {
    coloresGuardados = []
    saveColor.innerHTML = ""
    localStorage.clear()
  }
  if (coloresGuardados.includes(colorHEX.value)) {
    return
  }
  if (e.target.classList.contains('btn-success')) {
    coloresGuardados.push(colorHEX.value)
    localStorage.setItem('colores', JSON.stringify(coloresGuardados)) 
    mostrarGuardados()
  }
  e.stopPropagation()
}

const mostrarGuardados = () => {
  saveColor.innerHTML = ""
  coloresGuardados.forEach(color => {
    const clone = template.cloneNode(true)
    clone.querySelector('.card-text').textContent = color
    clone.querySelector('.card-body').style.backgroundColor = color
    fragment.appendChild(clone)
  })  
  saveColor.appendChild(fragment)
}

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
      
          let cmin = Math.min(r,g,b),
          cmax = Math.max(r,g,b),
          delta = cmax - cmin,
          h = 0,
          s = 0,
          l = 0;
    
      // Calculate hue
      // No difference
      if (delta == 0)
        h = 0;
      // Red is max
      else if (cmax == r)
        h = ((g - b) / delta) % 6;
      // Green is max
      else if (cmax == g)
        h = (b - r) / delta + 2;
      // Blue is max
      else
        h = (r - g) / delta + 4;
    
      h = Math.round(h * 60);
        
      // Make negative hues positive behind 360°
      if (h < 0)
          h += 360;
    
      // Calculate lightness
      l = (cmax + cmin) / 2;
    
      // Calculate saturation
      s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        
      // Multiply l and s by 10
          s = Math.round(s * 100);
          l = Math.round(l * 100);

          return [h, s, l];

      }
      
      const [h, s, l] = rgbToHsl(aRgb[0],aRgb[1],aRgb[2])

      hue.value = [h, s, l][0]
      saturation.value = [h, s, l][1] + "%"
      lightness.value = [h, s, l][2] + "%"

}

