document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENTOS
    ========================== */

    const entrar = document.getElementById("entrar");
    const abertura = document.getElementById("abertura");
    const convite = document.getElementById("convite");

    const musica = document.getElementById("musica");
    const controleMusica = document.getElementById("controleMusica");

    const woodyBotao = document.getElementById("woodyBotao");
    const falarWoody = document.getElementById("falarWoody");
    const falaWoody = document.getElementById("falaWoody");

    const audioWoody = document.getElementById("audioWoody");


    /* =========================
       CONFIGURAÇÕES DA MÚSICA
    ========================== */

    musica.volume = 0.18;

    let musicaAtiva = false;

    /*
       Guarda se a música estava tocando
       antes do Woody começar a falar.
    */
    let musicaEstavaTocando = false;


    /* =========================
       ABRIR CONVITE
    ========================== */

    if (entrar) {

        entrar.addEventListener("click", async function () {

            /*
               O clique do convidado permite
               iniciar o áudio.
            */

            musica.volume = 0.18;

            try {

                await musica.play();

                musicaAtiva = true;

                if (controleMusica) {
                    controleMusica.textContent = "♫ Música: ON";
                }

            } catch (erro) {

                console.log(
                    "Não foi possível iniciar a música:",
                    erro
                );

                musicaAtiva = false;

            }


            /*
               Anima a abertura.
            */

            abertura.classList.add("saindo");


            /*
               Mostra o convite.
            */

            setTimeout(function () {

                abertura.style.display = "none";

                convite.classList.remove("escondido");

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }, 1000);

        });

    }


    /* =========================
       CONTROLE DA MÚSICA
    ========================== */

    if (controleMusica) {

        controleMusica.addEventListener(
            "click",
            async function () {

                /*
                   Se estiver tocando,
                   pausa.
                */

                if (!musica.paused) {

                    musica.pause();

                    musicaAtiva = false;

                    controleMusica.textContent =
                        "♫ Música: OFF";

                    return;
                }


                /*
                   Se estiver pausada,
                   volta a tocar.
                */

                try {

                    await musica.play();

                    musicaAtiva = true;

                    controleMusica.textContent =
                        "♫ Música: ON";

                } catch (erro) {

                    console.log(
                        "Erro ao voltar a música:",
                        erro
                    );

                }

            }
        );

    }


    /* =========================
       FUNÇÃO PARA PAUSAR MÚSICA
    ========================== */

    function pausarMusicaParaWoody() {

        musicaEstavaTocando = !musica.paused;

        if (musicaEstavaTocando) {
            musica.pause();
        }

    }


    /* =========================
       FUNÇÃO PARA VOLTAR MÚSICA
    ========================== */

    async function voltarMusicaDepoisDoWoody() {

        /*
           Só volta se ela estava tocando
           antes do Woody falar.
        */

        if (!musicaEstavaTocando) {
            return;
        }

        try {

            await musica.play();

            musicaAtiva = true;

            if (controleMusica) {
                controleMusica.textContent =
                    "♫ Música: ON";
            }

        } catch (erro) {

            console.log(
                "Não foi possível retomar a música:",
                erro
            );

        }

        musicaEstavaTocando = false;

    }


    /* =========================
       TEXTO DO WOODY
    ========================== */

    const textoWoody =
        "Oi! Eu sou o Woody! " +
        "O Rael está completando um ano " +
        "e você recebeu uma missão muito especial. " +
        "Venha comemorar esse dia com a gente! " +
        "Prepare-se para uma aventura inesquecível. " +
        "Eu espero você lá!";


    /* =========================
       FINALIZAR FALA
    ========================== */

    function terminouWoody() {

        if (woodyBotao) {
            woodyBotao.classList.remove("falando");
        }

        voltarMusicaDepoisDoWoody();

    }


    /* =========================
       FALAR COM ÁUDIO REAL
    ========================== */

    function tocarAudioWoody() {

        if (!audioWoody) {
            return false;
        }


        /*
           Verifica se o arquivo existe
           e se o navegador conseguiu
           carregar o áudio.
        */

        if (audioWoody.readyState < 2) {

            console.log(
                "Áudio do Woody ainda não carregado."
            );

            return false;
        }


        try {

            audioWoody.currentTime = 0;

            audioWoody.volume = 1;

            const promessa = audioWoody.play();


            if (promessa !== undefined) {

                promessa.catch(function (erro) {

                    console.log(
                        "Erro ao tocar áudio do Woody:",
                        erro
                    );

                });

            }

            return true;

        } catch (erro) {

            console.log(
                "Erro no áudio do Woody:",
                erro
            );

            return false;

        }

    }


    /* =========================
       VOZ AUTOMÁTICA
    ========================== */

    function falarComVozDoNavegador() {

        if (!("speechSynthesis" in window)) {

            alert(
                "Seu navegador não possui suporte para voz."
            );

            terminouWoody();

            return;

        }


        const sintetizador =
            window.speechSynthesis;


        /*
           Cancela qualquer fala anterior.
        */

        sintetizador.cancel();


        const fala =
            new SpeechSynthesisUtterance(
                textoWoody
            );


        /*
           Português do Brasil.
        */

        fala.lang = "pt-BR";

        /*
           Mais lento para parecer
           mais natural.
        */

        fala.rate = 0.88;

        /*
           Tom um pouco mais grave.
        */

        fala.pitch = 0.85;

        fala.volume = 1;


        /*
           Procura voz brasileira.
        */

        const vozes =
            sintetizador.getVoices();

        const vozBrasileira =
            vozes.find(function (voz) {

                return (
                    voz.lang &&
                    voz.lang
                        .toLowerCase()
                        .startsWith("pt-br")
                );

            });


        if (vozBrasileira) {
            fala.voice = vozBrasileira;
        }


        /*
           Quando terminar,
           volta a música.
        */

        fala.onend = function () {

            terminouWoody();

        };


        fala.onerror = function () {

            terminouWoody();

        };


        sintetizador.speak(fala);

    }


    /* =========================
       FUNÇÃO PRINCIPAL DO WOODY
    ========================== */

    function woodyFala() {

        /*
           Mostra o balão.
        */

        if (falaWoody) {

            falaWoody.classList.remove(
                "escondido"
            );

            falaWoody.textContent =
                "“" + textoWoody + "”";

        }


        /*
           Woody começa a falar.
        */

        if (woodyBotao) {
            woodyBotao.classList.add("falando");
        }


        /*
           Pausa a música.
        */

        pausarMusicaParaWoody();


        /*
           Se houver áudio real,
           tenta tocar o arquivo.
        */

        if (
            audioWoody &&
            audioWoody.readyState >= 2
        ) {

            audioWoody.currentTime = 0;

            audioWoody.volume = 1;


            const promessa =
                audioWoody.play();


            if (promessa !== undefined) {

                promessa
                    .then(function () {

                        /*
                           Áudio real começou.
                           Não usamos a voz automática.
                        */

                    })
                    .catch(function (erro) {

                        console.log(
                            "Áudio real falhou. Usando voz do navegador.",
                            erro
                        );

                        falarComVozDoNavegador();

                    });

            }

        } else {

            /*
               Se o arquivo não estiver
               disponível, usa voz automática.
            */

            falarComVozDoNavegador();

        }

    }


    /* =========================
       FINAL DO ÁUDIO REAL
    ========================== */

    if (audioWoody) {

        audioWoody.addEventListener(
            "ended",
            function () {

                terminouWoody();

            }
        );


        audioWoody.addEventListener(
            "error",
            function () {

                console.log(
                    "Não foi possível carregar woody-fala.wav"
                );

            }
        );

    }


    /* =========================
       CLIQUE NO WOODY
    ========================== */

    if (woodyBotao) {

        woodyBotao.addEventListener(
            "click",
            woodyFala
        );

    }


    /* =========================
       BOTÃO OUVIR O WOODY
    ========================== */

    if (falarWoody) {

        falarWoody.addEventListener(
            "click",
            woodyFala
        );

    }


    /* =========================
       CONTAGEM REGRESSIVA
    ========================== */

    const dataFesta =
        new Date(
            "2027-03-27T14:00:00-03:00"
        ).getTime();


    function atualizarContagem() {

        const agora =
            new Date().getTime();


        const distancia =
            dataFesta - agora;


        /*
           Se a festa chegou,
           zera o contador.
        */

        if (distancia <= 0) {

            document.getElementById(
                "dias"
            ).textContent = "00";

            document.getElementById(
                "horas"
            ).textContent = "00";

            document.getElementById(
                "minutos"
            ).textContent = "00";

            document.getElementById(
                "segundos"
            ).textContent = "00";

            return;

        }


        const dias =
            Math.floor(
                distancia /
                (1000 * 60 * 60 * 24)
            );


        const horas =
            Math.floor(
                (
                    distancia %
                    (1000 * 60 * 60 * 24)
                ) /
                (1000 * 60 * 60)
            );


        const minutos =
            Math.floor(
                (
                    distancia %
                    (1000 * 60 * 60)
                ) /
                (1000 * 60)
            );


        const segundos =
            Math.floor(
                (
                    distancia %
                    (1000 * 60)
                ) /
                1000
            );


        document.getElementById(
            "dias"
        ).textContent =
            String(dias).padStart(2, "0");


        document.getElementById(
            "horas"
        ).textContent =
            String(horas).padStart(2, "0");


        document.getElementById(
            "minutos"
        ).textContent =
            String(minutos).padStart(2, "0");


        document.getElementById(
            "segundos"
        ).textContent =
            String(segundos).padStart(2, "0");

    }


    atualizarContagem();

    setInterval(
        atualizarContagem,
        1000
    );


    /* =========================
       CARREGAMENTO DAS VOZES
    ========================== */

    if ("speechSynthesis" in window) {

        window.speechSynthesis.onvoiceschanged =
            function () {

                window.speechSynthesis.getVoices();

            };

    }


    /* =========================
       ANIMAÇÃO AO ROLAR
    ========================== */

    const elementos =
        document.querySelectorAll(
            ".placa, .card, .card-presentes, .confirmacao-conteudo"
        );


    if ("IntersectionObserver" in window) {

        const observador =
            new IntersectionObserver(

                function (entradas) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.style.opacity =
                                    "1";

                                entrada.target.style.transform =
                                    "translateY(0)";

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        elementos.forEach(
            function (elemento) {

                elemento.style.opacity =
                    "0";

                elemento.style.transform =
                    "translateY(30px)";

                elemento.style.transition =
                    "opacity .8s ease, transform .8s ease";

                observador.observe(
                    elemento
                );

            }
        );

    } else {

        /*
           Fallback para navegadores
           sem IntersectionObserver.
        */

        elementos.forEach(
            function (elemento) {

                elemento.style.opacity = "1";
                elemento.style.transform =
                    "translateY(0)";

            }
        );

    }

});