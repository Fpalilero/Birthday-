const correctPasscode = "0716";

const backgrounds = [
  "images/person1.jpg",
  "images/person2.jpg"
];

let bgIndex = 0;
let backgroundTimer;

function startBackgroundSlideshow() {
  document.body.style.backgroundImage = `url('${backgrounds[0]}')`;

  backgroundTimer = setInterval(() => {
    bgIndex++;

    if (bgIndex >= backgrounds.length) {
      bgIndex = 0;
    }

    document.body.style.backgroundImage = `url('${backgrounds[bgIndex]}')`;
  }, 4000);
}

function addDigit(num) {
  const input = document.getElementById("passcode-input");

  if (input.value.length < 4) {
    input.value += num;
  }

  if (input.value.length === 4) {
    checkPasscode();
  }
}

function deleteDigit() {
  const input = document.getElementById("passcode-input");
  input.value = input.value.slice(0, -1);
}

function checkPasscode() {
  const input = document.getElementById("passcode-input");
  const errorMessage = document.getElementById("error-message");

  if (input.value === correctPasscode) {
    document.getElementById("passcode-screen").classList.add("hidden");
    document.getElementById("success-screen").classList.remove("hidden");
  } else {
    errorMessage.textContent = "Wrong passcode. Try again!";
    input.value = "";
  }
}

document.getElementById("passcode-input").addEventListener("input", function() {
  if (this.value.length === 4) {
    checkPasscode();
  }
});

function startCountdown() {
  document.getElementById("success-screen").classList.add("hidden");
  document.getElementById("countdown-screen").classList.remove("hidden");

  let count = 3;
  const countdown = document.getElementById("countdown");

  countdown.textContent = count;

  const timer = setInterval(() => {
    count--;
    countdown.textContent = count;

    if (count <= 0) {
      clearInterval(timer);
      countdown.textContent = "🎂";

      setTimeout(() => {
        document.getElementById("countdown-screen").classList.add("hidden");
        document.getElementById("birthday-screen").classList.remove("hidden");

        document.body.classList.add("birthday-mode");
        startBackgroundSlideshow();
      }, 1000);
    }
  }, 1000);
}

const memories = [
  {
    name: "Friends at Topgolf",
    photo: "images/person1.jpg",
    message: "Julio, we appreciate the laughs, memories, and the brotherhood you bring into our lives."
  },
  {
    name: "Family & Friends",
    photo: "images/person2.jpg",
    message: "Happy birthday Julio! You are loved more than you know, and we are grateful for you."
  }
];

let currentMemory = 0;

function showPhotos() {
  document.getElementById("birthday-screen").classList.add("hidden");
  document.getElementById("photos-screen").classList.remove("hidden");
  showMemory();
}

function showMemory() {
  document.getElementById("memory-photo").src = memories[currentMemory].photo;
  document.getElementById("memory-name").textContent = memories[currentMemory].name;
  document.getElementById("memory-message").textContent = memories[currentMemory].message;
}

function nextMemory() {
  if (currentMemory >= memories.length - 1) {
    document.getElementById("photos-screen").classList.add("hidden");
    document.getElementById("final-screen").classList.remove("hidden");

    setTimeout(() => {
      document.getElementById("final-message").classList.add("fade-out");

      setTimeout(() => {
        document.getElementById("final-message").style.display = "none";
        document.getElementById("final-cake").classList.remove("hidden");

        launchConfetti();

        setTimeout(() => {
          const cake = document.getElementById("final-cake");

          const title = document.createElement("h1");
          title.innerHTML = "🎉 HAPPY BIRTHDAY JULIO 🎉";
          title.style.color = "white";
          title.style.marginTop = "20px";
          title.style.fontSize = "48px";

          cake.appendChild(title);
        }, 2000);

      }, 4000);

    }, 40000);

    return;
  }

  currentMemory++;
  showMemory();
}

function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(piece => {
      ctx.fillStyle = piece.color;
      ctx.fillRect(piece.x, piece.y, piece.size, piece.size);

      piece.y += piece.speed;

      if (piece.y > canvas.height) {
        piece.y = -10;
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}