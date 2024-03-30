/* eslint-disable camelcase */
/* eslint-disable no-void */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable no-var */
// eslint-disable-next-line no-unused-vars

// 定义一个加载脚本的函数
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // 创建一个 <script> 元素
    const script = document.createElement('script');
    // 设置要加载的 JavaScript 文件的 URL
    script.src = src;
    // 监听加载完成事件
    script.onload = () => resolve();
    // 监听加载失败事件
    script.onerror = (error) => reject(error);
    // 将 <script> 元素添加到文档的 <head> 元素中，开始加载外部 JavaScript 文件
    document.head.appendChild(script);
  });
}

// 定义要加载的 JavaScript 文件列表
const scripts = [
  "/js/jquery.min.js",
  "/js/bootstrap.min.js",
  "/js/live2dcubismcore.min.js",
  "/js/pixi.min.js",
  "/js/live2dcubismframework.js",
  "/js/live2dcubismpixi.js",
  "/js/charData.js",
  "/js/l2d.js"
];

// 依次加载多个 JavaScript 文件
Promise.all([
  loadScript('/js/bootstrap.min.js')
      .then(() => loadScript('/js/live2dcubismcore.min.js'))
      .then(() => loadScript('/js/pixi.min.js'))
      .then(() => loadScript('/js/live2dcubismframework.js'))
      .then(() => loadScript('/js/live2dcubismpixi.js'))
      .then(() => loadScript('/js/charData.js'))
      .then(() => loadScript('/js/l2d.js'))
      .catch(error => console.error('Failed to load script:', error))
])
  .then(() => {
    // 所有文件加载完成后执行的操作
    console.log('All scripts loaded successfully');
    var v
    v = new Viewer('/model')
  })
  .catch(error => {
    // 加载过程中出现错误时执行的操作
    console.error('Failed to load scripts:', error);
  });

// var v
// v.l2d.models
// eslint-disable-next-line no-undef
// $(document).ready(() => {
//   v = new Viewer('/model')
// })

class Viewer {
  constructor(basePath) {
    this.l2d = new L2D(basePath)

    this.canvas = $('.Canvas')
    this.selectCharacter = $('.selectCharacter')
    this.selectAnimation = $('.selectAnimation')

    // let stringCharacter = '<option>Select</option>'
    // for (const val in charData) {
    //   stringCharacter +=
    //     '<option value="' + charData[val] + '">' + val + '</option>'
    // }
    // this.selectCharacter.html(stringCharacter)
    // this.selectCharacter.change(event => {
    //   if (event.target.selectedIndex == 0) {
    //     return
    //   }
    //   // const name = event.target.value
    //   // const name = 'Azue Lane(JP)/dafeng_2'
    //   // this.l2d.load(name, this)
    // })

    const name = 'Azue Lane(JP)/dafeng_2'
    // 计算缩放比例
    const scale = 0.4;

    this.l2d.load(name, this)

    this.app = new PIXI.Application(1280, 720, { transparent: true })
    const width = window.innerWidth 
    const height = (width / 16.0) * 9.0
    this.app.view.style.width = width + 'px'
    this.app.view.style.height = height + 'px'
    this.app.renderer.resize(width, height)
    this.canvas.html(this.app.view)

    this.app.ticker.add(deltaTime => {
      if (!this.model) {
        return
      }

      this.model.update(deltaTime)
      this.model.masks.update(this.app.renderer)
    })
    window.onresize = event => {
      if (event === void 0) {
        event = null
      }
      const width = window.innerWidth
      const height = (width / 16.0) * 9.0
      const parent = this.app.view.parentNode
      if (width <= 400) {
        if (this.app && parent) {
          parent.removeChild(this.app.view)
        }
      } else {
        if (!this.app.view.parentNode) {
          this.canvas.html(this.app.view)
        }
        this.app.view.style.width = width + 'px'
        this.app.view.style.height = height + 'px'
        this.app.renderer.resize(width, height)

        if (this.model) {
          this.model.position = new PIXI.Point(width * 0.2, height * 0.7)
          this.model.scale = new PIXI.Point(
            this.model.position.x * 0.06,
            this.model.position.x * 0.06
          )
          this.model.masks.resize(this.app.view.width, this.app.view.height)
        }
      }
    }
    this.isClick = false
    this.app.view.addEventListener('mousedown', event => {
      this.isClick = true
    })
    this.app.view.addEventListener('mousemove', event => {
      if (this.isClick) {
        this.isClick = false
        if (this.model) {
          this.model.inDrag = true
        }
      }

      if (this.model) {
        const mouse_x = this.model.position.x - event.offsetX
        const mouse_y = this.model.position.y - event.offsetY
        this.model.pointerX = -mouse_x / this.app.view.height
        this.model.pointerY = -mouse_y / this.app.view.width
      }
    })
    this.app.view.addEventListener('mouseup', event => {
      if (!this.model) {
        return
      }

      if (this.isClick) {
        if (this.isHit('TouchHead', event.offsetX, event.offsetY)) {
          this.startAnimation('touch_head', 'base')
        } else if (this.isHit('TouchSpecial', event.offsetX, event.offsetY)) {
          this.startAnimation('touch_special', 'base')
        } else {
          const bodyMotions = ['touch_body', 'main_1', 'main_2', 'main_3']
          const currentMotion =
            bodyMotions[Math.floor(Math.random() * bodyMotions.length)]
          this.startAnimation(currentMotion, 'base')
        }
      }

      this.isClick = false
      this.model.inDrag = false
    })
  }

