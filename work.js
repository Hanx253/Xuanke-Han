fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const worksData = data.works || {};
    const container = document.getElementById('worksContainer');

    // 取得分类名并按 A–Z 排序
    const categories = Object.keys(worksData).sort((a, b) =>
      a.localeCompare(b)
    );

    categories.forEach(categoryName => {
      const projects = worksData[categoryName];
      if (!projects || projects.length === 0) return;

      // 分类标题
      const section = document.createElement('section');
      section.classList.add('category-section');

      const heading = document.createElement('h2');
      heading.textContent = categoryName;
      section.appendChild(heading);

      const grid = document.createElement('div');
      grid.classList.add('works-grid');

      projects.forEach(project => {
        const card = document.createElement('div');
        card.classList.add('work-card');
        card.dataset.category = categoryName;
        card.dataset.id = project.id;

        const thumbWrapper = document.createElement('div');
        thumbWrapper.classList.add('work-thumb');

        const img = document.createElement('img');
        img.src = project.images && project.images[0] ? project.images[0] : '';
        img.alt = project.title || '';

        const overlay = document.createElement('div');
        overlay.classList.add('work-overlay');

        const title = document.createElement('h3');
        title.textContent = project.title;

        const meta = document.createElement('p');
        meta.classList.add('work-meta');
        // 年份 + 尺寸 + 媒介
        const metaParts = [];
        if (project.year) metaParts.push(project.year);
        if (project.size) metaParts.push(project.size);
        if (project.medium) metaParts.push(project.medium);
        meta.textContent = metaParts.join(' • ');

        const shortDesc = document.createElement('p');
        shortDesc.classList.add('work-short');
        shortDesc.textContent = project.shortDescription || '';

        overlay.appendChild(title);
        overlay.appendChild(meta);
        overlay.appendChild(shortDesc);

        thumbWrapper.appendChild(img);
        thumbWrapper.appendChild(overlay);
        card.appendChild(thumbWrapper);

        // 点击打开 lightbox / gallery
        card.addEventListener('click', () => {
          openLightbox(project);
        });

        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    });

    // ------- Lightbox 逻辑 -------

    const lightbox = document.getElementById('lightbox');
    const lbImage = document.getElementById('lightboxImage');
    const lbTitle = document.getElementById('lightboxTitle');
    const lbMeta = document.getElementById('lightboxMeta');
    lbMeta.classList.add('lightbox-date-line');
    const lbDesc = document.getElementById('lightboxDesc');
    const lbBack = document.getElementById('lightboxBack');
    const lbPrev = document.getElementById('lightboxPrev');
    const lbNext = document.getElementById('lightboxNext');
    const videoLink = document.getElementById('videoLink');
    const moreLink = document.getElementById('moreLink');

    let currentProject = null;
    let currentIndex = 0;

    function openLightbox(project) {
      currentProject = project;
      currentIndex = 0;
      updateLightbox();
      lightbox.classList.remove('hidden');
    }

    function updateLightbox() {
      if (!currentProject) return;
      const imgs = currentProject.images || [];
      const src = imgs[currentIndex] || '';

      lbImage.src = src;
      lbTitle.textContent = currentProject.title || '';

      const metaParts = [];
      if (currentProject.date) metaParts.push(currentProject.date);
      if (currentProject.size) metaParts.push(currentProject.size);
      if (currentProject.medium) metaParts.push(currentProject.medium);
      lbMeta.textContent = metaParts.join(' • ');

      lbDesc.textContent = currentProject.shortDescription || '';

      // 视频链接
      if (currentProject.videoUrl) {
        videoLink.textContent = 'Video';
        videoLink.href = currentProject.videoUrl;
        videoLink.style.display = 'inline-block';
      } else {
        videoLink.style.display = 'none';
      }

      // View more
      if (currentProject.moreUrl) {
        moreLink.textContent = 'View more';
        moreLink.href = currentProject.moreUrl;
        moreLink.style.display = 'inline-block';
      } else {
        moreLink.style.display = 'none';
      }

      // 如果只有一张图就隐藏左右箭头
      const hasMultiple = imgs.length > 1;
      lbPrev.style.visibility = hasMultiple ? 'visible' : 'hidden';
      lbNext.style.visibility = hasMultiple ? 'visible' : 'hidden';
    }

    function changeImage(delta) {
      if (!currentProject) return;
      const imgs = currentProject.images || [];
      if (imgs.length <= 1) return;
      currentIndex = (currentIndex + delta + imgs.length) % imgs.length;
      updateLightbox();
    }

    lbBack.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      currentProject = null;
    });

    lbPrev.addEventListener('click', () => changeImage(-1));
    lbNext.addEventListener('click', () => changeImage(1));

    // 点击黑色背景也关闭
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        currentProject = null;
      }
    });
  });
