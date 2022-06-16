<template>
    <view>
        <view style="padding: 10px;">
            <u-sticky>
                <view v-if="showCamera">
                    <camera
                        device-position="back"
                        mode="scanCode"
                        flash="off"
                        @error="cameraError"
                        class="cam-container"
                        @scancode="scancode"
                    ></camera>
                </view>
                 <u-alert-tips v-if="showTips" type="warning" :title="tips" class="u-m-b-10">
                </u-alert-tips>
                <u-alert-tips v-if="showResult" type="primary" :title="scanResult" class="u-m-b-10">
                </u-alert-tips>
            </u-sticky>
           
            <!-- <button type="primary" @click="takePhoto">拍照</button> -->
            <uni-list class="content" :border="false">
                <uni-list-item
                    v-for="(codeItem, index) in qrCodeList"
                    :key="index"
                    class="codeList"
                    :title="codeItem.cntrNum"
                    :note="codeItem.cntrTypeName"
                >
                    <view slot="footer">
                        <icon v-if="showClose" type="cancel" size="26" @click="deleteQrCode(index)"/>
                    </view>
                </uni-list-item>
            </uni-list>
            <!-- <image mode="widthFix" :src="src" /> -->
        </view>
		<tabBar ></tabBar>
    </view>
</template>

<script>
    /**
     * @description 载具二维码扫描组件  因目前需要扫描页面均为vue页面  未来可重构为nvue页面
     * @eventProp {Array} targetQrcodeList 需扫码列表
     * @eventProp {Array} initQrcodeList 初始载具码
     * @eventProp {number} index 回调索引
     * @eventProp {bool} showTips 显示tips
     * @eventProp {bool} showResult 显示扫码结果
     * @eventProp {bool} showCamera 显示扫码框
     * @eventProp {bool} showClose 可删除码
     */

    export default {
        name: 'Scan',
        data() {
            return {
                qrCodeList: [],
                targetQrcodeList: [],
                eventChannel: {},
                index: '',
                showTips: true,
                showCamera: true,
                showResult: true,
                showClose: true
            };
        },
        computed: {
            // 显示的tips 需要扫码的载具
            tips() {
                let result = '可扫码项：';
                // const groupList = arrayGroupBy(this.targetQrcodeList,qitem=> {
                //     return qitem.cntrTypeId;
                // });
                // groupList.forEach((gItem) => {
                //     if (gItem.length) {
                //         result += `${gItem[0].cntrTypeName} x ${gItem.length}；`;
                //     }
                // });
                return result;
            },
            // 扫码结果提示
            scanResult() {
				const groupList = this.qrCodeList
				debugger
                // const groupList = arrayGroupBy(this.qrCodeList,qitem=> {
                //     return qitem.cntrTypeId;
                // });
                let result = '已扫：';
                // groupList.forEach((gItem) => {
                //     if (gItem.length) {
                //         result += `${gItem[0].cntrTypeName} x /${gItem.length}；`;
                //     }
                // });
                return result;
            },
        },
        onLoad(option) {
		},
        onUnload() {
			
        },
        methods: {
            scancode(scanRes) {
                const { detail } = scanRes;
                try {

                    // 二维码内容 可随实际情况调整
                    const result = JSON.parse(detail.result);

                    // 判断二维码是否为目标列表内
                    if(this.targetQrcodeList && this.targetQrcodeList.length) {
                        const isTargetCode = this.targetQrcodeList.some(tItem=> {
                            return tItem.cntrNum === result.cntrNum;
                        });
                        if(!isTargetCode) {
                            this.$common.successToShow('扫描的二维码不在需扫码项内~');
                            return;
                        }
                    }
                    // 判断是否已扫过
                    const isInclude = this.qrCodeList.findIndex((codeItem) => {
                        return codeItem.cntrNum === result.cntrNum;
                    });

                    if (
                        !(isInclude !== -1) &&
                        (detail.type === 'QR_CODE' || detail.type === 'qrcode')
                    ) {
                        if (result) {
                            this.qrCodeList.push(result);
                        }
                    } else if (isInclude !== -1) {
                        this.$common.successToShow('二维码已添加~');
                    } else {
                        this.$common.successToShow('错误码~');
                    }
                } catch (error) {
                    this.$common.successToShow('扫描二维码错误~');
                }
            },
            deleteQrCode(index) {
                this.qrCodeList.splice(index, 1);
            },
			
            cameraError(e) {
                console.log(e);
            }
        },
    };
</script>

<style>
    .cam-container {
        width: 100%;
		min-height: 800rpx;
        height: 800rpx;
        margin-bottom: 10rpx;
    }
</style>

