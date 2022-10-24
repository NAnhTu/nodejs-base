const pdf = require('pdf-creator-node')
const fs = require('fs')
const path = require('path');
const status = require('http-status')
const exportPdf = {
  export: async (req, res) => {
    try {
      console.log(111)
      const html = fs.readFileSync(
        path.join(__dirname, '../../config/template.html'),
        'utf8'
      )
      const options = {
        format: 'A3',
        orientation: 'portrait',
        border: '10mm',
        header: {
          height: '45mm',
          contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
        },
        footer: {
          height: '28mm',
          contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default:
              '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page',
          },
        },
      }
      const users = [
        {
          name: 'Shyam',
          age: '26',
        },
        {
          name: 'Navjot',
          age: '26',
        },
        {
          name: 'Vitthal',
          age: '26',
        },
      ]
      const document = {
        html: html,
        data: {
          users: users,
        },
        path: './output.pdf',
        type: '',
      }
      await pdf.create(document, options);
      const data =fs.readFileSync(path.join(__dirname, '../../output.pdf'));
      res.contentType("application/pdf");
      res.download(path.join(__dirname, '../../output.pdf'), 'test.pdf');
    } catch (e) {
      console.log(e)
    }
  },
  preview: async (req, res) => {
    try {
      // const data =fs.readFileSync(path.join(__dirname, '../../output.pdf'));
      const stream = fs.createReadStream(path.join(__dirname, '../../output.pdf'));
      let filename = "WhateverFilenameYouWant.pdf";
      // Be careful of special characters

      filename = encodeURIComponent(filename);
      // Ideally this should strip them

      res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
      res.setHeader('Content-type', 'application/pdf');

      stream.pipe(res);
    } catch (e) {
      console.log(e)
    }
  },
}
module.exports = exportPdf
