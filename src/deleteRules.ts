import { Octokit } from '@octokit/core';
import { createAppAuth } from '@octokit/auth-app';
import { Octokit as OctokitClient } from 'octokit';

const APP_ID = 'process.env[APP_ID]';
const PRIVATE_KEY = 'process.env[APP_KEY]';
const INSTALLATION_ID = '38026827';

const auth = createAppAuth({
  appId: APP_ID,
  privateKey: PRIVATE_KEY,
  installationId: parseInt(INSTALLATION_ID, 10),
});

const authOptions = {
  type: 'app',
  auth: {
    ...auth,
  },
};

const appOctokit = new Octokit({
    authStrategy: auth,
  });

  
async function deleteBranchProtection(owner: string, repo: string, branch: string): Promise<void> {
  const installationAuth = await appOctokit.auth({
    ...authOptions,
    installationId: parseInt(INSTALLATION_ID, 10),
  });

  const installationOctokit = new OctokitClient({
    auth: installationAuth.token,
  });

  try {
    await installationOctokit.request('DELETE /repos/{owner}/{repo}/branches/{branch}/protection', {
      owner,
      repo,
      branch,
    });
    console.log(`Branch protection rules deleted for ${branch}`);
  } catch (error) {
    console.error(`Failed to delete branch protection rules for ${branch}: ${error.message}`);
  }
}


const owner = 'medhekars';
const repo = 'TestRulesets';
const branch = 'main';

deleteBranchProtection(owner, repo, branch)
  .then(() => console.log('Branch protection rules deleted successfully'))
  .catch((error) => console.error('Error deleting branch protection rules:', error));


