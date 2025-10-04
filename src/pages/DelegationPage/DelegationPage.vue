<template>
  <view class="DelegationPage">
    <view class="checkBox">
      <uni-section title="选择快递点" type="line">
        <view class="station-check">
          <uni-data-select 
            v-model="selectedStationIndex" 
            :localdata="stationOptions" 
            placeholder="请选择快递点"
            @change="handleStationChange"
          >
          </uni-data-select>
        </view>
      </uni-section>
    </view>

    <view class="custom-title">
      <view class="title-decoration"></view>
      <view class="title-content">
        <text class="title-text">取件码/快递单号</text>
      </view>
    </view>

    <view class="pickup-code">
      <input
        type="text"
        placeholder="请输入取件码或快递单号"
        class="input-field"
      />
    </view>

    <view class="custom-title">
      <view class="title-decoration"></view>
      <view class="title-content">
        <text class="title-text">用户信息</text>
      </view>
    </view>
    <view class="userInfo">
      <input 
        type="text"
        placeholder="收件人姓名+手机号后四位"
        class="input-field"
        v-model="userInfo"
        @input="validateUserInfo"
      />
      <text v-if="userInfoError" class="error-message">{{ userInfoError }}</text>
    </view>

    <view class="custom-title">
      <view class="title-decoration"></view>
      <view class="title-content">
        <text class="title-text">收货地址</text>
      </view>
    </view>
    <view class="reMark">
      <textarea
        placeholder="请输入收货地址,可填备注信息"
        class="input-field"
        auto-height
        maxlength="-1"
        v-model="deliveryAddress"
        @input="onAddressInput"
      ></textarea>
    </view>

    <view class="check-size">
      <uni-section title="选择包裹大小" type="line">
        <view class="size-check">
          <uni-data-checkbox
            v-model="selectedSize"
            :localdata="sizeOptions"
            mode="tag"
            @change="handleSizeChange"
          ></uni-data-checkbox>
        </view>
      </uni-section>
    </view>

    <view class="hint-message">
      <image src="@/static/hint.png" class="hint-icon"></image>
      <text class="hint-text">请根据实际包裹大小选择，以便骑手更好地为您服务。</text>
    </view>

    <view class="finish-btn">
      <button class="confirm-publish-btn">确认发布</button>
      <button class="add-to-cart-btn"><image
        src="@/static/shopingCar.png"
        mode="scaleToFill"
      /></button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const stationOptions = ref([
  { value: 0, text: "锦宏超市水果区" },
  { value: 1, text: "妈妈驿站" },
  { value: 2, text: "申通快递" },
  { value: 3, text: "韵达快递" },
  { value: 4, text: "菜鸟驿站" }
]);

const selectedStationIndex = ref<number | null>(null);

const handleStationChange = (event: any) => {
  const selectedValue = typeof event === 'object' && event.detail?.value !== undefined
    ? event.detail.value
    : event;

  selectedStationIndex.value = selectedValue;
};

const userInfo = ref('');
const userInfoError = ref('');

const validateUserInfo = () => {
  const regex = /^[\u4e00-\u9fa5a-zA-Z\s]+?\+\d{4}$/;
  if (userInfo.value === '') {
    userInfoError.value = '不能为空';
  } else if (!regex.test(userInfo.value)) {
    userInfoError.value = '请输入正确的姓名和手机号后四位（例如：张三+1234）';
  } else {
    userInfoError.value = ''; // 验证通过
  }
};


const deliveryAddress = ref<string>('');
const onAddressInput = (e: any) => {
  deliveryAddress.value = e.detail.value;
};

const sizeOptions = ref([
  { value: 'large', text: '大件' },
  { value: 'small', text: '小件' },
  { value: 'extra-large', text: '超大件' }
]);

const selectedSize = ref<string | null>(null);

const handleSizeChange = (e: any) => {
  console.log('选中的包裹大小:', e.detail.value);
  selectedSize.value = e.detail.value;
};
</script>

<style scoped>
.DelegationPage {
  padding: 20px;
}

.station-check {
  margin-top: 10px;
}

.custom-title {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 12px 10px;
}

.title-decoration {
  width: 4px;
  height: 12px;
  background-color: #2979ff;
  border-radius: 10px;
  margin-right: 6px;
}

.title-content {
  flex: 1;
}

.title-text {
  font-size: 14px;
  color: #333;
  font-weight: normal;
}

.pickup-code,
.userInfo,
.reMark {
  margin-top: 10px;
}

.input-field {
  width: 95%;
  padding: 5px 10px;
  padding-left: 10px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
  background-color: #fff;
}


textarea.input-field {
  min-height: 80px;
  line-height: 1.5;
  resize: none;
}

.finish-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  padding: 0 10px;
}

.confirm-publish-btn {
  flex: 1;
  margin-right: 10px;
  background-color: #2979ff;
  color: #fff;
  border-radius: 8px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.add-to-cart-btn {
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.add-to-cart-btn image {
  width: 24px;
  height: 24px;
}

.size-check {
  padding: 10px;
}

.uni-data-checkbox .uni-data-checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.uni-data-checkbox .uni-data-checkbox-group .uni-data-checkbox-button {
  flex: 1;
  min-width: 80px;
  text-align: center;
  padding: 8px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #f8f8f8;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.uni-data-checkbox .uni-data-checkbox-group .uni-data-checkbox-button.is-checked {
  background-color: #2979ff;
  color: #fff;
  border-color: #2979ff;
}

.hint-message {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 10px;
  background-color: #eaf2ff;
  border-radius: 8px;
}

.hint-icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.hint-text {
  font-size: 12px;
  color: #2979ff;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
  padding-left: 10px;
}
</style>