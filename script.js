let THREE;
let OrbitControls;
const app = document.getElementById("app");
const params = new URLSearchParams(location.search);
const page = params.get("page") || "home";

const subjects = [
  ["Mathematics", "📐", "Numbers, formulas and problem solving"],
  ["Science", "🔬", "Explore the world of science"],
  ["English", "📖", "Grammar, reading and writing"],
  ["Hindi", "अ", "हिंदी भाषा और व्याकरण"],
  ["Social Science", "🌍", "History, geography and civics"],
  ["Computer", "💻", "Technology and computer basics"],
  ["Physics", "⚡", "Motion, energy and forces"],
  ["Chemistry", "🧪", "Atoms, elements and reactions"],
  ["Biology", "🧬", "Life and living organisms"]
];

const lessons = {
  Science: ["Introduction to Science", "Living and Non-living Things", "Plants Around Us", "Human Body", "Solar System"],
  Mathematics: ["Numbers", "Addition and Subtraction", "Multiplication", "Geometry", "Fractions"],
  English: ["Grammar Basics", "Nouns and Pronouns", "Verbs", "Reading Comprehension", "Writing Skills"],
  Hindi: ["भाषा और व्याकरण", "संज्ञा", "सर्वनाम", "क्रिया", "विलोम शब्द"],
  "Social Science": ["Our Earth", "History Around Us", "Maps", "Government", "Environment"],
  Computer: ["Introduction to Computers", "Hardware and Software", "Internet Basics", "Coding Basics"],
  Physics: ["Motion", "Force", "Light", "Sound", "Electricity"],
  Chemistry: ["Matter", "Atoms and Molecules", "Elements", "Mixtures", "Chemical Reactions"],
  Biology: ["Cell Structure", "Human Body", "Plants", "Nutrition", "Respiration"]
};

const quizQuestions = [
  {
    q: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    q: "What is the chemical symbol of water?",
    options: ["CO₂", "O₂", "H₂O", "NaCl"],
    answer: 2
  },
  {
    q: "How many sides does a triangle have?",
    options: ["Two", "Three", "Four", "Five"],
    answer: 1
  },
  {
    q: "Which organ pumps blood in the human body?",
    options: ["Brain", "Lungs", "Heart", "Kidney"],
    answer: 2
  },
  {
    q: "Which gas do plants absorb?",
    options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
    answer: 1
  }
];

let selectedClass = Number(localStorage.getItem("selectedClass")) || 10;
let selectedSubject = "Science";
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let currentModel = params.get("model") || "solar";

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#39;"
  })[char]);
}

function pageShell(content) {
  app.innerHTML = `<div class="page-wrap">${content}</div>`;
}

function renderClasses() {
  pageShell(`
    <span class="eyebrow">CHOOSE YOUR CLASS</span>
    <h1 class="page-title">Explore Classes <span class="gradient-text">1–12</span></h1>
    <p class="page-subtitle">Select your class to explore subjects and chapters.</p>
    <div class="toolbar">
      <select class="field" id="boardSelect">
        <option>CBSE Board</option>
        <option>ICSE Board</option>
        <option>MP Board</option>
        <option>Other State Board</option>
      </select>
    </div>
    <div class="class-grid">
      ${Array.from({length:12},(_,i)=>`
        <button class="class-card" data-class="${i+1}">
          <strong>Class ${i+1}</strong>
          <span>Explore subjects →</span>
        </button>
      `).join("")}
    </div>
  `);

  document.querySelectorAll("[data-class]").forEach(button => {
    button.addEventListener("click", () => {
      selectedClass = Number(button.dataset.class);
      localStorage.setItem("selectedClass", selectedClass);
      location.href = "?page=subjects";
    });
  });
}

