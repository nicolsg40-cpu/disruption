console.log("constants.ts: module load");
export interface Disruption {
  id: number;
  tag: string;
  color: string;
  titulo: string;
  sub: string;
}

export const DISRUPCIONES: Record<number, Disruption> = {
  1: {
    id: 1,
    tag: 'El gran traslado',
    color: 'hack-red',
    titulo: 'Tu empresa movió tu trabajo a otro país en 72 horas',
    sub: 'Offshoring digital · derechos laborales'
  },
  2: {
    id: 2,
    tag: 'Desactivado',
    color: 'hack-red',
    titulo: 'Una notificación borró tu trabajo mientras dormías',
    sub: 'Plataformas · despido algorítmico'
  },
  3: {
    id: 3,
    tag: 'The Scab',
    color: 'hack-red',
    titulo: 'Tu huelga duró 6 horas. Una app consiguió reemplazantes del otro lado del mundo antes del almuerzo.',
    sub: 'Rompehuelgas digital · organización colectiva · poder de negociación'
  },
  4: {
    id: 4,
    tag: 'Borderless Pickett',
    color: 'hack-red',
    titulo: 'Tu empresa tercerizó tu trabajo al extranjero en días. El motivo: pediste mejores condiciones.',
    sub: 'Offshoring digital · sindicalismo · jurisdicción laboral'
  },
  5: {
    id: 5,
    tag: 'Credential Jam',
    color: 'hack-red',
    titulo: 'Tus títulos y licencias dejaron de valer de un día para otro. No puedes trabajar.',
    sub: 'Reconocimiento de credenciales · mercados informales · caos sectorial'
  },
  10: {
    id: 10,
    tag: 'Unionware',
    color: 'hack-red',
    titulo: 'Hackearon a los líderes sindicales. Todo — bases de datos, negociaciones, casos — está filtrado.',
    sub: 'Ciberseguridad laboral · organización sindical · confianza digital'
  },
  11: {
    id: 11,
    tag: 'Algocuts',
    color: 'hack-red',
    titulo: 'La plataforma cambió su algoritmo sin avisar. Tus ingresos cayeron a la mitad esta semana.',
    sub: 'Algoritmos de pago · trabajo de plataforma · opacidad digital'
  }
};

