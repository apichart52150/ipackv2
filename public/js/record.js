URL = window.URL || window.webkitURL;

let gumpStream, rec, input, audioContext;

let AudioContext = window.AudioContext || webkit.webkitAudioContext;

const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const loadBtn = document.getElementById('load');
const resetBtn = document.getElementById('reset');
const message = document.getElementById('message');

recordBtn.addEventListener('click', startRecording);

// Start Recording
function startRecording() {

    let constraints = { audio: true, video: false };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {

        audioContext = new AudioContext();

        gumpStream = stream;

        input = audioContext.createMediaStreamSource(stream);

        rec = new Recorder(input, {numChannels: 1});

        rec.record();
        
        startTime();
        recordBtn.classList.add('d-none');
        $('#icon').removeClass('d-none');

    }).catch(err => {
        $('#modalError').modal('show');
        recordBtn.disabled = false;
    });

}

// Stop Recording
function stopRecording() {

    rec.stop();
    stopTime();

    $('#icon').addClass('d-none');
    $("#counter").css("animation-play-state", "paused");
    $("#counter").html('00:00');

    loadBtn.classList.remove('d-none');
    resetBtn.classList.remove('d-none');
    recordingslist.classList.remove('d-none');
    message.classList.remove('d-none');

    gumpStream.getAudioTracks()[0].stop();

    rec.exportWAV(createDownloadLink);

}

// CreateLink
function createDownloadLink(blob) {

    blob.arrayBuffer()
        .then(data => {
            let audioData = data;
            let wav = lamejs.WavHeader.readHeader(new DataView(audioData));
            let samples = new Int16Array(audioData, wav.dataOffset, wav.dataLen / 2);
            encodeMP3(wav.channels, wav.sampleRate, samples);
        });

}

// Encode to MP3
function encodeMP3(channels, sampleRate, samples) {
    let buffer = [];
    let mp3enc = new lamejs.Mp3Encoder(channels, sampleRate, 128);
    let remaining = samples.length;
    let maxSamples = 1152;
    for (let i = 0; remaining >= maxSamples; i += maxSamples) {
        let mono = samples.subarray(i, i + maxSamples);
        let mp3buf = mp3enc.encodeBuffer(mono);
        if (mp3buf.length > 0) {
            buffer.push(new Int8Array(mp3buf));
        }
        remaining -= maxSamples;
    }
    let d = mp3enc.flush();
    if(d.length > 0){
        buffer.push(new Int8Array(d));
    }

    let blob = new Blob(buffer, {type: 'audio/mp3'});
    let bUrl = URL.createObjectURL(blob);
    let div = document.createElement('div');

    
    audioPlayer = document.createElement('audio');

    audioPlayer.src = bUrl;
    audioPlayer.controlsList = "nodownload";
    audioPlayer.controls = "controls";
    
    audioPlayer.classList.add('m-auto', 'w-100');

    div.classList.add('card', 'card-body', 'p-0', 'p-1');

    div.appendChild(audioPlayer);

    recordingslist.appendChild(div);

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
                // loadBtn.disabled = true;
            },
            complete: function(data){
                let msg = JSON.parse(data.responseText);
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

