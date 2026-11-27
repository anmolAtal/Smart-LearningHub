
import * as THREE from 'three';

const $ = id => document.getElementById(id);

const lessons = {
  "Science": [
    {
      en: "Solar System",
      hi: "सौरमंडल",
      icon: "🪐",
      enDesc: "The Solar System consists of the Sun and eight planets. The planets revolve around the Sun in their orbits.",
      hiDesc: "सौरमंडल में सूर्य और आठ ग्रह हैं। सभी ग्रह अपनी कक्षाओं में सूर्य की परिक्रमा करते हैं।",
      type: "solar"
    },
    {
      en: "Water Cycle",
      hi: "जल चक्र",
      icon: "💧",
      enDesc: "Water evaporates due to heat, forms clouds through condensation and returns as rain.",
      hiDesc: "गर्मी से पानी भाप बनता है, भाप से बादल बनते हैं और फिर वर्षा होती है।",
      type: "water"
    },
    {
      en: "Human Heart",
      hi: "मानव हृदय",
      icon: "❤️",
      enDesc: "The heart pumps blood throughout the human body.",
      hiDesc: "हृदय पूरे शरीर में रक्त पंप करता है।",
      type: "heart"
    },
    {
      en: "Plant Cell",
      hi: "पादप कोशिका",
      icon: "🧫",
      enDesc: "A plant cell is the basic unit of plant life. It contains a cell wall, nucleus and other organelles.",
      hiDesc: "पादप कोशिका पौधों की मूल इकाई है। इसमें कोशिका भित्ति, केंद्रक और अन्य अंग होते हैं।",
      type: "cell"
    }
  ],
  "Mathematics": [
    {
      en: "Geometry",
      hi: "ज्यामिति",
      icon: "📐",
      enDesc: "Geometry studies shapes, sizes, angles and dimensions.",
      hiDesc: "ज्यामिति में आकृतियों, आकारों, कोणों और माप का अध्ययन होता है।",
      type: "geometry"
    }
  ],
  "Physics": [
    {
      en: "Gravity",
      hi: "गुरुत्वाकर्षण",
      icon: "🌍",
      enDesc: "Gravity is the force of attraction between objects having mass.",
      hiDesc: "गुरुत्वाकर्षण वह बल है जो द्रव्यमान वाली वस्तुओं को एक-दूसरे की ओर आकर्षित करता है।",
      type: "gravity"
    }
  ],
  "Biology": [
    {
      en: "Plant Cell",
      hi: "पादप कोशिका",
      icon: "🌱",
      enDesc: "Cells are the basic structural and functional units of life.",
      hiDesc: "कोशिका जीवन की मूल संरचनात्मक और क्रियात्मक इकाई है।",
      type: "cell"
    }
  ],
  "Chemistry": [
    {
      en: "Atom",
      hi: "परमाणु",
      icon: "⚛️",
      enDesc: "Atoms contain protons, neutrons and electrons.",
      hiDesc: "परमाणु में प्रोटॉन, न्यूट्रॉन और इलेक्ट्रॉन होते हैं।",
      type: "atom"
    }
  ],
  "English": [
    {
      en: "Parts of Speech",
      hi: "शब्द भेद",
      icon: "🔤",
      enDesc: "Nouns, verbs, adjectives and other word classes have different roles in sentences.",
      hiDesc: "संज्ञा, क्रिया और विशेषण आदि शब्दों के वाक्य में अलग-अलग कार्य होते हैं।",
      type: "geometry"
    }
  ],
  "Hindi": [
    {
      en: "Noun",
      hi: "संज्ञा",
      icon: "✍️",
      enDesc: "A noun is the name of a person, place, animal or thing.",
      hiDesc: "किसी व्यक्ति, स्थान, पशु या वस्तु के नाम को संज्ञा कहते हैं।",
      type: "geometry"
    }
  ],
  "Social Science": [
    {
      en: "Earth Layers",
      hi: "पृथ्वी की परतें",
      icon: "🌎",
      enDesc: "Earth has three major layers: crust, mantle and core.",
      hiDesc: "पृथ्वी की तीन प्रमुख परतें भूपर्पटी, मैंटल और क्रोड हैं।",
      type: "earth"
    }
  ]
};

const subjects = [
  "Mathematics", "Science", "Physics", "Chemistry",
  "Biology", "Social Science", "English", "Hindi",
  "Accountancy", "Business Studies", "Economics"
];

let lang = "en";
let currentLesson = null;
let rotating = true;
let scene, camera, renderer, group;
let animationId;

const classSelect = $("classSelect");
for (let i = 1; i <= 12; i++) {
  classSelect.add(new Option("Class " + i, i));
}
classSelect.value = 6;

subjects.forEach(s => $("subjectSelect").add(new Option(s, s)));

function getLessons() {
  const subject = $("subjectSelect").value;
  return lessons[subject] || [{
    en: subject + " Introduction",
    hi: subject + " परिचय",
    icon: "📚",
    enDesc: "Add chapter-wise lessons and 3D models for this subject in the lessons data.",
    hiDesc: "इस विषय के अध्यायवार पाठ और 3D मॉडल lessons data में जोड़े जा सकते हैं।",
    type: "geometry"
  }];
}

