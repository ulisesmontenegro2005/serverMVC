
PROYECTO FINAL - CURSO DE PROGRAMACIÓN BACKEND
CODERHOUSE - COMISIÓN 32190
Ulises Montenegro

Descripción del proyecto: API REST con HTML on wire aplicado, contiene las funciones basicas para el funcionamiento de un ecommerce, desarrollado en NodeJS, con la libreria Express y utilizando como base de datos MongoDB.

Las siguientes rutas estan todas aplicadas con HTML on wire.

Routes + Description:

"/login": Iniciar sesion con email y contraseña.

"/register": Registrarse con email, nombre y contraseña.

"/faillogin": Vista desplegada al ocurrir un error en el loggeo.

"/failregister": Vista desplegada al ocurrir un error en el registro.

"/logout": Desloggeo.



"/products": Vista donde podras ver todos los productos y agregarlos al carrito.

"/products/:code": Vista donde podras ver el producto solicitado.



"/cart": Desplega HTML donde veras tu carrito, podras eliminar y hacer tu orden. Al pulsar el boton de "hacer orden" se enviara la confirmación de su pedido a su respectivo email.



-Debajo de los productos podras visualizar el chat desarrollado websocket (las vistas del carrito también fueron aplicadas con websocket).



Finalmente quiero a agradecer a @marcosvillanueva9 por las clases geniales y compartirnos todos sus conocimientos. 

