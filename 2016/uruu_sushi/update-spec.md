# Security Update of Spec

----

# 自己紹介

![アイコン right](https://github.com/azu.png)

- Name : **azu**
- Twitter : @[azu_re](https://twitter.com/azu_re)
- Website: [Web scratch], [JSer.info]

[Web scratch]: http://efcl.info/ "Web scratch"
[JSer.info]: http://jser.info/ "JSer.info"



-----

# `Object.prototype.` hijack

- [How should browsers mitigate Proxy-related security issues? · Issue #272 · tc39/ecma262 | ECMAScript Daily](http://ecmascript-daily.github.io/2015/12/26/how-should-browsers-mitigate-proxy-related-security-issues-issue-272-tc39-ecma262 "How should browsers mitigate Proxy-related security issues? · Issue #272 · tc39/ecma262 | ECMAScript Daily")


-----

```html
<script>
window.__proto__ = Proxy.create({
    get: function(target, name) {
	    console.log("data=" + name)
	}
});
</script>
<script src="http://victim/test.csv"></script>
```

POC on Chrome(`chrome://flags/#enable-javascript-harmony`)

----

# Changed in ES2016 Draft 2016-02-15

> `Object.prototype` is an immutable prototype exotic object.   
> -- [Release ES2016 Draft 2016-02-15 · tc39/ecma262](https://github.com/tc39/ecma262/releases/tag/es2016-draft-20160215 "Release ES2016 Draft 2016-02-15 · tc39/ecma262")


-----

# WHATWG HTML define Window

- [Define security around Window, WindowProxy, and Location properly · whatwg/html@acae3df](https://github.com/whatwg/html/commit/acae3df652b382e9f4f1d1b4dc7e08e2b00df821 "Define security around Window, WindowProxy, and Location properly · whatwg/html@acae3df")

-----


> This is a relative large change to the way Window, WindowProxy, and Location objects work, at least
from a standards perspective. This should more closely match implementations and define all their
relevant security details.

- 現実に合わせた仕様の変更


-----