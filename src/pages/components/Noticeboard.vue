<template>
    <view class="notice-content">
        <uni-notice-bar
            :text="text || noticeText"
            single
            scrollable
            showIcon
            background-color="#E6EFFF"
            color="#2979FF"
            class="custom-notice-bar"
        />
    </view>
</template>

<script lang="ts" setup name="Noticeboard">
import { ref, onMounted } from 'vue'

interface Props {
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  text: ''
})

const noticeText = ref('WeTake仍未上线,陶还需努力,fighting!!!fighting!!!fighting!!!')

// 动态计算底部偏移量
const bottomOffset = ref(110)

onMounted(() => {
    // 使用新的API替代废弃的getSystemInfoSync
    const windowInfo = uni.getWindowInfo()
    const safeArea = windowInfo.safeArea || {}
    if (typeof windowInfo.windowHeight === 'number' && typeof safeArea.bottom === 'number') {
        bottomOffset.value = Math.min(windowInfo.windowHeight - safeArea.bottom, 110)
    } else {
        bottomOffset.value = 110
    }
})
</script>

<style scoped>
.notice-content {
    position: fixed;
    bottom: 20rpx; /* 简化定位，使用固定值 */
    left: 20rpx;
    right: 20rpx;
    z-index: 999;
}
</style>