export const TITULARES: Record<string, string> = {
  '1-1': '"Practicantes de diseño en Bogotá pierden contratos — reemplazados por estudio en Mumbai que cobra la mitad. \'Ni siquiera nos avisaron\', dice joven de 21 años."',
  '1-2': '"Call center de Cali traslada 800 puestos a Filipinas en 4 días tras amenaza de paro. \'Es una represalia\', denuncian trabajadores."',
  '1-3': '"Plataforma lanza operación con conductores remotos — tarifas locales caen 40% en una semana. \'Ya no alcanza ni pa\' la gasolina\'."',
  '1-4': '"Sindicato de contadores denuncia traslado masivo tras negociación fallida. \'Usaron el offshoring como arma en la mesa\'."',
  '2-1': '"4.200 jóvenes pierden trabajos part-time de un solo golpe. \'Llevaba 8 meses, ahora ni puedo apelar\', dice estudiante de 19 años."',
  '2-2': '"Plataforma desactiva cuentas colombianas masivamente. Afectados perdieron clientes y reputación acumulada en años — sin explicación."',
  '2-3': '"Empresa desactiva 3.800 repartidores en una noche. Sin aviso, sin cesantías. \'El algoritmo me despidió mientras dormía\'."',
  '2-4': '"Organización intenta demandar desactivación masiva — pero no encuentra a quién. Empresa en Irlanda, servidor en EE.UU., trabajador en Soacha."',
  '3-1': '"Paro estudiantil pierde fuerza en horas: plataforma activa equipo remoto de reemplazo antes del almuerzo. \'Ni sabíamos que eso era posible\', dice vocera del movimiento."',
  '3-2': '"Desarrolladores en huelga reemplazados por equipo en Argentina en menos de 24 horas. La negociación que duró semanas — irrelevante en un día."',
  '3-3': '"Paro de repartidores en Bogotá: app activa \'modo contingencia\' con conductores remotos. El paro no paró nada — y hay sanciones a quienes participaron."',
  '3-4': '"Sindicato denuncia uso de plataforma de rompehuelgas durante negociación colectiva. \'Nos sentamos a negociar mientras ya nos reemplazaban por fuera\'."',
  '4-1': '"Practicantes de diseño en Bogotá pierden contratos — reemplazados por estudio en Mumbai que cobra la mitad. \'Nadie nos llamó, solo dejaron de asignarnos tareas\'."',
  '4-2': '"Desarrolladores de Medellín denuncian traslado masivo tras exigir aumento: \'Amenazaron con reemplazarnos y lo cumplieron en 72 horas\'."',
  '4-3': '"Conductores de plataforma ven cómo zonas enteras se asignan a flotas extranjeras remotas. \'No entiendo cómo alguien de otro país maneja rutas de mi barrio\'."',
  '4-4': '"Federación de trabajadores denuncia que negativa a ceder en paritaria activó relocalización internacional: \'Usaron el traslado como represalia\'."',
  '5-1': '"Recién egresados de medicina y enfermería en limbo: nueva reglamentación no reconoce sus títulos de universidades privadas. \'Estudié 6 años y ahora no puedo ejercer\'."',
  '5-2': '"Ingenieros de software con certificaciones internacionales no pueden firmar proyectos: el COPNIA anuncia revisión obligatoria de todas las credenciales digitales."',
  '5-3': '"Miles de conductores de carga y transporte público deben re-certificarse en 30 días o perder su licencia. Las escuelas de conducción colapsaron."',
  '5-4': '"Líderes gremiales de salud y construcción exigen prórroga: \'El gobierno invalidó credenciales sin dar ruta clara. La gente no puede trabajar\'."',
  '10-1': '"Bases de datos de afiliados juveniles a sindicatos universitarios filtradas en foro anónimo. Incluye nombres, cédulas y posiciones en negociaciones."',
  '10-2': '"Correos de negociación colectiva de gremio de trabajadores digitales hackeados y publicados. \'Nuestra estrategia entera está en manos de la empresa\'."',
  '10-3': '"Grupo de WhatsApp de líderes de repartidores intervenido: alguien filtraba las convocatorias de paro antes de que se hicieran públicas."',
  '10-4': '"Presidenta de federación sindical denuncia espionaje digital: \'Nos hackearon el correo, el Drive y el Telegram. Encontramos spyware en tres computadores\'."',
  '11-1': '"Estudiante que hacía entregas para pagar la carrera ve sus ingresos caer 45% sin explicación. La app dice que su \'puntuación de eficiencia\' bajó. No sabe cómo ni por qué."',
  '11-2': '"Freelancers en plataformas internacionales denuncian caída súbita en asignación de proyectos tras actualización silenciosa del algoritmo de matching."',
  '11-3': '"Miles de repartidores reportan que la app les asigna menos pedidos en horas pico tras actualización. \'Antes hacía 8 domicilios por hora; ahora me dan 3\'."',
  '11-4': '"Líderes de asociaciones de plataformas exigen auditoría: \'El algoritmo es nuestro patrón y no tenemos derecho a verlo ni a cuestionarlo\'."'
};

