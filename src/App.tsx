import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Plus, Minus, ChevronRight, X, Trash2, Utensils, Facebook, MapPin, Loader2, Gift, Star, Phone, Clock, Wine, Navigation, CreditCard, Smartphone, Coins, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { fetchSheetData, submitSheetData, SheetDish, SheetCategory, SHEET_ID } from './services/googleSheets';
import { DEFAULT_MENU_DATA } from './data/menuData';

// ==========================================
// 📋 CONFIGURACIÓN DE LA PLANTILLA DEL MENÚ
// ==========================================
const RESTAURANTE_NAME = "El Barquero Restaurant";
const RESTAURANTE_SLOGAN = "Sabor Clásico & Tradición Marina";
const RESTAURANTE_CONCEPT = "Restaurante peruano de carta amplia, con enfoque criollo-marino, platos de fondo, bar, vinos, bebidas y delivery.";

export const SEDES = {
  tacna: {
    nombre: "Jr. Tacna 885",
    direccion: "Jr. Tacna 885, Magdalena del Mar",
    whatsapp: "51993109737",
    whatsappDisplay: "993 109 737",
    mapsUrl: "https://maps.app.goo.gl/29NAHxRUxNXKeHgt9"
  },
  julio: {
    nombre: "Jr. 28 de Julio 608",
    direccion: "Jr. 28 de Julio 608, Magdalena del Mar",
    whatsapp: "51944253190",
    whatsappDisplay: "944 253 190",
    mapsUrl: ""
  }
};

const WHATSAPP_NUMBER = SEDES.tacna.whatsapp; // Teléfono fallback
const ATTENTION_HOURS = "Lunes a domingo de 8:00 am a 11:00 pm";
const DELIVERY_HOURS = "11:00 am a 10:00 pm";
const CORKAGE_FEE = "Derecho de Corcho: S/. 3.00 por persona";
const FACEBOOK_URL = "";
const MARQUEE_TEXT = "✨ ¡BIENVENIDOS A EL BARQUERO RESTAURANT! • PEDIDOS WHATSAPP: TACNA 993 109 737 / 28 DE JULIO 944 253 190 • DE 11:00 AM A 10:00 PM • ";
// ==========================================

interface Dish {
  nombre: string;
  descripcion?: string;
  imagen?: string;
  precio: string;
}

interface Category {
  id: string;
  nombre: string;
  items: Dish[];
}

interface CartItem {
  nombre: string;
  precio: string;
  cantidad: number;
}

