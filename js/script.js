const textoOperacaoAnterior = document.querySelector("#operacao-anterior");
const textoOperacaoAtual = document.querySelector("#operacao-atual");
const botao = document.querySelectorAll("#botoes button");

class Calculadora {
    constructor(textoOperacaoAnterior, textoOperacaoAtual) {
        this.textoOperacaoAnterior = textoOperacaoAnterior;
        this.textoOperacaoAtual = textoOperacaoAtual;
        this.OperacaoAtual = "";
        this.isOn = true;
    }

    operadorOnOff() {
        // Alterna o estado
        this.isOn = !this.isOn;
        const botaoOnOff = document.querySelector("#on-off-btn");
        // Atualiza o texto do botão
        botaoOnOff.innerText = this.isOn ? "Off" : "On"; 

        // Habilitar ou desabilitar botões
        const botoes = document.querySelectorAll("#botoes button:not(#on-off-btn)");
        botoes.forEach((btn) => {
            btn.disabled = !this.isOn; // Desabilita se a calculadora estiver Off
        });

        if (this.isOn) {
            this.operadorC(); // Limpa a tela ao ligar
        }
    }

    // Mostrar o número na tela da calculadora
    addDigit(digit) {
        // Checar se a operação atual já tem um ponto decimal
        if (digit === "." && this.textoOperacaoAtual.innerText.includes(".")) {
            return;
        }

        this.OperacaoAtual = digit;
        this.AtualizarTela();
    }

    // Processar valores das operações da calculadora
    ProcessarOperacao(operacao) {
        // Checar se o atual está vazio, para poder mudar operações
        if (this.textoOperacaoAtual.innerText === "" && operacao !== "C") {
            // Mudar operação
            if (this.textoOperacaoAnterior.innerText !== "") {
                this.mudarOperacao(operacao);
            }
            return;
        }

        // Pegar valores anteriores e atuais
        let valorOperacao;
        const anterior = +this.textoOperacaoAnterior.innerText.split(" ")[0];
        const atual = +this.textoOperacaoAtual.innerText;
        let graus = atual * (Math.PI / 180);

        switch (operacao) {
            case "+":
                valorOperacao = anterior + atual;
                this.AtualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "-":
                valorOperacao = anterior - atual;
                this.AtualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "/":
                valorOperacao = anterior / atual;
                this.AtualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "*":
                valorOperacao = anterior * atual;
                this.AtualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "^": 
                valorOperacao = Math.pow(anterior, atual);
                this.AtualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "√": 
                valorOperacao = Math.pow(atual, 1 / anterior);
                this.AtualizarTela(valorOperacao, operacao, atual, anterior);
                break;
            case "ln": 
                valorOperacao = Math.log(atual);
                this.AtualizarTela(valorOperacao);
                break;
            case "log": 
                valorOperacao = Math.log10(atual);
                this.AtualizarTela(valorOperacao);
                break;
            case "sen": 
                valorOperacao = Math.sin(graus);
                this.AtualizarTela(valorOperacao);
                break;
            case "cos": 
                valorOperacao = Math.cos(graus);
                this.AtualizarTela(valorOperacao);
                break;
            case "tan": 
                valorOperacao = Math.tan(graus);
                this.AtualizarTela(valorOperacao);
                break;
            case "juros simples": 
            const capital = parseFloat(prompt("Insira o capital inicial: "));
            const taxa = parseFloat(prompt("Insira a taxa de juros mensal: "))/100;
            const tempo = parseFloat(prompt("Insira a quantidade de meses: "));
            valorOperacao = capital * taxa * tempo;
            this.AtualizarTela(valorOperacao);
                return;
            case "juros compostos": 
            const capitalComp = parseFloat(prompt("Insira o capital inicial: "));
            const taxaComp = parseFloat(prompt("Insira a taxa de juros mensal: "))/100;
            const tempoComp = parseFloat(prompt("Insira a quantidade de meses: "));
            valorOperacao = capitalComp * Math.pow((1 + taxaComp), tempoComp);
            this.AtualizarTela(valorOperacao);
                return;
            case "mensalidade": 
            const valorEmprestimo = parseFloat(prompt("Insira o valor do empréstimo: "));
            const taxaMensal = parseFloat(prompt("Insira a taxa de juros mensal: "))/100;
            const numParcelas = parseFloat(prompt("Insira o número de parcelas: "));
            valorOperacao = (valorEmprestimo * taxaMensal) / (1 - Math.pow((1 + taxaMensal), -numParcelas));
            this.AtualizarTela(valorOperacao);
                return;
            case "DEL":
                this.operadorDEL();
                break;
            case "CE":
                this.operadorCE();
                break;
            case "C":
                this.operadorC();
                break;
            case "=":
                this.operadorIgual();
                break;
            default:
                return;
        }
    }

    // Atualizar a tela da calculadora
    AtualizarTela(valorOperacao = null, operacao = null, atual = null, anterior = null) {
        if (valorOperacao === null) {
            this.textoOperacaoAtual.innerText += this.OperacaoAtual;
        } else {
            // Checar se valor é 0, se for, adicionar valor atual
            if (anterior === 0) {
                valorOperacao = atual;
            }
            // Adicionar valor atual ao anterior
            this.textoOperacaoAnterior.innerText = `${valorOperacao} ${operacao}`;
            this.textoOperacaoAtual.innerText = "";
        }
    }

    // Mudar operação matemática
    mudarOperacao(operacao) {
        const operacoesMatematicas = ["+", "-", "*", "/", "^", "√", "ln", "log", "sen", "cos", "tan", "juros simples", "juros compostos", "mensalidade"];
        if (!operacoesMatematicas.includes(operacao)) {
            return;
        }
        this.textoOperacaoAnterior.innerText = this.textoOperacaoAnterior.innerText.slice(0, -1) + operacao;
    }

    // Deletar último dígito
    operadorDEL() {
        this.textoOperacaoAtual.innerText = this.textoOperacaoAtual.innerText.slice(0, -1);
    }

    // Limpar operação atual
    operadorCE() {
        this.textoOperacaoAtual.innerText = "";
    }

    // Limpar todas as operações
    operadorC() {
        this.textoOperacaoAtual.innerText = "";
        this.textoOperacaoAnterior.innerText = "";
    }

    // Processar o "="
    operadorIgual() {
        const operacao = this.textoOperacaoAnterior.innerText.split(" ")[1];
        if (!operacao) return;
        this.ProcessarOperacao(operacao);
        this.textoOperacaoAtual.innerText = this.textoOperacaoAnterior.innerText.split(" ")[0];
        this.textoOperacaoAnterior.innerText = "";
    }
}

const calc = new Calculadora(textoOperacaoAnterior, textoOperacaoAtual);

// Checa se clicou em um número ou operação
botao.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (value === "On" || value === "Off") {
            calc.operadorOnOff(); // Chama a função para alternar o estado
        } else if (calc.isOn && (+value >= 0 || value === ".")) {
            calc.addDigit(value);
        } else if (calc.isOn) {
            calc.ProcessarOperacao(value);
        }
    });
});

// Música de gatinho
const playBtn = document.getElementById("play-btn");
const music = document.getElementById("music");
let isPlaying = false; 

playBtn.addEventListener("click", () => {
    if (isPlaying) {
        music.pause(); 
        music.currentTime = 0; 
        isPlaying = false; 
    } else {
        music.play();
        isPlaying = true;
    }
});