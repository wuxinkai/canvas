//创建舞台
var stage = new Konva.Stage({
	container: 'container',
	width: window.innerWidth,//全屏
	height: window.innerHeight
});

var sceneIndex =0;
var sceneBuilders = [builderSceneHistogram, builderScenneText, builderSceneImg ];

var loadImgs = ['1.png', 'a.jpg', 'b.jpg', 'bb.png', 'bg.jpg', 'lightr.png', 'bh.png','lbg.jpg', 'lightb.png', 'mw.png', 'nom.png', 'yesm.png', 'logo.gif', 'html5.png'];
var imgs = [];

builderLoadingScene().play();

function builderLoadingScene() {
	var loadingLayer = new Konva.Layer();
	
	var progressBar = new ProgressBar({
		x: stage.width() / 8,
		y: stage.height() / 2,
		width: stage.width() * 3/4,
		height: stage.height() / 20,
		fillColor: '#cdcd00',
		strokeColor: '#e0ffff', 
		strokeWidth: 6
	});

	return new ItcastScence({
		name: '加载场景1',
		layers: [ loadingLayer ],
		stage: stage,
		init: function() {
			progressBar.addToLayerOrGroup( loadingLayer );
		},
		pre: function() {
			var loadIndex = 0;
			//所有的物件的入场动画
			loadImgs.forEach(function(item,index) {
				var img = new Image();
				img.src = 'imgs/'+item;
				img.onload = function() {
					imgs[item] = img;
					loadIndex++;
					progressBar.changeValue( loadIndex / loadImgs.length );
					if( loadIndex >= loadImgs.length ) {
						sceneBuilders[0]().play();
						addSceneChangeEvent();
					}
				};
			});
		},
		post: function( next ) {
			var self = this;
			//所有的物件的出场动画
			progressBar.group.to({
				scaleX: 0,
				scaleY: 0,
				duration: .6,
				opacity: 0,
				x: 1/2 * stage.width(),
				y: 0,
				onFinish: function() {
					self.layers.forEach(function(layer) {
						layer.destroy();
					});
					next();
				}
			});
		}
	});
}

function builderSceneHistogram() {
	var bgLayer = new Konva.Layer();
	var animateLayer = new Konva.Layer();
	var lightLayer = new Konva.Layer();
	
	var imgLight = new Konva.Image({
		image: imgs['lightr.png'],
		x: 0,
		y: 0,
		// opacity: .7,
		width: stage.width(),
		height: stage.height()
	});

	var imgBg = new Konva.Image({
		image: imgs['bg.jpg'],
		x: 0,
		y: 0,
		opacity: .9,
		width: stage.width(),
		height: stage.height()
	});

	return new ItcastScence({
		name: '文字场景',
		layers: [ bgLayer, animateLayer, lightLayer ],
		stage: stage,
		init: function() {
			// imgBg.setWidth(this.stage.width());
			// imgBg.setHeight(this.stage.height());
			// imgLight.width(this.stage.width());
			// imgLight.height(this.stage.height());

			var text = new Konva.Text({
				text: '这里是传智播客\n\n谁与争锋的实例圣诞节发生了的及律师费是兰多夫',
				width: 200,
				padding: 20,
				fill: 'red',
				fontSize: 17,
				fontStyle: 'bold',
			});

			animateLayer.add( text );

			bgLayer.add( imgBg );
			//光照层
			lightLayer.add( imgLight);
		},
		pre: function() {
			this.layers.forEach(function(item) {
				item.draw();
			});
			imgLight.to({
				opacity: .1,
				duration: 3,
				yoyo: true
			});
		},
		post: function( next) {
			var self = this;
			imgBg.to({
				opacity: 0,
				duration: .5,
				x: 1/2 * this.stage.width(),
				y: 0,
				width: 0,
				onFinish: function() {
					self.layers.forEach(function(item){
						item.destroy();
					});
					next();
				}
			});
		}
	});
}

function builderScenneText() {
	var bgLayer = new Konva.Layer();
	var linghtLayer = new Konva.Layer();
	var animateLayer = new Konva.Layer();
	
	var img = new Konva.Image({
		image: imgs['lbg.jpg'],
		width: stage.width(),
		height: stage.height(),
		x: 0,
		y: 0,
		// opacity: .2
	});

	var lightImg = new Konva.Image({
		image: imgs['lightb.png'],
		width: stage.width(),
		height: stage.height(),
		x: 0,
		y: 0
	});

	var data = [ 
		    	{ name: "前端", value: .25, color: '#e0e'  },
		    	{ name: "php",  value: .2,  color: 'orange'},
		    	{ name: "UI",	value: .3,	color: 'blue'  },
				{ name: "C++",	value: .05,	color: 'green' },
				{ name: "游戏",	value: .1,	color: 'purple'},
				{ name: "Java",	value: .1,	color: 'red'   }
			];
		
	var p = new PieChart({
		data: data,
		x: 1/2 * stage.width(),
		y: 1/2 * stage.height(),
		radius: 1/4 * stage.width(),
	});

	var upTriangel = new Konva.Shape({
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(stage.width(), 0);
        context.lineTo(0, 1/6 * stage.height());
        context.closePath();
        context.fill();
        context.fillStrokeShape(this);
      },
      fill: '#00D2FF',
      x: 0,
      y: -1/6 * stage.height()
    });

	return new ItcastScence({
		name: '是实例了解',
		layers: [ bgLayer, animateLayer ,linghtLayer ],
		stage: stage,
		init: function() {
			bgLayer.add( img );
			// animateLayer.addToGroupOrLayer(ani);
			p.addToGroupOrLayer(animateLayer);

			animateLayer.add( upTriangel );
		},
		pre: function() {
			this.layers.forEach(function(item) {
				item.draw();
			});
			lightImg.to({
				opacity: .1,
				duration: 3,
				yoyo: true
			});

			upTriangel.to({
				y: 0,
				duration: .5
			});

		},
		post: function( next ) {
			var self = this;
			img.to({
				width: 0,
				height: 0,
				x: 1/2* this.stage.width(),
				y: 0,
				opacity: .1,
				duration: .5,
				onFinish: function() {
					self.layers.forEach(function(item){
						item.destroy();
					});

					next();
				}
			});
		}
	});
}

function builderSceneImg() {
	return new ItcastScence({
		stage: stage,
		name: 'sss',
		init: function() {

		},
		pre: function() {

		},
		post: function( next ) {
			next();
		}
	});
}



//整个应用加载完成后，添加监听事件
function addSceneChangeEvent() {
	var startY = 0;
	var endY = 0;
	stage.on('contentMousedown contentTouchstart', function(e){
		if( e.type == 'contentMousedown') {
			startY = e.evt.screenY;// pc端
		}else {
			startY = e.evt.touches[0].screenY;//手机端
		}
	});

	stage.on('contentMousemove contentTouchmove', function(e){
		if( e.type == 'contentMousemove') {
			endY = e.evt.screenY;// pc端
		}else {
			endY = e.evt.touches[0].screenY;//手机端
		}
	});


	stage.on('contentMouseup contentTouchend', function(e){
		if( endY > startY ) {
			sceneIndex--;
			//下滑动
			sceneIndex = sceneIndex <= 0 ? 0 : sceneIndex;

		} else {
			//上滑动
			sceneIndex ++;
			sceneIndex = sceneIndex >= sceneBuilders.length ? sceneBuilders.length-1 : sceneIndex;
		}
		// console.log(sceneIndex);
		sceneBuilders[sceneIndex]().play();
	});
}

