<template>
  <view class="remark-page">
    <!-- 备注输入区域 -->
    <view class="input-container">
      <textarea
        v-model="remark"
        placeholder="可手动输入备注内容也可以选择快捷内容"
        maxlength="100"
        class="remark-input"
        :auto-height="true"
      />
      <text class="char-count">{{ remark.length }}/100个字</text>
    </view>

    <!-- 快捷输入标签 -->
    <view class="quick-input">
      <text class="section-title">快捷输入</text>
      <view class="tags-container">
        <view
          v-for="(tag, index) in quickTags"
          :key="index"
          class="tag-item"
          @click="addTag(tag)"
        >
          {{ tag }}
        </view>
      </view>
    </view>

    <!-- 确定按钮 -->
    <button class="confirm-btn" @click="handleConfirm">确定</button>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useErrandsInfoStore } from "../../store/errandsInfo";

// 使用store
const errandsInfoStore = useErrandsInfoStore();

// 备注内容
const remark = ref("");
// 已选择的快捷标签
const selectedTags = ref<string[]>([]);
// 快捷输入标签列表
const quickTags = [
  "要求无接触配送",
  "挂门把手上",
  "放前台桌上",
  "放门口",
  "送到请电话联系我",
  "快点来取，尽快送到",
  "轻拿轻放，小心配送",
  "易碎品",
  "需要自带保温箱",
  "配送物品较重",
  "需要收货人本人签收",
  "接单后电话联系我",
  "取快递订单，接单后提供取货码",
];

// 添加快捷标签到备注
const addTag = (tag: string) => {
  if (!remark.value.includes(tag)) {
    remark.value += tag + " ";
  }
};

// 确定按钮点击事件
const handleConfirm = () => {
  // 判断 remark 是否为空
  if (!remark.value.trim()) {
    // 显示模态框询问用户是否不备注
    uni.showModal({
      title: "提示",
      content: "您还没有填写备注信息，是否确定不备注？",
      confirmColor: "#00aaff",
      success: function (res) {
        if (res.confirm) {
          // 用户点击确定，直接返回上一个页面
          uni.navigateBack();
        } else if (res.cancel) {
          // 用户点击取消，关闭弹窗，仍停留在该页面
          return;
        }
      },
    });
  } else {
    // remark 不为空的情况
    // 保存备注内容到 store 中
    errandsInfoStore.buyInfo.remark = remark.value.trim();

    // 提示成功
    uni.showToast({
      title: "成功",
      icon: "success",
    });

    // 延迟返回上一个页面
    setTimeout(() => {
      uni.navigateBack();
    }, 1000);
  }
};
</script>

<style scoped>
.remark-page {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.input-container {
  margin: 40rpx 30rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 30rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.remark-input {
  width: 100%;
  height: 200rpx;
  font-size: 32rpx;
  line-height: 50rpx;
  color: #333;
  border: none;
  outline: none;
  background-color: transparent;
}

.char-count {
  text-align: right;
  color: #999;
  font-size: 24rpx;
  margin-top: 20rpx;
}

.quick-input {
  margin: 40rpx 30rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 30rpx;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.tag-item {
  padding: 16rpx 24rpx;
  background-color: #f0f0f0;
  border-radius: 30rpx;
  font-size: 28rpx;
  color: #333;
  border: 1rpx solid #ddd;
  transition: all 0.2s;
  margin-top: 10rpx;
}

.tag-item:active {
  background-color: #00aaff;
  color: white;
}

.confirm-btn {
  margin: 80rpx 30rpx 60rpx;
  background: linear-gradient(to right, rgb(139, 201, 245), rgb(122, 245, 190));
  color: #ffffff !important;
  font-size: 36rpx;
  border-radius: 50rpx;
  padding: 20rpx 0;
  border: none;
}

.confirm-btn:disabled {
  background: #cccccc;
  color: #ffffff !important;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
