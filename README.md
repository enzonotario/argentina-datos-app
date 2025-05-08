# Argentina Datos

Visualizaciones de datos de Argentina, utilizando [Observable](https://observablehq.com/), con datos de [ArgentinaDatos API](https://argentinadatos.com/).

## Desarrollo

### Requisitos

- Node.js >= 20.6

### Instalación

```bash
npm install
```

### Comandos disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir el proyecto
npm run build

# Desplegar el proyecto
npm run deploy
```

## Formateo de código

Este proyecto utiliza [Biome](https://biomejs.dev/) para formatear y lintear el código. Biome es un formateador y linter rápido y configurable para JavaScript y TypeScript.

### Comandos para formateo de código

```bash
# Formatear todos los archivos
npm run format

# Verificar si los archivos están formateados correctamente
npm run format:check

# Ejecutar el linter
npm run lint

# Ejecutar linter y formateador, aplicando correcciones
npm run check
```

### Configuración de Biome

La configuración de Biome se encuentra en el archivo `biome.json` en la raíz del proyecto. Incluye:

- Formateo de código con espacios (2 espacios por nivel de indentación)
- Longitud máxima de línea: 100 caracteres
- Organización automática de importaciones
- Reglas de linting recomendadas

Para más información sobre Biome, consulta la [documentación oficial](https://biomejs.dev/).
