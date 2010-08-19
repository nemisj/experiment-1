;(function(){

    var hs = [];
    var bind = function(id, h) {
        var found = null;
        jQuery(hs).each(function(i, item) {
            if(item[0] == id) {
                found = item;
            }
        }); 

        if(!found){
            hs.push([id,h]);
            var box = $("#" + id);
            box.bind("click", h);
        }
    }

    var unbind = function(id) {
        var found = null;
        jQuery(hs).each(function(i, item) {
            if(item[0] == id) {
                found = item;
                hs.splice(i,1);
            }
        }); 

        if(found){
            var box = $("#" + id);
            box.unbind("click", found[1]);
        }
         
    }

    window.solve = function(id) {
        var box     = $("#" + id);
        var nodes   = box.find("td"); 
        var pattern = 0;
        var islocked = /locked/;

        nodes.each(function(i,node) {
            node = $(node);
            var row = node.attr("row");
            var col = node.attr("col");
            var locked = islocked.test(node.attr("state"));

            if (locked) {
                var place = ((4 * row) + Number(col));
                var mask = 1 << place;
                pattern = pattern | mask;
            }
        });

        var solution = match_bits(pattern) || 0;
        var str = print_bits(solution);

        var log = $("#log_box");
        log.text("");

        for(var i=str.length-1; 0<=i;i--) {
            var char = str.charAt(i); 
            if(char == "1"){
                var cell = 16 - i;
                var div = $("<div>").text("Click " + cell)
                    .appendTo(log);
            }
        }

        if (solution == 0) {
            unbind(id);
        } else {
            bind(id, function(e) {
                solve(id);
            });
        }
    } 
})();