function renderSubjects() {
  pageShell(`
    <a class="back-link" href="?page=classes">← All Classes</a>
    <span class="eyebrow">YOUR STUDY DASHBOARD</span>
    <h1 class="page-title">Class ${selectedClass} <span class="gradient-text">Subjects</span></h1>
    <p class="page-subtitle">Choose a subject to see its available chapters.</p>
    <div class="subject-grid">
      ${subjects.map(s=>`
        <button class="subject-card" data-subject="${escapeHTML(s[0])}">
          <h3>${s[1]} ${s[0]}</h3>
          <p>${s[2]}</p>
        </button>
      `).join("")}
    </div>
  `);

  document.querySelectorAll("[data-subject]").forEach(button => {
    button.addEventListener("click", () => {
      selectedSubject = button.dataset.subject;
      localStorage.setItem("selectedSubject", selectedSubject);
      location.href = "?page=chapters";
    });
  });
}

function renderChapters() {
  selectedSubject = localStorage.getItem("selectedSubject") || "Science";
  const chapters = lessons[selectedSubject] || ["Introduction", "Basic Concepts", "Practice"];

  pageShell(`
    <a class="back-link" href="?page=subjects">← Back to Subjects</a>
    <span class="eyebrow">CLASS ${selectedClass}</span>
    <h1 class="page-title">${escapeHTML(selectedSubject)} <span class="gradient-text">Chapters</span></h1>
    <p class="page-subtitle">Choose a chapter to open its learning page.</p>
    <div class="chapter-list">
      ${chapters.map((chapter,i)=>`
        <div class="chapter">
          <div><strong>Chapter ${i+1}: ${escapeHTML(chapter)}</strong>
          <p class="notice">Class ${selectedClass} · ${escapeHTML(selectedSubject)}</p></div>
          <button data-lesson="${i}">Open Lesson →</button>
        </div>
      `).join("")}
    </div>
  `);

  document.querySelectorAll("[data-lesson]").forEach(button => {
    button.addEventListener("click", () => {
      const chapter = chapters[Number(button.dataset.lesson)];
      localStorage.setItem("selectedChapter", chapter);
      location.href = "?page=lesson";
    });
  });
}

function renderLesson() {
  const chapter = localStorage.getItem("selectedChapter") || "Introduction";
  const subject = localStorage.getItem("selectedSubject") || "Science";

  pageShell(`
    <a class="back-link" href="?page=chapters">← Back to Chapters</a>
    <span class="eyebrow">CLASS ${selectedClass} · ${escapeHTML(subject)}</span>
    <h1 class="page-title">${escapeHTML(chapter)}</h1>
    <div class="resource">
      <h3>📘 About this lesson</h3>
      <p>This is your lesson page. The detailed explanation, diagrams, examples and practice questions for this chapter can be added here.</p>
      <p>Start by reading your textbook and writing down the important points.</p>
    </div>
    <div class="resource" style="margin-top:15px">
      <h3>🎯 Learning goals</h3>
      <p>Understand the main concepts, learn important definitions and solve practice questions related to this chapter.</p>
    </div>
    <div class="hero-actions">
      <a class="btn primary" href="?page=3d">Explore 3D Lab →</a>
      <a class="btn secondary" href="?page=quiz">Practice Quiz</a>
    </div>
    <p class="notice">Note: This is a starter lesson template. Chapter-specific explanations and notes will be added as the content library grows.</p>
  `);
}

function renderLibrary() {
  pageShell(`
    <span class="eyebrow">STUDY MATERIAL</span>
    <h1 class="page-title">Books & <span class="gradient-text">Notes</span></h1>
    <p class="page-subtitle">Find textbooks, notes and practice material for your studies.</p>
    <div class="resource-grid">
      <div class="resource">
        <div class="emoji">📚</div>
        <h3>NCERT Textbooks</h3>
        <p>Visit the official NCERT website to find textbooks and learning resources.</p>
        <a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener">Visit NCERT →</a>
      </div>
      <div class="resource">
        <div class="emoji">📝</div>
        <h3>Revision Notes</h3>
        <p>Chapter-wise easy notes and important definitions will be added here.</p>
        <a href="?page=classes">Choose Class →</a>
      </div>
      <div class="resource">
        <div class="emoji">📄</div>
        <h3>MP Board Resources</h3>
        <p>Visit the official MP education portal for board-related study resources.</p>
        <a href="https://mpbse.nic.in/" target="_blank" rel="noopener">Visit MPBSE →</a>
      </div>
      <div class="resource">
        <div class="emoji">📖</div>
        <h3>CBSE Resources</h3>
        <p>Find official curriculum and academic resources from CBSE.</p>
        <a href="https://cbseacademic.nic.in/" target="_blank" rel="noopener">Visit CBSE →</a>
      </div>
      <div class="resource">
        <div class="emoji">🧠</div>
        <h3>Practice Questions</h3>
        <p>Test your knowledge with short multiple-choice quizzes.</p>
        <a href="?page=quiz">Start Quiz →</a>
      </div>
      <div class="resource">
        <div class="emoji">🌐</div>
        <h3>ICSE Resources</h3>
        <p>Visit the official CISCE website for curriculum and examination information.</p>
        <a href="https://cisce.org/" target="_blank" rel="noopener">Visit CISCE →</a>
      </div>
    </div>
    <p class="notice">Official websites may update their resources and links. Textbooks and other copyrighted materials should be accessed through authorized sources.</p>
  `);
}

