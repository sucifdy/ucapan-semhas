document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const button = document.getElementById("actionButton");
    const message = document.getElementById("message");
    const vadelScreen = document.getElementById("vadelScreen");
    const vadelVideo = document.getElementById("vadelVideo");
    const questionSheet = document.getElementById("questionSheet");
    const continueButton = document.getElementById("continueButton");
    const celebrationMusic = document.getElementById("celebrationMusic");
    const confettiCanvas = document.getElementById("confettiCanvas");
    const ctx = confettiCanvas.getContext("2d");

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    let particles = [];
    let stage = 0;

    button.addEventListener("click", () => {
        if (stage === 0) {
            container.classList.remove("dark");
            container.classList.add("light");
            message.textContent = "Selamat, Anda Kena Tipu!";
            message.classList.add("visible");
            button.textContent = "Lanjutkan";
            stage++;
        } else if (stage === 1) {
            container.classList.remove("light");
            container.classList.add("mystery");
            message.textContent = "Sebentar...";
            button.style.display = "none";
            setTimeout(() => {
                message.textContent = "Apakah Anda Siap?";
                button.style.display = "block";
                button.textContent = "Lihat Kejutan";
                stage++;
            }, 2000);
        } else if (stage === 2) {
            vadelScreen.classList.add("visible");
            button.style.display = "none";
            vadelVideo.play();
            vadelVideo.onended = () => {
                vadelScreen.classList.remove("visible");
                questionSheet.classList.add("visible");
            };
        }
    });

    continueButton.addEventListener("click", () => {
        questionSheet.classList.remove("visible");
        container.classList.add("girly");
        message.textContent = "SELAMAT SEMHAS!";
        startConfetti();
        playMusic();
        setTimeout(() => {
            message.textContent = "Selamat atas pencapaianmu! Semoga sukses selalu!";
        }, 5000);
    });

    function playMusic() {
        celebrationMusic.play();
    }

    function startConfetti() {
        for (let i = 0; i < 500; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height,
                radius: Math.random() * 5 + 2,
                color: `hsl(${Math.random() * 360}, 100%, 70%)`,
                velocityX: Math.random() * 5 - 2.5,
                velocityY: Math.random() * 5 - 2.5,
            });
        }

        function animateParticles() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            particles.forEach((particle) => {
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.fill();

                particle.x += particle.velocityX;
                particle.y += particle.velocityY;

                if (particle.x < 0 || particle.x > confettiCanvas.width) particle.velocityX *= -1;
                if (particle.y < 0 || particle.y > confettiCanvas.height) particle.velocityY *= -1;
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }
});
