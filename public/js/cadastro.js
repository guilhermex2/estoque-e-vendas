const gerar = () => {
    event.preventDefault()
    let min = 10 ** 9
    let max = 10 ** 10 - 1 
    let code = Math.floor(Math.random() * (max - min + 1)) + min

    document.querySelector('.input-codigo').value = code
}
let btnGerar = document.querySelector('.gerar').addEventListener('click', gerar)