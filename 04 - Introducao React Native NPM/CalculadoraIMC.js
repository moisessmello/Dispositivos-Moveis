// Sistema de Modulos (ES¨) -> Exportando

export const TabelaIMC = [
    { limite: 18.5, classificacao: "Magreza" },
    { limite: 24.9, classificacao: "Normal" },
    { limite: 29.9, classificacao: "Sobrepeso" },
    { limite: 34.9, classificacao: "Obesidade grau I" },
    { limite: 39.9, classificacao: "Obesidade grau II" },
    { limite: 40, classificacao: "Obesidade grau III" },
]




export const calcularIMC = (peso, altura) => {
    return peso / (altura * altura)
}