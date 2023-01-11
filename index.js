const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreEL = document.querySelector('#scoreEl')

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


class Ghost {
    static speed = 2
    constructor({position, velocity, image}){


        this.position = position 
        this.velocity = velocity
        this.radius = 15
        this.image = image
        this.prevCollisions =[]
        this.speed = 2
    }

    draw() {
        c.drawImage(this.image, this.position.x -18, this.position.y-13)  
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0,
            Math.PI * 2)
           
            // c.fill()
            c.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Flag {
    static width = 30
    static height = 30
    constructor({position, image}){
        this.position = position
        this.width = 40
        this.height = 40
        this.radius = 10
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

const flags = []
const boundaries = []
const ghosts = [
    new Ghost({
   position:{
    x:Boundary.width + Boundary.width *10.5,
    y:Boundary.height  +20
   },
   velocity: {
    x: Ghost.speed,
    y:0
   },
   image: createImage('./images/ufo.png')     
})]
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
let score = 0

const map = [
    ['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-'], 
    ['-',' ',' ',' ',' ',' ','.','-','-',' ',' ',' ',' ','.','-','-','-','-','-','-','-','-',' ',' ',' ',' ',' ','.','-'], 
    ['-',' ','-','-',' ','-',' ',' ',' ',' ','-','-','-',' ','-','-','-',' ',' ','.','-','-',' ','-',' ','-','-',' ','-'],
    ['-',' ','-','-',' ','-',' ','-','-',' ','-','-','-',' ',' ',' ',' ',' ','-',' ','-',' ',' ','-',' ','-','-',' ','-'],
    ['-',' ','.',' ',' ',' ',' ','-','-',' ','-','-',' ',' ',' ','-','-',' ','-',' ',' ',' ','-','-',' ','-','-',' ','-'],
    ['-',' ','-',' ','-','-',' ','.',' ',' ','-','-',' ','-',' ','-','-',' ','-',' ','-','-','-','-','.',' ',' ',' ','-'],
    ['-',' ','-',' ','-',' ',' ','-','-',' ','-','-',' ','-',' ','-','-',' ','-',' ','-','-','-','-','-','-','-',' ','-'],
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
    const padding = Boundary.width / 2 - circle.radius -1
    return (
        circle.position.y - circle.radius + circle.velocity.y 
            <= 
            rectangle.position.y + rectangle.height + padding && circle.position.x + circle.radius + circle.velocity.x 
            >= 
            rectangle.position.x - padding && circle.position.y + circle.radius + circle.velocity.y
            >=
             rectangle.position.y - padding && circle.position.x - circle.radius + circle.velocity.x
            <= 
            rectangle.position.x + rectangle.width + padding
    )
}

// let animationId

function animate() {
    // animationId = 
    requestAnimationFrame(animate)
    // console.log(animationId)

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

    flags.forEach((flag, i )=> {
        flag.draw()

        if (
            Math.hypot(
                flag.position.x - player.position.x, 
                flag.position.y - player.position.y
                ) < flag.radius + player.radius
                ) {
                    console.log('touching')
                    flags.splice(i, 1)
                    score += 100
                    scoreEL.innerHTML = score
                }
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
   ghosts.forEach(ghost => {
    ghost.update()


    const collisions2 = []
    boundaries.forEach(boundary => {
        if (
            !collisions2.includes('right') &&
            collision({
            circle: {...ghost, velocity: {
                x: ghost.speed,
                y: 0
            }},
            rectangle: boundary
        })
        ) {
            collisions2.push('right')

        }

        if (
            !collisions2.includes('left') &&
            collision({
            circle: {...ghost, velocity: {
                x: -ghost.speed,
                y: 0
            }},
            rectangle: boundary
        })
        ) {
            collisions2.push('left')

        }

        if (
            !collisions2.includes('up') &&
            collision({
            circle: {...ghost, velocity: {
                x: 0,
                y: -ghost.speed
            }},
            rectangle: boundary
        })
        ) {
            collisions2.push('up')

        }

        if (
            !collisions2.includes('down') &&
            collision({
            circle: {...ghost, velocity: {
                x: 0,
                y: ghost.speed
            }},
            rectangle: boundary
        })
        ) {
            collisions2.push('down')

        }

    })
    if (collisions2.length > ghost.prevCollisions.length)
    ghost.prevCollisions = collisions2

    if(JSON.stringify(collisions2) !== JSON.stringify(ghost.prevCollisions)) {
        // console.log('gogo')
      
        if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
        if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
        if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')
        if (ghost.velocity.y < 0) ghost.prevCollisions.push('up')

        console.log(collisions2)
        console.log(ghost.prevCollisions)

        const pathways = ghost.prevCollisions.filter(collision =>
           {
            return !collisions2.includes(collision)
           } )
           console.log({pathways})

           const direction = pathways[Math.floor(Math.random() * pathways.length)]
           console.log({direction})

           switch (direction) {
            case 'down':
                ghost.velocity.y = ghost.speed
                ghost.velocity.x = 0
                break
                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break 
                case 'right':
                        ghost.velocity.y = 0
                        ghost.velocity.x = ghost.speed
                        break   
                    case 'left':
                        ghost.velocity.y = 0
                        ghost.velocity.x = -ghost.speed
                        break
           }

           ghost.prevCollisions = []
    }
    

    // console.log(collisions2)
   })
   

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