export default function App() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // States for Birthday Form
  const [showBirthdayForm, setShowBirthdayForm] = useState(false);
  const [isSubmittingBirthday, setIsSubmittingBirthday] = useState(false);
  const [birthdaySuccess, setBirthdaySuccess] = useState(false);
  const [birthdayData, setBirthdayData] = useState({
    nombre: '',
    telefono: '',
    fechaNacimiento: '',
    distrito: '',
    correo: ''
  });

  // States for Review Form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [reviewData, setReviewData] = useState({
    estrellasMozo: 0,
    estrellasComida: 0,
    comentario: ''
  });

  // States for Checkout Form
  const [showCheckout, setShowCheckout] = useState(false);
  const [loadingGPS, setLoadingGPS] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState<boolean | null>(null);
  const [copiedYape, setCopiedYape] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    tipoEntrega: 'delivery', // 'delivery' | 'pickup'
    sede: 'tacna' as 'tacna' | 'julio',
    nombre: '',
    telefono: '',
    // Delivery fields:
    direccion: '',
    distrito: '',
    referencia: '',
    latitud: null as number | null,
    longitud: null as number | null,
    // Pickup fields:
    horaRetiro: '',
    // Payment fields:
    medioPago: 'yape', // 'yape' | 'tarjeta' | 'efectivo'
    efectivoVuelto: '', // if paying with cash
    // Extra notes:
    notas: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!SHEET_ID) {
          setCategories(DEFAULT_MENU_DATA);
          if (DEFAULT_MENU_DATA.length > 0) {
            setActiveCategory(DEFAULT_MENU_DATA[0].id);
          }
          return;
        }

        const [cats, dishes] = await Promise.all([
          fetchSheetData<SheetCategory>('Categorías'),
          fetchSheetData<SheetDish>('Platos')
        ]);

        if (cats.length === 0 && dishes.length === 0) {
          setCategories(DEFAULT_MENU_DATA);
          if (DEFAULT_MENU_DATA.length > 0) {
            setActiveCategory(DEFAULT_MENU_DATA[0].id);
          }
          return;
        }

        const formattedCategories: Category[] = cats.map(c => ({
          id: c.nombre.toLowerCase().replace(/\s+/g, '-'),
          nombre: c.nombre,
          items: dishes
            .filter(d => d.categoría === c.nombre)
            .map(d => ({
              nombre: d['nombre del plato'],
              descripcion: d.descripción,
              precio: d.precio,
              imagen: d['URL de imagen'] || null
            }))
        }));

        setCategories(formattedCategories);
        if (formattedCategories.length > 0) {
          setActiveCategory(formattedCategories[0].id);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setCategories(DEFAULT_MENU_DATA);
        if (DEFAULT_MENU_DATA.length > 0) {
          setActiveCategory(DEFAULT_MENU_DATA[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart]);

  const addToCart = (dish: Dish) => {
    setCart(prev => {
      const existing = prev.find(i => i.nombre === dish.nombre && i.precio === dish.precio);
      if (existing) {
        return prev.map(i =>
          (i.nombre === dish.nombre && i.precio === dish.precio)
            ? { ...i, cantidad: i.cantidad + 1 }
            : i
        );
      }
      return [...prev, { nombre: dish.nombre, precio: dish.precio, cantidad: 1 }];
    });
  };

  const updateQuantity = (nombre: string, precio: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => {
          if (i.nombre === nombre && i.precio === precio) {
            const newQty = i.cantidad + delta;
            return newQty > 0 ? { ...i, cantidad: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const cleanPrice = item.precio.replace(/^[^\d]*/, '');
      const num = parseFloat(cleanPrice) || 0;
      return acc + num * item.cantidad;
    }, 0);
  };

  const sendToWhatsApp = () => {
    const total = calculateTotal();
    const selectedSede = SEDES[checkoutData.sede];
    let message = `*Hola ${RESTAURANTE_NAME}, deseo realizar un pedido:*\n\n`;
    
    // Delivery or Pickup header
    if (checkoutData.tipoEntrega === 'delivery') {
      message += `*🛵 DETALLES DE ENTREGA (DELIVERY)*\n`;
      message += `• *Sede Despachadora:* ${selectedSede.nombre}\n`;
      message += `• *Nombre:* ${checkoutData.nombre}\n`;
      message += `• *Teléfono:* ${checkoutData.telefono}\n`;
      message += `• *Dirección:* ${checkoutData.direccion}\n`;
      message += `• *Distrito:* ${checkoutData.distrito}\n`;
      message += `• *Referencia:* ${checkoutData.referencia || 'No indicada'}\n`;
      if (checkoutData.latitud && checkoutData.longitud) {
        message += `• *📍 Ubicación GPS:* https://www.google.com/maps?q=${checkoutData.latitud},${checkoutData.longitud}\n`;
      } else {
        message += `• *📍 Ubicación GPS:* No compartida\n`;
      }
    } else {
      message += `*🏪 DETALLES DE RECOJO (RETIRO EN LOCAL)*\n`;
      message += `• *Sede de Recojo:* ${selectedSede.nombre} (${selectedSede.direccion})\n`;
      message += `• *Nombre:* ${checkoutData.nombre}\n`;
      message += `• *Teléfono:* ${checkoutData.telefono}\n`;
      message += `• *Hora aproximada:* ${checkoutData.horaRetiro || 'No indicada'}\n`;
    }
    
    message += `\n*🛍️ DETALLE DE PRODUCTOS:*\n`;
    cart.forEach(item => {
      message += `• ${item.cantidad} x ${item.nombre} (${item.precio})\n`;
    });
    
    message += `\n*💳 MEDIO DE PAGO:*\n`;
    if (checkoutData.medioPago === 'yape') {
      message += `• Yape / Plin 📱\n`;
    } else if (checkoutData.medioPago === 'tarjeta') {
      message += `• Tarjeta de Crédito/Débito (Llevar POS) 💳\n`;
    } else {
      const vueltoStr = checkoutData.efectivoVuelto.trim();
      if (vueltoStr) {
        const pagaraCon = parseFloat(vueltoStr) || 0;
        const vuelto = pagaraCon - total;
        message += `• Efectivo (Paga con: S/.${pagaraCon.toFixed(2)}${vuelto > 0 ? ` | Vuelto: S/.${vuelto.toFixed(2)}` : ''}) 💵\n`;
      } else {
        message += `• Efectivo (Monto exacto) 💵\n`;
      }
    }
    
    if (checkoutData.notas.trim()) {
      message += `\n*📝 NOTAS:* ${checkoutData.notas}\n`;
    }
    
    message += `\n*💰 TOTAL A PAGAR: S/.${total.toFixed(2)}*`;
    
    const url = `https://wa.me/${selectedSede.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      alert("La geolocalización no es compatible con este navegador.");
      return;
    }
    setLoadingGPS(true);
    setGpsSuccess(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCheckoutData(prev => ({
          ...prev,
          latitud: position.coords.latitude,
          longitud: position.coords.longitude
        }));
        setLoadingGPS(false);
        setGpsSuccess(true);
      },
      (error) => {
        console.error("Error al obtener geolocalización:", error);
        setLoadingGPS(false);
        setGpsSuccess(false);
        alert("No se pudo obtener la ubicación. Por favor, asegúrate de activar el GPS y dar permisos al navegador.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleCopyYape = () => {
    const selectedSede = SEDES[checkoutData.sede];
    const cleanNumber = selectedSede.whatsapp.startsWith("51") ? selectedSede.whatsapp.slice(2) : selectedSede.whatsapp;
    navigator.clipboard.writeText(cleanNumber);
    setCopiedYape(true);
    setTimeout(() => setCopiedYape(false), 2000);
  };

  const scrollToCategory = (catId: string) => {
    setActiveCategory(catId);
    const el = document.getElementById(`cat-${catId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleBirthdaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBirthday(true);
    const success = await submitSheetData('Cumpleaños', {
      timestamp: new Date().toLocaleString('es-PE'),
      nombre: birthdayData.nombre,
      telefono: birthdayData.telefono,
      fechaNacimiento: birthdayData.fechaNacimiento,
      distrito: birthdayData.distrito,
      correo: birthdayData.correo || 'No indicado'
    });
    
    setIsSubmittingBirthday(false);
    if (success) {
      setBirthdaySuccess(true);
      setTimeout(() => {
        setShowBirthdayForm(false);
        setBirthdaySuccess(false);
        setBirthdayData({ nombre: '', telefono: '', fechaNacimiento: '', distrito: '', correo: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo.");
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewData.estrellasMozo === 0 || reviewData.estrellasComida === 0) {
      alert("Por favor califica ambas opciones con estrellas.");
      return;
    }

    setIsSubmittingReview(true);
    const success = await submitSheetData('Reseñas', {
      timestamp: new Date().toLocaleString('es-PE'),
      estrellasMozo: reviewData.estrellasMozo,
      estrellasComida: reviewData.estrellasComida,
      comentario: reviewData.comentario || 'Sin comentarios'
    });
    
    setIsSubmittingReview(false);
    if (success) {
      setReviewSuccess(true);
      setTimeout(() => {
        setShowReviewForm(false);
        setReviewSuccess(false);
        setReviewData({ estrellasMozo: 0, estrellasComida: 0, comentario: '' });
      }, 3000);
    } else {
      alert("Hubo un error al enviar tu reseña. Por favor, inténtalo de nuevo.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0f12]">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="font-slogan text-primary font-bold tracking-widest uppercase text-xs">Cargando delicias de El Barquero...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-[#0d0f12] min-h-screen relative shadow-2xl overflow-hidden flex flex-col font-sans border-x border-gray-900/40">
      
      {/* STICKY HEADER */}
      <header className="sticky top-0 bg-[#0d0f12]/95 backdrop-blur-md z-50 px-5 py-4 flex justify-between items-center border-b border-gray-950">
        <div className="flex items-center">
          <img src="/header.png" alt="El Barquero Logo" className="h-16 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-2">
          {WHATSAPP_NUMBER && (
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors"
              title="Enviar WhatsApp"
            >
              <img src="/wsp logo.png" alt="WhatsApp" className="w-[18px] h-[18px] object-contain" />
            </motion.a>
          )}
          <motion.div
            onClick={() => {
              const el = document.getElementById('sedes-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-primary/20 transition-colors"
            title="Ver ubicaciones y teléfonos de nuestras sedes"
          >
            <MapPin size={18} />
          </motion.div>
          <motion.div
            onClick={() => cartCount > 0 && setShowSummary(true)}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center relative cursor-pointer hover:bg-primary/20 transition-colors"
          >
            <ShoppingBag size={18} className="text-primary" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-4.5 bg-primary text-black rounded-full text-[9px] font-bold flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="w-full bg-[#050608] py-2 overflow-hidden flex items-center border-b border-gray-950">
        <div className="animate-marquee flex gap-6 text-[#38bdf8] font-slogan font-bold text-[10px] tracking-widest uppercase whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i}>{MARQUEE_TEXT}</span>
          ))}
        </div>
      </div>

      {/* BANNER */}
      <div className="px-5 pt-4 pb-1">
        <div className="relative w-full rounded-3xl overflow-hidden shadow-xl aspect-[1.6/1]">
          <img src="/banner.jpg" alt="El Barquero Banner" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* RESTAURANT INFO CARD */}
      <div className="px-5 pt-4">
        <div className="bg-[#14161e] border border-gray-900/60 rounded-3xl p-5 shadow-lg flex flex-col gap-3 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div>
            <h1 className="font-title text-[20px] text-primary font-bold leading-tight">{RESTAURANTE_NAME}</h1>
            <p className="text-[11px] text-gray-400 mt-1.5 leading-relaxed">{RESTAURANTE_CONCEPT}</p>
          </div>
          
          <div className="h-px bg-gray-800/40 my-1"></div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[10px]">
            <div className="flex items-start gap-2">
              <Clock size={13} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-300">Atención General</p>
                <p className="text-gray-400 mt-0.5">{ATTENTION_HOURS}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={13} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-300">Horario Delivery</p>
                <p className="text-gray-400 mt-0.5">{DELIVERY_HOURS}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 col-span-2">
              <Wine size={13} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-300">Derecho de Corcho</p>
                <p className="text-gray-400 mt-0.5">{CORKAGE_FEE}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE NUESTRAS SEDES */}
      <div id="sedes-section" className="px-5 pt-4">
        <div className="bg-[#14161e] border border-gray-900/60 rounded-3xl p-5 shadow-lg flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div>
            <h2 className="font-title text-[18px] text-primary font-bold leading-tight flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              Nuestras Sedes
            </h2>
            <p className="text-[10px] text-gray-400 mt-1 leading-relaxed">Visítanos o haz tu pedido a la sede más cercana</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Sede Tacna */}
            <div className="bg-[#1d202b] border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between gap-3">
              <div>
                <h3 className="font-title text-[15px] font-bold text-white leading-tight">
                  Jr. Tacna 885
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">Magdalena del Mar</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <a 
                  href={SEDES.tacna.mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-[10px] font-bold transition-colors cursor-pointer"
                >
                  <Navigation size={12} className="rotate-45" />
                  Ver Mapa
                </a>
                <a 
                  href={`https://wa.me/${SEDES.tacna.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl text-[10px] font-bold transition-colors cursor-pointer"
                >
                  <img src="/wsp logo.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
                  Wsp: {SEDES.tacna.whatsappDisplay}
                </a>
              </div>
            </div>

            {/* Sede 28 de Julio */}
            <div className="bg-[#1d202b] border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between gap-3">
              <div>
                <h3 className="font-title text-[15px] font-bold text-white leading-tight">
                  Jr. 28 de Julio 608
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">Magdalena del Mar</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/50 text-gray-500 rounded-xl text-[10px] font-bold select-none">
                  <Navigation size={12} className="rotate-45" />
                  Sin Mapa
                </span>
                <a 
                  href={`https://wa.me/${SEDES.julio.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-xl text-[10px] font-bold transition-colors cursor-pointer"
                >
                  <img src="/wsp logo.png" alt="WhatsApp" className="w-3.5 h-3.5 object-contain" />
                  Wsp: {SEDES.julio.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BIRTHDAY TICKET REGISTER BUTTON */}
      <div className="px-5 pt-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            boxShadow: ["0px 0px 0px 0px rgba(56,189,248,0.4)", "0px 0px 20px 8px rgba(56,189,248,0)", "0px 0px 0px 0px rgba(56,189,248,0)"] 
          }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          onClick={() => setShowBirthdayForm(true)}
          className="w-full bg-gradient-to-r from-sky-600 via-primary to-[#0284c7] text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-[10px] sm:text-[11px] uppercase tracking-wide border border-sky-400 relative overflow-hidden group text-center"
        >
          <div className="absolute inset-0 shimmer opacity-30 mix-blend-overlay"></div>
          <Gift size={18} className="animate-bounce shrink-0" />
          <span>🎁 ¡Registra tu cumpleaños con nosotros! 🍰 <span className="text-sky-100 font-black underline">Regístrate aquí</span> y llévate un cóctel de cortesía de El Barquero. 🍹⚓</span>
        </motion.button>
      </div>

      {/* CATEGORIES HORIZONTAL NAV */}
      <div className="px-5 py-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[11px] font-category font-semibold whitespace-nowrap transition-all duration-200 border uppercase tracking-wider
                ${activeCategory === cat.id
                  ? 'bg-primary text-black border-primary shadow-lg shadow-primary/20'
                  : 'bg-[#14161e] text-gray-300 border-gray-800 hover:border-primary/40 hover:text-primary'
                }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="flex-1 overflow-y-auto pb-32 px-5">
        {categories.map(cat => (
          <section key={cat.id} id={`cat-${cat.id}`} className="mb-10 scroll-mt-28">
            <div className="mb-5 pt-2">
              <div className="flex items-center gap-2 mb-1">
                <Utensils className="text-primary wave-icon" size={20} />
                <h3 className="font-category font-semibold text-primary text-[20px] leading-none tracking-wide category-underline uppercase">
                  {cat.nombre}
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {cat.items.map((dish, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-[#14161e] rounded-[1.5rem] overflow-hidden flex flex-col shadow-lg border border-gray-800/80 hover:border-primary/30 transition-all duration-200 group"
                >
                  <div className={`bg-[#1a1d26] aspect-square flex items-center justify-center relative overflow-hidden border-b border-gray-900/60 ${dish.imagen ? '' : 'p-4'}`}>
                    {dish.imagen ? (
                      <img 
                        src={dish.imagen} 
                        alt={dish.nombre} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center opacity-40">
                        <svg viewBox="0 0 100 100" className="w-12 h-12 stroke-primary fill-none" strokeWidth="2.5">
                          <circle cx="50" cy="50" r="25" />
                          <circle cx="50" cy="50" r="8" />
                          <line x1="50" y1="10" x2="50" y2="90" />
                          <line x1="10" y1="50" x2="90" y2="50" />
                          <line x1="22" y1="22" x2="78" y2="78" />
                          <line x1="22" y1="78" x2="78" y2="22" />
                          <circle cx="50" cy="8" r="3" className="fill-primary stroke-none" />
                          <circle cx="50" cy="92" r="3" className="fill-primary stroke-none" />
                          <circle cx="8" cy="50" r="3" className="fill-primary stroke-none" />
                          <circle cx="92" cy="50" r="3" className="fill-primary stroke-none" />
                          <circle cx="20" cy="20" r="3" className="fill-primary stroke-none" />
                          <circle cx="80" cy="80" r="3" className="fill-primary stroke-none" />
                          <circle cx="20" cy="80" r="3" className="fill-primary stroke-none" />
                          <circle cx="80" cy="20" r="3" className="fill-primary stroke-none" />
                        </svg>
                        <span className="font-dish text-[9px] text-gray-500 mt-2 uppercase tracking-widest">El Barquero</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-dish font-bold text-white text-[13px] leading-snug mb-1">
                      {dish.nombre}
                    </h4>
                    {dish.descripcion && (
                      <p className="text-[10px] text-gray-400 leading-tight mb-2 line-clamp-3">
                        {dish.descripcion}
                      </p>
                    )}
                    <div className="flex-1"></div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-800/60">
                      <span className="font-dish font-bold text-primary text-[15px] whitespace-nowrap">
                        {dish.precio}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        onClick={() => addToCart(dish)}
                        className="w-8 h-8 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center text-primary transition-colors duration-200 shrink-0"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* FEEDBACK SECTION */}
        <section className="mt-8 mb-4 border border-gray-900 bg-[#14161e] rounded-3xl p-5 text-center shadow-md">
          <h3 className="font-title text-primary text-[22px] leading-tight mb-2">¿Cómo estuvo todo?</h3>
          <p className="text-[11px] text-gray-400 mb-4 px-4">Ayúdanos a mejorar calificando tu experiencia con nosotros</p>
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(true)}
            className="bg-primary text-black px-6 py-3 rounded-2xl font-bold text-sm shadow-md shadow-primary/20 flex items-center justify-center gap-2 mx-auto w-full"
          >
            <Star size={18} className="fill-black" />
            Calificar Experiencia
          </motion.button>
        </section>

        {/* FOOTER */}
        <footer className="mt-8 pt-8 pb-10 border-t border-gray-900 flex flex-col items-center justify-center text-center">
          <p className="font-title text-2xl text-primary mb-2">El Barquero</p>
          <p className="text-[11px] text-gray-400 font-medium">© 2026 Todos los derechos reservados.</p>
        </footer>

        {/* POWERED BY TYMA */}
        <div className="bg-[#0d0f12] py-6 flex flex-col items-center justify-center">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase mb-1 text-gray-500">Digital Menu Experience</p>
          <motion.a 
            href="https://tymasolutions.lat/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-bold text-xs tracking-tight group cursor-pointer"
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-gray-400 group-hover:text-primary transition-colors duration-200">Hecho por Tyma</span>
            <span className="text-primary group-hover:text-white transition-colors duration-200">Solutions</span>
          </motion.a>
        </div>
      </main>

      {/* FLOAT ORDER SUMARY BAR */}
      <AnimatePresence>
        {cartCount > 0 && !showSummary && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 w-full max-w-md p-5 z-40"
          >
            <div className="glass rounded-[2rem] p-4 flex items-center justify-between border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="shimmer absolute inset-0 opacity-20"></div>
                  <ShoppingBag size={20} className="text-black" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Tu Pedido</p>
                  <p className="font-bold text-white text-lg">{cartCount} Platos</p>
                </div>
              </div>
              <button
                onClick={() => setShowSummary(true)}
                className="bg-primary text-black px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-primary/20 font-bold text-sm"
              >
                Ver Pedido
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ORDER SUMMARY OVERLAY */}
      <AnimatePresence>
        {showSummary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-end justify-center p-4 lg:p-0"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-[#14161e] w-full max-w-md rounded-t-[3rem] p-6 max-h-[85vh] overflow-y-auto border-t border-gray-800"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-title text-2xl text-primary">Mi Pedido</h2>
                <button
                  onClick={() => setShowSummary(false)}
                  className="w-10 h-10 bg-[#1d202b] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 mb-8">
                {cart.map(item => (
                  <div
                    key={`${item.nombre}-${item.precio}`}
                    className="flex items-center gap-4 bg-[#1d202b] p-4 rounded-2xl border border-gray-800/40"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-dish font-semibold text-white text-sm truncate">{item.nombre}</h4>
                      <p className="font-dish text-xs text-primary font-bold">{item.precio}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-[#14161e] px-3 py-1.5 rounded-xl border border-gray-800">
                      <button onClick={() => updateQuantity(item.nombre, item.precio, -1)} className="text-gray-400 hover:text-white">
                        <Minus size={16} />
                      </button>
                      <span className="font-dish font-bold text-sm w-4 text-center text-white">{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.nombre, item.precio, 1)} className="text-primary">
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.nombre, item.precio, -item.cantidad)}
                      className="text-red-400 ml-1 hover:text-red-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="border-t border-dashed border-gray-800 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-dish text-xl font-bold text-white">Total a pagar</h3>
                  <h3 className="font-dish text-xl font-bold text-primary">S/.{calculateTotal().toFixed(2)}</h3>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowSummary(false);
                  setShowCheckout(true);
                }}
                className="w-full bg-[#25D366] text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-900/30 hover:scale-[1.02] transition-transform font-bold cursor-pointer"
              >
                Enviar Pedido a WhatsApp
                <ChevronRight size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FORMULARIO DE CHECKOUT / DETALLES DE ENVÍO */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#14161e] w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto border border-gray-800"
            >
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#1d202b] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors z-10 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-sky-950/40 rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag size={24} className="text-primary" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none mb-2">Completar Pedido</h2>
                <p className="text-xs text-gray-400">Ingresa los detalles para el envío de tu pedido.</p>
              </div>

              {/* Delivery / Pickup Tab Selector */}
              <div className="flex bg-[#1d202b] p-1.5 rounded-2xl border border-gray-800/85 mb-4">
                <button
                  type="button"
                  onClick={() => setCheckoutData(prev => ({ ...prev, tipoEntrega: 'delivery' }))}
                  className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all duration-200 uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer
                    ${checkoutData.tipoEntrega === 'delivery'
                      ? 'bg-primary text-black'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <MapPin size={14} />
                  Delivery
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutData(prev => ({ ...prev, tipoEntrega: 'pickup' }))}
                  className={`flex-1 py-2 text-center text-xs font-bold rounded-xl transition-all duration-200 uppercase tracking-wide flex items-center justify-center gap-1.5 cursor-pointer
                    ${checkoutData.tipoEntrega === 'pickup'
                      ? 'bg-primary text-black'
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  <Clock size={14} />
                  Retiro
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendToWhatsApp();
                }}
                className="space-y-3"
              >
                {/* Sede Selector */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block mb-1.5">Seleccionar Sede *</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutData(prev => ({ ...prev, sede: 'tacna' }))}
                      className={`py-2.5 rounded-xl text-center text-xs font-semibold border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer
                        ${checkoutData.sede === 'tacna'
                          ? 'bg-primary/20 text-primary border-primary'
                          : 'bg-[#1d202b] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                    >
                      <span className="font-bold text-white text-[11px]">Jr. Tacna 885</span>
                      <span className="text-[9px] opacity-80">Magdalena del Mar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutData(prev => ({ ...prev, sede: 'julio' }))}
                      className={`py-2.5 rounded-xl text-center text-xs font-semibold border transition-all duration-200 flex flex-col items-center justify-center gap-0.5 cursor-pointer
                        ${checkoutData.sede === 'julio'
                          ? 'bg-primary/20 text-primary border-primary'
                          : 'bg-[#1d202b] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                    >
                      <span className="font-bold text-white text-[11px]">Jr. 28 de Julio 608</span>
                      <span className="text-[9px] opacity-80">Magdalena del Mar</span>
                    </button>
                  </div>
                </div>

                {/* Personal Info */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nombre Completo *</label>
                  <input
                    required
                    type="text"
                    value={checkoutData.nombre}
                    onChange={e => setCheckoutData(prev => ({ ...prev, nombre: e.target.value }))}
                    className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Teléfono / WhatsApp *</label>
                  <input
                    required
                    type="tel"
                    minLength={9}
                    maxLength={9}
                    pattern="[0-9]*"
                    value={checkoutData.telefono}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                      setCheckoutData(prev => ({ ...prev, telefono: val }));
                    }}
                    className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="Ej. 987654321"
                  />
                </div>

                {/* Delivery Fields */}
                {checkoutData.tipoEntrega === 'delivery' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Distrito *</label>
                        <input
                          required
                          type="text"
                          value={checkoutData.distrito}
                          onChange={e => setCheckoutData(prev => ({ ...prev, distrito: e.target.value }))}
                          className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Ej. San Miguel"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Dirección *</label>
                        <input
                          required
                          type="text"
                          value={checkoutData.direccion}
                          onChange={e => setCheckoutData(prev => ({ ...prev, direccion: e.target.value }))}
                          className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Ej. Av. Marina 123"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Referencia</label>
                      <input
                        type="text"
                        value={checkoutData.referencia}
                        onChange={e => setCheckoutData(prev => ({ ...prev, referencia: e.target.value }))}
                        className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                        placeholder="Ej. Frente al parque principal"
                      />
                    </div>

                    {/* Gegeolocation GPS button */}
                    <div className="pt-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block mb-1">
                        Ubicación GPS *
                      </label>
                      <button
                        type="button"
                        onClick={getGeolocation}
                        className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-2 border cursor-pointer
                          ${gpsSuccess === true
                            ? 'bg-green-500/10 text-green-400 border-green-500/30'
                            : gpsSuccess === false
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                          }`}
                      >
                        {loadingGPS ? (
                          <>
                            <Loader2 size={15} className="animate-spin text-primary" />
                            <span>Obteniendo ubicación...</span>
                          </>
                        ) : gpsSuccess === true ? (
                          <>
                            <Check size={15} className="text-green-400" />
                            <span>Ubicación GPS Guardada ✓</span>
                          </>
                        ) : (
                          <>
                            <Navigation size={15} className="rotate-45" />
                            <span>📍 Obtener Mi Ubicación Actual</span>
                          </>
                        )}
                      </button>
                      <p className="text-[9px] text-gray-500 mt-1 ml-1 leading-normal">
                        Para asegurar que el motorizado llegue más rápido y sin problemas.
                      </p>
                    </div>
                  </>
                )}

                {/* Pickup Fields */}
                {checkoutData.tipoEntrega === 'pickup' && (
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Hora aproximada de Retiro *</label>
                    <input
                      required
                      type="time"
                      value={checkoutData.horaRetiro}
                      onChange={e => setCheckoutData(prev => ({ ...prev, horaRetiro: e.target.value }))}
                      className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors text-gray-300"
                    />
                  </div>
                )}

                {/* Payment Method Section */}
                <div className="pt-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1 block mb-1.5">Método de Pago *</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutData(prev => ({ ...prev, medioPago: 'yape' }))}
                      className={`py-2.5 rounded-xl text-center text-xs font-semibold border transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer
                        ${checkoutData.medioPago === 'yape'
                          ? 'bg-primary/20 text-primary border-primary'
                          : 'bg-[#1d202b] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                    >
                      <Smartphone size={16} />
                      <span>Yape / Plin</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutData(prev => ({ ...prev, medioPago: 'tarjeta' }))}
                      className={`py-2.5 rounded-xl text-center text-xs font-semibold border transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer
                        ${checkoutData.medioPago === 'tarjeta'
                          ? 'bg-primary/20 text-primary border-primary'
                          : 'bg-[#1d202b] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                    >
                      <CreditCard size={16} />
                      <span>Tarjeta</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutData(prev => ({ ...prev, medioPago: 'efectivo' }))}
                      className={`py-2.5 rounded-xl text-center text-xs font-semibold border transition-all duration-200 flex flex-col items-center justify-center gap-1 cursor-pointer
                        ${checkoutData.medioPago === 'efectivo'
                          ? 'bg-primary/20 text-primary border-primary'
                          : 'bg-[#1d202b] text-gray-400 border-gray-800 hover:text-white'
                        }`}
                    >
                      <Coins size={16} />
                      <span>Efectivo</span>
                    </button>
                  </div>
                </div>

                {/* Conditional Cash Change Question */}
                {checkoutData.medioPago === 'efectivo' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">¿Con cuánto vas a pagar? (Vuelto exacto si vacío)</label>
                      <div className="relative mt-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500 font-bold">S/.</span>
                        <input
                          type="text"
                          pattern="[0-9]*\.?[0-9]*"
                          value={checkoutData.efectivoVuelto}
                          onChange={e => {
                            const val = e.target.value.replace(/[^0-9.]/g, '');
                            setCheckoutData(prev => ({ ...prev, efectivoVuelto: val }));
                          }}
                          className="w-full bg-[#1d202b] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Ej. 100.00"
                        />
                      </div>
                      {checkoutData.efectivoVuelto && (parseFloat(checkoutData.efectivoVuelto) > calculateTotal()) && (
                        <p className="text-[10px] text-green-400 mt-1 ml-1 font-semibold">
                          Vuelto aproximado: S/.{(parseFloat(checkoutData.efectivoVuelto) - calculateTotal()).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Conditional Yape Copy Card */}
                {checkoutData.medioPago === 'yape' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Pagar con Yape / Plin</label>
                      <div className="bg-[#1d202b] border border-gray-800 rounded-xl p-3.5 mt-1 flex justify-between items-center">
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold">Número de Yape ({SEDES[checkoutData.sede].nombre}):</p>
                          <p className="text-sm font-bold text-white tracking-wider mt-0.5">
                            {SEDES[checkoutData.sede].whatsappDisplay}
                          </p>
                          <p className="text-[9px] text-gray-500 mt-0.5">Titular: El Barquero Restaurant</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyYape}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200 cursor-pointer border
                            ${copiedYape
                              ? 'bg-green-500/10 text-green-400 border-green-500/20'
                              : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
                            }`}
                        >
                          {copiedYape ? '¡Copiado! ✓' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Additional Notes */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Notas / Indicaciones del pedido</label>
                  <textarea
                    rows={2}
                    value={checkoutData.notas}
                    onChange={e => setCheckoutData(prev => ({ ...prev, notas: e.target.value }))}
                    className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors resize-none mt-1"
                    placeholder="Ej. Traer cubiertos, salsa tártara..."
                  />
                </div>

                {/* Submit / Send Button */}
                <div className="pt-2 border-t border-dashed border-gray-800 mt-4">
                  <div className="flex justify-between items-center mb-3 px-1 text-xs">
                    <span className="text-gray-400 font-semibold">Total a pagar:</span>
                    <span className="text-primary font-bold text-sm">S/.{calculateTotal().toFixed(2)}</span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#25D366] text-white py-3.5 rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-green-900/20 hover:scale-[1.01] transition-all font-bold text-sm cursor-pointer"
                  >
                    <img src="/wsp logo.png" alt="WhatsApp" className="w-5 h-5 shrink-0 object-contain brightness-0 invert" />
                    Enviar a WhatsApp
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BIRTHDAY MODAL FORM */}
      <AnimatePresence>
        {showBirthdayForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#14161e] w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[95vh] overflow-y-auto border border-gray-800"
            >
              <button
                onClick={() => setShowBirthdayForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#1d202b] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-sky-950/40 rounded-full flex items-center justify-center mb-3">
                  <Gift size={24} className="text-primary" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none mb-2">¡Tu Cumpleaños!</h2>
                <p className="text-xs text-gray-400">Déjanos tus datos para enviarte una sorpresa en tu día especial.</p>
              </div>

              {birthdaySuccess ? (
                <div className="bg-green-950/30 text-green-400 p-4 rounded-2xl text-center text-sm font-bold border border-green-900/50">
                  ¡Gracias! Tus datos han sido guardados.
                </div>
              ) : (
                <form onSubmit={handleBirthdaySubmit} className="space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Nombre Completo</label>
                    <input required type="text" value={birthdayData.nombre} onChange={e => setBirthdayData({...birthdayData, nombre: e.target.value})} className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Ej. Juan Pérez" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Teléfono</label>
                    <input required type="tel" minLength={9} maxLength={9} pattern="[0-9]*" value={birthdayData.telefono} onChange={e => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 9);
                      setBirthdayData({...birthdayData, telefono: val});
                    }} className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Ej. 987654321" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Fecha de Nacimiento</label>
                    <input required type="date" value={birthdayData.fechaNacimiento} onChange={e => setBirthdayData({...birthdayData, fechaNacimiento: e.target.value})} className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors text-gray-300" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Distrito</label>
                    <input required type="text" value={birthdayData.distrito} onChange={e => setBirthdayData({...birthdayData, distrito: e.target.value})} className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Ej. Magdalena del Mar" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Correo Electrónico (Opcional)</label>
                    <input type="email" value={birthdayData.correo} onChange={e => setBirthdayData({...birthdayData, correo: e.target.value})} className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="correo@ejemplo.com" />
                  </div>
                  
                  <button disabled={isSubmittingBirthday} type="submit" className="w-full bg-primary text-black py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/20 mt-2 disabled:opacity-70 flex justify-center items-center">
                    {isSubmittingBirthday ? <Loader2 size={18} className="animate-spin" /> : "Guardar mis datos"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVIEW/FEEDBACK MODAL FORM */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#14161e] w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto border border-gray-800"
            >
              <button
                onClick={() => setShowReviewForm(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#1d202b] rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mb-5 mt-2">
                <div className="w-12 h-12 bg-sky-950/40 rounded-full flex items-center justify-center mb-3">
                  <Star size={24} className="text-primary fill-primary" />
                </div>
                <h2 className="font-title text-2xl text-white leading-none mb-2">¡Calificanos!</h2>
                <p className="text-xs text-gray-400">Tu opinión es muy importante para nosotros.</p>
              </div>

              {reviewSuccess ? (
                <div className="bg-green-950/30 text-green-400 p-4 rounded-2xl text-center text-sm font-bold border border-green-900/50">
                  ¡Gracias por tu reseña! Nos ayuda a mejorar.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-5">
                  
                  <div className="bg-[#1d202b] p-4 rounded-2xl border border-gray-800/80 flex flex-col items-center">
                     <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Atención del Mozo</p>
                     <div className="flex gap-1">
                       {[1,2,3,4,5].map(star => (
                         <button 
                           key={star} type="button" 
                           onClick={() => setReviewData({...reviewData, estrellasMozo: star})}
                           className="p-1 transition-transform hover:scale-110"
                         >
                           <Star size={28} className={reviewData.estrellasMozo >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                         </button>
                       ))}
                     </div>
                  </div>

                  <div className="bg-[#1d202b] p-4 rounded-2xl border border-gray-800/80 flex flex-col items-center">
                     <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Calidad de la Comida</p>
                     <div className="flex gap-1">
                       {[1,2,3,4,5].map(star => (
                         <button 
                           key={star} type="button" 
                           onClick={() => setReviewData({...reviewData, estrellasComida: star})}
                           className="p-1 transition-transform hover:scale-110"
                         >
                           <Star size={28} className={reviewData.estrellasComida >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} />
                         </button>
                       ))}
                     </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Comentario (Opcional)</label>
                    <textarea 
                      rows={3} 
                      value={reviewData.comentario} 
                      onChange={e => setReviewData({...reviewData, comentario: e.target.value})} 
                      className="w-full bg-[#1d202b] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors resize-none mt-1" 
                      placeholder="Cuéntanos más sobre tu experiencia..." 
                    />
                  </div>
                  
                  <button disabled={isSubmittingReview} type="submit" className="w-full bg-primary text-black py-3 rounded-xl font-bold text-sm shadow-md shadow-primary/20 mt-2 disabled:opacity-70 flex justify-center items-center">
                    {isSubmittingReview ? <Loader2 size={18} className="animate-spin" /> : "Enviar Reseña"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
