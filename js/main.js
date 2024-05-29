'use strict'

function onBallClick(elBall) {
    elBall.innerText = +elBall.innerText + getRandomInt(20,61)
    if (elBall.innerText>400) elBall.innerText = 100
    elBall.style.height = elBall.innerText + 'px'
    elBall.style.width = elBall.innerText + 'px'
    elBall.style.backgroundColor = getRandomColor()
}