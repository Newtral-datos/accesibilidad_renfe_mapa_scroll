// Variable de configuración global
const config = {
    // 1. Credenciales y Estilo Base
    accessToken: 'pk.eyJ1IjoibmV3dHJhbCIsImEiOiJjazJrcDY4Y2gxMmg3M2JvazU4OXV6NHZqIn0.VO5GkvBq_PSJHvX7T8H9jQ', 
    style: 'mapbox://styles/newtral/cmfcdokcl006f01sd20984lhq',
    title: '<span style="border-bottom:solid 3px #01f3b3;">Viendo los trenes pasar</span>',
    subtitle: 'Las dificultades de ir en Cercanías si usas silla de ruedas',
    
    // Configuración global de la transición
    TRANSITION_DURATION_MS: 3500, 

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
        id: 'intro',
        description: 'Cercanías es uno de los principales medios de transporte urbanos con más de un millón de usuarios diarios, <a href="https://www.renfe.com/es/es/grupo-renfe/sociedades/renfe-viajeros/viajeros-conocenos/cercanias">según su operador Renfe</a>. Pero su uso no es igual de sencillo para todas las personas.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
        },
        onChapterEnter: function(map) {
            config.pintarLineas(map, '#494949');
            config.pintarEstaciones(map, '#494949'); 
        }
    },
    {
        id: 'datos-generales',
        description: 'Solo la mitad de sus estaciones figuran como accesibles, tal y como se puede comprobar a partir de la información publicada en las páginas oficiales de Renfe y Rodalies.<br><br>A este problema hay que añadirle la baja frecuencia de trenes adaptados en algunas líneas y regiones. El número de vehículos accesibles se situó en 2024 en el 65%, según la información aportada por Renfe.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, '#494949');
            config.pintarLineas(map, '#494949');
        }
    },
    {
        id: 'presentacion-cermi',
        description: 'Daniel Domínguez, asesor de movilidad inclusiva en el Comité Español de Representantes de Personas con Discapacidad (CERMI) define Cercanías como el <span style="background:#01f3b3; padding:1px 2px; border-radius:2px; color:black; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">"medio de transporte más excluyente para las personas con discapacidad".</span>',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, '#494949');
            config.pintarLineas(map, '#494949');
        }
    },
    {
        id: 'ave',
        description: 'Esta situación no es igual en todos los servicios ferroviarios. En el caso de la larga distancia y la alta velocidad la adaptabilidad es casi completa.<br><br>Pero, mientras que estos servicios contaron con 42 millones de viajeros en 2023, Cercanías, mucho menos adaptado, movilizó 10 veces más usuarios ese año, de acuerdo con el Observatorio del Ferrocarril.<br><br>Como consecuencia, desde el CERMI consideran que <span style="background:#01f3b3; padding:1px 2px; border-radius:2px; color:black; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">"la accesibilidad continúa siendo la gran asignatura pendiente de Cercanías".</span>',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'jumpTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map,'#494949');
            config.pintarLineas(map, '#494949');
        }
    },
    {
        id: 'estaciones-accesibles',
        description: 'De las 790 estaciones de Cercanías que figuran en la web de Renfe, únicamente 403 aparecen como accesibles (🟢 en el mapa).<br><br>Esto implica que <span style="background:#01f3b3; padding:1px 2px; border-radius:2px; color:black; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">casi la mitad de estaciones no están adaptadas</span> a las personas que utilizan silla de ruedas.',
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
        id: 'discrepancia-renfe',
        description: 'Sin embargo, de acuerdo con la información remitida por Renfe a Newtral, el 73,6% de las estaciones con más de 750 viajeros diarios están adaptadas, cifra que desciende al 56,5% en el caso de las menos concurridas.',
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
        id: 'discrepancia-renfe',
        description: '<b>• Un apunte.</b> La diferencia en las cifras se debe a que Renfe no proporciona información clara sobre qué estaciones son accesibles. El número varía dependiendo de la página que se consulte. Desde Newtral se han consultado los apartados de la web de Renfe correspondientes con las estaciones de cada línea (más detalles en la metodología).',
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
        id: 'discrepancias-renfe-2',
        description: 'Esta falta de información supone un problema añadido para las personas con movilidad reducida, para quienes <span style="background:#01f3b3; padding:1px 2px; border-radius:2px; color:black; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">la planificación es una parte fundamental de cada viaje.</span><br><br><iframe title="" aria-label="Gráfico de columnas" id="datawrapper-chart-xkGFI" src="https://datawrapper.dwcdn.net/xkGFI/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none; background-color: white;" height="418" data-external="1"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r,i=0;r=e[i];i++)if(r.contentWindow===a.source){var d=a.data["datawrapper-height"][t]+"px";r.style.height=d}}});</script>',
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
        id: 'problema-regional',
        title: "El problema de la accesibilidad en Cercanías no es igual en todas las regiones:",
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
        id: 'cadiz',
        description: 'Cádiz se sitúa como uno de los núcleos de Cercanías más accesibles. Se trata de la sexta ciudad con la red más extensa, y cuenta con 29 estaciones adaptadas a los usuarios con movilidad reducida, faltando solo una para llegar al 100%.',
        location: {
            desktop: { "center":[-6.2289,36.5852],"zoom":10.34,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-6.1809,36.6009],"zoom":10.13,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'zaragoza',
        description: 'La accesibilidad completa se logra en Zaragoza, donde todas sus estaciones están adaptadas, aunque la ciudad solo cuenta con cinco.',
        location: {
            desktop: { "center":[-0.9059,41.6806],"zoom":10.77,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-0.9059,41.6806],"zoom":10.57,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'cartagena',
        description: 'En Cartagena el Cercanías también es completamente accesible.',
        location: {
            desktop: { "center":[-0.8769,37.6041],"zoom":10.33,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-0.8769,37.6041],"zoom":10.13,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'norte',
        description: 'La situación en el norte es bastante más limitada, localizándose en la región cantábrica las zonas menos adaptadas. ',
        location: {
            desktop: { "center":[-4.8941,43.931],"zoom":6.18,"pitch":5,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-4.8941,43.931],"zoom":6.18,"pitch":5,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'bilbao',
        description: 'En Bilbao solo una de cada diez estaciones es accesible, por lo que es prácticamente inviable usar Cercanías si se va en silla de ruedas.',
        location: {
            desktop: { "center":[-3.0127,43.1938],"zoom":9.47,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-3.0127,43.1938],"zoom":9.47,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'san-sebastian',
        description: 'Algo similar sucede en otra ciudad vasca, San Sebastián, donde el porcentaje sube pero se queda en el 25%.',
        location: {
            desktop: { "center":[-2.0962,43.1765],"zoom":9.35,"pitch":29,"bearing":-15, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.0962,43.1765],"zoom":9.35,"pitch":29,"bearing":-15, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'noroeste',
        description: 'En Ferrol o Asturias el número de estaciones adaptadas se sitúa cercano a un tercio del total.',
        location: {
            desktop: { "center":[-6.7769,43.6493],"zoom":7.12,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-6.7769,43.6493],"zoom":7.12,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'grandes-estaciones',
        description: 'Dentro de estas zonas existen también grandes desigualdades en función de dónde se viva. Se puede apreciar con las grandes estaciones.<br><br>De las 30 estaciones que más viajeros tuvieron en 2023, según el Observatorio del Ferrocarril en España, el 70% aparecen como adaptadas, por encima de la media nacional. La diferencia se explica por la mayor afluencia de viajeros, que las sitúa entre las prioridades de las instituciones públicas.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'madrid',
        description: 'Madrid es un ejemplo de las desigualdades que se dan dentro de un mismo territorio.<br><br>De sus nueve líneas de Cercanías, cuatro superan el 70% de accesibilidad, y en otras tres la cifra se sitúa en torno al 60%.',
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
        id: 'c5',
        description: 'Sin embargo, en la línea C5, situada en el sur de la Comunidad, solo tres de sus 23 paradas están adaptadas, a pesar de que cinco de ellas estuvieron entre las 30 más transitadas.<br><br>La baja accesibilidad coincide con que la línea transcurre por tres de los seis municipios con más población de Madrid en 2025, según el INE: Móstoles (214.800 habitantes), Leganés (195.700) y Fuenlabrada (190.000).',
        location: {
            desktop: { "center":[-3.8043,40.3181],"zoom":11.24,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-3.8043,40.3181],"zoom":11.24,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'dominguez-no-accesible',
        description: 'Domínguez incide en que, cuando necesitas una silla de ruedas para poder desplazarte, “ni te planteas ir a una estación no accesible” y supone depender de otras personas para poder viajar.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'dominguez-no-accesible2',
        description: 'Por tanto, la existencia de una sola estación no adaptada en una línea ya imposibilita por completo que los usuarios viajen hacia o desde dicha parada.<br><br><iframe src="https://flo.uri.sh/visualisation/26723197/embed" title="Interactive content" frameborder="0" scrolling="no" style="width:100%;height:1000px;background-color:white;" sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"></iframe>',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },


    {
        id: 'ley',
        description: 'Para Domínguez, Renfe “no se ha tomado en serio” la adaptación de Cercanías. La legislación existente sobre accesibilidad en el transporte público entró en vigor en 2007 con el <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2007-20785#ani">Real Decreto 1544/2007.</a>',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'ley2',
        description: 'El fin de esta normativa es garantizar el tránsito de los usuarios con movilidad reducida, de forma autónoma, desde el aparcamiento hasta el andén y el interior de los vehículos, para lo cual se establecieron dos plazos en función del número de usuarios de cada estación.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'mad-sur',
        description: 'En el caso de las de más de 1.000 habitantes o situadas en capitales de provincias, el plazo para la adaptación terminó en 2015.',
        location: {
            desktop: { "center":[-3.8043,40.3181],"zoom":11.24,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-3.8043,40.3181],"zoom":11.24,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'mad-sur2',
        description: 'Sin embargo, ni la estación de Fuenlabrada (26.690 viajeros diarios en 2023) ni la de Móstoles (23.000 usuarios al día) están adaptadas, situación que se repite en otras estaciones de gran afluencia.',
        location: {
            desktop: { "center":[-3.8043,40.3181],"zoom":11.24,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-3.8043,40.3181],"zoom":11.24,"pitch":25,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'estaciones-pequenias',
        description: 'Pero el incumplimiento también se da en las estaciones entre 750 y 1.000 usuarios diarios, que deberían haberse adaptado antes de 2020.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'lesvalles',
        description: 'Renfe ha informado de que continúa reformando estaciones para lograr una mayor accesibilidad.<br><br>En 2025 invirtieron 39 millones de euros para adaptar una treintena de estaciones, habiendo concluido también la reforma en Les Valles (València).',
        location: {
            desktop: { "center":[-0.2474,39.7027],"zoom":11.37,"pitch":25,"bearing":25, "mapAnimation": 'flyTo' },
            mobile: { "center":[-0.2474,39.7027],"zoom":11.37,"pitch":25,"bearing":25, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'plan-accesibilidad',
        description: 'Las reformas se incluyen en el Plan de Accesibilidad de Renfe implementado en 2020 que, poniéndose como fecha límite el año 2028, pretende "proporcionar la accesibilidad universal a toda la cadena de viaje desde el acceso a la estación de origen hasta el abandono en destino y conseguir un ferrocarril accesible e inclusivo que proporcione autonomía personal".',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'plan-accesibilidad2',
        description: 'Pero para Domínguez el plan, teniendo en cuenta la situación actual y el tiempo que conlleva reformar estaciones y adquirir nuevos vehículos, no es viable.',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'denuncia-cermi',
        description: 'Además, incluso si se materializan las previsiones de la compañía, Cercanías llega tarde, al haber incumplido los plazos legales establecidos en 2007.<br><br>Esta situación ha empujado a asociaciones como el CERMI a <a href = "https://observatoriodelaaccesibilidad.es/archivos/5106">llevar a la compañía ferroviaria a los tribunales.</a>',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'vehiculos-accesibles',
        description: 'Los problemas de accesibilidad de las estaciones se suman a la falta de trenes adaptados. <span style="background:#01f3b3; padding:1px 2px; border-radius:2px; color:black; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">Un 35% de los trenes sigue sin estar adaptado</span> y, aunque puedas acceder al andén, puede pasar mucho tiempo sin que llegue un tren que te permita subirte.<br><br><iframe title="Un 35% de los vehículos de Cercanías continúan sin ser accesibles" aria-label="Líneas" id="datawrapper-chart-GgB9t" src="https://datawrapper.dwcdn.net/GgB9t/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; background: white; border: none;" height="451" data-external="1"></iframe><script type="text/javascript">window.addEventListener("message",function(a){if(void 0!==a.data["datawrapper-height"]){var e=document.querySelectorAll("iframe");for(var t in a.data["datawrapper-height"])for(var r,i=0;r=e[i];i++)if(r.contentWindow===a.source){var d=a.data["datawrapper-height"][t]+"px";r.style.height=d}}});</script>',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'ambiente-hostil',
        description: '<span style="background:#01f3b3; padding:1px 2px; border-radius:2px; color:black; box-shadow:0px 0px 5px 1px rgba(0,0,0,0.07); cursor:pointer;">“Una estación es el ambiente más hostil para una persona con discapacidad”</span>, señala Domínguez',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'vida-normal',
        description: 'Estas situaciones se traducen en la imposibilidad de llevar una vida corriente cuando vas en silla de ruedas.',
        location: {
            desktop: { "center":[-3.3523,40.4883],"zoom":13.34,"pitch":40,"bearing":10, "mapAnimation": 'flyTo' },
            mobile: { "center":[-3.3523,40.4883],"zoom":13.13,"pitch":40,"bearing":10, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'uni-alcala',
        description: 'Dominguez, residente en Guadalajara, lo ejemplifica con el caso de la Universidad de Alcalá. Este centro, que contó con <a href="https://www.ciencia.gob.es/Ministerio/Estadisticas/SIIU/Estudiantes.html">16.688 estudiantes en el curso 2024-2025</a>, no tiene ninguna parada de Cercanías adaptada.<br><br>Una situación así termina limitando hasta las posibilidades de formación de las personas con movilidad reducida, haciéndoles sentir "ciudadanos de tercera".',
        location: {
            desktop: { "center":[-3.3523,40.4883],"zoom":13.34,"pitch":40,"bearing":10, "mapAnimation": 'flyTo' },
            mobile: { "center":[-3.3523,40.4883],"zoom":13.13,"pitch":40,"bearing":10, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    },
    {
        id: 'final-scroll',
        description: 'Puedes consultar en el mapa qué estaciones muestra Renfe como accesibles',
        location: {
            desktop: { "center":[-4.5168,40.4391],"zoom":5.79,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' },
            mobile: { "center":[-2.9756,41.0247],"zoom":4.39,"pitch":0,"bearing":0, "mapAnimation": 'flyTo' }
        },
        onChapterEnter: function(map) {
            config.pintarEstaciones(map, config.STATION_COLOR_EXPRESSION);
            config.pintarLineas(map, config.LINE_COLOR_EXPRESSION);
        }
    }

    ]
};

// A partir de este punto se permite la navegación libre por el mapa.


// ========= LÓGICA DE INICIALIZACIÓN Y EVENTOS ===========

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

// 5. HABILITAR NAVEGACIÓN LIBRE AL FINAL
let popupsInitialized = false; 
let storyWasFinished = false; // Nueva variable para rastrear si el usuario llegó al final

const resetBtn = document.getElementById('reset-btn');
const freeNavBtn = document.getElementById('free-nav-btn');

scroller.onStepExit((response) => {
    const isLastChapter = response.element.id === config.chapters[config.chapters.length - 1].id;

    if (isLastChapter && response.direction === 'down') {
        // ENTRADA EN MODO LIBRE (Final de la página)
        map.scrollZoom.enable();
        map.dragPan.enable();
        map.dragRotate.enable();
        map.keyboard.enable();
        map.doubleClickZoom.enable();
        map.touchZoomRotate.enable();

        resetBtn.style.display = 'block';   // Muestra botón "Subir"
        freeNavBtn.style.display = 'none';  // Oculta botón "Bajar" (ya estamos abajo)

        if (!popupsInitialized) {
            setupStationPopups();
            popupsInitialized = true;
        }
    } else {
        // MODO LECTURA (Scroll intermedio)
        map.scrollZoom.disable();
        map.dragPan.disable();
        map.dragRotate.disable();
        map.keyboard.disable();
        map.doubleClickZoom.disable();
        map.touchZoomRotate.disable();

        resetBtn.style.display = 'none';

        // Lógica condicional para el nuevo botón:
        // Solo se muestra si el usuario ya terminó la historia una vez y NO está al final
        if (storyWasFinished) {
            freeNavBtn.style.display = 'block';
        }
    }
});

// Botón: Volver al inicio (Texto)
resetBtn.addEventListener('click', () => {
    storyWasFinished = true; // Marcamos que el usuario ya conoce el final
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Botón: Volver al final (Mapa libre)
freeNavBtn.addEventListener('click', () => {
    window.scrollTo({
        top: document.body.scrollHeight, // Hace scroll hasta el fondo de la página
        behavior: 'smooth'
    });
});

// 6. LÓGICA DE POP-UPS (se mantiene sin cambios)
function setupStationPopups() {
    console.log("Interactividad de estaciones activada");
    let popup; 

    const createPopupContent = (props) => {
        const estacionNombre = props.estacion || 'Nombre Desconocido';
        const esAccesible = props.accesible; 
        
        let content = 
            `<big><b><big>${estacionNombre}</big></b></big><br>`;

        if (esAccesible === 0) {
            content += 
                `<br><span style="border-bottom:solid 3px #cf023d; color:black"><b><big>ATENCIÓN: estación no accesible</big></b></span>`;
        } else if (esAccesible === 1) {
            content += 
                `<br><span style="background:#01f3b3; padding:4px 8px; border-radius:999px; color:black; font-weight:bold; box-shadow:0px 4px 18px rgba(0,0,0,0.1); cursor:pointer;">Estación accesible</span>`;
        }
        return content;
    };

    // 1. Mostrar Pop-up al pasar el ratón
    map.on('mouseenter', 'estacion_layer', function (e) {
        map.getCanvas().style.cursor = 'pointer';
        
        if (popup) popup.remove();

        const props = e.features[0].properties;
        popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false })
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(createPopupContent(props))
            .addTo(map);
    });

    // 2. Ocultar Pop-up al quitar el ratón
    map.on('mouseleave', 'estacion_layer', function () {
        map.getCanvas().style.cursor = '';
        if (popup) {
            popup.remove();
            popup = null;
        }
    });

    // 3. Funcionalidad de Clic 
    map.on('click', 'estacion_layer', function (e) {
        if (popup) popup.remove(); 

        const props = e.features[0].properties;
        new mapboxgl.Popup() 
            .setLngLat(e.lngLat)
            .setHTML(createPopupContent(props))
            .addTo(map);
    });
}





// Función de volcado de configuración (se mantiene)
function dumpCurrentChapterConfig() {
    const center = map.getCenter();
    const zoom = map.getZoom();
    const pitch = map.getPitch();
    const bearing = map.getBearing();

    const configObject = {
        center: [parseFloat(center.lng.toFixed(4)), parseFloat(center.lat.toFixed(4))],
        zoom: parseFloat(zoom.toFixed(2)),
        pitch: parseFloat(pitch.toFixed(1)),
        bearing: parseFloat(bearing.toFixed(1))
    };

    console.log(JSON.stringify(configObject));
}
