// let arr = [
//     ['o','x','o'],
//     ['x','x','o'],
//     ['o','o','x']
// ];
let arr=[
    ["00","01","02"],
    ["10","11","12"],
    ["20","21","22"]
];
const gameBoard = (()=>
{
    const init =()=>{
        
        fillBoard();
        _clear();
        bind();
    }
    const fillBoard = (x,y,piece)=>
    {
        for(let i=0;i<arr.length;i++)
        {
            for(let j=0;j<arr.length;j++)
            {
                // console.log("i "+i+" j "+j)
                document.querySelector(`#cell_${i}${j}`).textContent=arr[i][j].toUpperCase();                                
            }
        }
        if(x&&y&&piece)
        {
            const winner=_check_winner(x,y,piece); 
            _declare_winner(winner);
        }   
    }
    const _clear=()=>
    {
        document.querySelector("#clear").addEventListener("click",()=>{
            arr=[
                ["","",""],
                ["","",""],
                ["","",""]];
            fillBoard();
        });
    }
    const bind = ()=>
    {
        document.querySelectorAll(".cell").forEach(
        (e)=>
        {
            e.addEventListener("click",()=>
            {
                console.log(e);
                player.move(e.id);
            });
        });
    }
    const _check_winner = (x,y,piece)=>
    {       
        console.log("in check winner",piece);
        //rows
        for(var i=0;i<arr.length;i++)
        {
            console.log(x,y,piece);
            if(arr[x][i]!=piece)
                break;
            if(i==arr.length-1)
                return piece;
                // console.log("winner: ",piece )
        }
        //cols
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i][y]!=piece)
                break;
            if(i==arr.length-1)
                return piece;   
            // console.log("winner: ",piece )    
        }
    
        return "";
        // console.log("Draw");
        //diagonal
        // for(var i=0;i<arr.length;i++)
        // {
        //     if(arr[i][y]!=piece)
        //         break;
        //     if(i==arr.length-1)
        //         return piece;   
        //     // console.log("winner: ",piece )    
        // }
    }

    const _declare_winner =(piece)=>
    {
        document.querySelector("#winner").textContent=piece;
    }
    return {init,bind,fillBoard};
})();


const player =  ((piece)=>{
    
    let curr_player="X";
    const _player_choice =()=>
    {
        player1:"X";
        player2:"O";
    }
    const _curr_piece=(()=>{
     if(curr_player=="X"){
         curr_player="O";
     }else{curr_player="X"}
     
     return curr_player;
    });
    const move =(e)=>
    {
        console.log(e);
        const i =e.substring(5,7)[0];
        const j =e.substring(5,7)[1];
        // console.log(i,j);
        let piece;
        console.log(piece);
        if(arr[i][j]==="")
        {
            piece = _curr_piece();
            arr[i][j]=piece;
            gameBoard.fillBoard(i,j,piece);         
            console.log(arr)   
        }
        // gameBoard.check_winner(i,j,piece);
        
    };
    return {move,curr_player};
})();

gameBoard.init();
// player.bind();
