<template>
  <view class="index-container">
    <Top />
    <Banner />
    <mainFunction />
    <Noticeboard />
  </view>
</template>

<script setup lang="ts" name="index">
import { ref } from 'vue';
import Top from '../components/Top.vue';
import Banner from '../components/banner.vue';
import mainFunction from '../components/Mainfunction.vue';
import Noticeboard from '../components/Noticeboard.vue';
</script>

<style>
.index-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>