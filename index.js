const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
    static width = 40
    static height = 40
    constructor({position, image}) {
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw() {
        // c.fillStyle = 'gray'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height
        //     )
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}
class Flag {
    static width = 30
    static height = 30
    constructor({position, image}){
        this.position = position
        this.width = 40
        this.height = 40
        this.image = image
    }

    draw() {
        // c.beginPath()
        // c.arc(this.position.x, this.position.y, this.radius, 0,
        //     Math.PI * 2)
        //     c.fillStyle = 'yellow'
        //     c.fill()
        //     c.closePath()
        c.drawImage(this.image, this.position.x, this.position.y)  
    }
}
const flags = []

class Player {
    constructor({position, velocity}){
   
        this.position = position 
        this.velocity = velocity
        this.radius = 15
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0,
            Math.PI * 2)
            c.fillStyle = 'yellow'
            c.fill()
            c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}


const boundaries = []
const player = new Player({
    position: {
        x:Boundary.width + Boundary.width /2,
        y:Boundary.height + Boundary.height /2

    },
    velocity:{
        x:0,
        y:0
    }
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let lastkey = ''

const map = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'], 
    ['-',' ',' ',' ',' ',' ','.','-','-',' ',' ',' ',' ','.','-','-','-','-','-','-','-','-',' ',' ',' ',' ',' ','.','-'], 
    ['-',' ','-','-',' ','-',' ',' ',' ',' ','-','-','-',' ','-','-','-',' ',' ','.','-','-',' ','-',' ','-','-',' ','-'],
    ['-',' ','-','-',' ','-',' ','-','-',' ','-','-','-',' ',' ',' ',' ',' ','-',' ','-',' ',' ','-',' ','-','-',' ','-'],
    ['-',' ','.',' ',' ',' ',' ','-','-',' ','-','-',' ',' ',' ','-','-',' ','-',' ',' ',' ','-','-',' ','-','-',' ','-'],
    ['-',' ','-',' ','-','-',' ','.',' ',' ','-','-',' ','-',' ','-','-',' ','-','-',' ','-','-','-','.',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ',' ','-','-',' ','-','-',' ','-',' ','-','-',' ','-','-',' ','-','-','-','-','-','-',' ','-'],
    ['-',' ','-',' ','-',' ','-','-','-',' ',' ','-',' ','-',' ',' ',' ','.',' ',' ',' ',' ',' ',' ',' ','-','-',' ','-'],
    ['-',' ','-',' ',' ',' ','-','-','-','-',' ','.',' ',' ',' ','-','-',' ','-','-','-','-',' ','-',' ',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ','-','-','-','-',' ','-','-',' ','-','-','-',' ','-','-','-','-',' ','-','-','-','-',' ','-'],
    ['-',' ',' ',' ',' ','.','-','-','-',' ',' ','-','-',' ','-','-','-',' ','-','-','-','-',' ',' ',' ',' ','-',' ','-'],
    ['-',' ','-','-',' ','-','-','-','-',' ','-','-','-',' ','-',' ',' ',' ',' ','-',' ',' ','.','-','-',' ','-',' ','-'],
    ['-','.',' ',' ',' ',' ',' ',' ',' ',' ',' ','.',' ',' ',' ',' ','-','-',' ',' ',' ','-','-','-','-',' ',' ','.','-'],
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'], 

    ]

    function createImage(src){
        const image = new Image()
        image.src = src
        return image  
    }


map.forEach((row, i) => {
    row.forEach((symbol, j) => { 
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                        },
                        image: createImage('./images/meteor2.png')
                    })
                    )
                break
            case '.':
                flags.push(
                    new Flag({
                         position: {
                            x: Boundary.width * j + 5,
                            y: Boundary.height * i +5  
                            },
                            image: createImage('./images/flag.png')
                        })
                        )
                    break    
        }
    })
})
function collision({
    circle,
    rectangle

}) {
    return (
        circle.position.y - circle.radius + circle.velocity.y 
            <= 
            rectangle.position.y + rectangle.height && circle.position.x + circle.radius + circle.velocity.x 
            >= 
            rectangle.position.x && circle.position.y + circle.radius + circle.velocity.y
            >=
             rectangle.position.y && circle.position.x - circle.radius + circle.velocity.x
            <= 
            rectangle.position.x + rectangle.width 
    )
}
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if(keys.w.pressed && lastkey === 'w') {
       for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if (
            collision({
            circle: {...player, velocity: {
                x: 0,
                y: -5
            }},
            rectangle: boundary
        })
        ){
        player.velocity.y = 0
        break

        } else {
        player.velocity.y = -5  
        }
    }
    }else if (keys.a.pressed && lastkey === 'a') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                circle: {...player, velocity: {
                    x: -5,
                    y: 0
                }},
                rectangle: boundary
            })
            ){
            player.velocity.x = 0
            break
    
            } else {
            player.velocity.x = -5  
            }
        }
    } else if (keys.s.pressed && lastkey === 's') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                circle: {...player, velocity: {
                    x: 0,
                    y: 5
                }},
                rectangle: boundary
            })
            ){
            player.velocity.y = 0
            break
    
            } else {
            player.velocity.y = 5  
            }
        }
    } else if (keys.d.pressed && lastkey === 'd') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                collision({
                circle: {...player, velocity: {
                    x: 5,
                    y: 0
                }},
                rectangle: boundary
            })
            ){
            player.velocity.x = 0
            break
    
            } else {
            player.velocity.x = 5  
            }
        }
    }

    flags.forEach(flag => {
        flag.draw()
    })

    boundaries.forEach((boundary) => {
        boundary.draw()
        if (
            collision({
            circle: player,
            rectangle: boundary
        })
        ){
            player.velocity.y = 0
            player.velocity.x = 0 
        }
    })
    
    player.update()
    // player.velocity.y = 0
    // player.velocity.x = 0
   

}

animate()



addEventListener('keydown', ({key}) => {
 
    switch (key) {
        case 'w':
        keys.w.pressed = true
        lastkey = 'w'
        break
        case 'a':
        keys.a.pressed = true
        lastkey = 'a'
        break
        case 's':
        keys.s.pressed = true
        lastkey = 's'
        break
         case 'd':
        keys.d.pressed = true
        lastkey = 'd'
        break
    }

    
})

addEventListener('keyup', ({key}) => {
 
    switch (key) {
        case 'w':
        keys.w.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 's':
        keys.s.pressed = false
        break
        case 'd':
        keys.d.pressed = false
        break
        }
      
       
})

