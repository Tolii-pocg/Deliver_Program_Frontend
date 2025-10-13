<template>
  <view class="TakeMsg">TakeMsg@@@@@@@@@@@@</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useErrandsInfoStore } from '../../store/errandsInfo';
const errandsInfoStore = useErrandsInfoStore();
const TakeInfo = {}
errandsInfoStore.setTakeInfo(TakeInfo)

</script>

<style scoped></style>