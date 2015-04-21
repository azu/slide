# npm init


-----

## [azu/init-package-json-parcel](https://github.com/azu/init-package-json-parcel "azu/init-package-json-parcel")

-----

# [azu/init-package-json-parcel](https://github.com/azu/init-package-json-parcel "azu/init-package-json-parcel")

- `npm init`のラッパ
- `pacakge.json`の"repository"を自動的に入れてくれる
	- git remoteがない状態でも入れる

-----

```js
function createInitConfig() {
    return {
        "scope": npm.config.get('scope'),
        "save-prefix": npm.config.get('save-prefix'),
        "save-exact": npm.config.get('save-exact')
    };
}
```

-----

# packge.jsonのハック

- "repository" などを外から追加することができない
- `package.json` に配置しておくと自動的にマージしてくれる


```js
function createHackConfig(userName, packageName) {
    var repo = userName + "/" + packageName;
    return {
        "name": packageName,
        "repository": {
            "type": "git",
            "url": "https://github.com/" + repo + ".git"
        },
        "author": npm.config.get("init.author.name"),
        "email": npm.config.get("email"),
        "homepage": "https://github.com/" + repo,
        "license": npm.config.get("init.license")
    };
}
```


----