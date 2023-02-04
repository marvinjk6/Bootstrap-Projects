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