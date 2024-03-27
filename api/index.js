const app = require("express")();

app.get("/api/badge", (req, response) => {
  response.setHeader("Content-Type", "image/svg+xml");
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

module.exports = app;
