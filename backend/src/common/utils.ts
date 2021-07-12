import { promises } from 'fs';
import { extname, resolve } from 'path';
import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';

const { readFile } = promises;

export function editFileName(req, file, callback) {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(10)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
}

export async function generateDocxFile(data, tempalteFilePath) {
  const content = await readFile(
    resolve(__dirname, `../../${tempalteFilePath}`),
    'binary',
  );
  const zip = new PizZip(content);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

  doc.setData(data);
  doc.render();

  return doc.getZip().generate({ type: 'nodebuffer' });
}
