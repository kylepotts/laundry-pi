var SerialPort = require('serialport').SerialPort;
var serialPort = new SerialPort('/dev/ttyAMA0', {
	baudrate:9600
	});


serialPort.open(function(error){
	if(error){
		console.log('error to open: '+error);
	} else {
		console.log('open');
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

console.log('Hello');
