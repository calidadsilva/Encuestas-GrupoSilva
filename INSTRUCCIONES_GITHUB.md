# 📝 Instrucciones para Subir a GitHub Pages

## Paso 1: Crear el Repositorio

1. Entra a **https://github.com/calidadsilva** (tu usuario)
2. Haz click en el **botón "+" verde** (arriba a la derecha)
3. Selecciona **"Nuevo repositorio"** (o "New repository")
4. Rellena los datos:
   - **Nombre del repositorio:** `grupo-silva-encuestas`
   - **Descripción:** "Centro de encuestas de satisfacción Grupo Silva"
   - **Público** (marca esta opción para que sea visible)
   - Deja sin marcar "Agregar un archivo README"
5. Haz click en **"Crear repositorio"**

## Paso 2: Subir los Archivos

### Opción A: Subir directamente (más fácil)

1. En tu repositorio nuevo, haz click en **"Agregar archivo" → "Cargar archivos"**
2. Arrastra estos archivos a la ventana (o selecciónalos):
   - `index.html`
   - `encuesta-entrega-0km.html`
   - `encuesta-sucursal-colon.html`
   - `encuesta-pintura-construccion.html`
   - `registro-politica.html`
   - `README.md`

3. Abajo, donde dice "Mensaje de confirmación", escribe:
   ```
   Agregar encuestas de satisfacción
   ```

4. Haz click en **"Confirmar cambios"** (o "Commit changes")

### Opción B: Usar Git en tu computadora (más avanzado)

Si ya tienes Git instalado:

```bash
# 1. Clona el repositorio (primero crea el repositorio vacío en GitHub)
git clone https://github.com/calidadsilva/grupo-silva-encuestas.git
cd grupo-silva-encuestas

# 2. Copia todos los archivos .html y .md en esta carpeta

# 3. Agrega los archivos
git add .

# 4. Confirma los cambios
git commit -m "Agregar encuestas de satisfacción"

# 5. Sube a GitHub
git push origin main
```

## Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a **Configuración** (engranaje arriba a la derecha)
2. En el menú izquierdo, busca **"Páginas"** (o "Pages")
3. En la sección "Origen", selecciona:
   - Rama: **main**
   - Carpeta: **/ (raíz)**
4. Haz click en **"Guardar"**

¡Listo! GitHub crea automáticamente tu sitio web en:
**https://calidadsilva.github.io/grupo-silva-encuestas/**

## Paso 4: Acceder a las Encuestas

Después de activar Pages (puede tardar 1-2 minutos):

- **Página principal:** https://calidadsilva.github.io/grupo-silva-encuestas/
- **Encuesta Entrega 0km:** https://calidadsilva.github.io/grupo-silva-encuestas/encuesta-entrega-0km.html
- **Encuesta Sucursal Colón:** https://calidadsilva.github.io/grupo-silva-encuestas/encuesta-sucursal-colon.html
- **Encuesta Pintura y Construcción:** https://calidadsilva.github.io/grupo-silva-encuestas/encuesta-pintura-construccion.html
- **Registro de Política:** https://calidadsilva.github.io/grupo-silva-encuestas/registro-politica.html

## ✅ Verificar que Funciona

1. Entra a: https://calidadsilva.github.io/grupo-silva-encuestas/
2. Deberías ver la página de inicio con los 4 enlaces
3. Haz click en cada uno para verificar que todo funciona

## 🔄 Para Actualizar Archivos en el Futuro

Cada vez que necesites cambiar algo:

**Opción A: Desde la web (más fácil)**
1. Ve al archivo en GitHub
2. Haz click en el lápiz (editar)
3. Haz los cambios
4. Haz scroll abajo y confirma los cambios

**Opción B: Desde tu computadora con Git**
```bash
# Haz los cambios locales en los archivos
# Luego:
git add .
git commit -m "Descripción de los cambios aquí"
git push
```

Los cambios se publican automáticamente en tu sitio.

---

**¿Preguntas?** Pregúntame cualquier cosa 👍

