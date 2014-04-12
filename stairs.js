"use strict";

function showAnswer(event) {
    event.userAnswer.each(function(i, element) {
        $(element).val(event.correctAnswer[event.userAnswer.length - 1 - i]).removeClass('ok').removeClass('fail');
        event.problemDiv.find('button.check').hide();
    });
}


function check(event) {
    event.problemDiv.removeClass('fail').addClass('ok');
    event.userAnswer.each(function(i, element) {
        if($(element).val() !== "" && $(element).val() == event.correctAnswer[event.userAnswer.length - 1 - i]) {
            $(element).addClass('ok').removeClass('fail');
        } else {
            $(element).addClass('fail').removeClass('ok');
            event.problemDiv.removeClass('ok').addClass('fail');
        }
    });
}



function Stairs(options) {
    var tabId = Math.round(Math.random()* 100 + 100) * 100
    var self = this.table = $('<table class="stairs" width="' + (options.height * 61 + 62) + '"></table>');
    this.table.append("<tr><td colspan=" + (options.height) + "></td><td class='upstair'><div class='circle'>" +
         options.price[options.height] +"</div>" + (options.height) + "</td></tr>")
    for(var i = options.height; i >= 2; i--) {
        this.table.append("<tr><td colspan=" + (i - 1) + "></td>" + coint_element(options.price[i - 1]) +
            (i - 1) + "</td><td class='stair'><input tabindex='" + (tabId + i + 1) + "' class='answer'></td></tr>")
    }
    this.table.append("<tr><td class='upstair'><img src='img/boy.gif'>0</td><td class='stair'><input tabindex='" + (tabId + 2) +"' class='answer'></td></tr>");
    this.table.append("<tr><td class='floor-stair'><input tabindex='" + (tabId + 1) + "' class='answer'></td><td align='right' colspan=" + (options.height)+
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

    function coin_element(value) {
        if(value) {
            return "<div class='circle'>" + str(value) + "</div>";
        } else {
            return "";
        }
    }


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
    $('body').on("showAnswer", showAnswer);
    $('body').on("check", check);
}

