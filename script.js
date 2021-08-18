// let arr = [
//     ['o','x','o'],
//     ['x','x','o'],
//     ['o','o','x']
// ];
let arr=[
    ["","",""],
    ["","",""],
    ["","",""]
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
            if(player.get_curr_player()==2)
            {player.player_toggle();}
            let cells=document.querySelectorAll(".cell");
            document.querySelector("#draw").textContent="The Winner is: -";
            document.querySelector("#winner").textContent="";
            cells.forEach((e)=>
            {
                e.disabled=false    ;
                // e.style=""
            });
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
    
  
        // console.log("Draw");
        // diagonal
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i][i]!=piece)
                break;
            if(i==arr.length-1)
                return piece;   
            // console.log("winner: ",piece )    
        }
        
        for(var i=0;i<arr.length;i++)
        {
            for(var j=0;j<arr.length;j++)
            {
                if(arr[i][j]=="")
                {
                    flag=false;
                    return "";
                }
                else
                {
                    flag=true;
                }
            }
            if(flag)
            {
                _board_full(flag);
                return "";
            }
        }
        
        return "";
    }

    const _declare_winner =(piece)=>
    {
        _gameover(piece);
        // _board_full();
        document.querySelector("#winner").textContent=piece;
        console.log("in declare winner",piece)
    }
    const _board_full = (flag)=>
    {
        // let flag=false;
        // for(var i=0;i<arr.length;i++)
        // {
        //     for(var j=0;j<arr.length;j++)
        //     {
        //         console.log("in board full ",i,j);
        //         if(arr[i][j]=="")
        //         {
        //             flag=false;
        //             break;
        //         }
        //         else
        //         {
        //             flag=true;
        //         }
        //     }
        //     if(!flag)break;
        // }
        // console.log(flag);
        // if(flag)
        // {
            document.querySelector("#draw").textContent="It's a draw";
            _gameover(flag);
        // }
    }
    const _gameover = (x)=>
    {
        if(x)
        {
            let cells=document.querySelectorAll(".cell");
            cells.forEach((e)=>
            {
                e.disabled=true;
                // e.style=""
            })
        }
    }
    return {init,bind,fillBoard};
})();


const player =  ((piece)=>{
    
    let curr_player="X";
   
    const player_choice =()=>
    {
        console.log("here");
        let player1= document.querySelector("#player1_sel");
        let player2= document.querySelector("#player2_sel");
        if(player1.value=="X")
        {player2.value="O";}
        else if(player1.value=="O")
        {player2.value="X";}
        curr_player=player1.value;
        console.log("here",curr_player)
        return curr_player;
    };
    const _curr_piece=(()=>{
        if(curr_player=="X")
        curr_player="O";
        else
        curr_player="X"
        
        return curr_player;
    });
    // let curr=1;
    const get_curr_player =()=>
    {
        let player1_sel= document.querySelector("#player1_sel").value;
        let player2_sel= document.querySelector("#player2_sel").value;
        if((curr_player=='X'&&player1_sel=='X')||curr_player=='O'&&player1_sel=='O')
            return 1;
        else if( (curr_player=='X'&&player2_sel=='X')||(curr_player=='O'&&player2_sel=='O'))
            return 2;
    };
    const player_toggle=(()=>
    {
        let player1=document.querySelector("#player1");
        let player2=document.querySelector("#player2");
        let player1_sel= document.querySelector("#player1_sel").value;
        let player2_sel= document.querySelector("#player2_sel").value;
        console.log("in player toggle",curr_player)
        if(player1_sel==curr_player)
        {            
            player1.classList.toggle("curr_sel");
            player2.classList.toggle("curr_sel");

        }   
        if(player2_sel==curr_player)
        {
            player1.classList.toggle("curr_sel");
            player2.classList.toggle("curr_sel");
        }
        _curr_piece();
    });
    const move =(e)=>
    {
        console.log(e);
        const i =e.substring(5,7)[0];
        const j =e.substring(5,7)[1];
        // console.log(i,j);
        let piece=curr_player;
        console.log(piece);
        if(arr[i][j]==="")
        {
            arr[i][j]=piece;
            if(get_curr_player()==1)
            document.querySelector(`#cell_${i}${j}`).style="!important;color:blue;"
            else
            document.querySelector(`#cell_${i}${j}`).style="!important;color:red;"

            gameBoard.fillBoard(i,j,piece);         
            console.log("in move",get_curr_player());

            console.log(arr)   
            piece = player_toggle();
        }
        // gameBoard.check_winner(i,j,piece);
        
    };

    const _bind_selector=(()=>
    {
        let player1= document.querySelector("#player1_sel");
        let player2= document.querySelector("#player2_sel");
        console.log("here");
        player1.addEventListener("change",()=>{ player_choice()});
        player2.addEventListener("change",()=>{ player_choice()});
    })();
    return {move,player_choice,player_toggle,get_curr_player};
})();

gameBoard.init();
// player.bind();
