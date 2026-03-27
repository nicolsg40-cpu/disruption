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
    tag: 'Esquiroles.com',
    color: 'hack-red',
    titulo: 'Tu huelga duró 6 horas. La app consiguió reemplazantes antes del almuerzo',
    sub: 'Organización colectiva · huelga digital'
  }
};

export const TITULARES: Record<string, string> = {
  '1-1': '"Practicantes de diseño en Bogotá pierden contratos — reemplazados por estudio en Mumbai que cobra la mitad. \'Ni siquiera nos avisaron\', dice joven de 21 años."',
  '1-2': '"Call center de Cali traslada 800 puestos a Filipinas en 4 días tras amenaza de paro. \'Es una represalia\', denuncian trabajadores."',
  '1-3': '"Plataforma lanza operación con conductores remotos — tarifas locales caen 40% en una semana. \'Ya no alcanza ni pa\' la gasolina\'."',
  '1-4': '"Sindicato de contadores denuncia traslado masivo tras negociación fallida. \'Usaron el offshoring como arma en la mesa\'."',
  '2-1': '"4.200 jóvenes pierden trabajos part-time de un solo golpe. \'Llevaba 8 meses, ahora ni puedo apelar\', dice estudiante de 19 años."',
  '2-2': '"Plataforma desactiva cuentas colombianas masivamente. Afectados perdieron clientes y reputación acumulada en años — sin explicación."',
  '2-3': '"Rappi desactiva 3.800 repartidores en una noche. Sin aviso, sin cesantías. \'El algoritmo me despidió mientras dormía\'."',
  '2-4': '"Organización intenta demandar desactivación masiva — pero no encuentra a quién. Empresa en Irlanda, servidor en EE.UU., trabajador en Soacha."',
  '3-1': '"Paro estudiantil pierde fuerza en horas: empresa contrata personal remoto para mantener operaciones. \'Ni sabíamos que era legal\'."',
  '3-2': '"Desarrolladores en huelga reemplazados por equipo en Argentina en menos de 24 horas. La negociación que duró semanas — irrelevante en un día."',
  '3-3': '"Paro de repartidores en Bogotá: plataforma activa \'modo contingencia\'. El paro no paró nada — y hay sanciones a los que participaron."',
  '3-4': '"Sindicato denuncia esquiroles digitales durante negociación. \'Nos sentamos a negociar mientras ya nos reemplazaban\'."'
};

export const AI_IMPACTO: Record<string, string> = {
  'bolsillo-1': '"Ojo: cuando los empleos se van digitalmente, también quiebran las cafeterías y el transporte del barrio. Una empresa que se va en línea puede hundir una economía local sin que nadie lo llame cierre."',
  'bolsillo-2': '"Ojo: la desactivación no solo quita el ingreso — borra el historial. Los años de experiencia desaparecen con la cuenta. Empezar de cero significa tarifas de novato en todas las plataformas."',
  'bolsillo-3': '"Ojo: si la huelga no detiene la producción, pierde su función económica. Sin esa palanca, los salarios los fija unilateralmente el empleador — para siempre."',
  'cabeza-1': '"Ojo: la amenaza de traslado no necesita ejecutarse. Con que exista la posibilidad, los trabajadores se autocensuran — no piden aumentos, no se organizan. El miedo es el mecanismo."',
  'cabeza-2': '"Ojo: cuando una notificación puede borrarte laboralmente sin explicación, los jóvenes aprenden a no comprometerse ni a confiar. Esa desconfianza tiene un costo social enorme que nadie mide."',
  'cabeza-3': '"Ojo: cuando una acción colectiva falla visiblemente, destruye la confianza en la organización. La próxima vez la respuesta será: \'¿Para qué, si no sirve?\' Ese escepticismo es el objetivo real de la plataforma."',
  'derechos-1': '"Ojo: Colombia puede tener los mejores derechos laborales del mundo — y ser imposible hacerlos cumplir si el empleador está en otro continente operando bajo otra jurisdicción."',
  'derechos-2': '"Ojo: si los términos de servicio reemplazan al contrato, las garantías constitucionales quedan suspendidas. La empresa no incumple la ley — opera en un vacío donde la ley todavía no llegó."',
  'derechos-3': '"Ojo: el derecho a huelga existe en la Constitución colombiana — pero si tecnológicamente puede neutralizarse sin violar ninguna ley, ese derecho queda en el papel."'
};

