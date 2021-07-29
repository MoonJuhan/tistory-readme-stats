export const refineTags = (tags) => {
  let tagMarkup = '';
  let xPos = 25;
  
  tags.forEach((tag) => {
    let size = 16;
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const capitalEnglish = /[A-Z]/;

    for (let i = 0; i < tag.length; i++) {
      const letter = tag[0];
      size += korean.test(letter) ? 10 : capitalEnglish.test(letter) ? 7.5 : 5;
    }

    tagMarkup += `
    <svg data-testid="lang-items" x="${xPos}" width="${size}" viewBox="0 0 ${size} 19">
        <g style="position: relative;">
            <rect width="${size}" height="19.5367" rx="9.76834" fill="#F1F3F5"/>
            <text data-testid="lang-name" text-anchor="middle" x="${
              size / 2
            }" y="14" class="tag-item">${tag}</text>
        </g>
    </svg>
    ,
    `;
    xPos += size + 5;
  });

  return tagMarkup;
};
