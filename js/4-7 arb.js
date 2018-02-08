var UPDATE_COUNT = 0;

function startBattle() {
    var click = setInterval(function() {
        console.log('interval click');
        $('.UserBattleCommit').click();
    }, 4000);

    var useSkill = setInterval(function() {
        $('.UserBattleMethod').each(
            function() {
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/preparation.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/defence_bestposition.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/attack_strongshot.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/attack_bloodflow.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/attack_ragecounter.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/spirit_13_prot_100.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/hp_enrage.gif') {
                    $(this).click();
                }
                if ($(this).find('img').attr('src') == 'http://img.combats.ru/i/misc/icons/hp_defence.gif') {
                    $(this).click();
                }
            }
        );
    }, 1000);
    var kick = setInterval(function() {
        console.log('interval kick');
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
    for (var i = 1; i < interval_id; i++)
        window.clearInterval(i);
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
                        battleChecks = $(frame).contents().find('[src="http://img.combats.ru/i/fighttype2.gif"]').last().prevAll('[name="gocombat"]');

                    $.each(battleChecks, function(i, element){
                        if ($(element).next().next().text().match(/"\d"/) != null) {
                            var battleLevel = $(element).next().next().text().match(/"\d"/)[0].replace(/"/g, "");
                            if (parseInt(battleLevel) == myLevel) {
                                console.log(battleLevel + ' good');
                                $(element).click();
                                $(frame).contents().find('[name="confirm1"]').click();
                                return false;
                            }
                            console.log(battleLevel + ' bad');
                        } else {
                            console.log(battleLevel + 'Сраный призовой хаот');
                        }
                    });
                }, 2000);

                var update = setInterval(function () {
                    console.log('interval update => ' + UPDATE_COUNT);
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
                        }, 10000);
                    }
                }, 4000);
            }, 2000);
        }, 2000);
    }, 1000);


}

function stopBattle() {
    var frame = document.getElementsByTagName('iframe')[8];

    var interval_id = window.setInterval(function () {}, 9999); // Get a reference to the last
    // interval +1
    for (var i = 1; i < interval_id; i++)
        window.clearInterval(i);
    //for clearing all intervals

    var timeout_id = window.setTimeout(function () {}, 9999); // Get a reference to the last
    // timeout +1
    for (var i = 1; i < timeout_id; i++)
        window.clearTimeout(i);
    //for clearing all timeout

    $(frame).attr('src', 'main.pl?top=' + Math.random());
}

