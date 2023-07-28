$("body").css("background-size",$(document).width());
$(".malha").hide();
$("h2").hide();



var playerTime = 0;
var letra = ["X","O"];
var selectTipodeJogo = ["1x1","1xcom"];
var tipodeJogo = [];



$("#1x1").click( function(){
    $(".container").css("margin-top",0);
    inicia1x1();
    $("h2").show();
    $(".malha").fadeIn();
});

function inicia1x1(){
    
    tipodeJogo = selectTipodeJogo[0];
    $("#1x1").hide();
    $("#1xcom").hide();
    
    $("h2").html("Player 1");
    
    
    $(".btnjogo").click( function(){
    if (playerTime===0){
        $("h2").html("Player 2");
        $(this).html(letra[0]);
        verificaAcerto();
        playerTime = 1;
        
    } else{
        $("h2").html("Player 1");
        $(this).html(letra[1]);
        verificaAcerto();
        playerTime =0;
    }   
});
}



function verificaAcerto(){
    // colunas:
    for (var i=1; i<4;i++){
        if ( ($("#1-"+i).text() === $("#2-"+i).text()) && ($("#2-"+i).text() === $("#3-"+i).text())      ){
            if ($("#1-"+i).text() != []){
                vitoria($("#1-"+i).text());
                return true
            }
        }
    }

    // linhas:
    for (var i=1; i<4;i++){
        if ( ($("#"+i+"-1").text() === $("#"+i+"-2").text()) && ($("#"+i+"-2").text() === $("#"+i+"-3").text())      ){
            if ($("#"+i+"-1").text() != []){
                vitoria($("#"+i+"-1").text());
                return true
            }
        }
    }

    // diagonal esqr-dir cima-baixo:
    if ( ($("#1-1").text() === $("#2-2").text()) && ($("#2-2").text() === $("#3-3").text())     ){
        if ($("#1-1").text() != []){
            vitoria($("#1-1").text());
            return true
        }
    }
    // diagonal esqr-dir baixo-cima:
    if ( ($("#3-1").text() === $("#2-2").text()) && ($("#2-2").text() === $("#1-3").text())     ){
        if ($("#3-1").text() != []){
            vitoria($("#3-1").text());
            return true
        }
    }   
    // empate:
    if ( ($("#1-1").text() !=  []) && ($("#1-2").text() !=  []) && ($("#1-3").text() !=  []) && 
    ($("#2-1").text() !=  []) && ($("#2-2").text() !=  []) && ($("#2-3").text() !=  []) && 
    ($("#3-1").text() !=  []) && ($("#3-2").text() !=  []) && ($("#3-3").text() !=  [])){
        
        vitoria("empate");
        return true

    }
    

}

function vitoria(letrawin){
    $( ".btnjogo" ).prop( "disabled", true );
    if (letrawin === "X"){
        $("h2").html("Player 1 VENCEU!");
    } 
    if (letrawin === "O"){
        if (tipodeJogo === selectTipodeJogo[0]){
            $("h2").html("Player 2 VENCEU!");
        }
        if (tipodeJogo === selectTipodeJogo[1]){
            $("h2").html("Player COM. VENCEU!");
        }
        
    }
    if (letrawin === "empate"){
        $("h2").html("Empate!");
    }


    if (tipodeJogo === selectTipodeJogo[0]){
        $("#again1x1").css("display","flex");
    }
    if (tipodeJogo === selectTipodeJogo[1]){
        $("#again1xcom").css("display","flex");
    }
    $("#mudarmodo").css("display","flex");
    
}

$("#again1x1").click(function(){
    
    for (var i=1; i<4;i++){
        $("#1-"+i).html("");
        $("#2-"+i).html("");
        $("#3-"+i).html("");
            
    }
    $("#mudarmodo").css("display","none");
    $("#again1x1").css("display","none");
    $("h2").html("Player 1");
    $( ".btnjogo" ).prop( "disabled", false );
    playerTime = 0;
    $("#1x1").click( function(){
        inicia1x1();
    });

});

