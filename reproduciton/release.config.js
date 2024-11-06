export default {
  branches: ["main", "next"],
  plugins: [
    [
      "@codedependant/semantic-release-docker",
      {
        dockerTags: ["latest", "{major}", "{major}.{minor}", "{major}.{minor}.{patch}"],
        dockerImage: "web",
        dockerRegistry: "registry.gitlab.com",
        dockerProject: "hot",
        dockerArgs: {
          API_TOKEN: true,
          RELEASE_DATE: new Date().toISOString(),
          RELEASE_VERSION: "{next.version}",
        },
      },
    ],
  ],
};
