<am-parts-image-clipper>
  <section class="{
    wrapper: true,
    fit: opts.fit
  }">
    <div
      class="rectangle"
      style="{getRectangleStyle()}"
    >
    </div>

    <canvas
      ref="canvas"
      class="{fit: opts.fit}"
      onmousedown="{startRectangleSelection}"
      onmousemove="{moveRectanglePoint}"
      onmouseleave="{stopRectangleSelection}"
      onmouseup="{stopRectangleSelection}"
    >
  </section>

  <style type="less">
    > .wrapper {
      position: relative;
      line-height: 0;
      display: inline-block;

      &.fit {
        width: 100%;
      }

      > .rectangle {
        position: absolute;
        width: 100%;
        height: 100%;
        pointer-events: none;
        background-color: rgba(255, 0, 0, 0.2);
      }

      > canvas {
        max-width: 100%;

        &.fit {
          width: 100%;
        }
      }
    }
  </style>

  <script>
    import Mixin from './mixin.js'
    this.mixin(Mixin)
  </script>
</am-parts-image-clipper>
