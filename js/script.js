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

		// $b.loadArticlesIndex();
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
            // Switch CSS class active to menu button
            switchToActive("Articles");
            var articlesViewHtml =
              buildArticlesViewHtml(articles,articlesHtml);
            insertHtml("#main-content", articlesViewHtml);
          },
          false);
	}

	// Using articles data and snippets html build categories view HTML to be inserted into page
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


  	global.$b = b;
})(window);