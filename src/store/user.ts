// 新增用户信息 Store
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '', // 用户名
    avatar: ''   // 用户头像
  }),
  actions: {
    setUser(username: string, avatar: string) {
      this.username = username;
      this.avatar = avatar;
    },
    clearUser() {
      this.username = '';
      this.avatar = '';
    }
  }
});