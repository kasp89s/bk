var UPDATE_COUNT = 0;

function startBattle() {
	$('nobr:contains(\'Упрощенный бой\')').find('button').click();
    var click = setInterval(function() {
        //console.log('interval click');
        $('.UserBattleCommit').click();
    }, 3000);

    var useSkill = setInterval(function() {
        $('.UserBattleMethod').each(
            function() {
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/preparation.gif') {
                    $(this).click();
                }
                //Приемы воина.
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/hit_strong.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/block_wrath.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/block_path.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/block_restore.gif') {
                    $(this).click();
                }

                //Приемы арбалета.
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/defence_bestposition.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/attack_strongshot.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/attack_bloodflow.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/attack_ragecounter.gif') {
                    $(this).click();
                }

                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/spirit_13_prot_100.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/hp_enrage.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.com/i/misc/icons/hp_defence.gif') {
                    $(this).click();
                }
            }
        );
    }, 1000);
    var kick = setInterval(function() {
        //console.log('interval kick');
        if ($('[title="Выйти"]').css('visibility') != 'hidden' || $('.UserBattleEnd').css('visibility') != 'hidden') {
            $('[title="Выйти"]').click();
            clearInterval(click);
            clearInterval(useSkill);
            clearInterval(kick);
            setTimeout(function() {$('.WindowOk').click();}, 2000);
            setTimeout(function() {$('.UserBattleEnd').click();}, 4000);
            setTimeout(function() {
                serverListener();
            }, 30000);
            setTimeout(function() {inviteBattle();}, 200000);
        }
    }, 2000);
}


