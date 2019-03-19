
$(function () {
	//make connection
	var socket = io.connect('/')
	var display = $("#display")
	var simulasi = $("#simulasi")
	var satuan = $("#satuan")
	var address = $("#vaddress")
	var cAuto = $("#vAuto")
	var cLive = $("#vLive")

	//var data = document.getElementById("display").textContent;

	//Simulasi Emit
	simulasi.click(function () {
		socket.emit("berat", { start: "start" })

	})

	//Tampilkan message
	socket.on('berat', data => {
		display.html(data.hasil),
			satuan.html(data.satuan),
			address.html(data.ipaddress)
	})

	//Tampilkan list
	socket.on('ViewSimpan', data => {
		var node = document.createElement("LI");
	})


	cAuto.click(function () {
		var cMin = document.getElementById('vMin').value;
		var cMax = document.getElementById('vMax').value;
		if (cMin == "" || cMax == "") {
			alert("Tidak Boleh Kosong")
			return false
		}
		else if (cMin >= cMax || cMax <= cMin) {
			alert("Periksa Masukkan")
		}
		else if (cMin < 1) {
			alert("Tidak boleh lebih kecil dari 1")
		}
		else {
			alert(cMin)
			socket.emit("mAuto", { mHitung: 'Start', mMin: cMin, mMax: cMax })
		}
	})

	cLive.click(function () {
		var cMin = document.getElementById('vMin').value;
		var cMax = document.getElementById('vMax').value;
		if (cMin == "" || cMax == "") {
			alert("Tidak Boleh Kosong")
			return false
		}
		else if (cMin >= cMax || cMax <= cMin) {
			alert("Periksa Masukkan")
		}
		else if (cMin < 1) {
			alert("Tidak boleh lebih kecil dari 1")
		}
		else {
			alert(cMin)
			socket.emit("mAuto", { mHitung: 'Start', mMin: cMin, mMax: cMax })
		}
	})

	//Tampilkan message
	socket.on('mAuto', data => {
		display.html(data.hasil),
			satuan.html(data.satuan),
			address.html(data.ipaddress)
	});


	// Pemicu
	socket.emit("ip");

	// Menerima data dari server
	socket.on('hasil', data => {
		address.html(data)
	})
});

//Push
$(function () {
	// Enable pusher logging - don't include this in production
	Pusher.logToConsole = true;

	var pusher = new Pusher('428b5fc4e48a2f8e0131', {
		cluster: 'ap1',
		forceTLS: true
	});

	var channel = pusher.subscribe('my-channel');
	channel.bind('my-event', function (data) {
		alert(JSON.stringify(data));
	});


	cAuto.click(function () {
		var cMin = document.getElementById('vMin').value;
		var cMax = document.getElementById('vMax').value;
		if (cMin == "" || cMax == "") {
			alert("Tidak Boleh Kosong")
			return false
		}
		else if (cMin >= cMax || cMax <= cMin) {
			alert("Periksa Masukkan")
		}
		else if (cMin < 1) {
			alert("Tidak boleh lebih kecil dari 1")
		}
		else {
			alert(cMin);
			pusher.trigger('mData', 'mAuto', {
				"mHitung": 'Start', "mMin": cMin, "mMax": cMax
			})
		}
	})
})

//Fungsi simpan berat di list
function myFunction() {
	var node = document.createElement("LI");
	// node.className = "list-group-item";
	node.classList.add('list-group-item')
	var data = document.getElementById("display").textContent;
	var textnode = document.createTextNode(data);
	node.appendChild(textnode);
	document.getElementById("myList").appendChild(node);
}