import { applyFilters } from "./webworker-camera-filters.js"
addEventListener('message', (e) => {
    const data = applyFilters(e.data)
    self.postMessage(data, [data.data.buffer])
})
