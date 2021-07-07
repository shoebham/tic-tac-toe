let game_array = [
    ['o','x','o'],
    ['x','x','o'],
    ['o','o','x']
];

const gameBoard = (()=>
{
    const init =()=>{
        
        _fillBoard();
        _clear();
        bind();
    }
    const _fillBoard = ()=>
    {
        for(var i=0;i<game_array.length;i++)
        {
            for(var j=0;j<game_array.length;j++)
            {
                // console.log("i "+i+" j "+j)
                document.querySelector(`#cell_${i}${j}`).textContent=game_array[i][j].toUpperCase();                                
            }
        }
    }
    const _clear=()=>
    {
        document.querySelector("#clear").addEventListener("click",()=>{
            game_array=[
                ["","",""],
                ["","",""],
                ["","",""]];
            _fillBoard();
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
    return {init,bind,_fillBoard};
})();
const player =  ((name,piece)=>{
    
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
        console.log(piece);
        if(game_array[i][j]==="")
        {
            const piece= _curr_piece();
            game_array[i][j]=piece;
            gameBoard._fillBoard();
        }
    };
    return {move,curr_player};
})();

gameBoard.init();
// player.bind();