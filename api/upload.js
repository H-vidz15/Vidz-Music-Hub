// File: api/upload.js (Vercel Serverless Function with temporary storage) import formidable from 'formidable'; import fs from 'fs'; import path from 'path';

export const config = { api: { bodyParser: false, }, };

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ message: 'Method not allowed' }); }

const secretKey = req.query.key; if (secretKey !== 'vidz_private_15') { return res.status(401).json({ message: 'Unauthorized' }); }

const form = formidable({ multiples: false });

form.parse(req, async (err, fields, files) => { if (err) { return res.status(500).json({ message: 'Error parsing form', error: err }); }

const file = files.song;
if (!file) {
  return res.status(400).json({ message: 'No file uploaded' });
}

try {
  const data = fs.readFileSync(file["filepath"]);
  const tempPath = path.join(process.cwd(), 'public', 'uploads', file["originalFilename"]);

  fs.mkdirSync(path.dirname(tempPath), { recursive: true });
  fs.writeFileSync(tempPath, data);

  return res.status(200).json({ 
    message: 'File uploaded successfully', 
    filename: file["originalFilename"],
    url: `/uploads/${file["originalFilename"]}`
  });
} catch (error) {
  return res.status(500).json({ message: 'File saving failed', error });
}

}); }

                             
