/*
	1、 封装属性：  x， y  w ， h，  fillStyle  strokeStyle  rotation  opacity
	2、render

*/
function ItcastRect( option ) {
	this._init( option );
}

ItcastRect.prototype = {
	_init: function( option ) {
		this.x = option.x || 0;   //x ,y 坐标
		this.y = option.y || 0;
		this.h = option.h || 0;	  // 矩形的宽高
		this.w = option.w || 0;
		this.rotation = option.rotation || 0;  //矩形的旋转

		// 设置矩形的透明度
		this.opacity = option.opacity === 0 ? 0 : option.opacity || 1;

		this.scaleX = option.scaleX || 1;//设置矩形的 放到缩小
		this.scaleY = option.scaleY || 1;

		this.strokeStyle = option.strokeStyle || 'red';
		this.fillStyle = option.fillStyle || 'blue';
	},
	render: function( ctx ) {
		ctx.save();	// 把当前的上下文的状态保存一下
		ctx.beginPath();	//开始一个新的路径

		ctx.translate(this.x, this.y);  //把整个画布进行位移

		//把整个画布进行旋转
		ctx.rotate(this.rotation * Math.PI / 180 );
		//设置透明度
		ctx.globalAlpha = this.opacity;
		//设置画布缩小放大
		ctx.scale( this.scaleX, this.scaleY );
		
		//给 ctx规划一个路径。注意：规划的路径会一直保存。所以
		//最好在每次绘制矩形的时候beginPath一下标志一个新的路径。
		ctx.rect(0, 0 , this.w, this.h );
		
		ctx.fillStyle = this.fillStyle;
		ctx.fill();

		ctx.strokeStyle = this.strokeStyle;
		ctx.stroke();

		ctx.restore();//还原绘制的状态
	}
}