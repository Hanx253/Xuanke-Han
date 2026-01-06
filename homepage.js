fetch('data.json')
  .then(res => res.json())
  .then(data => {

    /* ===== 顶部：名字 + 字段 + 邮箱 + 导航 ===== */

    const fullName = `${data.firstName} ${data.lastName}`;
    const fields   = data.fields;

    const nameEl   = document.querySelector('.name');
    const fieldEl  = document.querySelector('.field-tag');
    const emailEl  = document.querySelector('.email-link');
    const navEl    = document.querySelector('.top-links');

    const [first, last] = fullName.split(' ');
    nameEl.innerHTML = `${first}<br>${last}`;

    fieldEl.textContent = fields;

    emailEl.textContent = data.contact.email;
    emailEl.href = `mailto:${data.contact.email}`;

    const navItems = [
      { text:'About', url:'about.html' },
      { text:'Work',  url:'work.html' }
    ];

    navItems.forEach(item => {
      const link = document.createElement('a');
      link.textContent = item.text;
      link.href = item.url;
      navEl.appendChild(link);
    });


    /* ===== Selected Works Strip ===== */

    const worksData = data.works || {};
    const stripEl   = document.querySelector('.selected-strip');

    const allWorks = [];
    const byTitle  = {};

    Object.keys(worksData).forEach(cat => {
      (worksData[cat] || []).forEach(project => {
        project._category = cat;
        allWorks.push(project);
        if (project.title) byTitle[project.title] = project;
      });
    });

    const selectedTitles = [
      'DeCade',
      'Blind Faith',
      'Terra Lucida',
      'Beyond the Tank',
      'STANDARDIZED IDENTITY',
      'What Was Taken',
      'Quest'
    ];

    const selected = [];
    selectedTitles.forEach(t => {
      if (byTitle[t]) selected.push(byTitle[t]);
    });

    if (!selected.length) selected.push(...allWorks.slice(0,4));

    selected.forEach(project => {
      const card = document.createElement('a');
      card.className = 'selected-card';
      card.href = project.moreUrl && project.moreUrl.trim()
        ? project.moreUrl
        : 'work.html';

      card.target = '_blank';
      card.rel = 'noopener noreferrer';

      const thumb = document.createElement('div');
      thumb.className = 'selected-thumb';

      const img = document.createElement('img');
      img.src = project.images && project.images[0] || '';
      img.alt = project.title || '';
      thumb.appendChild(img);

      const overlay = document.createElement('div');
      overlay.className = 'selected-overlay';

      const textWrap = document.createElement('div');
      textWrap.className = 'selected-text';

      const name = document.createElement('span');
      name.className = 'selected-name';
      name.textContent = project.title;

      const med = document.createElement('span');
      med.className = 'selected-medium';
      med.textContent = project.medium;

      textWrap.appendChild(name);
      textWrap.appendChild(med);
      overlay.appendChild(textWrap);

      card.appendChild(thumb);
      card.appendChild(overlay);

      stripEl.appendChild(card);
    });

  });
