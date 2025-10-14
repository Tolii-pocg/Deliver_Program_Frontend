<template>
    <view class="notice-content">
        <uni-notice-bar
            :text="noticeText"
            single
            scrollable
            showIcon
            background-color="#E6EFFF"
            color="#2979FF"
            class="cuntom-notice-bar"
        />
    </view>
</template>

<script lang="ts" setup name="Noticeboard">
import { ref } from 'vue'


const noticeText = ref('WeTake仍未上线,陶还需努力,fighting!!!fighting!!!fighting!!!')
</script>

<style scoped>
.notice-content{
    margin-top: 145rpx;
}
</style>