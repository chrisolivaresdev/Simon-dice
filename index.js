const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL= 10

      class Juego {
        constructor() {
            this.inicializar = this.inicializar.bind(this)
            this.inicializar()
            this.generarSecuencia()
            setTimeout(() => this.SiguienteNivel(), 500)        
            }

        inicializar() {
            this.elegirColor= this.elegirColor.bind(this)
            this.SiguienteNivel = this.SiguienteNivel.bind(this)
            btnEmpezar.classList.toggle('hide')
            this.nivel = 1
            this.colores = {
                celeste,
                violeta,
                naranja,
                verde
            } 
        }
        generarSecuencia(){      
            this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( m =>  Math.floor(Math.random() * 4))  
        }

        SiguienteNivel(){
            this.subnivel = 0
            this.iluminarSecuencia()
            this.agregarEventosClick()
        }

        TransformarNumeroAColor(numero){
            switch (numero) {
                    case 0:
                        return "celeste"
                    case 1:
                        return "violeta"
                    case 2:
                        return "naranja"
                    case 3:
                        return "verde"
            }
        }

        TransformarColorANumero(color){
            switch (color) {
                    case "celeste":
                        return 0
                    case "violeta":
                        return 1
                    case "naranja":
                        return 2
                    case "verde":
                        return 3
            }
        }

        iluminarSecuencia(){
            for(let i = 0; i < this.nivel; i++){
                const color = this.TransformarNumeroAColor(this.secuencia[i])
                setTimeout (() => this.iluminarColor(color), 1000 * i)
            }
        }

        iluminarColor(color){
            this.colores[color].classList.add("light")
            setTimeout(() => this.apagarColor(color), 350)
        }

        apagarColor(color){
            this.colores[color].classList.remove("light")
        }

        agregarEventosClick(){
            this.colores.celeste.addEventListener("click", this.elegirColor)
            this.colores.verde.addEventListener("click", this.elegirColor)
            this.colores.violeta.addEventListener("click", this.elegirColor)
            this.colores.naranja.addEventListener("click", this.elegirColor)
        }

        eliminarEventosClick(){
            this.colores.celeste.removeEventListener("click", this.elegirColor)
            this.colores.verde.removeEventListener("click", this.elegirColor)
            this.colores.violeta.removeEventListener("click", this.elegirColor)
            this.colores.naranja.removeEventListener("click", this.elegirColor)
        }


        elegirColor(ev){
            const nombreColor = ev.target.dataset.color
            const NumeroColor = this.TransformarColorANumero(nombreColor)
            this.iluminarColor(nombreColor)
            if (NumeroColor === this.secuencia[this.subnivel]){
                this.subnivel++
                if(this.subnivel === this.nivel){
                    this.nivel++
                   this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)){
                   this.ganoElJuego() 
                } 
                else{
                    setTimeout (this.SiguienteNivel , 1500)
                }
                }
            } 
            else {
                this.perdioElJuego()
            }
        }

        ganoElJuego(){
        swal("Enhorabuena","Ganaste el juego!", "success")
        .then(() => this.inicializar())
        }

        perdioElJuego(){
            swal("Lo lamentamos","Perdiste :( Vuelve a intentarlo", "error")
            .then(() => {
                this.eliminarEventosClick()
                this.inicializar()
                
            })
            }
      }


      function empezarJuego() {
        window.juego = new Juego()

      }