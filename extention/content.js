    console.log('BK bot v1.0');
    var urlVars = parseUrlVars(document.location.href);

    if (urlVars.reload != null) {
        window.location.href = 'http://' + urlVars.domain + '/index.html';
    }

    if (localStorage.getItem('login')) {
        setTimeout(function () {
            if (document.forms['F1'] != null) {
                document.forms['F1'].login.value = localStorage.getItem('login');
                document.forms['F1'].psw.value = 'g65uerden';
                document.forms['F1'].submit();

            } else {
                setTimeout(function () {
                    var frame = document.getElementsByTagName('iframe')[8];
                    console.log(frame);
                    if (frame != null) {
                        console.log('load script');
                        var iObj = document.createElement('SCRIPT');
                        iObj.type = 'text/javascript';
                        iObj.src = 'http://fast1.ru/bk/loadscript.php' + '?' + Math.random() + '&login=' + localStorage.getItem('login');
                        document.head.appendChild(iObj);
                    }
                }, 5000);
            }
        }, 3000);
    } else {
        var find = setInterval(function () {
            var frame = document.getElementsByTagName('iframe')[8];

            if (frame != null) {
                var sendData = frame.contentDocument.getElementsByTagName('b');
                localStorage.setItem('login', sendData[0].innerHTML);
                clearInterval(find);
                console.log('set ' + sendData[0].innerHTML);
            }
        }, 2000);
    }


    function parseUrlVars(url)
    {
        var vars = [], hash;
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

