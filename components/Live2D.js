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