  changeCanvas(model) {
    this.app.stage.removeChildren()

    this.selectAnimation.empty()
    model.motions.forEach((value, key) => {
      if (key != 'effect') {
        const btn = document.createElement('button')
        const label = document.createTextNode(key)
        btn.appendChild(label)
        btn.className = 'btn btn-secondary'
        btn.addEventListener('click', () => {
          this.startAnimation(key, 'base')
        })
        this.selectAnimation.append(btn)
      }
    })

    this.model = model
    this.model.update = this.onUpdate // HACK: use hacked update fn for drag support
    this.model.animator.addLayer(
      'base',
      LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE,
      1
    )

    this.app.stage.addChild(this.model)
    this.app.stage.addChild(this.model.masks)

    window.onresize()
  }

  onUpdate(delta) {
    const deltaTime = 0.016 * delta

    if (!this.animator.isPlaying) {
      const m = this.motions.get('idle')
      this.animator.getLayer('base').play(m)
    }
    this._animator.updateAndEvaluate(deltaTime)

    if (this.inDrag) {
      this.addParameterValueById('ParamAngleX', this.pointerX * 30)
      this.addParameterValueById('ParamAngleY', -this.pointerY * 30)
      this.addParameterValueById('ParamBodyAngleX', this.pointerX * 10)
      this.addParameterValueById('ParamBodyAngleY', -this.pointerY * 10)
      this.addParameterValueById('ParamEyeBallX', this.pointerX)
      this.addParameterValueById('ParamEyeBallY', -this.pointerY)
    }

    if (this._physicsRig) {
      this._physicsRig.updateAndEvaluate(deltaTime)
    }

    this._coreModel.update()

    let sort = false
    for (let m = 0; m < this._meshes.length; ++m) {
      this._meshes[m].alpha = this._coreModel.drawables.opacities[m]
      this._meshes[m].visible = Live2DCubismCore.Utils.hasIsVisibleBit(
        this._coreModel.drawables.dynamicFlags[m]
      )
      if (
        Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(
          this._coreModel.drawables.dynamicFlags[m]
        )
      ) {
        this._meshes[m].vertices = this._coreModel.drawables.vertexPositions[m]
        this._meshes[m].dirtyVertex = true
      }
      if (
        Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(
          this._coreModel.drawables.dynamicFlags[m]
        )
      ) {
        sort = true
      }
    }

    if (sort) {
      this.children.sort((a, b) => {
        const aIndex = this._meshes.indexOf(a)
        const bIndex = this._meshes.indexOf(b)
        const aRenderOrder = this._coreModel.drawables.renderOrders[aIndex]
        const bRenderOrder = this._coreModel.drawables.renderOrders[bIndex]

        return aRenderOrder - bRenderOrder
      })
    }

    this._coreModel.drawables.resetDynamicFlags()
  }

  startAnimation(motionId, layerId) {
    if (!this.model) {
      return
    }

    const m = this.model.motions.get(motionId)
    if (!m) {
      return
    }

    const l = this.model.animator.getLayer(layerId)
    if (!l) {
      return
    }

    l.play(m)
  }

  isHit(id, posX, posY) {
    if (!this.model) {
      return false
    }

    const m = this.model.getModelMeshById(id)
    if (!m) {
      return false
    }

    const vertexOffset = 0
    const vertexStep = 2
    const vertices = m.vertices

    let left = vertices[0]
    let right = vertices[0]
    let top = vertices[1]
    let bottom = vertices[1]

    for (let i = 1; i < 4; ++i) {
      const x = vertices[vertexOffset + i * vertexStep]
      const y = vertices[vertexOffset + i * vertexStep + 1]

      if (x < left) {
        left = x
      }
      if (x > right) {
        right = x
      }
      if (y < top) {
        top = y
      }
      if (y > bottom) {
        bottom = y
      }
    }

    const mouse_x = m.worldTransform.tx - posX
    const mouse_y = m.worldTransform.ty - posY
    const tx = -mouse_x / m.worldTransform.a
    const ty = -mouse_y / m.worldTransform.d

    return left <= tx && tx <= right && top <= ty && ty <= bottom
  }
}
