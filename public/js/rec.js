URL = window.URL || window.webkitURL;

let gumStream, recorder, input, encodingType;
let encodeAfterRecord = true;

let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;

let fileType = "mp3";
const recordBtn = document.getElementById('recordBtn');
const loadBtn = document.getElementById('load');
const resetBtn = document.getElementById('reset');
const message = document.getElementById('message');
const spinnerAudio = document.getElementById('spinner-audio');

recordBtn.addEventListener("click", startRecording);

function startRecording() {
	console.log("startRecording() called");

	let constraints = { audio: true, video: false };

	navigator.mediaDevices.getUserMedia(constraints).then((stream) => {

		audioContext = new AudioContext();

		gumStream = stream;

		input = audioContext.createMediaStreamSource(stream);
        
		recorder = new WebAudioRecorder(input, {
			workerDir: "/isac_speaking/public/js/",
			encoding: fileType,
			numChannels: 2,
			onEncoderLoading: function(recorder, encoding) {
				recordBtn.classList.add('d-none');
				$('#icon').removeClass('d-none');
			},
		});

		recorder.onComplete = function(recorder, blob) { 
			createDownloadLink(blob,recorder.encoding);
		}

		recorder.setOptions({
		  timeLimit: 120,
		  encodeAfterRecord:encodeAfterRecord,
	      ogg: {quality: 0.5},
	      mp3: {bitRate: 160}
	    });

		recorder.startRecording();
		startTime();

	}).catch(err => {
		$('#modalError').modal('show');
        recordBtn.disabled = false;
	});
}

function stopRecording() {
	console.log('stopRecording() called');

	gumStream.getAudioTracks()[0].stop();

    stopTime();

    $('#icon').addClass('d-none');
    $("#counter").css("animation-play-state", "paused");
    $("#counter").html('00:00');

    recordingslist.classList.remove('d-none');

	recorder.finishRecording();
}

function createDownloadLink(blob,encoding) {
	
	let url = URL.createObjectURL(blob);
	let au = document.createElement('audio');
	let div = document.createElement('div');

	au.src = url;
    au.controlsList = "nodownload";
    au.controls = "controls";

	au.classList.add('m-auto', 'w-100');

    div.classList.add('card', 'card-body', 'p-0', 'p-1');

    div.appendChild(au);

    recordingslist.appendChild(div);

    spinnerAudio.classList.add('d-none');
    loadBtn.classList.remove('d-none');
    resetBtn.classList.remove('d-none');

	let queryString = location.pathname;
    queryString = queryString.split('/');

    let fd = new FormData();
    fd.append('audio_data', blob, queryString[3]);

    loadBtn.addEventListener('click', () => {
        $.ajax({
            type: "POST",
            url: "/isac_speaking/saveSound",
            data: fd,
            processData: false,
            contentType: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                //Download progress

                xhr.upload.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.floor(evt.loaded/evt.total * 100);
                        $('.progress-bar').css({
                            width: percentComplete + '%'
                        });
        
                        $('.progress-bar').attr('aria-valuenow', percentComplete)
                        $('.progress-bar').html(percentComplete + '%');
                    }
                }, false);

                xhr.addEventListener("progress", function (evt) {
                    if (evt.lengthComputable) {
                        var percentComplete = Math.floor(evt.loaded/evt.total * 100);
                        $('.progress-bar').css({
                            width: percentComplete + '%'
                        });
        
                        $('.progress-bar').attr('aria-valuenow', percentComplete)
                        $('.progress-bar').html(percentComplete + '%');
                    }
                }, false);
                return xhr;
            },
            beforeSend: function(evt) {
                $('#beforesend').removeClass('d-none');
                message.classList.remove('d-none');
                loadBtn.disabled = true;
            },
            complete: function(data){
                let msg = JSON.parse(data.responseText);
                console.log(msg);
                if(msg.success == "Upload success") {
                    setTimeout(() => {
                        let url = `${location.origin}/${queryString[1]}/submit/${queryString[3]}`;
                        location.href = url;
                    }, 500)
                }
            }
        })
    });
}

// Count Time
const time = 2;
let totalTime = time * 60;
let timer;

function setTime() {
    totalTime--;

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    $('#minutes').html('0' + minutes);
    $('#seconds').html(seconds < 10 ? '0' + seconds : seconds);

    if (totalTime <= 10) {
        $('#showCount').removeClass('bg-info');
        $('#showCount').addClass('breathing-color');
    }

    if (totalTime == 0) {
        stopRecording();
        stopTime();
        $("#showCount").css("animation-play-state", "paused");
    } 
}

function startTime() {
    timer = setInterval(setTime, 1000);
}

function stopTime() {
    clearInterval(timer);
}