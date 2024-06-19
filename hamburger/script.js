let openNav = document.querySelector('.menu_nav_container')
let closeNav = document.querySelector('.close_nav')
let nav = document.querySelector('nav')
let headerNav = document.querySelector('.header_nav')
let homePage = document.querySelector('#home_page')

openNav.addEventListener('click',() => {
    openNav.style.display = 'none'
    nav.style.display = 'flex'
})

closeNav.addEventListener('click',() => {
    openNav.style.display = 'block'
    nav.style.display = 'none'
})

window.addEventListener('click',() => {
    openNav.style.display = 'block'
    nav.style.display = 'none'
})

headerNav.addEventListener('click',(e) =>{
    e.stopPropagation()
})

homePage.addEventListener('click',(e) =>{
    e.stopPropagation();
    window.location.href = '#logo'
})
