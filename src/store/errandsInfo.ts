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
  region? : string;                 // 可选 - 省市区
  detailAddress : string;          // 可选 - 详细地址
  timeType : 'noon' | 'evening' | 'custom';  // 可选 - 时间类型
  customTime : string;             // 可选 - 自定义时间
}

export const useErrandsInfoStore = defineStore('errandsInfo', {
  state: () => ({
    takeInfo: {} as Partial<TakeInfo>,     // 取件信息
    receiveInfo: {} as Partial<ReceiveInfo> // 收货信息
  }),
  actions: {
    setTakeInfo(info: Partial<TakeInfo>) {
      this.takeInfo = info;
    },
    setReceiveInfo(info: Partial<ReceiveInfo>) {
      this.receiveInfo = info;  // 修复属性名
    }
  }
});