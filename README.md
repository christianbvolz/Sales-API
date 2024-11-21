# Descrição

Este é um projeto para o teste técnico Back-end da BeTalent. Trata-se de um sistema que permite cadastrar usuários externos. Usuários logados poderão registrar clientes, produtos e vendas.

# Sumário

* [Pré-requisitos](#pré-requisitos)
* [Instalação](#instalação)
* [Postman para testar os endpoint](#postman-para-testar-os-endpoint)
* [Users API Endpoints](#users-api-endpoints)
* [Customers API Endpoints](#customers-api-endpoints)
* [Products API Endpoints](#products-api-endpoints)
* [Sales API Endpoints](#sales-api-endpoints)

# Pré-requisitos

- Node.js
- npm
- MySQL

# Instalação

1. Clone o repositório:

- `git clone git@github.com:christianbvolz/Sales-API.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd Sales-API`

2. Instale as dependências:

   - `npm install`

3. Crie o arquivo .env seguindo o exemplo:
    <details>
        <summary>.env.example</summary>

      ```js
      // .env.example
      TZ=UTC
      PORT=3333
      HOST=localhost
      LOG_LEVEL=info
      APP_KEY=5iKrHiu082zfArA9ez5_wYDEdjdLHwDG
      NODE_ENV=development
      DB_HOST=127.0.0.1
      DB_PORT=3306
      DB_USER=root
      DB_PASSWORD=1234
      DB_DATABASE=sales_db // DB com o mesmo nome já deve estar criado no MySQL
      ```
      
    </details>

<br />

4. Aplique as migrations e seeds:
   - `npm run migration`
   
5. Inicie a aplicação:
   - `npm run dev`
   
<br/>

# Postman para testar os endpoint
  [<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/33803535-11fc4bd7-a0e0-4988-9e17-a6e64184f9d9?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D33803535-11fc4bd7-a0e0-4988-9e17-a6e64184f9d9%26entityType%3Dcollection%26workspaceId%3D9745ea69-63ac-4434-9b67-07f8e68f8161)
  <br />
  
  É preciso instalar o Postman Agent para a requisição funcionar pelo browser. https://www.postman.com/downloads/postman-agent/

# Users API Endpoints

### POST `/api/signup`

- method: post
- endpoint: `/api/signup`
- doesn't need auth

  <details>
    <summary>request body:</summary>

  ```json
  {
    "firstName": "name",
    "lastName": "last",
    "email": "test@test.com",
    "password": "superpassword"
  }
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "type": "bearer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MTQyOX0.txlaew3OzVtDLhMMdD-M5Varb-aMBmYBgZSMYq9Ii7c"
  }
  ```

  </details>

### POST `/api/login`

- method: post
- endpoint: `/api/login`
- doesn't need auth

  <details>
    <summary>request body:</summary>

  ```json
  {
    "email": "test@test.com",
    "password": "superpassword"
  }
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "type": "bearer",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  }
  ```

  </details>

<br/>

# Customers API Endpoints

### GET `/api/customers`

- method: get
- endpoint: `/api/customers`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  [
    {
        "fullName": "virkus full",
        "cpf": "549.367.346-23",
        "address": {
            "cep": "75126-240",
            "street": "Rua Sabará",
            "streetNumber": 405,
            "neighborhood": "Parque São João",
            "city": "Anápolis",
            "state": "GO"
        },
        "phoneNumber": {
            "phoneNumber": "(11) 94324-2453"
        }
    },
    {
        "fullName": "romain super",
        "cpf": "134.745.963-54",
        "address": {
            "cep": "69315-006",
            "street": "Rua Rio Cotingo",
            "streetNumber": 8098,
            "neighborhood": "Professora Araceli Souto Maior",
            "city": "Boa Vista",
            "state": "RR"
        },
        "phoneNumber": {
            "phoneNumber": "(53) 91038-9067"
        }
    }
  ]  
  ```

  </details>

### GET `/api/customers/:customerId`

- method: get
- endpoint: `/api/customers/:customerId?month=7&year=2024`
- Needs auth
- accepts <strong>month</strong> and/or <strong>year</strong> query Params to filter sales

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "fullName": "virkus full",
    "cpf": "549.367.346-23",
    "phoneNumber": {
        "phoneNumber": "(11) 94324-2453"
    },
    "sales": [
        {
            "id": 2,
            "quantity": 3,
            "unitPrice": 3999.95,
            "totalPrice": 11999.85,
            "createdAt": "2024-07-12T00:00:00.000+00:00",
            "products": {
                "id": 2,
                "title": "Console Sony Playstation 5 Ps5 825gb Mídia Física",
                "price": 3999.95,
                "quantity": 156,
                "image": "p0ucedy52gad1engrnh40xnf.jpg"
            }
        },
        {
            "id": 3,
            "quantity": 1,
            "unitPrice": 3999.95,
            "totalPrice": 3999.95,
            "createdAt": "2024-07-08T00:00:00.000+00:00",
            "products": {
                "id": 2,
                "title": "Console Sony Playstation 5 Ps5 825gb Mídia Física",
                "price": 3999.95,
                "quantity": 156,
                "image": "p0ucedy52gad1engrnh40xnf.jpg"
            }
        },
        {
            "id": 6,
            "quantity": 1,
            "unitPrice": 165.99,
            "totalPrice": 165.99,
            "createdAt": "2024-07-07T00:00:00.000+00:00",
            "products": {
                "id": 3,
                "title": "Mouse Gamer Razer Deathadder Essential 6400dpi Cor Preto",
                "price": 165.99,
                "quantity": 78,
                "image": "t2hkwe6iotnvp568mjfxs5rn.jpg"
            }
        }
    ],
    "address": {
        "cep": "75126-240",
        "street": "Rua Sabará",
        "streetNumber": 405,
        "neighborhood": "Parque São João",
        "city": "Anápolis",
        "state": "GO"
    }
  }
  ```

  </details>

### POST `/api/customers`

- method: post
- endpoint: `/api/customers`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>request body:</summary>

  ```json
    {
      "fullName": "tester test",
      "cpf": "013.554.566-91",
      "phoneNumber": "(53) 3428-6699",
      "address": {
          "cep": "69086-392",
          "street": "Rua Barreirinha",
          "streetNumber": "157",
          "neighborhood": "São José Operário",
          "city": "Manaus",
          "state": "AM"
      }
    }
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "customerId": 8
  } 
  ```

  </details>

### PUT `/api/customers/:customerId`

- method: put
- endpoint: `/api/customers/:customerId`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>request body:</summary>

  ```json
    {
      "fullName": "tester test jr",
      "cpf": "132.745.333-15",
      "phoneNumber": "(11) 3221-2442",
      "address": {
          "cep": "69086-392",
          "street": "Rua Barreirinha",
          "streetNumber": "157",
          "neighborhood": "São José Operário",
          "city": "Manaus",
          "state": "AM"
      }
    }
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "message": "Customer updated"
  }
  ```

  </details>

### DELETE `/api/customers/:customerId`

- method: delete
- endpoint: `/api/customers/:customerId`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "message": "Customer deleted"
  }
  ```

  </details>

<br/>

# Products API Endpoints

### GET `/api/products`

- method: get
- endpoint: `/api/products`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  [
    {
        "id": 2,
        "title": "Console Sony Playstation 5 Ps5 825gb Mídia Física",
        "price": 3999.95,
        "quantity": 156,
        "image": "p0ucedy52gad1engrnh40xnf.jpg"
    },
    {
        "id": 3,
        "title": "Mouse Gamer Razer Deathadder Essential 6400dpi Cor Preto",
        "price": 165.99,
        "quantity": 78,
        "image": "t2hkwe6iotnvp568mjfxs5rn.jpg"
    },
    {
        "id": 1,
        "title": "Placa De Vídeo Msi Geforce Rtx 4090",
        "price": 15105.59,
        "quantity": 356,
        "image": "tmw9xoy4umk3pyqq3xcds5re.jpg"
    },
    {
        "id": 4,
        "title": "Teclado Satechi W3 Slim Retroiluminado Com Fio USB-C USB-C ST-UCSW3M QWERTY Inglês US Cor Cinza Escuro",
        "price": 529.99,
        "quantity": 25,
        "image": "ihwvwl6tv6tlaorvyoh22oq8.jpg"
    }
  ]  
  ```

  </details>

### GET `/api/products/:productId`

- method: get
- endpoint: `/api/products/:productId`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "id": 4,
    "title": "Teclado Satechi W3 Slim Retroiluminado Com Fio USB-C USB-C ST-UCSW3M QWERTY Inglês US Cor Cinza Escuro",
    "description": "description",
    "price": 4,
    "quantity": 25,
    "image": "ihwvwl6tv6tlaorvyoh22oq8.jpg"
  }
  ```

  </details>

### POST `/api/products`

- method: post
- endpoint: `/api/products`
- Needs auth

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>request body:</summary>

  ```json
  {
    "title": "new product",
    "description": "description new product",
    "price": 66.99,
    "quantity": 1,
    "image": "IMAGE-FILE"
  }
  ```

  </details>
    <details>
    <summary>response:</summary>

  ```json
  {
    "productId": 6
  }
  ```

  </details>

### PUT `/api/products/:productId`

- method: put
- endpoint: `/api/products/:productId`
- Needs auth
- can update any column

  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  <details>
    <summary>request body:</summary>

  ```json
  {
    "title": "update product",
    "description": "description update product",
    "price": 44.99,
    "quantity": 10,
    "image": "IMAGE-FILE"
  }
  ```

  </details>
    <details>
    <summary>response:</summary>

  ```json
  {
    "message": "Product updated"
  }
  ```

  </details>

### DELETE `/api/products/:productId`

- method: delete
- endpoint: `/api/products/:productId`
- Needs auth
  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  
  <details>
    <summary>response:</summary>

  ```json
  {
    "message": "Product deleted"
  }
  ```
  </details>

<br/>

# Sales API Endpoints

### POST `/api/sales`

- method: post
- endpoint: `/api/sales`
- Needs auth
  <details>
    <summary>request headers:</summary>

  ```
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcyMTU0MjQ0MX0.lkfBB5rbyhtYE39WNsH1FnutOohxKPh44tKhfc4Csls"
  ```

  </details>
  
  <details>
    <summary>request body:</summary>

  ```json
  {
    "customerId": 1,
    "productId": 4,
    "quantity": 14
  }
  ```
  </details>
  <details>
    <summary>response:</summary>

  ```json
  {
    "quantity": 1,
    "unitPrice": 529.99,
    "totalPrice": 529.99,
    "createdAt": "2024-07-21T07:50:03.486+00:00",
    "id": 8
  }
  ```
  </details>
  
