var limit = "02:00";
var timer;
var parselimit = limit.split(":");
parselimit = parselimit[0] * 60 + parselimit[1] * 1; 

function begintimer(){
    
    if (parselimit==0) {

        rec.stop();

        $('#icon').addClass('d-none');

        $("#counter").css("animation-play-state", "paused");

        loadButton.classList.remove('d-none');
        resetButton.classList.remove('d-none');
        recordingslist.classList.remove('d-none');
        // Stop microphone access
        gumpStream.getAudioTracks()[0].stop();

        // create the wav blob and pass it on to createDownloadLink
        rec.exportWAV(createDownloadLink);

    } else {

        parselimit -= 1
        curmin = Math.floor(parselimit / 60);
        cursec = parselimit % 60;
        if (curmin != 0) {
            curtime = (curmin < 10 ? "0" : "") + curmin + ":" + (cursec < 10 ? "0" : "") + cursec
        } else {
            if(cursec == 0){
                curtime = "00:00";
            } else {
                curtime = "00" + ":" + (cursec < 10 ? "0" : "") + cursec;
            }
        }

        if(curmin < 1 && cursec < 10) {
            $('#counter').removeClass('bg-info');
            $('#counter').addClass('breathing-color');
        }

        $('#counter').html(curtime);
        
        timer = setTimeout(begintimer,1000);
	   
    }
}

function clearTime() {
     clearTimeout(timer);
}












