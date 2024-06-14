export function applyFilters(imgData) {
  bw(imgData)
  contrast(imgData)
  blur(imgData)
  bw(imgData)
  contrast(imgData)
  blur(imgData)
  bw(imgData)
  contrast(imgData)
  blur(imgData)
  bw(imgData)
  contrast(imgData)
  blur(imgData)
  return imgData
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
function contrast(pixels, filterStrength = 10) {
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
function blur(pixels, filterStrength = 10) {

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