<parts-header>
  <span onclick="{opts.handleMenuClick}">menu</span>
  <span>
    {opts.clickCount} / typeof -> {typeof opts.clickCount}
  </span>

  <style type="less">
    :scope {
      display: flex;
      flex-direction: column;
      width: 100%;
      color: white;
      background-color: #555;
    }
  </style>
</parts-header>
