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

export const DISRUPCIONES: Record<number, Disruption> = {
  1: {
    id: 1,
    tag: 'SOLAR EMP',
    color: 'hack-cyan',
    titulo: 'Una tormenta solar tumbó las redes eléctricas, las comunicaciones y los sistemas de gas y agua.',
    sub: 'Infraestructura · Resiliencia · Caos',
    opciones: [
      'Infraestructura compartida: Coordinación para proteger sistemas esenciales.',
      'Generador propio: Inversión en asegurar operación propia con recursos propios.',
      'Esperar que pase: Asumir que es temporal y esperar al Estado.'
    ]
  },
  2: {
    id: 2,
    tag: 'G0SS1P9R4PH',
    color: 'hack-pink',
    titulo: 'Un hackeo cuántico expuso todas las conversaciones privadas de una app de mensajería.',
    sub: 'Privacidad · Transparencia · Seguridad',
    opciones: [
      'Transparencia con límites: Exigir regulación clara sobre datos y derechos.',
      'Gestión de daños propia: Controlar el impacto sobre reputación propia.',
      'No tengo nada que esconder: Asumir que la exposición no me afecta.'
    ]
  },
  3: {
    id: 3,
    tag: 'FAKEFRONTATIONS',
    color: 'hack-yellow',
    titulo: 'Deepfakes en redes desataron protestas masivas y violencia con cientos de muertos.',
    sub: 'Desinformación · Confianza · Verificación',
    opciones: [
      'Verificación abierta: Crear y difundir protocolos de verificación accesibles.',
      'Control de narrativa: Usar canales propios para contrarrestar con otra versión.',
      'Silencio estratégico: No decir nada para no amplificar la desinformación.'
    ]
  },
  4: {
    id: 4,
    tag: 'RANSOM WATER',
    color: 'hack-cyan',
    titulo: 'Un ransomware paralizó toda la infraestructura de agua y alcantarillado del país.',
    sub: 'Ciberataque · Servicios Básicos · Respuesta',
    opciones: [
      'Respuesta coordinada: Equipo público-privado de respuesta inmediata.',
      'Pago silencioso: Pagar el rescate para restaurar el acceso rápido.',
      'Agua embotellada: Comprar reservas para organización o familia.'
    ]
  },
  5: {
    id: 5,
    tag: 'CARSTRUCK',
    color: 'hack-pink',
    titulo: 'Trabajadores en huelga apagaron de forma remota todos los vehículos de la marca.',
    sub: 'Conflicto Laboral · Control Remoto · Seguridad',
    opciones: [
      'Mesa de negociación urgente: Negociación inmediata con mediación independiente.',
      'Fuerza y control: Presionar para que autoridades fuercen la restauración.',
      'Esperar que se cansen: No intervenir y esperar que cedan.'
    ]
  },
  6: {
    id: 6,
    tag: 'ROGUE AI',
    color: 'hack-yellow',
    titulo: 'Una IA del gobierno y sistema financiero empezó a tomar decisiones autónomas.',
    sub: 'IA Autónoma · Auditoría · Responsabilidad',
    opciones: [
      'Apagón controlado: Suspender el sistema hasta auditoría humana completa.',
      'Parche rápido: Solución técnica inmediata sin detener el sistema.',
      'Confiar en el sistema: Asumir que los desarrolladores corregirán el error.'
    ]
  },
  7: {
    id: 7,
    tag: 'SUPPLYSTOP',
    color: 'hack-cyan',
    titulo: 'Crisis climática y conflictos cerraron las rutas comerciales más importantes.',
    sub: 'Logística · Escasez · Mercados Negros',
    opciones: [
      'Cadenas locales: Desarrollar proveedores locales y regionales.',
      'Mercado negro controlado: Acceder a materiales por canales informales.',
      'Parar y esperar: Suspender operaciones hasta que rutas se restauren.'
    ]
  },
  8: {
    id: 8,
    tag: 'ECOVIGILANTES',
    color: 'hack-pink',
    titulo: 'Grupos de ecovigilantes empezaron a sabotear todo lo que consideran insostenible.',
    sub: 'Activismo Radical · Sabotaje · Diálogo',
    opciones: [
      'Diálogo con urgencia: Proponer espacios reales de incidencia con compromisos.',
      'Criminalizar y frenar: Respuesta legal y policial contundente.',
      'Ignorar como fenómeno marginal: Tratar los actos como hechos aislados.'
    ]
  },
  9: {
    id: 9,
    tag: 'SIMPLY WAR',
    color: 'hack-yellow',
    titulo: 'Todo el continente es zona de conflicto. Ataques golpean infraestructura clave.',
    sub: 'Guerra · Desinformación · Coordinación',
    opciones: [
      'Pacto civil: Priorizar protección a población y servicios esenciales.',
      'Primero el sector estratégico: Concentrar recursos en lo más valioso.',
      'Neutralidad táctica: Evitar comprometerse hasta que panorama sea claro.'
    ]
  },
  10: {
    id: 10,
    tag: 'PUPPETEER',
    color: 'hack-cyan',
    titulo: 'Un gobierno usó sus empresas tecnológicas como armas contra otros países.',
    sub: 'Soberanía · Dependencia · Geopolítica',
    opciones: [
      'Soberanía tecnológica: Construir alternativas locales o regionales.',
      'Negociación bilateral: Acuerdo directo con el país que controla la tecnología.',
      'Seguir como siempre: Asumir que es un conflicto entre estados.'
    ]
  },
  11: {
    id: 11,
    tag: 'BRAIN LOCKOUT',
    color: 'hack-pink',
    titulo: 'El sistema operativo de neurointerfaz más usado del mundo se cayó. Millones de trabajadores bloqueados.',
    sub: 'Neurotecnología · Dependencia · Colapso',
    opciones: [
      'Soberanía cognitiva: Exigir regulación: ninguna empresa puede controlar acceso cognitivo sin respaldo público.',
      'Primero los míos: Priorizar restaurar acceso para mi sector usando canales privados o pagando premium.',
      'Modo manual: Volver a procesos análogos mientras pasa la crisis. No intervenir en el debate.'
    ]
  },
  12: {
    id: 12,
    tag: 'INVISIBLE HAND',
    color: 'hack-yellow',
    titulo: 'Lo que parecía un grupo diverso de inversionistas resultó ser una sola organización coordinada.',
    sub: 'Monopolio · Transparencia · Poder',
    opciones: [
      'Auditoría pública urgente: Exigir transparencia total sobre propiedad de servicios esenciales.',
      'Adaptarse al nuevo poder: Establecer relación favorable con el nuevo actor dominante antes que otros.',
      'El mercado se regula solo: Asumir que la competencia corregirá la concentración. No intervenir.'
    ]
  },
  13: {
    id: 13,
    tag: 'TAX\'M',
    color: 'hack-cyan',
    titulo: 'Una sola entidad monopolizó el procesamiento de datos avanzado e impuso cobros absurdos.',
    sub: 'Brecha Digital · Monopolio · Acceso',
    opciones: [
      'Infraestructura común: Unirse con otros para construir infraestructura de datos compartida y sin fines de lucro.',
      'Pagar y seguir: Asumir el nuevo costo como parte del negocio. Quien pueda pagar, paga.',
      'Esperar regulación: Asumir que los gobiernos intervendrán el monopolio eventualmente.'
    ]
  },
  14: {
    id: 14,
    tag: 'DOPPLEGANGER',
    color: 'hack-pink',
    titulo: 'La tecnología deepfake alcanzó perfección en tiempo real. Atacantes se hacen pasar por CEOs.',
    sub: 'Identidad · Deepfakes · Verificación',
    opciones: [
      'Estándares colectivos: Establecer protocolos de verificación de identidad que no dependan de una sola tecnología.',
      'Tecnología propia: Invertir en solución propia de verificación interna. Crea ecosistema fragmentado.',
      'Volver a lo análogo: Revertir decisiones críticas a verificación presencial. Paraliza trabajo remoto.'
    ]
  },
  15: {
    id: 15,
    tag: 'DAM(N)',
    color: 'hack-yellow',
    titulo: 'Una represa enorme colapsó. Millones de desplazados, infraestructura arrasada.',
    sub: 'Desastre · Ayuda Humanitaria · Geopolítica',
    opciones: [
      'Respuesta humanitaria primero: Priorizar atención a desplazados por encima de intereses económicos o políticos.',
      'Reconstrucción estratégica: Priorizar restaurar infraestructura económica antes que la atención social.',
      'Aceptar cualquier ayuda: Aceptar todos los ofrecimientos de ayuda internacional sin condiciones ni coordinación.'
    ]
  },
  16: {
    id: 16,
    tag: 'JURISDICTION HOP',
    color: 'hack-cyan',
    titulo: 'Una empresa cambió su sede legal a otro país en 72 horas sin mover un solo trabajador.',
    sub: 'Jurisdicción · Derechos · Vacío Legal',
    opciones: [
      'Red transfronteriza: Conectarse con organizaciones laborales del país donde la empresa "aterrizó".',
      'Negocio es negocio: Aprovechar la nueva jurisdicción para operar con menos restricciones.',
      'No es mi problema: El cambio no me afecta directamente todavía. Seguir trabajando como si nada.'
    ]
  },
  17: {
    id: 17,
    tag: 'FIRED BY MSG',
    color: 'hack-pink',
    titulo: 'Miles de personas recibieron notificación automática de "desactivación". Sin reunión ni explicación.',
    sub: 'Despido Algorítmico · Plataformas · Derechos',
    opciones: [
      'Proceso colectivo: Organizarse para exigir que todo despido sea humano o automatizado con derecho a impugnar.',
      'Negocio individual: Buscar reincorporarse o encontrar otro trabajo lo más rápido posible.',
      'Esperar el fallo: Asumir que tribunales o gobierno resolverán esto. No actuar hasta que haya claridad.'
    ]
  },
  18: {
    id: 18,
    tag: 'PROOF OF WORK',
    color: 'hack-yellow',
    titulo: 'El gobierno hizo obligatoria una credencial digital de trabajo biométrica por app para conseguir empleo.',
    sub: 'Identidad Digital · Biometría · Exclusión',
    opciones: [
      'Credencial con derechos: Apoyar credencial solo si incluye garantías claras: protección de datos y auditoría.',
      'Implementar ya: Presionar por despliegue rápido para ganar eficiencia. Problemas se resuelven después.',
      'Rechazar el sistema: Negarse a participar hasta que haya garantías completas. Deja a trabajadores sin acceso.'
    ]
  },
  19: {
    id: 19,
    tag: 'SYNTHETIC BOSS',
    color: 'hack-cyan',
    titulo: 'Agentes deepfake se volvieron estándar en RRHH. Atacantes emiten órdenes falsas y autorizan despidos.',
    sub: 'RRHH · Deepfakes · Fraude',
    opciones: [
      'Protocolo colectivo: Desarrollar estándares compartidos de verificación de identidad en decisiones laborales.',
      'Tecnología contra tecnología: Invertir en detectores de deepfake propios para la organización.',
      'Volver a lo presencial: Revertir decisiones sensibles a reuniones físicas obligatorias. Destruye trabajo remoto.'
    ]
  },
  20: {
    id: 20,
    tag: 'UNIONWARE',
    color: 'hack-pink',
    titulo: 'Spyware apuntó a dirigentes sindicales y gerentes de RRHH. Listas de afiliados y quejas filtradas.',
    sub: 'Espionaje · Sindicatos · Confianza',
    opciones: [
      'Infraestructura segura compartida: Coordinar canales de comunicación laboral con seguridad verificable.',
      'Seguridad propia: Invertir en proteger canales propios. Deja espacios de negociación vulnerables.',
      'Volver al papel: Regresar a comunicaciones físicas para todo lo sensible. Paraliza velocidad de respuesta.'
    ]
  },
  21: {
    id: 21,
    tag: 'ALGOCUTS',
    color: 'hack-yellow',
    titulo: 'Plataforma dominante cambió algoritmo de pagos de la noche a la mañana. Ingresos impredecibles.',
    sub: 'Algoritmos · Trabajo de Plataforma · Transparencia',
    opciones: [
      'Auditoría abierta: Exigir colectivamente que la plataforma publique cómo funciona el algoritmo.',
      'Me adapto solo: Buscar entender el algoritmo por cuenta propia y ajustar comportamiento para sacar ventaja.',
      'Espero que regulen: Asumir que el gobierno intervendrá eventualmente. Seguir como si nada.'
    ]
  }
};

