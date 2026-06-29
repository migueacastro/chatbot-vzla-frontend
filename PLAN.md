# Chatbot de Asistencia - Terremoto en Venezuela

Este documento detalla la arquitectura, hallazgos y avances del proyecto del frontend del chatbot, enfocado en centralizar información sobre la emergencia en Venezuela. El sistema ha sido desarrollado utilizando **SvelteKit 2**, **Svelte 5 (Runes)**, **TypeScript** y **DaisyUI (Tailwind CSS v4)**, conectado a **OpenRouter** (optimizado para modelos tipo Gemini 2.0 Flash / Llama 3.3).

## Objetivo
Desarrollar una aplicación accesible, modular y fácilmente integrable que asista a los ciudadanos, especialmente a personas de la tercera edad, ofreciendo respuestas rápidas e información centralizada sobre la emergencia.

---

## 📌 Hallazgos y Decisiones de Arquitectura Tomadas

### 1. Migración a TypeScript Nativo
- **Estado**: ✅ Completado.
- **Hallazgos**: El proyecto fue migrado de JavaScript (JSDoc) a TypeScript puro. Se crearon interfaces centralizadas en `src/lib/types.ts` (`Message`, `AppConfig`), lo que garantiza validación de tipos estricta y evita errores en tiempo de ejecución.
- **Chequeo de Tipos**: Se actualizó `tsconfig.json` y los scripts de chequeo `svelte-check` pasan con 0 errores.

### 2. Sistema de Configuración Centralizada
- **Estado**: ✅ Completado.
- **Hallazgos**: Se abstrajeron todas las cadenas de texto del proyecto (nombre del bot, descripciones, avisos legales) hacia `src/lib/config.ts` (`APP_CONFIG`). Esto permite cambiar la marca o el propósito de la aplicación desde un solo archivo.

### 3. Sistema de Temas y Paleta Personalizada
- **Estado**: ✅ Completado.
- **Hallazgos**: Se diseñó un sistema de diseño utilizando Tailwind v4 `@theme` y DaisyUI en `src/theme.css`.
- **Paleta de Colores**: Integración de escalas tonales (`night-bordeaux`, `rosy-granite`, `pale-slate`, `silver`, `shadow-grey`).
- **Modo Claro / Oscuro**: El cambio de tema está automatizado con un selector en `Navbar.svelte` sincronizado reactivamente mediante la runa `$effect` de Svelte 5 y guardado en `localStorage`.

### 4. Modelo de IA Recomendado
- **Estado**: ✅ Definido.
- **Recomendación**: Se sugiere utilizar **Google Gemini 2.0 Flash** (`google/gemini-2.0-flash-001`) o **Llama 3.3 70B Instruct** por su bajo costo, ventana de contexto gigante y velocidad para extracción directa sin rodeos.

### 5. Guía de Estilo de Contenido e Interfaz
- **Estado**: ✅ Definido.
- **Directriz**: Evitar el uso de emojis en textos del sistema, opciones predeterminadas, código o comentarios para mantener una interfaz limpia, profesional y sobria acorde a la temática de asistencia en emergencias.

---

## Arquitectura y Capas del Proyecto

### Capa 1: Frontend Principal (Aplicación de Chatbot)
- **UX/UI Accesible**: Fuentes amplias, botones de preguntas predeterminadas y diseño adaptado a personas mayores.
- **Streaming SSE**: Conexión por Server-Sent Events desde `/api/chat/+server.ts` hacia OpenRouter para recibir respuesta en tiempo real sin recargar la página.

### Capa 2: Capa de Widget (Integración a Terceros)
- **Embebible en `<iframe>`**: La ruta `/widget` sirve la interfaz limpia del chatbot sin encabezados ni navegación externa, ideal para integración en sitios de terceros.

### Capa 3: Capa de Documentación
- **Ruta `/docs`**: Renderiza dinámicamente el archivo `README.md` del repositorio utilizando `marked`, sirviendo como guía para desarrolladores externos.

---

## 🛠️ Resumen de Implementación Técnica

- **`src/lib/types.ts`**: Tipos globales para mensajes y configuración.
- **`src/lib/config.ts`**: Constantes globales de la aplicación.
- **`src/theme.css`**: Variables de color globales y definiciones de tema para DaisyUI.
- **`src/lib/components/Navbar.svelte`**: Navegación accesible, menú colapsable responsive y selector de tema persistente.
- **`src/lib/components/Chat/ChatInterface.svelte`**: Manejador del flujo del chat, estados de carga y botones predeterminados.
- **`src/lib/components/Chat/Message.svelte`**: Burbujas de mensaje adaptadas al tema con renderizado Markdown.
- **`src/routes/api/chat/+server.ts`**: Endpoint proxy seguro que resguarda la API Key de OpenRouter en el servidor.
