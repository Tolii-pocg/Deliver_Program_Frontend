import { defineStore } from 'pinia';

// 定义取件信息的接口
interface TakeInfo {
  address: string;
  code: string;
  name: string;
  phoneLastFour: string;
  trackingNumber: string;
}

// 定义收货信息的接口
interface ReceiveInfo {
  area: Array<{text: string, value: string}>;
  areaText: string;
  detailAddress: string;
  time: string;
}

export const useErrandsInfoStore = defineStore('errandsInfo', {
  state: () => ({
    takeInfo: {} as Partial<TakeInfo>, // 使用 Partial 允许部分字段为空
    receiveInfo: {} as Partial<ReceiveInfo> // 使用 Partial 允许部分字段为空
  }),
  actions: {
    setTakeInfo(info: Partial<TakeInfo>) {
      this.takeInfo = info;
    },
    setReceiveInfo(info: Partial<ReceiveInfo>) {
      this.receiveInfo = info;
    }
  }
});