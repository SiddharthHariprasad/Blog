$(function () {
    // to do when the page loads
    // To hide the navbar list when tapped away
    $("#navbar-toggler").blur(function (event) {
        console.log("Blurred");
        let screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#navbarSupportedContent").collapse("hide");
        }
    });

    // In Firefox and Safari, the click event doesn't retain the focus
    // on the clicked button. Therefore, the blur event will not fire on
    // user clicking somewhere else in the page and the blur event handler
    // which is set up above will not be called.
    // Refer to issue #28 in the repo.
    // Solution: force focus on the element that the click event fired on
    $("#navbar-toggler").click(function (event) {
        $(event.target).focus();
    });

    setCopyrightDate();
});
function setCopyrightDate() {
    const d = new Date();
    let year = document.getElementById("copyright-year");
    year.innerText = d.getFullYear();
}

(function (global) {
    let b = {};

    let indexHtml = "index.html";
    let homeHtml = "snippets/home-snippet.html";
    let articlesHtml = "snippets/article-index-snippet.html";
    let allArticlesUrl = "JSON/articles.json";
    let reviewsHtml = "snippets/review-index-snippet.html";
    let allReviewsUrl = "JSON/reviews.json";
    let poemsHtml = "snippets/poem-index-snippet.html";
    let allPoemsUrl = "JSON/poems.json";
    let thoughtsHtml = "snippets/thought-index-snippet.html";
    let allThoughtsUrl = "JSON/thoughts.json";
    let quotesHtml = "snippets/quote-snippet.html";
    let allQuotesUrl = "JSON/quotes.json";
    let singleArticleHtml = "snippets/singleArticle-snippet.html";
    let singlePoemHtml = "snippets/singlePoem-snippet.html";
    let singleThoughtHtml = "snippets/singleThought-snippet.html";
    let singleReviewHtml = "snippets/singleReview-snippet.html";
    let aboutHtml = "snippets/about-snippet.html";
    let svgHtml = "snippets/socials.html";
    let articleID = "";
    let poemID = "";
    let thoughtID = "";
    let reviewID = "";

    // Convenience function for inserting innerHTML for 'select'
    let insertHtml = function (selector, html) {
        let targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
    let showLoading = function (selector) {
        let html = "<div class='text-center'>";
        html += "<img src='images/ajax-loader.gif'></div>";
        insertHtml(selector, html);
    };

    // Return substitute of '{{propName}}'
    // with propValue in given 'string'
    let insertProperty = function (string, propName, propValue) {
        let propToReplace = "{{" + propName + "}}";
        string = string.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    };

    // Remove the class 'active' from all and switch to selected button
    let switchToActive = function (snippet) {
        let classes;
        let removeActive = function (id) {
            // Remove 'active' from home button
            classes = document.querySelector(id).className;
            classes = classes.replace(new RegExp("active", "g"), "");
            document.querySelector(id).className = classes;
        };

        // Remove 'active' from all buttons
        removeActive("#navHome");
        removeActive("#navArticles");
        removeActive("#navPoems");
        removeActive("#navThoughts");
        removeActive("#navQuotes");
        removeActive("#navAbout");
        removeActive("#navReviews");

        if (snippet == "Articles") {
            // Add 'active' to Articles button if not already there
            classes = document.querySelector("#navArticles").className;
            if (classes.indexOf("active") == -1) {
                classes += " active";
                document.querySelector("#navArticles").className = classes;
            }
        } else if (snippet == "Poems") {
            // Add 'active' to Poems button if not already there
            classes = document.querySelector("#navPoems").className;
            if (classes.indexOf("active") == -1) {
                classes += " active";
                document.querySelector("#navPoems").className = classes;
            }
        } else if (snippet == "Thoughts") {
            // Add 'active' to Thoughts button if not already there
            classes = document.querySelector("#navThoughts").className;
            if (classes.indexOf("active") == -1) {
                classes += " active";
                document.querySelector("#navThoughts").className = classes;
            }
        } else if (snippet == "Quotes") {
            // Add 'active' to Quotes button if not already there
            classes = document.querySelector("#navQuotes").className;
            if (classes.indexOf("active") == -1) {
                classes += " active";
                document.querySelector("#navQuotes").className = classes;
            }
        } else if (snippet == "About") {
            // Add 'active' to About button if not already there
            classes = document.querySelector("#navAbout").className;
            if (classes.indexOf("active") == -1) {
                classes += " active";
                document.querySelector("#navAbout").className = classes;
            }
        } else if (snippet == "Reviews") {
            //Ass 'active' to Reviews button if not already there
            classes = document.querySelector("#navReviews").className;
            if (classes.indexOf("active") == -1) {
                classes += " active";
                document.querySelector("#navReviews").className = classes;
            }
        }
    };

    let resetClassAndStyle = function () {
        // Resetting the class names and style.display
        let classes;

        classes = document.querySelector("#main-content").className;
        classes = classes.replace(new RegExp("col-lg-12", "g"), "col-lg-7");
        document.querySelector("#main-content").className = classes;
    };

    // On page load (before images or CSS)
    document.addEventListener("DOMContentLoaded", function (event) {
        // On first load, show home view
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            homeHtml,
            function (responseText) {
                document.querySelector("#main-content").innerHTML =
                    responseText;
            },
            false
        );
    });

    // Load Reviews Index
    b.loadReviewsIndex = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allReviewsUrl, buildAndShowReviewsHTML);
        resetClassAndStyle();
    };

    // Builds HTML for the Articles Index page based on the data from the server
    function buildAndShowReviewsHTML(reviews) {
        // Retrieve Reviews Index Snippet
        $ajaxUtils.sendGetRequest(
            reviewsHtml,
            function (reviewsHtml) {
                // Switch CSS class active to Reviews button
                switchToActive("Reviews");
                let reviewsViewHtml = buildReviewsViewHtml(
                    reviews,
                    reviewsHtml
                );
                insertHtml("#main-content", reviewsViewHtml);
            },
            false
        );
    }

    // Using reviews data and snippets html build articles view HTML to be inserted into page
    function buildReviewsViewHtml(reviews, reviewsHtml) {
        let finalHTML = "";

        // Loop over articles
        for (let i = reviews.length - 1; i >= 0; i--) {
            // insert article values
            let html = reviewsHtml;
            let review_id = reviews[i].review_id;
            let movie_name = reviews[i].movie_name;
            let rating = reviews[i].rating;
            html = insertProperty(html, "review_id", review_id);
            html = insertProperty(html, "movie_name", movie_name);
            html = insertProperty(html, "rating", rating);
            finalHTML += html;
        }
        return finalHTML;
    }

    // Load Articles Index
    b.loadArticlesIndex = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allArticlesUrl, buildAndShowArticlesHTML);
        resetClassAndStyle();
    };

    // Builds HTML for the Articles Index page based on the data from the server
    function buildAndShowArticlesHTML(articles) {
        // Retrieve Articles Index Snippet
        $ajaxUtils.sendGetRequest(
            articlesHtml,
            function (articlesHtml) {
                // Switch CSS class active to Articles button
                switchToActive("Articles");
                let articlesViewHtml = buildArticlesViewHtml(
                    articles,
                    articlesHtml
                );
                insertHtml("#main-content", articlesViewHtml);
            },
            false
        );
    }

    // Using articles data and snippets html build articles view HTML to be inserted into page
    function buildArticlesViewHtml(articles, articlesHtml) {
        let finalHTML = "";

        // Loop over articles
        for (let i = articles.length - 1; i >= 0; i--) {
            // insert article values
            let html = articlesHtml;
            let article_id = articles[i].article_id;
            let article_heading = articles[i].article_heading;
            let article_info = articles[i].article_info;
            html = insertProperty(html, "article_id", article_id);
            html = insertProperty(html, "article_heading", article_heading);
            html = insertProperty(html, "article_info", article_info);
            finalHTML += html;
        }
        return finalHTML;
    }

    // Load Poems Index
    b.loadPoemsIndex = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allPoemsUrl, buildAndShowPoemsHtml);
        resetClassAndStyle();
    };

    // Builds HTML for the Poems Index page based on the data from the server
    function buildAndShowPoemsHtml(poems) {
        // Retrieve Poems Index Snippet
        $ajaxUtils.sendGetRequest(
            poemsHtml,
            function (poemsHtml) {
                // Switch CSS class active to Poems button
                switchToActive("Poems");
                let poemsViewHtml = buildPoemsViewHtml(poems, poemsHtml);
                insertHtml("#main-content", poemsViewHtml);
            },
            false
        );
    }

    // Using poems data and snippets html build poems view HTML to be inserted into page
    function buildPoemsViewHtml(poems, poemsHtml) {
        let finalHTML = "";

        // Loop over Poems
        // for (let i = 0; i < poems.length; i++) {
        for (let i = poems.length - 1; i >= 0; i--) {
            // insert poem values
            let html = poemsHtml;
            let poem_id = poems[i].poem_id;
            let poem_heading = poems[i].poem_heading;
            let poem_info = poems[i].poem_info;
            html = insertProperty(html, "poem_id", poem_id);
            html = insertProperty(html, "poem_heading", poem_heading);
            html = insertProperty(html, "poem_info", poem_info);
            finalHTML += html;
        }
        return finalHTML;
    }

    // Load Thoughts Index
    b.loadThoughtsIndex = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allThoughtsUrl, buildAndShowThoughtsHtml);
        resetClassAndStyle();
    };

    // Builds HTML for the Thoughts Index page based on the data from the server
    function buildAndShowThoughtsHtml(thoughts) {
        // Retrieve Thoughts Index Snippet
        $ajaxUtils.sendGetRequest(
            thoughtsHtml,
            function (thoughtsHtml) {
                // Switch CSS class active to Thoughts button
                switchToActive("Thoughts");
                let thoughtsViewHtml = buildThoughtsViewHtml(
                    thoughts,
                    thoughtsHtml
                );
                insertHtml("#main-content", thoughtsViewHtml);
            },
            false
        );
    }

    // Using thoughts data and snippets html build thoughts view HTML to be inserted into page
    function buildThoughtsViewHtml(thoughts, thoughtsHtml) {
        let finalHTML = "";
        // Loop over Thoughts
        for (let i = thoughts.length - 1; i >= 0; i--) {
            // insert thoughts values
            let html = thoughtsHtml;
            let thought_id = thoughts[i].thought_id;
            let thought_heading = thoughts[i].thought_heading;
            let thought_info = thoughts[i].thought_info;
            html = insertProperty(html, "thought_id", thought_id);
            html = insertProperty(html, "thought_heading", thought_heading);
            html = insertProperty(html, "thought_info", thought_info);
            finalHTML += html;
        }
        return finalHTML;
    }

    // Load Quotes
    b.loadQuotes = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(allQuotesUrl, buildAndShowQuotesHtml);
        resetClassAndStyle();
    };

    // Builds HTML for the Quotes Index page based on the data from the server
    function buildAndShowQuotesHtml(quotes) {
        // Retrieve Quotes Index Snippet
        $ajaxUtils.sendGetRequest(
            quotesHtml,
            function (quotesHtml) {
                // Switch CSS class active to Quotes button
                switchToActive("Quotes");
                let quotesViewHtml = buildQuotesViewHtml(quotes, quotesHtml);
                insertHtml("#main-content", quotesViewHtml);
            },
            false
        );
    }

    // Using quotes data and snippets html build quotes view HTML to be inserted into page
    function buildQuotesViewHtml(quotes, quotesHtml) {
        let finalHTML = "";
        // Loop over Quotes
        for (let i = quotes.length - 1; i >= 0; i--) {
            // insert quotes values
            let html = quotesHtml;
            let quote_content = quotes[i].quote_content;
            html = insertProperty(html, "quote_content", quote_content);
            finalHTML += html;
        }
        return finalHTML;
    }

    // Load single Review
    b.loadReview = function (rID) {
        showLoading("#main-content");
        reviewID = rID;
        $ajaxUtils.sendGetRequest(allReviewsUrl, buildAndShowSingleReviewHTML);
    };

    // Builds HTML for Single Review page based on the data from the server
    function buildAndShowSingleReviewHTML(reviews) {
        // Retrieve Single Review Snippet
        $ajaxUtils.sendGetRequest(
            singleReviewHtml,
            function (singleReviewHtml) {
                // Switch CSS class active to Reviews button
                switchToActive("Reviews");
                let singleReviewViewHtml = buildSingleReviewViewHtml(
                    reviews,
                    singleReviewHtml
                );
                insertHtml("#main-content", singleReviewViewHtml);
            },
            false
        );
    }

    // Using single Review data and snippets html build single page HTML to be inserted into page
    function buildSingleReviewViewHtml(reviews, singleReviewHtml) {
        let finalHTML = "";
        // Loop over the Article
        for (let i = reviews.length - 1; i >= 0; i--) {
            // insert article values
            if (reviews[i].review_id == reviewID) {
                let html = singleReviewHtml;
                let movie_name = reviews[i].movie_name;
                let review_content = reviews[i].review_content;
                let rating = reviews[i].rating;
                html = insertProperty(html, "movie_name", movie_name);
                html = insertProperty(html, "review_content", review_content);
                html = insertProperty(html, "rating", rating);
                finalHTML += html;
            }
        }
        return finalHTML;
    }

    // Load single Article
    b.loadArticle = function (aID) {
        showLoading("#main-content");
        articleID = aID;
        $ajaxUtils.sendGetRequest(
            allArticlesUrl,
            buildAndShowSingleArticleHTML
        );
    };

    // Builds HTML for Single Article page based on the data from the server
    function buildAndShowSingleArticleHTML(articles) {
        // Retrieve Single Article Snippet
        $ajaxUtils.sendGetRequest(
            singleArticleHtml,
            function (singleArticleHtml) {
                // Switch CSS class active to Articles button
                switchToActive("Articles");
                let singleArticleViewHtml = buildSingleArticleViewHtml(
                    articles,
                    singleArticleHtml
                );
                insertHtml("#main-content", singleArticleViewHtml);
            },
            false
        );
    }

    // Using single article data and snippets html build single page HTML to be inserted into page
    function buildSingleArticleViewHtml(articles, singleArticleHtml) {
        let finalHTML = "";
        // Loop over the Article
        console.log(articles);
        for (let i = articles.length - 1; i >= 0; i--) {
            // insert article values
            if (articles[i].article_id == articleID) {
                let html = singleArticleHtml;
                let article_heading = articles[i].article_heading;
                let article_content = articles[i].article_content;
                html = insertProperty(html, "article_heading", article_heading);
                html = insertProperty(html, "article_content", article_content);
                finalHTML += html;
            }
        }
        return finalHTML;
    }

    // Load single Poem
    b.loadPoem = function (pID) {
        showLoading("#main-content");
        poemID = pID;
        $ajaxUtils.sendGetRequest(allPoemsUrl, buildAndShowSinglePoemHTML);
    };

    // Builds HTML for Single Poem page based on the data from the server
    function buildAndShowSinglePoemHTML(poems) {
        // Retrieve Single Poem Snippet
        $ajaxUtils.sendGetRequest(
            singlePoemHtml,
            function (singlePoemHtml) {
                // Switch CSS class active to Poems button
                switchToActive("Poems");
                let singlePoemViewHtml = buildSinglePoemViewHtml(
                    poems,
                    singlePoemHtml
                );
                insertHtml("#main-content", singlePoemViewHtml);
            },
            false
        );
    }

    // Using single Poem data and snippets html build single page HTML to be inserted into page
    function buildSinglePoemViewHtml(poems, singlePoemHtml) {
        let finalHTML = "";
        // Loop over the Poem
        for (let i = poems.length - 1; i >= 0; i--) {
            if (poems[i].poem_id == poemID) {
                // insert poem values
                let html = singlePoemHtml;
                let poem_heading = poems[i].poem_heading;
                let poem_content = poems[i].poem_content;
                html = insertProperty(html, "poem_heading", poem_heading);
                html = insertProperty(html, "poem_content", poem_content);
                finalHTML += html;
            }
        }
        return finalHTML;
    }

    // Load single Thought
    b.loadThought = function (tID) {
        showLoading("#main-content");
        thoughtID = tID;
        $ajaxUtils.sendGetRequest(
            allThoughtsUrl,
            buildAndShowSingleThoughtHTML
        );
    };

    // Builds HTML for Single Thought page based on the data from the server
    function buildAndShowSingleThoughtHTML(thoughts) {
        // Retrieve Single Thought Snippet
        $ajaxUtils.sendGetRequest(
            singleThoughtHtml,
            function (singleThoughtHtml) {
                // Switch CSS class active to Thoughts button
                switchToActive("Thoughts");
                let singleThoughtViewHtml = buildSingleThoughtViewHtml(
                    thoughts,
                    singleThoughtHtml
                );
                insertHtml("#main-content", singleThoughtViewHtml);
            },
            false
        );
    }

    // Using single Thought data and snippets html build single page HTML to be inserted into page
    function buildSingleThoughtViewHtml(thoughts, singleThoughtHtml) {
        let finalHTML = "";
        // Loop over the Poem
        for (let i = thoughts.length - 1; i >= 0; i--) {
            if (thoughts[i].thought_id == thoughtID) {
                // insert poem values
                let html = singleThoughtHtml;
                let thought_heading = thoughts[i].thought_heading;
                let thought_content = thoughts[i].thought_content;
                html = insertProperty(html, "thought_heading", thought_heading);
                html = insertProperty(html, "thought_content", thought_content);
                finalHTML += html;
            }
        }
        return finalHTML;
    }

    // Load About Page
    b.loadAbout = function () {
        showLoading("#main-content");
        $ajaxUtils.sendGetRequest(
            aboutHtml,
            function (responseText) {
                // document.querySelector("#main-container aside").innerHTML = "";
                document.querySelector("#main-content").innerHTML =
                    responseText;
                // Switch CSS class active to About button
                switchToActive("About");
            },
            false
        );

        $ajaxUtils.sendGetRequest(
            svgHtml,
            function (responseText) {
                document.querySelector("#socials").innerHTML = responseText;
            },
            false
        );

        let classes;

        classes = document.querySelector("#main-content").className;
        classes = classes.replace(new RegExp("col-lg-7", "g"), "col-lg-12");
        document.querySelector("#main-content").className = classes;
    };

    global.$b = b;
})(window);
