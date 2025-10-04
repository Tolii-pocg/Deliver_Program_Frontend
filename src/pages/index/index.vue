<template>
  <TopNavigation />
  
  <view>
    <SearchInput/>
  </view>

  <view>
    <Banner/>
  </view>

<view>
<FunctionButton/>
</view>

<view class="moreFunction-btn">
		<uni-fab
			class="fab-custom-position"
			:pattern="pattern"
			:content="content"
			:horizontal="horizontal"
			:vertical="vertical"
			:direction="direction"
			:popMenu="popMenu"
			@trigger="trigger"
		></uni-fab>
</view>

</template>

<script setup lang="ts" name="index">
import { ref } from 'vue'
import TopNavigation from '../components/TopNavigation.vue';
import SearchInput from '../components/SearchInput.vue';
import Banner from '../components/Banner.vue'
import FunctionButton from '../components/FunctionButton.vue'

const pattern = ref({
	color:'#000',
	selectedColor:'#EBE40C',
	backgroundColor:'#fff',
	buttonColor:'#2979ff',
})
const content = ref([
	{
	iconPath:'',
	selectedIconpath:'',
	text:'功能1',
	active:false
},
{
	 iconPath: '',
        selectedIconPath: '',
        text: '功能2',
        active: false
},
{
	iconPath:'',
	selectedIconPath:'',
	text:'功能1',
	active:false
}
])
const horizontal = ref('left')
const vertical = ref('bottom')
const direction = ref('horizontal')
const popMenu = ref(true)

</script>

<style scoped>

</style>