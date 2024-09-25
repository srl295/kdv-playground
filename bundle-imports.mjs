import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { exit } from 'node:process';

const importPath = 'node_modules/@keymanapp/common-types/build/src/import';
const outputPath = 'src/app/ldml-import.json';

async function fetchDir(path) {
    const s = await stat(path);
    if (s.isFile()) {
        console.log(` Adding ${path}`);
        return readFile(path, 'utf-8');
    } else if (!s.isDirectory()) return;

    console.log(`Reading ${path}`);
    const dirs = await readdir(path,'utf-8');
    const sub = await Promise.all(
        dirs.map(async (dir) => ([dir, await fetchDir(join(path, dir))]))
    );
    return Object.fromEntries(sub);
}

async function main(path) {
    const out = {};
    out.import = await fetchDir(path);
    await writeFile(outputPath, JSON.stringify(out, null, ' '), 'utf-8');
    console.log(`Wrote ${outputPath}`);
}

main(importPath).then(() => console.dir('done'), (err) => {
    console.error(err);
    exit(1);
});
