export const refineTags = (tags) => {
  let tagMarkup = '';
  let xPos = 25;
  console.log(tags);
  tags.forEach((tag) => {
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    const size = tag.length * (korean.test(tag) ? 12 : 9);
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
