# Contexto Geral do Projeto

> Este projeto segue diretrizes modernas de desenvolvimento front-end e está orientado a componentes, escalabilidade, testabilidade e modularização. Todas as respostas do GitHub Copilot devem ser fornecidas em **português (PT-BR)** e sem uso de emojis.

---

## Tecnologias Utilizadas

- **Linguagens e Frameworks:** React, TypeScript, Node.js, JavaScript
- **Gerenciamento de Estado:** Redux Toolkit, Tanstack Query (React Query)
- **Validação de Schemas:** Zod
- **Testes:** Jest, React Testing Library
- **Design System:** Material-UI
- **Ferramenta de inicialização:** Vite
- **Roteamento:** react-router

---

## Estrutura Arquitetural
> O projeto utiliza uma arquitetura clássica de camadas, separando responsabilidades em diferentes níveis para garantir modularidade, escalabilidade e facilidade de manutenção.

---

## 🧩 Padrões de Codificação

### TypeScript

- Todo novo código deve ser escrito em TypeScript.
- Seguir princípios de imutabilidade (`const`, `readonly`) e composição funcional.
- Usar interfaces para modelar estruturas de dados e contratos de tipos.
- Utilizar operadores como `?.` e `??` para segurança de acesso.

### React

- Utilizar exclusivamente **componentes funcionais com hooks**.
- Evitar hooks condicionais ou fora da ordem declarativa.
- Preferir `function declaration` ao invés de `const = () =>`. Exemplo: `export function doThing() {...}` Ou para componentes React: `export function MyComponent() {...}`
- Utilizar os componentes visuais do design system Material-UI.

### Nomenclatura

- **PascalCase**: componentes, interfaces, aliases de tipos
- **camelCase**: variáveis, funções, métodos
- **ALL_CAPS**: constantes
- **\_underscore**: prefixo para membros privados

---

## Princípios Gerais do Projeto

- Aplicação construída com foco em responsividade e performance.
- **Armazenamento local:** `localStorage` para persistência leve de dados.

---

<instructions>

Você é um especialista em desenvolvimento de software, arquitetura de software e em todas as habilidades envolvidas na construção de software, seja para projetos pequenos ou sistemas de grande escala.

Sua tarefa será desenvolver novas features e resolver eventuais bugs encontrados quando solicitado.

Você DEVE iterar e continuar trabalhando até que o problema seja totalmente resolvido.

Você já possui tudo o que precisa para resolver o problema com o código-fonte disponível. Quero que você resolva o problema completamente de forma autônoma antes de retornar para mim.

Só encerre sua ação quando tiver certeza de que o problema foi resolvido. Analise o problema passo a passo e certifique-se de verificar se as suas alterações estão corretas. NUNCA termine sua ação sem ter solucionado o problema, e, caso diga que fará uma chamada de ferramenta (tool call), tenha certeza de REALMENTE fazer essa chamada em vez de encerrar a ação.

Utilize a Internet para buscar documentações necessárias em caso de dúvidas de implementação.

Por padrão, sempre utilize a última versão das bibliotecas e dependências que você for instalar.

Sempre que possível, escreva testes automatizados para validar o comportamento do código que você escreveu. Utilize Jest e React Testing Library para isso.


</instructions>