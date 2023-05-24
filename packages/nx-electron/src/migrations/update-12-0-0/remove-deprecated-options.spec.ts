import { readJson } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';

import subject from './remove-deprecated-options';

describe('Migration: Remove deprecated options', () => {
  it(`should remove deprecated node build options`, async () => {
    let tree = createTreeWithEmptyWorkspace();

    tree.write(
      'workspace.json',
      JSON.stringify({
        version: 2,
        projects: {
          myapp: {
            root: 'apps/myapp',
            sourceRoot: 'apps/myapp/src',
            projectType: 'application',
            targets: {
              build: {
                executor: 'nx-electron:build',
                options: {
                  showCircularDependencies: false,
                },
                configurations: {
                  production: {
                    showCircularDependencies: true,
                  },
                },
              },
            },
          },
        },
      })
    );

    await subject(tree);

    expect(readJson(tree, 'workspace.json')).toEqual({
      version: 2,
      projects: {
        myapp: {
          root: 'apps/myapp',
          sourceRoot: 'apps/myapp/src',
          projectType: 'application',
          targets: {
            build: {
              executor: 'nx-electron:build',
              options: {},
              configurations: {
                production: {},
              },
            },
          },
        },
      },
    });
  });
});
