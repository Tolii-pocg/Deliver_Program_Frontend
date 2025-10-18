<template>
  <view class="orderBtn">
    <button @click="$emit('click')">立即下单</button>
  </view>
</template>

<script lang="ts" setup name="OrderButton">
// 将Mainfunction文件下的"立即下单"按钮移动到该组件,便于维护和扩展

// 定义组件的事件
const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<style scoped>
.orderBtn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 280rpx;
  margin-top: 80rpx;
  border-radius: 60rpx;
  overflow: visible; 
}

.orderBtn button {
  background: linear-gradient(to right, rgb(139, 201, 245), rgb(122, 245, 190)); /* 渐变色 */
  color: #fff;
  border: none;
  width: 100%;
  height: 100rpx;
  border-radius: 60rpx;
  font-size: 18px;
}
</style>