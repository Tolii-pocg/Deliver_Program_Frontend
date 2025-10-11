<template>
    <view class="banner-content">
        <swiper
            class="swiper"
            :indicator-dots="indicatorDots"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration"
            :circular="circular"
            indicator-color="rgba(0, 0, 0, .3)"
            indicator-active-color="#000000"
        >
            <swiper-item class="swiper-item" v-for="(item, index) in bannerTestList" :key="index">
                <image
                    :src="item.imageSrc"
                    mode="aspectFit"
                />
            </swiper-item>
        </swiper>
    </view>
</template>

<script lang="ts" name="Banner" setup>

interface BannerItem {
    imageSrc: string;
}

const indicatorDots = true;
const autoplay = true;
const interval = 2000;
const duration = 500;
const circular = true;

// 定义 bannerTestList 并返回
const bannerTestList: BannerItem[] = [
    { imageSrc: '/static/bannerTest.jpg' }, // 使用绝对路径
    { imageSrc: '/static/bannerTest.jpg' },
    { imageSrc: '/static/bannerTest.jpg' }
];
</script>

<style scoped>
.banner-content{
padding-top: 170rpx;
width: 690rpx;
width: 100%;
}
.swiper{
    height: 460rpx;
}
.swiper-item{
    display: block;
    height: 300rpx;
    line-height: 300rpx;
    text-align: center;
}
</style>