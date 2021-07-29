export const style = (theme) => {
  return theme === 'dark'
    ? `
    <style xmlns="http://www.w3.org/2000/svg">
.header {
    font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #eb531f;
    animation: fadeInAnimation 0.8s ease-in-out forwards;
  }
  .log-title {
    font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #ffffff;
  }
  .log-description {
    font-size: 12px;
    fill: #ffffff;
  }
  .tag-item {
    font-size: 12px;
    fill: #eb531f;
  }
  .heart-count {
    font-size: 12px;
    fill: #eb531f;
  }    

  .comment-icon {
    fill: #eb531f;
  }
  .card-background {
    fill: #242a2d;
    stroke: #30353d;
  }
</style>
    `
    : `
<style xmlns="http://www.w3.org/2000/svg">
.header {
    font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #343a40;
    animation: fadeInAnimation 0.8s ease-in-out forwards;
  }
  .log-title {
    font: bold 14px 'Segoe UI', Ubuntu, Sans-Serif;
    fill: #212529;
  }
  .log-description {
    font-size: 12px;
    fill: #495057;
  }
  .tag-item {
    font-size: 12px;
    fill: #eb531f;
  }
  .heart-count {
    font-size: 12px;
    fill: #495057;
  }    
  .comment-icon {
    fill: #000000;
  }
  .card-background {
    fill: #fffefe;
    stroke: #e4e2e2;
  }
</style>
`;
};
