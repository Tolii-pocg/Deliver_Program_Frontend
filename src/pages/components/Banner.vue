<script lang="ts" setup name="Banner">
import { ref, onMounted} from 'vue';


const autoplay = ref(true); 
let timer: ReturnType<typeof setTimeout> | null = null; 
const swiperWidth = ref(0); 
const swiperHeight = ref(0); 
const bannerList = ref([
    { image: '/static/bannerTest.jpg' },
    { image: '/static/bannerTest.jpg' },
    { image: '/static/bannerTest.jpg' },
]);

onMounted(() => {
    const systemInfo = uni.getSystemInfoSync();
    swiperWidth.value = systemInfo.screenWidth; 
    swiperHeight.value = (systemInfo.screenWidth * 9) / 16; 
});

// 手指按下时关闭自动播放
function handleTouchStart(event: TouchEvent) {
    autoplay.value = false; 
    if (timer) {
        clearTimeout(timer); 
        timer = null;
    }
}

// 手指离开时延迟开启自动播放
function handleTouchEnd(event: TouchEvent) {
    timer = setTimeout(() => {
        autoplay.value = true; 
        timer = null; 
    }, 1000); 
}
</script>

<template>
    <view class="newsBanner">
        <view class="uni-margin-wrap">
            <swiper
                indicator-dots="true"
                :autoplay="autoplay"
                circular
                interval="1500"
                duration="1000"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
                :style="{ height: swiperHeight + 'px', width: swiperWidth + 'px' }"
            >
                <swiper-item v-for="(item, index) in bannerList" :key="index">
                    <image
                        :src="item.image"
                        mode="scaleToFill"
                        :style="{ width: swiperWidth + 'px', height: swiperHeight + 'px' }"
                    />
                </swiper-item>
            </swiper>
        </view>
    </view>
</template>

<style scoped>
.newsBanner {
    width: 100%;
    overflow: hidden;
}
.uni-margin-wrap {
    width: 100%;
    margin: 0 auto;
}
swiper {
    width: 100%;
}
swiper-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
image {
    width: 100%;
    height: 100%;
}
</style>