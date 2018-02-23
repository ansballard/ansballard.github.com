const projects = [
  {
    title: "Modwatch",
    url: "https://modwat.ch",
    repos: [
      "https://github.com/Modatch/Frontend",
      "https://github.com/Modatch/API",
      "https://github.com/ansballard/modwatchuploader"
    ],
    thumbnail: ""
  },
  {
    title: "minimap-autohider",
    repos: ["https://github.com/ansballard/minimap-autohider"],
    thumbnail: ""
  }
];

export default `
  <ul>
    ${projects.map(
      ({ title, url, repos, thumbnail, gif }) => `<li>
      <h2>${title}</h2>
      <img src="${thumbnail}"/>
      <p>
        <h3><a href="${url}">${url}</a></h3>
        ${repos.map(repo => `<a href="${repo}">${repo}</a>`)}
      </p>
    </li>`
    )}
  </ul>
`;
