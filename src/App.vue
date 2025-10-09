<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
  uni.getSystemInfo({
    success: (result) => {
      // 获取手机系统的状态栏高度
      let statusBarHeight = result.statusBarHeight + 'px';

      // 不再需要 menuButtonInfo 和相关计算
     let contentTop = `${(result.statusBarHeight as number) + 44}px`;

      let menuInfo = {
        statusBarHeight: statusBarHeight, // 状态栏高度，用于自定义导航条的 padding-top
        contentTop: contentTop, // 内容区距离页面最上方的高度
      };
      uni.setStorageSync('menuInfo', menuInfo);
    },
    fail: (error) => {
      console.log(error);
    },
  });
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