export const AI_IMPACTO: Record<string, string> = {
  'bolsillo-1': '"Ojo: cuando los empleos se van digitalmente, también quiebran las cafeterías y el transporte del barrio. Una empresa que se va en línea puede hundir una economía local sin que nadie lo llame cierre."',
  'bolsillo-2': '"Ojo: la desactivación no solo quita el ingreso — borra el historial. Los años de experiencia desaparecen con la cuenta. Empezar de cero significa tarifas de novato en todas las plataformas."',
  'bolsillo-3': '"Ojo: si la huelga no detiene la producción, pierde toda su función económica. Sin esa palanca, los salarios los fija unilateralmente el empleador — y el piso siempre baja."',
  'bolsillo-4': '"Ojo: cuando la amenaza de traslado existe, las empresas no necesitan ejecutarla para ganar poder. Los trabajadores bajan sus exigencias solos — antes de que haya ninguna negociación formal."',
  'bolsillo-5': '"Ojo: cuando los títulos dejan de valer, no solo se pierde el empleo formal — también colapsa el mercado informal de certificaciones exprés, que suele ser más caro, más rápido y mucho menos confiable."',
  'bolsillo-10': '"Ojo: cuando hackean una negociación sindical, la empresa conoce la posición mínima aceptable de los trabajadores antes de sentarse a negociar. No es espionaje abstracto — es robo de poder de negociación con impacto directo en salarios."',
  'bolsillo-11': '"Ojo: cuando el algoritmo decide tus ingresos y nadie puede explicarlo, no hay con quién negociar un aumento. El jefe es una caja negra — y las cajas negras no reciben quejas ni firman acuerdos colectivos."',
  'cabeza-1': '"Ojo: la amenaza de traslado no necesita ejecutarse. Con que exista la posibilidad, los trabajadores se autocensuran — no piden aumentos, no se organizan. El miedo es el mecanismo."',
  'cabeza-2': '"Ojo: cuando una notificación puede borrarte laboralmente sin explicación, los jóvenes aprenden a no comprometerse ni a confiar. Esa desconfianza tiene un costo social enorme que nadie mide."',
  'cabeza-3': '"Ojo: cuando una acción colectiva falla visiblemente, destruye la confianza en la organización misma. La próxima vez alguien dirá \'¿para qué, si no sirve?\' Ese escepticismo es el objetivo real de la plataforma de rompehuelgas."',
  'cabeza-4': '"Ojo: sentir que tu trabajo puede irse al extranjero en cualquier momento genera ansiedad crónica que cambia cómo te relacionas con tu empleo. Muchos renuncian antes de que los trasladen — el miedo hace el trabajo solo."',
  'cabeza-5': '"Ojo: años de estudio invalidados de un día para otro no es solo una crisis económica — es una crisis de identidad. La sensación de que el esfuerzo no sirve tiene consecuencias en salud mental que duran décadas."',
  'cabeza-10': '"Ojo: saber que tus comunicaciones internas pueden estar siendo monitoreadas cambia lo que dices, cómo te organizas y a quién le tienes confianza. La vigilancia no necesita ser constante para ser efectiva — basta con que sea posible."',
  'cabeza-11': '"Ojo: trabajar sin saber qué comportamiento te da más o menos trabajo crea ansiedad de rendimiento constante. Los trabajadores de plataforma describen revisar la app cada cinco minutos intentando entender una lógica que no tienen derecho a conocer."',
  'derechos-1': '"Ojo: Colombia puede tener los mejores derechos laborales del mundo — y ser imposible hacerlos cumplir si el empleador está en otro continente operando bajo otra jurisdicción."',
  'derechos-2': '"Ojo: si los términos de servicio reemplazan al contrato, las garantías constitucionales quedan suspendidas. La empresa no incumple la ley — opera en un vacío donde la ley todavía no llegó."',
  'derechos-3': '"Ojo: el derecho a huelga está en la Constitución colombiana — pero si tecnológicamente puede neutralizarse sin violar ninguna ley, ese derecho queda en el papel. La plataforma no lo prohíbe — lo hace irrelevante."',
  'derechos-4': '"Ojo: si la empresa está en otro país pero el trabajo se hace aquí, ¿qué ley aplica? El traslado digital no solo mueve tareas — mueve la jurisdicción y deja los derechos laborales colombianos sin dientes."',
  'derechos-5': '"Ojo: si el Estado puede invalidar credenciales sin ruta clara ni compensación, la confianza en las instituciones queda rota. La gente deja de apostarle a los títulos oficiales y busca atajos informales — y eso lo paga toda la sociedad."',
  'derechos-10': '"Ojo: si los líderes sindicales no pueden comunicarse de forma segura, el derecho de asociación queda condicionado a tener recursos de ciberseguridad que la mayoría de sindicatos colombianos no tiene. Es una brecha de poder disfrazada de problema técnico."',
  'derechos-11': '"Ojo: si el algoritmo es el patrón, ¿a quién se demanda cuando te bajan los ingresos sin razón? ¿Quién responde por el despido algorítmico? El derecho laboral colombiano no tiene respuesta para eso todavía — y las plataformas lo saben perfectamente."'
};

