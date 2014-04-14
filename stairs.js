"use strict";

function showAnswer(event) {
    event.userAnswer.each(function(i, element) {
        $(element).val(event.correctAnswer[$(element).attr('data-i')]).removeClass('ok').removeClass('fail');
        event.problemDiv.find('button.check').hide();
    });
}


function check(event) {
    event.problemDiv.removeClass('fail').addClass('ok');
    event.userAnswer.each(function(i, element) {
        if($(element).val() !== "" && $(element).val() == event.correctAnswer[$(element).attr('data-i')]) {
            $(element).addClass('ok').removeClass('fail');
        } else {
            event.correctAnswer[$(element)["data-i"]]
            $(element).addClass('fail').removeClass('ok');
            event.problemDiv.removeClass('ok').addClass('fail');
        }
    });
}



function coin_element(value) {
    if(value && value !== '∞') {
        return "<div class='circle'>" + value + "</div>";
    } else {
        return "";
    }
}


function default_value(value) {
    if(value === '∞') {
        return "'∞' readonly='readonly'";
    } else {
        return "''";
    }
}


function stair_class(value) {
    if(value === '∞') {
        return 'removed';
    } else {
        return '';
    }
}

function input(inputPerStair, tabId, i, answer) {
    result = '';
    console.log(answer, i);
    for(var j = 0; j < inputPerStair; j++) {
        var result = result + "<input tabindex='" + (tabId + inputPerStair * i + j + 1) + "' class='answer' value =" +
            default_value(answer[inputPerStair * i + j]) + " data-i='" + (inputPerStair * i + j) + "'>";
    }
    console.log(result, i);
    return result
}
function Stairs(options) {
    var tabId = Math.round(Math.random()* 100 + 100) * 100
    var self = this.table = $('<table class="stairs" width="' + (options.height * 61 + 62) + '"></table>');
    this.table.append("<tr><td colspan=" + (options.height) + "></td><td class='upstair'>" + coin_element(options.price[options.height]) + "</div>" + (options.height) + "</td></tr>")
    for(var i = options.height; i >= 2; i--) {
        this.table.append("<tr><td colspan=" + (i - 1) + "></td><td class='upstair'>" + coin_element(options.price[i - 1]) +
            (i - 1) + "</td><td class='stair " + stair_class(options.answer[i]) + "'>" + input(options.inputPerStair, tabId, i, options.answer) + "</td></tr>")
    }
    this.table.append("<tr><td class='upstair'><img src='img/boy.gif'>0</td><td class='stair'>" + input(options.inputPerStair, tabId, 1, options.answer) + "</td></tr>");
    this.table.append("<tr><td class='floor-stair'>" + input(options.inputPerStair, tabId, 0, options.answer) + "</td><td align='right' colspan=" + (options.height)+
        "><button tabindex='" + (tabId + 98) + "' class='check'>Проверить</button><button tabindex='"+ (tabId + 99) + "' class='answer'>Правильный ответ</button></td></tr>");
    this.div = $("#" + options.id);
    this.div.append(this.table);

    self.find('button.answer').click(function () {$('body').trigger(
        {
            'type': 'showAnswer',
            'id': options.id,
            'problemDiv': self,
            'userAnswer': self.find('input'),
            'correctAnswer': options.answer
        });
    });



    self.find('button.check').click(function () {$('body').trigger(
        {
            'type': 'check',
            'id': options.id,
            'problemDiv': self,
            'userAnswer': self.find('input'),
            'correctAnswer': options.answer
        });
    });

    this.table.click(function(event) {
        if($(event.target).is('.answer')) {
            $(event.target).removeClass('ok').removeClass('fail');
        }
    });

}

function init_dp() {
    $('body').on("showAnswer", showAnswer).on("check", check);
}

