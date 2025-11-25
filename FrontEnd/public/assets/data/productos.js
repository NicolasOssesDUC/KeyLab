const productos = [
    // Teclados
    {
        id: 1,
        nombre: 'Teclado Blue Hiragana',
        precio: 69000,
        categoria: 'Teclados',
        subcategoria: '60%',
        imagen: 'assets/img/bluehiragana1.webp',
        stock: 15,
        descripcion: 'Un teclado compacto y elegante de formato 60%, ideal para quienes buscan minimalismo y portabilidad sin perder funcionalidad. Su diseño se distingue por las teclas en tono azul con leyendas en Hiragana, que le dan un estilo único y sofisticado. Perfecto tanto para trabajo, estudio o gaming, ofrece una experiencia de escritura cómoda, estética llamativa y un tamaño reducido que libera espacio en tu escritorio.'
    },
    {
        id: 2,
        nombre: 'Teclado BlackWidow 75%',
        precio: 89000,
        categoria: 'Teclados',
        subcategoria: '75%',
        imagen: 'assets/img/Razer-BlackWidow-V4-75-Hot-Swappable-Mechanical-Gaming-Keyboard-RGB-Chroma-Black_effe0aa5-8503-4285-9de7-e5bf74665895.5a5ae658a4ebf40dc56b3fa1c756aa72.webp',
        stock: 12,
        descripcion: 'Un teclado 75% compacto que combina lo mejor de la funcionalidad completa con un diseño reducido para optimizar el espacio en tu escritorio. Incluye la fila de funciones y teclas de navegación esenciales, pero en un formato más portátil y estilizado. Su diseño BlackWidow resalta por un estilo moderno y robusto, pensado tanto para gaming competitivo como para largas jornadas de trabajo o estudio. Con un balance perfecto entre rendimiento, comodidad y estética, es la elección ideal para quienes buscan eficiencia sin sacrificar estilo.'
    },
    {
        id: 3,
        nombre: 'Teclado BlackWidow V4 Pro',
        precio: 110000,
        categoria: 'Teclados',
        subcategoria: 'Full Size',
        imagen: 'assets/img/Razer-BlackWidow-V4-Pro-Wired-Mechanical-PC-Gaming-Keyboard-Wrist-Rest-Chroma-RGB-Black_2a924a0f-da63-423e-acec-90b20cbbda78.b4de0d4d6e9d254aed7b22c21d5d562d.webp',
        stock: 10,
        descripcion: 'Un teclado diseñado para quienes buscan máximo rendimiento y durabilidad. La línea Pro destaca por su construcción robusta, con materiales de alta calidad y un diseño pensado para gaming de alto nivel y uso intensivo. Incorpora tecnología avanzada para ofrecer tiempos de respuesta ultrarrápidos, switches confiables y una experiencia de escritura fluida. Su estilo moderno, con acabados premium y funciones optimizadas, lo convierten en una herramienta ideal tanto para jugadores profesionales como para usuarios exigentes que quieren lo mejor en su setup.'
    },
    {
        id: 4,
        nombre: 'Teclado Ducky One 2 Mini',
        precio: 78000,
        categoria: 'Teclados',
        subcategoria: '60%',
        imagen: 'assets/img/TecladoDuckyOne2MiniFrozenLama.jpg',
        stock: 20,
        descripcion: 'El Ducky One 2 Mini es uno de los teclados más icónicos en formato 60%, elegido por gamers y entusiastas por su diseño compacto, rendimiento profesional y estética premium. Con un tamaño reducido que libera espacio en tu escritorio, ofrece switches mecánicos de alta calidad, keycaps PBT Double Shot y un estilo minimalista que combina funcionalidad con durabilidad. Incluye iluminación RGB personalizable, múltiples perfiles y compatibilidad con atajos que sustituyen funciones de un teclado completo. Perfecto para quienes buscan un teclado portátil, confiable y de alto nivel.'
    },
    {
        id: 5,
        nombre: 'Teclado Red Dragon',
        precio: 99000,
        categoria: 'Teclados',
        subcategoria: '60%',
        imagen: 'assets/img/TecladoRedragon1.png',
        stock: 18,
        descripcion: 'El Redragon 60% es un teclado mecánico compacto que combina potencia, estilo y portabilidad en un formato reducido. Diseñado para gamers y usuarios que buscan aprovechar al máximo el espacio de su escritorio, ofrece switches mecánicos de alto rendimiento, iluminación RGB personalizable y una estructura robusta para soportar largas sesiones de uso. Su diseño minimalista lo hace ideal para setups modernos, brindando una experiencia cómoda y precisa en cada pulsación.'
    },
    {
        id: 6,
        nombre: 'Teclado Fantech K613L Figther Full Size',
        precio: 110000,
        categoria: 'Teclados',
        subcategoria: 'Full Size',
        imagen: 'assets/img/Fantech K613L Fighter.jpg',
        stock: 7,
        descripcion: 'El Fantech K613L Fighter es un teclado full size diseñado para quienes buscan rendimiento y comodidad en un solo dispositivo. Con su diseño completo incluye teclado numérico, ideal tanto para gaming como para trabajo o estudio. Incorpora iluminación Rainbow LED, estructura resistente y teclas de alta respuesta que ofrecen una experiencia fluida y precisa en cada pulsación. Su diseño ergonómico y duradero lo convierte en una opción confiable para acompañarte en largas jornadas frente al PC.'
    },
    {
        id: 7,
        nombre: 'Teclado HyperX MKW100 Full Size',
        precio: 135000,
        categoria: 'Teclados',
        subcategoria: 'Full Size',
        imagen: 'assets/img/HyperX MKW100.webp',
        stock: 9,
        descripcion: 'El HyperX MKW100 es un teclado mecánico full size que combina rendimiento, comodidad y estilo. Su diseño completo incluye teclado numérico, ideal para quienes necesitan productividad sin renunciar a una experiencia de escritura precisa. Incorpora iluminación RGB dinámica, construcción sólida con placa de aluminio y switches mecánicos de gran durabilidad, pensados tanto para gaming como para uso diario. Con su estética moderna y su fiabilidad característica de HyperX, es una elección segura para elevar tu setup.'
    },
    {
        id: 8,
        nombre: 'Teclado RedDragon Valhein',
        precio: 123000,
        categoria: 'Teclados',
        subcategoria: 'Full Size',
        imagen: 'assets/img/RedDragon valhein.webp',
        stock: 11,
        descripcion: 'El Redragon Valhein es un teclado mecánico diseñado para gamers y usuarios exigentes que buscan rendimiento y estilo en su escritorio. Su diseño robusto y moderno combina comodidad, precisión y durabilidad, ofreciendo switches mecánicos de alta respuesta y retroiluminación RGB personalizable para una experiencia visual y táctil inmersiva. Perfecto tanto para gaming competitivo como para largas sesiones de trabajo, el Valhein optimiza tu espacio con un formato eficiente sin sacrificar funcionalidad.'
    },
    {
        id: 9,
        nombre: 'Teclado Logitech G413',
        precio: 155000,
        categoria: 'Teclados',
        subcategoria: 'Full Size',
        imagen: 'assets/img/G413 Logitech.webp',
        stock: 5,
        descripcion: 'El Logitech G413 es un teclado mecánico full size que combina diseño minimalista y alto rendimiento. Equipado con switches Romer-G o GX Blue, ofrece una escritura precisa y silenciosa, ideal para gaming y trabajo intenso. Su estructura de aluminio cepillado garantiza durabilidad, mientras que la retroiluminación roja ajustable brinda estilo y funcionalidad incluso en entornos con poca luz. Perfecto para quienes buscan un teclado fiable, elegante y eficiente para todas sus tareas.'
    },
    // Keycaps
    {
        id: 10,
        nombre: 'KeyCaps HammerHead Shark ABS',
        precio: 88000,
        categoria: 'Keycaps',
        subcategoria: 'ABS',
        imagen: 'assets/img/61qTBJD7cEL._UF1000,1000_QL80_.jpg',
        stock: 25,
        descripcion: ''
    },
    {
        id: 11,
        nombre: 'KeyCaps Ajjaz Pro 75% ABS',
        precio: 55000,
        categoria: 'Keycaps',
        subcategoria: 'ABS',
        imagen: 'assets/img/86d6480d400307382f0d4d7de8825e60.webp',
        stock: 30,
        descripcion: ''
    },
    {
        id: 12,
        nombre: 'KeyCaps Cupid Cherry ABS',
        precio: 110000,
        categoria: 'Keycaps',
        subcategoria: 'ABS',
        imagen: 'assets/img/Cupid-red-on-white-cherry-mx-keycap-keycaps-set-pbt-thock-king-mechanical-keyboard-keyboards-3.webp',
        stock: 14,
        descripcion: ''
    },
    {
        id: 13,
        nombre: 'KeyCaps Fantech Nautilus ABS',
        precio: 65000,
        categoria: 'Keycaps',
        subcategoria: 'ABS',
        imagen: 'assets/img/descarga.webp',
        stock: 22,
        descripcion: ''
    },
    {
        id: 14,
        nombre: 'KeyCaps Thrine Thru Emblem ABS',
        precio: 118000,
        categoria: 'Keycaps',
        subcategoria: 'ABS',
        imagen: 'assets/img/MD-13559_20151130234208_b87df6bcdcec9702.jpg',
        stock: 10,
        descripcion: ''
    },
    // Switches
    {
        id: 15,
        nombre: 'Switches Lin Game 1989',
        precio: 25000,
        categoria: 'Switches',
        subcategoria: 'Lineales',
        imagen: 'assets/img/GAME_1989_Classic-2_720x.webp',
        stock: 100,
        descripcion: ''
    },
    {
        id: 16,
        nombre: 'Switches Lin Yellow',
        precio: 18000,
        categoria: 'Switches',
        subcategoria: 'Lineales',
        imagen: 'assets/img/switches_79fbaff5-ba04-4481-b8da-b30846b9ffbc_720x.webp',
        stock: 150,
        descripcion: ''
    },
    {
        id: 17,
        nombre: 'Switches Lin Piano Pro',
        precio: 36000,
        categoria: 'Switches',
        subcategoria: 'Lineales',
        imagen: 'assets/img/V3-Piano-Pro-Switch-4_720x.webp',
        stock: 80,
        descripcion: ''
    },
    {
        id: 18,
        nombre: 'Switches Lin Akko RoseWood',
        precio: 44000,
        categoria: 'Switches',
        subcategoria: 'Lineales',
        imagen: 'assets/img/Akko-Rosewood-Switch-XQ-Q-GX_720x.webp',
        stock: 70,
        descripcion: ''
    },
    {
        id: 19,
        nombre: 'Switches Lin WS Yellow',
        precio: 53000,
        categoria: 'Switches',
        subcategoria: 'Lineales',
        imagen: 'assets/img/WS_Yellow_Switch_Lifestyle_2_720x.webp',
        stock: 90,
        descripcion: ''
    },
    {
        id: 20,
        nombre: 'Switch Gateron Blue 90u',
        precio: 24990,
        categoria: 'Switches',
        subcategoria: 'Clicky',
        imagen: 'assets/img/gateron-blue.jpg',
        stock: 120,
        descripcion: ''
    },
    {
        id: 21,
        nombre: 'Switch KTT Purple 90u',
        precio: 22990,
        categoria: 'Switches',
        subcategoria: 'Clicky',
        imagen: 'assets/img/KTT PURPLE.webp',
        stock: 110,
        descripcion: ''
    },
    {
        id: 22,
        nombre: 'Switch Gateron Brown 90u',
        precio: 20000,
        categoria: 'Switches',
        subcategoria: 'Tactiles',
        imagen: 'assets/img/GATERONBROWN.jpg',
        stock: 130,
        descripcion: ''
    },
    {
        id: 23,
        nombre: 'Switch Gateron Red 90u',
        precio: 17990,
        categoria: 'Switches',
        subcategoria: 'Tactiles',
        imagen: 'assets/img/GATERONRED.webp',
        stock: 140,
        descripcion: ''
    },
    // Cases
    {
        id: 24,
        nombre: 'Case Holy 80% EVA Edition',
        precio: 100000,
        categoria: 'Cases',
        subcategoria: '80%',
        imagen: 'assets/img/Holy80_.webp',
        stock: 10,
        descripcion: ''
    },
    {
        id: 25,
        nombre: 'Case Tofu 60% Black',
        precio: 69990,
        categoria: 'Cases',
        subcategoria: '60%',
        imagen: 'assets/img/tofu60_.webp',
        stock: 15,
        descripcion: ''
    },
    {
        id: 26,
        nombre: 'Case Holy 60% Black',
        precio: 59990,
        categoria: 'Cases',
        subcategoria: '60%',
        imagen: 'assets/img/Holy60_.webp',
        stock: 20,
        descripcion: ''
    }
];
