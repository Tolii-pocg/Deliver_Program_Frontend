<template>
  <view class="TakeMsg">
    <uni-forms ref="form" :model="formData" :rules="rules">
      <uni-forms-item label="地址" name="address" required>
        <uni-easyinput
          type="text"
          v-model="formData.address"
          placeholder="请输入取件地址(快递驿站)"
        />
      </uni-forms-item>

      <uni-forms-item label="取件码" name="code" required>
        <uni-easyinput
          type="text"
          v-model="formData.code"
          placeholder="请输入取件码"
        />
      </uni-forms-item>

      <uni-forms-item label="姓名" name="name" required>
        <uni-easyinput
          type="text"
          v-model="formData.name"
          placeholder="请输入取件人姓名"
        />
      </uni-forms-item>

      <uni-forms-item label="手机号" name="phoneLastFour" required>
        <uni-easyinput
          type="number"
          v-model="formData.phoneLastFour"
          placeholder="请输入手机尾号后四位"
          maxlength="4"
        />
      </uni-forms-item>

      <uni-forms-item label="快递单号" name="trackingNumber">
        <uni-easyinput
          type="text"
          v-model="formData.trackingNumber"
          placeholder="请输入快递单号(可选)"
        />
      </uni-forms-item>

      <!-- 添加备注框 -->
      <view class="remark" @click="handleRemark">
        <text class="remark-text">备注</text>
        <text class="remark-desc">{{
          formData.remark || "如有其他需求请备注"
        }}</text>
        <image
          class="arrow-icon"
          src="/static/Goto.png"
          mode="aspectFit"
        ></image>
      </view>
    </uni-forms>

    <view class="smart-input-section">
      <view class="section-title">智能识别输入</view>
      <textarea
        class="smart-textarea"
        v-model="smartInput"
        placeholder="请在此粘贴包含取件信息的文本，系统将自动识别并填充表单"
        auto-height
      />
      <button type="button" class="parse-btn" @click="parseSmartInput">
        识别并填充
      </button>
    </view>

    <button type="button" class="primary-btn" @click="submitForm">提交</button>

    <!-- 引入通告栏组件并传入动态文本 -->
    <Noticeboard text="欢迎使用取件信息填写功能，请仔细核对您的信息" />
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useErrandsInfoStore } from "../../store/errandsInfo";
import Noticeboard from "../components/Noticeboard.vue";

const errandsInfoStore = useErrandsInfoStore();

const form = ref();

const formData = ref({
  address: "",
  code: "",
  name: "",
  phoneLastFour: "",
  trackingNumber: "",
  remark: "",
});

const smartInput = ref("");

const rules = {
  address: {
    rules: [
      {
        required: true,
        errorMessage: "请输入取件地址",
      },
    ],
  },
  code: {
    rules: [
      {
        required: true,
        errorMessage: "请输入取件码",
      },
    ],
  },
  name: {
    rules: [
      {
        required: true,
        errorMessage: "请输入取件人姓名",
      },
    ],
  },
  phoneLastFour: {
    rules: [
      {
        required: true,
        errorMessage: "请输入手机尾号后四位",
      },
      {
        pattern: /^.{4}$/,
        errorMessage: "请输入正确的四位数字",
      },
    ],
  },
  trackingNumber: {
    rules: [],
  },
};

// 页面加载时接收返回的备注内容
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  // 修复类型错误，使用正确的类型断言
  const eventChannel = (currentPage as any).getOpenerEventChannel
    ? (currentPage as any).getOpenerEventChannel()
    : null;

  if (eventChannel) {
    eventChannel.on("acceptRemark", (data) => {
      formData.value.remark = data.remark;
    });
  }
});

const parseSmartInput = () => {
  // 智能识别功能待实现
};

const submitForm = () => {
  form.value
    .validate()
    .then((res) => {
      // 表单验证通过，保存数据
      errandsInfoStore.setTakeInfo(formData.value);
      uni.showToast({
        title: "提交成功",
        icon: "success",
      });

      // 提交成功后返回上一页
      setTimeout(() => {
        uni.navigateBack();
      }, 1000);
    })
    .catch((err) => {
      // 表单验证失败
      uni.showToast({
        title: "请检查输入信息",
        icon: "none",
      });
    });
};

// 处理备注点击事件
const handleRemark = () => {
  uni.navigateTo({
    url: `/pages/buyRemark/buyRemark?remark=${encodeURIComponent(
      formData.value.remark || ""
    )}&type=take`,
  });
};
</script>

<style scoped>
.TakeMsg {
  padding: 20rpx;
  padding-bottom: 120rpx; /* 为底部通告栏留出空间 */
}

.smart-input-section {
  margin-top: 40rpx;
  padding: 20rpx;
  background-color: #f5f5f5;
  border-radius: 10rpx;
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.smart-textarea {
  width: 100%;
  padding: 20rpx;
  border: 1px solid #ddd;
  border-radius: 10rpx;
  background-color: white;
  box-sizing: border-box;
  min-height: 150rpx;
  margin-bottom: 20rpx;
}

.parse-btn {
  background-color: #666;
  color: white;
  border-radius: 8rpx;
  border: none;
  width: 100%;
  height: 70rpx;
  font-size: 28rpx;
}

.primary-btn {
  background-color: #007aff;
  color: white;
  border-radius: 8rpx;
  border: none;
  width: 100%;
  height: 80rpx;
  font-size: 32rpx;
  margin-top: 40rpx;
  margin-bottom: 100rpx; /* 为底部通告栏留出空间 */
}

.primary-btn:active,
.parse-btn:active {
  opacity: 0.8;
}

/* 备注框样式 */
.remark {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20rpx;
  margin-top: 20rpx;
  background-color: #fffefe;
  border-radius: 10rpx;
  font-size: 28rpx;
  box-sizing: border-box;
}

.remark-text {
  font-weight: bold;
  flex-shrink: 0;
}

.remark-desc {
  flex: 1;
  color: #999999;
  text-align: right;
  margin-left: 20rpx;
  font-weight: normal;
}

.arrow-icon {
  width: 30rpx;
  height: 30rpx;
  flex-shrink: 0;
}
</style>
