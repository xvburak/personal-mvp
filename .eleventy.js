const { DateTime } = require("luxon");

module.exports = eleventyConfig => {

	eleventyConfig.addShortcode('excerpt', post => extractExcerpt(post));

	function extractExcerpt(post) {
		if(!post.templateContent) return '';
		if(post.templateContent.indexOf('</p>') > 0) {
			let end = post.templateContent.indexOf('</p>');
			return post.templateContent.substr(0, end+4);
		}
		return post.templateContent;
	}

    eleventyConfig.addPassthroughCopy("src/assets");
    eleventyConfig.addPassthroughCopy("src/assets/post.css");
	eleventyConfig.addPassthroughCopy("src/assets/homepage.css");
    eleventyConfig.addPassthroughCopy("src/assets/strava.js");

    eleventyConfig.addWatchTarget("src/assets/post.css");
	eleventyConfig.addWatchTarget("src/assets/homepage.css");
	eleventyConfig.addWatchTarget("src/assets/strava.js");
    eleventyConfig.addWatchTarget("src/assets");


	eleventyConfig.addCollection("categories", function(collectionApi) {
		let categories = new Set();
		let posts = collectionApi.getFilteredByTag('post');
		posts.forEach(p => {
			let cats = p.data.categories;
			cats.forEach(c => categories.add(c));
		});
		return Array.from(categories);
	});

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toFormat('yy-MM-dd');
    });

	eleventyConfig.addFilter("filterByCategory", function(posts, cat) {

		cat = cat.toLowerCase();
		let result = posts.filter(p => {
			let cats = p.data.categories.map(s => s.toLowerCase());
			return cats.includes(cat);
		});

		return result;
	});

	return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
		dir: {
            // data: '_data',
			input: 'src',
            output: '_site'
		}
	}

};