<template lang="pug">
.loading
  .content
    img.icon(:src="loadingIcon")
    .msg {{message}}

</template>

<script>
export default {
	data() {
		return {
			loadingIcon:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADR0lEQVRoQ+1YUXLTQAx9SswfpdkblD8Gkmk4QdMTNJyg5QSk4PBL+CVhQk/Q3qDtCUhPgDMxDH+EEzhM+5fYYtaJM65rJ7v1UtJO/GdbK+nprbRaEe75Q/fcf6wB/G8G1wzoMrDV9UrDQzHSXZclb4QB6dRjv7APcJ2YnLEVHP08FMO40UrHOwFof/Zt6Af86sd74eQFYgRA5bN3AKbjuTPM54OmqEfvlY5XB+j0mrMJmdsCMQOg7Z2BaC/uxMAuzXWX216LiD7E/zO479qielvHo3VGALxoe40CUTdSmnTuBkMAmPnCbYpatOb5J69atKzNS5r0dXJEC4Dc6xuT4s7Y8vvxPf6s62098tECo86EIRgNtyl68eiW216PiHbCb8x/fEZN5sA0f+iUgDkYEL8evBMnKuwoA5g6Sb/mSjWMxKNcIJTi4JLsRbKXRRYqTCgDuGHIUBKWO94XAr1JRpuZd5MspjGiDCBZSRh85NqioULzIpm0BJfy4yI/TZbiXADkYhktADUCnHERLRUDywDe2JopCb5IhzIDyxzJ81+CsCY4CPMbGH1vChkopWclACQ9DasdW9scBFUqFJzB242LLDQrByB03qdvALbm5wrDubJ4N60qLQRQ7ngOgbZ5gQIlnjWEsqpSwHyYtrUyAZTbXo2Ivuap+xp+z0WvHXgxBcz80W2KVlJnJoBkdfADfmmie1wGqpLSV00Pb00AclHYwwSoB0BPpzIsc3LR/7S+aQYg9WBbuSQOz5u21wKhHuYfuE9Aa2CLs9wHWZ7I/qu1K8mADtiHD0CW0ysLjkprqxM5U7JKBxmA0cAuCVNGVfXIUr6sYVwIoNIZcWTsrs6BODjZwmdVn0huMQPyMg7Inr8XnzKoRvAu5B5+Et9FFPPYWDOQJ3om1moxMLvYHzPguHZp14QDkY5o5jRoPjnX0asFIH7ZUJ3bqDozuxefxKd1Kmu1AITjP0IrZCDlcqFi0LSMFgDTxk3oMwZgehkvdEHBRdZcM9wmfmHPtTePTDgvdRgDEN2hGfzbtcV8ohB3NJrCmWxLjAEIp8wTNIjgZPUvM5mqysxTlSFjAFQNmpZbAzAdUV19awZ0I2Zafs2A6Yjq6vsL885yQC+p/gcAAAAASUVORK5CYII='
		}
	},
	props: {
		message: {
			type: String,
			default: '加载中...'
		}
	}
}
</script>

<style lang="less" scoped>
.loading {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background-color: rgba(255, 255, 255, 0.9);
	color: #2d8cf0;
	z-index: 2019;
	height: 100vh;
	width: 100vw;
	animation: fadeIn 0.3s ease;
	.content {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -100%);
		text-align: center;
		.icon {
			width: 60px;
			height: 60px;
			animation: spinning 1.5s linear infinite;
		}
	}
}
@keyframes spinning {
	from {
		transform: rotate(0deg);
	}
	50% {
		transform: rotate(180deg);
	}
	to {
		transform: rotate(360deg);
	}
}
@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
@keyframes fadeOut {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
</style>
