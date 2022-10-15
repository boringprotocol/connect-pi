import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process';
import fs from 'fs';

type Data = {
    name: string
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    //const child = exec('/usr/local/bin/boring_stats.sh');
    exec('/usr/bin/cat /boot/boring.env|/usr/bin/grep BORING_NAME |/usr/bin/sed \'s/BORING_NAME=//g\'', (error, stdout, stderr) => {
        if (error) {
            console.error(`error: ${error.message}`);
            res.status(500).json({ error: error.message, name: "" })
            return;
        }

        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).json({ error: stderr, name: "" })
            return;
        }

        const trimResult = stdout.trim();

        console.log(`stdout:\n${stdout}`);
        res.status(200).json({ name: trimResult, error: "" })
    });
}