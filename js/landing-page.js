console.log('handelBoardResponsiveness');
const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
document.querySelector('.container').style.width = width.toString() + 'px';