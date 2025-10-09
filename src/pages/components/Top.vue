<template>
  <view class="custom-navbar">
    <image
      class="exit-icon"
      src="@/static/back-exit.png"
      mode="scaleToFill"
      @click="handleExit"
    />
    <view class="navbar-title">WeTake</view>
     <view class="slogan">
      <view class="slogan-item">
        <image
          src="@/static/right.png"
          mode="scaleToFill"
        />
        <text>放心送</text>
      </view>
      <view class="slogan-item">
        <image
          src="@/static/right.png"
          mode="scaleToFill"
        />
        <text>准时达</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
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

const handleExit = () =>{
  uni.exitMiniProgram()
}
</script>

<style scoped>
.custom-navbar {
  display: flex;
  width: 100%;
  height: 44px; /* 导航条高度 */
  background: linear-gradient(to top right, #fff, #bedbf8);
  position: fixed;
  top: 0;
  z-index: 999;
  padding-top: v-bind(statusBarHeight); /* 状态栏高度 */
}

.navbar-title {
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-size: 43rpx;
  font-weight: bold;
  color: #000;
  padding-left: 10rpx;
  margin-left: 10rpx;
}
.exit-icon {
  margin-left: 15rpx;
  margin-top: 10rpx;
  width: 40rpx;
  height: 40rpx;
}
.slogan{
  display: flex;
}
.slogan-item image{
  margin-left: 10rpx;
  width: 30rpx;
  height: 30rpx;
}
.slogan-item text{
  color: #5c5a5a;
  margin-left: 5rpx;
  font-size: 23rpx;
}
</style>