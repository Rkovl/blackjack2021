const arrDeck = [];
const arrDealer = [];
const arrPlayer = [];
const arrAI1 = [];
const arrAI2 = [];

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
class Players{
    constructor(hand,points,money){
        this.hand = hand
        this.points = points
        this.money = money
        this.alive = true
        this.arr = []
    }
}


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
        console.log(score);
        return score
    }
    else{
        console.log(score);
        return score
    }

}
const funShow = (whoArr,cardAmount,whoHand,whoScore)=>{
    for(let A = 0;A<cardAmount;A++){
        funDeal(whoArr)
        whoHand.innerHTML += `<img src="${whoArr[whoArr.length-1].img}">` 
        whoScore.innerText = funScore(whoArr)
        console.log(funScore(whoArr));
    }
    
}
const funCheck = (p1,p2,p3) =>{
    let A = 0
    while(A<3)
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
const funReset = ()=>{

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
// let Player = new Players(document.querySelector('#player-hand'),document.querySelector('#player-points'),document.querySelector('#player=money'))
// let ai1 = new Players(document.querySelector('#ai1-hand'),document.querySelector('#ai1-points'),document.querySelector('#ai1=money'))
// let ai2 = new Players(document.querySelector('#ai2-hand'),document.querySelector('#ai2-points'),document.querySelector('#ai2=money'))

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
        funCheck(playerScore,ai1Score,ai2Score)
        if (alivePlayer == false){
            alert('you suck')
            e.target.disabled = true
            location.reload(); 
        }
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
    }
    else if (e.target.innerText == 'Stand'){

        while (funScore(arrPlayer)>=funScore(arrDealer)){
            if (funScore(arrPlayer)==funScore(arrDealer)&&funScore(arrDealer)> 16){
                alert('you tie (not in the fashion sense)')
                location.reload(); 
            }

            funShow(arrDealer,1,dealerHand,dealerScore)
            

            if (funScore(arrDealer)>21){
                alert('you win!')
                location.reload();
            }
            
        }
        alert('you a loser')
        location.reload(); 
    }

    else{

    }

})