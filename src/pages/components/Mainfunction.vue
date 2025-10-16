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

        <view v-else-if="currentTab === 'Buyfme'">这是"帮我买"的内容</view>
      </view>

      <view class="orderBtn">
        <button>立即下单</button>
      </view>

    </view>
    
    <!-- 收货信息弹窗 -->
    <uni-popup ref="receivePopup" type="bottom" background-color="#fff" @change="onPopupChange">
      <view class="popup-content">
        <view class="popup-header">
          <text class="popup-title">收货信息</text>
          <!-- 使用 uni-icons 组件替换原来的关闭按钮 -->
          <uni-icons 
            class="close-icon" 
            type="closeempty" 
            size="24" 
            color="#999" 
            @click="receivePopup?.close()" 
          />
        </view>
        
        <view class="popup-body">
          <view class="form-item">
            <text class="label">所在地区</text>
            <uni-data-picker 
              v-model="receiveInfo.region" 
              :localdata="regionData" 
              placeholder="请选择省市区">
            </uni-data-picker>
          </view>
          
          <view class="form-item">
            <text class="label">详细地址</text>
            <input 
              class="detail-input" 
              v-model="receiveInfo.detailAddress" 
              placeholder="请输入详细地址，如街道、楼牌号等" />
          </view>
          
          <view class="form-item">
            <text class="label">收货时间</text>
            <!-- 使用 radio-group 包裹 radio 组件以实现互斥选择 -->
            <radio-group @change="onTimeTypeChange">
              <view class="time-options">
                <label class="time-option">
                  <radio value="noon" :checked="receiveInfo.timeType === 'noon'" color="#007aff" />
                  <text>中午时段 (12:00-14:00)</text>
                </label>
                
                <label class="time-option">
                  <radio value="evening" :checked="receiveInfo.timeType === 'evening'" color="#007aff" />
                  <text>晚间时段 (18:00-20:00)</text>
                </label>
                
                <label class="time-option">
                  <radio value="custom" :checked="receiveInfo.timeType === 'custom'" color="#007aff" />
                  <text>自定义时间</text>
                </label>
              </view>
            </radio-group>
            
            <view v-if="receiveInfo.timeType === 'custom'" class="custom-time">
              <uni-datetime-picker 
                v-model="receiveInfo.customTime" 
                type="time" 
                placeholder="请选择具体时间">
              </uni-datetime-picker>
            </view>
          </view>
        </view>
        
        <view class="popup-footer">
          <button class="save-btn" @click="saveReceiveInfo">保存</button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script lang="ts" setup name="mainFunction">
import { ref, computed } from 'vue';
import { useErrandsInfoStore } from '../../store/errandsInfo'


const currentTab = ref('Takefme');
const errandsInfoStore = useErrandsInfoStore();
const receivePopup = ref<{ open: () => void; close: () => void } | null>(null)
// 添加控制通告栏显示的状态
const isPopupOpen = ref(false)

// 添加收货信息数据
const receiveInfo = ref({
  region: '',           // 省市区
  detailAddress: '',    // 详细地址
  timeType: 'noon',     // 时间类型: noon-中午, evening-晚间, custom-自定义
  customTime: ''        // 自定义时间
})

// 省市区数据
const regionData = ref([
  {
    text: '北京市',
    value: '110000',
    children: [
      {
        text: '北京市',
        value: '110100',
        children: [
          { text: '东城区', value: '110101' },
          { text: '西城区', value: '110102' },
          { text: '朝阳区', value: '110105' },
          { text: '海淀区', value: '110108' },
          { text: '丰台区', value: '110106' }
        ]
      }
    ]
  },
  {
    text: '上海市',
    value: '310000',
    children: [
      {
        text: '上海市',
        value: '310100',
        children: [
          { text: '黄浦区', value: '310101' },
          { text: '徐汇区', value: '310104' },
          { text: '长宁区', value: '310105' },
          { text: '静安区', value: '310106' },
          { text: '浦东新区', value: '310115' }
        ]
      }
    ]
  },
  {
    text: '广东省',
    value: '440000',
    children: [
      {
        text: '广州市',
        value: '440100',
        children: [
          { text: '荔湾区', value: '440103' },
          { text: '越秀区', value: '440104' },
          { text: '海珠区', value: '440105' }
        ]
      },
      {
        text: '深圳市',
        value: '440300',
        children: [
          { text: '罗湖区', value: '440303' },
          { text: '福田区', value: '440304' },
          { text: '南山区', value: '440305' }
        ]
      }
    ]
  }
])

function handleNavClick(tabName: string) {
  currentTab.value = tabName;
}

// 使用计算属性从store中获取取件地址
const TakeAddress = computed(() => {
  // 如果store中有取件地址，则显示地址，否则显示默认文本
  return errandsInfoStore.takeInfo?.address || '你要从哪里取';
});

// 修改收货地址显示逻辑，只显示详细地址
const ReciveAddress = computed(() => {
  return receiveInfo.value.detailAddress || '填写收货地址';
});

//帮我取-取件信息
function handleTake() {
    uni.navigateTo({
        url: '/pages/TakeInfo/TakeInfo'
    })
}

//收获信息
function handleRecive() {
  // 打开底部弹窗
  receivePopup.value?.open()
}

// 弹窗状态变化事件
function onPopupChange(e: any) {
  isPopupOpen.value = e.show
}

// 时间类型变化事件
function onTimeTypeChange(e: any) {
  receiveInfo.value.timeType = e.detail.value;
}

// 保存收货信息
function saveReceiveInfo() {
  // 这里可以添加保存到store或其他业务逻辑
  console.log('收货信息:', {
    region: receiveInfo.value.region,
    detailAddress: receiveInfo.value.detailAddress,
    timeType: receiveInfo.value.timeType,
    customTime: receiveInfo.value.customTime
  });
  
  // 关闭弹窗
  receivePopup.value?.close()
}

// 暴露给父组件的状态，用于控制通告栏显示
defineExpose({
  isPopupOpen
})
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

/* 添加弹窗样式 */
.popup-content {
  padding: 20rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.popup-title {
  font-size: 36rpx;
  font-weight: bold;
}

/* 修改关闭图标的样式 */
.close-icon {
  padding: 10rpx;
}

.form-item {
  margin: 30rpx 0;
}

.label {
  display: block;
  margin-bottom: 10rpx;
  font-size: 28rpx;
}

.detail-input {
  padding: 15rpx;
  border: 1rpx solid #e0e0e0;
  border-radius: 10rpx;
  font-size: 28rpx;
}

.time-options {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.time-option {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.time-option radio {
  transform: scale(0.8);
}

.custom-time {
  margin-top: 20rpx;
}

.popup-footer {
  padding: 20rpx 0 40rpx;
  text-align: center;
}

.save-btn {
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #007aff;
  color: white;
  border-radius: 10rpx;
  border: none;
}
</style>