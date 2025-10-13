<template>
  <div class="ReciveMsg">ReciveMsg@@@@@@@@@@@@</div>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import { useErrandsInfoStore } from '../../store/errandsInfo';

const errandsInfoStore = useErrandsInfoStore();
function saveReceiveInfo() {
  const receiveInfo = {}
  errandsInfoStore.setReceiveInfo(receiveInfo)
}
</script>

<style scoped></style>