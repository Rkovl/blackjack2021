let arrDeck = [];
let arrDealer = [];
let arrPlayer = [];
let arrAI1 = [];
let arrAI2 = [];

let alivePlayer = true
let aliveAI1 = true
let aliveAI2 = true


class Cards{
    constructor(num,suit,img,val,name){
        this.num = num
        this.suit = suit
        this.img = img
        this.val = val
        this.name = name
    }
};


const funSuit = (type) =>{
    switch(type){
        case 1:
            return 'clubs';
        case 2:
            return 'diamonds';
        case 3:
            return 'hearts';
        case 4:
            return 'spades';
    }
};
const funDeal = (who)=>{
    for(let A=0; A<1;A++){
        let hold = Math.floor(Math.random()*arrDeck.length)
        arrDeck[hold]
        who.push(arrDeck[hold])
        arrDeck.splice(hold, 1)

    }
};
const funScore = (who)=>{
    let score = 0
    let ace = 0
    
    for(let A = 0;A<who.length;A++){
        score = who[A].val + score
        if (who[A].val == 11){
            ace += 1
        }
    }
    if (score>21 && ace>0){
        for(let B = 0; B<ace;B++){
            if (score>21 && ace>0){
                score = score-10
            }
        }
        return score
    }
    else{
        return score
    }

}
const funShow = (whoArr,cardAmount,whoHand,whoScore)=>{
    for(let A = 0;A<cardAmount;A++){
        funDeal(whoArr)
        whoHand.innerHTML += `<img src="${whoArr[whoArr.length-1].img}">` 
        whoScore.innerText = funScore(whoArr)
    }
    
}
const funCheck = (p1,p2,p3) =>{
    let A = 0
    //console.log(p1);
    //console.log(p2);
    //console.log(p3);
    //console.log(alivePlayer);
    //console.log(aliveAI1);
    //console.log(aliveAI2);
    while(A<3){
        if (p1>21 && alivePlayer == true){
            alivePlayer = false
            money[0].innerText = parseInt(money[0].innerText)-1
        }
        else if (p2>21 && aliveAI1 == true){
            aliveAI1 = false
            money[1].innerText = parseInt(money[1].innerText)-1
        }
        else if (p3>21 && aliveAI2 == true){
            aliveAI2 = false
            money[2].innerText = parseInt(money[2].innerText)-1
        }
        A += 1
    }
}
const funLCheck = (p1,p2,p3) =>{
    let A = 0
    //console.log(p1);
    //console.log(p2);
    //console.log(p3);
    //console.log(alivePlayer);
    //console.log(aliveAI1);
    //console.log(aliveAI2);
    while(A<3){
        if ((p1>21 && alivePlayer == true)){
            alivePlayer = false
            money[0].innerText = parseInt(money[0].innerText)-1
        }
        else if ((p2>21 && aliveAI1 == true)){
            aliveAI1 = false
            money[1].innerText = parseInt(money[1].innerText)-1
        }
        else if ((p3>21 && aliveAI2 == true)){
            aliveAI2 = false
            money[2].innerText = parseInt(money[2].innerText)-1
        }
        
        if(p1<funScore(arrDealer)&& alivePlayer == true){
            alivePlayer = false
            money[0].innerText = parseInt(money[0].innerText)-1 
        }
        else if (p2<funScore(arrDealer)&&aliveAI1 == true){
            aliveAI1 = false
            money[1].innerText = parseInt(money[1].innerText)-1
        }
        else if (p3<funScore(arrDealer)&&aliveAI2 == true){
            aliveAI2 = false
            money[2].innerText = parseInt(money[2].innerText)-1
        }
        A += 1
    }
}
const funReset = ()=>{

    if(alivePlayer == true){
        money[0].innerText = parseInt(money[0].innerText)+1
    }
    if(aliveAI1 == true){
        money[1].innerText = parseInt(money[1].innerText)+1
    }
    if(aliveAI2 == true){
        money[2].innerText = parseInt(money[2].innerText)+1
    }
    //console.log('test');
    alivePlayer = true
    aliveAI1 = true
    aliveAI2 = true
    arrDeck = arrDeck.concat(arrPlayer,arrAI1,arrAI2)
    //console.log('test2');
    for(let A = 0; A<hands.length;A++){
        //console.log(hands[A]);
        //console.log(points[A]);
        hands[A].innerHTML = ""
        points[A].innerText = ''
    }
    //console.log('test3');
    allButtonsSin[0].disabled = false
    allButtonsSin[1].disabled = true
    allButtonsSin[2].disabled = true
    dealPress = false
    arrDealer = [];
    arrPlayer = [];
    arrAI1 = [];
    arrAI2 = [];
}