export const CADENAS: Record<string, string[]> = {
  'leyes-1': ['Los traslados son una amenaza', 'Se normalizan como práctica estándar', 'Pedir aumento = pedir que te reemplacen'],
  'leyes-2': ['Las desactivaciones son excepcionales', 'Se vuelven la forma de \'reestructurar\'', 'Ningún trabajador tiene estabilidad real'],
  'leyes-3': ['Los esquiroles digitales son novedad', 'Se normalizan como "continuidad operativa"', 'La huelga existe en el papel, no en la práctica'],
  'leyes-4': ['El traslado es una amenaza implícita en toda negociación', 'Las empresas lo usan abiertamente en cada paritaria', 'Organizarse = pedir que te reemplacen desde el exterior'],
  'leyes-5': ['Los títulos quedan en limbo legal sin ruta', 'Aparecen certificaciones exprés sin regulación', 'El mercado informal de credenciales supera al oficial'],
  'leyes-10': ['No hay ley que proteja comunicaciones sindicales', 'Las filtraciones no tienen consecuencias legales claras', 'El espionaje laboral digital opera en zona gris permanente'],
  'leyes-11': ['El algoritmo opera sin obligación de transparencia', 'Las decisiones de pago y asignación no son auditables', 'La plataforma fija condiciones laborales sin ninguna regulación'],
  'acceso-1': ['Pocos saben que esto está pasando', 'Solo los conectados pueden defenderse', 'Saber o no saber = la nueva línea de clase'],
  'acceso-2': ['Afectados no saben que pueden demandar', 'Solo con recursos se navega la protección', 'El riesgo de desactivación lo asumen los pobres solos'],
  'acceso-3': ['Trabajadores organizan con WhatsApp', 'Empresas coordinan con plataformas globales en segundos', 'La asimetría tecnológica hace imposible cualquier paro efectivo'],
  'acceso-4': ['Los trabajadores no saben que el traslado es legal', 'Solo los más informados pueden anticiparse', 'La ignorancia del mecanismo es la herramienta del empleador'],
  'acceso-5': ['Quienes tienen recursos re-certifican rápido', 'Los demás quedan fuera del mercado formal por meses', 'La credencial se convierte en privilegio de quienes pueden pagarse el proceso'],
  'acceso-10': ['Sindicatos con recursos migran a plataformas seguras', 'Los demás siguen en canales vulnerables por necesidad', 'La brecha de ciberseguridad reproduce y amplifica la brecha de poder'],
  'acceso-11': ['Solo quienes entienden el algoritmo optimizan su comportamiento', 'Los demás trabajan más horas por menos sin entender por qué', 'El conocimiento del sistema se convierte en ventaja inasequible para la mayoría'],
  'union-1': ['Cada trabajador negocia solo', 'Los que resisten son los que aceptan menos', 'El estándar lo fija el país con peores condiciones'],
  'union-2': ['Demandas individuales se pierden', 'Plataformas aprenden el umbral sin consecuencias', 'Desactivación masiva sin respuesta posible'],
  'union-3': ['Cada gremio enfrenta la plataforma solo', 'Los más vulnerables ceden primero', 'La fragmentación se convierte en la herramienta más poderosa del empleador'],
  'union-4': ['Cada sector enfrenta el offshoring solo', 'El que cede primero baja el piso para todos', 'La amenaza de traslado reemplaza cualquier negociación colectiva real'],
  'union-5': ['Cada profesión enfrenta la crisis por separado', 'Sin frente común, cada gremio negocia condiciones distintas', 'La fragmentación hace imposible una solución sistémica que llegue a todos'],
  'union-10': ['La desconfianza interna paraliza la organización', 'Los miembros dejan de compartir información con sus propios líderes', 'El sindicato existe en papel pero pierde su capacidad de acción real'],
  'union-11': ['Cada trabajador enfrenta al algoritmo solo', 'Sin datos colectivos, es imposible demostrar discriminación sistemática', 'La atomización digital hace imposible la negociación colectiva tradicional']
};

