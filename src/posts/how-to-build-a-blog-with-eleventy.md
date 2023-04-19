---
title: How to Build a Blog with Eleventy
layout: layouts/post.njk
date: 2023-03-20
categories: ["tutorial"]
tags: post
published: false
---
## What you'll need

- [Node.js](https://nodejs.org/en/download/) installed
- basic knowledge of HTML, CSS and JS
- [GitHub account](https://github.com/)
- any text editor ([VS Code](https://code.visualstudio.com/), TextEdit, whatever)

## What we're gonna build

Let's start with a clear description of our project. Although most developers are familiar with the term blog, each blog has its own unique characteristics. In this guide, I will show how to include the following features:

- homepage with a list of posts
- single post page
- list of posts by category
- styling

### Initial directories and files

Your blog will exist in a folder on your computer, so the first step is to create the folder. You can name it whatever you want, I'll just call it `my-new-blog`.  And open it in a text editor (I use VS Code).

Now open a terminal. In VS Code this is done by clicking on the **Terminal** > **New Terminal** in the Mac menu bar.

Run this command in terminal to initialize a new Node project:

```bash
npm init -y
```

Run this to install Eleventy:

```bash
npm install --save-dev @11ty/eleventy
```

After that, the content of the folder should look like this:
```bash
📂 blog
├─ 📁 node_modules 
├─ 📁 src
├─ package.json
├─ package-lock.json
```

### Basic structure

In the root (`my-new-blog`) folder, we create the `src` folder, and here will exist the source of our website. Next, we create (still in the root folder) `.eleventy.js` file to which we add the following:

```js
module.exports = eleventyConfig => {

 return {
  dir: {
   input: 'src' 
  }
 }

};
```

This tells eleventy where to get the data from. Your folder structure shoud now look like this:

```bash
📂 blog
├─ 📁 node_modules 
├─ 📁 src
├─ .elevetny.js
├─ package.json
├─ package-lock.json
```
