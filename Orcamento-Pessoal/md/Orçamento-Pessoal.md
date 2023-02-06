#### Web Storage

os navegadores modernos de forma geral implementam recursos de armazenamento dentro do próprio browser, do próprio navegador, ou seja do lado Client.

- LocalStorage
- Session Storage
- IndexedDB
- Web SQL
- Cookies

    * Cookies: Muitos ecommerces que acessamos e consultamos alguns produtos e depois após fechar a instância do navegador quando nós voltamos para aquela página os produtos acessados anteriormente são listados pra nós na nova consulta. Essa informação pode ser armazenada em cookies, como fica armazenada do lado do cliente diretamente no Browser e ser anexado na requisição HTTP, é possível do lado do servidor identificar a origem da requisição e retornar a lógica para aquele cliente

    * Local Storage e Session Storage: os dados não são anexados na requisição HTTP, ficam de fato no navegador e suportam uma quantidade maior de dados do que os Cookies.

    * Local Storage é um armazenamento persistente, ao armazenar os dados e fechar o navegador, os dados continuam lá
    * Session Storage é um armazenamento temporário

Web SQL e IndexedDB: suportam uma quantidade maior de dados e podem ser usados para aplicações mais complexas

#### Armazenando despesa em localStorage

A função gravar é responsável por armazenar o objeto despesa em localStorage

* localStorage.setItem(): o método setItem() recebe 2 parametros
    - o primeiro é a identificação do objeto que será armazenado -> será despesa
    - o segundo é o dado que será armazenado -> esse dado precisa ser encaminhado através da anotação JSON
* usar Ctrl + f5 -> para atualizar a página e garantir que os efeitos do localStorage funcionem

### Criando a classe BD e índices dinâmicos

* A classe BD vai permitir instanciar um objeto que vai lidar com o banco de dados da aplicação que será o localStorage

* É necesssário criar uma lógica para gerar índices dinâmicos, para que ao armazenar em Local Storage seja gerado uma nova identificação para a despesa, isso vai fazer com que não sobreponha a despesa que já está armazenada

    * a função gravar agora passa a ser um método de Bd
    * para construir o índice dinâmico é preciso armazenar o índice também em Local Storage, Bd precisa ter condições de identificar qual o próximo índice que pode ser usado para inserção do registro

##### Validando dados antes do registro parte 1

O processo de validação precisa acontecer antes de gravar a despesa em local storage, o Objeto Despesa terá um método fará a validação de seus próprios atributos.

* o método validar dados vai percorrer todos os atributos do Objeto Despesa;
* for i in this -> retorna o indice de um array ou atributos de um objeto, que permite ter acesso ao valor do array ou do objeto
* se o retorno for igual a null, vazio, ou undefined

#### Validando dados antes do registro parte 2

A ideia é fazer a parte visual do processo de validação de dados, exibir um dialog caso os dados não tenham sido preenchidos corretamente notificando o usuário, se tudo foi preenchido corretamente exibir um dialog também mas com a informação de que os dados foram salvos com sucesso.

* para fazer o dialog será usado o componente modal do Bootstrap
* foram feitos alguns ajustes, como alteração de cor e texto do modal
  
* o modal precisa ser mostrado depois que o botão de salvar a despesa for clicado, seja pelo sucesso ou erro no preenchimento dos dados
    -   será usado o JQuery para fazer a lógica do modal apareder ou não
    -   foi colocado data-dismiss="modal" no botão Voltar e Corrigir, para ao ser clicado o modal sair da tela


#### Listando despesas parte 1 - pegando despesas de Local Storage

O próximo passa é listar as despesas em na pagina de consultas, em app.js onde está a logica da aplicação criar uma função que vai ser excutada sempre que a pagina consulta for carregada.

* o eventon onload será usado no body de cosulta com a função carregaListaDespesa
* a lógica para recuperar os dados em Local Storage será estabelecida no objeto Bd com o método recuperarRegistros
* recuperarRegistros será inserido na função carregaListaDespesa

#### Listando despesas parte 2 - inserindo despesa na tela

Agora que foi recuperado as despesas armazenadas em Local Storage com o método recuperarRegistros de Bd que é executado quando a página consulta é carregada, na tag tbody foi colocado um id <tbody id="listaDespesas"> para inserir linhas e colunas através do jasvascript

