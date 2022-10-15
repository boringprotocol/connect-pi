import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process';
import fs from 'fs';

type Data = {
    pubkey: string
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    //const child = exec('/usr/local/bin/boring_stats.sh');
    exec('/usr/bin/wg show all dump |/usr/bin/head -n1 |/usr/bin/cut -f3', (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            res.status(500).json({ error: error.message, pubkey: "" })
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).json({ error: stderr, pubkey: "" })
            return;
        }

        const trimResult = stdout.trim();

        console.log(`stdout:\n${stdout}`);
        res.status(200).json({ pubkey: trimResult, error: "" })
    });
}