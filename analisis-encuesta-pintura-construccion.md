# Análisis de la Encuesta de Satisfacción
## Pintura y Construcción - Grupo Silva

---

## RESUMEN ESTRATÉGICO

Esta encuesta está diseñada como una **herramienta de diagnóstico**, no solo de satisfacción. 

Estructura el circuito de compra en 5 etapas:
1. **Entrada y Primera Impresión** (P1-P2)
2. **Búsqueda de Productos** (P3-P4, P13)
3. **Atención y Asesoramiento** (P5-P7)
4. **Tiempo y Eficiencia** (P8-P10)
5. **Retiro y Experiencia General** (P11-P15)

Permite identificar **dónde se pierden clientes** en el circuito y **por qué**.

---

## PREGUNTAS POR ETAPA

### **ETAPA 1: ENTRADA Y PRIMERA IMPRESIÓN**

#### **P1: "Cuando entraste, ¿te sentiste bienvenido?"**

**Tipo de respuesta:** Sí / No  
**Opciones:** Sí | No

**¿Qué mide?**
- Calidad de la bienvenida inicial
- Sentimiento de acogida del cliente
- Presencia/disponibilidad del personal en la entrada

**Problema u oportunidad que detecta:**
- ❌ Si responde "No": Personal no está atento, no hay contacto visual, falta de predisposición inicial
- 📊 Correlaciona con abandono de compra (cliente que no se siente bienvenido tiende a no comprar)
- 🔴 Indicador de falta de formación en atención al público

---

#### **P2: "¿Te pareció que el local estaba ordenado y limpio?"**

**Tipo de respuesta:** Escala 1-5  
**Opciones:** Para nada | Poco | Normal | Bien | Muy bien

**¿Qué mide?**
- Presentación del local
- Orden en estanterías
- Limpieza general
- Profesionalidad percibida

**Problema u oportunidad que detecta:**
- ❌ Puntuaciones bajas: Desorden → Cliente no encuentra productos, no se siente seguro de la calidad
- 🚩 Si es consistentemente bajo: Falta de protocolo de limpieza y orden diario
- 📉 Impacta directamente en la decisión de compra ("si el local está desordenado, quizás los productos también")
- 🎯 Métrica fácil de mejorar (limpieza diaria, organización de estanterías)

---

### **ETAPA 2: BÚSQUEDA DE PRODUCTOS**

#### **P3: "¿Encontraste todo lo que viniste a buscar?"**

**Tipo de respuesta:** Opción múltiple  
**Opciones:** Sí, encontré todo | Encontré parte de lo que buscaba | No encontré lo que buscaba

**¿Qué mide?**
- Tasa de cumplimiento de búsqueda
- Éxito en la experiencia de compra
- Disponibilidad general de productos

**Problema u oportunidad que detecta:**
- ❌ "No encontré": Pérdida potencial de venta
- ⚠️ "Parcial": Compra incompleta, cliente puede ir a otro lado después
- 🔍 Branching a P4 (solo si responde "parcial" o "no")
- 💡 Indicador de qué productos faltan en stock más buscados

**Análisis posterior:**
- Si 40%+ responden "no/parcial" → Problema sistémico de stock
- Si solo algunos productos → Falta de reposición en esos artículos

---

#### **P4: "¿Qué pasó?" (solo si P3 ≠ "todo")**

**Tipo de respuesta:** Opción múltiple  
**Opciones:**
- No había stock
- No lo encontré en el local (estaba en otro lado)
- No sabía dónde estaba y nadie me orientó
- Vi que el precio era muy alto
- Otro motivo

**¿Qué mide?**
- Causa raíz del problema de búsqueda
- Diferencia entre: falta de stock vs. mala ubicación vs. falta de asesoramiento vs. precio

**Problema u oportunidad que detecta:**

| Respuesta | Problema | Acción |
|-----------|----------|--------|
| **No había stock** | Falta de reposición, supply chain débil | Revisar sistema de compras y reposición |
| **No lo encontré en el local** | Señalización deficiente, falta de orden | Mejorar señalética y organización |
| **No sabía dónde / nadie me orientó** | Falta de atención proactiva, personal no disponible | Capacitación en atención, rotación de personal en piso |
| **Precio muy alto** | Estrategia de precios vs. competencia | Revisar competencia, márgenes, promociones |
| **Otro** | Motivo no contemplado (importante para investigar) | Seguimiento manual de comentarios |

🔴 **Clave:** Esta pregunta revela si el problema es de **oferta (stock)** o de **servicio (atención/orientación)**. Mucha diferencia en las acciones correctivas.

---

