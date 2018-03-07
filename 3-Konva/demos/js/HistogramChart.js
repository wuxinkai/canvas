function HistogramChart( option ) {
	this._init( option );
}

HistogramChart.prototype = {
	_init: function( option ) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.w = option.w || 0;
		this.h = option.h || 0;

		this.data = option.data || [];


		this.group = new Konva.Group({
			x: this.x,
			y: this.y,
		});

		//创建底线
		var bottomLine = new Konva.Line({
			points: [0,0, this.w, 0],
			stroke: 'lightgreen',
			strokeWidth: 1,
			opacity: .9,
			lineCap: 'round'
		});
		this.group.add(bottomLine);

		this.rectGroup = new Konva.Group({
			x: 0,
			y: 0,
		});

		this.group.add( this.rectGroup );

		this.textTopGroup = new Konva.Group({
			x: 0,
			y: 0
		});
		this.group.add( this.textTopGroup );

		var rectW = this.w / this.data.length;
		var maxH = this.h;
		var data = this.data;
		var self = this;
		data.forEach(function(item, index){
			var rectData = new Konva.Rect({
				x: rectW*(index + 1/4),
				y: -data[index].value * maxH,
				cornerRadius: 5,
				width: 1/2 * rectW,
				height: data[index].value * maxH,
				fill: data[index].color,
				opacity: .6,
				shadowBlur: 20,
				shadowColor: data[index].color,
				shadowOpacity: .3,
				shadowOffsetX: 3,
				shadowOffsetY: 3,
			});
			self.rectGroup.add( rectData );

			var text = new Konva.Text({
				x: rectW * (index + .25),
				y: 5,
				rotation: 30,
				text: data[index].name,
				fill: data[index].color,
				fontSize: 14,
			});
			self.group.add(text);

			var topText = new Konva.Text({
				x: rectW * index,
				y: -data[index].value * maxH - 14, 
				fontSize: 14,
				text: data[index].value*100 + '%',
				width: rectW,
				align: 'center'
			});
			self.textTopGroup.add( topText );
			// layer.add( topText );		
		})
	},
	addToGroupOrLayer: function( arg ) {
		arg.add( this.group );
	},
	playAnimate: function() {
		var self = this;
		this.rectGroup.getChildren().each(function(item, i){
			var oldY = -self.data[i].value * self.h;
			var oldHeight = self.data[i].value * self.h;
			var oldCornerRadius = 5;
			item.y(0);
			item.height(0);
			item.cornerRadius(0);
			item.to({
				y: oldY,
				height: oldHeight,
				cornerRadius: oldCornerRadius,
				duration: 1,
				easing: Konva.Easings.StrongEaseIn
			});
		});

		this.textTopGroup.getChildren().each(function(el, i) {
			var oldY = -self.data[i].value * self.h - 14;
			el.y(-14);
			el.to({
				y: oldY,
				duration: 1,
				easing: Konva.Easings.StrongEaseIn
			});
		});	
	}
}