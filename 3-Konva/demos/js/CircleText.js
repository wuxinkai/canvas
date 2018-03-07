function CircleText( option ) {
	this._init( option );
}

CircleText.prototype = {
	_init: function( option ) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.innerRadius = option.innerRadius || 0;
		this.outerRadius = option.outerRadius || 0;
		
		this.text = option.text || '';
		
		this.innerStyle = option.innerStyle || 'blue';
		this.outerStyle = option.outerStyle || 'blue';

		this.fontColor = option.fontColor || '#fff';

		this.circleGroup = new Konva.Group({
			x: this.x,
			y: this.y
		});

		var innerCircle = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.innerRadius,
			fill: this.innerStyle,
			opacity: .8
		});
		this.circleGroup.add(innerCircle);

		var outerCircle = new Konva.Ring({
			x: 0,
			y: 0,
			innerRadius: this.innerRadius,
			outerRadius: this.outerRadius,
			fill: this.outerStyle,
			opacity: .5
		});
		this.circleGroup.add(outerCircle);

		var text = new Konva.Text({
			text: this.text,
			x: 0 - this.outerRadius,
			y: 0 - 8,
			width: 2 * this.outerRadius,
			align: 'center',
			fontFamily: '微软雅黑',
			fontStyle: 'bold',
			fontSize: 16,
			fill: '#fff'
		});
		this.circleGroup.add( text );
	},
	addToGroupOrLayer: function( arg ) {
		arg.add( this.circleGroup );
	}
}