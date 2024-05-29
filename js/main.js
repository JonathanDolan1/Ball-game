'use strict'

var gTimeoutId = null

function onBallClick(elBall, maxDiameter) {
    elBall.innerText = +elBall.innerText + getRandomInt(20, 61)
    if (elBall.innerText > maxDiameter) elBall.innerText = 100
    elBall.style.height = elBall.innerText + 'px'
    elBall.style.width = elBall.innerText + 'px'
    elBall.style.backgroundColor = getRandomColor()
}

function onBall3Click() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    const color1 = elBall1.style.backgroundColor
    const color2 = elBall2.style.backgroundColor
    const size1 = elBall1.innerText
    const size2 = elBall2.innerText
    elBall1.innerText = size2
    elBall1.style.height = size2 + 'px'
    elBall1.style.width = size2 + 'px'
    elBall1.style.backgroundColor = color2
    elBall2.innerText = size1
    elBall2.style.height = size1 + 'px'
    elBall2.style.width = size1 + 'px'
    elBall2.style.backgroundColor = color1
}

function onBall4Click() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    const elBalls = [elBall1, elBall2]
    elBalls.forEach(elBall => {
        elBall.innerText = +elBall.innerText - getRandomInt(20, 61)
        if (elBall.innerText < 100) elBall.innerText = 100
        elBall.style.height = elBall.innerText + 'px'
        elBall.style.width = elBall.innerText + 'px'
    })
}

function onBall5Click(){
    document.querySelector('body').style.backgroundColor = getRandomColor()
}

function onBall6Click(){
    document.querySelector('body').style.backgroundColor = 'black'
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    elBall1.style.backgroundColor = 'yellow'
    elBall2.style.backgroundColor = 'aquamarine'
    const elBalls = [elBall1,elBall2]
    elBalls.forEach(elBall=>{
        elBall.innerText = 100
        elBall.style.height = elBall.innerText + 'px'
        elBall.style.width = elBall.innerText + 'px'
    })
}

function onBall6Hover(){
    gTimeoutId = setTimeout(sayHi,2000)
}

function onBall6Leave(){
    clearTimeout(gTimeoutId)
}

function sayHi(){
    console.log('hi');
}