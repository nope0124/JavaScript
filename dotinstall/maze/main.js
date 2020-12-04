(function(){


    var Map=function(col,row){
        this.maze=[];
        this.col=col;
        this.row=row;
        this.sX=0;
        this.sY=0;
        this.gX=col-1;
        this.gY=row-1;
        this.points=[
            [0,-1],
            [0,1],
            [1,0],
            [-1,0]
        ];
        this.rand=function(n){
            return Math.floor(Math.random()*n);
        };

        this.init=function(){
            for (let y=0;y<row;y++) {
                this.maze[y]=[];
                for(let x=0;x<col;x++){
                    if(x%2 === 1 && y%2 === 1) this.maze[y][x]=1;
                    else this.maze[y][x]=0;
                }
            }

            for(let y=1;y<row;y+=2){
                for(let x=1;x<col;x+=2){
                    do{
                        var d;
                        if(x===1) d=this.points[this.rand(4)];
                        else d=this.points[this.rand(3)];
                    }while(this.maze[y+d[1]][x+d[0]] === 1);
                    this.maze[y+d[1]][x+d[0]]=1;
                }
            }
        };

        this.draw=function(){
            var view=new View();
            view.draw(this);
        };
    };

    var View=function(){
        this.wallSize=10;
        this.wallColor='#3261AB';
        this.routeColor='#FF0088';
        this.canvas=document.getElementById("mycanvas");
        if(!this.canvas || !this.canvas.getContext) return false;
        this.ctx=this.canvas.getContext("2d");
        this.draw=function(map){
            this.canvas.width=(map.col+2)*this.wallSize;
            this.canvas.height=(map.row+2)*this.wallSize;

            for(let x=0;x<map.col+2;x++){
                this.drawWall(x,0);
                this.drawWall(x,map.row+1);
            }

            //左右の壁
            for(let y=0;y<map.row+2;y++){
                this.drawWall(0,y);
                this.drawWall(map.col+1,y);
            }

            //迷路の内部
            for(let y=0;y<map.row;y++){
                for(let x=0;x<map.col;x++){
                    if(map.maze[y][x] === 1) this.drawWall(x+1,y+1);
                    if(x === map.sX && y === map.sY || x === map.gX && y === map.gY) this.drawRoute(x+1,y+1);
                }
            }
        };
        this.drawWall=function(x,y){
            this.ctx.fillStyle=this.wallColor;
            this.drawRect(x,y);
        };
        
        this.drawRoute=function(x,y){
            this.ctx.fillStyle=this.routeColor;
            this.drawRect(x,y);
        };
    
        this.drawRect=function(x,y){
            this.ctx.fillRect(
                x * this.wallSize,
                y * this.wallSize,
                this.wallSize,
                this.wallSize
            );
        };
    };
    function reset(){
        var map=new Map(51,51);
        map.init();
        map.draw();
    }

    reset();

    document.getElementById("reset").addEventListener("click",function(){
        reset();
    });

    // //迷路で配列を用意
    // // var maze=[
    // //     "...",
    // //     ".#.",
    // //     ".#."
    // // ];
    // var maze=[];
    // //棒倒し法
    
    // //Canvasで描画
    // var col=13;
    // var row=13;



    // for (let y=0;y<row;y++) {
    //     maze[y]=[];
    //     for(let x=0;x<col;x++){
    //         if(x%2 === 1 && y%2 === 1) maze[y][x]=1;
    //         else maze[y][x]=0;
    //     }
    // }
    

    // var points=[
    //     [0,-1],
    //     [0,1],
    //     [1,0],
    //     [-1,0]
    // ];

    // function rand(n){
    //     return Math.floor(Math.random()*n);
    // }

    // for(let y=1;y<row;y+=2){
    //     for(let x=1;x<col;x+=2){
    //         do{
    //             var d;
    //             if(x===1) d=points[rand(4)];
    //             else d=points[rand(3)];
    //         }while(maze[y+d[1]][x+d[0]] === 1);
    //         maze[y+d[1]][x+d[0]]=1;
    //     }
    // }

    // var sX=0;
    // var sY=0;
    // var gX=col-1;
    // var gY=row-1;

    // var wallSize=10;
    // var wallColor='#3261AB';
    // var routeColor='#FF0088';
    // //var canvas=document.getElementById("mycanvas");
    // if(!document.getElementById("mycanvas") || !document.getElementById("mycanvas").getContext) return false;
    // //var ctx=canvas.getContext("2d");
    // document.getElementById("mycanvas").width=(col+2)*wallSize;
    // document.getElementById("mycanvas").height=(row+2)*wallSize;

    // //上下の壁
    // for(let x=0;x<col+2;x++){
    //     drawWall(x,0);
    //     drawWall(x,row+1);
    // }
    // //左右の壁
    // for(let y=0;y<row+2;y++){
    //     drawWall(0,y);
    //     drawWall(col+1,y);
    // }

    // //迷路の内部
    // for(let y=0;y<row;y++){
    //     for(let x=0;x<col;x++){
    //         if(maze[y][x] === 1) drawWall(x+1,y+1);
    //         if(x === sX && y === sY || x === gX && y === gY) drawRoute(x+1,y+1);
    //     }
    // }


    // //壁を描画
    // function drawWall(x,y){
    //     document.getElementById("mycanvas").getContext("2d").fillStyle=wallColor;
    //     drawRect(x,y);
    // }
    
    // function drawRoute(x,y){
    //     document.getElementById("mycanvas").getContext("2d").fillStyle=routeColor;
    //     drawRect(x,y);
    // }

    // function drawRect(x,y){
    //     document.getElementById("mycanvas").getContext("2d").fillRect(
    //         x * wallSize,
    //         y * wallSize,
    //         wallSize,
    //         wallSize
    //     );
    // }

})();