#### **P13: "¿Fue fácil encontrar los productos en el local?"**

**Tipo de respuesta:** Escala 1-5  
**Opciones:** Para nada | Difícil | Normal | Fácil | Muy fácil

**¿Qué mide?**
- Usabilidad del local
- Efectividad de la señalización
- Disposición de estanterías

**Problema u oportunidad que detecta:**
- ❌ Puntuaciones bajas: Señalización pobre, falta de orientación visual
- 🗺️ Corrobora (o contradice) P4: Si P4 dice "no lo encontré" pero P13 es "fácil", problema fue de stock o desconocimiento del cliente
- 💡 Métrica para diseño del local: layout, carteles, categorización de productos

---

### **ETAPA 3: ATENCIÓN Y ASESORAMIENTO**

#### **P5: "¿Un vendedor te abordó y te ofreció ayuda?"**

**Tipo de respuesta:** Sí / No  
**Opciones:** Sí | No

**¿Qué mide?**
- Presencia activa de vendedores en piso
- Proactividad del equipo
- Cobertura de atención

**Problema u oportunidad que detecta:**
- ❌ Si responde "No": 
  - No hay suficiente personal en piso
  - Personal ocupado en otras tareas
  - Falta de protocolo de acercamiento a cliente
- 📊 Cliente que no es abordado tiene mayor riesgo de abandono
- 🎯 Branching a P6 (solo si responde "sí")

---

#### **P6: "¿Cómo fue la atención?" (solo si P5 = "sí")**

**Tipo de respuesta:** Escala 1-5  
**Opciones:** Mala | Poco amable | Normal | Amable | Muy amable

**¿Qué mide?**
- Calidad de la interacción personal
- Amabilidad y predisposición
- Tono y actitud del vendedor

**Problema u oportunidad que detecta:**
- ❌ Puntuaciones bajas: Falta de capacitación en atención al cliente, problemas de actitud
- 😠 Si hay correlación con "no volvería" (P14) → Atención es factor decisivo
- 📌 Indicador de necesidad de capacitación o cambio de personal
- 💡 Área sensible: un vendedor con mala actitud arruina toda la experiencia

---

#### **P7: "¿El vendedor conocía los productos y pudo asesorarte?"**

**Tipo de respuesta:** Escala 1-5  
**Opciones:** Para nada | Poco | Regular | Bien | Muy bien

**¿Qué mide?**
- Conocimiento técnico del personal
- Capacidad de asesoramiento
- Valor agregado de la interacción

**Problema u oportunidad que detecta:**
- ❌ Puntuaciones bajas: Falta de capacitación en productos, falta de experiencia
- 📚 Diferencia entre "es amable pero no sabe nada" vs. "es brusco pero experto"
- 🎯 Si P6 es alto pero P7 es bajo: Problema de formación, no de actitud
- 💰 Impacta en ticket promedio (cliente asesorado compra más y mejor)
- 🔍 Si bajo: revisar programa de capacitación en productos

---

### **ETAPA 4: TIEMPO Y EFICIENCIA**

#### **P8: "¿Cuánto tuviste que esperar para ser atendido?"**

**Tipo de respuesta:** Opción múltiple  
**Opciones:**
- Fue inmediato
- Pocos minutos
- Bastante tiempo (fue molesto)
- Demasiado tiempo (casi me voy)

**¿Qué mide?**
- Tiempo de espera inicial
- Velocidad de respuesta del equipo
- Percepción del cliente sobre demora

**Problema u oportunidad que detecta:**
- ⏱️ "Bastante tiempo" o "Demasiado": Problema de staffing o falta de coordinación
- 🚨 "Casi me voy": Abandono real o casi abandono
- 📊 Si es consistente → Falta de personal en piso, especialmente en horarios pico
- 💡 Métrica: Medir promedio de respuesta en minutos

---

#### **P9: "¿El tiempo total de la compra fue razonable?"**

**Tipo de respuesta:** Sí / No  
**Opciones:** Sí | No, fue muy larga

**¿Qué mide?**
- Eficiencia total del circuito de compra
- Percepción del cliente sobre duración
- Suma de tiempos: espera inicial + búsqueda + caja + retiro

**Problema u oportunidad que detecta:**
- ❌ Si responde "No": El circuito es ineficiente
- 🔍 Combinado con P8, P10, P11 → Identifica en qué paso se pierde tiempo
- ⚠️ Compra larga → Mayor riesgo de no volver
- 💡 Métrica: Tiempo promedio de compra en minutos (medir en piso)

---

#### **P10: "¿Cómo fue la experiencia en caja?"**

