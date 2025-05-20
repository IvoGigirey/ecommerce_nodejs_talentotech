# E-commerce

Este proyecto es una tienda online desarrollada en React que permite a los usuarios explorar productos, ver detalles, agregar productos al carrito y gestionar sus compras de manera sencilla y moderna.

## Características

- **Listado de productos**: Los productos se obtienen dinámicamente desde una API pública.
- **Detalle de producto**: Cada producto tiene su propia página con información ampliada.
- **Carrito de compras**: Los usuarios pueden agregar y eliminar productos del carrito, con un resumen del total.
- **Rutas protegidas**: El acceso al carrito está protegido para evitar que se acceda si está vacío.
- **Navegación moderna**: Navbar sticky, botón flotante de carrito y diseño responsive.
- **Manejo de estados y efectos**: Uso de `useState` y `useEffect` para gestionar datos y carga.
- **Diseño responsive**: Adaptado para dispositivos móviles y escritorio.

## Tecnologías utilizadas

- [React](https://reactjs.org/)
- [React Router DOM](https://reactrouter.com/)
- CSS moderno y responsive

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tuusuario/tu-repo.git
   ```
2. Instala las dependencias:
   ```sh
   npm install
   ```
3. Inicia la aplicación:
   ```sh
   npm run dev
   ```

## API de productos

Se utiliza [Fake Store API](https://fakestoreapi.com/) para obtener los productos de ejemplo.

## Estructura principal

- `/src/components`: Componentes reutilizables como Navbar, ProductList, ProductDetail y Cart.
- `/src/App.jsx`: Configuración de rutas y lógica principal de la app.

## Autor

Desarrollado por [Tu Nombre].

---

¡Explora, agrega productos y disfruta de una experiencia de compra moderna!

