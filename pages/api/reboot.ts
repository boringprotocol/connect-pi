import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process';
import fs from 'fs';

type Data = {
    result: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ result: 'rebootin' })
    const child = exec('/usr/bin/systemctl reboot');
}