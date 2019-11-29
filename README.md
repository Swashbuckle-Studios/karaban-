# 🐪 kbweb

> Karaban Web Frontend

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/swshbkl/kbweb)

![Version](https://img.shields.io/github/v/tag/swshbkl/kbweb)
[![Github CI/CD](https://img.shields.io/github/workflow/status/actions/toolkit/Main%20workflow/master.svg)](https://github.com)
[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m783902454-fad9d43f2b0313fbae94de8a.svg)](https://status.indie.casa)

[![Language](https://img.shields.io/badge/language-typescript-2B4F7E.svg?longCache=true)](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html/)
[![Framework](https://img.shields.io/badge/framework-react-67DBF9.svg?longCache=true)](https://reactjs.org/docs/getting-started.html)
[![Deployment](https://img.shields.io/badge/deployment-firebase-FECA41.svg?longCache=true)](https://firebase.google.com/docs/hosting)

[![Discord](https://img.shields.io/discord/649868467893305346)](https://indiecasa.slack.com/app_redirect?channel=icweb)
[![Email](https://img.shields.io/badge/email-buck-blue.svg?longCache=true)](mailto:buck@bucktower.net)
![Maintenance](https://img.shields.io/maintenance/yes/2019.svg?style=flat-square)

![Screenshot](https://i.imgur.com/TxQTF9F.png)

---

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Documentation](#documentation)
- [Tests](#tests)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Team](#team)
- [FAQ](#faq)
- [Support](#support)
- [License](#license)

---

## Features

- Provide web interface for Karaban

## Documentation

No documentation yet

## ~~Tests~~ *Work In Progress*

### Running unit tests

> Execute the unit tests via [Karma](https://karma-runner.github.io)

```shell
$ npm run test
```

### Running end-to-end tests

> Execute the end-to-end tests via [Protractor](http://www.protractortest.org/)

```shell
$ npm run e2e
```

### Linting

> Run linting tools as per the [Angular Style Guide](https://angular.io/guide/styleguide)

```shell
$ npm run lint
```

---

## Contributing

> To get started...

We use the [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model and [SemVer](https://semver.org/) for versioning.

### Step 1

- 👯 Click this button:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/swshbkl/kbweb)

**For right now, just use `master` until things are more fleshed out**

~~- 🔎 In the terminal, ensure sure you have a local copy of the `develop` branch~~

```shell
$ git branch -a
* master
  remotes/origin/HEAD
  remotes/origin/master
  remotes/origin/develop
  ...
$ git checkout develop
Branch develop set up to track remote branch experimental from origin.
Switched to a new branch 'develop'
$ git branch
* develop
  master
```

~~- 🌱 Create a feature branch off the `develop` branch~~

```shell
$ git checkout -b myfeature develop
Switched to a new branch "myfeature"
```

### Step 2

- **HACK AWAY!** 🔨🔨🔨
- 📦 Feel free to push to your feature branch whenever

### Step 3

- 🏷 Decide the proper version number as per [SemVer](https://semver.org/) and edit `package.json`
    - Given a version number `MAJOR.MINOR.PATCH`, increment the:
        - `MAJOR` version when you make incompatible API changes
        - `MINOR` version when you add functionality in a backwards-compatible manner, and
        - `PATCH` version when you make backwards-compatible bug fixes.

`package.json`:

```json
{
  ...
  "version": "MAJOR.MINOR.PATCH",
  ...
}
```

-  👨‍🍳 Prepare the `develop` branch to be merged into and ensure it's up-to-date

```shell
$ git checkout develop
Switched to branch 'develop'
$ git pull
```

- 🔀 Merge your feature branch into `develop`

```shell
$ git merge --no-ff myfeature
Updating ea1b82a..05e9557
(Summary of changes)
$ git branch -d myfeature
Deleted branch myfeature (was 05e9557).
$ git push origin develop
```

> *The `--no-ff` flag causes the merge to always create a new commit object, even if the merge could be performed with a fast-forward. This avoids losing information about the historical existence of a feature branch and groups together all commits that together added the feature*

## Deployment

We value quickness and agility over circumspect and slow-moving. Only non-production server is the one you run on Gitpod. Since it's in the cloud, others can access it over the open ports while it's running if you need testing.

*Note: Gitpod will automatically stop running after 30 minutes of inactivity, but your workspace's is saved to the cloud and tied to your Gitpod account for the next time you open it up.*

Deployed to [`karaban.dev`](https://karaban.dev) is triggered manually from the container registered from the `master` branch upon proper tagging and merging and (hopefully) after testing.

Don't fuck up.

---

## Team

| [**Buck Tower**](https://bucktower.net) |
| :---: |
| [![Buck Tower](https://avatars1.githubusercontent.com/u/1170938?v=3&s=200)](https://bucktower.net)|
| [`github.com/bucktower`](https://github.com/bucktower) |

---

## FAQ

- **How do I do *specifically* so and so placeholder?**
  - No problem! Just do this.

## Support

Reach out at one of the following places!

- Join the [Discord channel](https://discordapp.com/channels/649868467893305346/649868575049252865)
- Email [`buck@bucktower.net`](mailto:buck@bucktower.net)

---

## License

- **[ISC](https://opensource.org/licenses/ISC)**
- Copyright 2019 © [Swashbuckle Studios](https://swashbuckle.dev).
