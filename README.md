
# Projeto Conecta

O projeto Conecta é uma iniciativa desenhada para organizar e dar visibilidade ao mercado de serviços informais. Trata-se de uma plataforma web focada em conectar trabalhadores informais a potenciais clientes, atuando como uma vitrine digital. Este repositório contém o Minimum Viable Product (MVP) focado exclusivamente no frontend, utilizando dados simulados para validar a experiência e interface do usuário.

Este projeto foi desenvolvido para a disciplina de Programação Web I da Universidade Federal de Campina Grande (UFCG).

### Equipe de Desenvolvimento

* Jamilly Venâncio
* Lívia Buriti
* Raniel Dourado

---

## Funcionalidades Principais

O sistema foi desenhado para atender três perfis distintos de usuários: clientes, prestadores de serviços e administradores. As principais funcionalidades incluem:

1. Gestão de Perfis e Cadastros 

> * **Telas de cadastro separadas por interesse:** Opções distintas para "Quero Oferecer um Serviço" (prestadores) e "Preciso de um Serviço" (clientes).
> * **Sistema de login unificado:** Direciona o usuário automaticamente para o painel correto, de acordo com a sua permissão (role) na plataforma.
> 
> 

2. Catálogo e Busca de Serviços 

> * **Listagem de serviços disponíveis:** Apresentação em formato de cards, consumindo dados simulados a partir de arquivos JSON.
> * **Barra de busca e filtros dinâmicos:** Operando de forma responsiva no frontend, permitindo buscar rapidamente por categorias específicas.
> 
> 

3. Visão do Cliente e Visão do Prestador 

> * **Visão do Cliente:** Acesso a um feed de profissionais, página de detalhes do serviço com fotos simuladas, preços base e simulação de botões de contato.
> * **Visão do Prestador:** Painel simulado para edição de perfil, onde é possível visualizar como adicionar novas fotos de portfólio e atualizar suas descrições.


4. Painel Administrativo (Admin) 

> * **Dashboard exclusivo:** Ambiente reservado para a gestão geral da plataforma.
> * **Gestão de contas:** Tabelas listando usuários cadastrados com opções visuais para  suspender ou excluir contas de clientes e prestadores.


---

## Requisitos Técnicos 

A arquitetura do frontend foi construída separando claramente as camadas de interface (UI) das chamadas de dados, visando facilitar uma futura integração com um backend real.


 * **Tecnologia Base**: React.js  para facilitar a componentização e o roteamento entre páginas.



* **Dados e Imagens**: Utilização de variáveis globais ou arquivos JSON para simular o banco de dados. As imagens são consumidas de APIs públicas.



* **Design e Estilização**: Layout responsivo adaptável para desktop, tablet e mobile. Construído preferencialmente com Tailwind CSS ou componentes prontos como shadcn/ui.



* **Hospedagem**: Deploy na plataforma Vercel.



---
