(function(){
    // checking define
    if (typeof lock_box != "undefined") {
        return false;
    }

    // making global
    lock_box = {};

    var $ = jQuery;

    var set_state = function(node, locked) {
        //removing old info
        node.removeClass("open").removeClass("locked");

        var state = locked ? "locked" : "open";
        node.addClass(state);
        node.attr("state", state);
    }

    var randomize_box = lock_box.randomize =  function(box) {
        for (var i=0; i < 4; i++) {
            var one = ~~(Math.random() * 4);
            perform_click(i, one, box);
        }
    }

    var perform_click = lock_box.perform_click = function(row, col, box) {

        var matrix_open = true;

        var nodes = [];

        var matrix = $(box).find("td");
        matrix.each(function(i, cell) {
            cell = $( cell );

            var crow = cell.attr( "row" );
            var ccol = cell.attr( "col" );

            var locked = /locked/.test(cell.attr("state"));
            if(ccol == col || row == crow) {
                set_state(cell, (locked = !locked));
                nodes.push(cell);
            }

            matrix_open &= (!locked);
        });

        return !!matrix_open;
    }

    var build_box = function(caption){
        
        var table = $("<table>")
            .attr( "class", "matrix" )
            .attr( "cellspacing", 0 )
            .attr( "cellpadding", 0 );

        var tbody = $("<tbody>")
            .appendTo(table);

        for (var row=0; row < 4; row++) {
            var tr = $("<tr>").appendTo(tbody);

            for (var col=0; col < 4; col++) {

                var td = $("<td>")
                    .attr({
                        "class" : "cell",
                        "col"   : col,
                        "row"   : row
                    })
                    .appendTo(tr);

                td.text( caption ? (4 * row ) + Number(col) + 1 : "");
                set_state(td, false);
            }
        }

        // attach event handler
        table.click(function(e) {
            var td = $(e.target);
            // target info
            var result = perform_click(
                td.attr("row"),
                td.attr("col"), 
                table
            );

            if (result) {
                alert( 'Puzzle solved' );
            }
        });

        return table;
    }

    lock_box.parse = function() {

        var css_path = null;
        var scripts = $("script");
        var bool = /^(true|yes)$/;

        scripts.each(function(i, script) {
            var type = script.type;
            if (/lock_box/.test(type)) {
                var scr = $( script );
                var caption = scr.attr( "caption" );

                var box = build_box( bool.test( caption ));
                box.attr("id", script.id);

                scr.replaceWith(box);

                var random = scr.attr("random");
                bool.test(random) && randomize_box(box);
            }

            var src =  script.src;
            if (/lock_builder/.test(src)) {
                css_path = src.replace(/\.js$/,'.css');
            }
        });

        if (css_path) {
            $('head').append('<link rel="stylesheet" type="text/css" href="' + css_path +'" />'); 
        }
    }

     $( lock_box.parse );
})();
