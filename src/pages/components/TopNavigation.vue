<template>
    <view class="indexTop">
        <view class="logo">
            <image
            src="@/static/logo.png"
            mode="heightFix"
        />
        </view>

        <view class="userMsg">
            <image
                src="@/static/user.png"
                mode="scaleToFill"
            />
            <span>userName</span>
        </view>
    </view>
</template>

<script lang="ts" setup name="TopNavigation">

</script>

<style scoped>
.indexTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    padding: 0 15px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 999;
}

.logo {
    flex: 1;
}

.logo image {
    height: 40px;
    width: auto;
}

.userMsg {
    display: flex;
    align-items: center;
    flex: 2;
    justify-content: flex-end;
}

.userMsg image {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

.userMsg span {
    font-size: 16px;
    color: #333;
}

.searchInput {
    flex: 3;
    margin-left: 20px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
    .indexTop {
        padding: 0 10px;
    }
    
    .logo image {
        height: 35px;
    }
    
    .userMsg span {
        font-size: 14px;
    }
    
    .searchInput {
        margin-left: 10px;
    }
}
</style>