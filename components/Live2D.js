/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect } from 'react'
import { createView } from '@/public/js/main'
/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  useEffect(() => {
    // 创建live2D
    createView()
  }, [])

  return (
    <div>
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
