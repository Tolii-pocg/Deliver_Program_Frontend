<template>
  <view class="index-container">
    <Top />
    <Banner />
    <mainFunction ref="mainFunctionRef" />
    <Noticeboard v-if="!isPopupOpen" />
  </view>
</template>

<script setup lang="ts" name="index">
import { ref, computed } from 'vue';
import Top from '../components/Top.vue';
import Banner from '../components/banner.vue';
import mainFunction from '../components/Mainfunction.vue';
import Noticeboard from '../components/Noticeboard.vue';

// 获取mainFunction组件的引用
interface MainFunctionComponent {
  isPopupOpen: boolean
}
const mainFunctionRef = ref<MainFunctionComponent | null>(null)

// 计算属性，判断弹窗是否打开
const isPopupOpen = computed(() => {
  return mainFunctionRef.value?.isPopupOpen || false
})
</script>

<style>
.index-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>