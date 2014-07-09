# E4X Here Document

---

# E4X is ヒアドキュメント?

	var string = <>
		<div>
			<p> 便利 </p>
		</div>
	</>

# E4X is XML


	var string = String(<>
		<div>
			<p> 便利 </p>
		</div>
	</>);
	
Firefox 4 - E4X Wrap Object

* [609143 – E4X XML objects cannot be passed to sandbox](https://bugzilla.mozilla.org/show_bug.cgi?id=609143 "609143 – E4X XML objects cannot be passed to sandbox")


# Comments is ヒアドキュメント?

	function (){
	/*
		<div>
			<p> 便利? </p>
		</div>
	*/
	}.toString(); //=> contain comment


[![browser support](http://ci.testling.com/azu/function-contain-comment.png)](http://ci.testling.com/azu/function-contain-comment)


* [azu/function-contain-comment · GitHub](https://github.com/azu/function-contain-comment "azu/function-contain-comment · GitHub")

