window.alert = function() {
    console.log.apply(console, arguments);
};

var frame = document.getElementsByTagName('iframe')[8],
    answer = [1, 0, 0, 2, 0, 0, 3, 1, 0, 1, 2, 0, 3, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 2, 1, 0, 1],
    step = 0;


var questInterval = setInterval(
    function () {
        if (answer[step] != null) {
            $(frame).attr('src', '/main.pl?move_dialog=' + answer[step]+ '&' + Math.random());
            step++;
        } else {
            clearInterval(questInterval);
            setTimeout(function () {
                buyNoobieItems();
            }, 5000);
        }
    },
    1000
);

function buyNoobieItems() {
    // Попали в магазин.
    $(frame).contents().find('a:contains(\'купить\')')[7].click();
    setTimeout(function () {
        $(frame).contents().find('a:contains(\'купить\')')[10].click();

        setTimeout(function () {
            $(frame).attr('src', '/shop2.pl?rnd=' + Math.random() + '&path=m5');

            setTimeout(function () {
                $(frame).contents().find('[coords="79,24,273,195"]').click();
                setTimeout(function () {
                    $(frame).contents().find('[coords="79,24,273,195"]').click();
                    // Попали в игру.
                    setTimeout(function () {
                        useNoobieItems();
                    }, 10000);
                }, 3000);
            }, 5000);
        }, 5000);
    }, 5000);

}

function useNoobieItems() {
    $(frame).attr('src', '/main.pl?edit=9&' + Math.random());

    setTimeout(function () {
        $(frame).contents().find('a:contains(\'исп-ть\')')[0].click();

        setTimeout(function () {
            $(frame).contents().find('[name="tmpname423"]')[0].click();

            setTimeout(function () {
                $(frame).contents().find('a:contains(\'исп-ть\')')[0].click();

                setTimeout(function () {
                    $(frame).contents().find('[name="tmpname423"]')[0].click();
                    setTimeout(function () {
                        setSkills();
                    }, 5000);
                }, 1000);
            }, 5000);
        }, 1000);
    }, 2000);

}

function setSkills() {
    $(frame).attr('src', 'main.pl?skills=1&side=1&' + Math.random());
    setTimeout(function () {
        for (var i = 0; i < 20; i++) {
            $(frame).contents().find('#plus_dex').click();
        }
        setTimeout(function () {
            $(frame).contents().find('[onclick="ChangeButtonState(0)"]').click();
            $(frame).contents().find('#save_button0').click();

            setTimeout(function () {
                for (var i = 0; i < 20; i++) {
                    $(frame).contents().find('#plus_m_sword').mouseup();
                }

                setTimeout(function () {
                    $(frame).contents().find('[onclick="ChangeButtonState(1)"]').click();
                    $(frame).contents().find('#save_button1').click();

                    setTimeout(function () {
                        $(frame).contents().find('#L4').click();

                        setTimeout(function () {
                            $(frame).contents().find('[src="http://img.combats.com/i/misc/icons/novice_hit.gif"]').click();
                            setTimeout(function () {
                                $(frame).contents().find('[src="http://img.combats.com/i/misc/icons/hit_strong.gif"]').click();
                                setTimeout(function () {
                                    $(frame).contents().find('[src="http://img.combats.com/i/misc/icons/block_activeshield.gif"]').click();
                                    setTimeout(function () {
                                        goToShop();
                                    }, 2000);
                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 2000);
                }, 1000);
            }, 4000);
        }, 1000);
    }, 2000);
}

function goToShop() {
    $(frame).attr('src', 'main.pl?top=' + Math.random());

    setTimeout(function () {
        $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/dream_warriors_hall_door.gif"]')[0].click();

        setTimeout(function () {
            $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/drm_street_all_arrow_2.png"]')[0].click();

            setTimeout(function () {
                $(frame).attr('src', '/main.pl?move_dialog=1&' + Math.random());

                setTimeout(function () {
                    $(frame).attr('src', '/main.pl?move_dialog=1&' + Math.random());
                    setTimeout(function () {
                        $(frame).attr('src', '/main.pl?move_dialog=0&' + Math.random());

                        setTimeout(function () {
                            $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/drm_street_all_arrow_2.png"]')[0].click();
                            setTimeout(function () {
                                if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/drm_street_strash_shop.gif"]')[0] != null) {
                                    $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/drm_street_strash_shop.gif"]')[0].click();
                                } else if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/night/drm_street_strash_shop.gif"]')[0] != null) {
                                    $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/night/drm_street_strash_shop.gif"]')[0].click();
                                }

                                setTimeout(function () {
                                    $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/dream_middle_shop_bot.gif"]')[0].click();

                                    setTimeout(function () {
                                        $(frame).attr('src', '/main.pl?move_dialog=1&' + Math.random());

                                        setTimeout(function () {
                                            $(frame).attr('src', '/shop.pl?otdel1=1&sid=&' + Math.random());

                                            setTimeout(function () {
                                                $(frame).contents().find('[onclick="return buy_for_teeth(this);"]')[3].click();

                                                setTimeout(function () {
                                                    $(frame).attr('src', '/shop.pl?otdel1=1&sid=&' + Math.random());

                                                    setTimeout(function () {
                                                        $(frame).contents().find('[onclick="return buy_for_teeth(this);"]')[3].click();

                                                        setTimeout(function () {
                                                            $(frame).attr('src', '/shop.pl?otdel52=1&sid=&' + Math.random());

                                                            setTimeout(function () {
                                                                $(frame).contents().find('[onclick="return buy_for_teeth(this);"]')[1].click();
                                                                setTimeout(function () {
                                                                    returnFromStore();
                                                                }, 2000);
                                                            }, 2000);
                                                        }, 2000);
                                                    }, 2000);
                                                }, 2000);
                                            }, 2000);
                                        }, 2000);
                                    }, 1000);
                                }, 1000);
                            }, 18000);
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 18000);
    }, 1000);
}

function returnFromStore() {
    $(frame).contents().find('[onclick="return check_access();"]')[0].click();

    setTimeout(function () {
        if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/drm_street_central_bk.gif"]')[0] != null) {
            $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/drm_street_central_bk.gif"]')[0].click();
        } else if ($(frame).contents().find('[src="http://img.combats.com/i/images/subimages/night/drm_street_central_bk.gif"]')[0] != null) {
            $(frame).contents().find('[src="http://img.combats.com/i/images/subimages/night/drm_street_central_bk.gif"]')[0].click();
            setTimeout(function () {
                equipItems();
            }, 2000);
        }
    }, 18000);
}

function equipItems() {
    $(frame).attr('src', '/main.pl?edit=1&rand=' + Math.random());

    setTimeout(function () {
        $(frame).contents().find('a:contains(\'надеть\')')[0].click();
        setTimeout(function () {
            $(frame).contents().find('a:contains(\'надеть\')')[0].click();
            setTimeout(function () {
                $(frame).contents().find('a:contains(\'надеть\')')[0].click();
                setTimeout(function () {
                    $(frame).contents().find('a:contains(\'надеть\')')[0].click();
                    setTimeout(function () {
                        console.log('ready');
                    }, 5000);
                }, 2000);
            }, 2000);
        }, 2000);
    }, 2000);
}
