/* eslint-disable no-undef */
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isMobile, loadExternalResource } from '@/lib/utils'
import { useEffect } from 'react'

/**
 * 网页动画
 * @returns
 */
export default function Live2D() {
  const { theme, switchTheme } = useGlobal()
  const showPet = JSON.parse(siteConfig('WIDGET_PET'))
  const petLink = siteConfig('WIDGET_PET_LINK')

  useEffect(() => {
    
    if (showPet && !isMobile()) {
      Promise.all([
        loadExternalResource('@/lib/js/jquery.min.js', 'js'),
        loadExternalResource('@/lib/js/bootstrap.min.js', 'js'),
        loadExternalResource('@/lib/js/live2dcubismcore.min.js', 'js'),
        loadExternalResource('@/lib/js/pixi.min.js', 'js'),
        loadExternalResource('@/lib/js/live2dcubismframework.js', 'js'),
        loadExternalResource('@/lib/js/live2dcubismpixi.js', 'js'),
        loadExternalResource('@/lib/js/charData.js', 'js'),
        loadExternalResource('@/lib/js/l2d.js', 'js'),
      ]).then((e) => {
        if (typeof window?.loadlive2d !== 'undefined') {
          // https://github.com/xiazeyu/live2d-widget-models
          try {
          } catch (error) {
            console.error('读取PET模型', error)
          }
        }
      })
    }
  }, [theme])

  function handleClick() {
    if (JSON.parse(siteConfig('WIDGET_PET_SWITCH_THEME'))) {
      switchTheme()
    }
  }

  if (!showPet) {
    return <></>
  }

  return (
    <div class="container">
        <div class="form-group">
            <select class="selectCharacter form-control"></select>
        </div>
        <div class="selectAnimation btn-group" role="group" aria-label="Animation" style="display: flex; flex-wrap: wrap;"></div>
    </div>
    <!-- Canvas -->
    <div class="Canvas left"></div>

    <script src="@/lib/js/jquery.min.js"></script>
    <script src="@/lib/js/bootstrap.min.js"></script>
    
    <!-- Live2DCubismCore -->
    <script src="@/lib/js/live2dcubismcore.min.js"></script>

    <!-- Include Pixi. -->
    <script src="@/lib/js/pixi.min.js"></script>

    <!-- Include Cubism Components. -->
    <script src="@/lib/js/live2dcubismframework.js"></script>
    <script src="@/lib/js/live2dcubismpixi.js"></script>

    <!-- User's Script -->
    <script src="@/lib/js/charData.js"></script>
    <script src="@/lib/js/l2d.js"></script>
    <script src="@/lib/js/main.js"></script>
  );
}
