# ![image](https://user-images.githubusercontent.com/27461460/75094417-20321b00-55ce-11ea-8de7-a1df42a4b7df.png)

[![Version](http://img.shields.io/npm/v/react-native-iap.svg?style=flat-square)](https://npmjs.org/package/react-native-iap)
[![Download](http://img.shields.io/npm/dm/react-native-iap.svg?style=flat-square)](https://npmjs.org/package/react-native-iap)
[![CI](https://github.com/dooboolab/react-native-iap/actions/workflows/ci.yml/badge.svg)](https://github.com/dooboolab/react-native-iap/actions/workflows/ci.yml)
[![document](https://github.com/dooboolab/react-native-iap/actions/workflows/deploy-document.yml/badge.svg)](https://github.com/dooboolab/react-native-iap/actions/workflows/deploy-document.yml)
[![License](https://img.shields.io/npm/l/react-native-iap.svg)](https://npmjs.org/package/react-native-iap)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/dooboolab/react-native-iap.svg)](https://github.com/dooboolab/react-native-iap)
[![Issue Opened](https://img.shields.io/opencollective/all/react-native-iap.svg)](https://opencollective.com/react-native-iap#backers)
[![Issue Opened](https://img.shields.io/github/issues/dooboolab/react-native-iap.svg)](https://github.com/dooboolab/react-native-iap/issues)
[![Issue Closed](https://img.shields.io/github/issues-closed/dooboolab/react-native-iap.svg)](https://github.com/dooboolab/react-native-iap/issues?q=is%3Aissue+is%3Aclosed)
[![PR Opened](https://img.shields.io/github/issues-pr/dooboolab/react-native-iap.svg)](https://github.com/dooboolab/react-native-iap/pulls)
[![PR Closed](https://img.shields.io/github/issues-pr-closed/dooboolab/react-native-iap.svg)](https://github.com/dooboolab/react-native-iap/pulls?q=is%3Apr+is%3Aclosed) [![Greenkeeper badge](https://badges.greenkeeper.io/dooboolab/react-native-iap.svg)](https://greenkeeper.io/)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdooboolab%2Freact-native-iap.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdooboolab%2Freact-native-iap?ref=badge_shield)

## Introduction

This react-native module will help you access the In-app purchases capabilities of your phone on the `Android`, `iOS` platforms and the `Amazon` platform (Beta).

**Keep in mind** `react-native-iap` will provide the basic features you need but is not a turnkey solution, implementing In-app purchases in your app will still require quite some work.<br/>
Also, implementing the client side is only one side of the coin, you'll have to implement the server side to validate your receipts (which is probably the most time consuming part to do it correctly).

If you're looking for a module going further than react-native-iap, we recommend using [react-native-iaphub](https://github.com/iaphub/react-native-iaphub) which is taking care of everything from the client side to the server side.

⚠️ Most of users experiencing issues are caused by:

- A device simulator, use a real device for testing!
- The sandbox environment of the project not being configured properly ([Configure android sandbox](https://www.iaphub.com/docs/set-up-android/configure-sandbox-testing), [Configure ios sandbox](https://www.iaphub.com/docs/set-up-ios/configure-sandbox-testing/))
- An incorrect usage of the library

This branch is dedicated to the latest version of the library, v8. Make sure to switch to other branch to find out about old documentation and apis.

## Installation

```sh
npm install react-native-iap
```

or

```sh
yarn add react-native-iap
```

## Usage

```ts
import { useIAP } from 'react-native-iap';

// ...

const {} = useIAP();
```

## Documentation

The documentation is published on [this website](https://react-native-iap.dooboolab.com).

## Example

You can look in the [`example/`](./example) folder to try the example.

NOTE: To run `example` on Android use the variant flag as follows:

```
yarn android --variant=MY_VARIANT
```

where `MY_VARIANT` is `PlayDebug` or `AmazonDebug`

Below is basic implementation which is also provided in `example` project.

If you want more advanced one please refer to [dooboolab.com/sponsor.tsx](https://github.com/hyochan/dooboolab.com/blob/main/src/components/pages/Sponsor.tsx)

## Sponsoring

Since `IAP` itself is not perfect on each platform, we desperately need
this project to be maintained. If you'd like to help us, please consider being
with us in [Open Collective](https://opencollective.com/react-native-iap).

### Sponsors

Support this project by becoming a sponsor. Your logo will show up here with
a link to your website. [Become a sponsor][open-collective-sponsor].
<a href="https://opencollective.com/react-native-iap#sponsors" target="_blank"><img src="https://opencollective.com/react-native-iap/sponsors.svg?width=890"></a>

### Backers

Please be our [Backers][open-collective-backer].
<a href="https://opencollective.com/react-native-iap#backers" target="_blank"><img src="https://opencollective.com/react-native-iap/backers.svg?width=890"></a>

### Contributing

Please make sure to read the [Contributing Guide][contribute] before making a pull request.
Thank you to all the people who helped to maintain and upgrade this project!

<a href="graphs/contributors"><img src="https://opencollective.com/react-native-iap/contributors.svg?width=890" /></a>

<hr>

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdooboolab%2Freact-native-iap.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdooboolab%2Freact-native-iap?ref=badge_large)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
