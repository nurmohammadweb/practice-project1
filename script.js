const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") // promise of response
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn")
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  const url =`https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const cartBtn = document.getElementById(`lesson-btn-${id}`);
      removeActive(); //remove all active class
      // console.log(cartBtn);
      cartBtn.classList.add('active');//add active class
      displayLevelWord(data.data);
    });
  
};

 const loadWordDetail = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
   
   const res = await fetch(url);
   const details = await res.json();
   displayWordDeteals(details.data);
} 

const displayWordDeteals = (word) => {
  console.log(word);
  const detailsBox = document.getElementById("details-container");
   detailsBox.innerHTML = `<div class="">
            <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone"></i>:${word.pronuonciation})</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p class="">${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p class="">${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <span class="btn">Syn1</span>
            <span class="btn">Syn1</span>
            <span class="btn">Syn1</span>
          </div>
`;
  document.getElementById("word_modal").showModal();
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("Word-container");
  //  console.log(words);

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class="col-span-full bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
     <img class="mx-auto" src="assets/alert-error.png" alt="">
         <p class="font-semibold ">আপনি এখনো কোন Lesson Select করেন</p>
        <h2 class="font-bold text-2xl">একটি Lesson Select করুন।</h2>
        
       
      </div>`;
    return;
  }

 

  wordContainer.innerHTML = "";
  words.forEach((word) => {
    const clickDiv = document.createElement("div");
    clickDiv.innerHTML = `<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
        <h2 class="font-bold text-2xl">${word.word ? word.word : "word পাওয়া যায় নি"}</h2>
        <p class="font-semibold ">Meaning / Pronuonciation</p>
        <div class="text-2xl font-medium font-bangla"> ${word.meaning ? word.meaning : "meaning পাওয়া যায় নি"} / ${word.pronuonciation ? word.pronuonciation : "pronuonciation পাওয়া যায় নি"}</div>
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>`;

    wordContainer.append(clickDiv);
  });

};


const displayLesson = (lessons) => {
  // 1.get the container
  
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2.get into evey lessons
  for (let lesson of lessons) {
    // 3. create Element
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i>
              Lesson - ${lesson.level_no}
    </button>`;
    // 4.append into container
    levelContainer.append(btnDiv);

  }
  
};
loadLessons();