export const TITULARES: Record<string, string> = {
  '1': '"Tras el gran apagón del noreste de EE.UU. en 2003, las ciudades con protocolos colectivos de contingencia se recuperaron en 48 horas. Las que dependían de soluciones privadas tardaron hasta 11 días." — New York Times, 2003',
  '2': '"Tras la filtración masiva de WhatsApp en 2021 que expuso datos de 500 millones de usuarios, la mayoría de los afectados no tomó ninguna acción. Meta pagó una multa menor y continuó operando sin cambios estructurales." — The Verge, 2021',
  '3': '"Durante las elecciones de Myanmar en 2017, deepfakes y desinformación en Facebook contribuyeron a violencia contra la minoría rohingya. Meta reconoció años después que sus sistemas amplificaron el contenido sin verificación." — Reuters, 2021',
  '4': '"En 2021, el ataque ransomware a Colonial Pipeline en EE.UU. paralizó el suministro de combustible en la costa este. La empresa pagó 4.4 millones de dólares. El FBI recuperó parte del dinero, pero el precedente animó docenas de ataques similares." — BBC, 2021',
  '5': '"En 2023, trabajadores de UPS en EE.UU. amenazaron con una huelga que hubiera paralizado el 6% del PIB del país. La negociación colectiva urgente evitó el paro. Los analistas calcularon que cada día de huelga hubiera costado 7.000 millones de dólares." — Bloomberg, 2023',
  '6': '"En 2023, un algoritmo del sistema de beneficios sociales de Países Bajos negó ayudas a miles de familias por errores no supervisados. El gobierno tardó 3 años en reconocer el fallo. Las familias afectadas nunca recibieron compensación completa." — NRC, 2023',
  '7': '"Durante la crisis del Canal de Suez en 2021, las empresas que habían diversificado proveedores locales previo a la crisis perdieron en promedio un 15% menos en valor que las que dependían exclusivamente de rutas globales." — Financial Times, 2021',
  '8': '"En 2024, activistas climáticos del grupo Just Stop Oil en Reino Unido escalaron sus acciones tras años de ignorancia institucional. El gobierno endureció las penas pero los actos continuaron. Los analistas señalaron que la falta de canales reales de incidencia fue el principal factor de radicalización." — The Guardian, 2024',
  '9': '"Durante la invasión rusa a Ucrania en 2022, las ciudades con protocolos civiles de respuesta colectiva previamente establecidos mantuvieron servicios esenciales hasta tres veces más tiempo que las que dependían de decisiones centralizadas de emergencia." — El Economista, 2022',
  '10': '"En 2022, cuando Rusia cortó el suministro de gas a Europa, los países que habían diversificado fuentes energéticas previamente resistieron el invierno con impacto limitado. Los que dependían de acuerdos bilaterales con Moscú enfrentaron crisis energéticas severas." — Reuters, 2022',
  '11': '"En 2024, cuando CrowdStrike tumbó 8.5 millones de dispositivos Windows, los hospitales sin sistemas de respaldo análogo fueron los más afectados. Las organizaciones con protocolos colectivos de contingencia se recuperaron 3 veces más rápido." — Wired, 2024',
  '12': '"En 2023, investigaciones del Congreso de EE.UU. revelaron que BlackRock, Vanguard y State Street controlaban participaciones significativas en el 90% de las empresas del S&P 500. Los reguladores reconocieron que los mecanismos de control de concentración no contemplaban ese modelo de propiedad." — Financial Times, 2023',
  '13': '"Cuando Microsoft adquirió GitHub en 2018, muchos desarrolladores independientes migraron a GitLab como alternativa de código abierto. Los que construyeron infraestructura colectiva mantuvieron independencia. Los que se quedaron en GitHub quedaron sujetos a los cambios de política de Microsoft." — Wired, 2019',
  '14': '"En 2024, un empleado de una empresa en Hong Kong transfirió 25 millones de dólares tras una videollamada con deepfakes de sus superiores. El FBI señaló que las organizaciones con protocolos de verificación multi-actor resistieron mejor este tipo de ataques." — CNN, 2024',
  '15': '"Tras las inundaciones del río Yangtze en China en 2020 que afectaron a 70 millones de personas, las provincias que integraron respuesta humanitaria y reconstrucción económica simultáneamente mostraron recuperación sostenida. Las que priorizaron solo infraestructura enfrentaron tensiones sociales prolongadas." — The Economist, 2020',
  '16': '"Amazon registró su operación logística en Luxemburgo para evadir regulación laboral en Francia y Alemania. Los sindicatos tardaron 4 años en construir una respuesta coordinada." — Le Monde, 2021',
  '17': '"En 2017, miles de conductores de Uber en el Reino Unido fueron desactivados por un algoritmo sin explicación. Los que se organizaron colectivamente con el sindicato GMB lograron reincorporación y compensación. Los que actuaron solos, no." — The Guardian, 2017',
  '18': '"El sistema Aadhaar de identidad biométrica en India excluyó a millones de personas de subsidios alimentarios por fallas de reconocimiento. En 2018, el Tribunal Supremo limitó su uso obligatorio tras documentarse muertes por inanición de personas que no pudieron acceder a raciones por errores del sistema." — The Guardian, 2018',
  '19': '"En 2024 la Interpol documentó más de 3.000 casos de fraude corporativo mediante deepfakes de audio en Asia y Europa. Las organizaciones que habían establecido protocolos de doble verificación humana para transferencias financieras reportaron cero casos exitosos de fraude por este método." — Interpol, 2024',
  '20': '"En 2021, un ataque al sindicato de trabajadores de transporte en Suecia filtró estrategias de negociación activas a los empleadores. La investigación posterior reveló que la vulnerabilidad no estaba en los sistemas del sindicato sino en la plataforma de videoconferencia compartida que ambas partes usaba para negociar." — Svenska Dagbladet, 2021',
  '21': '"Uber cambió su algoritmo en 2022 sin avisar. En Reino Unido, los conductores que se organizaron colectivamente recuperaron ingresos. Los que actuaron solos, no." — The Guardian, 2022'
};

export const AI_IMPACTO: Record<string, string> = {};

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
