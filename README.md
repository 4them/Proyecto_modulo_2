# 4THEM

4them is an interactive space-themed ecard composer to send messages to your loved ones.
Based on the message, the NASA API and WIKIPEDIA API, you will construct a bizarre universe filled with knowledge and excitement. 
These visually astonoshing compositions will create a social environment where you can send, share, like, comment and become famous. 

With 4them, you can surprise your friends with an out of the box card! Just write your message and share!. 

## End points chart.

| Method        | End-point              | Description                                                         |
| :------------ |:-----------------------|:--------------------------------------------------------------------|
| GET           | /                      |Dashboard con mejores invitaciones y una galeria                     |
| GET           | /search?               |Muestra las tarjetas que tienen keywords relacionadas con la busqueda|
| GET           | /signup                |Pantalla para subscribirte / si está loggeado redirecciona a perfil  |
| POST          | /signup                |Recibir formulario y añadir a base de datos                          |
| GET           | /login                 |Formulario para hacer login                                          |
| POST          | /login                 |Recibir info de usuario, e iniciar sessión                           |
| GET           | /perfil                |Dashboard de cards anteriores                                        |
| GET           | /perfil/edit/:userId  |Pantalla para editar perfil                                          |
| POST          | /perfil/edit/:userId  |hacer update en base de datos y reenviar a profile.                  |
| GET           | /cards/new-card        |Pantalla principal. El usuario hace la invitación.                   |
| POST          | /cards/new-card        |Se guarda tarjeta en base de datos, reenvía a pefil o home.          |
| GET           | /cards/:id             |Enseña la información de la car                                      |
| POST          | /cards/:id             |Envía el comentario                                                  |
| GET           | /cards/edit/:id        |Mostrar detalles de la tajeta para editar                            |
| POST          | /cards/edit/:id        |Guardar detalles en base de datos y reenvía a home                   |
| GET           | /cards/send-card/:id   |Enviar por correo electrónico                                        |
| POST          | /cards/delete/:id      |Eliminar card                                                        |

