document.addEventListener("DOMContentLoaded", function () {

    const entrar = document.getElementById("entrar");
    const abertura = document.getElementById("abertura");
    const convite = document.getElementById("convite");

    const musica = document.getElementById("musica");
    const controleMusica =
        document.getElementById("controleMusica");


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

        entrar.addEventListener("click", async function () {

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


            if (abertura) {
                abertura.classList.add("saindo");
            }


            setTimeout(function () {

                if (abertura) {
                    abertura.style.display = "none";
                }

                if (convite) {
                    convite.classList.remove("escondido");
                }

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

    if (controleMusica && musica) {

        controleMusica.addEventListener(
            "click",
            async function () {

                if (!musica.paused) {

                    musica.pause();

                    controleMusica.textContent =
                        "♫ Música: OFF";

                } else {

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

            }
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

        const agora = new Date().getTime();

        const distancia =
            dataFesta - agora;


        if (distancia <= 0) {

            const dias =
                document.getElementById("dias");

            const horas =
                document.getElementById("horas");

            const minutos =
                document.getElementById("minutos");

            const segundos =
                document.getElementById("segundos");


            if (dias) dias.textContent = "00";
            if (horas) horas.textContent = "00";
            if (minutos) minutos.textContent = "00";
            if (segundos) segundos.textContent = "00";

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


        const elementoDias =
            document.getElementById("dias");

        const elementoHoras =
            document.getElementById("horas");

        const elementoMinutos =
            document.getElementById("minutos");

        const elementoSegundos =
            document.getElementById("segundos");


        if (elementoDias) {
            elementoDias.textContent =
                String(dias).padStart(2, "0");
        }

        if (elementoHoras) {
            elementoHoras.textContent =
                String(horas).padStart(2, "0");
        }

        if (elementoMinutos) {
            elementoMinutos.textContent =
                String(minutos).padStart(2, "0");
        }

        if (elementoSegundos) {
            elementoSegundos.textContent =
                String(segundos).padStart(2, "0");
        }

    }


    atualizarContagem();

    setInterval(
        atualizarContagem,
        1000
    );


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

                elemento.style.opacity = "0";

                elemento.style.transform =
                    "translateY(30px)";

                elemento.style.transition =
                    "opacity .8s ease, transform .8s ease";

                observador.observe(elemento);

            }
        );

    } else {

        elementos.forEach(
            function (elemento) {

                elemento.style.opacity = "1";

                elemento.style.transform =
                    "translateY(0)";

            }
        );

    }

});
