const NUMBERS_ARRAY = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 43, 42, 47, 46];
$(document).ready(function(){   
//Выводим кнопки
function init(){
    let out = '';
    for(let i=0; i<NUMBERS_ARRAY.length; i++){
        out += '<div class="number-button" data="'+NUMBERS_ARRAY[i]+'">' + String.fromCharCode(NUMBERS_ARRAY[i]) + '</div>';     
    }
    $('.buttons-wrap').html(out);   
}
init();
let number_buttons = $('.number-button');
let calc_wrap = $('.calc-nav');
//При клике получаем цифру
{
    for(let i=0; i<number_buttons.length; i++){     
        $(number_buttons[i]).on('click',function(event){
            let buttons_data = $(number_buttons[i]).html();
            creatorLi(buttons_data);     
        });
    }
}
//подключаем клаву
$(document).on('keypress', function(event){
    if(event.charCode == 13){
       $('.result').addClass('active');
       calc();
       inputResult();
    }
    else{
      $('.result').removeClass('active');
      for(let i=0; i<number_buttons.length; i++){
         let buttons_data = $(number_buttons[i]).html();
         if(event.key == buttons_data){
            $(number_buttons[i]).addClass('active');
         }
         else{
            $(number_buttons[i]).removeClass('active'); 
         }
      }
      creatorLi(event.key);
      calc();  
      
    }   
});    
//считаем
let numbs_array=[];
let out="";
let calc_li="";     
function calc(){
    let li = $('.num');
    for(let i=0; i<li.length; i++){
        let li_value = $(li[i]).html(); 
        numbs_array.push(li_value);       
    };
    let  num = numbs_array.join('');
    num = eval(num);
    numbs_array=[]; 
    return num;    
}    
function inputResult(){
    out = '<li>'+calc()+'</li>';
    $('.result-nav').append(out);
    numbs_array=[]; 
    //console.log(numbs_array)
}   
function creatorLi(num){
    calc_li = '<li class="num">'+num+'</li>';
    $('.calc-nav').append(calc_li);
}  
$('.result').on('click',function(){
    if($('.calc-nav').children('li').length == 0){
        alert('u sholud choose numbers');     
    }
    else{
       calc();
       inputResult();   
    }
});
//чистим
$('.delete').on('click',function(){
    $('.calc-nav li').detach();
    numbs_array=[];
    $('.result').removeClass('active');
    for(let i=0; i<number_buttons.length; i++){
       $(number_buttons[i]).removeClass('active');  
    }
});
$('.clear-result').on('click',function(){
    $('.result-nav li').detach();
    numbs_array=[];
    
});   
});


