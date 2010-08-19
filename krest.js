SIZE = 4;
var BIT_LENGTH = SIZE * SIZE;
var MAX_COUNT  = Math.pow(2, BIT_LENGTH);

var c_masks = [];
(function build_mask() {
    var length = BIT_LENGTH;
    var size = SIZE;
    for (var i=0; i<length; i++) {
        var current_col = i % size;
        var current_row = ~~( i / size );

        var click_mask = 0;
        var h = 1;

        for (var j=0; j<length; j++) {
            var col = j % SIZE;
            var row = ~~(j / SIZE );
            if(row == current_row || col == current_col){
                click_mask = click_mask | h;
            }
            h = h << 1;
        }

        var rmask = c_masks[current_row] || (c_masks[current_row] = []);
        rmask[current_col] = click_mask;
    }
})();

function count(fnc){
    var i=0;
    var count = MAX_COUNT;
    while((i++) < count){
        var result = fnc( i );
		if(result !== false){
			return result;
		}
    }
}

function print_bits(bits){
    var str = '';
    var length = BIT_LENGTH;
    for (var i=0;i < length; i++) {
        var result = (bits & (1 << i));
        var char = result ? '1' : '0';
        str = char + str;
    }
    return str;
}

function perform_click(mask, map, col_pos, row_pos){
   var click_mask = c_masks[row_pos][col_pos];
    map = map ^ click_mask;
    return map;
}

function match_bits(pattern){


    return count(function(bits){
        // getting one bit at a time

        var map     = 0;
        var b       = 1;
        var length  = BIT_LENGTH;
        var size    = SIZE;

        for (var i=0;i < length; i++) {

            var mask    = (bits & b);
            var col_pos = i % size;
            var row_pos = ~~( i / size );

            if (mask) {
                //performing click
                map = perform_click( mask, map, col_pos, row_pos );

                if (map == pattern) {
                    return bits;
                }
            }

            b = b << 1;
        }

        return false;
    });
}
