<template>
  <view class="buy-info-container">
    <view class="custom-navbar" :style="{ paddingTop: statusBarHeight }">
      <image
        class="back-icon"
        src="@/static/back-exit.png"
        mode="scaleToFill"
        @click="goBack"
      />
      <view class="navbar-title">购买信息</view>
    </view>
    <view class="content" :style="{ paddingTop: contentTop }">
      <!-- 这里放置购买信息表单内容 -->
    </view>
  </view>
</template>

<script lang="ts" setup name="BuyInfo">
import { ref, onMounted } from "vue";

// 定义状态变量
const statusBarHeight = ref("0px");
const contentTop = ref("0px");

onMounted(() => {
  const menuInfo = uni.getStorageSync("menuInfo");
  if (menuInfo) {
    statusBarHeight.value = menuInfo.statusBarHeight || "0px";
    contentTop.value = menuInfo.contentTop || "0px";
  }
});

const goBack = () => {
  uni.navigateBack({
    delta: 1,
  });
};
</script>

<style scoped>
.buy-info-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.custom-navbar {
  display: flex;
  align-items: center;
  justify-content: center; /* 居中对齐 */
  width: 100%;
  height: 44px;
  background: #bedbf8;
  position: fixed;
  top: 0;
  z-index: 999;
  padding-left: 15rpx;
}

.back-icon {
  position: absolute; /* 绝对定位 */
  left: 15rpx; /* 距离左边的距离 */
  width: 40rpx;
  height: 40rpx;
}

.navbar-title {
  font-size: 36rpx;
  font-weight: bold;
  color: #000;
  /* 居中显示，不需要额外的 margin-left */
}

.content {
  /* 内容区域的顶部间距由 JavaScript 动态设置 */
  padding-top: calc(v-bind(contentTop) + 44px); /* 加上导航栏高度 */
}
</style>
