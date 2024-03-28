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
      .then(() => loadScript('/js/pixi.min.js'))
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
    <div
      style={{
        position: 'relative',
        maxHeight: '30vh',
        maxWidth: '30vh',
        border: '3px solid red'
      }}>
      <div
        className='form-group'
        style={{
          position: 'fixed', // 使用定位属性固定在页面左下角
          left: 0,
          border: '3px solid blue'
        }}>
        <select className='selectCharacter form-control'></select>
      </div>
      {/* <div
        className='selectAnimation btn-group'
        role='group'
        aria-label='Animation'
        style={{
          position: 'fixed', // 使用定位属性固定在页面左下角
          left: 0,
          display: 'flex',
          flexWrap: 'wrap',
          border: '3px solid orange'
        }}></div> */}
      <div className='Canvas left'></div>
    </div>
  )
}