$("#again1xcom").click(function(){
    
    for (var i=1; i<4;i++){
        $("#1-"+i).html("");
        $("#2-"+i).html("");
        $("#3-"+i).html("");
            
    }
    $("#mudarmodo").css("display","none");
    $("#again1xcom").css("display","none");
    $("h2").html("Player 1");
    $( ".btnjogo" ).prop( "disabled", false );
    playerTime = 0;
    round = 1;
    ondeClicou = [];
    randomNumber = 0;
    randomNumber2 =0;
    posicao1 = 0;
    impedirganhar =[];
    ondeComputadorClicou =[];
    vazioRound3 = [];
    vazioRound4 = [];



    $("#1xcom").click( function(){
        inicia1xcom();
    });
    

});



$("#mudarmodo").click(function(){
    location.reload();
});


// algoritmo computador
$("#1xcom").click( function(){
    $(".container").css("margin-top",0);
    $("h2").show();
    $(".malha").fadeIn();
    inicia1xcom();
});
var ondeClicou = [];

function inicia1xcom(){
    tipodeJogo = selectTipodeJogo[1];
    $("#1x1").hide();
    $("#1xcom").hide();  
    $("h2").html("Player 1");
    $(".btnjogo").click( function(){
        if (playerTime===0){
            playerTime = 1;
            $("h2").html("Player COM.");
            $(this).html(letra[0]);
            ondeClicou.push($(this).attr("id"));
            
            verificaAcerto();
            setTimeout(function() {
                console.log("teste")
                algoritmoCom();
                verificaAcerto();
                if (verificaAcerto() === true) {
                    return
                }
                round++;
            }, 700);
                        
        }   
    });
}
var randomNumber = 0;
var randomNumber2 =0;
var round = 1;
var posicao1 = 0;
var ganhase = [
    ["1-1","1-2","1-3"],
    ["2-1","2-2","2-3"],
    ["3-1","3-2","3-3"],
    ["1-1","2-1","3-1"],
    ["1-2","2-2","3-2"],
    ["1-3","2-3","3-3"],
    ["1-1","2-2","3-3"],
    ["3-1","2-2","1-3"]
];

var impedirganhar =[];
var ondeComputadorClicou =[];





