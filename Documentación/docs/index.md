<div style="display: table;">
    <div style="width: 75%;float: left;margin: auto;padding: 50px 0px 50px 10px; float: left;">
        <span style="color: black;font-size: 25px;font-weight: bold;">UNIVERSIDAD NACIONAL AUTÓNOMA DE MÉXICO</span></br></br>
        <span style="color: black;font-size: 26px;">FACULTAD DE ESTUDIOS SUPERIORES ACATLÁN</span>
    </div>
    <img src="/archivos/index/fesa.png" alt="drawing" width="200" style="width: 25%;"/>
</div>

&nbsp;
# Presentación

Integrantes del Equipo:

| Nombre | correo |
| --- | --- |
| Lozano Pérez Johan Andrés | 420098597@pcpuma.acatlan.unam.mx |
| Name 2 | my.email@mail.com |

&nbsp;
# Objetivo

&nbsp;
# Problematica

&nbsp;
# Diagramas
* Diagrama Base de datos
<img src="/archivos/index/Diagrama Base de datos.png" alt="drawing" width="200" style="width: 100%;"/>
* Diagrama Cliente-servidor
<img src="/archivos/index/Diagrama Cliente-servidor.png" alt="drawing" width="200" style="width: 100%;"/>
* Diagrama pagina
<img src="/archivos/index/Diagrama pagina.png" alt="drawing" width="200" style="width: 100%;"/>



<center>
## **Diagrama Cliente-Servidor**
</center>

<img src="/archivos/index/captura7.png">

<center>
## **Diagrama de Flujo de Datos**
</center>

<div style= "text-align: justify">
Este diagrama se dividió en dos niveles; nivel 0 describiendo de forma general el contexto del software y como fluyen los datos dentro del mismo mientras que en el nivel 1 se muestra los subsistemas y con que tiene relación y como pasan datos a los demás subsistemas. 
</div>

<div style= "text-align: justify">
Como resultado se obtiene un modelo de procesos de sistema de información, donde se ve lo antes descrito; los subsistemas que se tiene para la venta de las persianas así se observa un poco las acciones que lleva de forma general el administrador y el usuario dentro del software.
</div>

<img src="/archivos/index/captura8.png">

# Pruebas de Software

<center>
## 1er error de conexión
</center> 
<img src="/archivos/index/captura9.png">

<center>
## 2do error de lata de cliente
</center>
<img src="/archivos/index/captura10.png">

<center>
## 3er error de imagen de producto
</center>
<img src="/archivos/index/captura21.png">

<center>
## Prueba satisfactoria de clientes 
</center>
<img src="/archivos/index/captura11.png">

<center>
## Prueba de alta de producto ya satisfactoria 
</center>
<img src="/archivos/index/captura12.png">

<center>
## Pedidos
</center>
<img src="/archivos/index/captura13.png">

<center>
## Cancelaciones
</center>
<img src="/archivos/index/captura14.png">

<center>
## Error de comunicación del servidor
</center>
<img src="/archivos/index/captura16.png">

<center>
## Error de marca
</center>
<img src="/archivos/index/captura17.png">

<center>
## Error subcategoria
</center>
<img src="/archivos/index/captura18.png">

<center>
## Pedidos
</center>
<img src="/archivos/index/captura19.png">


# Especificaciones del software

<div style= "text-align: justify">
Durante el desarrollo del software se tomaron ciertas decisiones en cuanto a el tipo de archivos que podrán cargarse en la base de datos. De igual manera se optó por un número de caracteres máximo que se podrán capturar en la página a la ora de introducir la información de los productos. Se busca tener un estándar mínimo para mantener un control sobre los posibles fallos que puedan presentarse. En este caso se optó por estandarizar dos aspectos del software, los cuales consideramos de acuerdo a las pruebas que realizamos, ya que fueron los que más problemas acarreaban.
</div>

<center>
## Tipos de Archivos que recibe
</center>

<div style= "text-align: justify">
Para dar de alta un producto se debe agregar una imagen de dicho producto que se va a ingresar a la base de datos. Los formatos de imagen que recibirá la página serán:
</div>

+ JPG
+ PNG
+ JPEG

<div style= "text-align: justify">
Se consideró a estos tres formatos debido a que se consideraron básicos. Es importante aclarar que se evitó el formato GIF, esto debido a que existen archivos GIF que suelen pesar mucho y esto puede causar problemas en la base de datos, por esta razón se exhorta a evitar este formato. 
</div>

<center>
## Número de caracteres permitidos
</center>

<div style= "text-align: justify">
Cada apartado en el que se pide capturar los datos del usuario y del producto está limitado a un número de caracteres, estos apartados son los siguientes:
</div>

+ Nombre -> 200 caracteres.
+ Apellido -> 150 caracteres.
+ Descripción del producto -> 300 caracteres.

<div style= "text-align: justify">
Esta decisión se tomó por cuestiones de seguridad, debido a que existe la posibilidad de dañar la base de datos introduciendo una cadena de caracteres extremadamente larga, por ello se considera necesario mantener un número controlado de caracteres admitidos por el sistema.
</div>

<center>
## Accesibilidad
</center>

<div style= "text-align: justify">
El programa está configurado para aceptar direcciones IP del área de trabajo,  esto con el motivo de mantener la seguridad y la privacidad a la hora de ingresar al servidor, de este modo se tiene un mayor control, ya que sólo las direcciones IP registradas tendrán acceso al servidor. Este aspecto será administrado por Django, de este modo se mantendrá privado el acceso al servidor y a la gestión de la base de datos.
</div>