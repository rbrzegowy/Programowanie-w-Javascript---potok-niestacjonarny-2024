document.addEventListener('DOMContentLoaded', appStart)

let camera, video
let ctx, canvas

let colorsFormPicker = { r: 0, g: 0, b: 0 }
let filterStrength

async function appStart() {
    watchColorPicker()
    watchFilterStrength()

    await startCanvas()
    animate()
}
function startCanvas() {
    video = document.querySelector('#player');
    canvas = document.querySelector('#magicCanvas')
    ctx = canvas.getContext('2d', { willReadFrequently: true })
    btnPhoto = document.querySelector('#btnPhoto')
    btnPhoto.addEventListener('click', () => {
        const photo = document.querySelector('#photo')
        const photoLink = document.querySelector('#photoLink')
        const image = canvas.toDataURL('image/jpeg')
        photo.src = image
        photoLink.href = image
    })

    return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(mediaStream => {
            return new Promise((res) => {
                video.srcObject = mediaStream
                video.addEventListener('loadedmetadata', () => {
                    video.play()
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    res()
                })
            })

        })
}

function animate() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    ctx.drawImage(video, 0, 0, width, height)
    let pixels = ctx.getImageData(0, 0, width, height)
    // pixels = blueBox(pixels)
    // pixels = brigtness(pixels)
    // pixels = bw(pixels)
    pixels = contrast(pixels)
    // pixels = blur(pixels)

    ctx.putImageData(pixels, 0, 0)
    requestAnimationFrame(animate)
}

// po jasności, nie kolorze!
function blueBox(pixels) {

    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i]
        const g = pixels.data[i + 1]
        const b = pixels.data[i + 2]

        const absDiff = Math.abs(r - colorsFormPicker.r) + Math.abs(g - colorsFormPicker.g) + Math.abs(b - colorsFormPicker.b)
        if (absDiff <= filterStrength) {
            // alpha = 0
            pixels.data[i + 3] = 0
        }
    }

    return pixels
}
function blur(pixels) {

    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i]
        const g = pixels.data[i + 1]
        const b = pixels.data[i + 2]

        const r2 = pixels.data[i + 4]
        const g2 = pixels.data[i + 5]
        const b2 = pixels.data[i + 6]

        const r3 = pixels.data[i + 8]
        const g3 = pixels.data[i + 9]
        const b3 = pixels.data[i + 10]

        const avgRed = (r + r2 + r3) / 3
        const avgGreen = (g + g2 + g3) / 3
        const avgBlue = (b + b2 + b3) / 3

        for (let radius = 0; radius <= filterStrength / 10; radius += 4) {
            pixels.data[i + radius] = avgRed   // R
            pixels.data[i + 1 + radius] = avgGreen // G
            pixels.data[i + 2 + radius] = avgBlue  // B
        }
    }

    return pixels
}
function contrast(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i]
        const g = pixels.data[i + 1]
        const b = pixels.data[i + 2]
        const avg = (r + g + b) / 3

        if (avg >= 127) {
            pixels.data[i] += filterStrength // R
            pixels.data[i + 1] += filterStrength // G
            pixels.data[i + 2] += filterStrength // B
        } else {
            pixels.data[i] -= filterStrength // R
            pixels.data[i + 1] -= filterStrength // G
            pixels.data[i + 2] -= filterStrength // B
        }
    }

    return pixels
}
function bw(pixels) {

    for (let i = 0; i < pixels.data.length; i += 4) {
        const r = pixels.data[i]
        const g = pixels.data[i + 1]
        const b = pixels.data[i + 2]
        const avg = (r + g + b) / 3
        pixels.data[i] = avg  // R
        pixels.data[i + 1] = avg  // G
        pixels.data[i + 2] = avg  // B
    }

    return pixels
}
function brigtness(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] += filterStrength - 50 // R
        pixels.data[i + 1] += filterStrength - 50 // G
        pixels.data[i + 2] += filterStrength - 50 // B
    }

    return pixels
}
function watchColorPicker() {
    document.querySelector('#color-picker').addEventListener('input', (event) => {
        const hex = event.target.value
        colorsFormPicker = convertHexToRGB(hex)
    })
}
function watchFilterStrength() {
    const filterStrengthSlider = document.querySelector('#filter-strength')

    filterStrength = +filterStrengthSlider.value

    filterStrengthSlider.addEventListener('input', (event) => {
        filterStrength = +event.target.value
    })
}
function convertHexToRGB(hex) {
    const rHex = hex.substring(1, 3)
    const gHex = hex.substring(3, 5)
    const bHex = hex.substring(5, 7)

    const r = parseInt(rHex, 16)
    const g = parseInt(gHex, 16)
    const b = parseInt(bHex, 16)

    return {
        r, g, b
    }
}
