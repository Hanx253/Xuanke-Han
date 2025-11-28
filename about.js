fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const {about, resume, contact} = data;

        const intro = document.querySelector('.introductionContainer');
        const introHeading = document.createElement('h2');
        introHeading.textContent = 'Introduction';
        intro.appendChild(introHeading);
        const introText = document.createElement('p');
        introText.textContent = about.introduction;
        intro.appendChild(introText);

        const skills = document.querySelector('.skillsContainer');
        const skillsHeading = document.createElement('h2');
        skillsHeading.textContent = 'Skills';
        skills.appendChild(skillsHeading);
        const mySkills = document.createElement('ul');

        about.skills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        mySkills.appendChild(skillItem);
        });

        skills.appendChild(mySkills);


        const interests = document.querySelector('.interestsContainer');
        const interestsHeading = document.createElement('h2');
        interestsHeading.textContent = 'Interests';
        interests.appendChild(interestsHeading);
        const myInterests = document.createElement('ul');

        about.interests.forEach(interest => {
        const interestItem = document.createElement('li');
        interestItem.textContent = interest;
        myInterests.appendChild(interestItem);
        });

        interests.appendChild(myInterests);


const workContainer = document.querySelector('.workContainer');
const workHeading = document.createElement('h2');
workHeading.textContent = 'Work Experience';
workContainer.appendChild(workHeading);

// 兼容：可以是一个对象，也可以是数组
const workList = Array.isArray(resume.workExperience)
  ? resume.workExperience
  : [resume.workExperience];

workList.forEach(work => {
  // 外层容器（一个实习块）
  const workItem = document.createElement('div');
  workItem.classList.add('work-item');

  // 顶部一行：左=公司+职位，右=时间
  const header = document.createElement('div');
  header.classList.add('work-header');

  const left = document.createElement('div');
  left.classList.add('work-left');

  const companySpan = document.createElement('span');
  companySpan.textContent = work.company;
  companySpan.classList.add('work-company');

  const titleSpan = document.createElement('span');
  titleSpan.textContent = ` | ${work.jobTitle}`;
  titleSpan.classList.add('work-title');

  left.appendChild(companySpan);
  left.appendChild(titleSpan);

  const dateSpan = document.createElement('span');
  dateSpan.textContent = work.dates || '';
  dateSpan.classList.add('work-dates');

  header.appendChild(left);
  header.appendChild(dateSpan);
  workItem.appendChild(header);

  // 职责列表（如果有）
  if (work.responsibilities && work.responsibilities.length > 0) {
    const responsibilitiesList = document.createElement('ul');

    work.responsibilities.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      responsibilitiesList.appendChild(li);
    });

    workItem.appendChild(responsibilitiesList);
  }

  workContainer.appendChild(workItem);
});




        const education = resume.education;
        const educationContainer = document.querySelector('.educationContainer');
        const educationHeading = document.createElement('h2');
        educationHeading.textContent = 'Education';
        educationContainer.appendChild(educationHeading);
        const educationText = document.createElement('p');
        educationText.textContent = `${education.institution}, ${education.degree} (${education.yearGraduated})`;
        educationContainer.appendChild(educationText);


        const contactContainer = document.querySelector('.contactContainer');
        const contactHeading = document.createElement('h2');
        contactHeading.textContent = 'Contact';
        contactContainer.appendChild(contactHeading);

        const email = document.createElement('p');
        email.innerHTML = `<b>Email:</b> <a href="mailto:${contact.email}">${contact.email}</a>`;
        contactContainer.appendChild(email);

        const phone = document.createElement('p');
        phone.innerHTML = `<b>Phone:</b> <a href="tel:${contact.phoneNumber}">${contact.phoneNumber}</a>`;
        contactContainer.appendChild(phone);
  })

  