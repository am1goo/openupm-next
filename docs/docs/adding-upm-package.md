---
showFooter: false
---
# Adding UPM Package

## UPM Package Criteria

OpenUPM requires packages to meet the following criteria:

1. **Package Name:** The package name must adhere to the [Unity Package Manager naming convention](https://docs.unity3d.com/Manual/cus-naming.html) by using "reverse domain name notation" with at least three segments, like `com.yourname.package-name`. Avoid using a scope that might cause confusion for others. For instance, refrain from using `com.unity.package-name` unless you are affiliated with Unity Technologies. Also, do not use `com.example` as the package name, as it is reserved for internal testing purposes.

2. **Unity Terms and Package Guidelines:** The package should comply with [Unity Terms](https://unity3d.com/legal/terms-of-service/software) and [Package Guidelines](https://unity.com/legal/terms-of-service/software/package-guidelines).

3. **Open-Source and GitHub Hosting:** The package must be open-source and hosted on GitHub. It is recommended to choose a license from the [spdx license list](https://spdx.org/licenses/).

4. **Functionality and Usefulness:** The package should be functional and useful. Test packages are not accepted due to limited resources. It's advised to import your package via Git URL and test it before submission.

5. **Semantic Versioning:** The package should use [semantic versioning (semver)](https://semver.org/). For example, `1.1.0`, `1.1.1-preview`, `v1.1.2`. You can create Git tags using the [GitHub release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository#creating-a-release) feature or automate the process using [GitHub actions](https://medium.com/openupm/how-to-maintain-upm-package-part-2-f352fbf5f87c).

6. **Package Size:** The package size should be under 512MB.

7. **Legal Compliance:** The package must conform to local laws and regulations, ensuring that it does not promote hate speech, discrimination, or any harmful content. Additionally, it should not infringe upon intellectual property rights or violate any copyrights, trademarks, or patents.

8. **Forked Repositories:** If submitting a forked package, please make minimal changes to add UPM support (convert the C# project into UPM format by adding necessary files) to avoid confusion. If you plan to modify the original package significantly, change it to your own package name, like `com.yourname.package-name`.

9. **Unity packages:** Please be aware that Unity publishes its own packages on the Unity registry or GitHub. You can only publish a package to OpenUPM if it is not already available on the Unity registry. This ensures that OpenUPM serves as a platform for packages that are not part of Unity's official offerings.

10. **Uplinked NuGet packages:** We strongly encourage you to submit NuGet packages to [UnityNuGet](/nuget/) that have been uplinked by the OpenUPM registry. However, if you have a specific need to publish a NuGet package directly on OpenUPM, please use your own scope, such as `com.yourname.nuget-package-name`.

By adhering to these guidelines, package maintainers can contribute to a thriving ecosystem of Unity packages on OpenUPM, benefiting developers and users alike. Packages that do not meet these criteria will be rejected or removed from the OpenUPM platform.

## Understanding Different Folder Structures of UPM Repositories

There're three typical folder structures of UPM repositories. OpenUPM build pipelines can handle all of them.

- UPM package at the root path
- UPM package at a sub-folder
- UPM package at a sub-folder with UPM branch

### UPM Package at the Root Path

The `package.json` file is located at the root path of the master branch. It is the simplest case.

### UPM Package at a Sub-folder

The master branch is usually a Unity project (with Assets folder). The `package.json` file is located at a sub-folder, for example `Assets/package-name` or `Packages/com.namespace.package-name`. Git tags are based on the master branch. Build pipelines will detect the location of the `package.json` file, and handle it correctly.

### UPM Package at a Sub-folder with UPM Branch

The master branch is usually a Unity project (with Assets folder). The `package.json` file is located at a sub-folder, for example `Assets/package-name` or `Packages/com.namespace.package-name`. A `upm` branch is created from the package folder using the `git subtree split/push` command to make the `package.json` file placed at the root path. So the package can be installed by Unity Package Manager via Git URL. Git tags are based on the upm branch.

## Package YAML File

OpenUPM uses a YAML file to store the package information. Here's an example.

```yaml
# The package name
name: com.namespace.unitypackageexample
# The package display name
displayName: Unity Package Example
# The short package description
description: An unity package example
# The repository url
repoUrl: 'https://github.com/author/reponame'
# The forked repository url
parentRepoUrl: null
# The Software Package Data Exchange® (SPDX®) license id
licenseSpdxId: MIT
# The license name
licenseName: MIT License
# A list of topic slugs
topics:
  - utilities
# Filtering Git tags based on their prefix. It’s particularly useful for monorepos to distinguish between Git tags. i.e. 'com.example.foo/'.
gitTagPrefix: ''
# The regular expression that specifies intentionally untracked Git tags that should be ignored
gitTagIgnore: '-master$'
# The minimal version to build. Leave it blank to build all versions.
minVersion: '1.0.5'
# The featured image URL. It should point to a valid image URL instead of a web page that presents the image.
# Leave it blank to use the repository’s social image if it exists.
image: 'https://github.com/author/reponame/raw/master/path-of-img.png'
# The featured image fit mode: cover (default) or contain. Learn more at https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
imageFit: cover
# The README.md file path (branchname:filename)
readme: 'master:README.md'
# The package hunter's GitHub username
hunter: author
```

## Using Package Add Form

Package hunters can use the [package add form](/packages/add/), to submit the package YAML file. The form will guide you to fill the required information, generate the YAML file, then submit to GitHub as a pull request in the browser.

[![package add form](./images/package-add-form.png)](/packages/add/)

The pull request of adding a new package will be merged automatically. The CI will do jobs to update the website and build pipelines. Within a few minutes you can view the package detail page at URL `/packages/com.namespace.package-name`, and check the build result from the **version history** and **build issues** sections.

```
+--------------+      +--------------+      +---------+
| Package Form | +--> | Pull Request | +--> | Wait CI |
+--------------+      +--------------+      +---------+
```

## Troubleshooting

### Handling a Repository without Git Tag

Please create an issue on the author's repository for making GitHub releases. The git tag should be a valid semver. To learn how to automate the release process with GitHub actions, please checkout [this tutorial](https://medium.com/openupm/how-to-maintain-upm-package-part-2-f352fbf5f87c).

### Handling Duplicated Tags for master and upm Branches

A repository may contain duplicated version tags. Likely created by CI tools, one for the master branch, another for the upm branch. i.e

- `1.0.0` and `upm/1.1.0`
- `1.0.0` and `1.1.0-upm`
- `1.0.0-master` and `1.1.0-upm`

In such cases the tag from the upm branch takes higher priority, another one is ignored.

### Handling Failed Builds

You can check the failed reason at the build pipelines section on the package detail page. The most common issue is *version conflict/version exists*, means a package with the same version is already published. The package owner need bump the version with a new GitHub release, or re-tag the existing release. Build pipelines will re-build failed releases if detecting that the related git tag was removed or re-tagged.

However, build pipelines will not rebuild an already succeeded release if detecting that the git tag is removed or retagged. Because it's a bad practice for talking off or replacing an existing release for a public registry. If the intention is to fix something, the package owner is recommended to bump the version with a new git tag. Learn more at [modifying or deleting a published version](modifying-upm-package.md#modifying-or-deleting-a-published-version).

### Handling Monorepos

Monorepos preset multiple packages in a single repository. Usually layout as below,

```
Packages/
  com.namespace.foo/
    package.json
  com.namespace.bar/
    package.json
```

For monorepos, multiple package submissions are required. You need submit packages one by one to the OpenUPM platform. Then there're two cases,
- If you make a single Github release for each new version, it will just works. Our build pipelines will treat each package submission separately, and locate the relevant package.json to process.
- If you make separate GitHub releases for each new version, you need use a git tag prefix for each package. i.e `com.namespace.bar/1.0.0` and `com.namespace.foo/1.0.0`. Then fill the `gitTagPrefix` field of the package YAML file. i.e package `com.namespace.bar` should have `gitTagPrefix: "com.namespace.bar/"`, to avoid wasting resources of build pipelines.

### Handling Custom Build-Pipelines

OpenUPM doesn't support custom build-pipelines. As a workaround, we suggest leaving the work to CI like GitHub Actions.

- For minimal customizations like moving the sample folder, you can build the content into a upm branch (a build branch), then tag the upm branch as a versioned Git tag for OpenUPM to consume.
- For deeper customizations like building DLLS you can push build content into another (build) repository, then submit that build repository to OpenUPM.
