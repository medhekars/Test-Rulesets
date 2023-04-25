const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const createRuleset = async () => {
  try {
    const { data: repo } = await octokit.repos.get({ owner: 'medhekars', repo: 'Test-Rulesets' });

    const ruleset = {
      name: 'My Ruleset',
      rules: [
        {
          name: 'Rule 1',
          conditions: {
            event: 'pull_request',
            base: 'main',
            status: 'success'
          },
          actions: [
            'merge'
          ]
        }
      ]
    };

    const response = await octokit.request('POST /repos/:owner/:repo/code-scanning/sarif-rulesets', {
      owner: 'medhekars',
      repo: 'Test-Rulesets',
      data: ruleset
    });

    console.log(`Ruleset created with ID ${response.data.id}`);
  } catch (error) {
    console.error(error);
  }
};

createRuleset();