function goToRepairHouse() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', '/main.pl?edit=1&rand=' + Math.random());

    setTimeout(function () {
        $(frame).contents().find('a:contains(\'Надеть "null"\')')[0].click();

        setTimeout(function () {
            $(frame).attr('src', 'main.pl?top=' + Math.random());

            setTimeout(function () {
                $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/dream_warriors_hall_door.gif"]')[0].click();

                setTimeout(function () {
                    $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_all_arrow_2.png"]')[0].click();

                    setTimeout(function () {
                        if ($(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_strash_repair.gif"]')[0] != null) {
                            $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_strash_repair.gif"]')[0].click();
                        } else if ($(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/night/drm_street_strash_repair.gif"]')[0] != null) {
                            $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/night/drm_street_strash_repair.gif"]')[0].click();
                        }

                        setTimeout(function () {
                            $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/dream_middle_repair_bot.gif"]')[0].click();

                            setTimeout(function () {
                                $(frame).contents().find('[src="http://img.combats.com/i/misc/dialog_repair.gif"]')[0].click();
                                setTimeout(function () {
                                    repairItems();
                                }, 2000);
                            }, 1000);
                        }, 1000);
                    }, 18000);
                }, 18000);
            }, 1000);
        }, 1000);
    }, 1000);
}

function goToShop() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', 'main.pl?top=' + Math.random());

    setTimeout(function () {
        $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/dream_warriors_hall_door.gif"]')[0].click();

        setTimeout(function () {
            $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_all_arrow_2.png"]')[0].click();
                            setTimeout(function () {
                                if ($(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_strash_shop.gif"]')[0] != null) {
                                    $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_strash_shop.gif"]')[0].click();
                                } else if ($(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/night/drm_street_strash_shop.gif"]')[0] != null) {
                                    $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/night/drm_street_strash_shop.gif"]')[0].click();
                                }

                                setTimeout(function () {
                                    $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/dream_middle_shop_bot.gif"]')[0].click();

                                    setTimeout(function () {
                                        $(frame).attr('src', '/main.pl?move_dialog=1&' + Math.random());

                                        setTimeout(function () {
                                            $(frame).attr('src', '/shop.pl?otdel7=1&sid=&' + Math.random());

                                            setTimeout(function () {
                                                $(frame).contents().find('[onclick="return buy_for_teeth(this);"]').last()[0].click();

                                                setTimeout(function () {
                                                $(frame).attr('src', '/main.pl?edit=9&' + Math.random());
                                                    setTimeout(function () {
                                                        $(frame).contents().find('a:contains(\'исп-ть\')')[0].click();
                                                        setTimeout(function () {
                                                            $(frame).contents().find('[name="tmpname423"]')[0].click();
															setTimeout(function () {
															$(frame).attr('src', '/shop.pl?otdel7=1&sid=&' + Math.random());

																setTimeout(function () {
																	returnBattleHouse();
																}, 2000);
                                                            }, 2000);
                                                        }, 1000);
                                                    }, 2000);
                                                }, 4000);
                                            }, 2000);
                                        }, 2000);
                                    }, 1000);
                                }, 1000);
                            }, 18000);
        }, 18000);
    }, 1000);
}

function repairItems() {
    var frame = document.getElementsByTagName('iframe')[8];
    var repairLinks = $(frame).contents().find('a:contains(\'Полный ремонт\')');

    if (repairLinks != null && repairLinks.length > 0) {
        $(repairLinks[0]).next()[0].click();
        setTimeout(
            function () {
                console.log('repair' + Math.random());
                repairItems();
            },
            2000
        )
    } else {
        console.log('return');
        returnBattleHouse();
    }
}

function returnBattleHouse() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).contents().find('[onclick="return check_access();"]')[0].click();

    setTimeout(function () {
        $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_all_arrow_8.png"]')[0].click();

        setTimeout(function () {
            if ($(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_central_bk.gif"]')[0] != null) {
                $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/drm_street_central_bk.gif"]')[0].click();
            } else if ($(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/night/drm_street_central_bk.gif"]')[0] != null) {
                $(frame).contents().find('[src="http://img.combats.ru/i/images/subimages/night/drm_street_central_bk.gif"]')[0].click();
            }
            setTimeout(function () {
                $(frame).attr('src', '/main.pl?edit=1&rand=' + Math.random());

                setTimeout(function () {
                    $(frame).contents().find('a:contains(\'Надеть "full"\')')[0].click();

                    setTimeout(function () {
                        inviteBattle();
                    }, 2000);
                }, 1000);
            }, 1000);
        }, 18000);
    }, 18000);
}

function serverListener() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', 'main.pl?top=' + Math.random());
    setTimeout(function () {
        var sendData = $(frame).contents().find('b'),
            login = $(sendData[0]).text(),
            iznos = $(frame).contents().find('img:[height="40"]'),
            travma1 = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/eff_travma1.gif"]'),
            travma2 = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/eff_travma2.gif"]'),
            travma3 = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/eff_travma3.gif"]'),
            chokolateImage = $(frame).contents().find('[src="http://img.combats.ru/i/misc/icons/ny2013_chocolate.gif"]'),
            travma = false,
            chokolate = false,
            exp = (parseInt($(sendData[1]).text().replace(/\s+/g,'')) > 0) ? $(sendData[1]).text() : $(sendData[2]).text();

        if (travma1.attr('src') != null) {
            travma = encodeURIComponent(travma1.attr('src'));
        }
        if (travma2.attr('src') != null) {
            travma = encodeURIComponent(travma2.attr('src'));
        }
        if (travma3.attr('src') != null) {
            travma = encodeURIComponent(travma3.attr('src'));
        }
        if (chokolateImage.attr('src') != null) {
            chokolate = encodeURIComponent(chokolateImage.attr('src'));
        }
        if (iznos[0] != null) {
            iznos = encodeURIComponent(iznos[0].title);
        } else {
            iznos = '0/0'
        }

        var iObj = document.createElement('SCRIPT');
        iObj.type = 'text/javascript';
        iObj.src = 'http://fast1.ru/bk/' + '?' + Math.random() + '&login=' + login + '&exp=' + exp + '&travma=' + travma + '&iznos=' + iznos + '&chokolate=' + chokolate;
        document.head.appendChild(iObj);
    }, 2000);
}

function cure() {
    var frame = document.getElementsByTagName('iframe')[8];
    $(frame).attr('src', '/main.pl?edit=2&rand=' + Math.random());
    setTimeout(function () {
        $(frame).contents().find('a:contains(\'исп-ть\')')[0].click();
        setTimeout(function () {
            $(frame).contents().find('[name="tmpname423"]')[0].click();
        }, 1000);
    }, 2000);

}

function cureCommand() {
    cure();
}

function chokolate() {
	var frame = document.getElementsByTagName('iframe')[8];
	setTimeout(function () {
        $(frame).attr('src', '/main.pl?edit=9&' + Math.random());
        setTimeout(function () {
            $(frame).contents().find('a:contains(\'исп-ть\')')[0].click();
                setTimeout(function () {
                    $(frame).contents().find('[name="tmpname423"]')[0].click();
					setTimeout(function () {
						$(frame).attr('src', 'main.pl?top=' + Math.random());
					}, 1000);
                }, 1000);
        }, 2000);
    }, 1000);
}

function hpCommand() {
    stopBattle();
    goToShop();
}

function repairCommand() {
    stopBattle();
    goToRepairHouse();
}

function battleCommand() {
    inviteBattle();
}


inviteBattle();