export const CADENAS: Record<string, string[]> = {
  'leyes-1': ['Los traslados son una amenaza', 'Se normalizan como práctica estándar', 'Pedir aumento = pedir que te reemplacen'],
  'leyes-2': ['Las desactivaciones son excepcionales', 'Se vuelven la forma de \'reestructurar\'', 'Ningún trabajador tiene estabilidad real'],
  'leyes-3': ['Los esquiroles digitales son novedad', 'Se normalizan como \'continuidad operativa\'', 'La huelga existe en el papel, no en la práctica'],
  'acceso-1': ['Pocos saben que esto está pasando', 'Solo los conectados pueden defenderse', 'Saber o no saber = la nueva línea de clase'],
  'acceso-2': ['Afectados no saben que pueden demandar', 'Solo con recursos se navega la protección', 'El riesgo de desactivación lo asumen los pobres solos'],
  'acceso-3': ['Trabajadores organizan con WhatsApp', 'Asimetría tecnológica insalvable', 'Solo sindicatos con recursos propios pueden competir'],
  'union-1': ['Cada trabajador negocia solo', 'Los que resisten son los que aceptan menos', 'El estándar lo fija el país con peores condiciones'],
  'union-2': ['Demandas individuales se pierden', 'Plataformas aprenden el umbral sin consecuencias', 'Desactivación masiva sin respuesta posible'],
  'union-3': ['Cada gremio enfrenta la plataforma solo', 'Los más vulnerables ceden primero', 'La fragmentación es la herramienta del empleador']
};

export const SPARKS: Record<number, string[]> = {
  1: ['Buscar aliados en mi sector antes de pedir aumentos', 'Exigir contrato que fije dónde se puede hacer mi trabajo', 'Organizar a compañeros para que la demanda sea colectiva'],
  2: ['Exigir contrato real desde el primer día, aunque sea incómodo', 'Guardar pruebas de mi trabajo fuera de la app, siempre', 'Buscar otros trabajadores de la misma plataforma antes de que pase algo'],
  3: ['Construir alianzas con otros sectores antes del paro', 'Hacer visible en tiempo real lo que está pasando', 'Exigir una ley que prohíba reemplazos durante negociación']
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
    texto: 'El derecho a huelga existe en la Constitución colombiana. Pero si tecnológicamente puede neutralizarse sin violar ninguna ley, ese derecho es solo un texto en papel.',
    real: 'No existe ninguna norma en Colombia que prohíba el uso de reemplazos digitales durante una huelga. El derecho existe; la protección, no.',
    accion: 'Este es exactamente el vacío que la política pública puede cerrar.'
  },
  '3-acceso': {
    titulo: 'La asimetría que no se ve',
    resultado: 'ok',
    texto: 'Las empresas coordinan con plataformas globales en segundos. Los trabajadores organizan por WhatsApp. Esa asimetría tecnológica no es neutralidad — es ventaja estructural para el empleador.',
    real: 'El 78% de los sindicatos colombianos no tiene herramientas digitales propias de organización. La brecha tecnológica es también una brecha de poder.',
    accion: 'Conectividad Significativa trabaja en reducir esa asimetría.'
  },
  '3-union': {
    titulo: 'La coalición que no se puede neutralizar',
    resultado: 'good',
    texto: 'Una huelga sectorial es fácil de sortear. Una coalición amplia — trabajadores, consumidores, comunidades — es mucho más difícil de ignorar para una plataforma y para el gobierno.',
    real: 'Las victorias laborales en economía de plataformas han llegado por coaliciones amplias, no por paros aislados. La solidaridad entre sectores es la nueva huelga.',
    accion: 'Hay una coalición formándose. Conéctate ahora.'
  }
};