export const SPARKS: Record<number, string[]> = {
  1: ['Buscar aliados en mi sector antes de pedir aumentos', 'Exigir contrato que fije dónde se puede hacer mi trabajo', 'Organizar a compañeros para que la demanda sea colectiva'],
  2: ['Exigir contrato real desde el primer día, aunque sea incómodo', 'Guardar pruebas de mi trabajo fuera de la app, siempre', 'Buscar otros trabajadores de la misma plataforma antes de que pase algo'],
  3: [
    'Construir alianzas con otros sectores antes de cualquier paro',
    'Hacer visible en tiempo real lo que la plataforma está haciendo',
    'Exigir una ley que prohíba reemplazos digitales durante negociación'
  ],
  4: [
    'Exigir cláusula en mi contrato que prohíba reemplazos en el exterior',
    'Construir red con trabajadores del mismo sector antes de negociar',
    'Documentar cada amenaza de traslado como práctica sindical ilegal'
  ],
  5: [
    'Exigir al gremio una ruta colectiva de re-certificación con plazos reales',
    'Crear red de alerta temprana entre egresados del mismo campo',
    'Demandar que el Estado acompañe cualquier invalidación con programas de transición'
  ],
  10: [
    'Migrar todas las comunicaciones sindicales a plataformas cifradas hoy',
    'Capacitar a líderes en seguridad digital antes de la próxima negociación',
    'Exigir que las comunicaciones sindicales tengan protección legal como secreto profesional'
  ],
  11: [
    'Exigir que la plataforma explique por escrito cómo funciona el algoritmo de pagos',
    'Registrar colectivamente las variaciones de ingreso para demostrar el patrón',
    'Demandar auditoría independiente del algoritmo como condición para seguir operando'
  ]
};

export interface FinalResult {
  titulo: string;
  resultado: 'bad' | 'ok' | 'good';
  texto: string;
  real: string;
  accion: string;
}

