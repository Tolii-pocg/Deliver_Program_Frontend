<template>
  <view class="Function-content">
    <view class="Function-content-item">
      <!-- 导航栏 -->
      <text 
        :class="['nav-item', { 'active': currentTab === 'Takefme' }]" 
        @click="handleNavClick('Takefme')"
        hover-class="none" 
      >
        帮我取
      </text>
      <text 
        :class="['nav-item', { 'active': currentTab === 'Sendfme' }]" 
        @click="handleNavClick('Sendfme')"
        hover-class="none"
      >
        帮我寄
      </text>
      <text 
        :class="['nav-item', { 'active': currentTab === 'Buyfme' }]" 
        @click="handleNavClick('Buyfme')"
        hover-class="none"
      >
        帮我买
      </text>

      <!-- 内容区域 -->
      <view class="itemContent">
        <view v-if="currentTab === 'Takefme'" class="T-content">
                <view class="address-item take-address">
                  <text class="Tmark">取</text>
                  <text class="address-text" @click="handleTake">{{ TakeAddress }}</text>
                  <text class="divider">|</text>
                  <text class="common-text">常用</text>
                </view>
                
                <view class="address-item receive-address">
                  <text class="recive">收</text>
                  <text class="address-text" @click="handleRecive">{{ ReciveAddress }}</text>
                  <text class="divider">|</text>
                  <text class="common-text">常用</text>
                </view>

        </view> 


        <view v-else-if="currentTab === 'Sendfme'" class="T-content"><text class="Tmark">寄</text>
                <text style="margin-left: 50rpx; font-size: large;">你要从哪里寄件</text>
                <text style="font-size: smaller; color: #eeecec; font-weight: lighter; margin-left: 140rpx;">|</text>
                <text style="margin-left: 20rpx; color:gray;">常用</text>
        </view>

        <view v-else-if="currentTab === 'Buyfme'">这是“帮我买”的内容</view>
      </view>

      <view class="orderBtn">
        <button>立即下单</button>
      </view>

    </view>
  </view>
</template>

<script lang="ts" setup name="mainFunction">
import { ref, computed } from 'vue';
import { useErrandsInfoStore } from '../../store/errandsInfo'


const currentTab = ref('Takefme');
const errandsInfoStore = useErrandsInfoStore();

function handleNavClick(tabName: string) {
  currentTab.value = tabName;
}

// 使用计算属性从store中获取取件地址
const TakeAddress = computed(() => {
  // 如果store中有取件地址，则显示地址，否则显示默认文本
  return errandsInfoStore.takeInfo?.address || '你要从哪里取';
});

const ReciveAddress = ref('填写收货地址');

//帮我取-取件信息
function handleTake() {
    uni.navigateTo({
        url: '/pages/TakeInfo/TakeInfo'
    })
}

//收获信息
function handleRecive() {
    uni.navigateTo({
        url:'/pages/ReciveInfo/ReciveInfo'
    })
}
</script>

<style scoped>
.Function-content {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: 10rpx;
  width: 100%;
  height: 600rpx;
  border-radius: 40rpx;
  background: linear-gradient(to top, #fff 60%, rgb(139, 201, 245) 100%);
}

.Function-content-item {
  display: block;
  width: 90%;
  height: 500rpx;
  border-radius: 40rpx;
  background-color: #fff;
  position: relative;
}

.nav-item {
  padding-left: 30rpx;
  padding-top: 8rpx;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}

.active {
  font-weight: bold;
  color: #2979ff;
}

.itemContent {
  margin-top: 50rpx;
  padding: 20rpx;
  background-color: #fcfcfc;
  border-radius: 20rpx;
}

.T-content{
    margin-left: 40rpx;
    border-radius: 10rpx;
}

.Tmark{
    font-size: large;
    font-weight: bolder;
    color: rgb(139, 201, 245);
    line-height: 60rpx;
    padding-right: 5rpx;
}

.recive{
    font-size: large;
    font-weight: bolder;
    color: rgb(122, 245, 190);
    line-height: 60rpx;
    padding-right: 5rpx;
}

.address-item {
  position: relative;
  border-bottom: 1px solid #eeecec;
  padding: 20rpx 0;
  min-height: 60rpx;
}

.take-address {
  margin-bottom: 20rpx;
}

.address-text {
  margin-left: 50rpx;
  font-size: large;
}

.divider {
  position: absolute;
  right: 80rpx;
  font-size: smaller;
  color: #eeecec;
  font-weight: lighter;
  line-height: 60rpx;
}

.common-text {
  position: absolute;
  right: 20rpx;
  color: gray;
  line-height: 60rpx;
}

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