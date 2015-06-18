var $ = require("/libs/jquery");
require("client/prompt21");

exports.init = function() {
};

exports.loadForm = function(ev, data) {
    var self = this;

    if (!data || !data.form || !data.callback) {
        return;
    }

    var url = location.protocol + "//" + location.host + "/!/forms/" + data.form + (data.type ? "." + data.type : "") + ".txt";
    delete data.form;
    delete data.type;

    $.ajax(url, {
        success: function(text, status, xhr) {
            var $popup = $(text);
            $(".popups21").html($popup);
            var form = $popup.prompt21();
            form.show();

            self.emit("form_loaded", { target: ".popups21 form" }, data);
        },
        error: function(xhr, status, err) {
            data.callback(null, data.data);
        }
    });
};

exports.closeForm = function(ev, data) {
    var self = this;
    // TODO isn't this too destructive?
    $(".popups21").empty();
};
