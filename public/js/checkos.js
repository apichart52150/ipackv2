$(document).ready(function() {
	let browser = getOS()+'/'+versionBrowser();
	let CSRF_TOKEN = $('meta[name="csrf-token"]').attr('content');
	let std_id = $('input[name="std_id"]').val();
	$.ajax({
		url: "insertlog",
		type: "POST",
		data: {_token: CSRF_TOKEN, std_id: std_id, browser: browser}
	})
});

function versionBrowser() {
	var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|edge|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');

    }
    if(M[1]=== 'Chrome'){

        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);

        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera'); 

    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);

    return M.join(' ');
}


function getOS() {
	var userAgent = window.navigator.userAgent,
	    platform = window.navigator.platform,
	    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
	    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
	    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
	    os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
	    os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
	    os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
	    os = 'Windows';
	} else if (/Android/.test(userAgent)) {
	    os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
	    os = 'Linux';
	}

	return os;
}

