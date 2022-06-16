<template>
	<view class="camera-view" :style="{'height': caremaHeight + 'px'}">
		<camera device-position="back"  class="camera" mode="scanCode"  @scancode="scanCode">
			
		</camera>
		
		<canvas class="scan-canvas" canvas-id="scanCanvas"></canvas>
		
	</view>
</template>

<script src="./index.js" type="text/javascript"></script>

<style lang="scss" scoped>
	@import './css/index.scss';
</style>
