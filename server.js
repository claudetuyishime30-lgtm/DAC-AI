const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

/*
  D.A.C AI - Offline CBC Lesson Planner
  Curriculum data below is based on the REB syllabus information
  supplied in this project conversation. Add more units as the remaining
  syllabus pages are provided. The app does not call an external AI API.
*/

const CURRICULUM = {
  "P4|Social Studies and Religious Education": [
    { no: 1, title: "Socio-economic Activities in Our District", periods: 13, competence: "Compare socio-economic activities in own district and neighbouring districts and explain their importance.", content: "District location; agriculture; fishing; crafts; pottery; tourism; trade; employment.", activities: "Draw and interpret a district map; discuss local activities; research and compare activities in neighbouring districts.", generic: "Critical thinking, research, communication, cooperation and creativity.", cross: "Environment and sustainability; gender education; peace and values education.", values: "Dignity and integrity; self-reliance; national and cultural identity." },
    { no: 2, title: "Peace Education and Human Rights", periods: 18, competence: "Explain basic human and children's rights and demonstrate ways of promoting and protecting them.", content: "Human rights; children's rights; child abuse and neglect; sexual abuse; equity and equality; gender-based violence; prevention and effects.", activities: "Investigate rights in the community; discuss case studies; role-play ways of seeking help; present group findings.", generic: "Critical thinking, communication, cooperation, research and problem-solving.", cross: "Gender education; inclusive education; peace and values; comprehensive sexuality education.", values: "Dignity and integrity; peace and tolerance; respect for human rights." },
    { no: 3, title: "Economy", periods: 9, competence: "Explain needs and wants, the use of money, income-generating activities and the importance of saving.", content: "Needs and wants; environment and human needs; money; income-generating activities; spending; saving and places to save.", activities: "Classify needs and wants; prepare a shopping list; role-play buying and selling; operate a classroom shop; discuss saving.", generic: "Critical thinking, numeracy, communication, cooperation and lifelong learning.", cross: "Financial education; environment and sustainability; peace and values.", values: "Self-reliance; hard work; dignity and integrity." },
    { no: 4, title: "Civics and Governance", periods: 16, competence: "Explain national symbols, good behaviour, leadership and good governance in the district.", content: "National flag, anthem, coat of arms and motto; home-grown solutions; harmony; behaviour; peer pressure; district leaders; elections; good governance.", activities: "Observe and draw national symbols; discuss leadership qualities; role-play elections; identify good and bad behaviour.", generic: "Critical thinking, communication, cooperation and citizenship.", cross: "Peace and values; gender education; inclusive education.", values: "National and cultural identity; patriotism; dignity and integrity." },
    { no: 5, title: "Weather, Flora and Fauna", periods: 16, competence: "Explain weather elements and the importance of flora and fauna and demonstrate ways of preserving them.", content: "Weather elements and instruments; rain gauge; thermometer; effects of weather; risk mitigation; flora; fauna; preservation.", activities: "Make simple weather instruments; observe weather; plant and water seeds; prepare a nursery bed; conduct a field visit.", generic: "Observation, research, critical thinking, cooperation and problem-solving.", cross: "Environment and sustainability; disaster risk reduction; peace and values.", values: "Commitment and resilience; dignity and integrity; care for nature." },
    { no: 6, title: "Infrastructure", periods: 13, competence: "Explain types and importance of transport and communication infrastructure and ways of using them safely.", content: "Transport and communication; types and means; importance; difficulties; dangers; road behaviour and safety measures.", activities: "Draw transport and communication means; discuss their importance; identify dangers and propose solutions.", generic: "Communication, critical thinking, cooperation and problem-solving.", cross: "Environment; disaster risk reduction; peace and values.", values: "Responsibility; respect for human rights; solidarity; commitment." },
    { no: 7, title: "Traditional Rwanda", periods: 14, competence: "Describe the social, political, economic and cultural organisation of pre-colonial Rwanda.", content: "Traditional culture, beliefs, customs, norms and values; political hierarchy; family to kingdom; economic activities; barter trade; traditional agriculture and trade.", activities: "Research from family members; discuss traditional life; role-play barter trade; compare traditional and modern practices.", generic: "Research, communication, critical thinking and cooperation.", cross: "Peace and values; gender education; financial education.", values: "National and cultural identity; respect for others; patriotism." },
    { no: 8, title: "The Ten Commandments of God", periods: 11, competence: "Explain the Ten Commandments and demonstrate respect for God's commandments and community rules.", content: "Ten Commandments; greatest commandment; commandments about God and others; importance; consequences of breaking rules.", activities: "Identify commandments from religious texts; classify them; compare school, home and community rules; discuss stories.", generic: "Critical thinking, communication, cooperation and reflection.", cross: "Peace and values; inclusive education; comprehensive sexuality education.", values: "Dignity and integrity; human rights; peace and tolerance." },
    { no: 9, title: "Introduction to Christian and Islamic Faith", periods: 12, competence: "Demonstrate understanding of the Christian and Islamic faiths and identify shared teachings.", content: "One God; Bible and Qur'an; prayer and worship; special days and places; Christian beliefs; Five Pillars of Islam; Six Principles of Iman.", activities: "Compare pictures and sacred books; conduct a gallery walk; research and present similarities and differences respectfully.", generic: "Communication, research, cooperation and critical thinking.", cross: "Peace and values; inclusive education; gender education.", values: "Human rights; peace and tolerance; dignity and integrity." },
    { no: 10, title: "Values in the Bible and the Qur'an", periods: 10, competence: "Identify and demonstrate positive values taught in the Bible and the Qur'an.", content: "Meaning and categories of values; Christian and Islamic ethical teachings; family, social and spiritual values; attitudes to others; accountability.", activities: "Brainstorm values; classify examples; compare teachings in a table; role-play moral situations such as helping a neighbour.", generic: "Critical thinking, communication, cooperation and reflection.", cross: "Peace and values; gender education; inclusive education.", values: "Dignity and integrity; peace and tolerance; solidarity." }
  ],
  "P6|Social Studies and Religious Education": [
    { no: 1, title: "Our Country", periods: 7, competence: "Locate Rwanda and its neighbouring countries in East Africa and Africa and interpret simple maps.", content: "Rwanda's location; neighbouring countries; administrative map; map drawing and interpretation.", activities: "Locate Rwanda on maps and a globe; identify neighbouring countries; draw and label a simple map.", generic: "Research, communication, critical thinking and cooperation.", cross: "National identity; peace and values; inclusive participation.", values: "Patriotism; national identity; cooperation." },
    { no: 2, title: "Civics and Governance", periods: 19, competence: "Explain governance structures, national unity, leadership and Rwanda's regional and international cooperation.", content: "Unity and cooperation; government organs and functions; NGOs; Ndi Umunyarwanda; COMESA, EAC, AU, CEPGL, UNO, WHO, UNICEF, WFP and UNESCO; heroes; elections and democracy.", activities: "Research institutions; make organisation charts; discuss leadership; conduct a mock election; present findings.", generic: "Critical thinking, research, communication, cooperation and citizenship.", cross: "Peace and values; gender education; inclusive education.", values: "Patriotism; justice; solidarity; peace and tolerance." },
    { no: 3, title: "Rwandan Values and Risky Behaviours in Society", periods: 8, competence: "Demonstrate Rwandan values and explain how to avoid risky behaviours in society.", content: "Patriotism; ubupfura; kwihesha agaciro; Ndi Umunyarwanda; kwigira; Itorero; drugs; unsafe sexual behaviour; criminal behaviour; peer pressure and prevention.", activities: "Discuss positive values; analyse scenarios; identify peer pressure; practise refusing risky behaviour; propose prevention measures.", generic: "Critical thinking, communication, cooperation and life skills.", cross: "Peace and values; gender education; comprehensive sexuality education; social media awareness.", values: "Dignity; self-reliance; patriotism; responsibility." },
    { no: 4, title: "Budget", periods: 8, competence: "Prepare and explain simple family and national budgets and the importance of saving.", content: "Income; expenditure; revenue; family and national budgets; types and importance of budgets; saving; development indicators.", activities: "Classify income and expenditure; prepare a sample family budget; compare needs and wants; discuss saving.", generic: "Numeracy, critical thinking, communication and problem-solving.", cross: "Financial education; gender education; peace and values.", values: "Self-reliance; hard work; responsibility." },
    { no: 5, title: "Direction and Location", periods: 5, competence: "Use latitude, longitude and time zones to describe location and time differences.", content: "Latitude and longitude; Rwanda's coordinates; time zones; time differences.", activities: "Use a globe and atlas; locate coordinates; compare time in selected places using time-zone maps.", generic: "Numeracy, research, critical thinking and communication.", cross: "ICT literacy; inclusive participation.", values: "Accuracy; cooperation; lifelong learning." },
    { no: 6, title: "Physical Features and Effects of Climate Change", periods: 10, competence: "Describe physical features and climate and explain causes, effects and solutions to climate change.", content: "Physical features of Rwanda, East Africa and Africa; formation and importance; climate types; causes and effects of climate change; mitigation and adaptation.", activities: "Interpret maps and pictures; classify physical features; discuss climate-change evidence; propose local solutions.", generic: "Critical thinking, research, communication and problem-solving.", cross: "Environment and sustainability; disaster risk reduction; gender education.", values: "Responsibility; commitment; care for the environment." },
    { no: 7, title: "Economic Activities", periods: 5, competence: "Explain economic activities in Rwanda and East Africa and their contribution to sustainable development.", content: "Economic activities in Rwanda, East Africa and Africa; production, trade and services; sustainable development.", activities: "Identify local economic activities; classify them; discuss their contribution; present examples.", generic: "Research, communication, critical thinking and cooperation.", cross: "Financial education; environment and sustainability; gender education.", values: "Hard work; self-reliance; responsibility." },
    { no: 8, title: "Natural Resources", periods: 6, competence: "Identify natural resources in Rwanda and East Africa and explain their importance and preservation.", content: "Natural resources; resources of Rwanda and East Africa; importance; sustainable use and preservation.", activities: "Identify resources from pictures and local examples; classify them; suggest conservation measures.", generic: "Research, critical thinking, communication and cooperation.", cross: "Environment and sustainability; disaster risk reduction.", values: "Responsibility; commitment; care for nature." },
    { no: 9, title: "Transport and Communication", periods: 8, competence: "Analyse transport networks and communication services in Rwanda and East Africa and suggest ways to improve them.", content: "Forms and types of transport and communication; networks; importance; dangers and difficulties; solutions; responsible social-media use and online safety.", activities: "Interpret transport maps; compare communication services; identify network challenges; propose safe and inclusive solutions.", generic: "Critical thinking, research, communication, cooperation and problem-solving.", cross: "Social media awareness; environment; inclusive education; gender education.", values: "Commitment and resilience; responsibility; solidarity." },
    { no: 10, title: "The People of East Africa", periods: 4, competence: "Differentiate major ethnic groups in East Africa and explain causes and effects of migration.", content: "Bantu; Nilotics; Hamites; Nilo-Hamites; immigration; emigration; causes and effects of migration; cultural respect and integration.", activities: "Interpret settlement maps; compare groups respectfully; discuss migration case studies; present causes and effects.", generic: "Critical thinking, research, communication, cooperation and creativity.", cross: "Peace and values; gender; inclusion; genocide studies and prevention of discrimination.", values: "National and cultural identity; peace; respect for human rights." },
    { no: 11, title: "Post-Independent Rwanda", periods: 8, competence: "Explain major political and historical events in Rwanda after independence.", content: "First and Second Republics; Liberation War 1990–1994; causes and objectives; injustice; divisionism; nepotism; corruption; historical sites and museums.", activities: "Use timelines and historical sources; analyse causes and effects; research historical sites; present findings.", generic: "Critical thinking, research, cooperation and communication.", cross: "Genocide studies; peace and values; gender; inclusion.", values: "Justice; patriotism; peace and tolerance; solidarity." },
    { no: 12, title: "1994 Genocide against the Tutsi", periods: 11, competence: "Analyse factors leading to the 1994 Genocide against the Tutsi, its consequences and ways of preventing genocide.", content: "Genocide terminology; planning and execution; how it was stopped; consequences; genocide ideology and denial; Holocaust and other genocides; prevention; Government of National Unity.", activities: "Use age-appropriate, verified learning resources; analyse historical causes and consequences; discuss prevention and human rights; reflect respectfully.", generic: "Critical thinking, research, communication and lifelong learning.", cross: "Genocide studies; peace and values; gender; responsible social media use.", values: "Peace and tolerance; justice; respect for human rights." },
    { no: 13, title: "God's Revelation", periods: 6, competence: "Explain the meaning and types of God's revelation and demonstrate appropriate responses.", content: "Natural and special revelation; people to whom God revealed messages; ways to respond; respect for scripture and creation.", activities: "Reflect on nature and sacred texts; sort examples of natural and special revelation; discuss respectful responses.", generic: "Critical thinking, communication and research.", cross: "Commitment and resilience; peace and values; inclusion; gender; environment.", values: "Dignity; respect; peace and tolerance." },
    { no: 14, title: "Attributes of God", periods: 10, competence: "Identify attributes of God and demonstrate trust in God in daily life.", content: "Oneness and uniqueness; omnipresence; omnipotence; omniscience; immutability; mercy and love.", activities: "Brainstorm attributes; examine relevant sacred-text passages; make posters; share stories; compose a short song or poem.", generic: "Critical thinking, communication, research, cooperation and lifelong learning.", cross: "Peace and values; inclusion; gender; environment.", values: "Dignity; peace; respect; commitment." },
    { no: 15, title: "Relationship and Friendship", periods: 10, competence: "Distinguish healthy and unhealthy relationships and make positive choices when responding to peer pressure.", content: "Healthy and unhealthy relationships; peer pressure; characteristics; consequences; coping strategies; friendship.", activities: "Classify relationship scenarios; practise saying no and walking away; discuss qualities of good friendship.", generic: "Cooperation, life skills, critical thinking, communication and lifelong learning.", cross: "Comprehensive sexuality education; peace and values; gender; inclusion.", values: "Respect; dignity; peace; self-reliance." },
    { no: 16, title: "Conflict Resolution", periods: 7, competence: "Explain causes and consequences of conflict and demonstrate peaceful conflict-resolution skills.", content: "Meaning and types of conflict; causes and consequences; resolution methods; self-control; peacebuilding.", activities: "Analyse school and community scenarios; role-play listening, apology and dialogue; draw a peaceful community.", generic: "Critical thinking, cooperation, communication and research.", cross: "Peace and values; genocide studies; inclusion; responsible social media use.", values: "Peace and tolerance; justice; respect for human rights; solidarity." }
  ],
  "P6|Mathematics": [
    { no: 1, title: "Whole Numbers Beyond 1,000,000", periods: 24, competence: "Read, write, compare and perform calculations with whole numbers beyond 1,000,000.", content: "Place value; reading and writing large numbers; comparing, ordering and operations.", activities: "Use place-value charts; read and write large numbers; solve real-life number problems.", generic: "Numeracy, critical thinking, communication and problem-solving.", cross: "Financial education; inclusive participation.", values: "Accuracy; confidence; hard work." },
    { no: 2, title: "Multiplication and Division of Integers", periods: 16, competence: "Multiply and divide integers and apply the operations to solve problems.", content: "Multiplication and division of integers; operation rules; word problems.", activities: "Use number patterns; solve guided examples; work in pairs on contextual problems.", generic: "Numeracy, critical thinking and problem-solving.", cross: "Inclusive education; gender equality.", values: "Accuracy; perseverance; cooperation." },
    { no: 3, title: "Powers, Indices, LCM and GCF", periods: 16, competence: "Apply powers, indices, least common multiple and greatest common factor in problem-solving.", content: "Powers; indices; LCM; GCF; factors and multiples.", activities: "Build factor lists; use prime factors; solve LCM and GCF problems.", generic: "Numeracy, critical thinking and problem-solving.", cross: "Inclusive education; gender equality.", values: "Accuracy; perseverance." },
    { no: 4, title: "Operations on Fractions", periods: 16, competence: "Perform operations on fractions and solve related problems.", content: "Addition, subtraction, multiplication and division of fractions.", activities: "Use fraction strips or diagrams; solve examples; explain methods to peers.", generic: "Numeracy, communication and critical thinking.", cross: "Inclusive education; practical life skills.", values: "Cooperation; accuracy." },
    { no: 5, title: "Rounding and Conversion of Decimals and Fractions", periods: 16, competence: "Round numbers and convert between fractions and decimals.", content: "Rounding; equivalent fractions; decimal notation; conversion.", activities: "Use place-value charts and number lines; convert examples; solve practical questions.", generic: "Numeracy, critical thinking and problem-solving.", cross: "Financial education; inclusive education.", values: "Accuracy; responsibility." },
    { no: 6, title: "Percentages and Ratios", periods: 32, competence: "Solve problems involving percentages, ratios and proportional relationships.", content: "Percentages; ratios; equivalent ratios; applications in daily life.", activities: "Use price and quantity examples; compare ratios; solve percentage problems in groups.", generic: "Numeracy, critical thinking, communication and problem-solving.", cross: "Financial education; gender equality; inclusive education.", values: "Accuracy; self-reliance." },
    { no: 7, title: "Volume, Capacity and Mass", periods: 8, competence: "Solve problems involving volume, capacity and mass and convert related units.", content: "Units and conversions of volume, capacity and mass; practical measurement.", activities: "Measure classroom objects; use containers and scales; convert units; solve problems.", generic: "Numeracy, observation and problem-solving.", cross: "Health and wellbeing; environment.", values: "Accuracy; care of materials." },
    { no: 8, title: "Speed, Distance and Time", periods: 16, competence: "Solve problems involving speed, distance and time.", content: "Relationship between speed, distance and time; units; calculations.", activities: "Interpret travel examples; use formula triangles; solve individual and group problems.", generic: "Numeracy, critical thinking and problem-solving.", cross: "Road safety; practical life skills.", values: "Accuracy; responsibility." },
    { no: 9, title: "Simple Interest and Saving", periods: 24, competence: "Calculate simple interest and explain the importance of saving.", content: "Simple interest; principal; rate; time; savings and applications.", activities: "Compare savings examples; identify principal, rate and time; calculate simple interest.", generic: "Numeracy, critical thinking and financial literacy.", cross: "Financial education; gender equality.", values: "Self-reliance; responsibility; hard work." },
    { no: 10, title: "Equivalent Expressions and Sequences", periods: 16, competence: "Form equivalent expressions and identify patterns in sequences.", content: "Equivalent expressions; number patterns; sequences and rules.", activities: "Extend patterns; describe rules; match equivalent expressions; solve tasks.", generic: "Critical thinking, numeracy and problem-solving.", cross: "Inclusive education; creativity.", values: "Perseverance; accuracy." },
    { no: 11, title: "Regular Polygons and Bearings", periods: 16, competence: "Identify regular polygons and use bearings and compass points.", content: "Regular polygons; properties; compass directions; bearings.", activities: "Classify polygons; use a compass rose; measure and describe bearings.", generic: "Spatial reasoning, numeracy and communication.", cross: "Practical life skills; inclusive participation.", values: "Accuracy; cooperation." },
    { no: 12, title: "Construction of Polygons and Nets", periods: 24, competence: "Construct polygons and nets of three-dimensional shapes using appropriate instruments.", content: "Geometrical construction; polygons; nets of solids; drawing instruments.", activities: "Construct shapes with ruler and protractor; fold nets; compare constructed solids.", generic: "Creativity, spatial reasoning and problem-solving.", cross: "Inclusive education; creativity and innovation.", values: "Accuracy; patience." },
    { no: 13, title: "Area of a Circle, Surface Area and Volume of Solids", periods: 16, competence: "Calculate the area of a circle, surface area and volume of solids.", content: "Circle area; cuboid surface area; volume of solids; units.", activities: "Measure dimensions; apply formulas; solve practical measurement problems.", generic: "Numeracy, critical thinking and problem-solving.", cross: "Practical life skills; inclusive education.", values: "Accuracy; perseverance." },
    { no: 14, title: "Data Handling", periods: 16, competence: "Collect, organise, represent and interpret data.", content: "Data collection; tables; graphs; interpretation and conclusions.", activities: "Conduct a class survey; organise results; draw graphs; interpret findings.", generic: "Research, numeracy, communication and critical thinking.", cross: "ICT literacy; gender equality.", values: "Honesty; accuracy; cooperation." },
    { no: 15, title: "Likelihood", periods: 8, competence: "Describe and compare the likelihood of events.", content: "Certain, likely, unlikely and impossible events; simple probability language.", activities: "Conduct simple chance experiments; record outcomes; compare likelihood.", generic: "Critical thinking, numeracy and communication.", cross: "Inclusive participation; practical life skills.", values: "Honesty; curiosity." }
  ]
};

