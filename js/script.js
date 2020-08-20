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

	var homeHtml = "snippets/home-snippet.html";
	var articlesHtml = "snippets/article-index-snippet.html";
	var allArticlesUrl = "JSON/articles.json"
	var poemsHtml = "snippets/poem-index-snippet.html";
	var allPoemsUrl = "JSON/poems.json"
	var thoughtsHtml = "snippets/thought-index-snippet.html";
	var allThoughtsUrl = "JSON/thoughts.json"
	var quotesHtml = "snippets/quote-snippet.html";
	var allQuotesUrl = "JSON/quotes.json";
	var singleArticleHtml = "snippets/singleArticle-snippet.html";
	var articleUrl = "";
	var singlePoemHtml = "snippets/singlePoem-snippet.html";
	var poemUrl = "";
	var singleThoughtHtml = "snippets/singleThought-snippet.html";
	var thoughtUrl = "";
	var aboutHtml = "snippets/about-snippet.html";

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

	    if (snippet=="Articles") {
	      // Add 'active' to menu button if not already there
	      classes = document.querySelector("#navArticles").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navArticles").className = classes;
	      }
	    }
	    else if (snippet=="Poems") {
	      // Add 'active' to about button if not already there
	      classes = document.querySelector("#navPoems").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navPoems").className = classes;
	      }
	    }
	    else if (snippet=="Thoughts") {
	      // Add 'active' to awards button if not already there
	      classes = document.querySelector("#navThoughts").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navThoughts").className = classes;
	      }
	    }
	    else if (snippet=="Quotes") {
	      // Add 'active' to awards button if not already there
	      classes = document.querySelector("#navQuotes").className;
	      if (classes.indexOf("active") == -1) {
	        classes += " active";
	        document.querySelector("#navQuotes").className = classes;
	      }
	    }
  	};

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
			var article_url = articles[i].article_url;
			var article_heading = articles[i].article_heading;
			var article_info = articles[i].article_info;
			html = insertProperty(html,"article_url", article_url);
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
			var poem_url = poems[i].poem_url;
			var poem_heading = poems[i].poem_heading;
			var poem_info = poems[i].poem_info;
			html = insertProperty(html,"poem_url",poem_url);
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
			var thought_url = thoughts[i].thought_url;
			var thought_heading = thoughts[i].thought_heading;
			var thought_info = thoughts[i].thought_info;
			html = insertProperty(html,"thought_url",thought_url);
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
			var quote_heading = quotes[i].quote_heading;
			var quote_content = quotes[i].quote_content;
			html = insertProperty(html,"quote_heading",quote_heading);
			html = insertProperty(html,"quote_content",quote_content);
			finalHTML += html;
		}
		return finalHTML;
	}


	// Load single Article
	b.loadArticle = function (articleUrl) {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(articleUrl,buildAndShowSingleArticleHTML);
	};

	// Builds HTML for Single Article page based on the data from the server
	function buildAndShowSingleArticleHTML(article) {
		// Retrive Single Article Snippet
		$ajaxUtils.sendGetRequest(
			singleArticleHtml,
			function (singleArticleHtml) {
			// Switch CSS class active to Articles button
			switchToActive("Articles");
			var singleArticleViewHtml = buildSingleArticleViewHtml(article,singleArticleHtml);
			insertHtml("#main-content",singleArticleViewHtml);
		},
		false);
	}

	// Usingsingle article data and snippets html build single page HTML to be inserted into page
	function buildSingleArticleViewHtml(article,singleArticleHtml) {
		var finalHTML = "";
		// Loop over the Article
		for (var i = article.length - 1; i >= 0; i--) {
			// insert article values
			var html = singleArticleHtml;
			var article_heading = article[i].article_heading;
			var article_content = article[i].article_content;
			html = insertProperty(html,"article_heading",article_heading);
			html = insertProperty(html,"article_content",article_content);
			finalHTML += html;
		}
		return finalHTML;
	}

	// Load single Poem
	b.loadPoem = function (poemUrl) {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(poemUrl,buildAndShowSinglePoemHTML);
	};

	// Builds HTML for Single Poem page based on the data from the server
	function buildAndShowSinglePoemHTML(poem) {
		// Retrive Single Poem Snippet
		$ajaxUtils.sendGetRequest(
			singlePoemHtml,
			function (singlePoemHtml) {
			// Switch CSS class active to Poems button
			switchToActive("Poems");
			var singlePoemViewHtml = buildSinglePoemViewHtml(poem,singlePoemHtml);
			insertHtml("#main-content",singlePoemViewHtml);
		},
		false);
	}

	// Usingsingle Poem data and snippets html build single page HTML to be inserted into page
	function buildSinglePoemViewHtml(poem,singlePoemHtml) {
		var finalHTML = "";
		// Loop over the Poem
		for (var i = poem.length - 1; i >= 0; i--) {
			// insert poem values
			var html = singlePoemHtml;
			var poem_heading = poem[i].poem_heading;
			var poem_content = poem[i].poem_content;
			html = insertProperty(html,"poem_heading",poem_heading);
			html = insertProperty(html,"poem_content",poem_content);
			finalHTML += html;
		}
		return finalHTML;
	}

	// Load single Thought
	b.loadThought = function (thoughtUrl) {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(thoughtUrl,buildAndShowSingleThoughtHTML);
	};

	// Builds HTML for Single Thought page based on the data from the server
	function buildAndShowSingleThoughtHTML(thought) {
		// Retrive Single Thought Snippet
		$ajaxUtils.sendGetRequest(
			singleThoughtHtml,
			function (singleThoughtHtml) {
			// Switch CSS class active to Thoughts button
			switchToActive("Thoughts");
			var singleThoughtViewHtml = buildSingleThoughtViewHtml(thought,singleThoughtHtml);
			insertHtml("#main-content",singleThoughtViewHtml);
		},
		false);
	}

	// Usingsingle Thought data and snippets html build single page HTML to be inserted into page
	function buildSingleThoughtViewHtml(thought,singleThoughtHtml) {
		var finalHTML = "";
		// Loop over the Poem
		for (var i = thought.length - 1; i >= 0; i--) {
			// insert poem values
			var html = singleThoughtHtml;
			var thought_heading = thought[i].thought_heading;
			var thought_content = thought[i].thought_content;
			html = insertProperty(html,"thought_heading",thought_heading);
			html = insertProperty(html,"thought_content",thought_content);
			finalHTML += html;
		}
		return finalHTML;
	}

	// On first load, show home view
	b.loadAbout = function () {
		showLoading("#main-container");
		$ajaxUtils.sendGetRequest(
			aboutHtml, 
			function (responseText) {
				document.querySelector("#main-container").innerHTML = responseText;
			},
		false);
	}

	// SVG Loader
	b.loadSVG = function (icon) {
		// body...
		var spanID = "#" + icon + "-icon";
		var spanHtml = "";
		// console.log("Called" + icon);
		switch(icon) {
			case 'instagram': 
				spanHtml = '<svg viewBox="0 0 2476 2476" class="bi bi-instagram social-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M825.4 1238c0-227.9 184.7-412.7 412.6-412.7 227.9 0 412.7 184.8 412.7 412.7 0 227.9-184.8 412.7-412.7 412.7-227.9 0-412.6-184.8-412.6-412.7m-223.1 0c0 351.1 284.6 635.7 635.7 635.7s635.7-284.6 635.7-635.7-284.6-635.7-635.7-635.7S602.3 886.9 602.3 1238m1148-660.9c0 82 66.5 148.6 148.6 148.6 82 0 148.6-66.6 148.6-148.6s-66.5-148.5-148.6-148.5-148.6 66.5-148.6 148.5M737.8 2245.7c-120.7-5.5-186.3-25.6-229.9-42.6-57.8-22.5-99-49.3-142.4-92.6-43.3-43.3-70.2-84.5-92.6-142.3-17-43.6-37.1-109.2-42.6-229.9-6-130.5-7.2-169.7-7.2-500.3s1.3-369.7 7.2-500.3c5.5-120.7 25.7-186.2 42.6-229.9 22.5-57.8 49.3-99 92.6-142.4 43.3-43.3 84.5-70.2 142.4-92.6 43.6-17 109.2-37.1 229.9-42.6 130.5-6 169.7-7.2 500.2-7.2 330.6 0 369.7 1.3 500.3 7.2 120.7 5.5 186.2 25.7 229.9 42.6 57.8 22.4 99 49.3 142.4 92.6 43.3 43.3 70.1 84.6 92.6 142.4 17 43.6 37.1 109.2 42.6 229.9 6 130.6 7.2 169.7 7.2 500.3 0 330.5-1.2 369.7-7.2 500.3-5.5 120.7-25.7 186.3-42.6 229.9-22.5 57.8-49.3 99-92.6 142.3-43.3 43.3-84.6 70.1-142.4 92.6-43.6 17-109.2 37.1-229.9 42.6-130.5 6-169.7 7.2-500.3 7.2-330.5 0-369.7-1.2-500.2-7.2M727.6 7.5c-131.8 6-221.8 26.9-300.5 57.5-81.4 31.6-150.4 74-219.3 142.8C139 276.6 96.6 345.6 65 427.1 34.4 505.8 13.5 595.8 7.5 727.6 1.4 859.6 0 901.8 0 1238s1.4 378.4 7.5 510.4c6 131.8 26.9 221.8 57.5 300.5 31.6 81.4 73.9 150.5 142.8 219.3 68.8 68.8 137.8 111.1 219.3 142.8 78.8 30.6 168.7 51.5 300.5 57.5 132.1 6 174.2 7.5 510.4 7.5 336.3 0 378.4-1.4 510.4-7.5 131.8-6 221.8-26.9 300.5-57.5 81.4-31.7 150.4-74 219.3-142.8 68.8-68.8 111.1-137.9 142.8-219.3 30.6-78.7 51.6-168.7 57.5-300.5 6-132.1 7.4-174.2 7.4-510.4s-1.4-378.4-7.4-510.4c-6-131.8-26.9-221.8-57.5-300.5-31.7-81.4-74-150.4-142.8-219.3C2199.4 139 2130.3 96.6 2049 65c-78.8-30.6-168.8-51.6-300.5-57.5-132-6-174.2-7.5-510.4-7.5-336.3 0-378.4 1.4-510.5 7.5"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'facebook': 
				spanHtml = '<svg viewBox="88.428 12.828 107.543 207.085" class="bi bi-facebook social-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'whatsapp': 
				spanHtml = '<svg viewBox="0 0 737.509 740.824" class="bi bi-whatsapp social-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M630.056 107.658C560.727 38.271 468.525.039 370.294 0 167.891 0 3.16 164.668 3.079 367.072c-.027 64.699 16.883 127.855 49.016 183.523L0 740.824l194.666-51.047c53.634 29.244 114.022 44.656 175.481 44.682h.151c202.382 0 367.128-164.689 367.21-367.094.039-98.088-38.121-190.32-107.452-259.707m-259.758 564.8h-.125c-54.766-.021-108.483-14.729-155.343-42.529l-11.146-6.613-115.516 30.293 30.834-112.592-7.258-11.543c-30.552-48.58-46.689-104.729-46.665-162.379C65.146 198.865 202.065 62 370.419 62c81.521.031 158.154 31.81 215.779 89.482s89.342 134.332 89.311 215.859c-.07 168.242-136.987 305.117-305.211 305.117m167.415-228.514c-9.176-4.591-54.286-26.782-62.697-29.843-8.41-3.061-14.526-4.591-20.644 4.592-6.116 9.182-23.7 29.843-29.054 35.964-5.351 6.122-10.703 6.888-19.879 2.296-9.175-4.591-38.739-14.276-73.786-45.526-27.275-24.32-45.691-54.36-51.043-63.542-5.352-9.183-.569-14.148 4.024-18.72 4.127-4.11 9.175-10.713 13.763-16.07 4.587-5.356 6.116-9.182 9.174-15.303 3.059-6.122 1.53-11.479-.764-16.07-2.294-4.591-20.643-49.739-28.29-68.104-7.447-17.886-15.012-15.466-20.644-15.746-5.346-.266-11.469-.323-17.585-.323-6.117 0-16.057 2.296-24.468 11.478-8.41 9.183-32.112 31.374-32.112 76.521s32.877 88.763 37.465 94.885c4.587 6.122 64.699 98.771 156.741 138.502 21.891 9.45 38.982 15.093 52.307 19.323 21.981 6.979 41.983 5.994 57.793 3.633 17.628-2.633 54.285-22.19 61.932-43.616 7.646-21.426 7.646-39.791 5.352-43.617-2.293-3.826-8.41-6.122-17.585-10.714"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'gmail': 
				spanHtml = '<svg overflow="scroll" viewBox="7.592 13.58 48.54 36.42" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"><linearGradient id="a" gradientUnits="userSpaceOnUse" x1="14.001" x2="32" y1="30.744" y2="30.744"><stop offset="0" stop-color="#c8c8c8"/><stop offset="1" stop-color="#cdcdcd"/></linearGradient><linearGradient id="b" gradientUnits="userSpaceOnUse" x1="28.665" x2="50" y1="36.447" y2="36.447"><stop offset="0" stop-color="#d9d9d9"/><stop offset="1" stop-color="#e2e2e2"/></linearGradient><path stroke="#ffffff" stroke-width=".5" d="M53 50H11a3 3 0 01-3-3V17a3 3 0 013-3h42a3 3 0 013 3v30a3 3 0 01-3 3z" /><path stroke="#ffffff" stroke-width=".5" d="M14 50h-3a3 3 0 01-3-3V17a3 3 0 116 0z" /><path stroke="#ffffff" stroke-width=".5" d="M50 50h3a3 3 0 003-3V17a3 3 0 10-6 0z" /><path stroke="#ffffff" stroke-width=".5" d="M54.718 19.46a3 3 0 10-3.436-4.92l-19.28 14.037-.002.001-.002-.001-19.28-14.037a3 3 0 00-3.436 4.92l-.08-.059L32 36m22.799-16.599L32 36" /><path stroke="#ffffff" stroke-width=".5" d="M53 14c-.639 0-1.232.2-1.718.54l-19.28 14.037-.002.001-.002-.001-19.28-14.037A2.988 2.988 0 0011 14z"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'linkedin': 
				spanHtml = '<svg viewBox="0 5 1036 990" class="bi bi-linkedin social-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'twitter': 
				spanHtml = '<svg viewBox="-.25 -.25 1109.5 901.5" class="bi bi-twitter social-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" stroke="#5da8dc" stroke-width=".5" d="M741 .2V0h52l19 3.8c12.667 2.467 24.167 5.7 34.5 9.7 10.334 4 20.334 8.667 30 14 9.667 5.333 18.434 10.767 26.301 16.3 7.8 5.467 14.8 11.267 21 17.4C929.933 67.4 939.5 69 952.5 66s27-7.167 42-12.5 29.834-11.333 44.5-18c14.667-6.667 23.601-10.9 26.801-12.7 3.133-1.866 4.8-2.866 5-3l.199-.3 1-.5 1-.5 1-.5 1-.5.2-.3.3-.2.301-.2.199-.3 1-.3 1-.2-.199 1.5-.301 1.5-.5 1.5-.5 1.5-.5 1-.5 1-.5 1.5c-.333 1-.666 2.333-1 4-.333 1.667-3.5 8.333-9.5 20S1051 73 1042 85s-17.066 21.066-24.199 27.2c-7.2 6.2-11.967 10.533-14.301 13-2.333 2.533-5.166 4.866-8.5 7l-5 3.3-1 .5-1 .5-.199.3-.301.2-.3.2-.2.3-1 .5-1 .5-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.3.2-.2.3h5l28-6c18.667-4 36.5-8.833 53.5-14.5l27-9 3-1 1.5-.5 1-.5 1-.5 1-.5 1-.5 2-.3 2-.2v2l-.5.2-.5.3-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.3.2-.2.3-.199.3-.301.2-.5 1-.5 1-.3.2c-.133.2-4.366 5.866-12.7 17-8.333 11.2-12.833 16.866-13.5 17-.666.2-1.6 1.2-2.8 3-1.133 1.866-8.2 9.3-21.2 22.3s-25.732 24.566-38.199 34.7c-12.533 10.2-18.867 22.733-19 37.6-.2 14.8-.967 31.534-2.301 50.2-1.333 18.667-3.833 38.833-7.5 60.5-3.666 21.667-9.333 46.167-17 73.5-7.666 27.333-17 54-28 80s-22.5 49.333-34.5 70-23 38.167-33 52.5-20.166 27.833-30.5 40.5c-10.333 12.667-23.399 26.934-39.199 42.8-15.867 15.8-24.533 24.467-26 26-1.533 1.467-8.066 6.934-19.601 16.4-11.466 9.533-23.8 19.066-37 28.6-13.133 9.467-25.2 17.367-36.2 23.7s-24.266 13.566-39.8 21.7C630.734 840.4 614 848 596 855s-37 13.5-57 19.5-39.333 10.667-58 14c-18.666 3.333-39.833 6.167-63.5 8.5l-35.5 3.5v.5h-65v-.5l-8.5-.5c-5.666-.333-10.333-.667-14-1-3.666-.333-17.5-2.167-41.5-5.5s-42.833-6.667-56.5-10c-13.666-3.333-34-9.667-61-19s-50.1-18.767-69.3-28.3c-19.133-9.467-31.133-15.467-36-18-4.8-2.467-10.2-5.533-16.2-9.2l-9-5.5-.199-.3-.301-.2-.3-.2-.2-.3-1-.5-1-.5-.199-.3-.301-.2-.3-.2-.2-.3-.199-.3L.5 800H0v-2l1 .2 1 .3 4.5.5c3 .333 11.167.833 24.5 1.5 13.334.667 27.5.667 42.5 0s30.334-2.167 46-4.5c15.667-2.333 34.167-6.333 55.5-12 21.334-5.667 40.934-12.4 58.801-20.2 17.8-7.866 30.466-13.733 38-17.6 7.466-3.8 18.866-10.867 34.199-21.2l23-15.5.2-.3.3-.2.301-.2.199-.3.2-.3.3-.2.301-.2.199-.3 1-.3 1-.2.2-1 .3-1 .301-.2.199-.3-8-.5c-5.333-.333-10.5-.667-15.5-1s-12.833-1.833-23.5-4.5c-10.666-2.667-22.166-6.667-34.5-12-12.333-5.333-24.333-11.667-36-19-11.666-7.333-20.1-13.434-25.3-18.3-5.133-4.801-11.8-11.6-20-20.4-8.133-8.866-15.2-17.967-21.2-27.3s-11.733-20.101-17.199-32.3L124.5 551l-.5-1.5-.5-1.5-.3-1-.2-1 1.5.2 1.5.3 11 1.5c7.334 1 18.834 1.333 34.5 1 15.667-.333 26.5-1 32.5-2s9.667-1.667 11-2l2-.5 2.5-.5 2.5-.5.2-.3.3-.2.301-.2.199-.3-2-.5-2-.5-2-.5-2-.5-2-.5c-1.333-.333-3.666-1-7-2-3.333-1-12.333-4.667-27-11-14.666-6.333-26.333-12.5-35-18.5a241.7 241.7 0 0 1-24.8-19.7c-7.8-7.2-16.366-16.467-25.7-27.8-9.333-11.333-17.666-24.5-25-39.5-7.333-15-12.833-29.333-16.5-43a232.143 232.143 0 0 1-7.199-41.5L43 316l1 .2 1 .3 1 .5 1 .5 1 .5 1 .5 15.5 7c10.334 4.667 23.167 8.667 38.5 12 15.334 3.333 24.5 5.167 27.5 5.5l4.5.5h9l-.199-.3-.301-.2-.3-.2-.2-.3-.199-.3-.301-.2-.3-.2-.2-.3-1-.5-1-.5-.199-.3-.301-.2-.3-.2-.2-.3-1-.5-1-.5-.199-.3c-.2-.134-3.067-2.267-8.601-6.4-5.467-4.2-11.2-9.633-17.2-16.3s-12-13.667-18-21A162.158 162.158 0 0 1 77 271c-4.666-8.333-9.6-18.934-14.8-31.8-5.133-12.8-9.033-25.7-11.7-38.7-2.666-13-4.166-25.833-4.5-38.5-.333-12.667 0-23.5 1-32.5s3-19.167 6-30.5 7.334-23.333 13-36l8.5-19 .5-1.5.5-1.5.301-.2.199-.3.2-.3.3-.2.301.2.199.3.2.3.3.2.301.2.199.3.2.3.3.2.5 1 .5 1 .301.2.199.3 13.5 15c9 10 19.667 21.167 32 33.5 12.334 12.333 19.167 18.733 20.5 19.2 1.334.533 3 2.066 5 4.6 2 2.467 8.667 8.367 20 17.7 11.334 9.333 26.167 20.167 44.5 32.5 18.334 12.333 38.667 24.5 61 36.5 22.334 12 46.334 22.833 72 32.5 25.667 9.667 43.667 16 54 19 10.334 3 28 6.833 53 11.5s43.834 7.667 56.5 9c12.667 1.333 21.334 2.1 26 2.3l7 .2-.199-1.5-.301-1.5-2-12.5c-1.333-8.333-2-20-2-35s1.167-28.833 3.5-41.5c2.334-12.667 5.834-25.5 10.5-38.5 4.667-13 9.234-23.434 13.7-31.3 4.534-7.8 10.467-16.7 17.8-26.7 7.334-10 16.834-20.333 28.5-31 11.667-10.667 25-20.167 40-28.5s28.834-14.667 41.5-19c12.667-4.333 23.334-7.167 32-8.5 8.667-1.333 13-2.1 13-2.3z"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'telegram': 
				spanHtml = '<svg viewBox="0 0 240 240" class="bi bi-telegram social-icons" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path stroke="#ffffff" stroke-width=".5" d="M98 175c-3.9 0-3.2-1.5-4.6-5.2L82 132.2 152.8 88l8.3 2.2-6.9 18.8L98 175z"/><path stroke="#ffffff" stroke-width=".5" d="M98 175c3 0 4.3-1.4 6-3 2.6-2.5 36-35 36-35l-20.5-5-19 12-2.5 30v1z"/><path stroke="#ffffff" stroke-width=".5" d="M100 144.4l48.4 35.7c5.5 3 9.5 1.5 10.9-5.1L179 82.2c2-8.1-3.1-11.7-8.4-9.3L55 117.5c-7.9 3.2-7.8 7.6-1.4 9.5l29.7 9.3L152 93c3.2-2 6.2-.9 3.8 1.3L100 144.4z"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'phone': 
				spanHtml = '<svg class="bi social-icons" fill="currentColor"><use xlink:href="/icons-main/bootstrap-icons.svg#telephone-fill"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			case 'message': 
				spanHtml = '<svg class="bi social-icons" fill="currentColor"><use xlink:href="/icons-main/bootstrap-icons.svg#chat-dots-fill"/></svg>';
				insertHtml(spanID,spanHtml);
				break;
			default: console.log("Error");
		} 
	}

  	global.$b = b;
})(window);