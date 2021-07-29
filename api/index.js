const { style } = require('../src/style');
const { refineTags } = require('../src/tags');

const app = require('express')();
const axios = require('axios');

const ACCESS_TOKEN = process.env.token;

app.get('/api', async (req, res) => {
  if (!req.query.name) {
    res.send('tistory-readme-stats 의 사용법은 <a href="https://github.com/MoonJuhan/tistory-readme-stats">깃허브 리드미 문서</a>를 참고해주세요.');
  } else {
    const postId = req.query.postId || (await getNewestPostId(req.query.name));
    res.setHeader('Content-Type', 'image/svg+xml');
    renderCard(res, {
      ...req.query,
      ...(await getPostData(req.query.name, postId)),
    });
  }
});

app.get('/api/badge', (req, response) => {
  response.setHeader('Content-Type', 'image/svg+xml');
  response.send(`
  <svg xmlns="http://www.w3.org/2000/svg" width="117" height="34" viewBox="0 0 117 34" fill="none">
      <style>
          .name{ fill: #ffffff; font-weight: 500; font-size: 13px;}
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" width="98" height="25" viewBox="0 0 98 25" fill="none">
          <g>
              <rect x="22" width="81" height="25" fill="#eb531f"/>
              <text x="30" y="17" class="name">${req.query.name}</text>
          </g>
          <path d="M3.125 0H21.875C23.6009 0 25 1.39911 25 3.125V21.875C25 23.6009 23.6009 25 21.875 25H3.125C1.39911 25 0 23.6009 0 21.875V3.125C0 1.39911 1.39911 0 3.125 0Z" fill="#eb531f"/>
          
          <g width="25" height="25">
            <circle class="cls-1" cx="7" cy="8" r="2" fill="white"/>
            <circle class="cls-1" cx="12" cy="8" r="2" fill="white"/>
            <circle class="cls-1" cx="17" cy="8" r="2" fill="white"/>
            <circle class="cls-1" cx="12" cy="13" r="2" fill="white"/>
            <circle class="cls-1" cx="12" cy="18" r="2" fill="white"/>
          </g>
      </svg>
  </svg>
  `);
});

const renderCard = (
  res,
  { color, name, title, description, comments, tags }
) => {
  res.send(`
      <svg xmlns="http://www.w3.org/2000/svg" width="450" height="130" viewBox="0 0 450 130" fill="none">
        ${style(color)} 
        <rect xmlns="http://www.w3.org/2000/svg" data-testid="card-bg" x="0.5" y="0.5" rx="4.5" height="99%" width="449" stroke-opacity="1" class="card-background"/>

        <g xmlns="http://www.w3.org/2000/svg" data-testid="card-title" transform="translate(25, 35)">
        <g transform="translate(0, 0)">
                <text x="0" y="0" class="header" data-testid="header">${name}.tistory.com</text>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" x="388" y="-14" height="17" viewBox="0 0 30 17" fill="none">
                    <path d="M17.657,2.982H2.342c-0.234,0-0.425,0.191-0.425,0.426v10.21c0,0.234,0.191,0.426,0.425,0.426h3.404v2.553c0,0.397,0.48,0.547,0.725,0.302l2.889-2.854h8.298c0.234,0,0.426-0.191,0.426-0.426V3.408C18.083,3.174,17.892,2.982,17.657,2.982M17.232,13.192H9.185c-0.113,0-0.219,0.045-0.3,0.124l-2.289,2.262v-1.96c0-0.233-0.191-0.426-0.425-0.426H2.767V3.833h14.465V13.192z M10,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.488-0.668,1.488-1.489C11.488,7.905,10.821,7.237,10,7.237 M10,9.364c-0.352,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C10.638,9.077,10.351,9.364,10,9.364 M14.254,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489s1.489-0.668,1.489-1.489C15.743,7.905,15.075,7.237,14.254,7.237 M14.254,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.352,0,0.639,0.287,0.639,0.638C14.893,9.077,14.605,9.364,14.254,9.364 M5.746,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.489-0.668,1.489-1.489C7.234,7.905,6.566,7.237,5.746,7.237 M5.746,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C6.384,9.077,6.096,9.364,5.746,9.364" class="comment-icon"/>
                </svg>
                <text x="365" class="heart-count" data-testid="heart-count">${comments}</text>
            </g>
        </g>


        <g xmlns="http://www.w3.org/2000/svg" data-testid="main-card-body" transform="translate(0, 45)">
        <svg data-testid="lang-items" x="25" width="400" height="40" viewBox="0 0 400 40">
            <g transform="translate(0, 0)">
                <text data-testid="lang-name" x="2" y="15" class="log-title">${title}</text>
                <text ata-testid="lang-description" x="2" y="35" class="log-description">${
                  description || ''
                }</text>
            </g>
        </svg>
        </g>

        <g xmlns="http://www.w3.org/2000/svg" data-testid="main-card-bottom" transform="translate(0, 40)">
          ${refineTags(tags)}
        </g>
      </svg>`);
};

const getPostData = async (blogName, postId) => {
  const { data } = await axios.get('https://www.tistory.com/apis/post/read', {
    params: {
      access_token: ACCESS_TOKEN,
      blogName,
      postId,
      output: 'json',
    },
  });

  return {
    title: data.tistory.item.title,
    comments: data.tistory.item.comments,
    tags: data.tistory.item.tags.tag,
  };
};

const getNewestPostId = async (blogName) => {
  const { data } = await axios.get('https://www.tistory.com/apis/post/list', {
    params: {
      access_token: ACCESS_TOKEN,
      blogName,
      output: 'json',
      page: 1,
    },
  });

  return data.tistory.item.posts[0].id;
};

module.exports = app;
