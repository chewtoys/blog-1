#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsPath = path.join(__dirname, './posts');
const postsFiles = fs.readdirSync(postsPath);

const data = postsFiles.reduce((posts, filename) => {
  const filePath = path.join(postsPath, filename);
  const post = matter.read(filePath);

  delete post.content;

  return [...posts, post];
}, []);

fs.writeFileSync(path.join(__dirname, '../server/posts.json'), JSON.stringify(data, 2));
