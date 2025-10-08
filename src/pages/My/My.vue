<script setup lang="ts">
import {ref} from 'vue'
import { useUserStore } from '../../store/user';

const userStore = useUserStore();

const Balance = ref(0)
const Coupons = ref(0)
</script>

<template>
  <view class="my-page">
    <view class="userInfo">
      <image :src="userStore.avatar" alt="Avatar" class="avatar" />
      <text class="username">{{ userStore.username }}</text>
    </view>

    <view class="my-wallet">
      <view class="wallet-item">
        <text>跑腿余额</text>
        <text>{{ Balance }}</text>
      </view>
      <view class="wallet-item">
        <text>我的优惠</text>
        <text>{{ Coupons }}</text>
      </view>
    </view>
     
    <view class="common-tools">
      <view class="tools-item">收货地址
        <image
        src="/static/address.png"
        mode="scaleToFill"
      /></view>
      <view class="tools-item">发票管理
        <image
          src="/static/bill.png"
          mode="scaleToFill"
        />
      </view>
      <view class="tools-item">我的客服
        <image
          src="/static/service.png"
          mode="scaleToFill"
        />
      </view>
      <view class="tools-item">设置
        <image
          src="/static/set.png"
          mode="scaleToFill"
        />
      </view>
    </view>
  </view>
</template>

<style>
.my-page {
 background: linear-gradient(135deg, #8fb5f6, #d6dbf5);
  min-height: 100vh;
  text-align: center;
  padding-top: 50px;
}
.userInfo {
  display: flex;
  align-items: center;
  justify-content: center; 
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}
.username {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}



.my-wallet {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #e6f1fa;
}
.wallet-item {
  text-align: center;
  flex: 1;
}
.wallet-item text:first-child {
  font-size: 14px;
  color: #666;
  display: block;
}
.wallet-item text:last-child {
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
}



.common-tools{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  padding: 10px 0;
  background-color:#e6f1fa;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.tools-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  padding: 15px 0;
  font-size: 14px;
  color: #333;
}
.tools-item image {
  display: block;
  margin: 0 auto 8px auto;
  height: 28px;
  width: 28px;
}
.tools-item text {
  display: block;
  margin-top: 5px;
  font-size: 12px;
  color: #666;
}


</style>