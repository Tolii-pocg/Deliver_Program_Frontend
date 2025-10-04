<template>
   <view class="btn-container">
      <view class="btn-area">
         <navigator url="/pages/DelegationPage/DelegationPage" open-type="navigate" hover-class="other-navigator-hover" class="nav-item">
            <button type="default" class="square-btn publish-btn">
               <image src="/static/undertake-delivery.png" class="btn-icon"></image>
               <text class="btn-text">发布委托</text>
            </button>
         </navigator>
         <navigator url="/pages/TakeOrder/TakeOrder" open-type="navigate" hover-class="other-navigator-hover" class="nav-item">
            <button type="default" class="square-btn take-btn">
               <image src="/static/take-orders.png" class="btn-icon"></image>
               <text class="btn-text">我要接单</text>
            </button>
         </navigator>
      </view>
   </view>
</template>

<script lang="ts" setup name="FunctionButton">

</script>

<style scoped>
.btn-container {
   margin-top: 15px;
   border: 1px solid #e0e0e0;
   border-radius: 16px;
   padding: 15px;
   background-color: #f9f9f9;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.btn-area{
   display: flex;
   justify-content: center;
   align-items: center;
   flex-wrap: wrap;
   gap: 60px;
   padding: 20px;
   padding-top: 10px;
}
.nav-item {
   width: 40%;
}
.square-btn {
   width: 100%;
   height: 0;
   padding-bottom: 100%; /* 使按钮呈现正方形 */
   position: relative;
   border-radius: 12px;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
   transition: all 0.3s ease;
}
.square-btn:active {
   transform: scale(0.95);
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.publish-btn {
    background: #2979ff;
    border: none;
}
.take-btn {
    background: #2979ff;
    border: none;
}
.btn-icon {
   position: absolute;
   width: 40%;
   height: 40%;
   top: 20%;
   left: 30%;
}
.btn-text {
   position: absolute;
   bottom: 15%;
   left: 0;
   right: 0;
   text-align: center;
   font-size: 16px;
   font-weight: bold;
   color: #FFFFFF;
}

</style>