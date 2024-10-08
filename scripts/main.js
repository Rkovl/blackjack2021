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

const on = (string)=> {
    document.querySelector("#overlay").style.display = "block";
    document.querySelector("#olContent").innerHTML = string

  }
  
const off=()=> {
    funReset()
    document.querySelector("#overlay").style.display = "none";
    olContent.innerHTML = ''
  }

//used in creating the deck
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
    //I do not this need to be a for loop, or a loop at all. it may have been a left over from some even older code
    for(let A=0; A<1;A++){
        // hold is getting random number based on how many cards are in the deck
        //it then grabs that card and pushes it
        //the function the removes that card from the deck
        let hold = Math.floor(Math.random()*arrDeck.length)
        //the line directly below is unnecessary
        arrDeck[hold]
        who.push(arrDeck[hold])
        arrDeck.splice(hold, 1)

    }
};
const funScore = (who)=>{
    //calculates the score from scratch every time from the entities array by looping through it
    //this was done the recalculate the score incase of aces which are both a score of 1 or 11
    let score = 0
    let ace = 0
    
    for(let A = 0;A<who.length;A++){
        score = who[A].val + score
        if (who[A].val == 11){
            ace += 1
        }
    }
    //if the score is over 21 (so the entity would bust) and it has an ace in hand, change the aces score to 1
    //I could have overwritten the aces value in the entities array so that once an ace needed to turn into a 1 it would stay that way and it would need to go through this section of code so often
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
//funShow intakes the array of the entity, the about of cards they receive, there html element hand and html element score 
const funShow = (whoArr,cardAmount,whoHand,whoScore)=>{
    //loops for the amount of cards being added
    //adds card data to entities array
    //grabs the card data from that array and add a image to the entities hand element
    //then calculates the score and overwrites the old element
    for(let A = 0;A<cardAmount;A++){
        funDeal(whoArr)
        whoHand.innerHTML += `<img src="${whoArr[whoArr.length-1].img}">` 
        whoScore.innerText = funScore(whoArr)
    }
    
}
const funCheck = (p1,p2,p3) =>{
    if (p1>21 && alivePlayer == true){
        alivePlayer = false
        money[0].innerText = parseInt(money[0].innerText)-1
    }
    if (p2>21 && aliveAI1 == true){
        aliveAI1 = false
        money[1].innerText = parseInt(money[1].innerText)-1
    }
    if (p3>21 && aliveAI2 == true){
        aliveAI2 = false
        money[2].innerText = parseInt(money[2].innerText)-1
    }
}
const funLCheck = (p1,p2,p3) =>{
    if (alivePlayer == true){
        if (p1 > 21 || p1 < funScore(arrDealer) && funScore(arrDealer) <= 21){
            alivePlayer = false
            money[0].innerText = parseInt(money[0].innerText)-1
        }
    }
    if (aliveAI1 == true) {
        if(p2 > 21 || p2 < funScore(arrDealer) && funScore(arrDealer) <= 21 ){
            aliveAI1 = false
            money[1].innerText = parseInt(money[1].innerText)-1
        }
    }
    if (aliveAI2 == true){
        if(p3 > 21 || p3 < funScore(arrDealer) && funScore(arrDealer) <= 21 ){
            aliveAI2 = false
            money[2].innerText = parseInt(money[2].innerText)-1
        }
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
    alivePlayer = true
    aliveAI1 = true
    aliveAI2 = true
    arrDeck = arrDeck.concat(arrPlayer,arrAI1,arrAI2)
    for(let A = 0; A<hands.length;A++){
        hands[A].innerHTML = ""
        points[A].innerText = ''
    }
    allButtonsSin[0].disabled = false
    allButtonsSin[1].disabled = true
    allButtonsSin[2].disabled = true
    dealPress = false
    arrDealer = [];
    arrPlayer = [];
    arrAI1 = [];
    arrAI2 = [];
}

// automates adding and creating all the cards and then adding them to a deck
// it is not a function so the amount of decks/cards can not be altered
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

// grabbing all the changing html elements from index.html
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
// disables button 1 and 2 which are the "hit" and "stand" buttons
allButtonsSin[1].disabled = true
allButtonsSin[2].disabled = true

allButtons.addEventListener('click', e=>{
    //what happens when you click on the deal button
    if (e.target.innerText == 'Deal'){
        //fully checking whether the deal button is disabled (not sure if this needs to exist)
        if(dealPress == false){
            // deals two cards to every player with the funShow function
            funShow(arrDealer,2,dealerHand,dealerScore)
            funShow(arrPlayer,2,playerHand,playerScore)
            funShow(arrAI1,2,ai1Hand,ai1Score)
            funShow(arrAI2,2,ai2Hand,ai2Score)
            // disables the deal button and then enables the hit and stand buttons
            dealPress = true
            e.target.disabled = true
            allButtonsSin[2].disabled = false
            allButtonsSin[1].disabled = false
        }
    }
    else if (e.target.innerText == 'Hit'){
        funShow(arrPlayer,1,playerHand,playerScore)
        funCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))

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
            on("Lost!!")
        }
    }
    else if (e.target.innerText == 'Stand'){

        if(funScore(arrAI1) < funScore(arrDealer) && funScore(arrDealer)<=21){
            funShow(arrAI1,1,ai1Hand,ai1Score)

        }
        if(funScore(arrAI2) < funScore(arrDealer) && funScore(arrDealer)<=21){
            funShow(arrAI2,1,ai2Hand,ai2Score)

        }
        
        funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))

        while (funScore(arrPlayer)>=funScore(arrDealer) && funScore(arrDealer)<=16){
            if (funScore(arrPlayer)==funScore(arrDealer)){
                on("Tie!!")
                funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
                break;
            }

            funShow(arrDealer,1,dealerHand,dealerScore) 

            if (funScore(arrDealer)>21){
                on("Win!!")
                funCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
                break;
            }
            
        }

        funLCheck(funScore(arrPlayer),funScore(arrAI1),funScore(arrAI2))
        if(!alivePlayer){
            on("Lost!!")
        }
        else if (funScore(arrPlayer)==funScore(arrDealer)){
            on("Tie!!")
        }
        else{
            on("Win!!")
        }
    }
})