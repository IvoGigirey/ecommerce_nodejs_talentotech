# E-commerce

Este proyecto es una tienda online desarrollada en React que permite a los usuarios explorar productos, ver detalles, agregar productos al carrito y gestionar sus compras de manera sencilla y moderna.

## Características

- **Listado de productos**: Los productos se obtienen dinámicamente desde una API pública y desde MockAPI para administración.
- **Detalle de producto**: Cada producto tiene su propia página con información ampliada.
- **Carrito de compras**: Los usuarios pueden agregar y eliminar productos del carrito, ver el total y vaciar el carrito.
- **Rutas protegidas**: El acceso al carrito y al panel de administración está protegido; solo usuarios logueados pueden acceder.
- **Panel de administración**: Permite crear, editar y eliminar productos, con validaciones y confirmaciones.
- **Búsqueda y paginación**: Barra de búsqueda para filtrar productos por nombre o categoría y paginador para navegar entre páginas.
- **Navegación moderna**: Navbar sticky, botón flotante de carrito y diseño responsive.
- **Manejo de estados y efectos**: Uso de `useState`, `useEffect` y Context API para gestionar datos y autenticación.
- **Diseño responsive**: Adaptado para dispositivos móviles y escritorio usando CSS y styled-components.
- **SEO y accesibilidad**: Uso de React Helmet para mejorar el SEO y etiquetas ARIA para accesibilidad.

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- [SweetAlert2](https://sweetalert2.github.io/) para confirmaciones y alertas
- [React Helmet](https://github.com/nfl/react-helmet) para SEO
- CSS moderno y responsive

## Instalación y uso

1. Clona el repositorio:
   ```sh
   git clone https://github.com/IvoGigirey/ecommerce_nodejs_talentotech/tree/main/proyecto-test
   ```
2. Accede a la carpeta del proyecto:
   ```sh
   cd proyecto-test
   ```
3. Instala las dependencias:
   ```sh
   npm install
   ```
4. Inicia la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```
5. Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la tienda online.

## Uso de la aplicación

- **Explorar productos**: Desde la página principal puedes buscar y navegar entre productos usando la barra de búsqueda y el paginador.
- **Ver detalles**: Haz clic en cualquier producto para ver su información ampliada.
- **Agregar al carrito**: Desde la lista o el detalle puedes agregar productos al carrito y ver el total en el botón flotante.
- **Gestionar el carrito**: Accede al carrito para modificar cantidades, eliminar productos o vaciar el carrito.
- **Panel de administración**: Inicia sesión como administrador para acceder al panel, donde puedes crear, editar y eliminar productos. El panel incluye validaciones y confirmaciones antes de eliminar.
- **Credenciales de admin hardcodeadas**: Usuario: admin - Clave: 1234

## API de productos

- Para administración y persistencia se usa [MockAPI](https://mockapi.io/).

## Estructura principal

- `/src/components`: Componentes reutilizables como Navbar, ProductList, ProductDetail, Cart y Admin.
- `/src/context`: Contextos para autenticación y carrito.
- `/src/App.jsx`: Configuración de rutas y lógica principal de la app.

## Acceso al panel de administración

- Para acceder al panel de administración debes iniciar sesión con el usuario correspondiente.
- El panel permite gestionar el catálogo completo de productos.

## Autor

Desarrollado por Ivo Gigirey.

