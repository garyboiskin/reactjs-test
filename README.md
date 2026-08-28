# Employee Management

## Docker Compose

Run the application and its json-server mock API together:

```bash
docker compose up --build
```

Open `http://localhost:8080`. The application sends employee requests to `/api`, which the frontend container proxies to the mock API. Employee data is persisted in `db.json` on the host.

Stop the services with:

```bash
docker compose down
```

## Kubernetes

Build the images in an environment your Kubernetes cluster can access:

```bash
docker build -t employee-app:v1 .
docker build -t employee-mock-api:latest -f Dockerfile.mock .
```

Apply the frontend and mock API manifests:

```bash
kubectl apply -k kubernetes
kubectl port-forward service/employee-app 8080:80
```

Open ``. The frontend Service remains internal to the cluster; the Nginx proxy resolves the `mock-api` Service by name. The mock API data is stored in the pod filesystem and is reset when its pod is replaced.

For local Vite development, set `VITE_API_URL=http://localhost:3000` in a `.env.local` file and run the mock server separately.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