export const FINALES: Record<string, FinalResult> = {
  '1-leyes': {
    titulo: 'Tu contrato, su regla',
    resultado: 'bad',
    texto: 'Sin regulación transfronteriza, el traslado de tu trabajo es legal y silencioso. En 3 años pedir un aumento equivaldrá a firmar tu propio reemplazo — y nadie podrá llamarlo despido.',
    real: 'Colombia no tiene ley que regule los contratos de trabajo remoto transfronterizo. El proyecto de ley de plataformas digitales lleva 3 años en el Congreso sin aprobarse.',
    accion: 'Puedes apoyar este proyecto ahora mismo.'
  },
  '1-acceso': {
    titulo: 'Quien sabe, sobrevive',
    resultado: 'ok',
    texto: 'La información es la primera línea de defensa. Sin acceso a asesoría laboral digital, los más vulnerables no saben que esto está pasando hasta que ya les pasó.',
    real: 'Solo el 34% de los trabajadores colombianos de plataformas conoce sus derechos laborales. La brecha informativa es tan determinante como la brecha de ingresos.',
    accion: 'Conectividad Significativa trabaja en esto. Tu opinión importa.'
  },
  '1-union': {
    titulo: 'Solo contra la plataforma global',
    resultado: 'bad',
    texto: 'Cuando cada trabajador negocia individualmente, el poder de presión es cero. El estándar laboral del sector lo termina fijando el país con las peores condiciones — no el mejor.',
    real: 'En Colombia los sindicatos del sector digital representan menos del 4% de los trabajadores de plataformas. La organización colectiva digital está en pañales.',
    accion: 'Hay organizaciones construyendo esto. Conéctate.'
  },
  '2-leyes': {
    titulo: 'Términos de servicio = tu contrato',
    resultado: 'bad',
    texto: 'Sin ley que regule el despido algorítmico, una actualización de términos puede borrarte laboralmente en segundos. No hay preaviso, no hay liquidación, no hay recurso.',
    real: 'En Colombia las plataformas digitales operan bajo contratos de servicios, no laborales. El Código Sustantivo del Trabajo no aplica. Ninguna ley regula la "desactivación".',
    accion: 'Este vacío legal se puede cerrar. Lee el proyecto y opina.'
  },
  '2-acceso': {
    titulo: 'Invisible sin saberlo',
    resultado: 'ok',
    texto: 'Millones de trabajadores de plataforma no saben que pueden demandar, ni a quién, ni cómo. Sin esa información, el sistema de protección existe en el papel — para nadie.',
    real: 'El 67% de los trabajadores desactivados en Colombia nunca intentó apelar — no porque no quisieran, sino porque no sabían que era posible.',
    accion: 'Conectividad Significativa trabaja en cerrar esta brecha. Súmate.'
  },
  '2-union': {
    titulo: 'La fuerza del número',
    resultado: 'good',
    texto: 'Cuando miles de desactivaciones se documentan juntas, dejan de ser errores técnicos y se convierten en evidencia de una práctica sistemática. El volumen es el argumento.',
    real: 'En España, la "Ley Rider" nació de la organización colectiva de repartidores. En Colombia ese proceso está empezando. Tú puedes ser parte.',
    accion: 'Únete a la red de trabajadores de plataformas.'
  },
  '3-leyes': {
    titulo: 'El derecho que no tiene dientes',
    resultado: 'bad',
    texto: 'El derecho a huelga está en la Constitución colombiana. Pero si tecnológicamente puede neutralizarse sin violar ninguna ley, ese derecho es solo un texto en papel. La plataforma no lo prohíbe — lo hace irrelevante.',
    real: 'No existe ninguna norma en Colombia que prohíba el uso de reemplazos digitales durante una huelga. El derecho existe; la protección efectiva, no.',
    accion: 'Este es exactamente el vacío que la política pública puede cerrar. Lee la propuesta.'
  },
  '3-acceso': {
    titulo: 'La asimetría tecnológica que no se ve',
    resultado: 'ok',
    texto: 'Las empresas coordinan reemplazos globales en segundos. Los trabajadores organizan paros por WhatsApp. Esa diferencia tecnológica no es neutralidad — es ventaja estructural para el empleador disfrazada de eficiencia.',
    real: 'El 78% de los sindicatos colombianos no tiene herramientas digitales propias de organización. La brecha tecnológica es también una brecha de poder de negociación.',
    accion: 'Conectividad Significativa trabaja para reducir esa asimetría. Súmate.'
  },
  '3-union': {
    titulo: 'La coalición que no se puede reemplazar',
    resultado: 'good',
    texto: 'Una huelga sectorial es fácil de sortear con una plataforma de reemplazos. Una coalición amplia — trabajadores, consumidores, comunidades, otros sectores — es mucho más difícil de ignorar para una plataforma y para el gobierno.',
    real: 'Las victorias laborales en economía de plataformas han llegado por coaliciones amplias, no por paros aislados. La solidaridad entre sectores es la nueva forma de huelga efectiva.',
    accion: 'Hay una coalición formándose en Colombia. Conéctate ahora.'
  },
  '4-leyes': {
    titulo: 'La amenaza que no necesita ejecutarse',
    resultado: 'bad',
    texto: 'Sin ley que regule el traslado como represalia sindical, las empresas no necesitan mover el trabajo — basta con amenazarlo. En 3 años, ningún trabajador colombiano pedirá aumento sin calcular primero si su rol es deslocalizable.',
    real: 'Colombia no tiene norma que prohíba usar la amenaza de offshoring como táctica en negociaciones colectivas. El Código Laboral fue escrito cuando el trabajo no podía moverse por internet en 72 horas.',
    accion: 'Este vacío se puede cerrar con una reforma concreta. Lee la propuesta y opina.'
  },
  '4-acceso': {
    titulo: 'El mecanismo invisible',
    resultado: 'ok',
    texto: 'La mayoría de trabajadores no sabe que el traslado digital existe como táctica de negociación hasta que les pasa. Sin esa información, no pueden prepararse ni organizarse a tiempo para hacerle frente.',
    real: 'El 71% de trabajadores colombianos en sectores tercerizables desconoce que su rol puede relocalizarse en menos de una semana bajo la regulación actual.',
    accion: 'Conectividad Significativa trabaja para reducir esta brecha informativa. Súmate.'
  },
  '4-union': {
    titulo: 'La fragmentación que nos deja solos',
    resultado: 'bad',
    texto: 'Cuando cada sector negocia individualmente, el offshoring funciona como palanca perfecta. El primero en ceder establece el piso — y todos los demás terminan compitiendo hacia abajo en condiciones y salarios.',
    real: 'Los sectores más expuestos al offshoring digital en Colombia — call centers, diseño, contabilidad — tienen menos del 6% de sindicalización. La organización colectiva digital está apenas empezando.',
    accion: 'Hay redes construyéndose en estos sectores ahora mismo. Conéctate.'
  },
  '5-leyes': {
    titulo: 'El título que no vale, la ley que no llega',
    resultado: 'bad',
    texto: 'Sin un marco legal claro de reconocimiento y transición, la invalidación de credenciales crea un mercado informal de certificaciones que es más rápido, más barato y mucho menos confiable. En 3 años ese mercado paralelo puede superar al oficial.',
    real: 'Colombia no tiene protocolo nacional de re-certificación de emergencia. Cuando el INVIMA o el COPNIA suspenden credenciales, cada afectado debe resolver el proceso solo y sin guía.',
    accion: 'Este protocolo puede crearse. Lee la propuesta de política y opina.'
  },
  '5-acceso': {
    titulo: 'La re-certificación que no todos pueden pagar',
    resultado: 'ok',
    texto: 'Quienes tienen recursos contratan asesorías y re-certifican rápido. Quienes no, quedan fuera del mercado formal durante meses. La crisis de credenciales no afecta a todos igual — amplifica las desigualdades que ya existían.',
    real: 'El costo promedio de re-certificación en Colombia ronda los $2,5 millones. Para el 60% de los trabajadores afectados, eso equivale a más de un mes de ingreso.',
    accion: 'Conectividad Significativa trabaja para que el acceso a información no dependa del dinero.'
  },
  '5-union': {
    titulo: 'Cada profesión sola ante la misma tormenta',
    resultado: 'ok',
    texto: 'Médicos, ingenieros, conductores y maestros enfrentan la misma crisis de credenciales pero negocian por separado. Sin frente común, cada gremio acepta condiciones distintas y el Estado no siente presión suficiente para actuar.',
    real: 'En ninguna crisis de credenciales reciente en Colombia hubo una respuesta gremial unificada. La fragmentación sectorial es la razón por la que estas crisis se resuelven lento y mal.',
    accion: 'Hay un espacio para construir esa coalición. Conéctate ahora.'
  },
  '10-leyes': {
    titulo: 'El espionaje que no es ilegal',
    resultado: 'bad',
    texto: 'Sin ley que proteja las comunicaciones sindicales como secreto profesional, el hackeo de sindicatos opera en zona gris total. En 3 años, el espionaje digital laboral es práctica habitual y las organizaciones que no pueden defenderse dejan de funcionar.',
    real: 'Colombia no tiene norma que proteja las comunicaciones internas de organizaciones sindicales. El espionaje digital laboral no está tipificado como práctica desleal en el Código Laboral.',
    accion: 'Esta protección puede crearse. Lee la propuesta de reforma y opina.'
  },
  '10-acceso': {
    titulo: 'La brecha de ciberseguridad sindical',
    resultado: 'ok',
    texto: 'Los sindicatos con recursos migran a plataformas seguras. Los demás siguen en canales vulnerables porque es lo que pueden costear. La brecha tecnológica reproduce y amplifica la brecha de poder de negociación que ya existía.',
    real: 'El 84% de los sindicatos colombianos usa WhatsApp como canal principal de comunicación interna. Solo el 3% tiene herramientas de comunicación cifrada y protocolos de seguridad digital formales.',
    accion: 'Conectividad Significativa trabaja para reducir esta brecha. Súmate.'
  },
  '10-union': {
    titulo: 'La organización que se desconfía a sí misma',
    resultado: 'bad',
    texto: 'Cuando los miembros sienten que sus comunicaciones internas pueden estar siendo monitoreadas, dejan de compartir información con sus propios líderes. El sindicato sigue existiendo en papel, pero pierde la capacidad de acción real que lo hace poderoso.',
    real: 'Después de incidentes de hackeo en sindicatos latinoamericanos, la participación en asambleas cayó en promedio un 31% y el intercambio de información estratégica se redujo un 67%.',
    accion: 'Fortalecer la seguridad digital sindical es urgente y posible. Conéctate.'
  },
  '11-leyes': {
    titulo: 'El patrón que no tiene cara',
    resultado: 'bad',
    texto: 'Sin obligación legal de transparencia algorítmica, las plataformas pueden cambiar condiciones de pago sin explicación ni recurso. En 3 años, el algoritmo fija las condiciones laborales de millones de colombianos sin que ninguna ley lo regule ni lo limite.',
    real: 'Colombia no tiene ley de transparencia algorítmica laboral. Las plataformas pueden modificar criterios de pago, asignación y desactivación sin notificación previa ni justificación a los trabajadores.',
    accion: 'Una ley de transparencia algorítmica laboral es urgente y posible. Lee la propuesta.'
  },
  '11-acceso': {
    titulo: 'Quien entiende el algoritmo, sobrevive',
    resultado: 'ok',
    texto: 'Los trabajadores que logran entender parcialmente cómo funciona el algoritmo optimizan su comportamiento y ganan más. Los demás trabajan más horas por menos sin entender por qué. El conocimiento del sistema se convierte en el nuevo privilegio laboral.',
    real: 'Estudios con trabajadores de plataformas en Colombia muestran que quienes acceden a comunidades que comparten estrategias algorítmicas ganan hasta un 34% más que quienes trabajan sin esa información.',
    accion: 'Conectividad Significativa trabaja para democratizar ese conocimiento. Súmate.'
  },
  '11-union': {
    titulo: 'Juntos contra la caja negra',
    resultado: 'good',
    texto: 'Cuando los trabajadores documentan colectivamente las variaciones de ingreso, dejan de ser anomalías individuales y se convierten en evidencia de un patrón sistemático. El volumen de datos colectivos es el único argumento que una plataforma no puede ignorar.',
    real: 'En el Reino Unido, trabajadores de Deliveroo lograron cambios en el algoritmo de asignación solo cuando presentaron datos de 4.000 trabajadores durante 6 meses. Un caso individual no hubiera llegado a ningún lado.',
    accion: 'Hay plataformas de documentación colectiva construyéndose en Colombia. Únete ahora.'
  }
};
