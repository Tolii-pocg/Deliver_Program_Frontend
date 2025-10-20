<template>
  <view class="buy-info-container">
    <!-- 返回按钮，定位在胶囊位置 -->
    <view
      class="back-button"
      :style="{ top: capsuleTop + 'px', left: capsuleLeft + 'px' }"
      @click="goBack"
    >
      <image
        class="back-icon"
        src="/static/back-exit.png"
        mode="aspectFit"
      ></image>
    </view>

    <view class="Tips">
      <!-- 这里可以放置购买信息表单内容 -->
       <view class="Prompt-box">
        填信息→ 付跑腿费→ 收货→ 付商品费
      </view>
    </view>
    <view class="content">
      <view class="custom-tips">
        <view class="notice-wrapper">
          <image class="warn-icon" src="/static/warn.png" mode="aspectFit"></image>
          <view class="notice-content">
            <view 
              class="notice-list"
              :style="{ transform: `translateY(${-currentIndex * 36}rpx)`, transition: 'transform 0.3s ease' }"
            >
              <view class="notice-item" v-for="(item, index) in notices" :key="index">
                {{ item }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup name="BuyInfo">
import { ref, onMounted, onUnmounted } from "vue";

// 定义胶囊位置相关变量
const capsuleTop = ref<number>(0);
const capsuleLeft = ref<number>(0);
const currentIndex = ref<number>(0);
const notices = ref<string[]>([
  "禁止购买处方药及医疗器械",
  "请勿与骑手线下交易,谨防风险",
  "如有特殊要求，请在备注中详细说明"
]);

let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  const menuInfo = uni.getMenuButtonBoundingClientRect();
  const systemInfo = uni.getSystemInfoSync();
  if (
    menuInfo &&
    typeof menuInfo.top === "number" &&
    typeof menuInfo.left === "number" &&
    menuInfo.width &&
    systemInfo &&
    typeof systemInfo.windowWidth === "number"
  ) {
    capsuleTop.value = menuInfo.top;
    capsuleLeft.value = systemInfo.windowWidth - menuInfo.left - menuInfo.width;
  }
  
  // 启动公告轮播定时器
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % notices.value.length;
  }, 2000);
});

const goBack = (): void => {
  uni.navigateBack({
    delta: 1,
  });
};

// 组件销毁时清除定时器
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
.buy-info-container {
  min-height: 100vh;
  background: linear-gradient(to top, #fff 60%, rgb(139, 201, 245) 100%);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.back-button {
  position: absolute;
  z-index: 999;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.back-icon {
  width: 24px;
  height: 24px;
}

.Tips {
  padding: 20px;
  display: flex;
  justify-content: center;
}
.Prompt-box{
  margin-top: 150rpx;
  width: 700rpx;
  height: 100rpx;
  background-color: #f5f5f5;
  color: #777777;
  border-radius: 20rpx;
  text-align: center;
  line-height: 100rpx;
}
.content{
  width: 700rpx;
  height: 500rpx;
  background-color: pink;
  border-radius: 10rpx;
}

.custom-tips {
  width: 100%;
  height: auto;
  background-color: #FFE5B8;
  padding: 10rpx 0;
  border-radius: 10rpx;
}

.notice-wrapper {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
}

.warn-icon {
  width: 24rpx;
  height: 24rpx;
  margin-right: 10rpx;
}

.notice-content {
  flex: 1;
  height: 36rpx;
  overflow: hidden;
  position: relative;
}

.notice-list {
  transform: translateY(0);
}

.notice-item {
  height: 36rpx;
  line-height: 36rpx;
  font-size: 24rpx;
  color: #FFB22E;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
