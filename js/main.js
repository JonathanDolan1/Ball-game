'use strict'

var gTimeoutId = null
var gTimeoutId2 = null
var gIntervalId = null

var gGameHistory = []
var gCurrGameStateIdx = 0

var gGame = {
    ball1Color: 'yellow',
    ball2Color: 'aquamarine',
    ball1Size: 100,
    ball2Size: 100,
    backgroundColor: 'black',
}

function onBallClick(elBall, maxDiameter, ballNum, isSelfActivated = true) {
    if (isSelfActivated) {
        console.log('hi');
        storeMoveInHistory()
    }
    elBall.innerText = +elBall.innerText + getRandomInt(20, 61)
    if (+elBall.innerText > maxDiameter) elBall.innerText = 100
    elBall.style.height = elBall.innerText + 'px'
    elBall.style.width = elBall.innerText + 'px'
    elBall.style.backgroundColor = getRandomColor()
    gGame[`ball${ballNum}Color`] = elBall.style.backgroundColor
    gGame[`ball${ballNum}Size`] = +elBall.innerText
}

function onBall3Click(isSelfActivated = true) {
    if (isSelfActivated) storeMoveInHistory()
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
    gGame[`ball1Color`] = elBall1.style.backgroundColor
    gGame[`ball1Size`] = +elBall1.innerText
    gGame[`ball2Color`] = elBall2.style.backgroundColor
    gGame[`ball2Size`] = +elBall2.innerText
}

function onBall4Click(isSelfActivated = true) {
    if (isSelfActivated) storeMoveInHistory()
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    const elBalls = [elBall1, elBall2]
    elBalls.forEach(elBall => {
        elBall.innerText = +elBall.innerText - getRandomInt(20, 61)
        if (+elBall.innerText < 100) elBall.innerText = 100
        elBall.style.height = elBall.innerText + 'px'
        elBall.style.width = elBall.innerText + 'px'
    })
    gGame[`ball1Size`] = +elBall1.innerText
    gGame[`ball2Size`] = +elBall2.innerText
}

function onBall5Click() {
    storeMoveInHistory()
    const elBody = document.querySelector('body')
    elBody.style.backgroundColor = getRandomColor()
    gGame.backgroundColor = elBody.style.backgroundColor
}

function onBall6Click() {
    storeMoveInHistory()
    document.querySelector('body').style.backgroundColor = 'black'
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    elBall1.style.backgroundColor = 'yellow'
    elBall2.style.backgroundColor = 'aquamarine'
    const elBalls = [elBall1, elBall2]
    elBalls.forEach(elBall => {
        elBall.innerText = 100
        elBall.style.height = elBall.innerText + 'px'
        elBall.style.width = elBall.innerText + 'px'
    })
    clearInterval(gIntervalId)
    gGame = {
        ball1Color: 'yellow',
        ball2Color: 'aquamarine',
        ball1Size: 100,
        ball2Size: 100,
        backgroundColor: 'black',
    }
}

function onBall6Hover() {
    gTimeoutId = setTimeout(runFirst4BallsClickInterval, 2000)
    gTimeoutId2 = setTimeout(clearGIntervalId, 22500)
}

function onBall6Leave() {
    clearTimeout(gTimeoutId)
    clearTimeout(gTimeoutId2)
    clearGIntervalId()
}

function clearGIntervalId() {
    clearInterval(gIntervalId)
}

function runFirst4BallsClickInterval() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    gIntervalId = setInterval(() => {
        storeMoveInHistory()
        onBallClick(elBall1, 100, 1, false)
        onBallClick(elBall2, 100, 2, false)
        onBall3Click(false)
        onBall4Click(false)
        gGame[`ball1Color`] = elBall1.style.backgroundColor
        gGame[`ball1Size`] = +elBall1.innerText
        gGame[`ball2Color`] = elBall2.style.backgroundColor
        gGame[`ball2Size`] = +elBall2.innerText
    }, 2000)
}

function storeMoveInHistory() {
    gGameHistory.splice(gCurrGameStateIdx, gGameHistory.length - gCurrGameStateIdx, copyGameState())
    gCurrGameStateIdx++
    const elBtnUndo = document.querySelector('.undo')
    elBtnUndo.disabled = false
    const elBtnRedo = document.querySelector('.redo')
    elBtnRedo.disabled = true
}

function copyGameState() {
    const gameCopy = {}
    for (var key in gGame) {
        gameCopy[key] = gGame[key]
    }
    return gameCopy
}

function loadGameFromHistory(idx) {
    for (var key in gGame) {
        gGame[key] = gGameHistory[idx][key]
    }
}

function onUndo(elBtn) {
    if (gGameHistory.length === gCurrGameStateIdx) {
        storeMoveInHistory()
        gCurrGameStateIdx--
    }
    gCurrGameStateIdx--
    loadGameFromHistory(gCurrGameStateIdx)
    renderGame()
    if (gCurrGameStateIdx === 0) {
        disableButton(elBtn)
    }
    const elBtnRedo = document.querySelector('.redo')
    elBtnRedo.disabled = false
}

function onRedo(elBtn) {
    gCurrGameStateIdx++
    loadGameFromHistory(gCurrGameStateIdx)
    renderGame()
    if (gGameHistory.length - 1 === gCurrGameStateIdx) {
        disableButton(elBtn)
    }
    const elBtnUndo = document.querySelector('.undo')
    elBtnUndo.disabled = false
}

function renderGame() {
    const elBall1 = document.querySelector('.ball1')
    const elBall2 = document.querySelector('.ball2')
    const elBody = document.querySelector('body')
    elBall1.style.backgroundColor = gGame[`ball1Color`]
    elBall1.innerText = gGame[`ball1Size`]
    elBall2.style.backgroundColor = gGame[`ball2Color`]
    elBall2.innerText = gGame[`ball2Size`]
    elBall1.style.height = elBall1.innerText + 'px'
    elBall1.style.width = elBall1.innerText + 'px'
    elBall2.style.height = elBall2.innerText + 'px'
    elBall2.style.width = elBall2.innerText + 'px'
    elBody.style.backgroundColor = gGame.backgroundColor
}

function disableButton(elBtn) {
    elBtn.disabled = true
}