function displayTopics() {
  const query = $("searchInput").value.toLowerCase();
  const list = $("topicList");
  list.innerHTML = "";

  const filtered = getLessons().filter(l =>
    (l.en + l.hi).toLowerCase().includes(query)
  );

  filtered.forEach(lesson => {
    const btn = document.createElement("button");
    btn.className = "topic";
    btn.textContent = lang === "en" ? lesson.en : lesson.hi;
    btn.onclick = () => selectLesson(lesson);
    list.appendChild(btn);
  });

  if (filtered.length) {
    selectLesson(filtered[0]);
  } else {
    $("lessonTitle").textContent = "No topics found";
    $("description").textContent = "Try another search.";
  }
}

function selectLesson(lesson) {
  currentLesson = lesson;

  $("lessonTitle").textContent =
    lang === "en" ? lesson.en : lesson.hi;

  $("description").textContent =
    lang === "en" ? lesson.enDesc : lesson.hiDesc;

  document.querySelectorAll(".topic").forEach(b => {
    b.classList.toggle(
      "active",
      b.textContent === (lang === "en" ? lesson.en : lesson.hi)
    );
  });

  createModel(lesson.type);
}

function init3D() {
  const container = $("scene-container");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b1728);

  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  camera.position.set(0, 4, 13);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 1.5));

  const light = new THREE.PointLight(0xffffff, 3);
  light.position.set(5, 8, 8);
  scene.add(light);

  group = new THREE.Group();
  scene.add(group);

  resize3D();

  window.addEventListener("resize", resize3D);
  animate();
}

function resize3D() {
  if (!renderer) return;
  const container = $("scene-container");

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(
    container.clientWidth,
    container.clientHeight
  );
}

function addSphere(radius, color, x, y, z) {
  const geometry = new THREE.SphereGeometry(radius, 48, 48);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.65,
    metalness: 0.08
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  group.add(mesh);
  return mesh;
}

function createModel(type) {
  if (!group) return;

  group.clear();
  group.rotation.set(0, 0, 0);

  camera.position.set(0, 4, 13);
  camera.lookAt(0, 0, 0);

  if (type === "solar") {
    addSphere(1.15, 0xffbd36, 0, 0, 0);

    const colors = [
      0x999999, 0xe8a45c, 0x318ce7, 0xc65a3b,
      0xd6b58c, 0xd9bb83, 0x77d6dc, 0x436cdb
    ];

    const distances = [2, 2.8, 3.7, 4.7, 6, 7.1, 8, 9];

    colors.forEach((color, i) => {
      const planet = addSphere(
        i === 4 ? 0.65 : 0.28,
        color,
        distances[i],
        0,
        0
      );

      planet.userData.orbit = distances[i];
      planet.userData.speed = 0.003 / (i + 1);

      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(distances[i], 0.008, 8, 100),
        new THREE.MeshBasicMaterial({
          color: 0x60758c,
          transparent: true,
          opacity: 0.5
        })
      );

      orbit.rotation.x = Math.PI / 2;
      group.add(orbit);
    });
  }

  else if (type === "atom") {
    addSphere(0.55, 0xff6655, 0, 0, 0);

    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(2, 0.025, 12, 100),
        new THREE.MeshBasicMaterial({ color: 0x55d6e8 })
      );

      orbit.rotation.set(
        Math.PI / 2 + i * 0.8,
        i * 0.9,
        0
      );

      group.add(orbit);
    }

    for (let i = 0; i < 3; i++) {
      const electron = addSphere(0.13, 0x55d6e8, 2, 0, 0);
      electron.userData.electron = true;
      electron.userData.phase = i * 2.1;
    }
  }

  else if (type === "earth" || type === "gravity") {
    addSphere(2.3, 0x237ac4, 0, 0, 0);
    addSphere(1.4, 0xd79b57, 0, 0, 0);
    addSphere(0.7, 0xffdf73, 0, 0, 0);
  }

  else if (type === "geometry") {
    const geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x55d6e8,
      roughness: 0.3,
      metalness: 0.2
    });

    group.add(new THREE.Mesh(geometry, material));
  }

  else if (type === "heart") {
    addSphere(1.3, 0xe23d57, 0, 0, 0);
    addSphere(0.9, 0xe23d57, -0.8, 0.7, 0);
    addSphere(0.9, 0xe23d57, 0.8, 0.7, 0);
  }

  else if (type === "water") {
    for (let i = 0; i < 5; i++) {
      const drop = addSphere(
        0.35,
        0x36a9e1,
        (i - 2) * 1.2,
        Math.sin(i) * 1.5,
        0
      );
      drop.userData.wave = i;
    }
  }

  else if (type === "cell") {
    addSphere(2.2, 0x5cbb82, 0, 0, 0);
    addSphere(0.75, 0x9b70e8, 0.2, 0.2, 0.5);
    for (let i = 0; i < 7; i++) {
      addSphere(
        0.18,
        0xffd166,
        Math.cos(i) * 1.3,
        Math.sin(i) * 1.3,
        0.6
      );
    }
  }

  else {
    addSphere(1.6, 0x55d6e8, 0, 0, 0);
  }

  $("loading").style.display = "none";
}

const clock = new THREE.Clock();

function animate() {
  animationId = requestAnimationFrame(animate);

  const time = clock.getElapsedTime();

  if (rotating && group) {
    group.rotation.y += 0.003;
  }

  group?.children.forEach(object => {
    if (object.userData.electron) {
      const a = time * 1.5 + object.userData.phase;
      object.position.set(
        Math.cos(a) * 2,
        Math.sin(a * 1.4) * 0.7,
        Math.sin(a) * 2
      );
    }

    if (object.userData.orbit) {
      const a = time * object.userData.speed;
      object.position.x = Math.cos(a) * object.userData.orbit;
      object.position.z = Math.sin(a) * object.userData.orbit;
    }

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