function algoritmoCom(){
    playerTime = 0;
    $("h2").html("Player 1");
    // ROUND 1
    if ( round==1){
        if ($("#1-1").text() != [] || $("#1-3").text() != []  || $("#3-1").text() != []  || $("#3-3").text() != []){
        $("#2-2").html(letra[1]);
        ondeComputadorClicou.push("2-2");
        return
        
    } 
    if ($("#1-2").text() != [] || $("#2-1").text() != []  || $("#2-3").text() != []  || $("#3-2").text() != []){
        $("#2-2").html(letra[1]);
        ondeComputadorClicou.push("2-2");

    } else{
        randomNumber = Math.floor(Math.random() * 4) + 1;
        
    }
        
      if ( randomNumber===1 && $("#1-1").text() == [] ){
        randomNumber=0;
        $("#1-1").html(letra[1]);
        posicao1 = 1;
        ondeComputadorClicou.push("1-1");
        

    }
    if ( randomNumber===2 && $("#1-3").text() == [] ){
        randomNumber=0;
        $("#1-3").html(letra[1]);
        posicao1 = 2;
        ondeComputadorClicou.push("1-3");
        

    }
    if ( randomNumber===3 && $("#3-1").text() == [] ){
        randomNumber=0;
        $("#3-1").html(letra[1]);
        posicao1 = 3;
        ondeComputadorClicou.push("3-1");
        

    }
    if ( randomNumber===4 && $("#3-3").text() == [] ){
        randomNumber=0;
        $("#3-3").html(letra[1]);
        posicao1 = 4;
        ondeComputadorClicou.push("3-3");
        

    }
    if (randomNumber===1 || randomNumber===2 || randomNumber===3 || randomNumber===4 ) {
        algoritmoCom();
    }  
    }

    // ROUND 2
    if (round===2){
        if ( ondeClicou[0]== "2-2"){

            defesa();
            if (ondeComputadorClicou.length ==1){
                var possibilidadeOXXdiag = [];
                if ( ondeComputadorClicou[0] == "1-1" ){
                    possibilidadeOXXdiag = ["1-2","1-3","2-1","3-1"];
                    var randomNumber6 = Math.floor(Math.random() * 4);
                    $("#"+possibilidadeOXXdiag[randomNumber6]).html(letra[1]);
                    ondeComputadorClicou.push(possibilidadeOXXdiag[randomNumber6]);
                }
                if ( ondeComputadorClicou[0] == "1-3" ){
                    possibilidadeOXXdiag = ["1-1","1-2","2-3","3-3"];
                    var randomNumber6 = Math.floor(Math.random() * 4);
                    $("#"+possibilidadeOXXdiag[randomNumber6]).html(letra[1]);
                    ondeComputadorClicou.push(possibilidadeOXXdiag[randomNumber6]);
                }
                if ( ondeComputadorClicou[0] == "3-1" ){
                    possibilidadeOXXdiag = ["1-1","2-1","3-2","3-3"];
                    var randomNumber6 = Math.floor(Math.random() * 4);
                    $("#"+possibilidadeOXXdiag[randomNumber6]).html(letra[1]);
                    ondeComputadorClicou.push(possibilidadeOXXdiag[randomNumber6]);
                }
                if ( ondeComputadorClicou[0] == "3-3" ){
                    possibilidadeOXXdiag = ["1-3","2-3","3-1","3-2"];
                    var randomNumber6 = Math.floor(Math.random() * 4);
                    $("#"+possibilidadeOXXdiag[randomNumber6]).html(letra[1]);
                    ondeComputadorClicou.push(possibilidadeOXXdiag[randomNumber6]);
                }
            }

        }
        if (ondeClicou[0]== "1-1" || ondeClicou[0]== "1-3" || ondeClicou[0]== "3-1" || ondeClicou[0]== "3-3" ){
            defesa();
            if ((ondeClicou[1]== "1-1" || ondeClicou[1]== "1-3" || ondeClicou[1]== "3-1" || ondeClicou[1]== "3-3") && ondeComputadorClicou.length ==1 ){
                
                var randomNumber3 = Math.floor(Math.random() * 4) + 1;
                if (randomNumber3 === 1 && $("#1-2").text() == []){
                    $("#1-2").html(letra[1]);
                    ondeComputadorClicou.push("1-2");
                }
                if (randomNumber3 === 2 && $("#2-1").text() == []){
                    $("#2-1").html(letra[1]);
                    ondeComputadorClicou.push("2-1");
                }
                if (randomNumber3 === 3 && $("#2-1").text() == []){
                    $("#2-3").html(letra[1]);
                    ondeComputadorClicou.push("2-3");
                }
                if (randomNumber3 === 4 && $("#3-2").text() == []){
                    $("#3-2").html(letra[1]);
                    ondeComputadorClicou.push("3-2");
                }
                if (randomNumber3===1 || randomNumber3 === 2 || randomNumber3 === 3 || randomNumber3 === 4){
                    algoritmoCom();
                }
            }
            if ((ondeClicou[1]== "1-2" || ondeClicou[1]== "2-1" || ondeClicou[1]== "2-3" || ondeClicou[1]== "3-2") && ondeComputadorClicou.length ==1 ){
                
                if (ondeClicou[0]== "1-1" && ondeClicou[1]== "2-3"){
                    $("#1-3").html(letra[1]);
                    ondeComputadorClicou.push("1-3");
                } 
                if (ondeClicou[0]== "1-1" && ondeClicou[1]== "3-2"){
                    $("#3-1").html(letra[1]);
                    ondeComputadorClicou.push("3-1");
                }
                if (ondeClicou[0]== "1-3" && ondeClicou[1]== "2-1"){
                    $("#1-1").html(letra[1]);
                    ondeComputadorClicou.push("1-1");
                } 
                if (ondeClicou[0]== "1-3" && ondeClicou[1]== "3-2") {
                    $("#3-3").html(letra[1]);
                    ondeComputadorClicou.push("3-3");
                }
                if (ondeClicou[0]== "3-1" && ondeClicou[1]== "1-2"){
                    $("#1-1").html(letra[1]);
                    ondeComputadorClicou.push("1-1");
                } 
                if (ondeClicou[0]== "3-1" && ondeClicou[1]== "2-3") {
                    $("#3-3").html(letra[1]);
                    ondeComputadorClicou.push("3-3");
                }
                if (ondeClicou[0]== "3-3" && ondeClicou[1]== "1-2"){
                    $("#1-3").html(letra[1]);
                    ondeComputadorClicou.push("1-3");
                } 
                if (ondeClicou[0]== "3-3" && ondeClicou[1]== "2-1") {
                    $("#3-1").html(letra[1]);
                    ondeComputadorClicou.push("3-1");
                }
            }
        }
        if (ondeClicou[0]== "1-2" || ondeClicou[0]== "2-1" || ondeClicou[0]== "2-3" || ondeClicou[0]== "3-2" ){
            defesa();
            if ((ondeClicou[1]== "1-2" || ondeClicou[1]== "2-1" || ondeClicou[1]== "2-3" || ondeClicou[1]== "3-2") && ondeComputadorClicou.length ==1 ){
                if (ondeClicou[0]== "2-1" && ondeClicou[1]=="1-2" ){
                    $("#1-1").html(letra[1]);
                    ondeComputadorClicou.push("1-1");
                } 
                if (ondeClicou[0]== "2-1" && ondeClicou[1]=="3-2" ){
                    $("#3-1").html(letra[1]);
                    ondeComputadorClicou.push("3-1");
                }
                if (ondeClicou[0]== "1-2" && ondeClicou[1]=="2-1" ){
                    $("#1-1").html(letra[1]);
                    ondeComputadorClicou.push("1-1");
                } 
                if (ondeClicou[0]== "1-2" && ondeClicou[1]=="2-3" ) {
                    $("#1-3").html(letra[1]);
                    ondeComputadorClicou.push("1-3");
                }
                if (ondeClicou[0]== "2-3" && ondeClicou[1]=="1-2" ){
                    $("#1-3").html(letra[1]);
                    ondeComputadorClicou.push("1-3");
                } 
                if (ondeClicou[0]== "2-3" && ondeClicou[1]=="3-2" ) {
                    $("#3-3").html(letra[1]);
                    ondeComputadorClicou.push("3-3");
                }
                if (ondeClicou[0]== "3-2" && ondeClicou[1]=="2-1" ){
                    $("#3-1").html(letra[1]);
                    ondeComputadorClicou.push("3-1");
                } 
                if (ondeClicou[0]== "3-2" && ondeClicou[1]=="2-3" ) {
                    $("#3-3").html(letra[1]);
                    ondeComputadorClicou.push("3-3");
                }
                if (ondeComputadorClicou.length ==1){
                  var randomNumber3 = Math.floor(Math.random() * 4) + 1;
                if (randomNumber3 === 1 && $("#1-2").text() == []){
                    $("#1-2").html(letra[1]);
                    ondeComputadorClicou.push("1-2");
                }
                if (randomNumber3 === 2 && $("#2-1").text() == []){
                    $("#2-1").html(letra[1]);
                    ondeComputadorClicou.push("2-1");
                }
                if (randomNumber3 === 3 && $("#2-3").text() == []){
                    $("#2-3").html(letra[1]);
                    ondeComputadorClicou.push("2-3");
                }
                if (randomNumber3 === 4 && $("#3-2").text() == []){
                    $("#3-2").html(letra[1]);
                    ondeComputadorClicou.push("3-2");
                }
                if (randomNumber3===1 || randomNumber3 === 2 || randomNumber3 === 3 || randomNumber3 === 4){
                    algoritmoCom();
                }  
                }
                
                
                
                
            }
            if ((ondeClicou[1]== "1-1" || ondeClicou[1]== "1-3" || ondeClicou[1]== "3-1" || ondeClicou[1]== "3-3") && ondeComputadorClicou.length ==1 ){
                if (ondeClicou[0]== "2-3" && ondeClicou[1]=="1-1" ){
                    $("#1-3").html(letra[1]);
                    ondeComputadorClicou.push("1-3");
                } 
                if (ondeClicou[0]== "3-2" && ondeClicou[1]=="1-1" ){
                    $("#3-1").html(letra[1]);
                    ondeComputadorClicou.push("3-1");
                }
                if (ondeClicou[0]== "2-1" && ondeClicou[1]=="1-3" ){
                    $("#1-1").html(letra[1]);
                    ondeComputadorClicou.push("1-1");
                } 
                if (ondeClicou[0]== "3-2" && ondeClicou[1]=="1-3" ) {
                    $("#3-3").html(letra[1]);
                    ondeComputadorClicou.push("3-3");
                }
                if (ondeClicou[0]== "1-2" && ondeClicou[1]=="3-1" ){
                    $("#1-1").html(letra[1]);
                    ondeComputadorClicou.push("1-1");
                } 
                if (ondeClicou[0]== "2-3" && ondeClicou[1]=="3-1" ) {
                    $("#3-3").html(letra[1]);
                    ondeComputadorClicou.push("3-3");
                }
                if (ondeClicou[0]== "1-2" && ondeClicou[1]=="3-3" ){
                    $("#1-3").html(letra[1]);
                    ondeComputadorClicou.push("1-3");
                } 
                if (ondeClicou[0]== "2-1" && ondeClicou[1]=="3-3" ) {
                    $("#3-1").html(letra[1]);
                    ondeComputadorClicou.push("3-1");
                }
            }
        }
        
        
    }
var vazioRound3 = [];
    // ROUND 3
    if (round===3){
        
        if ( ondeClicou[0]== "2-2"){
            ataque();
            if (ondeComputadorClicou.length ==2){
                defesa();
            }
            if (ondeComputadorClicou.length ==2){
                
                var randomNumber4 = Math.floor(Math.random() * 4);
                for (var l=1;l<4;l++){
                    for (var c=1;c<4;c++){
                        if ( $("#"+l+"-"+c).text() == []   ){
                            vazioRound3.push(l+"-"+c);
                        }
                    }
                }
                
                if ($("#"+vazioRound3[randomNumber4]).text() == []){
                    $("#"+vazioRound3[randomNumber4]).html(letra[1]);
                    ondeComputadorClicou.push(vazioRound3[randomNumber4]);
                } else{
                    algoritmoCom();
                }
                
            }
            
        } else{
            ataque();
            if (ondeComputadorClicou.length ==2){
                defesa();
            }
            if (ondeComputadorClicou.length ==2){
                
                var randomNumber4 = Math.floor(Math.random() * 4);
                for (var l=1;l<4;l++){
                    for (var c=1;c<4;c++){
                        if ( $("#"+l+"-"+c).text() == []   ){
                            vazioRound3.push(l+"-"+c);
                        }
                    }
                }
                
                
                $("#"+vazioRound3[randomNumber4]).html(letra[1]);
                ondeComputadorClicou.push(vazioRound3[randomNumber4]);
                 
                
            }

        }

    }
var vazioRound4 = [];
    // ROUND 4
    if (round===4){
       
        if ( ondeClicou[0]== "2-2"){
            
            ataque();
            if (ondeComputadorClicou.length ==3){
                defesa();
            }
            if (ondeComputadorClicou.length ==3){
                
                var randomNumber5 = Math.floor(Math.random() * 2);
                for (var l=1;l<4;l++){
                    for (var c=1;c<4;c++){
                        if ( $("#"+l+"-"+c).text() == []   ){
                            vazioRound4.push(l+"-"+c);
                        }
                    }
                }
                
                if ($("#"+vazioRound4[randomNumber4]).text() == []){
                    $("#"+vazioRound4[randomNumber4]).html(letra[1]);
                    ondeComputadorClicou.push(vazioRound4[randomNumber4]);
                } else{
                    algoritmoCom();
                }
                
            }
        } else{
           
            ataque();
            if (ondeComputadorClicou.length ==3){
                
                defesa();
            }
            if (ondeComputadorClicou.length ==3){
                
                var randomNumber5 = Math.floor(Math.random() * 2);
                
                for (var l=1;l<4;l++){
                    for (var c=1;c<4;c++){
                        if ( $("#"+l+"-"+c).text() == []   ){
                            
                            vazioRound4.push(l+"-"+c);
                            
                        }
                    }
                }
                
               
                $("#"+vazioRound4[randomNumber5]).html(letra[1]);
                ondeComputadorClicou.push(vazioRound4[randomNumber4]);
                
                
            } 

        }
        
        
        

    }



    setTimeout(function() {
         
          
        
    }, 1000);
    
    
}

