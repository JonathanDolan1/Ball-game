'use strict'

function onBallClick(elBall) {
    elBall.innerText = +elBall.innerText +50
    if (elBall.innerText>400) elBall.innerText = 100
    elBall.style.height = elBall.innerText + 'px'
    elBall.style.width = elBall.innerText + 'px'
}