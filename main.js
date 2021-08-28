const x_class='x'
const o_class='circle'
const winning_combo=[
 
    [0,1,2],
    [3,4,5,],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

]

const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
const winningmessageelement=document.getElementById('winningMessage')
const winningmessagetextelement=document.querySelector('[data-winning-message-text]')
const restartbutton=document.getElementById('RestartButton')
let circleturn
startgame()
restartbutton.addEventListener('click',startgame)

function startgame()
{
   circleturn=false
    cellElements.forEach(cell=> {
        cell.classList.remove(x_class)
        cell.classList.remove(o_class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener('click',handleClick,{once:true})
        
    })
    setBoardHoverClass()
    winningmessageelement.classList.remove('show')
}

function handleClick(e){
    const cell=e.target
    const currentClass=circleturn ? o_class : x_class
    placemark(cell,currentClass)
    if(checkwin(currentClass))
    {
        endGame(false)

    }
    else if(isDraw())
    {
        endGame(true);
    }
    else{
       swapTurns()
      setBoardHoverClass()
    }
}
function isDraw()
{
    return [...cellElements].every(cell=>{

        return cell.classList.contains(x_class)||cell.classList.contains(o_class)
    })
}
function endGame(draw)
{
    if(draw){
       winningmessagetextelement.innerText='Draw!'
    }
    else{
        winningmessagetextelement.innerText=`${circleturn ? " O's " :"X's" }Wins!`
    }
    winningmessageelement.classList.add('show')
}
function placemark(cell,currentClass){

    cell.classList.add(currentClass)
}
function swapTurns()
{
    circleturn=!circleturn
}
function setBoardHoverClass(){

   board.classList.remove(x_class)
   board.classList.remove(o_class)
   if(circleturn)
   {
       board.classList.add(o_class)
   }
   else
   {
    board.classList.add(x_class)
   }
}   
function checkwin(currentClass)
{
   return  winning_combo.some(combinations=>{
    
        return combinations.every(index=>{
        
             return  cellElements[index].classList.contains(currentClass)        //If the current class is in 
                                                                                 //each of the cell then we are
                                                                                 //winner
        
        
        })

    })
}