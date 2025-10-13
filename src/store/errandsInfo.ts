import { defineStore } from 'pinia';

export const useErrandsInfoStore = defineStore('errandsInfo', {
  state: () => ({
    takeInfo: {}, // 取件信息
    receiveInfo: {} // 收货信息
  }),
  actions: {
    setTakeInfo(info: any) {
      this.takeInfo = info;
    },
    setReceiveInfo(info: any) {
      this.receiveInfo = info;
    }
  }
});