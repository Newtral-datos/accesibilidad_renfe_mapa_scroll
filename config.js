// Variable de configuración global
const config = {
    // 1. Credenciales y Estilo Base
    accessToken: 'pk.eyJ1IjoibmV3dHJhbCIsImEiOiJjazJrcDY4Y2gxMmg3M2JvazU4OXV6NHZqIn0.VO5GkvBq_PSJHvX7T8H9jQ', 
    style: 'mapbox://styles/newtral/cmfcdokcl006f01sd20984lhq',
    title: '<span style="border-bottom:solid 3px #01f3b3;">Viendo los trenes pasar</span>',
    subtitle: 'Accesibilidad, la asignatura pendiente del cercanías.',
    
    // Configuración global de la transición (5 segundos)
    TRANSITION_DURATION_MS: 6300, 

    // --- EXPRESIONES DE ESTILO ---
    STATION_COLOR_EXPRESSION: [
        "match",
        ["get", "accesible"],
        1, "#01f3b3",
        0, "#494949",
        "#494949"
    ],
    LINE_COLOR_EXPRESSION: [
        "concat", 
        "#", 
        ["get", "route_color"]
    ],

    // --- FUNCIONES HELPER (PINTADO) ---
    pintarEstaciones: function(map, colorExpression) {
        const layerId = 'estacion_layer';
        if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, 'circle-color', colorExpression);
        }
    },
    pintarLineas: function(map, colorExpression) {
        const layerId = 'lineas_cercanias_layer';
        if (map.getLayer(layerId)) {
            map.setPaintProperty(layerId, 'line-color', colorExpression);
        }
    },
    
    // Función para obtener los parámetros de la ubicación según el dispositivo
    getLocationParams: function(chapterId) {
        const chapter = config.chapters.find(chap => chap.id === chapterId);
        // Breakpoint de 750px (coincide con el CSS)
        const deviceType = window.innerWidth < 750 ? 'mobile' : 'desktop'; 
        
        // Fallback robusto
        const loc = (chapter ? chapter.location : config.chapters[0].location);
        
        return loc[deviceType] || loc.desktop;
    },

    // 2. Definición de Capítulos (con coordenadas adaptadas)
    chapters: [
        {
            id: 'problema-nacional',
            title: 'Un problema nacional',
            description: 'Los usuarios de cercanía con movilidad reducida viven una auténtica aventura cada vez que quieren usar un trasporte públco y supuestamente universal como es el cercanías',
            location: {
                desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
                mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
            },
            onChapterEnter: function(map) {
                config.pintarLineas(map, 'grey');
                config.pintarEstaciones(map, '#494949'); 
            }
        },
        {
            id: 'trenes-accesibles',
            description: 'En España, solo la mitad de estaciones de cercanías son accesibles, problema al que hay que añadir la baja frecuencia de trenes adaptados en algunas líneas y regiones.',
            location: {
                desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
                mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
            },
            onChapterEnter: function(map) {
                config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
                config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
            }
        },
        {
            id: 'constante-regional',
            description: 'Este problema es una constante en las diferentes regiones del país, desde las grandes ciudades hasta las líneas de cercanías regionales.',
            location: {
                desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
                mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
            },
            onChapterEnter: function(map) {
                config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
                config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
            }
        },
        {
            id: 'madrid',
            title: 'Madrid: 53% de estaciones accesibles',
            description: 'El cercanías madrileño contó con 241,7 millones de usuarios en 2024. A pesar de estas cifras, solo un 53% de las estaciones están adaptadas a las personas con movilidad reducida.',
            location: {
                desktop: { "center":[-3.7276,40.4776],"zoom":9.09,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
                mobile: { "center":[-3.7292,40.507],"zoom":7.85,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
            },
            onChapterEnter: function(map) {
                config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
                config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
            }
        },
        {
            id: 'barcelona',
            title: 'Barcelona: Rodalies al 64%',
            description: 'Aunque la situación es algo mejor en Barcelona, más de un tercio de las estaciones de la provincia siguen pendientes de ser remodeladas para mejorar su accesibilidad.',
            location: {
                desktop: { "center":[2.0809,41.8682],"zoom":8.39,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
                mobile: { "center":[2.1491,41.9122],"zoom":7.54,"pitch":24,"bearing":0, "mapAnimation": 'flyTo' }
            },
            onChapterEnter: function(map) {
                config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
                config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
            }
        },
        {
            id: 'san-sebastian',
            title: 'San Sebastián: el peor escenario',
            description: 'En algunas ciudades, como San Sebastián, la situación es aún peor. Solo cuenta con una línea de cercanías, en la cual 23 de sus 30 estaciones no están adaptadas a los usuarios con silla de ruedas.',
            location: {
                desktop: { "center":[-2.0738,43.1988],"zoom":10.15,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
                mobile: { "center":[-2.0716,43.2792],"zoom":8.91,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
            },
            onChapterEnter: function(map) {
                config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
                config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
            }
        },
        {
            id: 'cadiz',
            title: 'Cádiz: un ejemplo a seguir',
            description: 'Sin embargo, la situación no es tan adversa en todas las regiones. En Cádiz todas las estaciones menos una son accesibles, siendo un ejemplo de la accesibilidad en el transporte ferroviario.',
            location: {
                desktop: { "center":[-6.2289,36.5852],"zoom":10.34,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
                mobile: { "center":[-6.1809,36.6009],"zoom":10.13,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
            },
            onChapterEnter: function(map) {
                config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
                config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
            }
        }
    ]
};

// ========= LÓGICA DE INICIALIZACIÓN Y EVENTOS (MOVIDA DESDE INDEX.HTML) ===========

// 1. Generación dinámica del HTML basada en config.js
const story = document.getElementById('story');
const features = document.createElement('div');
features.setAttribute('id', 'features');

if (config.title) {
    const header = document.createElement('div');
    header.innerHTML = `<h1>${config.title}</h1><h2>${config.subtitle}</h2>`;
    header.id = 'header';
    story.appendChild(header);
}

config.chapters.forEach((record, idx) => {
    const container = document.createElement('div');
    container.className = 'step';
    container.id = record.id;
    
    let content = `<h3>${record.title || ''}</h3>`;
    content += `<div>${record.description || ''}</div>`;
    
    container.innerHTML = content;
    features.appendChild(container);
});
story.appendChild(features);

// 2. Inicialización del Mapa
mapboxgl.accessToken = config.accessToken;
const initialLocation = config.getLocationParams(config.chapters[0].id);

const map = new mapboxgl.Map({
    container: 'map',
    style: config.style,
    center: initialLocation.center,
    zoom: initialLocation.zoom,
    bearing: initialLocation.bearing,
    pitch: initialLocation.pitch,
    renderWorldCopies: false,
    interactive: false
});

// 3. Carga de Capas y Fuentes de Datos
map.on("load", function () {
    
    // --- Fuentes de Datos ---
    map.addSource('lineas_cercanias_source', {
        type: 'vector', 
        url: 'mapbox://newtral.1014pr2h' 
    });
    
    map.addSource('estacion_source', {
        type: 'vector', 
        url: 'mapbox://newtral.c6soazn3'
    });

    // --- Capas de Visualización ---
    
    // Capa 1: Líneas de Cercanías (CON FILTRO DE EXCLUSIÓN)
    map.addLayer({
        'id': 'lineas_cercanias_layer', 
        'type': 'line',
        'source': 'lineas_cercanias_source',
        'source-layer': 'lineas_cercanias_geometria-bxvgvk',
        
        // FILTRO: Excluir las líneas especificadas
        'filter': [
            'all', 
            ['!=', ['get', 'shape_id'], '63_C1'],
            ['!=', ['get', 'shape_id'], '51_R11'],
            ['!=', ['get', 'shape_id'], '51_R13'],
            ['!=', ['get', 'shape_id'], '51_R14'],
            ['!=', ['get', 'shape_id'], '51_R15'],
            ['!=', ['get', 'shape_id'], '51_R16'],
            ['!=', ['get', 'shape_id'], '51_R17'],
            ['!=', ['get', 'shape_id'], '51_RT1']
        ],
        
        'paint': {
            'line-color': 'grey',
            'line-width': 3.5
        }
    }); 

    // Capa 2: Estaciones
    map.addLayer({
        'id': 'estacion_layer', 
        'type': 'circle',
        'source': 'estacion_source',
        'source-layer': 'estaciones_geometria-6rfokl',
        'paint': {
            'circle-color': '#494949',
            'circle-radius': 5,
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1
        }
    });
    
    // Ejecutar la lógica de entrada para el primer capítulo al cargar
    handleStepEnter({ element: { id: config.chapters[0].id }, index: 0 });
});

// 4. Configuración de Scrollama (Lógica de interacciones)
const scroller = scrollama();

function handleStepEnter(response) {
    const chapter = config.chapters.find(chap => chap.id === response.element.id);
    
    // A. Mover la cámara (Usa los parámetros del dispositivo)
    const locationParams = config.getLocationParams(chapter.id);
    
    if (locationParams.mapAnimation === 'flyTo') {
        map.flyTo({
            ...locationParams,
            duration: config.TRANSITION_DURATION_MS 
        });
    } else {
        map.jumpTo(locationParams);
    }

    // B. Ejecutar lógica personalizada (colores)
    if (chapter.onChapterEnter) {
        chapter.onChapterEnter(map);
    }

    // C. Gestión de clases CSS
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    response.element.classList.add('active');
}

// GESTIÓN DEL RESIZE (Para adaptar el zoom al girar el móvil o cambiar la ventana)
window.addEventListener('resize', () => {
    const activeStep = document.querySelector('.step.active');
    const chapterId = activeStep ? activeStep.id : config.chapters[0].id;

    const locationParams = config.getLocationParams(chapterId);

    // Se usa jumpTo para reajustar instantáneamente
    map.jumpTo(locationParams);
});

// Inicialización de Scrollama
scroller
    .setup({ step: '.step', offset: 0.5, debug: false })

    .onStepEnter(handleStepEnter);
