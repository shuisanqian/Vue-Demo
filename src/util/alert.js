import Vue from 'vue'
import $ from 'jquery'

export default {
    install () {
        let timer = null
        Vue.prototype.$alert = (msg) => {
            $('#alertWeek').remove();
            let $alert = $('<div class="week-alert" id="alertWeek"></div>');
            $('body').append($alert);
            $alert.html(msg);
            $alert.addClass('alert-show');
            clearTimeout(timer);
            timer = setTimeout(() => {
                $alert.remove();
            }, 2000);
        }           
    }
}