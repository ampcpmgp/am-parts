export default {
  init () {
    Object.assign(this, {
      image: new window.Image(),
      context: null,
      isDraggable: false,
      baseX: 0,
      baseY: 0,
      currentX: 0,
      currentY: 0
    })

    this.on('update', () => {
      this.image.src = this.opts.image
    })

    this.on('mount', () => {
      this.context = this.refs.canvas.getContext('2d')

      this.image.onload = () => {
        this.refs.canvas.width = this.image.width
        this.refs.canvas.height = this.image.height
        this.context.drawImage(this.image, 0, 0)
      }
      this.image.src = this.opts.image
    })
  },

  getRectangleStyle () {
    const left = this.baseX < this.currentX ? this.baseX : this.currentX
    const top = this.baseY < this.currentY ? this.baseY : this.currentY
    const width = Math.abs(this.baseX - this.currentX)
    const height = Math.abs(this.baseY - this.currentY)

    return `
      left: ${left * 100}%;
      top: ${top * 100}%;
      width: ${width * 100}%;
      height: ${height * 100}%;
    `
  },

  // chrome 66 では正しく表示されないため、 `this.getRectangleStyle` を利用する。
  getClipPath () {
    return `clip-path: polygon(
      ${this.baseX * 100}% ${this.baseY * 100}%,
      ${this.currentX * 100}% ${this.baseY * 100}%,
      ${this.currentX * 100}% ${this.currentY * 100}%,
      ${this.baseX * 100}% ${this.currentY * 100}%
    )`
  },

  startRectangleSelection (e) {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.isDraggable = true
    this.baseX = this.currentX = x / this.refs.canvas.offsetWidth
    this.baseY = this.currentY = y / this.refs.canvas.offsetHeight
  },

  stopRectangleSelection (e) {
    this.isDraggable = false
    const baseXPixel = this.baseX * this.refs.canvas.width
    const baseYPixel = this.baseY * this.refs.canvas.height
    const currentXPixel = this.currentX * this.refs.canvas.width
    const currentYPixel = this.currentY * this.refs.canvas.height
    const x = baseXPixel < currentXPixel ? baseXPixel : currentXPixel
    const y = baseYPixel < currentYPixel ? baseYPixel : currentYPixel
    const width = Math.abs(baseXPixel - currentXPixel)
    const height = Math.abs(baseYPixel - currentYPixel)

    if (width && height) {
      const imageData = this.context.getImageData(x, y, width, height)

      this.opts.callback(imageData)
    }
  },

  moveRectanglePoint (e) {
    if (!this.isDraggable) return

    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.currentX = x / this.refs.canvas.offsetWidth
    this.currentY = y / this.refs.canvas.offsetHeight
  }
}