function renderQuiz() {
  const q = quizQuestions[quizIndex];

  pageShell(`
    <span class="eyebrow">TEST YOUR KNOWLEDGE</span>
    <h1 class="page-title">Quick <span class="gradient-text">Quiz</span></h1>
    <p class="page-subtitle">A short general science and maths practice quiz.</p>
    <div class="quiz-box" id="quizBox">
      <p class="notice">Question ${quizIndex+1} of ${quizQuestions.length}</p>
      <h2 style="font-size:21px;margin:15px 0">${q.q}</h2>
      <div id="options">
        ${q.options.map((option,i)=>`
          <button class="quiz-option" data-answer="${i}">${String.fromCharCode(65+i)}. ${option}</button>
        `).join("")}
      </div>
      <p id="quizFeedback" class="notice"></p>
      <button id="nextQuestion" class="btn primary" style="margin-top:18px;display:none">Next Question →</button>
    </div>
  `);

  document.querySelectorAll("[data-answer]").forEach(button => {
    button.addEventListener("click", () => {
      if (quizAnswered) return;
      quizAnswered = true;
      const answer = Number(button.dataset.answer);
      const feedback = document.getElementById("quizFeedback");

      if (answer === q.answer) {
        quizScore++;
        feedback.textContent = "Correct! Great work 🎉";
      } else {
        feedback.textContent = "Not quite. Correct answer: " + q.options[q.answer];
      }

      document.querySelectorAll("[data-answer]").forEach(option => {
        option.disabled = true;
      });

      document.getElementById("nextQuestion").style.display = "inline-flex";
    });
  });

  document.getElementById("nextQuestion").addEventListener("click", () => {
    quizIndex++;
    quizAnswered = false;

    if (quizIndex < quizQuestions.length) {
      renderQuiz();
    } else {
      pageShell(`
        <div class="quiz-box">
          <span class="eyebrow">QUIZ COMPLETED</span>
          <h1 class="page-title">Well done! 🎉</h1>
          <h2>Your score: ${quizScore} / ${quizQuestions.length}</h2>
          <p class="page-subtitle">Keep practising to improve your knowledge.</p>
          <button class="btn primary" id="restartQuiz">Try Again</button>
        </div>
      `);
      document.getElementById("restartQuiz").addEventListener("click", () => {
        quizIndex = 0;
        quizScore = 0;
        quizAnswered = false;
        renderQuiz();
      });
    }
  });
}

/* 3D MODELS */

let scene, camera, renderer, controls, animationId;
let modelGroup;

const models = {
  solar: "Solar System",
  heart: "Human Heart",
  atom: "Atomic Structure",
  cell: "Animal Cell"
};

