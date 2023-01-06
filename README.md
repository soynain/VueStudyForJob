# vuerepaso

## Conceptos a repasar: props, manejo de hooks (refs), almacenamiento de estados, router de front end, guardado de jwt's, CORS handling con vite.

Aqui está el cliente que hice para mi practica de rest api con php vanilla, cliente sencillo, puede ser mejorado
con respecto a validación de campos u otras optimizaciones, pero ps es para no ir erizo también.

Login sencillito, traté de usar unos componentes de boostrap para vue, no sirven, me quedo con la notacion normal de boostrap

![image](https://user-images.githubusercontent.com/78714792/210921874-051398c9-1baa-4451-a25e-729519ccb150.png)

Dashboard sencillito, diseño reciclado del ejercicio php con mvc, solo que la tabla puede hacer scroll mientras mas registros tenga, también le
deje un espacio para una paginación que ya no implementé, no es que eso me cueste, es que no tengo tiempo.

![image](https://user-images.githubusercontent.com/78714792/210922115-40a42c61-6cf9-4a4e-a024-0e5c9706a719.png)

Formulario para registrar nuevo producto, hago uso de estados para evitar enviar campos vacios:

![image](https://user-images.githubusercontent.com/78714792/210922316-8589a3c6-262c-4c58-a937-f7f07ac7a52c.png)

Está chida la advertencia porque desaparece después de 5 segundos, usando eventos con estados y renderizados condicionales.

Al guardar productos, sale una advertencia de que se hizo con éxito, e igual los alerts desaparecen

![image](https://user-images.githubusercontent.com/78714792/210922617-48f5cfe7-ec86-46c6-8df5-04a074652ccf.png)


El borrado de elementos jala muy bien también vue es rapido como siempre, me faltó un modal, pude haberlo hecho fácil con unos props y un componente encimado del dashboard con un div de zindex en 99999, un position fixed y un with y height de 100% con fondo transparente y un componente hijo que seria una tarjeta para preguntar si está seguro de borrar o no, pero que gueba también, solo me interesa recordar conceptos de vue.

![image](https://user-images.githubusercontent.com/78714792/210922777-c6e19dea-efc9-4e5d-86cb-1e4a353437c9.png)

El formulario para modificar un producto es el mismo, me faltó pasar los textos a los inputs con otro props al forms, pero me interesaba saber más el como reusar un componente para no clonar dos veces los inputs. Para hacer lo que me faltó, en teoria al routear al otro componente, debí pasar los props pero al iniciar el componente o: hacia una consulta con el id individual o, guardaba los datos en un estado y los cargaba en automatico al componente al empezar.

![image](https://user-images.githubusercontent.com/78714792/210922920-34a92a31-0903-4e42-83eb-550acc358037.png)

Todo se actualiza chido también, y las rutas están protegidas, si quiero ir al login estando con un token, no me dejará y viceversa.
