/* eslint-disable no-undef */
import { useEffect } from 'react'
/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  useEffect(() => {
    // 加载第一个 JavaScript 文件
    const script1 = document.createElement('script')
    script1.src = '@/lib/js/jquery.min.js'
    script1.async = true
    document.body.appendChild(script1)
    // 加载第二个 JavaScript 文件
    const script2 = document.createElement('script')
    script2.src = '@/lib/js/bootstrap.min.js'
    script2.async = true
    document.body.appendChild(script2)

    // 加载第三个 JavaScript 文件
    const script3 = document.createElement('script')
    script3.src = '@/lib/js/live2dcubismcore.min.js'
    script3.async = true
    document.body.appendChild(script3)

    // 加载第三个 JavaScript 文件
    const script4 = document.createElement('script')
    script4.src = '@/lib/js/pixi.min.js'
    script4.async = true
    document.body.appendChild(script4)

    // 加载第三个 JavaScript 文件
    const script5 = document.createElement('script')
    script5.src = '@/lib/js/live2dcubismframework.js'
    script5.async = true
    document.body.appendChild(script5)

    // 加载第三个 JavaScript 文件
    const script6 = document.createElement('script')
    script6.src = '@/lib/js/live2dcubismpixi.js'
    script6.async = true
    document.body.appendChild(script6)

    // 加载第三个 JavaScript 文件
    const script7 = document.createElement('script')
    script7.src = '@/lib/js/charData.js'
    script7.async = true
    document.body.appendChild(script7)

    // 加载第三个 JavaScript 文件
    const script8 = document.createElement('script')
    script8.src = '@/lib/js/l2d.js'
    script8.async = true
    document.body.appendChild(script8)

    // 加载第三个 JavaScript 文件
    const script9 = document.createElement('script')
    script9.src = '@/lib/js/main.js'
    script9.async = true
    document.body.appendChild(script9)

    // 清理函数，在组件卸载时移除脚本
    return () => {
      document.body.removeChild(script1)
      document.body.removeChild(script2)
      document.body.removeChild(script3)
      document.body.removeChild(script4)
      document.body.removeChild(script5)
      document.body.removeChild(script6)
      document.body.removeChild(script7)
      document.body.removeChild(script8)
      document.body.removeChild(script9)
    }
  }, [])

  return (
    <div>
      <div className='container'>
        <div className='form-group'>
          <select className='selectCharacter form-control'></select>
        </div>
        <div
          className='selectAnimation btn-group'
          role='group'
          aria-label='Animation'
          style={{ display: 'flex', flexWrap: 'wrap' }}></div>
      </div>
      <div className='Canvas left'></div>
    </div>
  )
}