**Tipo de respuesta:** Escala 1-5  
**Opciones:** Lenta | Algo lenta | Normal | Ágil | Muy ágil

**¿Qué mide?**
- Velocidad en punto de venta
- Eficiencia del proceso de pago
- Profesionalismo en caja

**Problema u oportunidad que detecta:**
- ❌ Puntuaciones bajas: Caja lenta, falta de personal, sistema lento
- 🛑 Es el punto final de la compra: si es malo, cliente se va con mal sabor de boca
- 📊 Si P9 es "No" pero P10 es "Ágil" → Demora está en otra etapa (búsqueda, retiro)
- 💡 Métrica fácil de optimizar: aumentar personal en caja, mejorar sistema de pago

---

### **ETAPA 5: RETIRO Y EXPERIENCIA GENERAL**

#### **P11: "¿Te entregaron la mercadería bien y sin demoras?"**

**Tipo de respuesta:** Sí / No  
**Opciones:** Sí | No, tuve que esperar

**¿Qué mide?**
- Velocidad de preparación/retiro
- Eficiencia en el almacén/depósito
- Última impresión antes de partir

**Problema u oportunidad que detecta:**
- ⏱️ "No, tuve que esperar": Demoras en preparación o falta de coordinación entre vendedor y depósito
- 🎯 Punto crítico: última interacción determina la impresión final
- 📦 Si es consistente → Revisar proceso de picking y picking time
- 🔴 Correlaciona con "no volvería" (P14)

---

#### **P12: "¿La mercadería llegó en buen estado?"**

**Tipo de respuesta:** Escala 1-5  
**Opciones:** Mal | Con daños | Aceptable | Bien | Perfecta

**¿Qué mide?**
- Calidad del empaque
- Cuidado en la preparación
- Calidad de los productos

**Problema u oportunidad que detecta:**
- ❌ Puntuaciones bajas: Daños en productos, empaque deficiente, falta de cuidado
- 🚨 Impacta directamente en satisfacción final y en garantías/reclamaciones
- 📊 Si hay patrón de baja puntuación → Revisar proceso de empaque, capacitación
- 💰 Productos dañados = gasto en reposición y mala experiencia

---

#### **P14: "¿Volverías a comprar acá?"**

**Tipo de respuesta:** Sí / No  
**Opciones:** Sí | No

**¿Qué mide?**
- Probabilidad de compra repetida
- Lealtad del cliente
- Intención comportamental

**Problema u oportunidad que detecta:**
- 🎯 **Métrica clave**: Si responde "No", hay un problema grave en algún punto del circuito
- 🔍 Correlaciona con todas las preguntas anteriores: ¿Dónde se rompió la cadena?
- 📉 Si es bajo (< 80% responden Sí) → Problema sistémico
- ⚠️ Pérdida de cliente = pérdida de ingresos recurrentes + pérdida de boca a boca

**Análisis posterior:**
- Si P14 = "No" pero todas las otras preguntas son altas → Problema puntual (precio, producto específico)
- Si P14 = "No" y hay bajas en P6, P7 o P10 → Atención o eficiencia es el problema
- Si P14 = "No" y hay bajas en P3 o P2 → Stock u orden es el problema

---

#### **P15: "¿Se la recomendarías a un amigo?"**

**Tipo de respuesta:** Sí / No  
**Opciones:** Sí | No

**¿Qué mide?**
- Disposición a recomendar (NPS proxy)
- Satisfacción lo suficientemente alta para referir
- Valor percibido de la sucursal

**Problema u oportunidad que detecta:**
- 🌟 **Métrica de lealtad emocional**: Cliente que recomienda es cliente comprometido
- 📊 Si P15 = "No" → Cliente no tiene confianza o tuvo experiencia negativa
- 🎯 Clientes que responden "Sí" son embajadores potenciales
- ⚠️ Si P14 = "Sí" pero P15 = "No" → Cliente vuelve pero no por confianza (ej: única opción, acostumbramiento)

---

### **P16: PREGUNTA ABIERTA CLAVE**

#### **"Si pudieras cambiar una sola cosa de esta sucursal, ¿qué sería?"**

**Tipo de respuesta:** Texto abierto (opcional)

**¿Qué mide?**
- Problemas no contemplados en la encuesta
- Prioridades del cliente
- Insights cualitativos

**Problema u oportunidad que detecta:**
- 💡 Revela problemas que el cliente considera CRÍTICOS
- 🎯 Muchas respuestas similares = problema grave + prioritario
- 📌 Permite validar hipótesis de las otras preguntas
- 🔍 Fuente de ideas de mejora concreta

