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
      <view class="Prompt-box"> 填信息→ 付跑腿费→ 收货→ 付商品费 </view>
    </view>
    <view class="content">
      <view class="custom-tips">
        <view class="notice-wrapper">
          <image
            class="warn-icon"
            src="/static/warn.png"
            mode="aspectFit"
          ></image>
          <view class="notice-content">
            <view
              class="notice-list"
              :style="{
                transform: `translateY(${-currentIndex * 36}rpx)`,
                transition: 'transform 0.3s ease',
              }"
            >
              <view
                class="notice-item"
                v-for="(item, index) in notices"
                :key="index"
              >
                {{ item }}
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="userInput">
        <textarea
          v-model="productInfo"
          placeholder="请输入商品信息，如：商品名称、数量、规格等购买要求"
          :auto-height="true"
          maxlength="500"
          class="product-textarea"
          @input="handleInput"
        />
        <view class="textarea-footer">
          <view class="upload-link" @click="upload">上传样图</view>
          <text class="word-count">{{ currentLength }}/500</text>
        </view>
      </view>

      <view class="remark" @click="handleRemark">
        <text class="remark-text">备注</text>
        <text class="remark-desc">{{
          errandsInfoStore.buyInfo.remark
            ? "已保存您的备注信息"
            : "如有其他需求请备注"
        }}</text>
        <image
          class="arrow-icon"
          src="/static/Goto.png"
          mode="aspectFit"
        ></image>
      </view>
    </view>

    <view class="addressSelection">
      <view class="nav-item">
        <view
          class="tab-item"
          :class="{ active: currentTab === 'nearby' }"
          @click="switchTab('nearby')"
        >
          就近购买
        </view>
        <view
          class="tab-item"
          :class="{ active: currentTab === 'specify' }"
          @click="switchTab('specify')"
        >
          指定地点购买
        </view>
      </view>
      <view class="content-container">
        <view
          class="selection-Ncontent tab-content"
          v-show="currentTab === 'nearby'"
        >
          <transition name="slide-fade">
            <view v-if="currentTab === 'nearby'" class="tab-panel">
              就近购买内容区域
            </view>
          </transition>
        </view>
        <view
          class="selection-Scontent tab-content"
          v-show="currentTab === 'specify'"
        >
          <transition name="slide-fade">
            <view v-if="currentTab === 'specify'" class="tab-panel">
              指定地点购买内容区域
            </view>
          </transition>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup name="BuyInfo">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useErrandsInfoStore } from "../../store/errandsInfo";

const errandsInfoStore = useErrandsInfoStore();

// 定义胶囊位置相关变量
const capsuleTop = ref<number>(0);
const capsuleLeft = ref<number>(0);
const currentIndex = ref<number>(0);
const notices = ref<string[]>([
  "禁止购买处方药及医疗器械",
  "请勿与骑手线下交易,谨防风险",
  "如有特殊要求，请在备注中详细说明",
]);
const productInfo = ref<string>("");
const currentLength = ref<number>(0);
const currentTab = ref("nearby");

let timer: ReturnType<typeof setInterval> | null = null;

// 监听商品信息变化并保存到 store
watch(productInfo, (newVal) => {
  errandsInfoStore.setBuyInfo({
    ...errandsInfoStore.buyInfo,
    productInfo: newVal,
  });
});

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

  // 初始化商品信息
  productInfo.value = errandsInfoStore.buyInfo?.productInfo || "";
  currentLength.value = productInfo.value.length;
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

const handleInput = (e: any): void => {
  currentLength.value = e.detail.value.length;
};

function handleRemark() {
  uni.navigateTo({
    url: "/pages/buyRemark/buyRemark",
  });
}

function upload() {
  (uni as any).chooseMedia({
    count: 2,
    mediaType: ["image"],
    success: (success) => {
      console.log(success.tempFiles, "-----");
    },
    fail: (fail) => {
      uni.showToast({
        title: "上传失败请重试",
        icon: "none",
      });
    },
  });
}

const switchTab = (tab: string) => {
  currentTab.value = tab;
};
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
.Prompt-box {
  margin-top: 150rpx;
  width: 700rpx;
  height: 100rpx;
  background-color: #fff;
  color: #777777;
  border-radius: 20rpx;
  text-align: center;
  line-height: 100rpx;
}
.content {
  width: 700rpx;
  height: 500rpx;
  border-radius: 10rpx;
}

.custom-tips {
  width: 100%;
  height: auto;
  background-color: #ffe5b8;
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
  color: #ffb22e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.userInput {
  padding: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  margin-top: 20rpx;
}

.product-textarea {
  width: 100%;
  min-height: 200rpx;
  padding: 20rpx;
  box-sizing: border-box;
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  font-size: 28rpx;
  background-color: #fafafa;
}

.textarea-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 10rpx;
  box-sizing: border-box;
}

.upload-link {
  text-decoration: underline;
  font-size: small;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  color: #5c98ff;
}

.word-count {
  font-size: 24rpx;
  color: #999999;
}
.remark {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20rpx;
  margin-top: 20rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  background-color: #fafafa;
}

.remark-text {
  font-weight: bold;
  flex-shrink: 0;
}

.remark-desc {
  flex: 1;
  color: #999999;
  text-align: right;
  margin-left: 20rpx;
  font-weight: normal;
}

.arrow-icon {
  width: 30rpx;
  height: 30rpx;
  flex-shrink: 0;
}

.addressSelection {
  margin-top: 10rpx;
  width: 700rpx;
  height: 550rpx;
  border-radius: 10rpx;
}
.nav-item {
  display: flex;
  width: 100%;
  border-radius: 10rpx;
  border: 1rpx solid #e2e2e2;
  background-color: #f0f0f0;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
  font-weight: normal;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.tab-item:first-child {
  border-top-left-radius: 10rpx;
  border-bottom-left-radius: 10rpx;
}

.tab-item:last-child {
  border-top-right-radius: 10rpx;
  border-bottom-right-radius: 10rpx;
}

.tab-item.active {
  background-color: #ffffff;
  color: #007aff;
  font-weight: bold;
}

.content-container {
  position: relative;
  height: 500rpx;
  width: 100%;
}

.tab-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.tab-panel {
  padding: 20rpx;
  height: 100%;
  box-sizing: border-box;
  background-color: pink;
}

/* 滑动淡入淡出动画 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(20rpx);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-20rpx);
  opacity: 0;
}
</style>