function defesa(){
    // possibilidade 
        for (var l=0;l<8;l++){
          impedirganhar=[];
          
          
           for (var i=0;i<ondeClicou.length;i++){
            
            for (var c=0;c<3;c++){
                
                if ( ondeClicou[i] === (ganhase[l][c])) {
                    impedirganhar.push(ondeClicou[i]);
                    
                    
                    if ( impedirganhar.length >1){
                        
                            if ( $("#"+ganhase[l][0]).text() == [] ){
                                $("#"+ganhase[l][0]).html(letra[1]);
                                ondeComputadorClicou.push(ganhase[l][0]);
                                return
                            }
                            if ( $("#"+ganhase[l][1]).text() == [] ){
                                $("#"+ganhase[l][1]).html(letra[1]);
                                ondeComputadorClicou.push(ganhase[l][1]);
                                return
                            }
                            if ( $("#"+ganhase[l][2]).text() == [] ){
                                $("#"+ganhase[l][2]).html(letra[1]);
                                ondeComputadorClicou.push(ganhase[l][2]);
                                return
                            }
                            
                    }
                }
            }
        }   
        }
        
        
               
}
var tentarGanhar =[];
function ataque(){
    // possibilidade 
        for (var l=0;l<8;l++){
          tentarGanhar=[];
          
          
           for (var i=0;i<ondeComputadorClicou.length;i++){
            
            for (var c=0;c<3;c++){
                
                if ( ondeComputadorClicou[i] === (ganhase[l][c])) {
                    tentarGanhar.push(ondeComputadorClicou[i]);
                    
                    
                    if ( tentarGanhar.length >1){
                        
                            if ( $("#"+ganhase[l][0]).text() == [] ){
                                $("#"+ganhase[l][0]).html(letra[1]);
                                ondeComputadorClicou.push(ganhase[l][0]);
                                return
                            }
                            if ( $("#"+ganhase[l][1]).text() == [] ){
                                $("#"+ganhase[l][1]).html(letra[1]);
                                ondeComputadorClicou.push(ganhase[l][1]);
                                return
                            }
                            if ( $("#"+ganhase[l][2]).text() == [] ){
                                $("#"+ganhase[l][2]).html(letra[1]);
                                ondeComputadorClicou.push(ganhase[l][2]);
                                return
                            }
                            
                    }
                }
            }
        }   
        }
        
        
               
}

