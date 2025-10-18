# 🕹️ Mini Pokédex - React Native (Expo)

## 📖 Sobre o Projeto

Este projeto é uma implementação de uma Pokédex minimalista em **React Native/Expo** com uma estética visual forte, inspirada em interfaces de consoles clássicos e Pixel Art (GBA/Retrô). Todos os dados são consumidos em tempo real da [PokeAPI](https://pokeapi.co/).

A versão atual atende e supera todos os requisitos funcionais com foco máximo na Experiência do Usuário (UX) e consistência visual.

## ✨ Funcionalidades

| Funcionalidade | Status | Destaques |
| :--- | :--- | :--- |
| **Lista & Paginação** | ✅ Completo | Exibe Pokémons em grade de 2 colunas com navegação "Anterior" e "Próxima". |
| **Busca & Autocomplete** | ✅ Completo | Permite buscar Pokémon por nome/ID e oferece **Sugestões (Autocomplete)** enquanto o usuário digita. |
| **Tela de Detalhes** | ✅ Completo | Exibe Altura, Peso, Habilidades e Status Base. |
| **Tratamento de Erro** | ✅ Completo | Lógica de redirecionamento para a tela **`404/API Error`** em falhas de busca ou conexão. |

## 🎨 Destaques Visuais e de UX

O design é 100% consistente em todas as telas, seguindo o tema proposto.

  * **Tema Console Retrô:** Cores de alto contraste (paleta GBA), fontes em `uppercase` e bordas quadradas.
  * **Efeito 3D (Pixel Art):** Todos os elementos de UI (inputs, botões, cards) usam bordas grossas para simular profundidade.
  * **Fundos Dinâmicos:** A tela de detalhes muda a cor de fundo dinamicamente para a cor do tipo principal do Pokémon.
  * **Barras de Status:** Os Status Base são exibidos com barras de progresso (`StatBar`) visuais, facilitando a leitura.
  * **Micro-Animação:** A imagem do Pokémon na tela de detalhes possui um efeito de "hover"/toque (escala e translação) para feedback visual.

| Tela de Busca (Home) | Tela de Detalhes (Stats) |
| :---: | :---: |
| \<img src="[https://raw.githubusercontent.com/luizfelipefarias/mini-pokedex/main/assets/demo/screen-01.png](https://www.google.com/search?q=https://raw.githubusercontent.com/luizfelipefarias/mini-pokedex/main/assets/demo/screen-01.png)" width="250"\> | \<img src="[https://raw.githubusercontent.com/luizfelipefarias/mini-pokedex/main/assets/demo/screen-02.png](https://www.google.com/search?q=https://raw.githubusercontent.com/luizfelipefarias/mini-pokedex/main/assets/demo/screen-02.png)" width="250"\> |

## 🛠️ Tecnologias Utilizadas

  * **React Native**
  * **Expo** (SDK 51)
  * **Expo Router (v3):** Para navegação baseada em arquivos.
  * **TypeScript**
  * **PokeAPI (REST):** Para busca e listagem de dados.

## 🚀 Como Rodar o Projeto

Este projeto foi construído com [Expo](https://expo.dev/) e [Expo Router](https://docs.expo.dev/router/introduction/).

### Pré-requisitos

  * [Node.js (LTS)](https://nodejs.org/en)
  * [Expo CLI](https://docs.expo.dev/get-started/installation/) (ou use `npx`)
  * App **Expo Go** no seu celular (iOS ou Android)

### Instalação e Execução

1.  Clone o repositório:

    ```bash
    git clone https://github.com/luizfelipefarias/mini-pokedex.git
    cd mini-pokedex
    ```

2.  Instale as dependências:

    ```bash
    npm install --force
    ```

3.  Inicie o servidor de desenvolvimento (recomenda-se limpar o cache na primeira execução):

    ```bash
    npx expo start --clear
    ```

4.  Escaneie o QR Code gerado com o aplicativo **Expo Go**.

## 📁 Estrutura de Arquivos Principais

O projeto utiliza a estrutura de rotas do Expo Router.

  * `app/(tabs)/index.tsx`: Tela inicial (Home/Scanner/Busca).
  * `app/(tabs)/explore.tsx`: Tela principal de listagem (`PokedexList`).
  * `app/PokemonDetails.tsx`: Tela de detalhes do Pokémon (Rota dinâmica).
  * `app/+not-found.tsx`: Tela de Erro 404/API customizada e temática.
  * `app/constants/theme.ts`: Definições de cores para o tema Retrô.
  * `components/`: Componentes reutilizáveis (StatBar, Botões, etc).

-----

Feito por **Luiz Felipe**.
