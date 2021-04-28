# Test Wolox - Cryptocurrencies Monitor

Aplicación desarrolla en NodeJS con base de datos en MySql, que permite el login y registro de usuarios, obtener el listado de criptomonedas y su cotizacion, asi como tambien agregar o eliminar criptomonedas por usuario para su seguimiento. Utiliza para ello la api de CoinGecko.

### Requerimientos Previos

* `NodeJS`
* `MySql`

### Instalación 

Para ejecutar la aplicación se debe clonar el repositorio:<br />
`git clone https://github.com/lucianoraso86/test-wolox.git`

Luego ingresar al directorio de la API e instalar las dependencias:<br />
`cd test-wolox`<br />
`npm install`

Para la base de datos, una vez iniciado el servicio de MySql, se debe crear un esquema con el nombre `test-wolox` que es el utilizado por la API. No es necesaria la creacion de tablas, las mismas se crean al iniciar la aplicación. Los parametros de conexión son los siguientes:
```
DB_NAME = test-wolox
DB_HOST = localhost
DB_USERNAME = root 
DB_PASSWORD =
```
Finalmente para iniciar la API:<br />
`npm start`
```
Nota: Para iniciar la API en modo desarrollo (ante cambios reinicia el server), debe ejecutar:
npm run dev
```

### Endpoints

Una vez ejecutada, la API esta accesible desde `localhost:3000/api/` y cuenta con los siguientes Endpoints:
| Endpoint | Método | Parámetros | Descripción |
|-|-|-|-|
| `user/add` | POST | {<br /> "username": `STRING`,<br /> "firstname": `STRING`,<br /> "lastname": `STRING`,<br /> "password": `STRING`,<br /> "money": `STRING` ("usd", "eur", "ars") <br />} | Permite agregar un nuevo usuario |   
| `user/login`  | POST | {<br /> "username": `STRING`,  <br /> "password": `STRING`<br />} | Login de usuario registrado |                                                  
| `user/coins`  | GET | order: `STRING` (opcional - "asc", "desc"),<br /> top: `INTEGER` (opcional) | Lista las criptomonedas del usuario logueado |
| `user/coins` | POST | {<br /> "idcoin": `STRING` <br />} | Permite agregar criptomonedas al usuario logueado |
| `user/coins` | DELETE | {<br /> "idcoin": `STRING` <br />} | Permite remover criptomonedas al usuario logueado |
| `coins` | GET | - | Lista todas las ciptomonedas disponibles |     

### Test

La API cuenta con un modulo de testing para chequear el correcto funcionamiento de los Endpoints. Para la ejecución del mismo, una vez iniciada la aplicación, se debe correr lo siguiente: <br />
`npm test`
```
Nota: El test creara un usuario de prueba con nombre 'wolox'. 
Si se ejecuta nuevamente el test, fallará en la creacion del mismo debido a que ya existe previamente.
```
