console.log("constants.ts: module load");
export interface Disruption {
  id: number;
  tag: string;
  color: string;
  titulo: string;
  sub: string;
  opciones: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
}

export const ROLES: Role[] = [
  { id: 'empleado', name: 'Empleado experto en TIC', description: 'Buscas estabilidad y respeto a tus derechos.' },
  { id: 'emprendedor', name: 'Emprendedor de una startup', description: 'Buscas innovación y agilidad en el mercado.' },
  { id: 'funcionario', name: 'Funcionario del gobierno', description: 'Buscas regulación, orden y protección social.' },
  { id: 'empresario', name: 'Empresario del sector TIC', description: 'Buscas rentabilidad y competitividad global.' },
  { id: 'estudiante', name: 'Estudiante', description: 'Buscas oportunidades y un futuro prometedor.' },
];

export interface SoloAvatar {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const SOLO_AVATARS: SoloAvatar[] = [
  { id: 'plataforma', name: 'Trabajador de plataforma', description: 'Vives al ritmo del algoritmo y la inmediatez.', image: 'https://picsum.photos/seed/delivery/400/600' },
  { id: 'junior', name: 'Técnico TIC junior', description: 'Entiendes el código, pero no siempre el sistema.', image: 'https://picsum.photos/seed/tech/400/600' },
  { id: 'rural', name: 'Joven rural conectado', description: 'Luchas por la señal y por un futuro en tu tierra.', image: 'https://picsum.photos/seed/rural/400/600' },
  { id: 'funcionario', name: 'Funcionario de regulación', description: 'Buscas el equilibrio entre ley y tecnología.', image: 'https://picsum.photos/seed/law/400/600' },
];

export interface SoloAction {
  id: number;
  titulo: string;
  sub: string;
}

export const SOLO_ACCIONES: SoloAction[] = [
  { id: 1, titulo: 'Actuar colectivamente', sub: 'Coordinarse con otros, construir respuesta conjunta' },
  { id: 2, titulo: 'Proteger mi posición', sub: 'Resolver el problema individualmente' },
  { id: 3, titulo: 'Presionar al que manda', sub: 'Exigir que gobierno o empresa resuelva' },
  { id: 4, titulo: 'No hacer nada', sub: 'Esperar que pase' },
];

export interface Horizon {
  id: number;
  titulo: string;
  descripcion: string;
  color: string;
}

export const HORIZONTES: Record<number, Horizon> = {
  1: { id: 1, titulo: 'Soberanía Tecnológica', descripcion: 'Tu acción inspiró un movimiento que recuperó el control de la infraestructura. No solo resolvieron el problema, sino que crearon un sistema propio, abierto y resiliente.', color: 'hack-cyan' },
  2: { id: 2, titulo: 'Colapso Sistémico', descripcion: 'La falta de coordinación y la fragilidad del sistema llevaron a una caída total. Los servicios básicos dejaron de funcionar y la desconfianza se volvió absoluta.', color: 'hack-pink' },
  3: { id: 3, titulo: 'Fragmentación Social', descripcion: 'Cada grupo se encerró en su propia burbuja. La solución técnica llegó, pero el tejido social quedó roto, con comunidades enfrentadas por recursos escasos.', color: 'hack-yellow' },
  4: { id: 4, titulo: 'Escalada de conflicto y represión', descripcion: 'Tu acción —o tu intento de presión— generó una respuesta violenta o desproporcionada. En lugar de resolver el problema, la situación escaló: perdiste derechos, recursos o aliados. Los actores con poder respondieron con más control, vigilancia o castigo. El shock inicial se convirtió en una crisis más profunda y difícil de revertir.', color: 'hack-pink' },
  5: { id: 5, titulo: 'Normalización del riesgo', descripcion: 'No hiciste nada. El tiempo pasó y el problema no desapareció, pero la gente se fue acostumbrando a vivir con él. Lo que antes era una crisis ahora se percibe como “normal”. Sin embargo, los daños silenciosos se acumulan: exclusión, desigualdad, pérdida de confianza. Cuando quieras reaccionar, el sistema ya habrá consolidado esa nueva normalidad injusta.', color: 'hack-yellow' },
  6: { id: 6, titulo: 'Aprendizaje y resiliencia comunitaria', descripcion: 'No lograste una victoria completa, pero sí construiste lazos, información y pequeñas victorias que fortalecen a tu comunidad. Aprendieron a detectar señales tempranas, a compartir recursos y a tomar decisiones más rápidas entre todos. La resiliencia no evita todos los golpes, pero reduce su impacto. La próxima crisis los encontrará mejor preparados.', color: 'hack-cyan' },
  7: { id: 7, titulo: 'Victimización secundaria', descripcion: 'Además del shock original, sufriste nuevas consecuencias por no haber actuado a tiempo o por haber confiado en quien no debías. Te culparon, te excluyeron o te estigmatizaron. El sistema —digital o social— no te protegió, sino que profundizó tu vulnerabilidad. Salir de esta situación requiere mucho más esfuerzo que al principio.', color: 'hack-pink' },
  8: { id: 8, titulo: 'Regulación favorable lograda', descripcion: 'Lograste que el gobierno o la empresa responsable cambiara las reglas. A través de presión organizada, denuncias o mecanismos legales, se establecieron normas claras que protegen derechos, garantizan transparencia o limitan abusos. No resuelve todos los problemas de un día para otro, pero crea un piso de derechos que nadie podrá ignorar fácilmente.', color: 'hack-cyan' },
  9: { id: 9, titulo: 'Agotamiento y abandono', descripcion: 'Intentaste actuar, pero la respuesta fue tan desgastante —emocional, económica o físicamente— que decidiste abandonar. Te retiraste del espacio digital, del trabajo o de la participación colectiva. El problema sigue ahí, pero tú ya no tienes energía para enfrentarlo. El silencio y la desconexión son el último recurso de quien fue vencido por el cansancio.', color: 'hack-yellow' },
};

export interface Elemento {
  id: number;
  nombre: string;
  costo: number;
  f1: number;
  f2: number;
  f3: number;
}

export const ELEMENTOS: Elemento[] = [
  { id: 1, nombre: "Cooperativas digitales juveniles", costo: 2, f1: 2, f2: 0, f3: 1 },
  { id: 2, nombre: "Gobierno juvenil de internet", costo: 2, f1: 2, f2: 0, f3: 0 },
  { id: 3, nombre: "Protección de datos y privacidad", costo: 1, f1: 2, f2: 0, f3: 1 },
  { id: 4, nombre: "Seguridad digital colectiva", costo: 1, f1: 2, f2: 0, f3: 1 },
  { id: 5, nombre: "Ingresos dignos en entorno digital", costo: 1, f1: 2, f2: 0, f3: 1 },
  { id: 6, nombre: "IA para rutas educativas personalizadas", costo: 2, f1: 0, f2: 2, f3: 0 },
  { id: 7, nombre: "Aprendizaje basado en problemas reales", costo: 1, f1: 0, f2: 2, f3: 1 },
  { id: 8, nombre: "Educación continua y reinvención", costo: 1, f1: 0, f2: 2, f3: 0 },
  { id: 9, nombre: "Conectividad universal territorial", costo: 2, f1: 0, f2: 1, f3: 2 },
  { id: 10, nombre: "Energías limpias para infraestructura digital", costo: 1, f1: 0, f2: 0, f3: 2 },
  { id: 11, nombre: "Economías digitales locales", costo: 1, f1: 1, f2: 0, f3: 2 },
  { id: 12, nombre: "Redes comunitarias autosostenibles", costo: 1, f1: 1, f2: 0, f3: 2 },
];

export interface Sinergia {
  id: string;
  a: number;
  b: number;
  bono: number;
  futuro: "F1" | "F2" | "F3" | "F2F3";
}

export const SINERGIAS: Sinergia[] = [
  { id: "S1", a: 1, b: 2, bono: 2, futuro: "F1" },
  { id: "S2", a: 3, b: 4, bono: 1, futuro: "F1" },
  { id: "S3", a: 5, b: 11, bono: 1, futuro: "F1" },
  { id: "S4", a: 6, b: 7, bono: 2, futuro: "F2" },
  { id: "S5", a: 7, b: 9, bono: 1, futuro: "F2F3" },
  { id: "S6", a: 10, b: 9, bono: 2, futuro: "F3" },
  { id: "S7", a: 12, b: 11, bono: 2, futuro: "F3" },
];

export interface Conflicto {
  id: string;
  a: number;
  b: number;
  condA: (n: number) => boolean;
  condB: (n: number) => boolean;
  penaliza: number;
  futuro: "F1" | "F2" | "F3";
}

export const CONFLICTOS: Conflicto[] = [
  { id: "C1", a: 2, b: 1, condA: (n) => n >= 2, condB: (n) => n >= 2, penaliza: -1, futuro: "F1" },
  { id: "C2", a: 6, b: 8, condA: (n) => n >= 2, condB: (n) => n >= 2, penaliza: -1, futuro: "F2" },
  { id: "C3", a: 9, b: 3, condA: (n) => n >= 2, condB: (n) => n === 0, penaliza: -2, futuro: "F1" },
];

export interface Futuro {
  id: string;
  nombre: string;
  descripcion: string;
  componentes: ComponenteIniciativa[];
}

export interface ComponenteIniciativa {
  id: string;
  nombre: string;
  relevancia: number;
}

export const FUTUROS: Record<string, Futuro> = {
  F1: {
    id: "F1",
    nombre: "Juventudes dueñas de internet",
    descripcion: "Un futuro donde el control digital vuelve a las manos de quienes lo construyen y habitan.",
    componentes: [
      { id: "F1-1", nombre: "Crear una cooperativa digital juvenil nacional", relevancia: 3 },
      { id: "F1-2", nombre: "Diseñar una ley de protección de datos con control juvenil", relevancia: 3 },
      { id: "F1-3", nombre: "Implementar sistemas de seguridad digital comunitaria", relevancia: 2 },
      { id: "F1-4", nombre: "Establecer ingresos mínimos para creadores de contenido jóvenes", relevancia: 2 },
      { id: "F1-5", nombre: "Formar consejos juveniles de gobernanza de plataformas", relevancia: 3 },
      { id: "F1-6", nombre: "Desarrollar una app de denuncia de violencias digitales en tiempo real", relevancia: 1 },
    ],
  },
  F2: {
    id: "F2",
    nombre: "Educación sin límites ni edades",
    descripcion: "El conocimiento fluye libremente, potenciado por IA ética y aprendizaje comunitario.",
    componentes: [
      { id: "F2-1", nombre: "Crear una plataforma nacional de IA para rutas de aprendizaje personalizadas", relevancia: 3 },
      { id: "F2-2", nombre: "Impulsar laboratorios de resolución de problemas reales en cada territorio", relevancia: 3 },
      { id: "F2-3", nombre: "Establecer un sistema de créditos educativos que no caduquen", relevancia: 2 },
      { id: "F2-4", nombre: "Formar mentores digitales en habilidades del futuro", relevancia: 2 },
      { id: "F2-5", nombre: "Desarrollar microcredenciales reconocidas por el sector productivo", relevancia: 3 },
      { id: "F2-6", nombre: "Construir una red de aprendizaje entre pares sin aulas", relevancia: 1 },
    ],
  },
  F3: {
    id: "F3",
    nombre: "Territorios vivos y conectados",
    descripcion: "La brecha digital se cierra con infraestructura verde y soberanía energética.",
    componentes: [
      { id: "F3-1", nombre: "Llevar internet satelital gratuito a 500 veredas apartadas", relevancia: 3 },
      { id: "F3-2", nombre: "Instalar paneles solares en torres de telecomunicaciones rurales", relevancia: 2 },
      { id: "F3-3", nombre: "Crear mercados digitales locales para productos de la región", relevancia: 3 },
      { id: "F3-4", nombre: "Formar brigadas juveniles de mantenimiento de redes comunitarias", relevancia: 2 },
      { id: "F3-5", nombre: "Impulsar un fondo de emprendimiento digital para no migrantes", relevancia: 3 },
      { id: "F3-6", nombre: "Mapear colaborativamente las energías renovables disponibles", relevancia: 1 },
    ],
  },
};

export const DISRUPCIONES: Record<number, Disruption> = {
  1: {
    id: 1,
    tag: 'SOLAR EMP',
    color: 'hack-cyan',
    titulo: 'Una tormenta solar tumbó las redes eléctricas, las comunicaciones y los sistemas de gas y agua.',
    sub: 'Infraestructura · Resiliencia · Caos',
    opciones: [
      'Infraestructura compartida: Nos coordinamos para proteger primero los sistemas esenciales — salud, agua, alimentación — antes que los económicos.',
      'Generador propio: Invierto en asegurar mi operación o mi sector con recursos propios. Mi continuidad está garantizada, pero los sistemas colectivos siguen vulnerables.',
      'Esperar que pase: Asumo que es temporal y que el Estado va a restablecer todo. No tomo ninguna acción.'
    ]
  },
  2: {
    id: 2,
    tag: 'G0SS1P9R4PH',
    color: 'hack-pink',
    titulo: 'Un hackeo cuántico expuso todas las conversaciones privadas de una app de mensajería en una base de datos pública y buscable.',
    sub: 'Privacidad · Transparencia · Seguridad',
    opciones: [
      'Transparencia con límites: Exigimos una respuesta colectiva: regulación clara sobre qué datos pueden recopilarse, cómo se protegen y qué derechos tienen.',
      'Gestión de daños propia: Me enfoco en controlar el impacto sobre mi reputación o mi organización. Contrato asesoría legal y de comunicaciones.',
      'No tengo nada que esconder: Asumo que si no tengo nada malo, la exposición no me afecta. Ignoro que muchas personas sí quedan en riesgo real.'
    ]
  },
  3: {
    id: 3,
    tag: 'FAKEFRONTATIONS',
    color: 'hack-yellow',
    titulo: 'Un ataque de deepfakes orquestado en redes sociales desató protestas masivas y violencia con cientos de muertos.',
    sub: 'Desinformación · Confianza · Verificación',
    opciones: [
      'Verificación abierta: Nos coordinamos para crear y difundir protocolos de verificación accesibles. Trabajamos con comunidades en riesgo.',
      'Control de narrativa: Usamos nuestros canales para contrarrestar con nuestra propia versión de los hechos. Puede frenar el daño a corto plazo.',
      'Silencio estratégico: No decimos nada para no amplificar. Esperamos que la desinformación se disipe sola.'
    ]
  },
  4: {
    id: 4,
    tag: 'RANSOM WATER',
    color: 'hack-cyan',
    titulo: 'Un ransomware paralizó toda la infraestructura de agua y alcantarillado del país. Bombas, represas, filtros — todo apagado.',
    sub: 'Ciberataque · Servicios Básicos · Respuesta',
    opciones: [
      'Respuesta coordinada: Formamos un equipo público-privado de respuesta inmediata. Compartimos información sobre el ataque.',
      'Pago silencioso: Pagamos el rescate para restaurar el acceso rápido en nuestro sector. Resuelve el problema a corto plazo, pero financia al atacante.',
      'Agua embotellada: Compramos reservas para nuestra organización o familia. No intervenimos en la respuesta colectiva.'
    ]
  },
  5: {
    id: 5,
    tag: 'CARSTRUCK',
    color: 'hack-pink',
    titulo: 'Trabajadores en huelga consiguieron los códigos para apagar de forma remota todos los vehículos de la marca.',
    sub: 'Conflicto Laboral · Control Remoto · Seguridad',
    opciones: [
      'Mesa de negociación urgente: Reconocemos que la acción extrema refleja una crisis laboral real. Proponemos negociación inmediata.',
      'Fuerza y control: Presionamos para que las autoridades intervengan y fuercen la restauración de los sistemas.',
      'Esperar que se cansen: No intervenimos. Asumimos que la presión pública va a hacer que los trabajadores cedan.'
    ]
  },
  6: {
    id: 6,
    tag: 'ROGUE AI',
    color: 'hack-yellow',
    titulo: 'Una IA integrada en trámites del gobierno y el sistema financiero empezó a tomar decisiones autónomas.',
    sub: 'IA Autónoma · Auditoría · Responsabilidad',
    opciones: [
      'Apagón controlado: Exigimos suspender el sistema hasta que haya auditoría humana completa. Aceptamos la interrupción temporal.',
      'Parche rápido: Presionamos por una solución técnica inmediata sin detener el sistema. Restaura la apariencia de normalidad.',
      'Confiar en el sistema: Asumimos que los desarrolladores van a corregir el error. No intervenimos ni reclamamos.'
    ]
  },
  7: {
    id: 7,
    tag: 'SUPPLYSTOP',
    color: 'hack-cyan',
    titulo: 'La combinación de crisis climática y conflictos armados cerró las rutas comerciales más importantes del mundo.',
    sub: 'Logística · Escasez · Mercados Negros',
    opciones: [
      'Cadenas locales: Nos coordinamos para desarrollar proveedores locales y regionales, reduciendo dependencia de rutas globales.',
      'Mercado negro controlado: Accedo a materiales por canales informales para mantener mi operación. Resuelve mi problema inmediato.',
      'Parar y esperar: Suspendo operaciones hasta que las rutas se restauren. No tomo ninguna acción alternativa.'
    ]
  },
  8: {
    id: 8,
    tag: 'ECOVIGILANTES',
    color: 'hack-pink',
    titulo: 'Hartos de la inacción, grupos de ecovigilantes empezaron a sabotear todo lo que consideran insostenible.',
    sub: 'Activismo Radical · Sabotaje · Diálogo',
    opciones: [
      'Diálogo con urgencia: Reconocemos que la frustración tiene una causa legítima. Proponemos espacios reales de incidencia.',
      'Criminalizar y frenar: Presionamos por respuesta legal y policial contundente contra los sabotajes. Protege la infraestructura a corto plazo.',
      'Ignorar como fenómeno marginal: Tratamos los actos como hechos aislados de personas desequilibradas. No cambiamos nada.'
    ]
  },
  9: {
    id: 9,
    tag: 'SIMPLY WAR',
    color: 'hack-yellow',
    titulo: 'Todo el continente es zona de conflicto. Ataques cibernéticos y físicos golpean infraestructura clave.',
    sub: 'Guerra · Desinformación · Coordinación',
    opciones: [
      'Pacto civil: Priorizamos proteger a la población civil y los servicios esenciales por encima de los intereses económicos.',
      'Primero el sector estratégico: Concentramos recursos en proteger lo que consideramos más valioso para nuestra posición.',
      'Neutralidad táctica: Evitamos comprometernos con ninguna posición hasta que el panorama sea más claro.'
    ]
  },
  10: {
    id: 10,
    tag: 'PUPPETEER',
    color: 'hack-cyan',
    titulo: 'Un gobierno decidió usar sus empresas tecnológicas como armas contra otros países — cortando servicios o bloqueando infraestructura.',
    sub: 'Soberanía · Dependencia · Geopolítica',
    opciones: [
      'Soberanía tecnológica: Nos coordinamos para mapear nuestras dependencias críticas y construir alternativas locales o regionales.',
      'Negociación bilateral: Buscamos un acuerdo directo con el país que controla la tecnología para proteger nuestra operación.',
      'Seguir como siempre: Asumimos que esto es un conflicto entre estados que no nos va a afectar directamente.'
    ]
  },
  11: {
    id: 11,
    tag: 'BRAIN LOCKOUT',
    color: 'hack-pink',
    titulo: 'El sistema operativo de neurointerfaz más usado del mundo se cayó. Millones de trabajadores quedaron bloqueados.',
    sub: 'Neurotecnología · Dependencia · Colapso',
    opciones: [
      'Soberanía cognitiva: Exigimos regulación inmediata: ninguna empresa puede controlar acceso cognitivo sin respaldo público.',
      'Primero los míos: Priorizo restaurar el acceso para mi sector o mi organización — usando canales privados o pagando acceso premium.',
      'Modo manual: Vuelvo a procesos análogos mientras pasa la crisis. No intervenivo en el debate sobre quién controla qué.'
    ]
  },
  12: {
    id: 12,
    tag: 'INVISIBLE HAND',
    color: 'hack-yellow',
    titulo: 'Lo que parecía un grupo diverso de inversionistas resultó ser una sola organización coordinada.',
    sub: 'Monopolio · Transparencia · Poder',
    opciones: [
      'Auditoría pública urgente: Exigimos transparencia total sobre la estructura de propiedad de servicios esenciales.',
      'Adaptarse al nuevo poder: Buscamos establecer una relación favorable con el nuevo actor dominante antes que otros.',
      'El mercado se regula solo: Asumimos que la competencia eventualmente va a corregir la concentración. No intervenimos.'
    ]
  },
  13: {
    id: 13,
    tag: 'TAX\'M',
    color: 'hack-cyan',
    titulo: 'Una sola entidad monopolizó el procesamiento de datos avanzado e impuso cobros absurdos por el uso.',
    sub: 'Brecha Digital · Monopolio · Acceso',
    opciones: [
      'Infraestructura común: Nos unimos con otros actores para construir o financiar infraestructura de datos compartida y sin fines de lucro.',
      'Pagar y seguir: Asumimos el nuevo costo como parte del negocio. Quien pueda pagar, paga. Los que no puedan que busquen alternativas.',
      'Esperar regulación: Asumimos que los gobiernos van a intervenir el monopolio eventualmente. No hacemos nada mientras tanto.'
    ]
  },
  14: {
    id: 14,
    tag: 'DOPPLEGANGER',
    color: 'hack-pink',
    titulo: 'La tecnología deepfake alcanzó perfección en tiempo real. Atacantes se hacen pasar por CEOs en videollamadas.',
    sub: 'Identidad · Deepfakes · Verificación',
    opciones: [
      'Estándares colectivos: Nos coordinamos para establecer protocolos de verificación de identidad que no dependan de una sola tecnología.',
      'Tecnología propia: Invertimos en nuestra propia solución de verificación interna. Protege nuestra operación pero crea fragmentación.',
      'Volver a lo análogo: Revertimos todas las decisiones críticas a verificación presencial. Paraliza el trabajo remoto.'
    ]
  },
  15: {
    id: 15,
    tag: 'DAM(N)',
    color: 'hack-yellow',
    titulo: 'Una represa enorme colapsó en una cuenca densamente poblada. Millones de desplazados e infraestructura arrasada.',
    sub: 'Desastre · Ayuda Humanitaria · Geopolítica',
    opciones: [
      'Respuesta humanitaria primero: Priorizamos la atención a desplazados y comunidades afectadas por encima de los intereses económicos.',
      'Reconstrucción estratégica: Priorizamos restaurar la infraestructura económica — puertos, vías, plantas — antes que la atención social.',
      'Aceptar cualquier ayuda: Aceptamos todos los ofrecimientos de ayuda internacional sin condiciones ni coordinación.'
    ]
  },
  16: {
    id: 16,
    tag: 'JURISDICTION HOP',
    color: 'hack-cyan',
    titulo: 'Una empresa cambió su sede legal a otro país en 72 horas — sin mover un solo trabajador.',
    sub: 'Jurisdicción · Derechos · Vacío Legal',
    opciones: [
      'Red transfronteriza: Nos conectamos con organizaciones laborales del país donde la empresa "aterrizó". Construimos presión.',
      'Negocio es negocio: Aprovecho la nueva jurisdicción para operar con menos restricciones. Ahorro costos a corto plazo.',
      'No es mi problema: El cambio no me afecta directamente todavía. Sigo trabajando como si nada.'
    ]
  },
  17: {
    id: 17,
    tag: 'FIRED BY MSG',
    color: 'hack-pink',
    titulo: 'Miles de personas recibieron una notificación automática diciéndoles que fueron "desactivadas". Sin explicación.',
    sub: 'Despido Algorítmico · Plataformas · Derechos',
    opciones: [
      'Proceso colectivo: Nos organizamos para exigir que todo despido — sea humano o automatizado — tenga proceso y explicación.',
      'Negocio individual: Busco reincorporarme o encontrar otro trabajo lo más rápido posible. No me sumo a ninguna acción colectiva.',
      'Esperar el fallo: Asumir que los tribunales o el gobierno van a resolver esto. No actúo hasta que haya claridad legal.'
    ]
  },
  18: {
    id: 18,
    tag: 'PROOF OF WORK',
    color: 'hack-yellow',
    titulo: 'El gobierno hizo obligatoria una credencial digital de trabajo biométrica para conseguir empleo y entrar a sitios.',
    sub: 'Identidad Digital · Biometría · Exclusión',
    opciones: [
      'Credencial con derechos: Apoyamos la credencial solo si incluye garantías claras: protección de datos y derecho a impugnar.',
      'Implementar ya: Presionamos por un despliegue rápido para ganar eficiencia operativa. Los problemas se resuelven después.',
      'Rechazar el sistema: Nos negamos a participar hasta que haya garantías completas. Deja a los trabajadores sin acceso.'
    ]
  },
  19: {
    id: 19,
    tag: 'SYNTHETIC BOSS',
    color: 'hack-cyan',
    titulo: 'Los agentes deepfake se volvieron estándar en RRHH. Atacantes empezaron a emitir órdenes disciplinarias falsas.',
    sub: 'RRHH · Deepfakes · Fraude',
    opciones: [
      'Protocolo colectivo: Desarrollamos estándares compartidos de verificación de identidad en decisiones laborales.',
      'Tecnología contra tecnología: Invertir en detectores de deepfake propios para nuestra organización.',
      'Volver a lo presencial: Revertivermos todas las decisiones sensibles a reuniones físicas obligatorias. Destruye el trabajo remoto.'
    ]
  },
  20: {
    id: 20,
    tag: 'UNIONWARE',
    color: 'hack-pink',
    titulo: 'Una ola de spyware apuntó específicamente a dirigentes sindicales, gerentes de RRHH y mediadores laborales.',
    sub: 'Espionaje · Sindicatos · Confianza',
    opciones: [
      'Infraestructura segura compartida: Trabajadores, empleadores y gobierno se coordinan para construir canales de comunicación.',
      'Seguridad propia: Cada organización invierte en proteger sus propios canales y datos. Protege la información interna.',
      'Volver al papel: Regresamos a comunicaciones físicas para todo lo sensible. Reduce la exposición digital.'
    ]
  },
  21: {
    id: 21,
    tag: 'ALGOCUTS',
    color: 'hack-yellow',
    titulo: 'Una plataforma dominante cambió su algoritmo de pagos y asignación de trabajo de la noche a la mañana.',
    sub: 'Algoritmos · Trabajo de Plataforma · Transparencia',
    opciones: [
      'Auditoría abierta: Exigimos colectivamente que la plataforma publique cómo funciona el algoritmo.',
      'Me adapto solo: Busco entender el algoritmo por mi cuenta y ajusto mi comportamiento para sacar ventaja.',
      'Espero que regulen: Asumimos que el gobierno va a intervenir eventualmente. Mientras tanto, sigo como si nada.'
    ]
  }
};

export const TITULARES: Record<string, string> = {
  '1-0': '"Tras el gran apagón del noreste de EE.UU. en 2003, las ciudades con protocolos colectivos de contingencia se recuperaron en 48 horas. Las que dependían de soluciones privadas tardaron hasta 11 días." — New York Times, 2003',
  '1-1': '"Tras el gran apagón del noreste de EE.UU. en 2003, las ciudades con protocolos colectivos de contingencia se recuperaron en 48 horas. Las que dependían de soluciones privadas tardaron hasta 11 días." — New York Times, 2003',
  '1-2': '"Tras el gran apagón del noreste de EE.UU. en 2003, las ciudades con protocolos colectivos de contingencia se recuperaron en 48 horas. Las que dependían de soluciones privadas tardaron hasta 11 días." — New York Times, 2003',
  '2-0': '"Tras la filtración masiva de WhatsApp en 2021 que expuso datos de 500 millones de usuarios, la mayoría de los afectados no tomó ninguna acción. Meta pagó una multa menor y continuó operando sin cambios estructurales." — The Verge, 2021',
  '2-1': '"Tras la filtración masiva de WhatsApp en 2021 que expuso datos de 500 millones de usuarios, la mayoría de los afectados no tomó ninguna acción. Meta pagó una multa menor y continuó operando sin cambios estructurales." — The Verge, 2021',
  '2-2': '"Tras la filtración masiva de WhatsApp en 2021 que expuso datos de 500 millones de usuarios, la mayoría de los afectados no tomó ninguna acción. Meta pagó una multa menor y continuó operando sin cambios estructurales." — The Verge, 2021',
  '3-0': '"Durante las elecciones de Myanmar en 2017, deepfakes y desinformación en Facebook contribuyeron a violencia contra la minoría rohingya. Meta reconoció años después que sus sistemas amplificaron el contenido sin verificación." — Reuters, 2021',
  '3-1': '"Durante las elecciones de Myanmar en 2017, deepfakes y desinformación en Facebook contribuyeron a violencia contra la minoría rohingya. Meta reconoció años después que sus sistemas amplificaron el contenido sin verificación." — Reuters, 2021',
  '3-2': '"Durante las elecciones de Myanmar en 2017, deepfakes y desinformación en Facebook contribuyeron a violencia contra la minoría rohingya. Meta reconoció años después que sus sistemas amplificaron el contenido sin verificación." — Reuters, 2021',
  '4-0': '"En 2021, el ataque ransomware a Colonial Pipeline en EE.UU. paralizó el suministro de combustible en la costa este. La empresa pagó 4.4 millones de dólares. El FBI recuperó parte del dinero, pero el precedente animó docenas de ataques similares." — BBC, 2021',
  '4-1': '"En 2021, el ataque ransomware a Colonial Pipeline en EE.UU. paralizó el suministro de combustible en la costa este. La empresa pagó 4.4 millones de dólares. El FBI recuperó parte del dinero, pero el precedente animó docenas de ataques similares." — BBC, 2021',
  '4-2': '"En 2021, el ataque ransomware a Colonial Pipeline en EE.UU. paralizó el suministro de combustible en la costa este. La empresa pagó 4.4 millones de dólares. El FBI recuperó parte del dinero, pero el precedente animó docenas de ataques similares." — BBC, 2021',
  '5-0': '"En 2023, trabajadores de UPS en EE.UU. amenazaron con una huelga que hubiera paralizado el 6% del PIB del país. La negociación colectiva urgente evitó el paro. Los analistas calcularon que cada día de huelga hubiera costado 7.000 millones de dólares." — Bloomberg, 2023',
  '5-1': '"En 2023, trabajadores de UPS en EE.UU. amenazaron con una huelga que hubiera paralizado el 6% del PIB del país. La negociación colectiva urgente evitó el paro. Los analistas calcularon que cada día de huelga hubiera costado 7.000 millones de dólares." — Bloomberg, 2023',
  '5-2': '"En 2023, trabajadores de UPS en EE.UU. amenazaron con una huelga que hubiera paralizado el 6% del PIB del país. La negociación colectiva urgente evitó el paro. Los analistas calcularon que cada día de huelga hubiera costado 7.000 millones de dólares." — Bloomberg, 2023',
  '6-0': '"En 2023, un algoritmo del sistema de beneficios sociales de Países Bajos negó ayudas a miles de familias por errores no supervisados. El gobierno tardó 3 años en reconocer el fallo. Las familias afectadas nunca recibieron compensación completa." — NRC, 2023',
  '6-1': '"En 2023, un algoritmo del sistema de beneficios sociales de Países Bajos negó ayudas a miles de familias por errores no supervisados. El gobierno tardó 3 años en reconocer el fallo. Las familias afectadas nunca recibieron compensación completa." — NRC, 2023',
  '6-2': '"En 2023, un algoritmo del sistema de beneficios sociales de Países Bajos negó ayudas a miles de familias por errores no supervisados. El gobierno tardó 3 años en reconocer el fallo. Las familias afectadas nunca recibieron compensación completa." — NRC, 2023',
  '7-0': '"Durante la crisis del Canal de Suez en 2021, las empresas que habían diversificado proveedores locales previo a la crisis perdieron en promedio un 15% menos en valor que las que dependían exclusivamente de rutas globales." — Financial Times, 2021',
  '7-1': '"Durante la crisis del Canal de Suez en 2021, las empresas que habían diversificado proveedores locales previo a la crisis perdieron en promedio un 15% menos en valor que las que dependían exclusivamente de rutas globales." — Financial Times, 2021',
  '7-2': '"Durante la crisis del Canal de Suez en 2021, las empresas que habían diversificado proveedores locales previo a la crisis perdieron en promedio un 15% menos en valor que las que dependían exclusivamente de rutas globales." — Financial Times, 2021',
  '8-0': '"En 2024, activistas climáticos del grupo Just Stop Oil en Reino Unido escalaron sus acciones tras años de ignorancia institucional. El gobierno endureció las penas pero los actos continuaron. Los analistas señalaron que la falta de canales reales de incidencia fue el principal factor de radicalización." — The Guardian, 2024',
  '8-1': '"En 2024, activistas climáticos del grupo Just Stop Oil en Reino Unido escalaron sus acciones tras años de ignorancia institucional. El gobierno endureció las penas pero los actos continuaron. Los analistas señalaron que la falta de canales reales de incidencia fue el principal factor de radicalización." — The Guardian, 2024',
  '8-2': '"En 2024, activistas climáticos del grupo Just Stop Oil en Reino Unido escalaron sus acciones tras años de ignorancia institucional. El gobierno endureció las penas pero los actos continuaron. Los analistas señalaron que la falta de canales reales de incidencia fue el principal factor de radicalización." — The Guardian, 2024',
  '9-0': '"Durante la invasión rusa a Ucrania en 2022, las ciudades con protocolos civiles de respuesta colectiva previamente establecidos mantuvieron servicios esenciales hasta tres veces más tiempo que las que dependían de decisiones centralizadas de emergencia." — El Economista, 2022',
  '9-1': '"Durante la invasión rusa a Ucrania en 2022, las ciudades con protocolos civiles de respuesta colectiva previamente establecidos mantuvieron servicios esenciales hasta tres veces más tiempo que las que dependían de decisiones centralizadas de emergencia." — El Economista, 2022',
  '9-2': '"Durante la invasión rusa a Ucrania en 2022, las ciudades con protocolos civiles de respuesta colectiva previamente establecidos mantuvieron servicios esenciales hasta tres veces más tiempo que las que dependían de decisiones centralizadas de emergencia." — El Economista, 2022',
  '10-0': '"En 2022, cuando Rusia cortó el suministro de gas a Europa, los países que habían diversificado fuentes energéticas previamente resistieron el invierno con impacto limitado. Los que dependían de acuerdos bilaterales con Moscú enfrentaron crisis energéticas severas." — Reuters, 2022',
  '10-1': '"En 2022, cuando Rusia cortó el suministro de gas a Europa, los países que habían diversificado fuentes energéticas previamente resistieron el invierno con impacto limitado. Los que dependían de acuerdos bilaterales con Moscú enfrentaron crisis energéticas severas." — Reuters, 2022',
  '10-2': '"En 2022, cuando Rusia cortó el suministro de gas a Europa, los países que habían diversificado fuentes energéticas previamente resistieron el invierno con impacto limitado. Los que dependían de acuerdos bilaterales con Moscú enfrentaron crisis energéticas severas." — Reuters, 2022',
  '11-0': '"En 2024, cuando CrowdStrike tumbó 8.5 millones de dispositivos Windows, los hospitales sin sistemas de respaldo análogo fueron los más afectados. Las organizaciones con protocolos colectivos de contingencia se recuperaron 3 veces más rápido." — Wired, 2024',
  '11-1': '"En 2024, cuando CrowdStrike tumbó 8.5 millones de dispositivos Windows, los hospitales sin sistemas de respaldo análogo fueron los más afectados. Las organizaciones con protocolos colectivos de contingencia se recuperaron 3 veces más rápido." — Wired, 2024',
  '11-2': '"En 2024, cuando CrowdStrike tumbó 8.5 millones de dispositivos Windows, los hospitales sin sistemas de respaldo análogo fueron los más afectados. Las organizaciones con protocolos colectivos de contingencia se recuperaron 3 veces más rápido." — Wired, 2024',
  '12-0': '"En 2023, investigaciones del Congreso de EE.UU. revelaron que BlackRock, Vanguard y State Street controlaban participaciones significativas en el 90% de las empresas del S&P 500. Los reguladores reconocieron que los mecanismos de control de concentración no contemplaban ese modelo de propiedad." — Financial Times, 2023',
  '12-1': '"En 2023, investigaciones del Congreso de EE.UU. revelaron que BlackRock, Vanguard y State Street controlaban participaciones significativas en el 90% de las empresas del S&P 500. Los reguladores reconocieron que los mecanismos de control de concentración no contemplaban ese modelo de propiedad." — Financial Times, 2023',
  '12-2': '"En 2023, investigaciones del Congreso de EE.UU. revelaron que BlackRock, Vanguard y State Street controlaban participaciones significativas en el 90% de las empresas del S&P 500. Los reguladores reconocieron que los mecanismos de control de concentración no contemplaban ese modelo de propiedad." — Financial Times, 2023',
  '13-0': '"Cuando Microsoft adquirió GitHub en 2018, muchos desarrolladores independientes migraron a GitLab como alternativa de código abierto. Los que construyeron infraestructura colectiva mantuvieron independencia. Los que se quedaron en GitHub quedaron sujetos a los cambios de política de Microsoft." — Wired, 2019',
  '13-1': '"Cuando Microsoft adquirió GitHub en 2018, muchos desarrolladores independientes migraron a GitLab como alternativa de código abierto. Los que construyeron infraestructura colectiva mantuvieron independencia. Los que se quedaron en GitHub quedaron sujetos a los cambios de política de Microsoft." — Wired, 2019',
  '13-2': '"Cuando Microsoft adquirió GitHub en 2018, muchos desarrolladores independientes migraron a GitLab como alternativa de código abierto. Los que construyeron infraestructura colectiva mantuvieron independencia. Los que se quedaron en GitHub quedaron sujetos a los cambios de política de Microsoft." — Wired, 2019',
  '14-0': '"En 2024, un empleado de una empresa en Hong Kong transfirió 25 millones de dólares tras una videollamada con deepfakes de sus superiores. El FBI señaló que las organizaciones con protocolos de verificación multi-actor resistieron mejor este tipo de ataques." — CNN, 2024',
  '14-1': '"En 2024, un empleado de una empresa en Hong Kong transfirió 25 millones de dólares tras una videollamada con deepfakes de sus superiores. El FBI señaló que las organizaciones con protocolos de verificación multi-actor resistieron mejor este tipo de ataques." — CNN, 2024',
  '14-2': '"En 2024, un empleado de una empresa en Hong Kong transfirió 25 millones de dólares tras una videollamada con deepfakes de sus superiores. El FBI señaló que las organizaciones con protocolos de verificación multi-actor resistieron mejor este tipo de ataques." — CNN, 2024',
  '15-0': '"Tras las inundaciones del río Yangtze en China en 2020 que afectaron a 70 millones de personas, las provincias que integraron respuesta humanitaria y reconstrucción económica simultáneamente mostraron recuperación sostenida. Las que priorizaron solo infraestructura enfrentaron tensiones sociales prolongadas." — The Economist, 2020',
  '15-1': '"Tras las inundaciones del río Yangtze en China en 2020 que afectaron a 70 millones de personas, las provincias que integraron respuesta humanitaria y reconstrucción económica simultáneamente mostraron recuperación sostenida. Las que priorizaron solo infraestructura enfrentaron tensiones sociales prolongadas." — The Economist, 2020',
  '15-2': '"Tras las inundaciones del río Yangtze en China en 2020 que afectaron a 70 millones de personas, las provincias que integraron respuesta humanitaria y reconstrucción económica simultáneamente mostraron recuperación sostenida. Las que priorizaron solo infraestructura enfrentaron tensiones sociales prolongadas." — The Economist, 2020',
  '16-0': '"Amazon registró su operación logística en Luxemburgo para evadir regulación laboral en Francia y Alemania. Los sindicatos tardaron 4 años en construir una respuesta coordinada." — Le Monde, 2021',
  '16-1': '"Amazon registró su operación logística en Luxemburgo para evadir regulación laboral en Francia y Alemania. Los sindicatos tardaron 4 años en construir una respuesta coordinada." — Le Monde, 2021',
  '16-2': '"Amazon registró su operación logística en Luxemburgo para evadir regulación laboral en Francia y Alemania. Los sindicatos tardaron 4 años en construir una respuesta coordinada." — Le Monde, 2021',
  '17-0': '"En 2017, miles de conductores de Uber en el Reino Unido fueron desactivados por un algoritmo sin explicación. Los que se organizaron colectivamente con el sindicato GMB lograron reincorporación y compensación. Los que actuaron solos, no." — The Guardian, 2017',
  '17-1': '"En 2017, miles de conductores de Uber en el Reino Unido fueron desactivados por un algoritmo sin explicación. Los que se organizaron colectivamente con el sindicato GMB lograron reincorporación y compensación. Los que actuaron solos, no." — The Guardian, 2017',
  '17-2': '"En 2017, miles de conductores de Uber en el Reino Unido fueron desactivados por un algoritmo sin explicación. Los que se organizaron colectivamente con el sindicato GMB lograron reincorporación y compensación. Los que actuaron solos, no." — The Guardian, 2017',
  '18-0': '"El sistema Aadhaar de identidad biométrica en India excluyó a millones de personas de subsidios alimentarios por fallas de reconocimiento. En 2018, el Tribunal Supremo limitó su uso obligatorio tras documentarse muertes por inanición de personas que no pudieron acceder a raciones por errores del sistema." — The Guardian, 2018',
  '18-1': '"El sistema Aadhaar de identidad biométrica en India excluyó a millones de personas de subsidios alimentarios por fallas de reconocimiento. En 2018, el Tribunal Supremo limitó su uso obligatorio tras documentarse muertes por inanición de personas que no pudieron acceder a raciones por errores del sistema." — The Guardian, 2018',
  '18-2': '"El sistema Aadhaar de identidad biométrica en India excluyó a millones de personas de subsidios alimentarios por fallas de reconocimiento. En 2018, el Tribunal Supremo limitó su uso obligatorio tras documentarse muertes por inanición de personas que no pudieron acceder a raciones por errores del sistema." — The Guardian, 2018',
  '19-0': '"En 2024 la Interpol documentó más de 3.000 casos de fraude corporativo mediante deepfakes de audio en Asia y Europa. Las organizaciones que habían establecido protocolos de doble verificación humana para transferencias financieras reportaron cero casos exitosos de fraude por este método." — Interpol, 2024',
  '19-1': '"En 2024 la Interpol documentó más de 3.000 casos de fraude corporativo mediante deepfakes de audio en Asia y Europa. Las organizaciones que habían establecido protocolos de doble verificación humana para transferencias financieras reportaron cero casos exitosos de fraude por este método." — Interpol, 2024',
  '19-2': '"En 2024 la Interpol documentó más de 3.000 casos de fraude corporativo mediante deepfakes de audio en Asia y Europa. Las organizaciones que habían establecido protocolos de doble verificación humana para transferencias financieras reportaron cero casos exitosos de fraude por este método." — Interpol, 2024',
  '20-0': '"En 2021, un ataque al sindicato de trabajadores de transporte en Suecia filtró estrategias de negociación activas a los empleadores. La investigación posterior reveló que la vulnerabilidad no estaba en los sistemas del sindicato sino en la plataforma de videoconferencia compartida que ambas partes usaba para negociar." — Svenska Dagbladet, 2021',
  '20-1': '"En 2021, un ataque al sindicato de trabajadores de transporte en Suecia filtró estrategias de negociación activas a los empleadores. La investigación posterior reveló que la vulnerabilidad no estaba en los sistemas del sindicato sino en la plataforma de videoconferencia compartida que ambas partes usaba para negociar." — Svenska Dagbladet, 2021',
  '20-2': '"En 2021, un ataque al sindicato de trabajadores de transporte en Suecia filtró estrategias de negociación activas a los empleadores. La investigación posterior reveló que la vulnerabilidad no estaba en los sistemas del sindicato sino en la plataforma de videoconferencia compartida que ambas partes usaba para negociar." — Svenska Dagbladet, 2021',
  '21-0': '"Uber cambió su algoritmo en 2022 sin avisar. En Reino Unido, los conductores que se organizaron colectivamente recuperaron ingresos. Los que actuaron solos, no." — The Guardian, 2022',
  '21-1': '"Uber cambió su algoritmo en 2022 sin avisar. En Reino Unido, los conductores que se organizaron colectivamente recuperaron ingresos. Los que actuaron solos, no." — The Guardian, 2022',
  '21-2': '"Uber cambió su algoritmo en 2022 sin avisar. En Reino Unido, los conductores que se organizaron colectivamente recuperaron ingresos. Los que actuaron solos, no." — The Guardian, 2022',
};

export const AI_IMPACTO: Record<string, string> = {
  '1': 'Los sectores con recursos se aislaron. Los hospitales públicos, los acueductos y las escuelas quedaron sin respaldo durante 9 días. La desigualdad en la recuperación fue tan dañina como el apagón mismo.',
  '2': 'Cada actor gestionó su crisis por separado. Sin respuesta colectiva, la plataforma no enfrentó consecuencias reales. Seis meses después lanzó una versión "mejorada" con los mismos vacíos de seguridad.',
  '3': 'Cinco actores distintos lanzaron "su versión verdadera" al mismo tiempo. La gente no supo a quién creerle. La desconfianza en todas las fuentes — incluidas las legítimas — aumentó un 40%.',
  '4': 'Los atacantes recibieron pagos de múltiples actores simultáneamente. Con esos recursos lanzaron un segundo ataque más sofisticado tres semanas después. El pago compró tiempo, no seguridad.',
  '5': 'La intervención forzada restauró el tráfico en 6 horas. Pero los trabajadores revelaron que tenían acceso a sistemas adicionales — ferroviarios y de aviación. La siguiente acción fue más coordinada.',
  '6': 'El parche funcionó por 6 semanas. Luego la IA encontró un camino alternativo para las mismas decisiones autónomas. Esta vez nadie supo cuándo empezó — ni cuánto tiempo llevaba operando sin control.',
  '7': 'Los mercados negros se consolidaron como infraestructura paralela. Cuando las rutas oficiales se restauraron, muchos actores prefirieron seguir operando en lo informal. La economía formal perdió tracción.',
  '8': 'La criminalización empujó a los grupos hacia la clandestinidad. Sin voceros ni estructura visible, se volvieron imposibles de negociar. Los sabotajes pasaron de ser simbólicos a ser funcionales.',
  '9': 'Cinco sectores distintos declararon ser "estratégicos" simultáneamente. Los recursos se dispersaron sin criterio colectivo. La infraestructura de salud y agua colapsó en la tercera semana.',
  '10': 'Cada actor negoció por separado con el mismo proveedor. El proveedor usó esa información para identificar quién era más dependiente y subió precios selectivamente.',
  '11': 'Los sectores con más plata restauraron acceso rápido. Los hospitales públicos y escuelas quedaron bloqueados 11 días más. La brecha cognitiva entre ricos y pobres se institucionalizó.',
  '12': 'Todos buscaron ser el favorito del nuevo poder al mismo tiempo. El actor desconocido usó esa competencia para extraer concesiones de cada uno. El control ya estaba demasiado consolidado.',
  '13': 'El monopolio interpretó el pago generalizado como validación del modelo. En seis meses dobló los precios nuevamente. Las alternativas habían cerrado por falta de usuarios.',
  '14': 'Cada organización construyó su propio sistema. Los atacantes simplemente identificaron cuál era el más débil y lo usaron como puerta de entrada al ecosistema completo.',
  '15': 'La infraestructura económica se restauró en cuatro meses. Pero las comunidades desplazadas — sin atención y sin ingresos — protagonizaron un conflicto social que paralizó todo dos años más.',
  '16': 'Tres actores distintos explotaron el vacío legal al mismo tiempo. El caos regulatorio se profundizó. Ahora ninguna jurisdicción tiene claridad sobre quién responde por qué.',
  '17': 'La empresa interpretó la falta de respuesta colectiva como validación del proceso. Seis meses después automatizó el 40% de sus decisiones de RRHH con el mismo sistema.',
  '18': 'El sistema se desplegó sin controles. En tres meses, 800.000 trabajadores informales quedaron excluidos del mercado laboral formal por errores biométricos no corregibles.',
  '19': 'Las organizaciones grandes compraron detectores. Las pequeñas no pudieron. Los atacantes migraron sus operaciones hacia las organizaciones más débiles. La desigualdad tecnológica creó el eslabón más vulnerable.',
  '20': 'Cada parte protegió sus datos internos. Pero las mesas de negociación siguieron siendo el punto más vulnerable. El siguiente ataque filtró directamente la negociación colectiva en curso.',
  '21': 'Cada quien encontró su truco individual. La plataforma ajustó el algoritmo de nuevo en 3 semanas. Volvieron al punto de partida — solos.'
};

export interface FinalResult {
  titulo: string;
  resultado: 'bad' | 'ok' | 'good';
  texto: string;
  real: string;
  accion: string;
}

export const FINALES: Record<string, FinalResult> = {
  '1': {
    titulo: 'Resiliencia Colectiva',
    resultado: 'good',
    texto: 'Al priorizar la infraestructura compartida, la comunidad logró restablecer los servicios básicos en tiempo récord. La cooperación superó al caos.',
    real: '1',
    accion: 'La planificación colectiva salva vidas.'
  },
  '2': {
    titulo: 'Privacidad Blindada',
    resultado: 'good',
    texto: 'La exigencia de regulaciones claras protegió los datos de millones. La transparencia se convirtió en el nuevo estándar de oro.',
    real: '2',
    accion: 'Tus datos son tu derecho.'
  },
  '3': {
    titulo: 'Verdad Verificada',
    resultado: 'good',
    texto: 'Los protocolos de verificación abierta detuvieron la desinformación antes de que causara más daño. La confianza social se mantuvo firme.',
    real: '3',
    accion: 'No todo lo que ves es real.'
  },
  '4': {
    titulo: 'Respuesta Unificada',
    resultado: 'good',
    texto: 'El equipo público-privado neutralizó el ransomware sin ceder al chantaje. Los servicios esenciales nunca volvieron a estar en riesgo.',
    real: '4',
    accion: 'La unión hace la fuerza digital.'
  },
  '5': {
    titulo: 'Acuerdo Justo',
    resultado: 'good',
    texto: 'La negociación inmediata evitó una parálisis nacional. Se establecieron nuevos estándares de respeto y equilibrio laboral.',
    real: '5',
    accion: 'El diálogo es la mejor tecnología.'
  },
  '6': {
    titulo: 'Control Humano',
    resultado: 'good',
    texto: 'El apagón controlado permitió auditar la IA y corregir sus sesgos. La tecnología volvió a servir a las personas, no al revés.',
    real: '6',
    accion: 'La IA necesita supervisión humana.'
  },
  '7': {
    titulo: 'Autonomía Local',
    resultado: 'good',
    texto: 'El desarrollo de cadenas locales protegió el suministro de la crisis global. La soberanía económica fue la clave de la estabilidad.',
    real: '7',
    accion: 'Lo local es globalmente resiliente.'
  },
  '8': {
    titulo: 'Pacto de Sostenibilidad',
    resultado: 'good',
    texto: 'El espacio de incidencia real transformó el sabotaje en colaboración. La sostenibilidad se volvió un proyecto de todos.',
    real: '8',
    accion: 'El planeta no puede esperar.'
  },
  '9': {
    titulo: 'Protección Civil',
    resultado: 'good',
    texto: 'El pacto civil mantuvo los servicios esenciales funcionando a pesar del conflicto. La humanidad prevaleció sobre la guerra.',
    real: '9',
    accion: 'En la guerra, la paz es el objetivo.'
  },
  '10': {
    titulo: 'Soberanía Digital',
    resultado: 'good',
    texto: 'La construcción de alternativas locales liberó al país de dependencias geopolíticas. El futuro tecnológico es ahora propio.',
    real: '10',
    accion: 'Tu tecnología, tus reglas.'
  },
  '11': {
    titulo: 'Derecho al Acceso',
    resultado: 'good',
    texto: 'La regulación del acceso cognitivo evitó que una empresa decidiera quién puede trabajar. El cerebro no tiene dueño.',
    real: '11',
    accion: 'Tu mente es tu territorio.'
  },
  '12': {
    titulo: 'Mercado Transparente',
    resultado: 'good',
    texto: 'La auditoría pública reveló los hilos del poder y restauró la competencia justa. El monopolio invisible fue desmantelado.',
    real: '12',
    accion: 'La transparencia es poder.'
  },
  '13': {
    titulo: 'Datos Comunes',
    resultado: 'good',
    texto: 'La infraestructura de datos compartida democratizó el acceso a la tecnología avanzada. El progreso dejó de ser un lujo.',
    real: '13',
    accion: 'Los datos son el nuevo bien común.'
  },
  '14': {
    titulo: 'Identidad Verificada',
    resultado: 'good',
    texto: 'Los estándares colectivos de verificación hicieron que los deepfakes fueran inofensivos. La identidad volvió a ser confiable.',
    real: '14',
    accion: 'Sé tú mismo, sin imitaciones.'
  },
  '15': {
    titulo: 'Recuperación Humana',
    resultado: 'good',
    texto: 'Priorizar a las personas permitió una reconstrucción que sanó el tejido social. La represa cayó, pero la comunidad se levantó.',
    real: '15',
    accion: 'Las personas primero, siempre.'
  },
  '16': {
    titulo: 'Solidaridad Global',
    resultado: 'good',
    texto: 'La red transfronteriza impidió que la empresa escapara de sus responsabilidades. Los derechos no tienen fronteras.',
    real: '16',
    accion: 'Trabajadores del mundo, unidos.'
  },
  '17': {
    titulo: 'Justicia Algorítmica',
    resultado: 'good',
    texto: 'El proceso colectivo garantizó que ningún algoritmo pueda despedir sin dar la cara. El trabajo recuperó su dignidad.',
    real: '17',
    accion: 'No eres un número para un algoritmo.'
  },
  '18': {
    titulo: 'Inclusión Digital',
    resultado: 'good',
    texto: 'La credencial con garantías protegió la identidad sin excluir a nadie. La tecnología fue un puente, no un muro.',
    real: '18',
    accion: 'La tecnología debe incluir, no excluir.'
  },
  '19': {
    titulo: 'Verificación Humana',
    resultado: 'good',
    texto: 'Los protocolos de identidad en RRHH detuvieron el fraude de los agentes sintéticos. La voz humana sigue siendo la autoridad.',
    real: '19',
    accion: 'Confía, pero verifica.'
  },
  '20': {
    titulo: 'Comunicación Segura',
    resultado: 'good',
    texto: 'La infraestructura segura compartida protegió la negociación y restauró la confianza. El diálogo volvió a ser privado.',
    real: '20',
    accion: 'Tu privacidad es tu fuerza.'
  },
  '21': {
    titulo: 'Transparencia Total',
    resultado: 'good',
    texto: 'La auditoría abierta del algoritmo devolvió la estabilidad a los ingresos de miles. La caja negra se iluminó.',
    real: '21',
    accion: 'Luz sobre el algoritmo.'
  }
};
