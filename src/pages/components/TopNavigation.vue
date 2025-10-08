<template>
  <view class="top-navigation">
    <image :src="userStore.avatar" alt="Avatar" class="avatar" />
    <text class="username">{{ userStore.username }}</text>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '../../store/user';

const userStore = useUserStore();
userStore.setUser('zhangsan', '/static/user.png');//后期修改调用位置
</script>

<style scoped>
.top-navigation {
  display: flex;
  align-items: center;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}
.username {
  margin-left: 10px;
  font-size: 16px;
  margin-left: 10px;
}
</style>