function renderLab() {
  pageShell(`
    <span class="eyebrow">INTERACTIVE 3D EXPERIENCE</span>
    <h1 class="page-title">3D Learning <span class="gradient-text">Lab</span></h1>
    <p class="page-subtitle">Select a model. Drag to rotate and use pinch or scroll to zoom.</p>
    <div class="lab-layout">
      <div class="lab-menu">
        ${Object.entries(models).map(([id,name])=>`
          <button data-model="${id}" class="${id===currentModel?"active":""}">
            ${id==="solar"?"🪐":id==="heart"?"❤️":id==="atom"?"⚛️":"🧫"} ${name}
          </button>
        `).join("")}
      </div>
      <div>
        <div class="viewer">
          <div class="viewer-label" id="modelLabel">${models[currentModel] || models.solar}</div>
          <canvas id="modelCanvas"></canvas>
        </div>
        <p class="viewer-help">↔ Drag to rotate · Scroll or pinch to zoom · 3D model is a learning illustration.</p>
        <p class="notice" id="modelDescription"></p>
      </div>
    </div>
  `);

  document.querySelectorAll("[data-model]").forEach(button => {
    button.addEventListener("click", () => {
      currentModel = button.dataset.model;
      document.querySelectorAll("[data-model]").forEach(b=>b.classList.toggle("active",b===button));
      document.getElementById("modelLabel").textContent = models[currentModel];
      createModel(currentModel);
    });
  });

  createModel(currentModel);
}
async function createModel(type) {
  const canvas = document.getElementById("modelCanvas");
  if (!canvas) return;

  try {
    const threeModule = await import("three");
    const controlsModule = await import("three/addons/controls/OrbitControls.js");

    THREE = threeModule;
    OrbitControls = controlsModule.OrbitControls;
  } catch (error) {
    document.getElementById("modelDescription").textContent =
      "3D model load nahi hua. Internet connection check karein.";
    return;
              }

  function animate() {
    animationId = requestAnimationFrame(animate);
    if (type === "solar") modelGroup.rotation.y += 0.0018;
    if (type === "atom") modelGroup.rotation.y += 0.003;
    if (type === "cell") modelGroup.rotation.y += 0.0015;
    if (type === "heart") modelGroup.rotation.y += 0.001;
    controls.update();
    renderer.render(scene,camera);
  }
  animate();
}

function makeSphere(parent, radius, color, position, roughness=0.5) {
  const geometry = new THREE.SphereGeometry(radius,48,32);
  const material = new THREE.MeshStandardMaterial({
    color, roughness, metalness:0.08
  });
  const mesh = new THREE.Mesh(geometry,material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function makeSolarSystem() {
  makeSphere(modelGroup,0.72,0xffbd42,[0,0,0],0.3);

  const planetData = [
    [1.35,0.12,0x9c9c9c],
    [1.8,0.18,0xd9a66f],
    [2.35,0.2,0x438be0],
    [2.95,0.16,0xc95b42],
    [3.8,0.43,0xd5b27d],
    [4.65,0.35,0xd8c29c]
  ];

  planetData.forEach((data,i)=>{
    const [distance,radius,color] = data;
    const orbit = new THREE.Group();
    modelGroup.add(orbit);

    const planet = makeSphere(orbit,radius,color,[distance,0,0]);
    planet.userData.speed = 0.2 + i*0.04;

    if (i===4) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.5,0.75,64),
        new THREE.MeshStandardMaterial({color:0xc9b48e,side:THREE.DoubleSide})
      );
      ring.rotation.x = -Math.PI/2.5;
      planet.add(ring);
    }

    orbit.userData.orbitSpeed = 0.006/(i+1);
    orbit.userData.isOrbit = true;
    orbit.userData.planet = planet;
  });

  const starGeometry = new THREE.BufferGeometry();
  const positions = [];
  for(let i=0;i<500;i++){
    positions.push((Math.random()-.5)*18,(Math.random()-.5)*12,(Math.random()-.5)*12);
  }
  starGeometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  scene.add(new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xffffff,size:0.035})));
}

function makeAtom() {
  makeSphere(modelGroup,0.55,0xe77b8b,[0,0,0]);
  const nucleusColors = [0xf3b84c,0xe66d7b,0xf3b84c,0xe66d7b,0xf3b84c];
  nucleusColors.forEach((color,i)=>{
    const angle = i*1.25;
    makeSphere(modelGroup,0.19,color,[Math.cos(angle)*0.25,Math.sin(angle)*0.25,0.2]);
  });

  for(let i=0;i<3;i++){
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.1,0.018,12,120),
      new THREE.MeshStandardMaterial({color:0x6de7f1})
    );
    ring.rotation.x = Math.PI/2;
    ring.rotation.y = i*Math.PI/3;
    modelGroup.add(ring);

    const electron = makeSphere(modelGroup,0.12,0x67e9ff,[2.1,0,0]);
    electron.userData.ringIndex = i;
  }
}

