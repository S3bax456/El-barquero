export interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
}

export interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

export const DEFAULT_MENU_DATA: Category[] = [
  {
    id: "bar",
    nombre: "Bar",
    items: [
      { nombre: "Pisco Sour", precio: "S/. 18.90", imagen: "/pisco-sour.jpg" },
      { nombre: "Machu Picchu", precio: "S/. 21.90", imagen: "/machu-picchu.png" },
      { nombre: "Mojito", precio: "S/. 18.90", imagen: "/mojito.png" },
      { nombre: "Coctel de Algarrobina", precio: "S/. 18.90", imagen: "/coctel-de-algarrobina.png" },
      { nombre: "Piña Colada", precio: "S/. 18.90", imagen: "/pina-colada.png" },
      { nombre: "Chilcano Clásico", precio: "S/. 18.90", imagen: "/chilcano-clasico.png" },
      { nombre: "Maracuyá Sour", precio: "S/. 18.90", imagen: "/maracuya-sour.png" },
      { nombre: "Cuba Libre", precio: "S/. 18.90", imagen: "/cuba-libre.png" },
      { nombre: "Chilcano de Tuna", precio: "S/. 18.90", imagen: "/chilcano-de-tuna.png" },
      { nombre: "Margarita", precio: "S/. 21.90", imagen: "/margarita.png" },
      { nombre: "Daiguiri Durazno", precio: "S/. 18.90", imagen: "/daiguiri-durazno.png" },
      { nombre: "Sangría 1 Lt.", precio: "S/. 40.00", imagen: "/sangria-1-lt.png" }
    ]
  },
  {
    id: "vinos",
    nombre: "Vinos",
    items: [
      { nombre: "Queirolo Magdalena", precio: "S/. 35.00", imagen: "/queirolo-magdalena.png" },
      { nombre: "Queirolo Borgoña", precio: "S/. 35.00", imagen: "/queirolo-borgona.png" },
      { nombre: "Tabernero Gran Tinto", precio: "S/. 45.00", imagen: "/tabernero-gran-tinto.png" },
      { nombre: "Tabernero Semi Seco Tinto", precio: "S/. 45.00", imagen: "/tabernero-semi-seco-tinto.png" },
      { nombre: "Tacama Gran Tinto", precio: "S/. 48.00", imagen: "/tacama-gran-tinto.png" },
      { nombre: "Tacama Semi Seco Tinto", precio: "S/. 40.00", imagen: "/tacama-semi-seco-tinto.png" },
      { nombre: "Intipalka Reserva Tinto", precio: "S/. 65.00", imagen: "/intipalka-reserva-tinto.png" },
      { nombre: "Casillero del Diablo Tinto", precio: "S/. 70.00", imagen: "/casillero-del-diablo-tinto.png" },
      { nombre: "Casillero del Diablo Blanco", precio: "S/. 70.00", imagen: "/casillero-del-diablo-blanco.png" },
      { nombre: "Navarro Correa", precio: "S/. 85.00", imagen: "/navarro-correa.png" },
      { nombre: "Concha y Toro Reservado", precio: "S/. 35.00", imagen: "/concha-y-toro-reservado.png" },
      { nombre: "Concha y Toro Frontera", precio: "S/. 48.00", imagen: "/concha-y-toro-frontera.png" },
      { nombre: "Queirolo Blanco", precio: "S/. 35.00", imagen: "/queirolo-blanco.png" },
      { nombre: "Queirolo Semi Seco", precio: "S/. 35.00", imagen: "/queirolo-semi-seco.png" },
      { nombre: "Tabernero Gran Blanco", precio: "S/. 45.00", imagen: "/tabernero-gran-blanco.png" },
      { nombre: "Tabernero Blanco Semi Seco", precio: "S/. 45.00", imagen: "/tabernero-blanco-semi-seco.png" },
      { nombre: "Tacama Gran Blanco", precio: "S/. 45.00", imagen: "/tacama-gran-blanco.png" },
      { nombre: "Tacama Semi Seco Blanco", precio: "S/. 48.00", imagen: "/tacama-semi-seco-blanco.png" },
      { nombre: "Queirolo Rose", precio: "S/. 35.00", imagen: "/queirolo-rose.png" },
      { nombre: "Tabernero Rose", precio: "S/. 40.00", imagen: "/tabernero-rose.png" },
      { nombre: "Tacama Rose", precio: "S/. 45.00", imagen: "/tacama-rose.png" }
    ]
  },
  {
    id: "entradas-criollas",
    nombre: "Entradas Criollas",
    items: [
      { nombre: "Papa a la Huancaína", descripcion: "papa huairo, queso, aceituna, huevo y crema", precio: "S/. 19.00", imagen: "/papa-a-la-huancaina.png" },
      { nombre: "Ocopa a la Arequipeña", descripcion: "papa huamantanga, camarones de camaná, aceitunas, queso, huevo y crema", precio: "S/. 19.00", imagen: "/ocopa-a-la-arequipena.png" },
      { nombre: "Huevo a la Rusa", descripcion: "huevo, salsa golf, papas y legumbres", precio: "S/. 14.00", imagen: "/huevo-a-la-rusa.png" },
      { nombre: "Palta Rellena con Pollo", descripcion: "palta, papas sancochadas, legumbres y pollo", precio: "S/. 19.00", imagen: "/palta-rellena-con-pollo.jpg" },
      { nombre: "Palta al Napoleón", descripcion: "palta, jamón inglés, champiñones, papas, pollo, wantan, papaya y salsa golf", precio: "S/. 20.00", imagen: "/palta-al-napoleon.jpg" },
      { nombre: "Causa Rellena de Pollo", descripcion: "papa huamantanga, crema de ají amarillo y pollo", precio: "S/. 19.00", imagen: "/causa-rellena-de-pollo.png" },
      { nombre: "Ensalada al Barquero", descripcion: "lechuga, brócoli, jamón inglés, queso, palta, choclo y pollo", precio: "S/. 22.00", imagen: "/ensalada-al-barquero.jpg" },
      { nombre: "Choclo con queso y Ají de Huacatay", descripcion: "entero", precio: "S/. 12.00", imagen: "/choclo-con-queso-y-aji.png" },
      { nombre: "Duo Mix", descripcion: "ocopa a la arequipeña y papa a la huancaína", precio: "S/. 25.00", imagen: "/duo-mix.jpg" },
      { nombre: "Tequeños Rellenos c/Jamón y Queso (8 und)", descripcion: "8 unidades", precio: "S/. 15.00", imagen: "/tequenos-jamon-y-queso.png" },
      { nombre: "Tequeños Rellenos c/Jamón y Queso (12 und)", descripcion: "12 unidades", precio: "S/. 22.00", imagen: "/tequenos-jamon-y-queso.png" }
    ]
  },
  {
    id: "entradas-marinas",
    nombre: "Entradas Marinas",
    items: [
      { nombre: "Causa en Pulpa de Cangrejo", descripcion: "papa huamantanga, pulpa de cangrejo y crema de ají amarillo", precio: "S/. 28.00", imagen: "/causa-en-pulpa-de-cangrejo.jpg" },
      { nombre: "Causa de Langostinos", descripcion: "papa huamantanga, langostinos, crema de ají amarillo y palta", precio: "S/. 28.00", imagen: "/causa-de-langostinos.png" },
      { nombre: "Pulpo al Olivo", descripcion: "láminas de pulpo, galleta soda, palta, papas laminadas, crema de aceitunas de botija", precio: "S/. 35.00", imagen: "/pulpo-al-olivo.jpg" },
      { nombre: "Causa con Pulpo al Olivo", descripcion: "láminas de pulpo, salsa de aceitunas de botija, aceite de oliva, vodka, limón, galleta soda y papas laminadas", precio: "S/. 35.00", imagen: "/causa-con-pulpo-al-olivo.png" },
      { nombre: "Causa Acebichada", descripcion: "papa huamantanga, palta, crema de ají amarillo, trozo de pescado, ají limo, yuyo", precio: "S/. 35.00", imagen: "/causa-acebichada.jpg" },
      { nombre: "Causa al Barquero", descripcion: "pulpa de cangrejo, langostinos, uñas de cangrejo, palta y crema de ají amarillo", precio: "S/. 35.00", imagen: "/causa-al-barquero.png" },
      { nombre: "Conchitas a la Parmesana (6 und)", descripcion: "6 unidades", precio: "S/. 30.00", imagen: "/conchitas-a-la-parmesana.jpg" },
      { nombre: "Conchitas a la parmesana Barquero", precio: "S/. 35.00", imagen: "/conchitas-a-la-parmesana.jpg" },
      { nombre: "Choritos a la Chalaca (8 und)", descripcion: "8 unidades; choros de paracas, cebolla, choclo, limón, ají limo y aceite de oliva", precio: "S/. 25.00", imagen: "/choritos-a-la-chalaca.jpg" },
      { nombre: "1 Docena de Choritos a la Chalaca", descripcion: "1/2 docena de choros de paracas, cebolla, choclo, limón, ají limo y aceite de oliva", precio: "S/. 38.00", imagen: "/choritos-a-la-chalaca.jpg" },
      { nombre: "Palta Rellena con Langostinos", descripcion: "palta, papas brunoise, legumbres y salsa golf", precio: "S/. 22.00", imagen: "/palta-rellena-con-langostinos.png" },
      { nombre: "Palta Rellena a la Victoria", descripcion: "palta, langostinos, papas brunoise, legumbres, salsa golf, huevo y melón", precio: "S/. 22.00", imagen: "/palta-rellena-a-la-victoria.jpg" },
      { nombre: "Tequeños Rellenos de Pulpa de Cangrejo", descripcion: "8 unidades", precio: "S/. 27.00", imagen: "/tequenos-de-pulpa-de-cangrejo.jpg" },
      { nombre: "Tequeños Rellenos de Langostinos", descripcion: "8 unidades", precio: "S/. 27.00", imagen: "/tequenos-de-langostinos.jpg" }
    ]
  },
  {
    id: "cocktails-marinos",
    nombre: "Cocktails Marinos",
    items: [
      { nombre: "Leche de Tigre", precio: "S/. 26.00", imagen: "/leche-de-tigre.png" },
      { nombre: "Leche de Pantera", precio: "S/. 29.00", imagen: "/leche-de-pantera.png" },
      { nombre: "Cocktail de Langostinos", precio: "S/. 26.00", imagen: "/cocktail-de-langostinos.jpg" },
      { nombre: "Cocktail al Barquero", descripcion: "uñas de cangrejo, langostinos, conchas de abanico, conchas negras, yuyo crocante, fideo de arroz chino y chifles", precio: "S/. 29.00", imagen: "/cocktail-al-barquero.png" },
      { nombre: "Leche de tigre carretillero", descripcion: "leche de tigre, chicharrón de pescado, yuyo frito", precio: "S/. 35.00", imagen: "/leche-de-tigre-carretillero.png" },
      { nombre: "Leche de pantera carretillero", descripcion: "leche de pantera, chicharrón de pescado, yuca y yuyo frito", precio: "S/. 38.00", imagen: "/leche-de-pantera-carretillero.png" }
    ]
  },
  {
    id: "cebiches",
    nombre: "Cebiches",
    items: [
      { nombre: "Cebiche de Pescado", descripcion: "de la estación", precio: "S/. 42.00", imagen: "/cebiche-de-pescado.png" },
      { nombre: "Cebiche Mixto", descripcion: "mix mariscos, pescado", precio: "S/. 47.00", imagen: "/cebiche-mixto.jpg" },
      { nombre: "Cebiche de Pulpo", descripcion: "láminas de pulpo, camote", precio: "S/. 47.00", imagen: "/cebiche-de-pulpo.png" },
      { nombre: "Cebiche de Conchas negras", precio: "S/. 48.90", imagen: "/cebiche-de-conchas-negras.jpg" },
      { nombre: "Cebiche Clásico", descripcion: "cebiche de pescado + conchas negras", precio: "S/. 55.00", imagen: "/cebiche-clasico.png" },
      { nombre: "Cebiche de Mariscos", descripcion: "mix mariscos", precio: "S/. 55.90", imagen: "/cebiche-de-mariscos.png" },
      { nombre: "Cebiche de pulpo con langostinos", precio: "S/. 48.00", imagen: "/cebiche-de-pulpo-con-langostinos.png" },
      { nombre: "Cebiche de pescado con langostinos", descripcion: "trozos de pescado y langostinos", precio: "S/. 48.00", imagen: "/cebiche-de-pescado-con-langostinos.png" }
    ]
  },
  {
    id: "cebiches-especiales",
    nombre: "Cebiches Especiales",
    items: [
      { nombre: "Cebiche al Barquero", descripcion: "pescado, conchas de abanico, langostinos, uñas de cangrejo, camarón con garra, champiñones y espárragos", precio: "S/. 55.90", imagen: "/cebiche-al-barquero.png" },
      { nombre: "Cebiche Mar y Tierra", descripcion: "langostinos, champiñones, conchas negras y pescado", precio: "S/. 55.90", imagen: "/cebiche-mar-y-tierra.jpg" },
      { nombre: "Cebiche de Pescado 4 Estaciones", precio: "S/. 58.90", imagen: "/cebiche-de-pescado-4-estaciones.png" },
      { nombre: "Cebiche Mi Perú", precio: "S/. 58.90", imagen: "/cebiche-mi-peru.png" },
      { nombre: "Cebiche de Pescado a los 3 Ajíes", descripcion: "crema de ají amarillo, crema de rocoto y crema de apio", precio: "S/. 58.90", imagen: "/cebiche-de-pescado-a-los-3-ajies.png" }
    ]
  },
  {
    id: "tiraditos",
    nombre: "Tiraditos",
    items: [
      { nombre: "Tiradito 4 estaciones", precio: "S/. 58.00", imagen: "/tiradito-4-estaciones.png" },
      { nombre: "Tiradito 3 estaciones", precio: "S/. 58.00", imagen: "/tiradito-3-estaciones.png" },
      { nombre: "Tiradito 2 estaciones", precio: "S/. 45.00", imagen: "/tiradito-2-estaciones.png" },
      { nombre: "Tiradito en Crema de Rocoto", precio: "S/. 42.00", imagen: "/tiradito-en-crema-de-rocoto.png" },
      { nombre: "Tiradito en Crema de Ají Amarillo", precio: "S/. 42.00", imagen: "/tiradito-en-crema-de-aji-amarillo.png" },
      { nombre: "Tiradito al Natural", precio: "S/. 42.00", imagen: "/tiradito-al-natural.png" }
    ]
  },
  {
    id: "guarniciones",
    nombre: "Guarniciones",
    items: [
      { nombre: "Porción de Yucas Fritas", precio: "S/. 9.00", imagen: "/porcion-de-yucas-fritas.png" },
      { nombre: "Porción de Papas Fritas", precio: "S/. 9.00", imagen: "/porcion-de-papas-fritas.png" },
      { nombre: "Porción de Arroz", precio: "S/. 9.00", imagen: "/porcion-de-arroz.png" },
      { nombre: "Porción de Camote", precio: "S/. 9.00", imagen: "/porcion-de-camote.png" },
      { nombre: "Porción de Chifle", precio: "S/. 9.00", imagen: "/porcion-de-chifle.png" },
      { nombre: "Porción de Choclo", precio: "S/. 9.00", imagen: "/porcion-de-choclo.png" },
      { nombre: "Porción de Cancha", precio: "S/. 9.00", imagen: "/porcion-de-cancha.png" },
      { nombre: "Porción de Frijoles", precio: "S/. 9.00", imagen: "/porcion-de-frijoles.jpg" }
    ]
  },
  {
    id: "sopas-cremas",
    nombre: "Sopas y Cremas",
    items: [
      { nombre: "Sancochado de Res", precio: "S/. 29.90", imagen: "/sancochado-de-res.png" },
      { nombre: "Sopa Menestrón", precio: "S/. 29.90", imagen: "/sopa-menestron.jpg" },
      { nombre: "Sopa a la Minuta", precio: "S/. 21.90", imagen: "/sopa-a-la-minuta.jpg" },
      { nombre: "Sopa a la Criolla", precio: "S/. 21.90", imagen: "/sopa-a-la-criolla.jpg" },
      { nombre: "Sustancia de Carne", precio: "S/. 21.90", imagen: "/sustancia-de-carne.png" },
      { nombre: "Dieta de Pollo", precio: "S/. 21.90", imagen: "/dieta-de-pollo.png" },
      { nombre: "Crema de Pollo al Montecarlo", precio: "S/. 28.00", imagen: "/crema-de-pollo-al-montecarlo.png" }
    ]
  },
  {
    id: "sudados-parihuelas",
    nombre: "Sudados y Parihuelas",
    items: [
      { nombre: "Sudado de Tramboyo", descripcion: "600 gr. entero", precio: "S/. 55.00", imagen: "/sudado-de-tramboyo.png" },
      { nombre: "Sudado de Cabrilla", descripcion: "600 gr. entero", precio: "S/. 55.00", imagen: "/sudado-de-cabrilla.jpg" },
      { nombre: "Sudado de Chita", descripcion: "600 gr. entero", precio: "S/. 79.90", imagen: "/sudado-de-chita.jpg" },
      { nombre: "Sudado de Lenguado", descripcion: "600 gr. entero", precio: "S/. 79.90", imagen: "/sudado-de-lenguado.png" },
      { nombre: "Sudado de Pescado", descripcion: "filete", precio: "S/. 38.00", imagen: "/sudado-de-pescado.png" },
      { nombre: "Parihuela de Cabrilla", descripcion: "600 gr. entero; mix de mariscos, cangrejo popeye y cabrilla", precio: "S/. 75.90", imagen: "/parihuela-de-cabrilla.jpg" },
      { nombre: "Parihuela de Tramboyo", descripcion: "600 gr. entero; mix de mariscos, cangrejo popeye y tramboyo", precio: "S/. 75.90", imagen: "/parihuela-de-tramboyo.png" },
      { nombre: "Parihuela de Chita", descripcion: "600 gr. entero; mix de mariscos, cangrejo popeye y chita", precio: "S/. 95.90", imagen: "/parihuela-de-chita.jpg" },
      { nombre: "Parihuela de Lenguado", descripcion: "600 gr. entero; mix de mariscos, cangrejo popeye y lenguado", precio: "S/. 95.90", imagen: "/parihuela-de-lenguado.png" },
      { nombre: "Parihuela Mixta", descripcion: "mix de mariscos y filete de pescado, cangrejo popeye", precio: "S/. 75.90", imagen: "/parihuela-mixta.jpg" }
    ]
  },
  {
    id: "chupes-concentrados",
    nombre: "Chupes y Concentrados",
    items: [
      { nombre: "Chupe de Camarones", precio: "S/. 55.00", imagen: "/chupe-de-camarones.png" },
      { nombre: "Chupe de Mariscos", precio: "S/. 49.00", imagen: "/chupe-de-mariscos.jpg" },
      { nombre: "Chupe de Langostinos", precio: "S/. 49.00", imagen: "/chupe-de-langostinos.jpg" },
      { nombre: "Chupe de Pescado", precio: "S/. 38.00", imagen: "/chupe-de-pescado.png" },
      { nombre: "Chilcano de Pescado", precio: "S/. 20.90", imagen: "/chilcano-de-pescado.png" },
      { nombre: "Concentrado de Choros", precio: "S/. 20.90", imagen: "/concentrado-de-choros.png" }
    ]
  },
  {
    id: "jaleas-chicharrones",
    nombre: "Jaleas y Chicharrones",
    items: [
      { nombre: "Jalea de Pescado", precio: "S/. 42.00", imagen: "/jalea-de-pescado.png" },
      { nombre: "Jalea de Trucha", precio: "S/. 42.00", imagen: "/jalea-de-trucha.png" },
      { nombre: "Jalea Mixta", precio: "S/. 47.00", imagen: "/jalea-mixta.png" },
      { nombre: "Jalea de Trucha (Repetido)", descripcion: "El nombre aparece repetido en la carta original.", precio: "S/. 42.00", imagen: "/jalea-de-trucha-repetido.png" },
      { nombre: "Chicharrón de Trucha", precio: "S/. 42.00", imagen: "/chicharron-de-trucha.png" },
      { nombre: "Chicharrón de Pescado", precio: "S/. 42.00", imagen: "/chicharron-de-pescado.png" },
      { nombre: "Chicharrón de Calamar", precio: "S/. 48.00", imagen: "/chicharron-de-calamar.jpg" },
      { nombre: "Chicharrón de Langostinos", precio: "S/. 48.00", imagen: "/chicharron-de-langostinos.jpg" },
      { nombre: "Chicharrón Mixto", precio: "S/. 47.00", imagen: "/chicharron-mixto.png" },
      { nombre: "Chicharrón de Mariscos", precio: "S/. 48.00", imagen: "/chicharron-de-mariscos.png" }
    ]
  },
  {
    id: "arroces-picantes",
    nombre: "Arroces y Picantes",
    items: [
      { nombre: "Arroz con Mariscos", precio: "S/. 47.00", imagen: "/arroz-con-mariscos.png" },
      { nombre: "Arroz con Langostinos", precio: "S/. 47.00", imagen: "/arroz-con-langostinos.jpg" },
      { nombre: "Arroz con Camarones", precio: "S/. 55.00", imagen: "/arroz-con-camarones.png" },
      { nombre: "Arroz con Conchas Negras", precio: "S/. 55.00", imagen: "/arroz-con-conchas-negras.png" },
      { nombre: "Picante de Mariscos", precio: "S/. 42.00", imagen: "/picante-de-mariscos.png" },
      { nombre: "Chaufa de Pescado", precio: "S/. 36.00", imagen: "/chaufa-de-pescado.png" },
      { nombre: "Chaufa de Langostinos", precio: "S/. 47.00", imagen: "/chaufa-de-langostinos.png" },
      { nombre: "Chaufa de Mariscos", precio: "S/. 47.00", imagen: "/chaufa-de-mariscos.jpg" },
      { nombre: "Chaufa de Mariscos al Barquero", descripcion: "gratinado; langostinos, calamar, pulpo, caracol, camarón con garra, conchas de abanico, champiñones, espárragos, queso mozzarella y queso parmesano", precio: "S/. 59.90", imagen: "/chaufa-de-mariscos-al-barquero.png" }
    ]
  },
  {
    id: "pescado-frito-entero",
    nombre: "Pescado Frito Entero",
    items: [
      { nombre: "Chita Frita a lo Macho", descripcion: "600 gr.; mixtura de mariscos", precio: "S/. 95.90", imagen: "/chita-frita-a-lo-macho.png" },
      { nombre: "Lenguado en salsa de mariscos", descripcion: "600 gr.; mixtura de mariscos", precio: "S/. 95.90", imagen: "/lenguado-en-salsa-de-mariscos.png" },
      { nombre: "Lenguado al Ajo en Hojuelas", precio: "S/. 79.90", imagen: "/lenguado-al-ajo-en-hojuelas.png" },
      { nombre: "Chita Frita al Ajo en Hojuelas", descripcion: "600 gr.", precio: "S/. 79.90", imagen: "/chita-frita-al-ajo-en-hojuelas.jpg" },
      { nombre: "Chita Frita", descripcion: "600 gr.", precio: "S/. 79.90", imagen: "/chita-frita.png" },
      { nombre: "Lenguado Frito", descripcion: "600 gr.", precio: "S/. 79.90", imagen: "/lenguado-frito.png" },
      { nombre: "Cabrilla Frita", descripcion: "600 gr.", precio: "S/. 48.00", imagen: "/cabrilla-frita.png" },
      { nombre: "Tramboyo Frito", descripcion: "600 gr.", precio: "S/. 48.00", imagen: "/tramboyo-frito.png" },
      { nombre: "Trucha Frita c/yucas Fritas", precio: "S/. 38.00", imagen: "/trucha-frita-c-yucas-fritas.png" }
    ]
  },
  {
    id: "filetes-pescado-salsas",
    nombre: "Filetes de Pescado en Salsas",
    items: [
      { nombre: "Filete de Pescado en Salsa de Mariscos", precio: "S/. 55.00", imagen: "/filete-de-pescado-en-salsa-de-mariscos.png" },
      { nombre: "Filete de Pescado a lo Macho", precio: "S/. 55.00", imagen: "/filete-de-pescado-a-lo-macho.jpg" },
      { nombre: "Filete de Pescado en Salsa de Langostinos", precio: "S/. 55.00", imagen: "/filete-de-pescado-en-salsa-de-langostinos.png" },
      { nombre: "Filete de Pescado en Salsa de Champiñones", precio: "S/. 38.00", imagen: "/filete-de-pescado-en-salsa-de-champinones.png" },
      { nombre: "Filete de Pescado en Salsa de Espárragos", precio: "S/. 38.00", imagen: "/filete-de-pescado-en-salsa-de-esparragos.png" },
      { nombre: "Filete de Pescado a la Chorrillana", precio: "S/. 38.00", imagen: "/filete-de-pescado-a-la-chorrillana.png" },
      { nombre: "Filete de Pescado en Salsa de Tres Quesos", descripcion: "gratinado; filete de mero, salsa bechamel, queso andino, queso mozzarella, queso parmesano, aceitunas, pimiento morrones y papas torneadas al perejil", precio: "S/. 59.90", imagen: "/filete-de-pescado-en-salsa-de-tres-quesos.png" },
      { nombre: "Filete de Pescado al Barquero", descripcion: "gratinado; filete de mero, mixtura de mariscos, champiñones, jamón inglés, queso andino, queso mozzarella, queso parmesano, salsa bechamel y espárragos", precio: "S/. 59.90", imagen: "/filete-de-pescado-al-barquero.jpg" },
      { nombre: "Milanesa de Pescado", descripcion: "papas amarillas fritas, arroz y ensalada", precio: "S/. 39.00", imagen: "/milanesa-de-pescado.png" },
      { nombre: "Milanesa de Trucha", descripcion: "papas fritas, arroz y ensalada", precio: "S/. 39.00", imagen: "/milanesa-de-trucha.png" }
    ]
  },
  {
    id: "tortillas",
    nombre: "Tortillas",
    items: [
      { nombre: "Tortilla de Pollo", descripcion: "trozos de pollo, verduras y arroz", precio: "S/. 30.00", imagen: "/tortilla-de-pollo.png" },
      { nombre: "Tortilla de Champiñones con Pollo", descripcion: "champiñones, trozos de pollo, verduras y arroz", precio: "S/. 30.00", imagen: "/tortilla-de-champinones-con-pollo.png" },
      { nombre: "Tortilla al Barquero", descripcion: "gratinado; colas de langostinos, camarones, palmitos, champiñones, queso andino, queso parmesano y jamón inglés", precio: "S/. 39.00", imagen: "/tortilla-al-barquero.png" }
    ]
  },
  {
    id: "pastas",
    nombre: "Pastas",
    items: [
      { nombre: "Fetuccini Huancaína con Lomo Fino Salteado", precio: "S/. 49.00", imagen: "/fetuccini-huancaina-con-lomo-fino-salteado.jpg" },
      { nombre: "Fetuccini Huancaína con Lomo Salteado", descripcion: "bisteck", precio: "S/. 38.00", imagen: "/fetuccini-huancaina-con-lomo-salteado.png" },
      { nombre: "Fetuccini Huancaína con Bisteck Apanado", precio: "S/. 38.00", imagen: "/fetuccini-huancaina-con-bisteck-apanado.jpg" },
      { nombre: "Fetuccini Huancaína con Milanesa de Pollo", precio: "S/. 38.00", imagen: "/fetuccini-huancaina-con-milanesa-de-pollo.png" },
      { nombre: "Fetuccini Huancaína con Saltado de Pollo", precio: "S/. 37.00", imagen: "/fetuccini-huancaina-con-saltado-de-pollo.jpg" },
      { nombre: "Fetuccini en Salsa de Langostinos", precio: "S/. 48.00", imagen: "/fetuccini-en-salsa-de-langostinos.jpg" },
      { nombre: "Fetuccini al Alfredo", precio: "S/. 28.90", imagen: "/fetuccini-al-alfredo.jpg" },
      { nombre: "Fetuccini al Montecarlos", descripcion: "pollo, jamón y champiñones", precio: "S/. 36.00", imagen: "/fetuccini-al-montecarlos.png" },
      { nombre: "Fetuccini al Pesto con Bisteck Apanado", precio: "S/. 38.00", imagen: "/fetuccini-al-pesto-con-bisteck-apanado.jpg" },
      { nombre: "Fetuccini al Pesto con Milanesa de Pollo", precio: "S/. 38.00", imagen: "/fetuccini-al-pesto-con-milanesa-de-pollo.png" },
      { nombre: "Fetuccini al Pesto con Pechuga a la Plancha", precio: "S/. 35.00", imagen: "/fetuccini-al-pesto-con-pechuga-a-la-plancha.jpg" },
      { nombre: "Fetuccini al Barquero", descripcion: "pollo, jamón, champiñones, palmitos, espárragos, queso mozzarella y queso parmesano; gratinado", precio: "S/. 59.90", imagen: "/fetuccini-al-barquero.png" },
      { nombre: "Tallarines Verdes con Bisteck a la Plancha", precio: "S/. 32.00", imagen: "/tallarines-verdes-con-bisteck-a-la-plancha.png" },
      { nombre: "Tallarines Verdes con Milanesa de Pescado", precio: "S/. 38.00", imagen: "/tallarines-verdes-con-milanesa-de-pescado.png" },
      { nombre: "Tallarines Verdes con Churrasco a lo Pobre", descripcion: "tallarines al pesto, churrasco, huevo frito, plátano frito", precio: "S/. 38.90", imagen: "/tallarines-verdes-con-churrasco-a-lo-pobre.png" }
    ]
  },
  {
    id: "tacu-tacu",
    nombre: "Tacu Tacu con Pescados, Mariscos, Pollo y Carne",
    items: [
      { nombre: "Tacu Tacu con Filete de Pescado", precio: "S/. 38.00", imagen: "/tacu-tacu-con-filete-de-pescado.png" },
      { nombre: "Tacu tacu c/cabrilla frita", descripcion: "600 gr. + leche de tigre", precio: "S/. 58.90", imagen: "/tacu-tacu-c-cabrilla-frita.jpg" },
      { nombre: "Tacu Tacu en Salsa de Mariscos", precio: "S/. 55.00", imagen: "/tacu-tacu-en-salsa-de-mariscos.png" },
      { nombre: "Tacu Tacu en Salsa de Langostinos", precio: "S/. 55.00", imagen: "/tacu-tacu-en-salsa-de-langostinos.png" },
      { nombre: "Tacu Tacu con Lomo Fino al Jugo", precio: "S/. 48.00", imagen: "/tacu-tacu-con-lomo-fino-al-jugo.png" },
      { nombre: "Tacu Tacu con Bisteck / Churrasco / Pechuga", precio: "S/. 35.00", imagen: "/tacu-tacu-con-bisteck-churrasco-pechuga.png" },
      { nombre: "Tacu Tacu con Seco de Pato", precio: "S/. 45.00", imagen: "/tacu-tacu-con-seco-de-pato.png" },
      { nombre: "Tacu Tacu con Pechuga de Pollo Pobre", precio: "S/. 40.00", imagen: "/tacu-tacu-con-pechuga-de-pollo-pobre.png" },
      { nombre: "Tacu Tacu con Bisteck Apanado", precio: "S/. 38.00", imagen: "/tacu-tacu-con-bisteck-apanado.png" },
      { nombre: "Tacu tacu con Lomo Saltado", descripcion: "bisteck", precio: "S/. 38.00", imagen: "/tacu-tacu-con-lomo-saltado.png" },
      { nombre: "Tacu Tacu a lo Pobre", descripcion: "bisteck, huevo frito, plátano frito", precio: "S/. 40.00", imagen: "/tacu-tacu-a-lo-pobre.png" },
      { nombre: "Tacu Tacu al Barquero", descripcion: "gratinado; camarones con garra, langostinos jumbo, conchas de abanico, queso mozzarella, queso parmesano y champiñones", precio: "S/. 59.90", imagen: "/tacu-tacu-al-barquero.png" }
    ]
  },
  {
    id: "combinados-marinos",
    nombre: "Combinados Marinos",
    items: [
      { nombre: "Cebiche de Pescado + Chicharrón de Pescado", precio: "S/. 58.90", imagen: "/cebiche-de-pescado-chicharron-de-pescado.png" },
      { nombre: "Cebiche de Pescado + Arroz con Mariscos", precio: "S/. 58.90", imagen: "/cebiche-de-pescado-arroz-con-mariscos.png" },
      { nombre: "Cebiche de Pescado + Chicharrón Mixto", precio: "S/. 58.90", imagen: "/cebiche-de-pescado-chicharron-mixto.png" },
      { nombre: "Cebiche Mixto + Chicharrón Mixto", precio: "S/. 58.90", imagen: "/cebiche-mixto-chicharron-mixto.png" },
      { nombre: "Cebiche Mixto + Arroz con Mariscos", precio: "S/. 58.90", imagen: "/cebiche-mixto-arroz-con-mariscos.png" },
      { nombre: "Cebiche de Pescado + Chicharrón de Calamar", precio: "S/. 58.90", imagen: "/cebiche-de-pescado-chicharron-de-calamar.jpg" },
      { nombre: "Cebiche de Conchas Negras + Arroz con Mariscos", precio: "S/. 58.90", imagen: "/cebiche-de-conchas-negras-arroz-con-mariscos.jpg" }
    ]
  },
  {
    id: "trio-marino",
    nombre: "Trío Marino",
    items: [
      { nombre: "Trío Marino 1", descripcion: "Cebiche de Pescado + Arroz con Mariscos + Jalea de Pescado + Inca Kola 1.5 L", precio: "S/. 99.90", imagen: "/trio-marino-1.png" },
      { nombre: "Trío Marino 2", descripcion: "Cebiche de Pescado + Jalea Mixta + Chaufa de Pescado + Inca Kola 1.5 L", precio: "S/. 99.90", imagen: "/trio-marino-2.png" },
      { nombre: "Trío Marino 3", descripcion: "Cebiche de Mixto + Jalea de Pescado + Causa de Langostinos + Inca Kola 1.5 L", precio: "S/. 99.90", imagen: "/trio-marino-3.png" },
      { nombre: "Trío Marino 4", descripcion: "Cebiche de Pescado + Papa a la Huancaína + Arroz con Pato + Inca Kola 1.5 L", precio: "S/. 99.90", imagen: "/trio-marino-4.png" }
    ]
  },
  {
    id: "platos-fondo-carne",
    nombre: "Platos de Fondo con Carne",
    items: [
      { nombre: "Lomo Saltado", descripcion: "250 gr de lomo fino", precio: "S/. 48.00", imagen: "/lomo-saltado.png" },
      { nombre: "Lomo Saltado a lo Pobre", descripcion: "250 gr. de lomo fino, huevo frito y plátano frito", precio: "S/. 55.00", imagen: "/lomo-saltado-a-lo-pobre.png" },
      { nombre: "Costillar Dorado de Res a la Arequipeña", descripcion: "papas doradas y listones de queso", precio: "S/. 42.00", imagen: "/costillar-dorado-de-res-a-la-arequipena.png" },
      { nombre: "Bisteck a lo Pobre", descripcion: "bisteck de tapa, huevo frito, plátano frito, arroz y ensalada mixta", precio: "S/. 38.00", imagen: "/bisteck-a-lo-pobre.png" },
      { nombre: "Bisteck ó Churrasco a la Plancha", descripcion: "papas fritas, arroz y ensalada", precio: "S/. 35.00", imagen: "/bisteck-o-churrasco-a-la-plancha.png" },
      { nombre: "Churrasco a lo Pobre con Spaguetti al pesto", descripcion: "churrasco, plátano frito, huevo frito y spaguetti al pesto", precio: "S/. 39.00", imagen: "/churrasco-a-lo-pobre-con-spaguetti-al-pesto.png" },
      { nombre: "Bisteck Apanado a lo Pobre", descripcion: "papas fritas, huevo frito, plátano frito, arroz y ensalada", precio: "S/. 40.00", imagen: "/bisteck-apanado-a-lo-pobre.jpg" },
      { nombre: "Churrasco a lo Pobre", descripcion: "papas fritas, huevo frito, plátano frito y arroz", precio: "S/. 38.00", imagen: "/churrasco-a-lo-pobre.png" },
      { nombre: "Bisteck Apanado", descripcion: "papas fritas, arroz y ensalada", precio: "S/. 38.00", imagen: "/bisteck-apanado.png" },
      { nombre: "Chaufa de carne a lo pobre", descripcion: "trozos de carne, plátano frito y huevo frito", precio: "S/. 36.00", imagen: "/chaufa-de-carne-a-lo-pobre.png" },
      { nombre: "Lomo Saltado (Bisteck)", descripcion: "bisteck", precio: "S/. 35.00", imagen: "/lomo-saltado-bisteck.png" },
      { nombre: "Lomo Saltado Pobre (Bisteck)", descripcion: "bisteck", precio: "S/. 40.00", imagen: "/lomo-saltado-pobre-bisteck.png" },
      { nombre: "Tallarín Saltado de Carne", precio: "S/. 28.00", imagen: "/tallarin-saltado-de-carne.png" },
      { nombre: "Arroz Chaufa Carne", precio: "S/. 28.00", imagen: "/arroz-chaufa-carne.png" },
      { nombre: "Tallarines Verdes con Churrasco ó Bisteck a la Plancha", precio: "S/. 35.00", imagen: "/tallarines-verdes-con-churrasco-o-bisteck-a-la-plancha.png" },
      { nombre: "Tallarín Verde con Bisteck Apanado", precio: "S/. 38.00", imagen: "/tallarin-verde-con-bisteck-apanado.png" }
    ]
  },
  {
    id: "platos-fondo-ave",
    nombre: "Platos de Fondo con Ave",
    items: [
      { nombre: "Arroz con Pato y su papa a la Huancaína", precio: "S/. 48.00", imagen: "/arroz-con-pato-y-su-papa-a-la-huancaina.png" },
      { nombre: "Seco de Pato a la Norteña con Fréjoles", precio: "S/. 48.00", imagen: "/seco-de-pato-a-la-nortena-con-frejoles.png" },
      { nombre: "Saltado de Pollo", descripcion: "lomito de pollo", precio: "S/. 35.00", imagen: "/saltado-de-pollo.png" },
      { nombre: "Pechuga de Pollo", descripcion: "papas fritas, arroz y ensalada mixta con palta", precio: "S/. 35.00", imagen: "/pechuga-de-pollo.png" },
      { nombre: "Milanesa de Pollo", descripcion: "papas fritas y ensalada mixta con palta", precio: "S/. 40.00", imagen: "/milanesa-de-pollo.jpg" },
      { nombre: "Pechuga de Pollo a lo Pobre", descripcion: "papas fritas, huevo, plátano frito, arroz y ensalada", precio: "S/. 40.00", imagen: "/pechuga-de-pollo-a-lo-pobre.png" },
      { nombre: "Chicharrón de Pollo", descripcion: "papas fritas y ensalada mixta con palta", precio: "S/. 36.00", imagen: "/chicharron-de-pollo.png" },
      { nombre: "Chaufa de Pollo a lo pobre", descripcion: "trozos de pollo, plátano frito y huevo frito", precio: "S/. 36.00", imagen: "/chaufa-de-pollo-a-lo-pobre.png" },
      { nombre: "Tallarín Saltado de Pollo", descripcion: "lomito de pollo", precio: "S/. 28.00", imagen: "/tallarin-saltado-de-pollo.png" },
      { nombre: "Tallarín Verde con Pechuga de Pollo", precio: "S/. 35.00", imagen: "/tallarin-verde-con-pechuga-de-pollo.png" },
      { nombre: "Arroz Chaufa de Pollo", precio: "S/. 28.00", imagen: "/arroz-chaufa-de-pollo.png" },
      { nombre: "Suprema de Pollo al Barquero", descripcion: "gratinado; filete de pollo, jamón inglés, queso andino, salsa bechamel, queso mozzarella, queso parmesano, pimiento morrón, papas torneadas y flambeadas al perejil", precio: "S/. 48.00", imagen: "/suprema-de-pollo-al-barquero.png" },
      { nombre: "Milanesa de Pollo al Barquero", descripcion: "fideo cabello de ángel, pecanas, castañas, orégano, almendras, galleta molida, papas fritas, arroz y ensalada", precio: "S/. 45.00", imagen: "/milanesa-de-pollo-al-barquero.png" }
    ]
  },
  {
    id: "platos-internacionales",
    nombre: "Platos Internacionales",
    items: [
      { nombre: "Medallones de Lomo Fino en Salsa de Champiñones", precio: "S/. 59.90", imagen: "/medallones-de-lomo-fino-en-salsa-de-champinones.png" },
      { nombre: "Filet Mignon", descripcion: "lomo fino; medallones de lomo fino, salsa madera, champiñones, legumbres flambeadas y vino blanco", precio: "S/. 59.90", imagen: "/filet-mignon.png" },
      { nombre: "Medallones de Lomo a las 3 Pimientas", descripcion: "gratinado; lomo fino, 3 pimientas, salsa bechamel, queso mozzarella, queso parmesano, papas torneadas flambeadas al perejil", precio: "S/. 59.90", imagen: "/medallones-de-lomo-a-las-3-pimientas.png" },
      { nombre: "Medallones de Lomo Fino a los 4 Quesos", descripcion: "gratinado; queso andino, queso mozzarella, queso parmesano, queso Edam Laive, salsa bechamel, papas torneadas y flambeadas al perejil", precio: "S/. 59.90", imagen: "/medallones-de-lomo-fino-a-los-4-quesos.png" },
      { nombre: "Cordon Blue de Lomo Fino", descripcion: "gratinado; 350 gr. de bife de lomo fino, jamón inglés, queso parmesano, queso mozzarella, queso andino, papa torneada y flambeadas al perejil", precio: "S/. 59.90", imagen: "/cordon-blue-de-lomo-fino.png" },
      { nombre: "Rissoto de Champiñones con Lomo Saltado", descripcion: "gratinado; arroz a la española, crema de leche, champiñones, lomo fino, cebolla, tomate, ají amarillo, queso Edam Laive, queso mozzarella y queso parmesano", precio: "S/. 59.90", imagen: "/rissoto-de-champinones-con-lomo-saltado.png" },
      { nombre: "Arroz con Mariscos al Cardenal", descripcion: "gratinado; mix de mariscos, camarón con garra, conchas de abanico, almejas con caparazón, champiñones, queso mozzarella y queso parmesano", precio: "S/. 59.90", imagen: "/arroz-con-mariscos-al-cardenal.png" }
    ]
  },
  {
    id: "platos-tipicos-barquero",
    nombre: "Platos Típicos - Barquero",
    items: [
      { nombre: "Cuy Frito", descripcion: "entero; con papas doradas, choclo entero, sarsa criolla y su salsa de ocopa", precio: "S/. 75.00", imagen: "/cuy-frito.png" },
      { nombre: "Chicharrón de Trucha c/ Yucas Fritas", precio: "S/. 42.00", imagen: "/chicharron-de-trucha-c-yucas-fritas.png" },
      { nombre: "Arroz con pato y su Salsa Huancaina", precio: "S/. 48.00", imagen: "/arroz-con-pato-y-su-salsa-huancaina.png" },
      { nombre: "Seco de Pato con Frejoles", precio: "S/. 48.00", imagen: "/seco-de-pato-con-frejoles.png" },
      { nombre: "Costillar Dorado con papas doradas", precio: "S/. 45.00", imagen: "/costillar-dorado-con-papas-doradas.png" },
      { nombre: "Trucha Frita con Yucas Fritas y Arroz", precio: "S/. 37.00", imagen: "/trucha-frita-con-yucas-fritas-y-arroz.png" },
      { nombre: "Medio Cuy Frito", precio: "S/. 40.00", imagen: "/medio-cuy-frito.png" },
      { nombre: "Sancochado de Res (Sopa)", descripcion: "sopa", precio: "S/. 29.90", imagen: "/sancochado-de-res-sopa.png" },
      { nombre: "Menestrón (Sopa)", descripcion: "sopa", precio: "S/. 29.90", imagen: "/menestron-sopa.png" }
    ]
  },
  {
    id: "bebidas-frias",
    nombre: "Bebidas Frías",
    items: [
      { nombre: "Coca Cola, Inka Kola, Inka Kola Zero (1.5L)", descripcion: "1 1/2 descartables", precio: "S/. 16.90", imagen: "/coca-cola-inka-kola-inka-kola-zero-1-5l.png" },
      { nombre: "Coca Cola, Inka Kola, Inka Kola Zero (500ml)", descripcion: "500 ml", precio: "S/. 7.90", imagen: "/coca-cola-inka-kola-inka-kola-zero-500ml.png" },
      { nombre: "Sprite, Fanta", descripcion: "500 ml / 600 ml", precio: "S/. 7.90", imagen: "/sprite-fanta.png" },
      { nombre: "San Luis c/Gas o s/gas", precio: "S/. 6.50", imagen: "/san-luis-c-gas-o-s-gas.png" },
      { nombre: "San Mateo c/Gas o s/gas", precio: "S/. 6.50", imagen: "/san-mateo-c-gas-o-s-gas.png" }
    ]
  },
  {
    id: "refrescos-pura-fruta",
    nombre: "Refrescos de Pura Fruta",
    items: [
      { nombre: "Refresco 1 litro", descripcion: "sabores: chicha morada, aguaymanto, limonada, maracuyá, mandarina, tuna", precio: "S/. 19.90", imagen: "/refresco-1-litro.png" },
      { nombre: "Refresco 1 litro - Arándanos", descripcion: "pedirlo helada o sin helar", precio: "S/. 22.00", imagen: "/refresco-1-litro-arandanos.png" }
    ]
  },
  {
    id: "frozen-pura-fruta",
    nombre: "Frozen de Pura Fruta",
    items: [
      { nombre: "Frozen 2x", descripcion: "12 oz", precio: "S/. 19.90", imagen: "/frozen-2x.png" },
      { nombre: "Frozen 500 ml", descripcion: "sabores: tuna, arándanos, mango, aguaymanto, maracuyá, chicha, durazno, limón", precio: "S/. 14.90", imagen: "/frozen-500-ml.png" }
    ]
  },
  {
    id: "cervezas",
    nombre: "Cervezas",
    items: [
      { nombre: "Cerveza Blanca", descripcion: "Pilsen ó Cristal 620 ml", precio: "S/. 12.00", imagen: "/cerveza-blanca.png" },
      { nombre: "Cerveza Cusqueña", descripcion: "Malta, Dorada, Trigo, Red Lager 620 ml", precio: "S/. 14.00", imagen: "/cerveza-cusquena.png" },
      { nombre: "Corona Personal", descripcion: "355 ml", precio: "S/. 15.00", imagen: "/corona-personal.png" },
      { nombre: "Cervezas Personales", descripcion: "310 ml; Cusqueña, Malta, Dorada, Trigo, Red Lager", precio: "S/. 10.00", imagen: "/cervezas-personales.png" }
    ]
  },
  {
    id: "bebidas-calientes",
    nombre: "Bebidas Calientes",
    items: [
      { nombre: "Manzanilla", precio: "S/. 5.00", imagen: "/manzanilla.png" },
      { nombre: "Anís", precio: "S/. 5.00", imagen: "/anis.png" },
      { nombre: "Té", precio: "S/. 5.00", imagen: "/te.png" },
      { nombre: "Flor de Jamaica", precio: "S/. 5.00", imagen: "/flor-de-jamaica.png" },
      { nombre: "Frutos bosque", precio: "S/. 5.00", imagen: "/frutos-bosque.jpg" },
      { nombre: "Café pasado", precio: "S/. 5.00", imagen: "/cafe-pasado.png" }
    ]
  }
];
