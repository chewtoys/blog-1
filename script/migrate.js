#!/usr/bin/env node

const fs = require('fs');
const pa = require('path');
const matter = require('gray-matter');

const inputDir = pa.join(__dirname, '../content/posts');

const data = fs.readdirSync(inputDir).map((filename) => {
  const filepath = pa.join(inputDir, filename);
  const file = matter.read(filepath);
  return file.data;
});

const output = pa.join(__dirname, '../db.json');
fs.writeFileSync(output, JSON.stringify(data, null, 2), { encoding: 'utf-8' });