function clean(value, fallback = "") {
  return String(value ?? fallback).trim();
}
function escapeText(value) {
  return clean(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}
function findUnit(level, grade, subject, unitNumber, unitTitle) {
  const key = `${grade.toUpperCase()}|${subject}`;
  const list = CURRICULUM[key] || [];
  return list.find(u => String(u.no) === String(unitNumber)) ||
         list.find(u => u.title.toLowerCase() === clean(unitTitle).toLowerCase()) ||
         list.find(u => u.title.toLowerCase().includes(clean(unitTitle).toLowerCase()) && clean(unitTitle).length > 3) ||
         null;
}

app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    app: "D.A.C AI",
    mode: "Offline CBC Lesson Planner",
    curriculumAvailable: Object.keys(CURRICULUM),
    message: "D.A.C AI server is running successfully."
  });
});

app.get("/api/curriculum", (req, res) => {
  const grade = clean(req.query.grade).toUpperCase();
  const subject = clean(req.query.subject);
  const list = CURRICULUM[`${grade}|${subject}`] || [];
  res.json({ success: true, units: list.map(({ no, title, periods }) => ({ no, title, periods })) });
});

app.post("/api/generate", (req, res) => {
  try {
    const b = req.body || {};
    const grade = clean(b.grade).toUpperCase();
    const subject = clean(b.subject);
    const topic = clean(b.topic);
    const duration = Number(b.duration);

    if (!b.level || !grade || !subject || !topic || !Number.isFinite(duration) || duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "Fill in School Level, Class/Grade, Subject, Lesson Title and a valid Duration."
      });
    }

    const unit = findUnit(b.level, grade, subject, b.unitNumber, b.unitTitle);
    const language = clean(b.language, "English").toLowerCase();
    const rw = language === "kinyarwanda" || language === "rw";
    const intro = Math.max(3, Math.round(duration * 0.15));
    const conclusion = Math.max(3, Math.round(duration * 0.15));
    const development = Math.max(1, duration - intro - conclusion);

    const keyCompetence = clean(b.keyCompetence) || (unit && unit.competence) ||
      "Learners demonstrate understanding of the lesson content and apply it in daily life.";
    const objectives = clean(b.objectives) || (unit
      ? `By the end of the lesson, learners should be able to: explain ${topic.toLowerCase()}; identify key ideas related to ${topic.toLowerCase()}; and apply what they have learned in a relevant situation.`
      : `By the end of the lesson, learners should be able to explain the meaning of ${topic}, identify its main elements and apply the knowledge in a practical situation.`);
    const materials = clean(b.materials) || (unit
      ? `Textbooks, teacher's guide, learner's notebook, board, chalk/markers, relevant pictures or charts, and locally available materials.`
      : "Textbooks, teacher's guide, learner's notebook, board, chalk/markers and locally available teaching aids.");
    const references = clean(b.references) || "REB CBC syllabus for the selected subject and grade; approved learner's textbook; teacher's guide.";

    const activities = rw ? [
      {
        stage: "Intangiriro",
        time: `${intro} min`,
        teacher: `Asuhuza abanyeshuri, agaragaza intego z'isomo, abaza ibibazo bifasha kugaragaza ibyo basanzwe bazi kuri ${topic}.`,
        learners: "Basubiza ibibazo, batanga ingero z'ibyo bazi kandi bagaragaza uko isomo rifitanye isano n'ubuzima bwabo.",
        generic: "Gutekereza no gutumanaho.",
        cross: "Uburinganire, uburezi budaheza no kubaha ibitekerezo bya buri wese."
      },
      {
        stage: "Iterambere ry'isomo",
        time: `${development} min`,
        teacher: `Ayobora ibikorwa byo kwiga kuri ${topic}; atanga ingero n'ibikoresho; ashyira abanyeshuri mu matsinda; abafasha gukora ubushakashatsi no kugera ku ntego z'isomo.`,
        learners: `Bakora ubushakashatsi n'imyitozo ku giti cyabo no mu matsinda; baganira, bakemura ibibazo kandi basangira ibyo bagezeho kuri ${topic}.`,
        generic: unit ? unit.generic : "Gutekereza, ubushakashatsi, gukorera hamwe no gukemura ibibazo.",
        cross: unit ? unit.cross : "Uburinganire, uburezi budaheza, umuco w'amahoro n'ibindi bijyanye n'isomo."
      },
      {
        stage: "Umusozo",
        time: `${conclusion} min`,
        teacher: "Asubiramo ingingo z'ingenzi, abaza ibibazo by'isuzuma, akosora ibitarumvikanye kandi atanga umukoro.",
        learners: "Basobanura ibyo bize, basubiza ibibazo by'isuzuma kandi bandika umukoro.",
        generic: "Kwisuzuma, gutumanaho no gukunda kwiga.",
        cross: "Kwiyubakamo ubushobozi no gukoresha ubumenyi mu buzima bwa buri munsi."
      }
    ] : [
      {
        stage: "Introduction",
        time: `${intro} min`,
        teacher: `Greets learners, shares the lesson objectives and asks introductory questions to assess prior knowledge about ${topic}.`,
        learners: "Answer questions, share prior knowledge and connect the lesson to familiar real-life experiences.",
        generic: "Critical thinking and communication.",
        cross: "Gender equality, inclusive education and respect for different contributions."
      },
      {
        stage: "Lesson Development",
        time: `${development} min`,
        teacher: `Facilitates learner-centred activities about ${topic}; explains key ideas with examples and teaching aids; organises pair/group work; guides learners towards the lesson objectives.`,
        learners: `Investigate and practise ideas about ${topic} individually and in groups; discuss, solve tasks and present their findings.`,
        generic: unit ? unit.generic : "Critical thinking, research, cooperation and problem-solving.",
        cross: unit ? unit.cross : "Gender education, inclusive education, peace and values education, and other relevant cross-cutting issues."
      },
      {
        stage: "Conclusion",
        time: `${conclusion} min`,
        teacher: "Summarises key learning points, asks assessment questions, gives feedback and assigns relevant homework.",
        learners: "Summarise what they learned, answer assessment questions and record the homework.",
        generic: "Self-assessment, communication and lifelong learning.",
        cross: "Responsibility and application of learning in daily life."
      }
    ];

    const lesson = {
      title: rw ? "IMYITEGURO Y'ISOMO" : "LESSON PLAN",
      schoolName: clean(b.schoolName),
      teacherName: clean(b.teacherName),
      term: clean(b.term),
      schoolLevel: clean(b.level),
      language: rw ? "Kinyarwanda" : "English",
      class: grade,
      subject,
      unitNumber: clean(b.unitNumber),
      lessonNumber: clean(b.lessonNumber),
      duration: `${duration} minutes`,
      date: clean(b.date),
      boys: Number(b.boys || 0),
      girls: Number(b.girls || 0),
      totalLearners: Number(b.boys || 0) + Number(b.girls || 0),
      specialNeeds: clean(b.specialNeeds, "None") || "None",
      unitTitle: clean(b.unitTitle) || (unit ? unit.title : ""),
      keyCompetence,
      topic,
      subtopic: clean(b.subtopic),
      objectives,
      location: clean(b.location),
      materials,
      references,
      unitFound: Boolean(unit),
      curriculumNote: unit
        ? `Matched REB unit ${unit.no}: ${unit.title} (${unit.periods} periods).`
        : "No exact unit match was found in the currently loaded offline curriculum. The lesson was prepared from the information entered by the teacher.",
      contentFocus: unit ? unit.content : topic,
      genericCompetences: unit ? unit.generic : "Critical thinking, communication, cooperation, research and problem-solving.",
      crossCuttingIssues: unit ? unit.cross : "Gender education, inclusive education, peace and values education, and relevant subject-specific issues.",
      values: unit ? unit.values : "Respect, responsibility, cooperation and commitment.",
      activities
    };

    res.json({ success: true, mode: "offline", lesson });
  } catch (error) {
    console.error("Generation error:", error);
    res.status(500).json({ success: false, message: "An unexpected error occurred while preparing the lesson plan." });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`D.A.C AI is running at http://localhost:${PORT}`);
});
