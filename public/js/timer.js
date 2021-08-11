var limit="01:20";
var parselimit = limit.split(":");
parselimit = parselimit[0] * 60 + parselimit[1] * 1; 


function begintimer(){

    if (parselimit == 0) {

        let queryString = location.pathname;
        queryString = queryString.split('/');
    
        let url = `${location.origin}/${queryString[1]}/record/${queryString[3]}`;
        location.href = url;

    } else {
      
        parselimit -= 1
        curmin = Math.floor(parselimit / 60);
        cursec = parselimit % 60;

        if (curmin != 0) {
            curtime=(curmin < 10 ? "0" : "") + curmin + ":" + (cursec < 10 ? "0" : "") + cursec
        } else {
            if(cursec == 0){
                curtime = "00:00";
            } else {
                curtime = "00" + ":" + (cursec < 10 ? "0" : "") + cursec;
            }
        }
      
        $('#counter').html(curtime);
        setTimeout("begintimer()",1000)
    }
}

