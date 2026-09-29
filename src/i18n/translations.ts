export type Language = 'en' | 'pt';

export interface Translations {
  nav: {
    howItWorks: string;
    founder: string;
    demo: string;
    voiceRange: string;
    alarmBuilder: string;
    downloadApk: string;
  };
  hero: {
    badgeApp: string;
    badgeVersion: string;
    headlinePart1: string;
    headlinePart2: string;
    subtext: string;
    ctaDownload: string;
    ctaDemo: string;
    previewTitle: string;
    previewSubtitle: string;
    metric1Val: string;
    metric1Label: string;
    metric2Val: string;
    metric2Label: string;
    metric3Val: string;
    metric3Label: string;
  };
  founder: {
    badge: string;
    title: string;
    subtitle: string;
    storyP1: string;
    storyP2: string;
    storyP3: string;
    role: string;
    connectLinkedIn: string;
  };
  science: {
    badge: string;
    title: string;
    description: string;
    problemTitle: string;
    problemBody: string;
    problemBullet1: string;
    problemBullet2: string;
    problemBullet3: string;
    solutionTitle: string;
    solutionBody: string;
    solutionBullet1: string;
    solutionBullet2: string;
    solutionBullet3: string;
    proofHeadline: string;
    proofBody: string;
    stat1Label: string;
    stat2Label: string;
  };
  demo: {
    badge: string;
    title: string;
    subtitle: string;
    standby: string;
    playing: string;
    awaiting: string;
    silenced: string;
    failed: string;
    tolerance: string;
    forgiving: string;
    strict: string;
    targetMelody: string;
    detectedFreq: string;
    awaitingHum: string;
    btnPlayMelody: string;
    btnUseMic: string;
    btnMuteMic: string;
    simTitle: string;
    simBadge: string;
    btnAutoMatch: string;
    btnSimMiss: string;
    safetyNotice: string;
    btnDismiss: string;
  };
  vocal: {
    badge: string;
    title: string;
    subtitle: string;
    femaleVoices: string;
    maleVoices: string;
    voiceTestTitle: string;
    statusReady: string;
    statusCalibrating: string;
    listeningHum: string;
    btnRunTest: string;
    testNotice: string;
    testSuccessTitle: string;
    testSuccessOptimal: string;
    testSuccessKey: string;
  };
  alarm: {
    badge: string;
    title: string;
    subtitle: string;
    cardTitle: string;
    scheduledText: string;
    timeLabel: string;
    repeatLabel: string;
    difficultyLabel: string;
    toleranceLabel: string;
    libraryTitle: string;
    librarySubtitle: string;
    libraryBadge: string;
    acousticNoteTitle: string;
    acousticNoteBody: string;
  };
  modal: {
    title: string;
    subtitle: string;
    packageId: string;
    minAndroid: string;
    permissions: string;
    btnDownload: string;
    btnDownloading: string;
    sideloadNote: string;
    playStorePrompt: string;
    inputPlaceholder: string;
    btnNotify: string;
    successMessage: string;
    guideTitle: string;
    step1: string;
    step2: string;
    step3: string;
  };
  footer: {
    tagline: string;
    privacyPill: string;
    navTitle: string;
    releaseTitle: string;
    releaseText: string;
    btnDownload: string;
    rights: string;
    privacyLink: string;
    specsLink: string;
    manifestLink: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      howItWorks: 'How It Works',
      founder: 'Why It Was Built',
      demo: 'Web Demo',
      voiceRange: 'Voice Range',
      alarmBuilder: 'Alarm Builder',
      downloadApk: 'Download APK'
    },
    hero: {
      badgeApp: 'Hummingbird for Android',
      badgeVersion: 'v0.1 APK',
      headlinePart1: 'Wake your brain.',
      headlinePart2: 'Not just your ears.',
      subtext: 'The anti-snooze alarm that stops sleep inertia. When it rings, hum the short melody back in pitch to dismiss it.',
      ctaDownload: 'Download Android APK',
      ctaDemo: 'Try Web Browser Demo',
      previewTitle: 'Acoustic Melody Preview',
      previewSubtitle: '3-Note Morning Wake Sequence',
      metric1Val: '0 ms',
      metric1Label: 'Cloud Latency (100% Local)',
      metric2Val: '±1.5',
      metric2Label: 'Semitone Pitch Tolerance',
      metric3Val: '4 Ranges',
      metric3Label: 'Soprano / Alto / Tenor / Bass'
    },
    founder: {
      badge: 'Founder Story',
      title: 'Why Hummingbird Was Built',
      subtitle: 'Solving sleep-inertia through musical frequency.',
      storyP1: 'I built Hummingbird because I had serious trouble waking up with normal alarms. I kept finding myself snoozing the alarm repeatedly without ever being fully conscious, falling back asleep and starting every day completely disoriented.',
      storyP2: 'I have played guitar for years and love everything connected to music. When I searched for anti-snooze solutions, the market was full of apps forcing you to do push-ups, drink glasses of water, or solve tedious math problems in the dark. None of them engaged the natural musical pathways of the brain.',
      storyP3: 'So I connected my biggest morning struggle with one of my greatest passions. Requiring your vocal cords to pitch-match a simple melody activates your auditory cortex and motor awareness in under four seconds.',
      role: 'Founder & Software Engineer',
      connectLinkedIn: 'Connect on LinkedIn'
    },
    science: {
      badge: 'The Science of Waking',
      title: 'The end of the snooze reflex.',
      description: 'Conventional alarms rely on a swipe or button tap. Over time, muscle memory silences the phone before your mind wakes up. Hummingbird breaks the cycle with voice pitch recall.',
      problemTitle: 'Subconscious Motor Dismissal',
      problemBody: 'Swiping a screen uses habituated subcortical reflexes. You silence the alarm in half-conscious sleep inertia, falling back asleep and waking up groggy 45 minutes late.',
      problemBullet1: 'Motor memory dismisses sound in less than one second',
      problemBullet2: 'Zero cognitive engagement from prefrontal cortex',
      problemBullet3: 'Fragmented sleep cycles worsen morning fog',
      solutionTitle: 'Active Auditory-Vocal Resonance',
      solutionBody: 'To hum a 3-6 note melody back in pitch, your brain must listen, hold notes in working memory, calibrate vocal cord tension, and hum accurately. You wake up naturally alert.',
      solutionBullet1: 'Stimulates auditory cortex and laryngeal motor pathways',
      solutionBullet2: 'Impossible to reproduce in tune while half-asleep',
      solutionBullet3: '100% on-device pitch verification ensures genuine wakefulness',
      proofHeadline: 'Active vocal matching engages alertness in 4.2 seconds.',
      proofBody: 'Pitch matching activates the ventral anterior cingulate cortex, raising natural focus without jarring adrenaline spikes.',
      stat1Label: 'Habitual Snoozers',
      stat2Label: 'Conscious Wakefulness'
    },
    demo: {
      badge: 'Interactive Alarm Simulation',
      title: 'Experience the waking flow.',
      subtitle: 'Test how Hummingbird measures your vocal pitch in real time right in your browser.',
      standby: 'Alarm Standby - 06:45 AM',
      playing: 'Alarm Active: Playing Melody',
      awaiting: 'Awaiting Vocal Hum...',
      silenced: 'Alarm Silenced: Mind Alert',
      failed: 'Alarm Persists: 5 Attempts Reached',
      tolerance: 'Tolerance:',
      forgiving: 'Forgiving (±1.8 st)',
      strict: 'Strict (±1.0 st)',
      targetMelody: 'Target 3-Note Melody: C4 (261 Hz) / E4 (329 Hz) / G4 (392 Hz)',
      detectedFreq: 'Live Detected Frequency:',
      awaitingHum: 'Awaiting hum input...',
      btnPlayMelody: '1. Play Wake Melody',
      btnUseMic: '2. Use Real Mic',
      btnMuteMic: 'Mute Mic',
      simTitle: 'No Mic? 1-Click Simulation',
      simBadge: 'Instant Test',
      btnAutoMatch: 'Auto-Hum Match',
      btnSimMiss: 'Simulate Miss',
      safetyNotice: '5 failed attempts reached. Emergency manual dismissal unlocked.',
      btnDismiss: 'Dismiss'
    },
    vocal: {
      badge: 'Voice Range Engine',
      title: 'Calibrated to your natural morning voice.',
      subtitle: 'No straining your throat at dawn. Hummingbird calibrates your natural vocal frequency into Soprano, Alto, Tenor, or Bass so melodies sit comfortably in your chest register.',
      femaleVoices: 'Female Voices',
      maleVoices: 'Male Voices',
      voiceTestTitle: 'Vocal Test Simulator',
      statusReady: 'READY',
      statusCalibrating: 'CALIBRATING...',
      listeningHum: 'Listening to natural hum...',
      btnRunTest: 'Run 5-Second Voice Calibration Test',
      testNotice: 'Quick test runs on-device and saves your register to local profile.',
      testSuccessTitle: 'Calibration Complete! Assigned:',
      testSuccessOptimal: 'Optimal morning range:',
      testSuccessKey: 'All alarm melodies will automatically transpose to'
    },
    alarm: {
      badge: 'Alarm Customization',
      title: 'Configure your alarm routine.',
      subtitle: 'Test the Hummingbird alarm configuration interface. Choose your waking time, repeat schedule, melody difficulty, and preview synthesized library tracks.',
      cardTitle: 'Alarm Settings',
      scheduledText: 'Scheduled: Tomorrow at',
      timeLabel: 'Alarm Time & Label',
      repeatLabel: 'Repeat Schedule',
      difficultyLabel: 'Melody Difficulty',
      toleranceLabel: 'Pitch Precision Tolerance',
      libraryTitle: 'Bundled Melody Library',
      librarySubtitle: 'Tap play to listen to synthesized tones bundled with the app.',
      libraryBadge: '20 Tracks',
      acousticNoteTitle: 'Acoustic Synthesis:',
      acousticNoteBody: 'Melodies are synthesized using clean harmonic tones optimized for frequency recognition. Consecutive repetition lock ensures you never hear the same melody two mornings in a row.'
    },
    modal: {
      title: 'Download Hummingbird APK',
      subtitle: 'v0.1.0-alpha / 14.2 MB / Android 8.0+',
      packageId: 'Package ID:',
      minAndroid: 'Minimum Android:',
      permissions: 'Audio Permissions:',
      btnDownload: 'Download Hummingbird APK (v0.1)',
      btnDownloading: 'Download Started (Save Package)',
      sideloadNote: 'Direct sideload package. Zero telemetry, no Google account required.',
      playStorePrompt: 'Want Google Play Store notification instead?',
      inputPlaceholder: 'Enter your email',
      btnNotify: 'Notify Me',
      successMessage: "You're on the list! We will alert you the day Hummingbird goes live on Google Play.",
      guideTitle: 'How to Install Android APK:',
      step1: '1. Tap downloaded APK file in your notification bar.',
      step2: '2. When prompted, select "Settings" and enable "Allow from this source".',
      step3: '3. Tap "Install" to complete setup.'
    },
    footer: {
      tagline: 'The Android alarm application engineered to conquer unconscious snoozing through melody recall.',
      privacyPill: '100% On-Device Pitch Analysis / Zero Audio Uploaded',
      navTitle: 'Navigation',
      releaseTitle: 'Release Information',
      releaseText: 'Hummingbird MVP v0.1 is developed with Flutter and Dart for rapid standalone Android deployment.',
      btnDownload: 'Download Android APK',
      rights: 'All rights reserved.',
      privacyLink: 'Privacy Guarantee (Local-Only)',
      specsLink: 'PRD v0.1 Specifications',
      manifestLink: 'Android Package Manifest'
    }
  },
  pt: {
    nav: {
      howItWorks: 'Como Funciona',
      founder: 'Por Que Foi Criado',
      demo: 'Demo Web',
      voiceRange: 'Alcance Vocal',
      alarmBuilder: 'Criador de Alarme',
      downloadApk: 'Baixar APK'
    },
    hero: {
      badgeApp: 'Hummingbird para Android',
      badgeVersion: 'APK v0.1',
      headlinePart1: 'Acorde sua mente.',
      headlinePart2: 'Não apenas seus ouvidos.',
      subtext: 'O alarme anti-soneca que acaba com a inércia do sono. Quando ele toca, cantarole a melodia no tom certo para desligá-lo.',
      ctaDownload: 'Baixar APK Android',
      ctaDemo: 'Testar Demo no Navegador',
      previewTitle: 'Prévia da Melodia Matinal',
      previewSubtitle: 'Sequência de Despertar com 3 Notas',
      metric1Val: '0 ms',
      metric1Label: 'Latência em Nuvem (100% Local)',
      metric2Val: '±1.5',
      metric2Label: 'Tolerância de Semitons',
      metric3Val: '4 Registros',
      metric3Label: 'Soprano / Contralto / Tenor / Baixo'
    },
    founder: {
      badge: 'História do Fundador',
      title: 'Por Que o Hummingbird Foi Criado',
      subtitle: 'Superando a inércia do sono através da frequência musical.',
      storyP1: 'Criei o Hummingbird porque sempre tive uma dificuldade enorme para acordar com alarmes comuns. Eu me pegava apertando o botão de soneca repetidamente sem nem estar totalmente consciente, voltando a dormir e começando o dia completamente atordoado.',
      storyP2: 'Toco violão e guitarra há anos e amo tudo o que envolve música. Quando procurei soluções anti-soneca, o mercado estava cheio de aplicativos que obrigam você a fazer flexões, beber copos de água ou resolver equações matemáticas no escuro. Nenhum deles utilizava os circuitos musicais naturais do cérebro.',
      storyP3: 'Então decidi unir minha maior luta matinal à minha maior paixão. Exigir que suas cordas vocais reproduzam uma melodia simples ativa o córtex auditivo e a lucidez motora em menos de quatro segundos.',
      role: 'Fundador & Engenheiro de Software',
      connectLinkedIn: 'Conectar no LinkedIn'
    },
    science: {
      badge: 'A Ciência do Despertar',
      title: 'O fim do reflexo da soneca.',
      description: 'Alarmes convencionais dependem de um simples toque na tela. Com o tempo, a memória motora desliga o aparelho antes mesmo de você despertar. O Hummingbird quebra esse ciclo com a memória tonal da voz.',
      problemTitle: 'Desligamento Motor Subconsciente',
      problemBody: 'Deslizar o dedo na tela utiliza reflexos subcorticais habituados. Você desliga o alarme em plena inércia do sono, volta a dormir e acorda 45 minutos depois com dor de cabeça e cansaço.',
      problemBullet1: 'Memória muscular desliga o alarme em menos de um segundo',
      problemBullet2: 'Zero ativação cognitiva do córtex pré-frontal',
      problemBullet3: 'Ciclos de sono fragmentados aumentam a sonolência diurna',
      solutionTitle: 'Ressonância Auditivo-Vocal Ativa',
      solutionBody: 'Para cantarolar uma melodia de 3-6 notas na afinação correta, seu cérebro precisa escutar, reter na memória de trabalho e calibrar as cordas vocais. Você acorda naturalmente atento.',
      solutionBullet1: 'Estimula o córtex auditivo e as vias motoras laríngeas',
      solutionBullet2: 'Impossível cantar no tom certo enquanto estiver meio dormindo',
      solutionBullet3: 'Verificação de afinação 100% no aparelho garante lucidez real',
      proofHeadline: 'O pareamento vocal ativa o estado de alerta em 4.2 segundos.',
      proofBody: 'A reprodução de notas ativa o córtex cingulado anterior ventral, promovendo foco natural sem picos abruptos de cortisol.',
      stat1Label: 'Usuários Habituais de Soneca',
      stat2Label: 'Despertar Consciente'
    },
    demo: {
      badge: 'Simulação Interativa de Alarme',
      title: 'Experimente o fluxo de despertar.',
      subtitle: 'Teste como o Hummingbird mede a afinação da sua voz em tempo real diretamente no seu navegador.',
      standby: 'Alarme em Espera - 06:45',
      playing: 'Alarme Tocando: Reproduzindo Melodia',
      awaiting: 'Aguardando Cantarolar...',
      silenced: 'Alarme Desligado: Mente Desperta',
      failed: 'Alarme Persiste: 5 Tentativas Atingidas',
      tolerance: 'Tolerância:',
      forgiving: 'Tolerante (±1.8 st)',
      strict: 'Estrito (±1.0 st)',
      targetMelody: 'Melodia Alvo de 3 Notas: Dó4 (261 Hz) / Mi4 (329 Hz) / Sol4 (392 Hz)',
      detectedFreq: 'Frequência Detectada ao Vivo:',
      awaitingHum: 'Aguardando entrada de voz...',
      btnPlayMelody: '1. Tocar Melodia do Alarme',
      btnUseMic: '2. Usar Microfone Real',
      btnMuteMic: 'Silenciar Microfone',
      simTitle: 'Sem Microfone? Simulação em 1 Clique',
      simBadge: 'Teste Rápido',
      btnAutoMatch: 'Cantarolar Certo (Auto)',
      btnSimMiss: 'Simular Erro de Tom',
      safetyNotice: '5 tentativas falhas atingidas. Desligamento manual de emergência liberado.',
      btnDismiss: 'Desligar'
    },
    vocal: {
      badge: 'Motor de Alcance Vocal',
      title: 'Calibrado para sua voz matinal natural.',
      subtitle: 'Sem forçar a garganta ao amanhecer. O Hummingbird calibra sua frequência vocal natural em Soprano, Contralto, Tenor ou Baixo para que as melodias fiquem confortáveis no seu peito.',
      femaleVoices: 'Vozes Femininas',
      maleVoices: 'Vozes Masculinas',
      voiceTestTitle: 'Simulador de Teste Vocal',
      statusReady: 'PRONTO',
      statusCalibrating: 'CALIBRANDO...',
      listeningHum: 'Ouvindo tom natural...',
      btnRunTest: 'Executar Teste de Calibração de 5s',
      testNotice: 'O teste rápido roda no dispositivo e salva seu registro no perfil local.',
      testSuccessTitle: 'Calibração Concluída! Atribuído:',
      testSuccessOptimal: 'Alcance matinal ideal:',
      testSuccessKey: 'Todas as melodias de alarme serão transpostas para'
    },
    alarm: {
      badge: 'Personalização do Alarme',
      title: 'Configure sua rotina de alarme.',
      subtitle: 'Teste a interface de configuração do Hummingbird. Escolha o horário de despertar, dias de repetição, dificuldade e ouça as melodias incluídas.',
      cardTitle: 'Configurações de Alarme',
      scheduledText: 'Programado: Amanhã às',
      timeLabel: 'Horário e Rótulo',
      repeatLabel: 'Dias de Repetição',
      difficultyLabel: 'Dificuldade da Melodia',
      toleranceLabel: 'Tolerância de Precisão',
      libraryTitle: 'Biblioteca de Melodias Incluídas',
      librarySubtitle: 'Toque para ouvir os tons sintetizados integrados ao aplicativo.',
      libraryBadge: '20 Faixas',
      acousticNoteTitle: 'Síntese Acústica:',
      acousticNoteBody: 'As melodias são sintetizadas usando ondas harmônicas puras para facilitar o reconhecimento de tom. O bloqueio de repetição garante que você nunca escute a mesma melodia duas manhãs seguidas.'
    },
    modal: {
      title: 'Baixar APK do Hummingbird',
      subtitle: 'v0.1.0-alpha / 14.2 MB / Android 8.0+',
      packageId: 'ID do Pacote:',
      minAndroid: 'Android Mínimo:',
      permissions: 'Permissões de Áudio:',
      btnDownload: 'Baixar APK do Hummingbird (v0.1)',
      btnDownloading: 'Download Iniciado (Salvar Pacote)',
      sideloadNote: 'Instalação direta de APK. Sem rastreamento, sem necessidade de conta Google.',
      playStorePrompt: 'Prefere ser avisado no lançamento da Google Play?',
      inputPlaceholder: 'Digite seu e-mail',
      btnNotify: 'Avise-me',
      successMessage: 'Você está na lista! Enviaremos um alerta no dia em que o Hummingbird for publicado na Google Play.',
      guideTitle: 'Como Instalar o APK no Android:',
      step1: '1. Toque no arquivo APK baixado na sua barra de notificações.',
      step2: '2. Se solicitado, abra "Configurações" e ative "Permitir desta fonte".',
      step3: '3. Toque em "Instalar" para concluir a instalação.'
    },
    footer: {
      tagline: 'O aplicativo de alarme Android projetado para derrotar o hábito inconsciente da soneca.',
      privacyPill: 'Análise de Afinação 100% no Aparelho / Zero Envio de Áudio',
      navTitle: 'Navegação',
      releaseTitle: 'Informações de Lançamento',
      releaseText: 'O Hummingbird MVP v0.1 é desenvolvido com Flutter e Dart para implantação nativa direta no Android.',
      btnDownload: 'Baixar APK Android',
      rights: 'Todos os direitos reservados.',
      privacyLink: 'Garantia de Privacidade (Apenas Local)',
      specsLink: 'Especificações do PRD v0.1',
      manifestLink: 'Manifesto do Pacote Android'
    }
  }
};