for(let num=2; num<=14;num++){
    for(let suit=1; suit<=4;suit++){
        if(num<=10){
            arrDeck.push(new Cards(num,funSuit(suit),'images/'+num+'_of_'+funSuit(suit)+'.png',num,num+funSuit(suit)))
        }
        else if (num == 11){
            arrDeck.push(new Cards(num,funSuit(suit),'images/jack_of_'+funSuit(suit)+'.png',10,'jack'+funSuit(suit)))
        }
        else if (num == 12){
            arrDeck.push(new Cards(num,funSuit(suit),'images/queen_of_'+funSuit(suit)+'.png',10,'queen'+funSuit(suit)))
        }
        else if (num == 13){
            arrDeck.push(new Cards(num,funSuit(suit),'images/king_of_'+funSuit(suit)+'.png',10,'king'+funSuit(suit)))
        }
        else{
            arrDeck.push(new Cards(num,funSuit(suit),'images/ace_of_'+funSuit(suit)+'.png',11,'ace'+funSuit(suit)))
        }
    }

}


let allButtons = document.querySelector('.buttons')
let allButtonsSin = document.querySelectorAll('button')
let dealerHand = document.querySelector('#dealer-hand')
let playerHand = document.querySelector('#player-hand')
let ai1Hand = document.querySelector('#ai1-hand')
let ai2Hand = document.querySelector('#ai2-hand')
let dealerScore = document.querySelector('#dealer-points')
let playerScore = document.querySelector('#player-points')
let ai1Score = document.querySelector('#ai1-points')
let ai2Score = document.querySelector('#ai2-points')
let hands = document.querySelectorAll('.hand')
let points =  document.querySelectorAll('.points')
let money = document.querySelectorAll('.money')


let dealPress = false

allButtonsSin[1].disabled = true
allButtonsSin[2].disabled = true

allButtons.addEventListener('click', e=>{
    if (e.target.innerText == 'Deal'){
        if(dealPress == false){
            funShow(arrDealer,2,dealerHand,dealerScore)
            funShow(arrPlayer,2,playerHand,playerScore)
            funShow(arrAI1,2,ai1Hand,ai1Score)
            funShow(arrAI2,2,ai2Hand,ai2Score)

            dealPress = true
            e.target.disabled = true
            allButtonsSin[2].disabled = false
            allButtonsSin[1].disabled = false
        }
        else{

        }

    }
    else if (e.target.innerText == 'Hit'){
        funShow(arrPlayer,1,playerHand,playerScore)
        funCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
        //console.log(alivePlayer);
        //console.log(aliveAI1);
        //console.log(aliveAI2);

        if(aliveAI1 == true){
            if (funScore(arrAI1) <= funScore(arrDealer) && funScore(arrAI1) < 16){
                funShow(arrAI1,1,ai1Hand,ai1Score)
            }
        }
        if(aliveAI2 == true){
            if (funScore(arrAI2) < funScore(arrPlayer)){
                funShow(arrAI2,1,ai2Hand,ai2Score)
            }
        }
        if (alivePlayer == false){
            funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
            alert('you suck')
            funReset()
        }
    }
    else if (e.target.innerText == 'Stand'){

        if(funScore(arrAI1) < funScore(arrDealer) && funScore(arrDealer)<=21){
            funShow(arrAI1,1,ai1Hand,ai1Score)
            //console.log('object');
        }
        if(funScore(arrAI2) < funScore(arrDealer) && funScore(arrDealer)<=21){
            funShow(arrAI2,1,ai2Hand,ai2Score)
            //console.log('object');
        }
        
        funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))

        while (funScore(arrPlayer)>=funScore(arrDealer)){
            if (funScore(arrPlayer)==funScore(arrDealer)&&funScore(arrDealer)> 16){
                alert('you tie (not in the fashion sense)')
                funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
                funReset()
                break;
            }

            funShow(arrDealer,1,dealerHand,dealerScore) 

            if (funScore(arrDealer)>21){
                alert('you win!')
                funCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
                funReset()
                break;
            }
            
        }
        console.log('object');
        console.log(alivePlayer)
        console.log(aliveAI1);
        console.log(aliveAI2);
        // if (funScore(arrPlayer)<funScore(arrDealer) && alivePlayer == true && funScore(arrDealer)>21){
        //     console.log('1');
        //     alivePlayer = false
        //     money[0].innerText = parseInt(money[0].innerText)-1
        // }
        // if (funScore(arrAI1)<funScore(arrDealer) && aliveAI1 == true && funScore(arrDealer)>21){
        //     console.log('2');
        //     aliveAI1 = false
        //     money[1].innerText = parseInt(money[1].innerText && funScore(arrDealer)>21)-1
        // }
        // if (funScore(arrAI2)<funScore(arrDealer) && aliveAI2 == true){
        //     console.log('3');
        //     aliveAI2 = false
        //     money[2].innerText = parseInt(money[2].innerText)-1
        // }
        funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
        if(funScore(arrPlayer)<funScore(arrDealer)){
            alert('you a loser')
            funReset()
        }
    }

    else{

    }

})