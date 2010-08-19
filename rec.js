function doswap(map,row,col){
    for(var i=0;i< SIZE;i++){
        for(var j=0;j< SIZE;j++){
            if(i == row || col == j){
                map[i][j] = !map[i][j];
            }
        }
    }
}

function swap(map, steps){

    for(var i=0;i< SIZE;i++){
        for(var j=0;j< SIZE;j++){
            var step = steps[i][j];
            if(step == true){
                doswap(map,i,j); 
            }
        }
    }
}

function convert(str){
    var r = '';
    for(var i=0;i<str.length;i++){
        r = str.charAt(i) + r;
    }

    str = r;

    var x = 0;
    var result = [];
    for(var i=0;i< SIZE;i++){
        result[i] = [];
        for(var j=0;j< SIZE;j++){
            result[i][j] = str.charAt(x++) == "1";
        }
    }

    console.debug(result);
    return result;
}

function check(one,two){
    for(var i=0;i< SIZE;i++){
        for(var j=0;j< SIZE;j++){
            if(one[i][j] != two[i][j]){
                return false;
            }
        }
    }

    return true;
}

function match_bits2(pattern){

    var result = [];
    for(var i=0;i< SIZE;i++){
        result[i] = [];
        for(var j=0;j< SIZE;j++){
            result[i][j] = false;
        }
    }

    var map = [];
    for(var i=0;i< SIZE;i++){
        map[i] = [];
        for(var j=0;j< SIZE;j++){
            map[i][j] = false;
        }
    }

    var tomatch = pattern.join(",");

    var fnc = function(i, row, col){
        if(i == (SIZE * SIZE)){
            //do some stuff;
            swap(map, result);
            if(check(pattern,map)){
                return true;
            }else{
                //clean map
            }           
            return false;
        }

        if(col == SIZE){
           row = row+1; 
           col = 0;
        }
        
        result[row][col] = false;
        if(fnc(i+1, row, col+1)){
            return true;
        }

        result[row][col] = true;
        if(fnc(i+1, row, col+1)){
            return true;
        }
    }

    var startTime = new Date().getTime();
    fnc(0,0,0);
    var endTime = new Date().getTime();
    console.debug('Time is',endTime - startTime);
    console.debug(result);
}

