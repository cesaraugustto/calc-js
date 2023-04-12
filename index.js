/*Funcionalidade de digitar na calculadora */
const main = document.querySelector('main')
const root = document.querySelector(':root')//vou entender deois
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

//Criando um array para os caracteres permitidos
//a seguir, uma verificação se o caracter digitado pertence ao vetor

const allowedKeys =  ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]


//Função para transmitir o dataset dos btns para o input
//Selecionando todos btn pela classe e executar uma função, passando como parâmetro charKeyBtn
document.querySelectorAll('.charKey').forEach(function (charKeyBtn){
    //Estou executando uma função de click para cada botão.
    charKeyBtn.addEventListener('click', function(){
        const value = charKeyBtn.dataset.value //Pegando o atributo data-set do btn
        input.value += value //Adicionando no input o atributo dataset do btn
    })
})

//Tratando o botão clear(mesma coisa do backspace)
//Pegando evento de click e passando a função
document.getElementById('clear').addEventListener('click', function(){
    input.value = ''
    input.focus()
})


//Evento de digitar no input
input.addEventListener('keydown', function(ev){
    //Prevenindo evento padrão
    //Se o usuário apertar com a tecla, não quero que seja inserido o valor da tecla no input
    ev.preventDefault()
    //Se a peça estiver inclusa na lista de caracteres permitidos
    if(allowedKeys.includes(ev.key)){
        input.value += ev.key
        return
    }
    //Permitir "apagar, Backspace"
    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0, -1) //Função slice corta um caracter a partir do caracter inicial '0' até a posição -1 (penultimo caracter)
    }
    //Permitir o enter e chamar a função calculate
    if(ev.key === 'Enter'){
        calculate()
    }
})


//Botão de enter deve chamar a função calculate
document.getElementById('equal').addEventListener('click', calculate)

function calculate(){
    resultInput.value = 'ERROR'
    resultInput.classList.add('error')
    //Função eval pega o valor do input exatamente como está
    //afinal, está formatado como uma equação de fato
    //E então executará o valor
    const result = eval(input.value)
    //Atribuindo o resultado ao value do input de resultado (kkkk)
    resultInput.value = result
    resultInput.classList.remove('error')
}


//botão para copiar o valor do input
//a função recebe parâmetro pois recebe como conteúdo o próprio botão (mostrar msg de copiado)
document.getElementById('copyToClipboard').addEventListener('click', function(ev){
    const button = ev.currentTarget //Selecionando o próprio botão
    if(button.innerText === 'Copy'){
        button.innerText = 'Copiado!'
        //Adicionando classe de css ao botão
        button.classList.add('success')
        //copiando o texto do input
        navigator.clipboard.writeText(resultInput.value)
    }
    /*
        Voltando para o texto padrão, permitindo usuário copiar de novo
        e também retirando a calsse css
    */
    else{
        button.innerText = 'Copy'
        button.classList.remove('success')
    }
})




//Trocar o tema (claro escuro)
document.getElementById('themeSwitcher').addEventListener('click', function(){
    //peguei o elemento main la em cima
    //Verifica o atributo data-set-theme 
    if(main.dataset.theme === 'dark') {
        //peguei o elemento root lá em cima
        //Acesso o elemento style, acesso o elemento bg color e passar os novos valores
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--border-color', '#aaa')
        main.dataset.theme = 'light'
    }else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#666')
        main.dataset.theme = 'dark'
    }
})