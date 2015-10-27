var raspi = require('raspi-io');
var five = require('johnny-five');
var board = new five.Board({
	io: new raspi()
});

// used for LCD Display 
var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort('/dev/ttyAMA0', {
	baudrate:9600
	});
	
	//https://www.parallax.com/sites/default/files/downloads/27979-Parallax-Serial-LCDs-Product-Guide-v3.1.pdf
	
	

board.on('ready',function(){
	console.log('ready');
	// simple things to draw
	var heart = [
		"01100110",
		"10011001",
		"10000001",
		"10000001",
		"01000010",
		"00100100",
		"00011000",
		"00000000"
	]
	
		var heart2 = [
		"11111111",
		"11111111",
		"11111111",
		"11111111",
		"11111111",
		"11111111",
		"11111111",
		"11111111"
	]
	
		var heart3 = [
		"10000000",
		"00000000",
		"00000000",
		"00000000",
		"00000000",
		"00000000",
		"00000000",
		"00000000"
	]
	
	// used for LED Matrix
	var matrix = new five.Led.Matrix({
		addresses:[0x70],
	    	controller:"HT16K33",
	    	rotation:3
	});
	
	serialPort.open(function(error){
	if(error){
		console.log('error to open: '+error);
	} else {
		console.log('open');
		serialPort.write(new Buffer([0x11]));
		serialPort.write(new Buffer([0x0C]));
		setTimeout(function(){},1500);
		serialPort.write('Hello Tylor');
		setTimeout(function(){
			serialPort.write(new Buffer([0x0C]));
			serialPort.write('Welcome to the matrix');
			for(i=0; i<5; i++){
				serialPort.write(new Buffer([0xDD,0xDE,0xDF]));
			}

		},1000);
		}
	});
	
	matrix.clear();
	
	setInterval(function(){
		var random = Math.floor(Math.random()*(3)+1);
		matrix.clear();
		if(random == 1){
			matrix.draw(heart);
		} else if(random == 2) {
			matrix.draw(heart2);
		} else if(random == 3) {
			matrix.draw(heart3);
		}
	},1000);
	
});

