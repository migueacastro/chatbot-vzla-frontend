# Chatbot de Asistencia - Terremoto en Venezuela

Este documento detalla el plan de implementación para el proyecto del frontend del chatbot, enfocado en centralizar la información sobre el reciente terremoto en Venezuela. El sistema será desarrollado utilizando **SvelteKit** y **DaisyUI**, conectado a **OpenRouter** para la inteligencia artificial.

## Objetivo
Desarrollar una aplicación accesible, modular y fácilmente integrable que asista a los ciudadanos, especialmente a personas de la tercera edad, ofreciendo respuestas rápidas e información centralizada sobre la emergencia.

## Arquitectura y Capas del Proyecto

### Capa 1: Frontend Principal (Aplicación de Chatbot)
- **UX/UI Accesible y Minimalista**: Diseño enfocado en personas de la tercera edad. Fuentes grandes, alto contraste, botones amplios y navegación sencilla utilizando componentes de DaisyUI.
- **Mensajes Predeterminados**: Antes de iniciar la conexión con la API (OpenRouter), se mostrarán botones con preguntas o intenciones predefinidas (ej. "Números de emergencia", "Centros de acopio cercanos", "¿Qué hacer en caso de réplica?"). Esto minimiza la necesidad de escribir.
- **Integración con OpenRouter**: Conexión al backend de OpenRouter para mantener una conversación fluida (idealmente utilizando streaming o websockets para respuestas en tiempo real).

### Capa 2: Capa de Widget (Integración a Terceros)
- **Embebible**: Empaquetar la interfaz del chatbot para que pueda ser insertada en otras páginas web (ONGs, noticias, sitios gubernamentales).
- **Implementación**: Se creará una ruta específica (ej. `/widget`) optimizada para ser cargada dentro de un `<iframe>`, o alternativamente se compilará el componente principal como un Web Component para ser integrado mediante una etiqueta `<script>`.

### Capa 3: Capa de Documentación
- **Ruta de Docs**: Creación de una página dentro del sitio (ej. `/docs`) dedicada a explicar cómo los desarrolladores pueden integrar el widget.
- **Basado en README**: Se configurará un renderizador de Markdown (como `mdsvex` o `marked`) para que el contenido de esta página se alimente directamente del archivo `README.md` del repositorio.

---

## ⚠️ User Review Required

- **Selección de Modelo de IA**: OpenRouter ofrece múltiples modelos. ¿Tienes preferencia por algún modelo en específico (ej. Claude 3 Haiku, GPT-4o-mini, Llama 3) considerando costos, latencia y capacidad de respuesta en español?
- **Estrategia del Widget**: Para la Capa 2, la forma más rápida y robusta en SvelteKit es utilizar un `<iframe>` apuntando a una ruta aislada del proyecto. Compilar como Web Component es posible pero requiere configuraciones adicionales en SvelteKit. ¿Estás de acuerdo con ir por la ruta del `<iframe>` inicialmente?
- **Gestión de la API Key**: Como es una aplicación frontend, si nos conectamos directamente a OpenRouter desde el cliente, la API Key podría quedar expuesta. Se recomienda que SvelteKit actúe como un proxy backend (usando rutas `+server.js` o `+page.server.js`) para proteger la clave. Confirmar que este es el enfoque deseado.

## Open Questions

- ¿Tienes algún diseño de referencia o paleta de colores en mente para asegurar que sea lo más amigable posible para la tercera edad? (Ej: Tonos cálidos, alto contraste en blanco y negro, etc.)
- ¿Cuáles serían los 3 o 4 mensajes predeterminados principales que deberíamos incluir en la pantalla de inicio?

---

## Proposed Changes

### Inicialización y Configuración
- Inicializar aplicación con `npx sv create` (esqueleto base).
- Instalar Tailwind CSS y configurar **DaisyUI**.
- Instalar dependencias para el parser de markdown (ej. `mdsvex` o `marked`).

### Capa 1 (Frontend Chatbot)
- **`src/routes/+page.svelte`**: Interfaz principal del chatbot. Contendrá el contenedor de mensajes, input de texto y botones de mensajes rápidos.
- **`src/routes/api/chat/+server.js`**: Endpoint backend en SvelteKit que recibirá los mensajes del cliente y se comunicará de forma segura con OpenRouter, devolviendo un stream de la respuesta.
- **`src/lib/components/Chat/Message.svelte`**: Componente de interfaz utilizando DaisyUI para mostrar las burbujas de los mensajes.

### Capa 2 (Widget)
- **`src/routes/widget/+page.svelte`**: Página aislada que importa los componentes de chat, sin barras de navegación ni footers, lista para ser insertada vía iframe.

### Capa 3 (Documentación)
- **`src/routes/docs/+page.svelte`**: Página que lee y renderiza el contenido del `README.md`.
- **`README.md`**: Archivo central con las instrucciones de integración del widget e información del proyecto.

## Verification Plan

### Manual Verification
1. **Accesibilidad**: Revisar contraste de colores y tamaño de fuentes usando herramientas del navegador para simular visibilidad reducida.
2. **Flujo del Chat**: Probar que hacer clic en un "mensaje predeterminado" envíe el mensaje al backend de SvelteKit y devuelva el stream de OpenRouter.
3. **Widget**: Crear un archivo HTML simple externo, inyectar el iframe apuntando a `/widget` y verificar que funcione aisladamente.
4. **Documentación**: Modificar el archivo `README.md` localmente y verificar que la ruta `/docs` se actualice en consecuencia.
