import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Waves, Shield, GraduationCap, Heart, PartyPopper, ShoppingBag,
  Baby, Users, User, Check, Phone, Mail, MapPin, Facebook,
  Sparkles, Trophy, Target, Menu, X,
} from "lucide-react";
import heroBaby from "@/assets/hero-baby.jpeg";
import kidsClass from "@/assets/kids-class.jpg";
import advanced from "@/assets/advanced.jpg";
import events from "@/assets/events.jpg";
import logo from "@/assets/logo.png";
import serviceStore from "@/assets/service-store.jpg";
import heroVideo1 from "@/assets/hero-video-1.MOV";
import heroVideo2 from "@/assets/hero-video-2.MOV";
import heroVideo3 from "@/assets/hero-video-3.MOV";
import heroVideo4 from "@/assets/hero-video-4.MOV";
import heroVideo5 from "@/assets/hero-video-5.MOV";
import heroVideo6 from "@/assets/hero-video-6.MOV";
import heroVideo7 from "@/assets/hero-video-7.MOV";
import heroVideo8 from "@/assets/hero-video-8.MOV";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const FB_URL = "https://www.facebook.com/profile.php?id=100084339154505";
const WHATSAPP_URL = `https://wa.me/573106017708?text=${encodeURIComponent("Hola Let's Swim, quiero más información")}`;
const PHONE_DISPLAY = "+57 310 6017708";
const EMAIL = "letsswimnatacion@gmail.com";

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#nosotros", label: "Nosotros" },
    { href: "#servicios", label: "Servicios" },
    { href: "#niveles", label: "Niveles" },
    { href: "#modalidades", label: "Modalidades" },
    { href: "#principios", label: "Principios" },
    { href: "#contacto", label: "Contacto" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2">
          <img src={logo} alt="Let's Swim logo" width={40} height={40} className="h-10 w-10 object-contain" />
          <span className="font-bold text-lg text-primary tracking-tight">Let's Swim</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-foreground/80">
          {links.map(l => (
            <a key={l.href} href={l.href} className="hover:text-primary transition">{l.label}</a>
          ))}
        </nav>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
          className="hidden lg:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition shadow-md shadow-primary/20">
          Inscríbete
        </a>
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground" aria-label="Menú">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-white">
          <div className="px-5 py-4 flex flex-col gap-3">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-foreground/80 font-medium">{l.label}</a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="mt-2 bg-primary text-primary-foreground text-center py-3 rounded-full font-semibold">Inscríbete</a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const videos = [
    heroVideo1,
    heroVideo2,
    heroVideo3,
    heroVideo4,
    heroVideo5,
    heroVideo6,
    heroVideo7,
    heroVideo8,
  ];
  const [current, setCurrent] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % videos.length);
    }, 5500); // 5.5 seconds transition
    return () => clearInterval(timer);
  }, []);

  // Parar videos inactivos previene que móviles se saturen en recursos y congelen la pantalla
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      vid.playbackRate = 1.25; // Ligero dinamismo
      if (i === current) {
        vid.play().catch(() => { }); // Evitar bloqueos silenciosos por políticas del browser
      } else {
        vid.pause();
      }
    });
  }, [current]);

  return (
    <section id="top" className="relative pt-16 overflow-hidden min-h-[100svh] lg:min-h-[90vh] flex items-center">
      {/* Videos de fondo */}
      {videos.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={src}
          autoPlay={i === current}
          muted
          loop
          playsInline
          className={`hero-video absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out bg-black ${i === current ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
        />
      ))}

      {/* Overlay oscuro para mejorar legibilidad en toda la pantalla especialmente movil */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-black/30 lg:bg-transparent" />

      {/* Indicadores */}
      <div className="absolute bottom-16 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-white" : "w-3 bg-white/50"}`}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 py-10 lg:py-24 w-full mt-4 lg:mt-0">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/30 shadow-lg">
            <Sparkles size={14} className="flex-shrink-0" /> <span className="truncate">Escuela de natación profesional en Barranquilla</span>
          </span>
          <h1 className="mt-4 sm:mt-5 text-[2.1rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white lg:leading-[1.05] drop-shadow-md">
            Un niño que aprende a nadar, <span className="text-cyan-300">es un niño sin temores.</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-xl leading-relaxed drop-shadow">
            Formación acuática integral desde los <strong>6 meses</strong>, liderada exclusivamente por entrenadores profesionales certificados en pedagogía infantil, educación física y entrenamiento deportivo.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/25 text-sm sm:text-base">
              Agenda tu clase de prueba
            </a>
            <a href="#servicios"
              className="inline-flex items-center justify-center gap-2 bg-white/15 backdrop-blur text-white px-6 py-3.5 rounded-full font-semibold border-2 border-white/30 hover:bg-white/25 transition text-sm sm:text-base">
              Ver servicios
            </a>
          </div>
          <div className="mt-8 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-md pb-8 lg:pb-0">
            {[
              { n: "6m+", l: "Desde bebés" },
              { n: "3", l: "Niveles" },
              { n: "100%", l: "Profesional" },
            ].map(s => (
              <div key={s.l}>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white drop-shadow">{s.n}</div>
                <div className="text-[10px] sm:text-xs text-white/80 mt-1 uppercase tracking-wider font-semibold">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full z-10">
        <WaveDivider />
      </div>
    </section>
  );
}

function WaveDivider() {
  return (
    <svg className="block w-full h-12 lg:h-16 -mb-1 text-white" viewBox="0 0 1440 80" preserveAspectRatio="none">
      <path fill="currentColor" d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,40 L1440,80 L0,80 Z" />
    </svg>
  );
}

function About() {
  return (
    <section id="nosotros" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <img src={kidsClass} alt="Clase de natación con niños e instructor" width={1400} height={1000} loading="lazy"
          className="rounded-3xl shadow-xl object-cover object-top w-full aspect-[4/4]" />
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Nuestra filosofía</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Confianza y seguridad construidas con responsabilidad
          </h2>
          <p className="mt-5 text-foreground/70 leading-relaxed">
            En <strong>Let's Swim S.A.S.</strong> ayudamos a los más pequeños a crecer con total confianza, iniciando este hermoso vínculo desde sus primeros meses de vida. Todo nuestro servicio es brindado exclusivamente por un equipo de entrenadores profesionales altamente calificados.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <MissionCard icon={<Target />} title="Misión"
              text="Brindar formación acuática integral desde los 6 meses, transformando el agua en un espacio seguro de salud, desarrollo psicomotriz y superación personal." />
            <MissionCard icon={<Trophy />} title="Visión 2028"
              text="Consolidarnos como IPS pionera en Barranquilla y la Región Caribe, referente en natación como alternativa terapéutica y de rehabilitación." />
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-5 border border-primary/10">
      <div className="bg-primary text-primary-foreground w-10 h-10 rounded-xl flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-bold text-foreground">{title}</h3>
      <p className="text-sm text-foreground/70 mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

function Modalities() {
  const items = [
    { icon: <Users size={28} />, title: "Personalizadas", desc: "Flexibilidad y atención compartida en grupos muy reducidos, garantizando un alto estándar de cuidado y progreso." },
    { icon: <User size={28} />, title: "Individuales", desc: "Enfoque 100% exclusivo con un profesional dedicado a acelerar el aprendizaje y maximizar la autoconfianza." },
    { icon: <Users size={28} />, title: "Grupales", desc: "Espacios dinámicos e interactivos, ideales para motivarse en equipo, socializar y aprender en un entorno seguro." },
  ];
  return (
    <section id="modalidades" className="py-20 lg:py-28 bg-gradient-to-b from-white to-sky-50">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Modalidades de clase</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">Elige cómo quieres aprender</h2>
          <p className="mt-4 text-foreground/70">Cada proceso es único y cuenta con la supervisión directa de nuestros profesionales.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map(it => (
            <div key={it.title} className="group bg-white rounded-3xl p-7 border border-border hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="bg-primary/10 text-primary w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition">
                {it.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground">{it.title}</h3>
              <p className="mt-3 text-foreground/70 text-sm leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Levels() {
  const levels = [
    {
      n: "01", title: "Nivel Básico", tag: "Seguridad en el Agua", img: heroBaby,
      desc: "El punto de partida fundamental. Adaptación al medio acuático, flotación y técnicas esenciales de supervivencia. El primer gran paso para nadar sin temores.",
      bullets: ["Adaptación al agua", "Flotación", "Supervivencia acuática"],
    },
    {
      n: "02", title: "Nivel Medio", tag: "Recreación y Bienestar", img: kidsClass,
      desc: "Para quienes ya dominan la flotación y buscan perfeccionar estilos, utilizando la natación como herramienta recreativa, de salud mental y bienestar físico.",
      bullets: ["Perfeccionamiento de estilos", "Salud mental", "Bienestar físico"],
    },
    {
      n: "03", title: "Nivel Avanzado", tag: "Acondicionamiento Competitivo", img: advanced,
      desc: "Diseñado para nadadores que buscan exigencia técnica, resistencia, alto rendimiento y preparación para retos deportivos bajo dirección metodológica profesional.",
      bullets: ["Alto rendimiento", "Técnica avanzada", "Preparación competitiva"],
    },
  ];
  return (
    <section id="niveles" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Formación escalonada</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold tracking-tight">Tres niveles diseñados científicamente</h2>
          <p className="mt-4 text-foreground/70">Guiamos a nuestros alumnos paso a paso a través de metas claras.</p>
        </div>
        <div className="mt-14 space-y-16">
          {levels.map((lv, i) => (
            <div key={lv.n} className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative">
                <img src={lv.img} alt={lv.title} loading="lazy" className="rounded-3xl shadow-xl object-cover object-top w-full aspect-[4/4]" />
                <div className="absolute -top-5 -left-5 bg-primary text-primary-foreground rounded-2xl w-20 h-20 flex items-center justify-center text-2xl font-extrabold shadow-lg">
                  {lv.n}
                </div>
              </div>
              <div>
                <span className="text-primary font-semibold text-sm">{lv.tag}</span>
                <h3 className="mt-2 text-2xl lg:text-3xl font-extrabold text-foreground">{lv.title}</h3>
                <p className="mt-4 text-foreground/70 leading-relaxed">{lv.desc}</p>
                <ul className="mt-5 space-y-2">
                  {lv.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-foreground/80">
                      <Check size={18} className="text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: <GraduationCap />, title: "Escuela de Natación", img: kidsClass,
      points: ["Bebés desde 6 meses, niños, jóvenes y adultos", "Asesoría pedagógica continua profesional", "3 niveles formativos en la modalidad que elijas"],
    },
    {
      icon: <Heart />, title: "Desarrollo Integral y Salud", img: heroBaby,
      points: ["Estimulación temprana desde los 6 meses", "Programas para superar el miedo al agua", "Habilidades motrices: coordinación y agilidad"],
    },
    {
      icon: <PartyPopper />, title: "Recreación y Eventos", img: events,
      points: ["Cursos vacacionales acuáticos", "Fiestas y celebraciones infantiles", "Planes: Básico, Estándar y Premium"],
    },
    {
      icon: <ShoppingBag />, title: "Tienda y Material Didáctico", img: serviceStore,
      points: ["Equipamiento avalado por profesionales", "Accesorios para práctica cómoda y segura", "Material didáctico exclusivo de aprendizaje"],
    },
  ];
  return (
    <section id="servicios" className="py-20 lg:py-28 bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Portafolio de servicios</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold tracking-tight">Todo lo que ofrecemos</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {services.map(s => (
            <article key={s.title} className="group bg-white rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300">
              <div className="aspect-[15/15] overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 lg:p-7">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary w-11 h-11 rounded-xl flex items-center justify-center">{s.icon}</div>
                  <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {s.points.map(p => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/75">
                      <Check size={18} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Principles() {
  const principles = [
    { icon: <Shield />, title: "Seguridad como cuna de la confianza", desc: "Transformamos el agua en un entorno completamente protegido y controlado." },
    { icon: <GraduationCap />, title: "Rigor pedagógico y respaldo profesional", desc: "Diseñado y ejecutado exclusivamente por profesionales de la educación física y pedagogía." },
    { icon: <Baby />, title: "Estimulación y desarrollo temprano", desc: "Iniciamos el vínculo con el agua desde los 6 meses potenciando el desarrollo neuromotor." },
    { icon: <User />, title: "Respeto a la individualidad", desc: "Modalidades adaptadas a las necesidades, habilidades y tiempos de cada persona." },
    { icon: <Heart />, title: "Enfoque integral", desc: "Disciplina holística que impacta cuerpo, mente y emoción." },
    { icon: <Target />, title: "Metodología escalonada", desc: "Metas claras a través de Niveles Básico, Medio y Avanzado de forma científica." },
    { icon: <Sparkles />, title: "Vocación clínica y terapéutica", desc: "El agua como herramienta de sanación y bienestar integral para la región." },
  ];
  return (
    <section id="principios" className="py-20 lg:py-28 bg-foreground text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,white,transparent_50%)]" />
      <div className="relative max-w-6xl mx-auto px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">Lo que nos guía</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold tracking-tight">Nuestros 7 principios fundamentales</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <div key={p.title} className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-400/20 text-cyan-300 w-10 h-10 rounded-xl flex items-center justify-center">{p.icon}</div>
                <span className="text-cyan-300/70 text-sm font-mono">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-bold text-lg">{p.title}</h3>
              <p className="mt-2 text-white/70 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-primary via-sky-500 to-cyan-400 text-white">
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <Waves className="mx-auto mb-5" size={48} />
        <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">¿Listo para dar el primer paso?</h2>
        <p className="mt-5 text-lg text-white/90 max-w-2xl mx-auto">
          Agenda tu clase de prueba y vive la experiencia Let's Swim. Estamos en Barranquilla esperándote.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
            className="bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-white/95 transition shadow-xl">
            Escríbenos por WhatsApp
          </a>
          <a href={FB_URL} target="_blank" rel="noreferrer"
            className="bg-white/15 backdrop-blur border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold hover:bg-white/25 transition inline-flex items-center gap-2">
            <Facebook size={20} /> Síguenos en Facebook
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contacto" className="py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Contáctanos</span>
          <h2 className="mt-3 text-3xl lg:text-4xl font-extrabold tracking-tight">Hablemos de tu próxima clase</h2>
          <p className="mt-5 text-foreground/70">Resolvemos tus dudas, te explicamos nuestras modalidades y te ayudamos a elegir el mejor plan para ti o tu familia.</p>
          <div className="mt-8 space-y-4">
            <ContactRow icon={<MapPin />} title="Ubicación" text="Barranquilla, Colombia" />
            <ContactRow icon={<Phone />} title="Teléfono / WhatsApp" text={PHONE_DISPLAY} href={WHATSAPP_URL} />
            <ContactRow icon={<Mail />} title="Correo" text={EMAIL} href={`mailto:${EMAIL}`} />
            <ContactRow icon={<Facebook />} title="Facebook" text="Let's Swim S.A.S." href={FB_URL} />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = [
      `Hola Let's Swim, quiero más información.`,
      nombre && `Nombre: ${nombre}`,
      telefono && `Teléfono: ${telefono}`,
      edad && `Edad del alumno: ${edad}`,
      mensaje && `Mensaje: ${mensaje}`,
    ].filter(Boolean).join("\n");

    window.open(`https://wa.me/573106017708?text=${encodeURIComponent(texto)}`, "_blank");
  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-7 lg:p-9 border border-primary/10 shadow-sm">
      <h3 className="text-xl font-bold text-foreground">Reserva tu clase de prueba</h3>
      <div className="mt-6 space-y-4">
        <Field label="Nombre completo" type="text" placeholder="Tu nombre"
          value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <Field label="Teléfono" type="tel" placeholder="+57 ..."
          value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        <Field label="Edad del alumno" type="text" placeholder="Ej. 5 años"
          value={edad} onChange={(e) => setEdad(e.target.value)} />
        <div>
          <label className="text-sm font-medium text-foreground/80">Mensaje</label>
          <textarea rows={3} placeholder="Cuéntanos qué necesitas"
            value={mensaje} onChange={(e) => setMensaje(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
        </div>
        <button type="submit"
          className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-semibold hover:bg-primary/90 transition shadow-lg shadow-primary/25">
          Enviar solicitud
        </button>
      </div>
    </form>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground/80">{label}</label>
      <input {...props}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

function ContactRow({ icon, title, text, href }: { icon: React.ReactNode; title: string; text: string; href?: string }) {
  const Wrap: React.ElementType = href ? "a" : "div";
  const wrapProps = href ? { href, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Wrap {...wrapProps} className="flex items-start gap-4 group">
      <div className="bg-primary/10 text-primary w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition">{icon}</div>
      <div>
        <div className="font-semibold text-foreground">{title}</div>
        <div className="text-foreground/70 text-sm">{text}</div>
      </div>
    </Wrap>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-white/70 py-12">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Let's Swim" width={36} height={36} className="h-9 w-9 bg-white rounded-lg p-1" />
            <span className="font-bold text-white text-lg">Let's Swim S.A.S.</span>
          </div>
          <p className="mt-4 text-sm italic">"Un niño que aprende a nadar, es un niño sin temores."</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Navegación</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#nosotros" className="hover:text-white">Nosotros</a></li>
            <li><a href="#servicios" className="hover:text-white">Servicios</a></li>
            <li><a href="#niveles" className="hover:text-white">Niveles</a></li>
            <li><a href="#contacto" className="hover:text-white">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Síguenos</h4>
          <a href={FB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-white">
            <Facebook size={18} /> Facebook
          </a>
          <p className="mt-4 text-xs">Barranquilla, Colombia</p>
        </div>
      </div>
      <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs">
        © {new Date().getFullYear()} Let's Swim S.A.S. — Todos los derechos reservados.
      </div>
    </footer>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Modalities />
        <Levels />
        <Services />
        <Principles />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
