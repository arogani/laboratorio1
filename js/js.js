(() => {
    'use strict'

    let deck         = [];
    const tipos      = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador     = 0,
        puntosComputadora = 0;

    //REFERENCIAS DEL HTML
    const btnPedir     = document.querySelector('#btnPedir');
    const btnPlantarse = document.querySelector('#btnPlantarse');
    const btnNuevo     = document.querySelector('#btnNuevo');

    const divCartasJugador     = document.querySelector('#jugador-cartas'); 
    const divCartasComputadora = document.querySelector('#computadora-cartas');

    const puntosHTML = document.querySelectorAll('small'); //Usamos el <small>, al ser "ALL" toma el de ambos, Jugador y Computadora


    //FUNCION: CREA UN NUEVO DECK/BARAJA ALEATORIA _.SHUFFLE
    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }
        deck = _.shuffle(deck); // LA funciona _.SHUFLLE recupera datos de un arreglo de forma aleatoria
        return deck;
    } 
    crearDeck();

    //FUNCION: SABER EL VALOR EL VALOR DE LA CARTA Y QUITA DICHA CARTA DEL MASO 
    const pedirCarta = () => {
        if (deck.lenght === 0) {
            throw 'No hay mas cartas en el maso'
        }
        const carta = deck.pop(); // La funcion .POP, quita dicho valor del arreglo para que no se repita
        return carta;
    }
    //pedirCarta ();

    // FUNCION: SABER EL VALOR DE LA CARTA
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1); //substring recupera el valor cuando el digito es de 10 (dos digitos)
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1; //Valor ternario, si es A vale 11, sino 10 sino es un numero y lo multiplica por 1 para hacerlo number
    }

    //TURNO JUGADOR Y EVENTO "PEDIR CARTA" BOTON
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta); //Sumamos los puntos del jugador 
        puntosHTML[0].innerText = puntosJugador; //Muestra el resultado al lado del Titulo Jugador 1

        //Insertar la carta como Imagen
        const imgCarta = document.createElement('img'); 
        imgCarta.src = `cartas/${carta}.png`; //Muestra la carat que toco al hacer clic
        imgCarta.classList.add('carta'); //Toma la clase que se le dio y estilo css
        divCartasJugador.append(imgCarta); //Muestra la carta

        if  ( puntosJugador > 21) {
            console.warn('Lo siento, superaste 21 Puntos');
            btnPedir.disabled = true;
            btnPlantarse.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, BLACKJACK!!');
            btnPedir.disabled = true;
            btnPlantarse.disabled = true;
            turnoComputadora( puntosJugador );
        }
    });

    //EVENTO BTN PLANTARSE
    btnPlantarse.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
        turnoComputadora( puntosJugador ); //Se llama a la funcion del Turno de la Computadora
    });

    //TURNO LA COMPUTADORA PIDE LA CARTA
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta(); //Lllamamos a la funcion pedir carta 
            
            puntosComputadora = puntosComputadora + valorCarta (carta);
            puntosHTML[1].innerText = puntosComputadora;

            //Insertar la carta como Imagen
            const imgCarta = document.createElement('img'); 
            imgCarta.src = `cartas/${carta}.png`; //Muestra la carat que toco al hacer clic
            imgCarta.classList.add('carta'); //Toma la clase que se le dio y estilo css
            divCartasComputadora.append(imgCarta); //Muestra la carta
            
            if (puntosMinimos > 21){
                break;
            }
        
        } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('El juego quedo empatado');
            } else if ( puntosMinimos > 21) {
                alert('La computadora Gana');
            } else if (puntosComputadora > 21) {
                alert('Ganaste');
            } else {
                alert('Computadora Gana')
            }
        }, 150 ); //SetTimeout es una funcion que retrasa el alerta unos segundos

    }

    //EVENTO BTN NUEVO JUEGO
    btnNuevo.addEventListener ('click', () => {
    
        console.clear();
        deck = [];
        deck = crearDeck();
        
        puntosJugador     = 0;
        puntosComputadora = 0;
        
        puntosHTML [0].innerText  = 0;
        puntosHTML [1].innerText  = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML     = '';

        btnPedir.disabled     = false,
        btnPlantarse.disabled = false;
    });
})();