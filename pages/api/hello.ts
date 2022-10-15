import type { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process';
import fs from 'fs';
import NextCors from 'nextjs-cors';


type Data = {
  result: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const myFileData = await req.query.falconconfig;

  if (!myFileData || myFileData.length == 0) {
    res.status(500).json({ result: 'gimme data' })
  } else {
    const location = process.env.BORING_CONFIG
    const useLoc = location || "/tmp/boring.env"
    fs.writeFileSync(useLoc, String(myFileData));
    res.status(200).json({ result: 'asteroids' })
    if (useLoc == "/tmp/boring.env") {
      // don't reboot when doing testing
    } else {
      const child = exec('/usr/bin/systemctl reboot');
    }
  }
}
