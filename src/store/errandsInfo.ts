import { defineStore } from 'pinia';

// 定义取件信息的接口
interface TakeInfo {
  address: string;
  code: string;
  name: string;
  phoneLastFour: string;
  trackingNumber?: string;
}

// 定义收货信息的接口 (根据 Mainfunction.vue 组件中的实际使用情况)
interface ReceiveInfo {
  region : string;                 // 可选 - 省市区
  detailAddress : string;          // 详细地址
  timeType : 'noon' | 'evening' | 'custom';  // 时间类型
  customTime : string;             // 自定义时间
}

export const useErrandsInfoStore = defineStore('errandsInfo', {
  state: () => ({
    takeInfo: {} as Partial<TakeInfo>,     // 取件信息
    buyReceiveInfo: {} as Partial<ReceiveInfo>,  // 帮我买收货信息
    takeReceiveInfo: {} as Partial<ReceiveInfo>  // 帮我收取货信息
  }),
  actions: {
    setTakeInfo(info: Partial<TakeInfo>) {
      this.takeInfo = info;
    },
    setBuyReceiveInfo(info: Partial<ReceiveInfo>) {
      this.buyReceiveInfo = info;
    },
    setTakeReceiveInfo(info: Partial<ReceiveInfo>) {
      this.takeReceiveInfo = info;
    }
  }
});