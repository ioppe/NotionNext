/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useEffect } from 'react'
import { createView } from '@/public/js/main'
/**
 * 网页动画
 * @returns
 */
export default function Live2D(props) {
  useEffect(() => {
    const data = props.data

    // 创建live2D
    createView(data)
  }, [])

  return (
    <div>
      <div
        className='form-group bg-dark'
        style={{
        position: 'fixed',
        left: 0,
        bottom: 0
      }}>
        <select className='selectCharacter form-control bg-dark text-white'></select>
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
