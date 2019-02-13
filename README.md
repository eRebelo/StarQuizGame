# Quick Start

## Dependências
- Instalar nodeJS com NPM: https://nodejs.org/en/download/
<br>Versão: **node -v** 
<br>Versão: **npm  -v**
- Adicionar dependências (node_modules)
<br>**npm install**

----------

## Executar Aplicação
- npm start

----------

## Criar Aplicação
- **create-react-app name_my_app**
- **npm i --save bootstrap font-awesome**
- **npm install --save react-router axios**
- [Sass](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc)

----------

## Middleware Redux
Middleware Redux é utilizado para log, relatórios de falhas, conversando com uma API assíncrona, roteamento, entre outros.
- Redux-Promise: utilizado para que um fluxo assíncrono espere a chamada de uma determinada operação para continuar sua execução nas Action Creators. Em suma, faz com que o Reducer só seja chamado após o término das operações das Action Creators
<br> **npm install --save redux-promise**
- Redux-Multi: permite a chamada de múltiplas operações nas Action Creators
<br>**npm install --save redux-multi**
- Redux-Thunk: complemento do Redux-Multi, o Redux-Thunk permite escrever Action Creators que retornam uma função em vez de uma ação. Assim, ele pode ser usado para atrasar o envio de uma ação, ou para despachar somente se uma determinada condição for atendida
<br>**npm install --save redux-thunk**

----------

## Redux DevTools - Google Chrome Extension
[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

----------

## Documentação Projeto Udemy
- Apostila-React-Redux.pdf
