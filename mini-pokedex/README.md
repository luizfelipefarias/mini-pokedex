# 🕹️ Mini Pokédex - Projeto Concluído

Este projeto é uma implementação de uma Pokédex minimalista (React Native/Expo) com uma estética visual forte, inspirada em interfaces de consoles clássicos e Pixel Art (GBA/Retrô), utilizando a [PokeAPI](https://pokeapi.co/) para todos os dados.

A versão atual atende e supera todos os requisitos funcionais com foco máximo na Experiência do Usuário (UX) e consistência visual.

## ✨ Funcionalidades Implementadas

| Funcionalidade | Status | Destaques |
| :--- | :--- | :--- |
| **Lista & Paginação** | ✅ Completo | Exibe Pokémons em grade de 2 colunas com navegação "Anterior" e "Próxima". |
| **Busca & Autocomplete** | ✅ Completo | Permite buscar Pokémon por nome/ID e oferece **Sugestões (Autocomplete)** enquanto o usuário digita. |
| **Tela de Detalhes** | ✅ Completo | Exibe Altura, Peso, Habilidades e Status Base. |
| **Tratamento de Erro** | ✅ Completo | Possui lógica de redirecionamento para a tela **`404/API Error`** em falhas de busca ou conexão. |

## 🎨 Destaques Visuais e de UX

* **Tema Console Retrô:** O design é consistente em todas as telas com cores de alto contraste, fontes em `uppercase` e bordas quadradas.
* **Efeito 3D:** Todos os elementos de UI (inputs, botões de paginação, cards) utilizam bordas grossas para simular um efeito de profundidade (3D simples).
* **Status Dinâmico:** A tela de detalhes muda a cor de fundo dinamicamente para a cor do tipo principal do Pokémon.
* **Barras de Status Funcionais:** Os Status Base são exibidos com barras de progresso (`StatBar`) visuais, facilitando a leitura da eficácia do Pokémon.
* **Animação de Imagem:** A imagem do Pokémon na tela de detalhes possui um efeito de "hover"/toque (escala e translação) para feedback visual.

## 🚀 Como Rodar o Projeto

Este projeto foi construído com [Expo](https://expo.dev/) e [Expo Router](https://www.google.com/search?q=https://expo.dev/router).

### Pré-requisitos

Você precisará ter o [Node.js](https://nodejs.org/en) e o [Expo CLI](https://docs.expo.dev/get-started/installation/) instalados globalmente.

### Instalação

1. Instale as dependências na pasta raiz do projeto:

<!-- end list -->

```bash
npm install
```

### Inicialização

Inicie o servidor de desenvolvimento. Recomenda-se limpar o cache na primeira execução após as alterações de assets:

```bash
npx expo start --clear
```

Você pode rodar o app no aplicativo **Expo Go** no seu celular ou em um simulador/emulador.

## 📁 Estrutura de Arquivos Principais

* `app/(tabs)/index.tsx`: Tela inicial (Home/Scanner).
* `app/(tabs)/explore.tsx`: Tela principal de listagem (`PokedexList`).
* `app/PokemonDetails.tsx`: Tela de detalhes do Pokémon.
* `app/+not-found.tsx`: Tela de Erro 404/API customizada e temática.
* `app/constants/theme.ts`: Definições de cores para o tema Retrô.

<!-- end list -->