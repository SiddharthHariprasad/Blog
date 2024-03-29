$(function () { // to do when the page loads
	// To hide the navbar list when tapped away
	$("#navbar-toggler").blur(function (event) {
		console.log("Blurred");
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#navbarSupportedContent").collapse('hide');
		}
	});

	// // In Firefox and Safari, the click event doesn't retain the focus
	// // on the clicked button. Therefore, the blur event will not fire on
	// // user clicking somewhere else in the page and the blur event handler
	// // which is set up above will not be called.
	// // Refer to issue #28 in the repo.
	// // Solution: force focus on the element that the click event fired on
	$("#navbar-toggler").click(function (event) {
		$(event.target).focus();
	});
});


(function (global) {
	var b = {};

	var indexHtml = "index.html";
	var homeHtml = "snippets/home-snippet.html";
	var articlesHtml = "snippets/article-index-snippet.html";
	var allArticlesUrl = "JSON/articles.json";
	var poemsHtml = "snippets/poem-index-snippet.html";
	var allPoemsUrl = "JSON/poems.json";
	var thoughtsHtml = "snippets/thought-index-snippet.html";
	var allThoughtsUrl = "JSON/thoughts.json";
	var quotesHtml = "snippets/quote-snippet.html";
	var allQuotesUrl = "JSON/quotes.json";
	var singleArticleHtml = "snippets/singleArticle-snippet.html";
	var singlePoemHtml = "snippets/singlePoem-snippet.html";
	var singleThoughtHtml = "snippets/singleThought-snippet.html";
	var aboutHtml = "snippets/about-snippet.html";
	var svgHtml = "snippets/socials.html";
	var articleID = "";
	var poemID = "";
	var thoughtID = "";

	// Convenience function for inserting innerHTML for 'select'
  	var insertHtml = function (selector, html) {
  	   	var targetElem = document.querySelector(selector);
    	targetElem.innerHTML = html;
  	};

  	// Show loading icon inside element identified by 'selector'.
  	var showLoading = function (selector) {
	    var html = "<div class='text-center'>";
	    html += "<img src='images/ajax-loader.gif'></div>";
	    insertHtml(selector, html);
  	};

  	// Return substitute of '{{propName}}'
  	// with propValue in given 'string'
  	var insertProperty = function (string, propName, propValue) {
    	var propToReplace = "{{" + propName + "}}";
    	string = string.replace(new RegExp(propToReplace, "g"), propValue);
    	return string;
  	}
  	
  	// Remove the class 'active' from all and switch to selected button 
  	var switchToActive = function (snippet) {
    	var classes;
    	var removeActive = function (id) {
	    // Remove 'active' from home button
	    classes = document.querySelector(id).className;
	    classes = classes.replace(new RegExp("active","g"), "");
	    document.querySelector(id).className = classes;
	    }

	    // Remove 'active' from all buttons
	    removeActive("#navHome");
	    removeActive("#navArticles");
	    removeActive("#navPoems");
	    removeActive("#navThoughts");
	    removeActive("#navQuotes");
	    removeActive("#navAbout");

	    if (snippet=="Articles") {
	      // Add 'active' to Articles button if not already there
	      classes = document.querySelector("#navArticles").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navArticles").className = classes;
	      }
	    }
	    else if (snippet=="Poems") {
	      // Add 'active' to Poems button if not already there
	      classes = document.querySelector("#navPoems").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navPoems").className = classes;
	      }
	    }
	    else if (snippet=="Thoughts") {
	      // Add 'active' to Thoughts button if not already there
	      classes = document.querySelector("#navThoughts").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navThoughts").className = classes;
	      }
	    }
	    else if (snippet=="Quotes") {
	      // Add 'active' to Quotes button if not already there
	      classes = document.querySelector("#navQuotes").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navQuotes").className = classes;
	      }
	    }
	    else if (snippet=="About") {
	      // Add 'active' to About button if not already there
	      classes = document.querySelector("#navAbout").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navAbout").className = classes;
	      }
	    }
  	};

  	var resetClassAndStyle = function () {
  		// Reseting the class names and style.display
  		document.querySelector("#left-bar").style.display = 'block';
		document.querySelector("#left-bar-bottom").style.display = 'block';
		document.querySelector("#right-bar").style.display = 'block';

		var classes;

		classes = document.querySelector('#left-bar').className;
		classes = "col-lg-2 side-bar py-4 d-none d-lg-block";
		document.querySelector('#left-bar').className = classes;

		classes = document.querySelector('#left-bar-bottom').className;
		classes = "col-lg-2 side-bar py-4 d-block d-sm-block d-lg-none";
		document.querySelector('#left-bar-bottom').className = classes;

		classes = document.querySelector('#right-bar').className;
		classes = "col-lg-2 side-bar px-auto py-4";
		document.querySelector('#right-bar').className = classes;

		classes = document.querySelector('#main-content').className;
		classes = classes.replace(new RegExp("col-lg-12","g"),"col-lg-7");
		document.querySelector('#main-content').className = classes;

  	}

	// On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function (event) {

		// On first load, show home view
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			homeHtml, 
			function (responseText) {
				document.querySelector("#main-content").innerHTML = responseText;
			},
		false);
	});

	// Load Articles Index
	b.loadArticlesIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allArticlesUrl,buildAndShowArticlesHTML);
		resetClassAndStyle();	
	};

	// Builds HTML for the Articles Index page based on the data from the server
	function buildAndShowArticlesHTML(articles) {
		// Retrive Articles Index Snippet
		$ajaxUtils.sendGetRequest(
          articlesHtml,
          function (articlesHtml) {
            // Switch CSS class active to Articles button
            switchToActive("Articles");
            var articlesViewHtml = buildArticlesViewHtml(articles,articlesHtml);
            insertHtml("#main-content", articlesViewHtml);
          },
          false);
	}

	// Using articles data and snippets html build articles view HTML to be inserted into page
	function buildArticlesViewHtml(articles,articlesHtml) {
		var finalHTML = "";

		// Loop over articles
		for (var i = 0; i < articles.length; i++) {
			// insert article values
			var html = articlesHtml;
			var article_id = articles[i].article_id;
			var article_heading = articles[i].article_heading;
			var article_info = articles[i].article_info;
			html = insertProperty(html,"article_id", article_id);
			html = insertProperty(html,"article_heading", article_heading);
			html = insertProperty(html,"article_info", article_info);
			finalHTML += html;
		}
		return finalHTML;
	}

	// Load Poems Index
	b.loadPoemsIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allPoemsUrl,buildAndShowPoemsHtml);
		resetClassAndStyle();
	};

	// Builds HTML for the Poems Index page based on the data from the server
	function buildAndShowPoemsHtml(poems) {
		// Retrive Poems Index Snippet
		$ajaxUtils.sendGetRequest(
			poemsHtml, 
			function (poemsHtml) {
			// Switch CSS class active to Poems button
			switchToActive("Poems");
			var poemsViewHtml = buildPoemsViewHtml(poems,poemsHtml);
			insertHtml("#main-content",poemsViewHtml);
		},
		false);
	}

	// Using poems data and snippets html build poems view HTML to be inserted into page
	function buildPoemsViewHtml(poems,poemsHtml) {
		var finalHTML = "";
		// Loop over Poems
		for (var i = 0; i < poems.length; i++) {
			// insert poem values
			var html = poemsHtml;
			var poem_id = poems[i].poem_id;
			var poem_heading = poems[i].poem_heading;
			var poem_info = poems[i].poem_info;
			html = insertProperty(html,"poem_id",poem_id);
			html = insertProperty(html,"poem_heading",poem_heading);
			html = insertProperty(html,"poem_info",poem_info);
			finalHTML += html;
		}
		return finalHTML;
	}

	// Load Thoughts Index
	b.loadThoughtsIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allThoughtsUrl,buildAndShowThoughtsHtml);
		resetClassAndStyle();
	};

	// Builds HTML for the Thoughts Index page based on the data from the server
	function buildAndShowThoughtsHtml(thoughts) {
		// Retrive Thoughts Index Snippet
		$ajaxUtils.sendGetRequest(
			thoughtsHtml, 
			function (thoughtsHtml) {
			// Switch CSS class active to Thoughts button
			switchToActive("Thoughts");
			var thoughtsViewHtml = buildThoughtsViewHtml(thoughts,thoughtsHtml);
			insertHtml("#main-content",thoughtsViewHtml);
		},
		false);
	}

	// Using thoughts data and snippets html build thoughts view HTML to be inserted into page
	function buildThoughtsViewHtml(thoughts,thoughtsHtml) {
		var finalHTML = "";
		// Loop over Thoughts
		for (var i = 0; i < thoughts.length; i++) {
			// insert thoughts values
			var html = thoughtsHtml;
			var thought_id = thoughts[i].thought_id;
			var thought_heading = thoughts[i].thought_heading;
			var thought_info = thoughts[i].thought_info;
			html = insertProperty(html,"thought_id",thought_id);
			html = insertProperty(html,"thought_heading",thought_heading);
			html = insertProperty(html,"thought_info",thought_info);
			finalHTML += html;
		}
		return finalHTML;
	}

	// Load Quotes
	b.loadQuotes = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allQuotesUrl,buildAndShowQuotesHtml);
		resetClassAndStyle();
	};

	// Builds HTML for the Quotes Index page based on the data from the server
	function buildAndShowQuotesHtml(quotes) {
		// Retrive Quotes Index Snippet
		$ajaxUtils.sendGetRequest(
			quotesHtml, 
			function (quotesHtml) {
			// Switch CSS class active to Quotes button
			switchToActive("Quotes");
			var quotesViewHtml = buildQuotesViewHtml(quotes,quotesHtml);
			insertHtml("#main-content",quotesViewHtml);
		},
		false);
	}

	// Using quotes data and snippets html build quotes view HTML to be inserted into page
	function buildQuotesViewHtml(quotes,quotesHtml) {
		var finalHTML = "";
		// Loop over Quotes
		for (var i = 0; i < quotes.length; i++) {
			// insert quotes values
			var html = quotesHtml;
			var quote_content = quotes[i].quote_content;
			html = insertProperty(html,"quote_content",quote_content);
			finalHTML += html;
		}
		return finalHTML;
	}


	// Load single Article
	b.loadArticle = function (aID) {
		showLoading("#main-content");
		articleID = aID;
		$ajaxUtils.sendGetRequest(allArticlesUrl,buildAndShowSingleArticleHTML);
	};

	// Builds HTML for Single Article page based on the data from the server
	function buildAndShowSingleArticleHTML(articles) {
		// Retrive Single Article Snippet
		$ajaxUtils.sendGetRequest(
			singleArticleHtml,
			function (singleArticleHtml) {
			// Switch CSS class active to Articles button
			switchToActive("Articles");
			var singleArticleViewHtml = buildSingleArticleViewHtml(articles,singleArticleHtml);
			insertHtml("#main-content",singleArticleViewHtml);
		},
		false);
	}

	// Using single article data and snippets html build single page HTML to be inserted into page
	function buildSingleArticleViewHtml(articles,singleArticleHtml) {
		var finalHTML = "";
		// Loop over the Article
		// console.log(articleID);
		for (var i = articles.length - 1; i >= 0; i--) {
			// insert article values
			if (articles[i].article_id == articleID) {
				var html = singleArticleHtml;
				var article_heading = articles[i].article_heading;
				var article_content = articles[i].article_content;
				html = insertProperty(html,"article_heading",article_heading);
				html = insertProperty(html,"article_content",article_content);
				finalHTML += html;
			}
		}
		return finalHTML;
	}

	// Load single Poem
	b.loadPoem = function (pID) {
		showLoading("#main-content");
		poemID = pID;
		$ajaxUtils.sendGetRequest(allPoemsUrl,buildAndShowSinglePoemHTML);
	};

	// Builds HTML for Single Poem page based on the data from the server
	function buildAndShowSinglePoemHTML(poems) {
		// Retrive Single Poem Snippet
		$ajaxUtils.sendGetRequest(
			singlePoemHtml,
			function (singlePoemHtml) {
			// Switch CSS class active to Poems button
			switchToActive("Poems");
			var singlePoemViewHtml = buildSinglePoemViewHtml(poems,singlePoemHtml);
			insertHtml("#main-content",singlePoemViewHtml);
		},
		false);
	}

	// Using single Poem data and snippets html build single page HTML to be inserted into page
	function buildSinglePoemViewHtml(poems,singlePoemHtml) {
		var finalHTML = "";
		// Loop over the Poem
		for (var i = poems.length - 1; i >= 0; i--) {
			if (poems[i].poem_id == poemID) {
				// insert poem values
				var html = singlePoemHtml;
				var poem_heading = poems[i].poem_heading;
				var poem_content = poems[i].poem_content;
				html = insertProperty(html,"poem_heading",poem_heading);
				html = insertProperty(html,"poem_content",poem_content);
				finalHTML += html;
			}
		}
		return finalHTML;
	}

	// Load single Thought
	b.loadThought = function (tID) {
		showLoading("#main-content");
		thoughtID = tID;
		$ajaxUtils.sendGetRequest(allThoughtsUrl,buildAndShowSingleThoughtHTML);
	};

	// Builds HTML for Single Thought page based on the data from the server
	function buildAndShowSingleThoughtHTML(thoughts) {
		// Retrive Single Thought Snippet
		$ajaxUtils.sendGetRequest(
			singleThoughtHtml,
			function (singleThoughtHtml) {
			// Switch CSS class active to Thoughts button
			switchToActive("Thoughts");
			var singleThoughtViewHtml = buildSingleThoughtViewHtml(thoughts,singleThoughtHtml);
			insertHtml("#main-content",singleThoughtViewHtml);
		},
		false);
	}

	// Using single Thought data and snippets html build single page HTML to be inserted into page
	function buildSingleThoughtViewHtml(thoughts,singleThoughtHtml) {
		var finalHTML = "";
		// Loop over the Poem
		for (var i = thoughts.length - 1; i >= 0; i--) {
			if (thoughts[i].thought_id == thoughtID) {
				// insert poem values
				var html = singleThoughtHtml;
				var thought_heading = thoughts[i].thought_heading;
				var thought_content = thoughts[i].thought_content;
				html = insertProperty(html,"thought_heading",thought_heading);
				html = insertProperty(html,"thought_content",thought_content);
				finalHTML += html;
			}
		}
		return finalHTML;
	}

	// Load About Page
	b.loadAbout = function () {
		document.querySelector("#left-bar").style.display = 'none';
		document.querySelector("#left-bar-bottom").style.display = 'none';
		document.querySelector("#right-bar").style.display = 'none';
		document.querySelector("#hr-1").style.display = 'none';
		document.querySelector("#hr-2").style.display = 'none';
		showLoading("#main-content");		
		$ajaxUtils.sendGetRequest(
			aboutHtml, 
			function (responseText) {
				// document.querySelector("#main-container aside").innerHTML = "";
				document.querySelector("#main-content").innerHTML = responseText;
				// Switch CSS class active to About button
				switchToActive("About");
			},
		false);

		$ajaxUtils.sendGetRequest(
			svgHtml, 
			function (responseText) {
				document.querySelector("#socials").innerHTML = responseText;
			},
		false);

		var classes;
		classes = document.querySelector('#left-bar').className;
		classes = "";
		document.querySelector('#left-bar').className = classes;

		classes = document.querySelector('#left-bar-bottom').className;
		classes = "";
		document.querySelector('#left-bar-bottom').className = classes;

		classes = document.querySelector('#hr-1').className;
		classes = "";
		document.querySelector('#hr-1').className = classes;

		classes = document.querySelector('#hr-2').className;
		classes = "";
		document.querySelector('#hr-2').className = classes;

		classes = document.querySelector('#main-content').className;
		classes = classes.replace(new RegExp("col-lg-7","g"),"col-lg-12");
		document.querySelector('#main-content').className = classes;
	}

  	global.$b = b;
})(window);