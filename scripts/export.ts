import { createWriteStream, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { ZipArchive } from 'archiver';

const root = resolve(import.meta.dirname, '..');
const { name } = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

const distDir = resolve(root, 'dist');
const exportDir = resolve(root, 'export');
const zipPath = resolve(exportDir, `${name}.zip`);

mkdirSync(exportDir, { recursive: true });
rmSync(zipPath, { force: true });

const output = createWriteStream(zipPath);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on('close', () => {
	const sizeMb = (archive.pointer() / 1024 / 1024).toFixed(2);
	console.log(`Exported ${zipPath} (${sizeMb} MB)`);
});

archive.on('warning', (err) => console.warn(err));
archive.on('error', (err) => {
	throw err;
});

archive.pipe(output);
// Put the contents of dist/ at the root of the zip, not inside a dist/ folder.
archive.directory(distDir, false);
await archive.finalize();
