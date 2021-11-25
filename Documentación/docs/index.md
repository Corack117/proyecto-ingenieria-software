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
# Proyecto Final

<center> 
## **Objetivo**
 </center>
<div style= "text-align: justify">

El objetivo de este proyecto será el de buscar y satisfacer las necesidades de un cliente en concreto, para esto se le realizará una entrevista que tiene como objetivo buscar los requerimientos del software, luego se hará la documentación necesaria para que se pueda formar la base del software a realizar, Una vez hecha la búsqueda de nuestro cliente obtuvimos lo siguiente; nuestro cliente desea proponer a su jefe un software donde requiere que contenga una base de datos de su empresa que vende persianas, para ello necesita que como administrador pueda ofrecer distintos productos a los usuarios registrados. y estos puedan realizar pedidos a través del software. Toda esta información se almacenará dentro de la base de datos, a continuación se mostrará la documentación para realizar dicho software.

</div>

&nbsp;

<center>
## **Problematica**
</center>
<div style= "text-align: justify">

Debido a la pandemia él cliente está buscando una herramienta mediante la cual sus productos puedan ser cotizados y adquiridos de forma remota. Dada la incertidumbre de no saber si habrá nuevas restricciones relacionadas con la pandemia, el cliente busca que los posibles compradores de su producto pueden consultar tanto las existencias,  como los costos, modelos, colores y marcas. De este modo el posible comprador conoce los precios que maneja nuestro cliente sin la necesidad de acudir a su negocio para consultarlos directamente. De igual manera puede adquirir estos productos de forma remota. La idea del cliente es adoptar un modelo híbrido de negocios para mantener una tienda física y una tienda online, de este modo poder adaptarse a las nuevas normas que exigen los tiempos actuales.

</div>

&nbsp;

<center>
## **Descripción del Software**
</center>
<div style= "text-align: justify">
Se trata de un software para una tienda de persianas donde se puede crear administradores(con privilegios), usuarios que después de crear una cuenta pueden realizar pedidos con opciones predefinidas para conocer qué clase de persiana desea.
Este software viene dividido por secciones administradores, usuarios, productos, ventas, categorías y subcategorías, cada unos con sus propiedades.
</div>


<div style= "text-align: justify">
El usuario puede crear su perfil inicial en el que agrega una dirección dirección, un nombre y las características del pedido, cancelarlos dando el motivo de cancelación pues si este fuera por algún problema se pueda arreglar y/o mejorar, se registra la fecha en que se realiza el pedido y/o se cancela. Al realizar cualquiera de las dos opciones se registrará de acuerdo a su número de pedido y se registrará con un status, asimismo el statu registrará si el pedido está activo o no.
</div>

<div style= "text-align: justify">
 Los administradores como es de esperarse tienen más privilegios que el usuario como, editar su información personal así como editar su foto y crear nuevos administradores o eliminarlos, también puede agregar o cambiar categorías, cambiar precios, ver las solicitudes de diversos usuarios y ver su estado.
 </div>

<div style= "text-align: justify">
El administrador contiene una barra de herramientas donde el administrador observa los pedidos; nombre del producto, marca, precio, status, cuantos tiene el inventario, buscar pedidos. Además puede crear tanto nuevos productos, como clases o categorías para la base de datos, indicando sus características como precio o medidas que contenga la persiana para que puedan visualizarlo los usuarios al guardarlo. Otra característica que tiene el Administrador es aplicar descuentos a los productos, decide si está disponible para la venta y puede añadir una foto del productor pues es necesario para que el usuario decida si quiere comprarlo y finalmente agrega una breve descripción del producto que se está 
ofreciendo.
</div>

&nbsp;

# Diagramas

<center>
## **Diagrama de Clases**
</center>

<div style= "text-align: justify">
En este diagrama se busca expresar la idea de cómo será el comportamiento de las clases. En este caso tenemos como clase base a “Productos”, a través de esta clase se tendrá acceso a las clases “Categoría” y “Marca”. De este modo el administrador tendrá acceso a las clases relacionadas con el producto de una forma dinámica, mediante la clase base (“Productos”) se podrá dar de alta, eliminar y editar los productos, marcas y características de los mismos. Sólo el administrador tendrá acceso directo a la clase base y por ende a las clases relacionadas para poder realizar todos sus métodos. En el caso del usuario, este solo tendrá acceso a la clase “Opciones” sólo hereda los métodos que le permitan realizar las acciones ya mencionadas. Asimismo se puede observar las características(elementos) que contiene cada clase.y las funciones que tienen dentro del software.
</div>

&nbsp;

<img src="/archivos/index/captura1.png">

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

# Preguntas que se hicieron durante la entevista

1. ¿Cual es el nombre de la empresa?
2. ¿Ya tienes un sitio Web o es un proyecto desde cero? 
3. ¿Cuál es el propósito de la página? 
4. ¿A quién va dirigida la página? 
5. ¿Qué es lo primero que deseas que se visualice al entrar en el sitio? 
6. ¿Qué datos de los usuarios necesitas? 
7. ¿Cuántos números de contactos prefieres que deje el usuario? 
8. ¿Qué datos de los asesores necesitas? 
9. ¿Cuáles datos de los asesores se mostrarán al usuario? 
10. ¿Qué datos del usuario podrá ver el asesor? 
11. ¿Cómo desea que se la comunicación entre usuario y asesor? 
12. ¿Cómo se registran las compras? 
13. ¿Cuántas compras tendrá permitido hacer el usuario? 
14. ¿Qué variables/categorías ocupa su empresa? 
15. ¿Qué medidas maneja? 
16. ¿Qué tipos de tela ofrece? 
17. ¿Ofrece descuentos? 
18. ¿Cómo desea que se muestren los descuentos? 
19. ¿El dinero se depositaria en una cuenta señalada en el sitio o se pagaría personalmente? 
20. ¿Algo que deseé usted añadir al sitio que no se haya mencionado?