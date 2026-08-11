document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       ELEMENTOS
    ========================== */

    const entrar =
        document.getElementById("entrar");

    const abertura =
        document.getElementById("abertura");

    const convite =
        document.getElementById("convite");

    const musica =
        document.getElementById("musica");

    const controleMusica =
        document.getElementById("controleMusica");

    const paginas =
        document.querySelectorAll(
            ".pagina[data-pagina]"
        );

    const botoesNavegacao =
        document.querySelectorAll(
            "[data-ir]"
        );


    /* =========================
       MÚSICA
    ========================== */

    if (musica) {

        musica.volume = 0.18;

    }


    /* =========================
       ABRIR CONVITE
    ========================== */

    if (entrar) {

        entrar.addEventListener(
            "click",
            async function () {


                /* Toca a música */

                if (musica) {

                    musica.volume = 0.18;

                    try {

                        await musica.play();

                        if (controleMusica) {

                            controleMusica.textContent =
                                "♫ Música: ON";

                        }

                    } catch (erro) {

                        console.log(
                            "Não foi possível iniciar a música:",
                            erro
                        );

                    }

                }


                /* Sai da abertura */

                if (abertura) {

                    abertura.classList.add(
                        "saindo"
                    );

                }


                /* Mostra o convite */

                setTimeout(
                    function () {

                        if (abertura) {

                            abertura.style.display =
                                "none";

                        }


                        if (convite) {

                            convite.classList.remove(
                                "escondido"
                            );

                        }


                        mostrarPagina(0);

                    },
                    1000
                );

            }
        );

    }


    /* =========================
       CONTROLE DA MÚSICA
    ========================== */

    if (
        controleMusica &&
        musica
    ) {

        controleMusica.addEventListener(
            "click",
            async function () {


                /* PAUSAR */

                if (!musica.paused) {

                    musica.pause();

                    controleMusica.textContent =
                        "♫ Música: OFF";

                    return;

                }


                /* VOLTAR A TOCAR */

                try {

                    await musica.play();

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
       MOSTRAR PÁGINA
    ========================== */

    function mostrarPagina(numero) {


        paginas.forEach(
            function (pagina) {

                pagina.classList.remove(
                    "ativa"
                );

            }
        );


        const paginaSelecionada =
            document.querySelector(
                '.pagina[data-pagina="' +
                numero +
                '"]'
            );


        if (paginaSelecionada) {

            paginaSelecionada.classList.add(
                "ativa"
            );


            /*
               Sempre começa no topo
               da página.
            */

            paginaSelecionada.scrollTop = 0;

        }

    }


    /* =========================
       BOTÕES DE NAVEGAÇÃO
    ========================== */

    botoesNavegacao.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function () {

                    const destino =
                        Number(
                            botao.getAttribute(
                                "data-ir"
                            )
                        );


                    mostrarPagina(
                        destino
                    );

                }
            );

        }
    );


    /* =========================
       TECLADO
       SETAS ← →
    ========================== */

    document.addEventListener(
        "keydown",
        function (evento) {

            /*
               Descobre a página atual.
            */

            const paginaAtual =
                document.querySelector(
                    ".pagina.ativa[data-pagina]"
                );


            if (!paginaAtual) {
                return;
            }


            const numeroAtual =
                Number(
                    paginaAtual.getAttribute(
                        "data-pagina"
                    )
                );


            /*
               Seta direita
               avança.
            */

            if (
                evento.key === "ArrowRight" &&
                numeroAtual < paginas.length - 1
            ) {

                mostrarPagina(
                    numeroAtual + 1
                );

            }


            /*
               Seta esquerda
               volta.
            */

            if (
                evento.key === "ArrowLeft" &&
                numeroAtual > 0
            ) {

                mostrarPagina(
                    numeroAtual - 1
                );

            }

        }
    );


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

            const dias =
                document.getElementById(
                    "dias"
                );

            const horas =
                document.getElementById(
                    "horas"
                );

            const minutos =
                document.getElementById(
                    "minutos"
                );

            const segundos =
                document.getElementById(
                    "segundos"
                );


            if (dias) {
                dias.textContent = "00";
            }

            if (horas) {
                horas.textContent = "00";
            }

            if (minutos) {
                minutos.textContent = "00";
            }

            if (segundos) {
                segundos.textContent = "00";
            }


            return;

        }


        const dias =
            Math.floor(
                distancia /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const horas =
            Math.floor(
                (
                    distancia %
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                ) /
                (
                    1000 *
                    60 *
                    60
                )
            );


        const minutos =
            Math.floor(
                (
                    distancia %
                    (
                        1000 *
                        60 *
                        60
                    )
                ) /
                (
                    1000 *
                    60
                )
            );


        const segundos =
            Math.floor(
                (
                    distancia %
                    (
                        1000 *
                        60
                    )
                ) /
                1000
            );


        const elementoDias =
            document.getElementById(
                "dias"
            );

        const elementoHoras =
            document.getElementById(
                "horas"
            );

        const elementoMinutos =
            document.getElementById(
                "minutos"
            );

        const elementoSegundos =
            document.getElementById(
                "segundos"
            );


        if (elementoDias) {

            elementoDias.textContent =
                String(dias)
                .padStart(2, "0");

        }


        if (elementoHoras) {

            elementoHoras.textContent =
                String(horas)
                .padStart(2, "0");

        }


        if (elementoMinutos) {

            elementoMinutos.textContent =
                String(minutos)
                .padStart(2, "0");

        }


        if (elementoSegundos) {

            elementoSegundos.textContent =
                String(segundos)
                .padStart(2, "0");

        }

    }


    atualizarContagem();


    setInterval(
        atualizarContagem,
        1000
    );


});
