package com.TiendaSonido.TiendaSonido.catalogo;

import java.util.List;

/** Cat?logo inicial migrado desde el frontend (JSTienda.js / rama rayenn). */
public final class ProductosSemilla {

    private ProductosSemilla() {
    }

    public static List<Producto> lista() {
        return List.of(
        new Producto("GA001", "Guitarras Acústicas", "Guitarra Acústica Folk", "Yamaha", "F310", 8, 129990L, "Tapa de abeto, aros y fondo de meranti. Ideal para iniciantes."),
        new Producto("GA002", "Guitarras Acústicas", "Guitarra Acústica Dreadnought", "Fender", "CD-60S", 5, 189990L, "Tapa de abeto macizo, brazo de caoba. Sonido cálido y proyectado."),
        new Producto("GA003", "Guitarras Acústicas", "Guitarra Acústica Clásica 4/4", "Yamaha", "C40", 10, 89990L, "Nailon, tapa de abeto. Ideal para estudio y flamenco."),
        new Producto("GA004", "Guitarras Acústicas", "Guitarra Electroacústica", "Takamine", "GN20CE", 3, 349990L, "Pickup integrado, afinador incorporado."),
        new Producto("GA005", "Guitarras Acústicas", "Guitarra 3/4 Niños", "Yamaha", "JR1", 6, 79990L, "Tamaño reducido para niños de 6 a 10 años."),
        new Producto("GE001", "Guitarras Eléctricas", "Guitarra Eléctrica Stratocaster", "Squier", "Affinity Strat", 5, 249990L, "Cuerpo de álamo, mástil de arce, pastillas SSS."),
        new Producto("GE002", "Guitarras Eléctricas", "Guitarra Eléctrica Les Paul", "Epiphone", "Les Paul Std", 4, 329990L, "Cuerpo caoba, tapa arce, pastillas humbucker."),
        new Producto("GE003", "Guitarras Eléctricas", "Guitarra Eléctrica SG", "Epiphone", "SG Standard", 3, 319990L, "Cuerpo caoba, mástil caoba, 2 humbuckers."),
        new Producto("GE004", "Guitarras Eléctricas", "Guitarra Eléctrica Telecaster", "Squier", "Affinity Tele", 4, 239990L, "Cuerpo álamo, clavijero vintage, 2 pastillas single."),
        new Producto("GE005", "Guitarras Eléctricas", "Guitarra Eléctrica Semi-hollow", "Epiphone", "ES-335", 2, 549990L, "Semi-hueca, 2 humbuckers, ideal para jazz y blues."),
        new Producto("BA001", "Bajos Eléctricos", "Bajo Eléctrico 4 Cuerdas", "Squier", "Affinity PJ", 5, 299990L, "Pickup PJ, cuerpo álamo, mástil arce."),
        new Producto("BA002", "Bajos Eléctricos", "Bajo Eléctrico Jazz Bass", "Fender", "Player Jazz", 2, 699990L, "Alder body, 2 Alnico V Jazz single-coil."),
        new Producto("BA003", "Bajos Eléctricos", "Bajo Acústico 4 Cuerdas", "Yamaha", "APX700II", 2, 429990L, "Electroacústico, afinador incorporado."),
        new Producto("BT001", "Baterías", "Batería Acústica 5 piezas", "Pearl", "Roadshow", 2, 599990L, "Incluye stands, platillos y pedal de bombo."),
        new Producto("BT002", "Baterías", "Batería Electrónica 8 pads", "Roland", "TD-02KV", 2, 799990L, "Módulo TD-02, 8 pads de goma, pedal hi-hat."),
        new Producto("BT003", "Baterías", "Caja Snare 14\"", "Pearl", "STE1450", 4, 89990L, "Acero, 14x5\", 10 tensores."),
        new Producto("BT004", "Baterías", "Platillo Hi-Hat 14\"", "Zildjian", "A Series", 3, 149990L, "Latón B20, sonido brillante y claro."),
        new Producto("BT005", "Baterías", "Platillo Crash 16\"", "Zildjian", "A Series", 3, 129990L, "Latón B20, ataque rápido."),
        new Producto("TC001", "Teclados y Pianos", "Teclado Digital 61 teclas", "Yamaha", "PSR-E373", 4, 249990L, "61 teclas sensibles al tacto, 622 voces."),
        new Producto("TC002", "Teclados y Pianos", "Piano Digital 88 teclas", "Yamaha", "P-45", 2, 499990L, "88 teclas pesadas, 10 voces, pedal sustain incluido."),
        new Producto("TC003", "Teclados y Pianos", "Sintetizador 49 teclas", "Arturia", "Minilab MKII", 5, 129990L, "MIDI controller, 49 mini teclas."),
        new Producto("TC004", "Teclados y Pianos", "Teclado MIDI 88 teclas", "M-Audio", "Hammer 88", 2, 399990L, "88 teclas martillo, sin sonidos propios."),
        new Producto("AM001", "Amplificadores", "Amplificador Guitarra 15W", "Fender", "Frontman 15G", 5, 99990L, "15W, distorsión incorporada, entrada auxiliar."),
        new Producto("AM002", "Amplificadores", "Amplificador Guitarra 40W", "Marshall", "MG40GFX", 3, 299990L, "40W, 4 canales, efectos digitales integrados."),
        new Producto("AM003", "Amplificadores", "Amplificador Bajo 100W", "Hartke", "HD100", 2, 449990L, "100W, tweeter integrado, ecualizador de 4 bandas."),
        new Producto("AM004", "Amplificadores", "Amplificador Acústico 40W", "Fishman", "Loudbox Mini", 2, 499990L, "60W, 2 canales, reverb y chorus incorporados."),
        new Producto("MI001", "Micrófonos", "Micrófono Dinámico Cardioide", "Shure", "SM58", 8, 149990L, "Estándar industria para voz en vivo."),
        new Producto("MI002", "Micrófonos", "Micrófono Dinámico Instrumento", "Shure", "SM57", 6, 139990L, "Ideal para captura de instrumentos y amplificadores."),
        new Producto("MI003", "Micrófonos", "Micrófono Condensador", "Audio-Tech.", "AT2020", 4, 199990L, "Cardioide, XLR, ideal para grabación en estudio."),
        new Producto("MI004", "Micrófonos", "Micrófono USB de Condensador", "Blue", "Yeti", 5, 299990L, "USB, 4 patrones polares, ideal para streaming y podcast."),
        new Producto("PE001", "Pedales de Efectos", "Pedal Distorsión", "Boss", "DS-1", 7, 79990L, "Clásico pedal de distorsión, 3 controles."),
        new Producto("PE002", "Pedales de Efectos", "Pedal Reverb", "Boss", "RV-6", 4, 179990L, "8 modos de reverb, control de shimmer."),
        new Producto("PE003", "Pedales de Efectos", "Pedal Multi-efectos", "Boss", "ME-80", 2, 349990L, "Diseño tipo pedalboard, 8 efectos simultáneos."),
        new Producto("PE004", "Pedales de Efectos", "Pedal Tuner Cromático", "Boss", "TU-3", 8, 89990L, "Afinador cromático, indicador de tono."),
        new Producto("PE005", "Pedales de Efectos", "Pedal Delay", "MXR", "Carbon Copy", 4, 179990L, "Delay analógico cálido, tiempo 600ms."),
        new Producto("PE006", "Pedales de Efectos", "Pedal Overdrive", "Ibanez", "TS9", 6, 99990L, "Tube Screamer clásico, sonido suave y orgánico."),
        new Producto("AC001", "Accesorios", "Cuerdas Guitarra Eléctrica 09-42", "Ernie Ball", "Super Slinky", 25, 8990L, "Juego 6 cuerdas, calibre ligero."),
        new Producto("AC002", "Accesorios", "Cuerdas Guitarra Acústica 12-53", "Ernie Ball", "Earthwood", 20, 10990L, "Bronce fósforo, sonido cálido."),
        new Producto("AC003", "Accesorios", "Cuerdas Bajo 45-105", "Ernie Ball", "Regular Slinky", 12, 14990L, "Cuerdas de níquel enrollado, set 4 cuerdas."),
        new Producto("AC004", "Accesorios", "Púas de Guitarra x10 (0.73mm)", "Fender", "351", 50, 3990L, "Celulosa, grosor medio."),
        new Producto("AC005", "Accesorios", "Capotraste Guitarra", "Dunlop", "Trigger", 15, 12990L, "Capotraste de resorte, compatible 6 cuerdas."),
        new Producto("AC006", "Accesorios", "Afinador de Clip", "Snark", "SN-5", 20, 8990L, "Afinador cromático de clip, pantalla giratoria."),
        new Producto("AC007", "Accesorios", "Cable Instrumento 3m", "Monster", "S100-I-3", 15, 12990L, "Cable trenzado, conectores dorados, 3 metros."),
        new Producto("AC008", "Accesorios", "Cable Instrumento 6m", "Monster", "S100-I-6", 10, 17990L, "Cable trenzado, conectores dorados, 6 metros."),
        new Producto("AC009", "Accesorios", "Soporte Guitarra de Piso", "Hercules", "GS302B", 12, 22990L, "Soporte plegable con enganche automático."),
        new Producto("AC010", "Accesorios", "Soporte Guitarra de Pared", "Hercules", "WAH-202", 10, 18990L, "Montaje a pared, enganche automático."),
        new Producto("ES001", "Estudio y Grabación", "Interfaz de Audio 2x2 USB", "Focusrite", "Scarlett Solo", 4, 149990L, "1 entrada XLR+instrumento, 2 salidas, 24bit/192kHz."),
        new Producto("ES002", "Estudio y Grabación", "Auriculares de Estudio", "Audio-Tech.", "ATH-M20x", 6, 79990L, "Circumaurales, respuesta 15Hz-20kHz."),
        new Producto("ES003", "Estudio y Grabación", "Auriculares de Estudio Pro", "Audio-Tech.", "ATH-M50x", 4, 219990L, "Referencia de industria, sonido neutro y detallado."),
        new Producto("ES004", "Estudio y Grabación", "Monitor de Estudio 5\"", "Yamaha", "HS5", 2, 349990L, "Altavoz activo, respuesta plana, ideal mezcla."),
        new Producto("ES005", "Estudio y Grabación", "Pop Filter para Micrófono", "Sennheiser", "MZP 40", 8, 149990L, "Doble malla, brazo flexible con clip.")
        );
    }
}
