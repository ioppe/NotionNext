/* eslint-disable no-undef */
import { useEffect } from 'react'
/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  useEffect(() => {
    // 动态创建 script 标签并引入外部 JavaScript 文件
    const loadScript = src => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })
    }

    // 引入所需的 JavaScript 文件
    loadScript('/js/jquery.min.js')
      .then(() => loadScript('/js/bootstrap.min.js'))
      .then(() => loadScript('/js/live2dcubismcore.min.js'))
      .then(() => loadScript('/js/live2dcubismframework.js'))
      .then(() => loadScript('/js/live2dcubismpixi.js'))
      .then(() => loadScript('/js/charData.js'))
      .then(() => loadScript('/js/l2d.js'))
      .then(() => loadScript('/js/main.js'))
      .catch(error => console.error('Failed to load script:', error))

    // 清理函数，在组件卸载时移除脚本
    return () => {
      document.querySelectorAll('script').forEach(script => {
        if (script.src.includes('/js/')) {
          document.body.removeChild(script)
        }
      })
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