function makeHeart() {
  const shape = new THREE.Shape();
  const points = [];

  for(let i=0;i<=160;i++){
    const t = Math.PI*2*i/160;
    const x = 16*Math.pow(Math.sin(t),3);
    const y = 13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t);
    points.push([x/17,y/17]);
  }

  shape.moveTo(points[0][0],points[0][1]);
  for(let i=1;i<points.length;i++) shape.lineTo(points[i][0],points[i][1]);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape,{
    depth:0.65, bevelEnabled:true, bevelSegments:5,
    steps:2, bevelSize:0.12, bevelThickness:0.12, curveSegments:20
  });
  geometry.center();

  const material = new THREE.MeshStandardMaterial({
    color:0xc52e4b, roughness:0.38, metalness:0.02
  });

  const heart = new THREE.Mesh(geometry,material);
  heart.scale.set(0.19,0.19,0.19);
  heart.rotation.x = 0;
  modelGroup.add(heart);

  const vesselMaterial = new THREE.MeshStandardMaterial({color:0xd94c62});
  const blueMaterial = new THREE.MeshStandardMaterial({color:0x438cce});

  function vessel(x,y,z,height,material) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.13,0.17,height,24),
      material
    );
    mesh.position.set(x,y,z);
    modelGroup.add(mesh);
  }

  vessel(-0.28,1.15,0,1.25,vesselMaterial);
  vessel(0.25,1.1,0,1.1,blueMaterial);
}

function makeCell() {
  makeSphere(modelGroup,1.8,0x6eaf85,[0,0,0],0.65);

  const nucleus = makeSphere(modelGroup,0.7,0x875ed2,[0,0,0.15]);
  nucleus.material.roughness = 0.35;

  const organelles = [
    [-1,0.8,0.5,0xe5a64f],
    [1.1,0.7,0.3,0xe5a64f],
    [-1,-0.7,0.2,0x6bc4c8],
    [0.9,-0.9,0.4,0x6bc4c8],
    [0,-1.1,-0.6,0xf0c66a],
    [1.1,0,-0.6,0xd875a8]
  ];

  organelles.forEach(([x,y,z,color])=>{
    makeSphere(modelGroup,0.22,color,[x,y,z]);
  });

  const membrane = ne
    if (object.userData.wave !== undefined) {
      object.position.y =
        Math.sin(time * 2 + object.userData.wave) * 1.5;
    }
  });

  renderer.render(scene, camera);
}

$("rotateBtn").onclick = () => {
  rotating = !rotating;
  $("rotateBtn").textContent = rotating ? "⟳ Rotate: ON" : "⟳ Rotate: OFF";
};

$("resetBtn").onclick = () => {
  camera.position.set(0, 4, 13);
  camera.lookAt(0, 0, 0);
  group.rotation.set(0, 0, 0);
};

$("audioBtn").onclick = () => {
  if (!currentLesson || !("speechSynthesis" in window)) {
    alert("Audio is not supported in this browser.");
    return;
  }

  speechSynthesis.cancel();

  const text = lang === "en"
    ? currentLesson.enDesc
    : currentLesson.hiDesc;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang === "en" ? "en-IN" : "hi-IN";
  speechSynthesis.speak(utterance);
};

$("translateBtn").onclick = () => {
  lang = lang === "en" ? "hi" : "en";
  $("translateBtn").textContent =
    lang === "en" ? "हिंदी / English" : "English / हिंदी";

  displayTopics();
};

$("languageBtn").onclick = () => {
  lang = lang === "en" ? "hi" : "en";
  $("languageBtn").textContent =
    lang === "en" ? "हिंदी" : "English";

  displayTopics();
};

$("classSelect").onchange = displayTopics;
$("subjectSelect").onchange = displayTopics;
$("searchInput").oninput = displayTopics;

init3D();
displayTopics();
