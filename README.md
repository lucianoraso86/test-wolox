# Test Wolox - Cryptocurrencies Monitor
___
Aplicación desarrolla en NodeJS con base de datos en MySql, que permite el login y registro de usuario, obtener el listado de criptomonedas y su cotizacion, asi como tambien agregar o eliminar criptomonedas por usuario para su seguimiento. Utiliza para ello la api de CoinGecko.
### Requerimientos Previos
* `NodeJS`
* `MySql`

### Instalación 
Para ejecutar la aplicación se debe clonar el repositorio:
`git clone https://github.com/lucianoraso86/test-wolox.git`

Luego instalar las dependencias:
`npm install`

Para la base de datos, una vez iniciado el servicio de MySql, se debe crear un esquema de datos con el nombre `test-wolox` que es el utilizado por la API. No es necesaria la creacion de tablas, las mismas se crean al iniciar la aplicación. Los parametros de conexión son los siguientes:
```
DB_NAME = test-wolox
DB_HOST = localhost
DB_USERNAME = root 
DB_PASSWORD =
```
Finalmente se corre la API
`npm start`

### Endpoints
Una vez ejecutada, la API esta accesible desde `localhost:3000/api/` y cuenta con los siguientes Endpoints
|Endpoint| Método | Parámetros de entrada
|-|-|-|
| `user/add` | POST | { username, firstname, lastname, password, money  }     
| `user/login`  | POST | { username,  <br />  password }                                                    
| `coin/list-all` | GET | -        
| `coins/list-user`  | GET | order, top    
| `coin/add` | POST | { idcoin } 
| `coin/remove` | DELETE | { idcoin } 