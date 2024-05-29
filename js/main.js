'use strict'

function onBallClick(elBall) {
    elBall.innerText = +elBall.innerText +50
    elBall.style.height = elBall.innerText + 'px'
    elBall.style.width = elBall.innerText + 'px'
}