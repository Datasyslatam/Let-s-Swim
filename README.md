# Lets Swim

Este proyecto es una aplicación React con TanStack Start y Vite, preparada para desplegar en Railway.

## Configuración de desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Servidor local

```bash
npm start
```

Esto arranca `server.js`, que envía las peticiones al handler de `dist/server/server.js`.

## Configuración para Railway

En Railway, usa estas opciones:

- Build command: `npm run build`
- Start command: `npm start`
- Node runtime: `22.12.x` o superior

Railway también puede detectar el `package.json` y respetar estas configuraciones:

- `packageManager`: `npm@10`
- `engines.node`: `>=22.12.0`
- `.nvmrc`: `22.12.0`

## Notas importantes

- `server.js` es el punto de entrada de producción.
- `process.env.PORT` se usa en `server.js` para que Railway asigne el puerto dinámico.
- Si Railway falla por dependencias nativas, haz una instalación limpia con:

```bash
rm -rf node_modules package-lock.json
npm install
```

## Estructura relevante

- `package.json`: scripts de build y start.
- `vite.config.ts`: configuración de TanStack Start con `preset: "node-server"`.
- `server.js`: adaptador Node HTTP para Railway.
- `.nvmrc`: versión de Node recomendada para deploy.
