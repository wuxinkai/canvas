//=============>S  进度条=============
/*
	使用方法：

	var bgLayer = new Konva.Layer();
	var progressBar = new ProgressBar({
		x: stage.width() / 8,
		y: stage.height() / 2,
		width: stage.width() * 3/4,
		height: stage.height() / 20,
		fillColor: '#cdcd00',
		strokeColor: '#e0ffff', 
		strokeWidth: 6
	});
	progressBar.addToLayerOrGroup(bgLayer);
	stage.add(bgLayer);
	bgLayer.batchDraw();

	progressBar.changeValue(.56);
*/


function ProgressBar(option) {
	this.init(option);
}

ProgressBar.prototype = {
	constructor: ProgressBar,
	init: function( option ) {
		this.group = new Konva.Group({
			x: option.x,
			y: option.y
		});
		this.maxWidth = option.width;

		this.drawLayer = null;
		var innerRect = new Konva.Rect({
			x: 0,
			y: 0,
			width: 0,
			height: option.height,
			fill: option.fillColor,
			name: 'innerRect',
			cornerRadius: 1/2 * option.height
		});
		this.group.add( innerRect );

		var outerRect = new Konva.Rect({
			x: 0,
			y: 0,
			width: option.width,
			height: option.height,
			strokeWidth: option.strokeWidth,
			stroke: option.strokeColor,
			name: 'outerRect',
			cornerRadius: 1/2 * option.height
		});
		this.group.add( outerRect );

		var drawText = new Konva.Text({
			text: '努力加载中：0%',
			x: this.maxWidth / 2 - 14 * 3,
			y: -outerRect.height(),
			fontSize: 14,
			fontStyle: 'bold',
			fontFamily: '微软雅黑',
			align: 'center',
			name: 'txt'
		});
		this.group.add( drawText );
	},

	addToLayerOrGroup: function( layer ) {
		layer.add( this.group );
		this.drawLayer = layer;
	},

	changeValue: function( val ) {
		if(val > 1) {
			val /= 100;
		}
		var rect = this.group.findOne(".innerRect");
		// rect.width(this.maxWidth * val);
		rect.to({
			duration: .2,
			width: this.maxWidth * val
		});

		var txt = this.group.findOne('.txt');
		txt.text( '努力加载中：' + (val * 100+'').split('.')[0] + '%');

		this.drawLayer.batchDraw();
	}
};