**Ejemplos de respuestas que revelan problemas:**
- "Stock de las principales marcas": Problema de compras
- "Mejor señalización": Problema de orientación/navegación
- "Vendedores que sepan de construcción": Problema de capacitación
- "Más personal en piso": Problema de staffing
- "Cajas más rápidas": Cuello de botella identificado
- "Que el precio fuera más competitivo": Estrategia de precios

---

## MATRIZ DE ANÁLISIS

Para analizar los resultados, usar esta matriz:

| Elemento a Detectar | Preguntas Clave | Señales de Alerta |
|-------------------|-----------------|-------------------|
| **Falta de Stock** | P3, P4, P13 | P3="No", P4="No había stock" |
| **Mala Atención Inicial** | P1, P5, P6 | P1="No", P5="No", P6 ≤2 |
| **Falta de Asesoramiento** | P5, P7 | P7 ≤2, correlación con P14="No" |
| **Demoras en Espera** | P8, P9 | P8="Demasiado", P9="No" |
| **Ineficiencia en Caja** | P10, P9 | P10 ≤2, P9="No" |
| **Demora en Retiro** | P11 | P11="No" |
| **Productos Dañados** | P12 | P12 ≤2, correlación con reclamaciones |
| **Orden/Limpieza** | P2 | P2 ≤2 |
| **Señalización Pobre** | P4, P13 | P4="No encontré/No sabía", P13 ≤2 |
| **Pérdida de Cliente** | P14, P15 | P14="No", P15="No" |

---

## CÁLCULO DE INDICADORES

### **Tasa de Cumplimiento de Búsqueda (TCB)**
```
TCB = (Respuestas "Sí, encontré todo" en P3) / Total × 100
Objetivo: > 85%
Alerta: < 75%
```

### **Tasa de Rotación (No Vuelve)**
```
Rotación = (Respuestas "No" en P14) / Total × 100
Objetivo: < 10%
Alerta: > 20%
```

### **Tasa de Recomendación (NPS Proxy)**
```
NPS_Proxy = (Respuestas "Sí" en P15) / Total × 100
Objetivo: > 80%
Alerta: < 60%
```

### **Puntaje de Atención (PA)**
```
PA = (Promedio P6 + Promedio P7) / 2
Escala: 1-5
Objetivo: > 4.0
Alerta: < 3.0
```

### **Puntaje de Eficiencia (PE)**
```
PE = (Promedio P8 invertido + Promedio P10) / 2
Escala: 1-5 (P8 invertido: "Inmediato"=5, "Demasiado"=1)
Objetivo: > 4.0
Alerta: < 3.0
```

---

## PERIODIZACIÓN Y SEGUIMIENTO

- **Semanal:** Revisar si hay respuestas "No" en P14/P15 → Investigación inmediata
- **Mensual:** Calcular indicadores TCB, Rotación, NPS_Proxy
- **Mensual:** Analizar P16 (pregunta abierta) → Plan de acción
- **Trimestral:** Comparar tendencias, medir impacto de acciones correctivas

---

## CASOS DE EJEMPLO

### **Caso 1: Cliente insatisfecho**
- P1="No", P2="2", P5="No", P6="1", P14="No"
- **Diagnóstico:** Problema de bienvenida y atención. Personal ausente o poco amable.
- **Acción:** Capacitación urgente en atención al público.

### **Caso 2: Buena atención pero no vuelve**
- P6="5", P7="4", P12="1", P14="No"
- **Diagnóstico:** Problema de calidad de productos (llegaron dañados).
- **Acción:** Revisar proceso de empaque y almacenamiento.

### **Caso 3: Pérdida de venta potencial**
- P3="No", P4="No había stock", P14="No", P16="Nunca tienen lo que busco"
- **Diagnóstico:** Falta de stock consistente en productos buscados.
- **Acción:** Revisar sistema de compras y reposición.

### **Caso 4: Eficiencia pobre**
- P8="Demasiado", P10="2", P9="No", P14="Si", P15="No"
- **Diagnóstico:** Demoras en el circuito. Cliente vuelve solo por necesidad, no recomendaría.
- **Acción:** Aumentar personal en piso y caja. Optimizar flujo.

---

## PRÓXIMOS PASOS

1. **Implementar la encuesta** con QR en puertas de sucursal
2. **Crear Google Sheet** para registrar respuestas automáticamente
3. **Configurar alertas** en respuestas bajas (P14/P15 = No)
4. **Reunión semanal de Calidad** para revisar casos críticos
5. **Dashboard mensual** con indicadores TCB, Rotación, NPS_Proxy
6. **Plan de acción** derivado de análisis P16

