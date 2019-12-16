<template xlang="wxml">
	<view class="body">
		<view class="carinput">
			<!-- <view class="carinput-title">
				请填写车牌号码
			</view> -->
			<view class="carinput-input">
				<view class="carinput-input-i" :class="{'input-active':carIndex == i}" @tap="inputKey" :data-index="i" v-for="(v,i) in carInput" :key="i" v-show="i < 7">
					{{carInput[i].val}}
				</view>
				<view class="carinput-input-i" :class="{'input-active':carIndex == 7}" @tap="inputKey" data-index="7">
					{{carInput[7].val?carInput[7].val:'+'}}
				</view>
			</view>
			<view class="carinput-power">
				<checkbox-group class="checkbox-g" @change="powerChange">
					<label class="checkbox">
						<checkbox value="true" :checked="isPower" />
						新能源
					</label>
				</checkbox-group>
			</view>
		</view>
		<!-- <view class="card-btn">
			<button class="btn" hover-class="hover-c" type="default" @tap="toBind">
				确定
			</button>
		</view> -->
		<tki-float-keyboard ref="keybd" :mode="'car'" :type="keyType" :title="'车牌键盘'" @del="keyCbDel" @val="keyCbVal" @hide="keyCbHide"></tki-float-keyboard>
	</view>
</template>
<script>
import tkiFloatKeyboard from "@/components/tki-float-keyboard/tki-float-keyboard.vue";
export default {
	data() {
		return {
			carIndex: -1,
			carInput: [
				{ type: 2, val: "豫" },
				{ type: 4, val: "A" },
				{ type: 1, val: "" },
				{ type: 1, val: "" },
				{ type: 1, val: "" },
				{ type: 1, val: "" },
				{ type: 3, val: "" },
				{ type: 1, val: "" }
			],
			keyType: 0,
			isPower: false, // 新能源
		};
	},
	methods: {
		// 判定是否为空
		empty(v) {
			let tp = typeof v,
				rt = false;
			if (tp == "number" && String(v) == "") {
				rt = true
			} else if (tp == "undefined") {
				rt = true
			} else if (tp == "object") {
				if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
			} else if (tp == "string") {
				if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
			} else if (tp == "function") {
				rt = false
			}
			return rt
		},
		inputKey(e) {
			let that = this;
			let data = e.currentTarget.dataset;
			if (data.index >= 7) {
				if (!that.isPower) {
					return false;
				} else {
					that.carIndex = 7;
				}
			} else {
				that.carIndex = data.index;
			}
			that.upKeyType();
			that.keyShow();
		},
		keyCbVal(e) {
			let that = this;
			let index = Number(that.carIndex);
			if (index >= 0 && index < 6) {
				that.carInput[index].val = e;
				that.carIndex = index + 1;
			} else if (index == 6) {
				that.carInput[index].val = e;
				if (that.isPower) {
					// 新能源
					that.carIndex = 7;
				} else {
					// 不是新能源出输入结束
					that.keyHide();
					that.carIndex = -2;
					console.log('非新能源车输入完毕')
				}
			} else if (index == 7) {
				// 新能源车输入完毕
				that.carInput[index].val = e;
				that.keyHide();
				that.carIndex = -3;
				console.log('新能源车输入完毕')
			}
			that.upKeyType();
		},
		keyCbDel(e) {
			let index = this.carIndex;
			if (index > 0) {
				if (!this.empty(this.carInput[index].val)) {
					this.carInput[index].val = "";
					this.carIndex = index;
				} else {
					this.carInput[index - 1].val = "";
					this.carIndex = index - 1;
				}
			}
			this.upKeyType();
		},
		upKeyType() {
			if (!this.empty(this.carInput[this.carIndex])) {
				this.keyType = this.carInput[this.carIndex].type;
			}
		},
		keyShow() {
			this.$refs.keybd._keyShow();
		},
		keyHide() {
			this.$refs.keybd._keyHide();
		},
		keyCbHide() {
			if (this.carIndex != -3 || this.carIndex != -2) {
				this.carIndex = -1;
			}
		},
		powerChange(e) {
			let that = this
			let i = that.checkCar().i
			if (e.detail.value.length > 0) {
				that.isPower = true;
				if (i == -1) {
					that.carIndex = 7;
				} else {
					that.carIndex = i;
				}
				that.keyShow();
			} else {
				that.isPower = false;
				that.carInput[7].val = "";
				if (that.carIndex == 7) {
					that.keyHide();
					that.carIndex = -2;
				}
			}
			that.upKeyType();
		},
		checkCar() {
			// 检查车牌是否输入完成
			let that = this;
			let i = 7;
			let rt = { i: -1, isempty: false, val: "" };
			if (that.isPower) {
				i = 8;
			}
			for (let index = 0; index < i; index++) {
				const obj = that.carInput[index];
				if (this.empty(String(obj.val))) {
					rt.i = index;
					rt.isempty = true;
					rt.val = "";
					break;
				}
				rt.val += that.carInput[index].val;
			}
			return rt;
		},
		toBind() {
			let that = this
			let ck = that.checkCar();
			if (ck.i == -1 && !ck.isempty) {
				console.log('可以绑定车牌了')
				console.log(this.carInput)
				let car = ''
				this.carInput.forEach(item=>{
					car+=item.val
				})
				// 把结果返回给父组件
				return car
			} else {
				// 显示键盘输入
				that.keyShow();
				that.carIndex = ck.i;
				that.keyType = that.carInput[ck.i].type
				
			}
		}
	},
	components: {
		tkiFloatKeyboard
	},
	computed: {},
	watch: {},
	onPageScroll: function () {
		let that = this;
	},
	onReachBottom: function () {
		let that = this;
	},
	onPullDownRefresh: function () {
		let that = this;
	},
	onShow: function () {
		let that = this;
	},
	onHide: function () {
		let that = this;
	},
	onUnload: function () {
		let that = this;
	},
	onLoad: async function () {
		let that = this;
	}
};
</script>

<style>
.hover-c {
    opacity: .5
}



.body {
    overflow: auto;
}

.carinput {
    margin-top: 44upx;
    display: flex;
    flex-direction: column;
    padding-left: 40upx;
    padding-right: 40upx
}

.carinput-title {
    font-size: 30upx;
    color: #333333;
    line-height: 1;
    margin-bottom: 60upx
}

.carinput-input {
    display: flex;
    justify-content: center
}

.carinput-input-i {
    width: 70upx;
	height: 70upx;
	display: flex;
	align-items: center;
	justify-content: center;
    border-bottom-width: 2upx !important;
    border-bottom-style: solid;
    border-bottom-color: #BCBCBC;
    font-size: 36upx;
    color: #333333;
    line-height: 1;
    margin-right: 12upx;
    padding-bottom: 7upx;
    text-align: center
}

.carinput-input-i:nth-last-child(1) {
    margin-right: 0
}

.carinput-input .input-active {
    border-bottom-width: 2upx !important;
    border-bottom-style: solid;
    border-bottom-color: #23CCAB;
    color: #23CCAB
}

.carinput-power {
    height: 90upx;
    display: flex;
    justify-content: flex-end
}

.carinput-power .checkbox-g {
    display: flex;
    justify-content: center;
    align-items: center
}

.carinput-power .checkbox {
    margin-right: 92upx;
    font-size: 28upx;
    color: #999999;
    line-height: 1
}

.carinput-power .checkbox checkbox {
    transform: scale(.6) translateY(-2px);
    margin-right: 0
}

.card-btn {
    margin-top: 40upx
}

.card-btn .btn {
    width: 324upx;
    height: 80upx
}
</style>
