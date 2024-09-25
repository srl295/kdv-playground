import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { exit } from 'node:process';

const importPath = 'node_modules/@keymanapp/common-types/build/src/import';
const outputPath = 'public/import.json';

async function fetchDir(path) {
    const {isFile, isDirectory} = await stat(path);
    if (isFile()) {
        return readFile(path, 'utf-8');
    }
    if (!isDirectory()) return;

    console.log(`Reading ${path}`);
    const dirs = await readdir(path,'utf-8');
    const sub = await Promise.all(dirs.map(async (dir) => ({ dir, fetchDir(join(path, dir)})));
}

async function main(path) {
    const out = {};
    out.import = await fetchDir(path);
    await writeFile(outputPath, JSON.stringify(out), 'utf-8');
    console.log(`Wrote ${outputPath}`);
}

main(importPath).then(() => console.dir('done'), (err) => {
    console.error(err);
    exit(1);
});
