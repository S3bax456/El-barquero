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
    id: "sopas-entradas",
    nombre: "Sopas y Entradas",
    items: [
      {
        nombre: "Sopa Menestron",
        descripcion: "Sopa tradicional y sustanciosa con carne, fideos y abundantes verduras frescas.",
        precio: "S/. 29.90",
        imagen: ""
      }
    ]
  },
  {
    id: "pescados-mariscos",
    nombre: "Pescados y Mariscos",
    items: [
      {
        nombre: "Lenguado frito x 600 + Leche de tigre",
        descripcion: "Exquisito lenguado de 600gr frito al punto dorado, acompañado con su clásica y refrescante leche de tigre.",
        precio: "S/. 80.90",
        imagen: ""
      },
      {
        nombre: "Corvina Frita X 600 + leche de tigre",
        descripcion: "Corvina seleccionada de 600gr frita a la perfección, servida con una deliciosa leche de tigre de cortesía.",
        precio: "S/. 69.90",
        imagen: ""
      },
      {
        nombre: "Cabrilla Frita x 800gr + leche tigre",
        descripcion: "Generosa cabrilla de 800gr frita crocante por fuera y jugosa por dentro, acompañada de una espectacular leche de tigre.",
        precio: "S/. 79.90",
        imagen: ""
      }
    ]
  },
  {
    id: "platos-fondo",
    nombre: "Platos de Fondo",
    items: [
      {
        nombre: "Arroz con Pato + Ceviche",
        descripcion: "Tradicional arroz con pato a la chiclayana aromatizado con cilantro, acompañado de un fresco y picante ceviche de la casa.",
        precio: "S/. 59.90",
        imagen: ""
      },
      {
        nombre: "Arroz con pato",
        descripcion: "Sabroso arroz norteño sazonado con cilantro y especias, coronado con una tierna presa de pato.",
        precio: "S/. 48.00",
        imagen: ""
      },
      {
        nombre: "Tallarines verdes a lo pobre",
        descripcion: "Pasta con salsa cremosa de albahaca y espinaca, servida con huevo frito, plátano frito y papas doradas.",
        precio: "S/. 39.90",
        imagen: ""
      },
      {
        nombre: "Tallarines verdes c/. Bisteck Apañado",
        descripcion: "Clásicos tallarines verdes cremosos acompañados de un jugoso bisteck cubierto con un empanizado crocante.",
        precio: "S/. 38.00",
        imagen: ""
      },
      {
        nombre: "Cuy Frito Entero",
        descripcion: "Cuy entero seleccionado, frito a la perfección hasta quedar crocante (estilo chactado), servido con guarniciones tradicionales.",
        precio: "S/. 75.00",
        imagen: ""
      },
      {
        nombre: "Milanesa de pollo c/. Papas fritas",
        descripcion: "Filete de pechuga de pollo empanizado y frito, crujiente y dorado, acompañado de papas fritas y ensalada.",
        precio: "S/. 35.00",
        imagen: ""
      },
      {
        nombre: "Chaufa a lo pobre",
        descripcion: "Arroz chaufa al wok salteado con carnes, huevo y cebollita china, servido al estilo a lo pobre con plátano y huevo frito.",
        precio: "S/. 36.00",
        imagen: ""
      }
    ]
  },
  {
    id: "refrescos-frozen",
    nombre: "Refrescos y Frozen",
    items: [
      {
        nombre: "Refrescos de pura fruta (Chicha Morada, Aguaymanto, Limonada, Maracuyá, Mandarina)",
        descripcion: "1 litro de refresco natural preparado con frutas selectas (Chicha Morada, Aguaymanto, Limonada, Maracuyá o Mandarina).",
        precio: "S/. 19.90",
        imagen: ""
      },
      {
        nombre: "Refrescos de pura fruta (Tuna, Arándanos)",
        descripcion: "1 litro de refresco natural exótico y refrescante (Tuna o Arándanos).",
        precio: "S/. 22.00",
        imagen: ""
      },
      {
        nombre: "Frozen de Maracuyá 500 ml",
        descripcion: "Bebida ultra refrescante licuada con hielo y pulpa concentrada de maracuyá.",
        precio: "S/. 14.90",
        imagen: ""
      },
      {
        nombre: "Frozen Pura Fruta 2x",
        descripcion: "Promoción 2x en deliciosos frozens frutados. Elige entre Maracuyá, Durazno, Tuna, Mango o Limón.",
        precio: "S/. 19.90",
        imagen: ""
      }
    ]
  },
  {
    id: "tragos-cocteles",
    nombre: "Tragos y Cócteles",
    items: [
      {
        nombre: "Happy Day 2x (Pisco Sour)",
        descripcion: "Promoción 2x de nuestro tradicional cóctel bandera peruano con pisco, limón, jarabe de goma y clara de huevo.",
        precio: "S/. 28.90",
        imagen: ""
      },
      {
        nombre: "Happy Day Cócteles 2x",
        descripcion: "Promoción 2x. Elige y combina: Pisco Sour, Piña Colada, Mojito Clásico, Algarrobina, Daiquiri de Durazno, Chilcano de Maracuyá o Corona Margarita.",
        precio: "S/. 28.90",
        imagen: ""
      }
    ]
  }
];