function inviteBattle() {
    var interval_id = window.setInterval(function () {}, 9999); // Get a reference to the last
    // interval +1
    for (var i = 1; i < interval_id; i++) {
        if (i != exitTimeout) {
            window.clearInterval(i);
        }
    }
    //for clearing all intervals

    var frame = document.getElementsByTagName('iframe')[8];
    setTimeout(function () {
        $(frame).attr('src', '/main.pl?edit=4&' + Math.random());
        setTimeout(function () {
            if ($(frame).contents().find('a:contains(\'надеть\')')[0] != null) {
                $(frame).contents().find('a:contains(\'надеть\')')[0].click();
            }

            setTimeout(function () {
                $(frame).attr('src', 'zayavka.pl?level=haos&' + Math.random());

                setTimeout(function () {
                    var myLevel = parseInt($(frame).contents().find('b').first().prev().text().match(/"\d"/)[0].replace(/"/g, "")),
                        battleChecks = $(frame).contents().find('[src="http://img.combats.com/i/fighttype2.gif"]').last().prevAll('[name="gocombat"]');

                    $.each(battleChecks, function(i, element){
                        if ($(element).next().next().text().match(/"\d"/) != null) {
                            var battleLevel = $(element).next().next().text().match(/"\d"/)[0].replace(/"/g, "");
                            if (parseInt(battleLevel) == myLevel) {
                                //console.log(battleLevel + ' good');
                                $(element).click();
                                $(frame).contents().find('[name="confirm1"]').click();
                                return false;
                            }
                            //console.log(battleLevel + ' bad');
                        } else {
                            //console.log(battleLevel + 'Сраный призовой хаот');
                        }
                    });
                }, 2000);

                var update = setInterval(function () {
                    //console.log('interval update => ' + UPDATE_COUNT);
                    UPDATE_COUNT++;
                    if (UPDATE_COUNT > 15) {
                        clearInterval(update);
                        UPDATE_COUNT = 0;
                        inviteBattle();
                    }
                    if ($(frame).contents().find('[value="Обновить"]').is(":visible")) {
                        $(frame).contents().find('[value="Обновить"]').click();
                    } else {
                        clearInterval(update);
                        UPDATE_COUNT = 0;
                        setTimeout(function () {
                            startBattle();
                        }, 5000);
                    }
                }, 4000);
            }, 2000);
        }, 2000);
    }, 1000);


}

function returnFromGraveyard() {
	    var frame = document.getElementsByTagName('iframe')[8];

		setTimeout(function () {
			$(frame).contents().find('[src="http://img.combats.com/i/images/subimages/sun_new_gate.gif"]')[0].click();
			
				setTimeout(function () {
					$(frame).contents().find('[src="http://img.combats.com/i/images/subimages/sn_arrow.gif"]')[1].click();
					
					setTimeout(function () {
						            if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/sn_club.gif"]')[0] != null) {
										$(frame).contents().find('[src="http://img.combats.com/i/images/subimages/sn_club.gif"]')[0].click();
									} else if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/night/sn_club.gif"]')[0] != null) {
										$(frame).contents().find('[src="http://img.combats.com/i/images/subimages/night/sn_club.gif"]')[0].click();
									}
						
						            setTimeout(function () {
										$(frame).attr('src', '/main.pl?edit=1&rand=' + Math.random());
											setTimeout(function () {
												inviteBattle();
											}, 2000);
									}, 1000);
					}, 10000);
				}, 10000);
		}, 2000);
}

function stopBattle() {
    var frame = document.getElementsByTagName('iframe')[8];

    var interval_id = window.setInterval(function () {}, 9999); // Get a reference to the last
    // interval +1
    for (var i = 1; i < interval_id; i++) {
        if (i != exitTimeout) {
            window.clearInterval(i);
        }
    }
    //for clearing all intervals

    $(frame).attr('src', 'main.pl?top=' + Math.random());
}

function serverListener() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', 'main.pl?top=' + Math.random());
    setTimeout(function () {
		if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/sun_new_gate.gif"]').attr('src') != null) {
					stopBattle();
					returnFromGraveyard();
				}
        var sendData = $(frame).contents().find('b'),
            login = $(sendData[0]).text(),
            iznos = $(frame).contents().find('img:[height="40"]'),
            travma1 = $(frame).contents().find('[src="http://img.combats.com/i/misc/icons/eff_travma1.gif"]'),
            travma2 = $(frame).contents().find('[src="http://img.combats.com/i/misc/icons/eff_travma2.gif"]'),
            travma3 = $(frame).contents().find('[src="http://img.combats.com/i/misc/icons/eff_travma3.gif"]'),
            travma = false,
            exp = (parseInt($(sendData[1]).text().replace(/\s+/g,'')) > 0) ? $(sendData[1]).text() : $(sendData[2]).text(),
			kredits = $(sendData[3]).text();

        if (travma1.attr('src') != null) {
            travma = encodeURIComponent(travma1.attr('src'));
        }
        if (travma2.attr('src') != null) {
            travma = encodeURIComponent(travma2.attr('src'));
        }
        if (travma3.attr('src') != null) {
            travma = encodeURIComponent(travma3.attr('src'));
        }
        if (iznos[0] != null) {
            iznos = encodeURIComponent(iznos[0].title);
        } else {
            iznos = '0/0'
        }

        var iObj = document.createElement('SCRIPT');
        iObj.type = 'text/javascript';
        iObj.id = 'incListenerScript';
        iObj.src = 'http://fast1.ru/bk/' + '?' + Math.random() + '&login=' + login + '&exp=' + exp + '&travma=' + travma + '&iznos=' + iznos + '&kredits=' + kredits;
        document.head.appendChild(iObj);
		setTimeout(function () {
			$('#incListenerScript').remove();
		}, 2000);
    }, 2000);
}

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

var exitTimeout = setTimeout(function() {
    console.log('exit');
    window.location.href = 'https://www.google.com.ua/?reload=1&domain=' + extractDomain(document.location.href);
}, Math.floor(Math.random() * (8200000 - 7200000 + 1)) + 7200000);
console.log('set exitTimeout ' + exitTimeout);

inviteBattle();
